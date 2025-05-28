'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { ImportStep, StaffImportRow } from '@/features/(dashboard)/types/staff.type';
import { Button } from '@/components/molecules/Button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,

} from '@/components/atoms/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/molecules/Table';
import { Alert, AlertDescription } from '@/components/atoms/alert'; // Assuming Shadcn Alert
import { Progress } from '@/components/atoms/progress'; // Assuming Shadcn Progress
import {   AlertCircle } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import useAlert from '@/hooks/useAlert';
import { ImportSummary, processStaffCsv } from '@/lib/processStaffCsv';

interface ImportStaffModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ImportStaffModal: React.FC<ImportStaffModalProps> = ({
  isOpen,
  onClose,
}) => {
  const alert = useAlert();

  const [isUploading, setIsUploading] = useState(false); // Local state for upload progress simulation
  const [uploadProgress, setUploadProgress] = useState(0);

  const [file, setFile] = useState<File | null>(null);
  const [staffToImport, setStaffToImport] = useState<StaffImportRow[]>([]);
  const [importSummary, setImportSummary] = useState<ImportSummary>({
    successCount: 0,
    failureCount: 0,
    errors: [],
  });
console.log(importSummary)
  const [importStep, setImportStep] = useState<ImportStep>('upload');

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles && acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        if (file.type !== 'text/csv') {
          setImportStep('upload');
          alert.showAlert('Invalid file type', 'error', {
            subtext: 'Please upload a CSV file.',
          });
          return;
        }
        setIsUploading(true);
        setUploadProgress(0);

        // Simulate upload progress
        let progress = 0;
        const interval = setInterval(() => {
          progress += 20;
          setUploadProgress(progress);
          if (progress >= 100) {
            clearInterval(interval);
            setIsUploading(false);
            setFile(file);
            handleFileUpload(file);
            setImportStep('review');
          }
        }, 200);
      }
    },
    [setFile, setImportStep]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'text/csv': ['.csv'] },
    maxFiles: 1,
    multiple: false,
  });

  const handleModalClose = () => {
    onClose();
    setFile(null);
    setImportStep('upload');
    setStaffToImport([]);
    setImportSummary({
      successCount: 0,
      failureCount: 0,
      errors: [],
    });
    setIsUploading(false);
    setUploadProgress(0);
  };

  const handleConfirmImport = () => {
    onClose();
    alert.showAlert('Staff import successful.', 'success', {
      subtext: `You have successfully added ${newRowsCount} new staff members to Casuals HQ.`,
    });
    // API Call to import
    console.log(file);
  };


    const handleRemoveStaffFromReview = (staffIdToRemove: string) => {
      setStaffToImport((currentStaff) =>
        currentStaff.filter((staff) => staff.id !== staffIdToRemove)
      );
      
    };

  async function handleFileUpload(file: File) {
    if (file) {
      try {
        const { staffToImport, importSummary } = await processStaffCsv(file);
        setStaffToImport(staffToImport);
        setImportSummary(importSummary);

        // The `onRemoveStaffFromReview` function would be a separate function
        // in your component that modifies the `staffForReview` state.
        // For example:
      
      } catch (err) {
        console.error('Error processing CSV:', err);
        if (err instanceof Error)
          alert.showAlert('Error processing CSV', 'error', {
            subtext: err.message,
          });
      }
    }
  }

  const currentTitle = useMemo(() => {
    switch (importStep) {
      case 'upload':
        return 'Import staff';
      case 'review':
        return 'Review';
      default:
        return 'Import staff';
    }
  }, [importStep]);

  const rowsWithIssues = useMemo(
    () => staffToImport.filter((row) => row.status !== 'new').length,
    [staffToImport]
  );

  const newRowsCount = useMemo(
    () => staffToImport.filter((row) => row.status === 'new').length,
    [staffToImport]
  );

  const renderUploadStep = () => (
    <div className="space-y-6">
      <div
        {...getRootProps()}
        className={cn(
          'flex flex-col gap-2 items-center justify-center p-10 border rounded-lg cursor-pointer transition-colors',

          'border-slate-300 hover:border-slate-400 hover:bg-slate-50'
        )}
      >
        <input {...getInputProps()} />
        <span className="rounded-full p-2 shadow-lg h-16 w-16 flex items-center justify-center">
          <Image
            src="/admin-staff/import.svg"
            alt="Upload icon"
            className="opacity-50"
            width={30}
            height={30}
          />
        </span>
        {isDragActive ? (
          <p className="text-blue-600 font-semibold">Drop the file here...</p>
        ) : (
          <>
            <p className="text-slate-500 font-medium">
              <span className="text-primary hover:underline">
                Click to upload
              </span>{' '}
              or drag and drop
            </p>
            <p className="text-xs text-center text-slate-500 mt-1">
              Make sure your CSV file is under 10 MB, has a header row and valid
              information.
            </p>
          </>
        )}
      </div>
      {isUploading && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-slate-700">
            Uploading {file?.name}...
          </p>
          <Progress value={uploadProgress} className="w-full h-2" />
        </div>
      )}
      {/* Display file type error here if needed */}
    </div>
  );

  const renderReviewStep = () => (
    <div className="p-0">
      <div className="">
        {rowsWithIssues > 0 && (
          <Alert variant="destructive" className="mb-3 text-xs p-2">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {rowsWithIssues} row(s) have issues (e.g., duplicate email,
              invalid data) and will be skipped.
            </AlertDescription>
          </Alert>
        )}
      </div>
      <div className="h-[calc(100vh-20rem)] overflow-y-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="overflow-x-auto">
            {staffToImport.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.email}</TableCell>

                <TableCell>
                  <Button
                    variant="secondary"
                    onClick={() => handleRemoveStaffFromReview(row.id)}
                    title="Remove from import list"
                  >
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col gap-2 items-center px-6 py-4 mt-0 border-t-0 bg-slate-50">
        <Button onClick={handleConfirmImport} disabled={newRowsCount === 0}>
          Confirm
        </Button>
        <span className="text-sm text-custom-gray ">
          {newRowsCount} new staff member(s) will be invited.
        </span>
      </div>
    </div>
  );

  const renderStepContent = () => {
    switch (importStep) {
      case 'upload':
        return renderUploadStep();
      case 'review':
        return renderReviewStep();
      default:
        return <p>Unknown import step.</p>;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleModalClose()}>
      <DialogContent
        className={cn(
          'bg-white p-8 data-[state=open]:animate-contentShow space-y-4 w-xl',
          importStep === 'review' && 'w-[90%] sm:w-4xl overflow-x-auto'
        )}
      >
        <DialogHeader className="">
          <DialogTitle className="text-xl font-semibold text-slate-800">
            {currentTitle}
          </DialogTitle>
          {importStep === 'upload' && (
            <DialogDescription className="text-sm text-slate-500">
              Upload a CSV file to bulk import staff members.
            </DialogDescription>
          )}
          {importStep === 'review' && (
            <DialogDescription className="text-sm text-slate-500">
              The following staff members will receive an invitation to onboard
              into your company.
            </DialogDescription>
          )}
        </DialogHeader>

        {renderStepContent()}
      </DialogContent>
    </Dialog>
  );
};
