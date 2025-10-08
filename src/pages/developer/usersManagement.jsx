import { useState } from "react";
import { UploadCloud, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { uploadFileToS3 } from "@/api/upload";
import { bulkUserUpload } from "@/api/auth";
import { cn } from "@/lib/utils";

export default function UsersManagement() {
  const [excelFile, setExcelFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const mutation = useMutation({
    mutationFn: async (file) => {
      const uploadUrl = await uploadFileToS3(file, "developer");
      return bulkUserUpload({ fileUrl: uploadUrl });
    },
    onSuccess: () => {
      toast.success("Users registered successfully!");
      setExcelFile(null);
      setShowSuccess(true);
    },
    onError: () => toast.error("Failed to register users"),
  });

  const validateExcelFile = (file) => {
    const validTypes = [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-excel",
      "text/csv",
    ];
    if (!file || !validTypes.includes(file.type)) {
      toast.error("Please upload a valid Excel (.xlsx, .xls, or .csv) file");
      return false;
    }
    if (file.size > 10 * 1024 * 1024) {
      toast.error("File size must be less than 10MB");
      return false;
    }
    return true;
  };

  const handleFileInput = (file) => {
    if (file && validateExcelFile(file)) setExcelFile(file);
  };

  const handleFileChange = (e) => handleFileInput(e.target.files?.[0]);
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileInput(e.dataTransfer.files?.[0]);
  };

  const handleSubmit = () => {
    if (!excelFile) return toast.warning("Please upload a file first");
    mutation.mutate(excelFile);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="relative z-10 w-full max-w-xl bg-white/95 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-white/20">
        {showSuccess ? (
          <div className="text-center space-y-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-600 rounded-full mb-4">
              <FileText className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-green-700">Users Uploaded Successfully</h2>
            <Button
              onClick={() => setShowSuccess(false)}
              className="mt-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg w-full h-12"
            >
              Upload More Users
            </Button>
          </div>
        ) : (
          <>
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl mb-4">
                <FileText className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Bulk Developer Registration</h2>
              <p className="text-gray-600">Upload an Excel file to register multiple users</p>
            </div>

            <div
              className={cn(
                "flex flex-col items-center justify-center border-2 rounded-lg p-6 text-center space-y-4 transition-all duration-200 cursor-pointer",
                isDragging
                  ? "border-blue-500 bg-blue-50 border-solid"
                  : "border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100"
              )}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={(e) => {
                e.preventDefault();
                setIsDragging(false);
              }}
              onDrop={handleDrop}
            >
              <UploadCloud className={cn("w-10 h-10 transition-colors", isDragging ? "text-blue-600" : "text-blue-500")} />
              <p className="text-sm text-gray-500">
                {isDragging ? "Drop your Excel file here" : "Drag & drop your Excel file here, or click to upload"}
              </p>

              <div>
                <input
                  type="file"
                  accept=".xlsx,.xls,.csv"
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-upload"
                  disabled={mutation.isPending}
                />
                <label htmlFor="file-upload">
                  <Button
                    variant="outline"
                    type="button"
                    onClick={() => document.getElementById("file-upload")?.click()}
                    disabled={mutation.isPending}
                  >
                    Choose File
                  </Button>
                </label>
              </div>

              {excelFile && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg w-full">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <FileText className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium text-green-700">{excelFile.name}</span>
                    </div>
                    <button
                      onClick={() => setExcelFile(null)}
                      className="text-red-500 hover:text-red-700 text-sm font-medium"
                      disabled={mutation.isPending}
                    >
                      Remove
                    </button>
                  </div>
                  <p className="text-xs text-green-600 mt-1">
                    Size: {(excelFile.size / 1024).toFixed(1)} KB
                  </p>
                </div>
              )}
            </div>

            <Button
              onClick={handleSubmit}
              disabled={mutation.isPending || !excelFile}
              className={cn(
                "mt-6 w-full h-12 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg transition-all shadow-lg",
                "hover:scale-[1.02] active:scale-[0.98]",
                mutation.isPending || !excelFile ? "disabled:hover:scale-100" : ""
              )}
            >
              {mutation.isPending ? (
                <div className="flex items-center justify-center space-x-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Processing...</span>
                </div>
              ) : (
                `Submit${excelFile ? ` (${excelFile.name})` : ""}`
              )}
            </Button>

            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-xs text-blue-700">
                <strong>Note:</strong> Ensure your Excel file contains all required fields for user registration.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
