'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { StaffImportRow } from '@/features/(dashboard)/types';
import { Button } from '@/components/molecules/Button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/atoms/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/molecules/Table';
import { Alert, AlertDescription, AlertTitle } from '@/components/atoms/alert'; // Assuming Shadcn Alert
import { Progress } from '@/components/atoms/progress'; // Assuming Shadcn Progress
import {
  UploadCloud,
  X,
  CheckCircle2,
  AlertCircle,
  Trash2,
  Loader2,
} from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { cn } from '@/lib/utils';

type ImportStep = 'upload' | 'review' | 'processing' | 'completed' | 'error';

interface ImportStaffModalProps {
  isOpen: boolean;
  onClose: () => void;
  // Props from useStaffManagement hook
  importStep: ImportStep;
  importedFile: File | null;
  staffToImport: StaffImportRow[];
  importError: string | null;
  importSummary: {
    successCount: number;
    failureCount: number;
    errors: string[];
  } | null;
  onFileSelect: (file: File | null) => Promise<void>; // Make it async to allow for processing state
  onRemoveStaffFromReview: (rowId: string) => void;
  onConfirmImport: () => Promise<void>; // Make it async
  onResetImport: () => void;
  setImportStep: (step: ImportStep) => void; // To manually change step if needed
}

