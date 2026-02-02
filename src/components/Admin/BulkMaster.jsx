import { useState, useRef } from 'react';
import { subjects } from '../../data/subjects';
import { levels } from '../../data/levels';
import { categories } from '../../data/categories';

export default function BulkMaster() {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [parsedData, setParsedData] = useState([]);
  const [importStatus, setImportStatus] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState([]);
  const [successCount, setSuccessCount] = useState(0);
  const fileInputRef = useRef(null);

  const sampleCSV = `subject,level,question,option_a,option_b,option_c,option_d,correct_option,time_limit,base_weightage
Mathematics,Beginner,What is 2 + 2?,2,3,4,5,A,30,3
Science,Intermediate,What is the chemical symbol for water?,H2O,H2,H2O2,HO,A,45,4
History,Advanced,Who was the first President of the United States?,George Washington,Thomas Jefferson,Abraham Lincoln,John Adams,A,60,5`;

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFile(file);
      setParsedData([]);
      setErrors([]);
      setImportStatus(null);
      setSuccessCount(0);
      parseCSV(file);
    }
  };

  const parseCSV = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      const lines = text.split('\n').filter(line => line.trim());
      const headers = lines[0].split(',').map(h => h.trim().toLowerCase());

      const expectedHeaders = ['subject', 'level', 'question', 'option_a', 'option_b', 'option_c', 'option_d', 'correct_option', 'time_limit', 'base_weightage'];

      const missingHeaders = expectedHeaders.filter(h => !headers.includes(h));
      if (missingHeaders.length > 0) {
        setErrors([`Missing required columns: ${missingHeaders.join(', ')}`]);
        return;
      }

      const data = [];
      const validationErrors = [];

      for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',').map(v => v.trim());
        if (values.length !== expectedHeaders.length) {
          validationErrors.push(`Row ${i + 1}: Incorrect number of columns`);
          continue;
        }

        const rowData = {};
        headers.forEach((header, index) => {
          rowData[header] = values[index];
        });

        // Validate data
        const subject = subjects.find(s => s.name.toLowerCase() === rowData.subject.toLowerCase());
        const level = levels.find(l => l.name.toLowerCase() === rowData.level.toLowerCase());

        if (!subject) {
          validationErrors.push(`Row ${i + 1}: Subject "${rowData.subject}" not found`);
        }
        if (!level) {
          validationErrors.push(`Row ${i + 1}: Level "${rowData.level}" not found`);
        }
        if (!rowData.question) {
          validationErrors.push(`Row ${i + 1}: Question is required`);
        }
        if (!['a', 'b', 'c', 'd'].includes(rowData.correct_option.toLowerCase())) {
          validationErrors.push(`Row ${i + 1}: Correct option must be A, B, C, or D`);
        }

        rowData.subjectId = subject?.id;
        rowData.levelId = level?.id;
        rowData.correctOption = ['a', 'b', 'c', 'd'].indexOf(rowData.correct_option.toLowerCase());
        rowData.options = [rowData.option_a, rowData.option_b, rowData.option_c, rowData.option_d];
        rowData.timeLimit = parseInt(rowData.time_limit) || 30;
        rowData.baseWeightage = parseInt(rowData.base_weightage) || 3;

        data.push(rowData);
      }

      setParsedData(data);
      setErrors(validationErrors);
    };
    reader.readAsText(file);
  };

  const handleImport = async () => {
    if (errors.length > 0) {
      alert('Please fix validation errors before importing');
      return;
    }

    setIsProcessing(true);
    setImportStatus('Importing questions...');

    try {
      // Simulate API call - in real app, this would be an actual API request
      let success = 0;
      for (let i = 0; i < parsedData.length; i++) {
        setImportStatus(`Importing question ${i + 1} of ${parsedData.length}...`);
        await new Promise(resolve => setTimeout(resolve, 500)); // Simulate delay

        // Here you would make actual API call to save the question
        // For now, we'll just count successes
        success++;
      }

      setSuccessCount(success);
      setImportStatus(`Successfully imported ${success} questions!`);
      setUploadedFile(null);
      setParsedData([]);
      fileInputRef.current.value = '';
    } catch (error) {
      setImportStatus('Import failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadSampleCSV = () => {
    const blob = new Blob([sampleCSV], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sample_questions.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">
            Bulk Import Master
          </h1>
          <p className="text-muted-foreground">Import multiple questions from CSV file</p>
        </div>
        <button onClick={downloadSampleCSV} className="btn-secondary">
          📥 Download Sample CSV
        </button>
      </div>

      {/* Upload Section */}
      <div className="card-base p-6 mb-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Upload CSV File</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Select CSV File
            </label>
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              className="input-base"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Upload a CSV file with questions data. Download sample CSV for format reference.
            </p>
          </div>

          {uploadedFile && (
            <div className="p-4 bg-muted/50 rounded-lg">
              <p className="text-sm text-foreground">
                📄 File: {uploadedFile.name} ({(uploadedFile.size / 1024).toFixed(1)} KB)
              </p>
            </div>
          )}
        </div>
      </div>

      {/* CSV Format Instructions */}
      <div className="card-base p-6 mb-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">CSV Format Requirements</h2>

        <div className="space-y-3 text-sm text-muted-foreground">
          <p><strong>Required columns:</strong> subject, level, question, option_a, option_b, option_c, option_d, correct_option, time_limit, base_weightage</p>
          <p><strong>Subject:</strong> Must match existing subject names (case-insensitive)</p>
          <p><strong>Level:</strong> Must match existing level names (case-insensitive)</p>
          <p><strong>Correct Option:</strong> A, B, C, or D (case-insensitive)</p>
          <p><strong>Time Limit:</strong> Number in seconds (default: 30)</p>
          <p><strong>Base Weightage:</strong> Number (default: 3)</p>
        </div>
      </div>

      {/* Validation Results */}
      {parsedData.length > 0 && (
        <div className="card-base p-6 mb-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Import Preview</h2>

          <div className="mb-4">
            <p className="text-sm text-muted-foreground">
              Found {parsedData.length} questions to import
            </p>
          </div>

          {errors.length > 0 && (
            <div className="mb-4 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
              <h3 className="font-semibold text-destructive mb-2">Validation Errors:</h3>
              <ul className="text-sm text-destructive space-y-1">
                {errors.map((error, index) => (
                  <li key={index}>• {error}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            {parsedData.slice(0, 6).map((question, index) => (
              <div key={index} className="p-4 bg-muted/50 rounded-lg">
                <p className="font-medium text-foreground text-sm mb-2 line-clamp-2">
                  {question.question}
                </p>
                <div className="text-xs text-muted-foreground space-y-1">
                  <p>Subject: {question.subject}</p>
                  <p>Level: {question.level}</p>
                  <p>Correct: {question.correct_option.toUpperCase()}</p>
                </div>
              </div>
            ))}
          </div>

          {parsedData.length > 6 && (
            <p className="text-sm text-muted-foreground mb-4">
              ... and {parsedData.length - 6} more questions
            </p>
          )}

          <button
            onClick={handleImport}
            disabled={errors.length > 0 || isProcessing}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing ? '🔄 Importing...' : `📤 Import ${parsedData.length} Questions`}
          </button>
        </div>
      )}

      {/* Import Status */}
      {importStatus && (
        <div className="card-base p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Import Status</h2>
          <div className={`p-4 rounded-lg ${
            importStatus.includes('Successfully')
              ? 'bg-success/10 text-success border border-success/20'
              : importStatus.includes('failed')
              ? 'bg-destructive/10 text-destructive border border-destructive/20'
              : 'bg-muted/50 text-foreground'
          }`}>
            <p className="font-medium">{importStatus}</p>
            {successCount > 0 && (
              <p className="text-sm mt-1">✅ {successCount} questions imported successfully</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
