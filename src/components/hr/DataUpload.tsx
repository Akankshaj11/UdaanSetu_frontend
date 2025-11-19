import React, { useState, useCallback } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { ArrowLeft, Upload, FileSpreadsheet, CheckCircle2, AlertCircle, X } from 'lucide-react';
import { toast } from 'sonner';

interface DataUploadProps {
  onBack: () => void;
}

export function DataUpload({ onBack }: DataUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [validationResults, setValidationResults] = useState<{
    status: 'success' | 'error' | 'warning' | null;
    messages: string[];
  }>({ status: null, messages: [] });
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (selectedFile: File) => {
    const validTypes = ['text/csv', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
    
    if (!validTypes.includes(selectedFile.type) && !selectedFile.name.endsWith('.csv') && !selectedFile.name.endsWith('.xlsx')) {
      toast.error('Please upload a CSV or Excel file');
      return;
    }

    setFile(selectedFile);
    validateFile(selectedFile);
  };

  const validateFile = (file: File) => {
    setUploading(true);
    
    // Simulate validation
    setTimeout(() => {
      const mockValidation = {
        status: 'success' as const,
        messages: [
          '✓ File format validated (CSV)',
          '✓ 125 employee records found',
          '✓ All required columns present',
          '✓ No duplicate employee IDs',
          '⚠ 3 records missing competency scores (will use defaults)',
          '✓ Data ready for import',
        ],
      };
      
      setValidationResults(mockValidation);
      setUploading(false);
      toast.success('File validated successfully!');
    }, 2000);
  };

  const handleUpload = () => {
    setUploading(true);
    
    setTimeout(() => {
      setUploading(false);
      toast.success('Employee data uploaded successfully!');
      onBack();
    }, 1500);
  };

  const handleRemoveFile = () => {
    setFile(null);
    setValidationResults({ status: null, messages: [] });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <div>
          <h1>Data Management & Upload</h1>
          <p className="text-muted-foreground mt-1">
            Upload employee appraisal data and competency scores
          </p>
        </div>
      </div>

      {/* Instructions */}
      <Card className="p-6">
        <h3 className="mb-4">Upload Instructions</h3>
        <div className="space-y-3 text-sm">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-xs">1</span>
            </div>
            <div>
              <p>Prepare your data file in CSV or Excel format</p>
              <p className="text-muted-foreground mt-1">
                Required columns: Employee ID, Name, Title, Department, Manager ID, Performance Score, Potential Score, Competency Scores
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-xs">2</span>
            </div>
            <div>
              <p>Upload the file using the dropzone below</p>
              <p className="text-muted-foreground mt-1">
                Maximum file size: 10MB. Supported formats: .csv, .xlsx
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-xs">3</span>
            </div>
            <div>
              <p>Review the validation results</p>
              <p className="text-muted-foreground mt-1">
                The system will check for errors, duplicates, and missing data
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <Button variant="outline" size="sm">
            <FileSpreadsheet className="w-4 h-4 mr-2" />
            Download Template
          </Button>
        </div>
      </Card>

      {/* File Upload Dropzone */}
      <Card className="p-6">
        <h3 className="mb-4">Upload File</h3>
        
        {!file ? (
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`
              border-2 border-dashed rounded-lg p-12 text-center transition-colors
              ${dragActive ? 'border-blue-600 bg-blue-600/10' : 'border-border hover:border-blue-600/50'}
            `}
          >
            <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <p className="mb-2">Drag and drop your file here</p>
            <p className="text-sm text-muted-foreground mb-4">or</p>
            <label htmlFor="file-upload">
              <Button type="button" onClick={() => document.getElementById('file-upload')?.click()}>
                Browse Files
              </Button>
              <input
                id="file-upload"
                type="file"
                className="hidden"
                accept=".csv,.xlsx,.xls"
                onChange={handleFileInput}
              />
            </label>
            <p className="text-xs text-muted-foreground mt-4">
              Supported formats: CSV, Excel (.xlsx, .xls)
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* File Info */}
            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div className="flex items-center gap-3">
                <FileSpreadsheet className="w-8 h-8 text-green-500" />
                <div>
                  <p>{file.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {(file.size / 1024).toFixed(2)} KB
                  </p>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={handleRemoveFile}>
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Validation Results */}
            {uploading && (
              <div className="flex items-center justify-center p-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="ml-3">Validating file...</span>
              </div>
            )}

            {validationResults.status && !uploading && (
              <div className="space-y-3">
                <h4 className="flex items-center gap-2">
                  {validationResults.status === 'success' && (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      Validation Complete
                    </>
                  )}
                  {validationResults.status === 'error' && (
                    <>
                      <AlertCircle className="w-5 h-5 text-red-500" />
                      Validation Failed
                    </>
                  )}
                  {validationResults.status === 'warning' && (
                    <>
                      <AlertCircle className="w-5 h-5 text-yellow-500" />
                      Validation Complete with Warnings
                    </>
                  )}
                </h4>
                <div className="space-y-2">
                  {validationResults.messages.map((message, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-2 text-sm p-2 rounded bg-background"
                    >
                      {message.startsWith('✓') && (
                        <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      )}
                      {message.startsWith('⚠') && (
                        <AlertCircle className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" />
                      )}
                      {message.startsWith('✗') && (
                        <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                      )}
                      <span>{message.substring(2)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </Card>

      {/* Action Buttons */}
      {file && validationResults.status === 'success' && (
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onBack}>
            Cancel
          </Button>
          <Button
            onClick={handleUpload}
            disabled={uploading}
            className="bg-green-600 hover:bg-green-700"
          >
            {uploading ? 'Uploading...' : 'Upload & Import Data'}
          </Button>
        </div>
      )}
    </div>
  );
}