export const ImportStaffModal: React.FC<ImportStaffModalProps> = ({
  isOpen,
  onClose,
  importStep,
  importedFile,
  staffToImport,
  importError,
  importSummary,
  onFileSelect,
  onRemoveStaffFromReview,
  onConfirmImport,
  onResetImport,
  setImportStep,
}) => {
  const [isUploading, setIsUploading] = useState(false); // Local state for upload progress simulation
  const [uploadProgress, setUploadProgress] = useState(0);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles && acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        if (file.type !== 'text/csv') {
          // Handle file type error locally before calling onFileSelect
          setImportStep('upload'); // Stay on upload step or set to an error state
          // This error should ideally be displayed near the dropzone
          alert('Invalid file type. Please upload a CSV file.'); // Replace with better UI feedback
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
            onFileSelect(file); // This will trigger processing and move to 'review' or 'error' step
          }
        }, 200);
      }
    },
    [onFileSelect, setImportStep]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'text/csv': ['.csv'] },
    maxFiles: 1,
    multiple: false,
  });

  const handleModalClose = () => {
    onClose();
    // Consider resetting import state if modal is closed prematurely,
    // or let the parent handle it via onResetImport if needed.
    // For now, just closing. Parent hook might reset on next open.
  };

  const currentTitle = useMemo(() => {
    switch (importStep) {
      case 'upload':
        return 'Import staff members';
      case 'review':
        return 'Review staff for import';
      case 'processing':
        return 'Processing import...';
      case 'completed':
        return 'Import completed';
      case 'error':
        return 'Import error';
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
    <div className="p-6 space-y-6">
      <p className="text-sm text-slate-600">
        Upload a CSV file with staff information. Ensure your file has a header
        row and includes at least Name, Email. Team is optional. Max file size:
        10MB.
      </p>
      <div
        {...getRootProps()}
        className={cn(
          'flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg cursor-pointer transition-colors',
          isDragActive
            ? 'border-blue-500 bg-blue-50'
            : 'border-slate-300 hover:border-slate-400 hover:bg-slate-50'
        )}
      >
        <input {...getInputProps()} />
        <UploadCloud
          size={48}
          className={cn(
            'mb-3',
            isDragActive ? 'text-blue-600' : 'text-slate-400'
          )}
        />
        {isDragActive ? (
          <p className="text-blue-600 font-semibold">Drop the file here...</p>
        ) : (
          <>
            <p className="text-slate-700 font-medium">
              <span className="text-blue-600 hover:underline">
                Click to upload
              </span>{' '}
              or drag and drop
            </p>
            <p className="text-xs text-slate-500 mt-1">CSV files up to 10MB</p>
          </>
        )}
      </div>
      {isUploading && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-slate-700">
            Uploading {importedFile?.name}...
          </p>
          <Progress value={uploadProgress} className="w-full h-2" />
        </div>
      )}
      {/* Display file type error here if needed */}
    </div>
  );

  const renderReviewStep = () => (
    <div className="p-0">
      {' '}
      {/* Remove padding for full-width table */}
      <div className="px-6 py-4">
        <p className="text-sm text-slate-600 mb-1">
          Review the staff members to be imported. Rows with issues are
          highlighted. You can remove rows before confirming the import.
        </p>
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
      <div className="max-h-[400px] overflow-y-auto border-t border-b">
        <Table className="min-w-full">
          <TableHeader className="bg-slate-50 sticky top-0 z-10">
            <TableRow>
              <TableHead className="px-4 py-2 text-xs">Name</TableHead>
              <TableHead className="px-4 py-2 text-xs">Email</TableHead>
              <TableHead className="px-4 py-2 text-xs">
                Team (Optional)
              </TableHead>
              <TableHead className="px-4 py-2 text-xs">Status</TableHead>
              <TableHead className="px-4 py-2 text-xs text-right">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {staffToImport.map((row) => (
              <TableRow
                key={row.id}
                className={cn(
                  row.status !== 'new' && 'bg-red-50 hover:bg-red-100'
                )}
              >
                <TableCell className="px-4 py-2 text-sm">{row.name}</TableCell>
                <TableCell className="px-4 py-2 text-sm">{row.email}</TableCell>
                <TableCell className="px-4 py-2 text-sm">
                  {row.team || <span className="text-slate-400">N/A</span>}
                </TableCell>
                <TableCell className="px-4 py-2 text-sm">
                  {row.status === 'new' && (
                    <span className="text-green-600">New</span>
                  )}
                  {row.status === 'duplicate_email' && (
                    <span className="text-orange-600" title={row.errorMessage}>
                      Duplicate
                    </span>
                  )}
                  {row.status === 'error' && (
                    <span className="text-red-600" title={row.errorMessage}>
                      Error
                    </span>
                  )}
                </TableCell>
                <TableCell className="px-4 py-2 text-sm text-right">
                  <Button
                    variant="ghost"
                    className="h-7 w-7 p-0 text-red-500 hover:bg-red-100"
                    onClick={() => onRemoveStaffFromReview(row.id)}
                    title="Remove from import list"
                  >
                    <Trash2 size={14} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <DialogFooter className="px-6 py-4 mt-0 border-t-0 bg-slate-50">
        <span className="text-sm text-slate-600 mr-auto">
          {newRowsCount} new staff member(s) will be invited.
        </span>
        <Button
          type="button"
          variant="secondary"
          onClick={onResetImport}
          className="border-slate-300"
        >
          Upload New File
        </Button>
        <Button
          onClick={onConfirmImport}
          disabled={newRowsCount === 0}
          className="bg-slate-800 hover:bg-slate-700 text-white"
        >
          Confirm & Import {newRowsCount > 0 ? `(${newRowsCount})` : ''}
        </Button>
      </DialogFooter>
    </div>
  );

  const renderProcessingStep = () => (
    <div className="p-10 flex flex-col items-center justify-center space-y-4">
      <Loader2 size={48} className="text-blue-500 animate-spin" />
      <p className="text-slate-700 font-medium">
        Processing import, please wait...
      </p>
      <p className="text-sm text-slate-500">This may take a few moments.</p>
    </div>
  );

  const renderCompletedStep = () => (
    <div className="p-6 space-y-4">
      {importSummary && importSummary.successCount > 0 && !importError && (
        <Alert
          variant="default"
          className="bg-green-50 border-green-200 text-green-700"
        >
          <CheckCircle2 className="h-5 w-5 text-green-600" />
          <AlertTitle className="font-semibold">Import Successful!</AlertTitle>
          <AlertDescription>
            {importSummary.successCount} staff member(s) imported and invited
            successfully.
            {importSummary.failureCount > 0 &&
              ` ${importSummary.failureCount} row(s) were skipped.`}
          </AlertDescription>
        </Alert>
      )}
      {importSummary &&
        importSummary.successCount === 0 &&
        importSummary.failureCount > 0 &&
        !importError && (
          <Alert
            variant="default"
            className="bg-yellow-50 border-yellow-200 text-yellow-700"
          >
            <AlertCircle className="h-5 w-5 text-yellow-600" />
            <AlertTitle className="font-semibold">
              Import Partially Completed
            </AlertTitle>
            <AlertDescription>
              No new staff members were imported. {importSummary.failureCount}{' '}
              row(s) were skipped due to issues.
            </AlertDescription>
          </Alert>
        )}
      {importError && ( // This handles errors during the confirm step
        <Alert variant="destructive">
          <AlertCircle className="h-5 w-5" />
          <AlertTitle>Import Failed</AlertTitle>
          <AlertDescription>{importError}</AlertDescription>
        </Alert>
      )}
      {importSummary &&
        importSummary.errors &&
        importSummary.errors.length > 0 && (
          <div className="mt-3">
            <p className="text-sm font-medium text-slate-700 mb-1">Details:</p>
            <ul className="list-disc list-inside text-xs text-slate-600 max-h-32 overflow-y-auto bg-slate-50 p-2 rounded-md border">
              {importSummary.errors.map((err, i) => (
                <li key={i}>{err}</li>
              ))}
            </ul>
          </div>
        )}
      <DialogFooter className="pt-4 sm:justify-center">
        <Button
          onClick={handleModalClose}
          className="bg-slate-800 hover:bg-slate-700 text-white"
        >
          Close
        </Button>
        <Button
          variant="secondary"
          onClick={onResetImport}
          className="border-slate-300"
        >
          Import Another File
        </Button>
      </DialogFooter>
    </div>
  );

  const renderErrorStep = () => (
    // For errors during initial file processing by onFileSelect
    <div className="p-6 space-y-4">
      <Alert variant="destructive">
        <AlertCircle className="h-5 w-5" />
        <AlertTitle>File Processing Error</AlertTitle>
        <AlertDescription>
          {importError ||
            'An unknown error occurred while processing the file.'}
        </AlertDescription>
      </Alert>
      <DialogFooter className="pt-4 sm:justify-center">
        <Button
          variant="secondary"
          onClick={onResetImport}
          className="border-slate-300"
        >
          Try Again
        </Button>
        <Button
          onClick={handleModalClose}
          className="bg-slate-800 hover:bg-slate-700 text-white"
        >
          Close
        </Button>
      </DialogFooter>
    </div>
  );

  const renderStepContent = () => {
    switch (importStep) {
      case 'upload':
        return renderUploadStep();
      case 'review':
        return renderReviewStep();
      case 'processing':
        return renderProcessingStep();
      case 'completed':
        return renderCompletedStep();
      case 'error':
        return renderErrorStep();
      default:
        return <p>Unknown import step.</p>;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleModalClose()}>
      <DialogContent className="sm:max-w-xl md:max-w-2xl lg:max-w-3xl bg-white p-0 data-[state=open]:animate-contentShow">
        <DialogHeader className="px-6 py-4 border-b">
          <DialogTitle className="text-xl font-semibold text-slate-800">
            {currentTitle}
          </DialogTitle>
          {importStep === 'upload' && (
            <DialogDescription className="text-sm text-slate-500">
              Upload a CSV file to bulk import staff members.
            </DialogDescription>
          )}
          <DialogClose asChild>
            <Button
              variant="ghost"
              className="absolute right-4 top-3 text-slate-500 hover:bg-slate-100 rounded-full"
              onClick={handleModalClose}
            >
              <X size={20} /> <span className="sr-only">Close</span>
            </Button>
          </DialogClose>
        </DialogHeader>

        {renderStepContent()}
      </DialogContent>
    </Dialog>
  );
};
