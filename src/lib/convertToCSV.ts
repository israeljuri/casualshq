/* eslint-disable @typescript-eslint/no-explicit-any */
import { Staff } from '@/features/(dashboard)/types/staff.type';
import Papa from 'papaparse';
import { v4 as uuidv4 } from 'uuid';
export interface StaffImportRow {
  id: string;
  name?: string;
  email?: string;
  status:
    | 'new'
    | 'duplicate_email'
    | 'error'
    | 'missing_email'
    | 'missing_name';
  errorMessage?: string;
  originalData: Record<string, any>;
}

export interface ImportSummary {
  successCount: number;
  failureCount: number;
  errors: Array<{
    rowNumber: number;
    message: string;
    email?: string;
    name?: string;
  }>;
}

export interface ProcessedStaffData {
  staffToImport: StaffImportRow[];
  importSummary: ImportSummary;
}

export async function processStaffCsv(
  csvFile: File
): Promise<ProcessedStaffData> {
  return new Promise<ProcessedStaffData>((resolve) => {
    const staffToImport: StaffImportRow[] = [];
    const importSummary: ImportSummary = {
      successCount: 0,
      failureCount: 0,
      errors: [],
    };

    const encounteredEmails = new Set<string>();

    Papa.parse(csvFile, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        if (results.errors.length > 0) {
          results.errors.forEach((error) => {
            importSummary.failureCount++;
            importSummary.errors.push({
              rowNumber: error.row || 0,
              message: `CSV parsing error: ${error.message}`,
            });
          });
        }

        results.data.forEach((row: any, index: number) => {
          const csvRowNumber = index + 2;
          const id = uuidv4();

          const firstName = row.firstName?.trim();
          const lastName = row.lastName?.trim();
          const email = row.email?.trim().toLowerCase();

          let name: string | undefined = undefined;
          if (firstName && lastName) {
            name = `${firstName} ${lastName}`;
          } else if (firstName) {
            name = firstName;
          } else if (lastName) {
            name = lastName;
          }

          const staffRow: StaffImportRow = {
            id,
            name,
            email,
            status: 'new',
            originalData: row,
          };

          // --- Validation ---
          let hasError = false;

          if (!email) {
            staffRow.status = 'missing_email';
            staffRow.errorMessage = 'Email is missing.';
            importSummary.errors.push({
              rowNumber: csvRowNumber,
              message: staffRow.errorMessage,
              name: staffRow.name,
            });
            hasError = true;
          } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
              staffRow.status = 'error';
              staffRow.errorMessage = 'Invalid email format.';
              importSummary.errors.push({
                rowNumber: csvRowNumber,
                message: staffRow.errorMessage,
                email: staffRow.email,
                name: staffRow.name,
              });
              hasError = true;
            } else if (encounteredEmails.has(email)) {
              staffRow.status = 'duplicate_email';
              staffRow.errorMessage = `Duplicate email in this file: ${email}.`;
              importSummary.errors.push({
                rowNumber: csvRowNumber,
                message: staffRow.errorMessage,
                email: staffRow.email,
                name: staffRow.name,
              });
              hasError = true;
            } else {
              encounteredEmails.add(email);
            }
          }

          if (!name) {
            if (!hasError) {
              staffRow.status = 'missing_name';
              staffRow.errorMessage = 'Name (First or Last) is missing.';
              importSummary.errors.push({
                rowNumber: csvRowNumber,
                message: staffRow.errorMessage,
                email: staffRow.email,
              });
              hasError = true;
            } else {
              staffRow.errorMessage += ' Name (First or Last) is also missing.';
              const existingError = importSummary.errors.find(
                (e) =>
                  e.rowNumber === csvRowNumber && e.email === staffRow.email
              );
              if (existingError) {
                existingError.message +=
                  ' Name (First or Last) is also missing.';
              }
            }
          }

          if (hasError) {
            importSummary.failureCount++;
          } else {
            importSummary.successCount++;
          }

          staffToImport.push(staffRow);
        });

        resolve({ staffToImport, importSummary });
      },
      error: (error: Error) => {
        console.error('Critical CSV parsing error:', error);
        importSummary.failureCount = 1;
        importSummary.errors.push({
          rowNumber: 0,
          message: `Failed to parse CSV file: ${error.message}`,
        });

        resolve({ staffToImport: [], importSummary });
      },
    });
  });
}

// function flattenObject(
//   obj: Record<string, any>,
//   prefix = ''
// ): Record<string, string> {
//   return Object.entries(obj).reduce((acc, [key, value]) => {
//     const fullKey = prefix ? `${prefix}.${key}` : key;

//     if (value === null || value === undefined) {
//       acc[fullKey] = '';
//     } else if (typeof value === 'object' && !Array.isArray(value)) {
//       Object.assign(acc, flattenObject(value, fullKey));
//     } else {
//       acc[fullKey] = String(value);
//     }

//     return acc;
//   }, {} as Record<string, string>);
// }

function flattenObject(
  obj: Record<string, any>,
  prefix = ''
): Record<string, string> {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    const fullKey = prefix ? `${prefix}.${key}` : key;

    if (value === null || value === undefined) {
      acc[fullKey] = '';
    } else if (Array.isArray(value)) {
      value.forEach((item, index) => {
        const arrayKey = `${fullKey}[${index}]`;
        if (typeof item === 'object' && item !== null) {
          Object.assign(acc, flattenObject(item, arrayKey));
        } else {
          acc[arrayKey] = String(item);
        }
      });
    } else if (typeof value === 'object') {
      Object.assign(acc, flattenObject(value, fullKey));
    } else {
      acc[fullKey] = String(value);
    }

    return acc;
  }, {} as Record<string, string>);
}

/**
 * Converts a single staff object to key-value pair CSV string
 */
export function convertStaffToCSV(staff: Staff): string {
  const flat = flattenObject(staff);
  const rows = Object.entries(flat).map(
    ([key, value]) => `"${key}","${value}"`
  );
  return ['"Key","Value"', ...rows].join('\n');
}


export function convertPaymentDetailToCSV(paymentDetail: any): string {
  const flat = flattenObject(paymentDetail);
  const rows = Object.entries(flat).map(
    ([key, value]) => `"${key}","${value}"`
  );
  return ['"Key","Value"', ...rows].join('\n');
}