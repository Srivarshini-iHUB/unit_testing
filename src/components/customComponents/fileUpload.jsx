import { Download, Eye, X } from 'lucide-react';
import { useRef, useState, useCallback, useMemo } from 'react';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';

export default function FileUpload({
  isEditable = true,
  viewOnly = false,
  defaultFiles = [],
  multiple = false,
}) {
  const inputRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);
  const [fileDataList, setFileDataList] = useState(defaultFiles);

  const handleFileChange = useCallback(
    (e) => {
      const files = Array.from(e.target.files || []);
      if (files.length > 0) {
        setFileDataList((prev) => (multiple ? [...prev, ...files] : [files[0]]));
      }
    },
    [multiple]
  );

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      setDragOver(false);
      const files = Array.from(e.dataTransfer?.files || []);
      if (files.length > 0) {
        setFileDataList((prev) => (multiple ? [...prev, ...files] : [files[0]]));
      }
    },
    [multiple]
  );

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback(() => setDragOver(false), []);

  const handleRemoveFile = useCallback((index) => {
    setFileDataList((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const formatFileSize = useCallback((bytes) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }, []);

  const getFileIcon = useCallback((fileName = '') => {
    return 'src/assets/icons/powerpoint.svg';
    const lower = fileName.toLowerCase();
    if (lower.includes('pdf')) return 'src/assets/icons/pdf.svg';
    if (lower.includes('doc') || lower.includes('word')) return 'src/assets/icons/word.svg';
    if (lower.includes('ppt')) return 'src/assets/icons/powerpoint.svg';
    if (lower.includes('xls') || lower.includes('spreadsheet')) return 'src/assets/icons/excel.svg';
   
  }, []);

  const shouldShowUploadBox = useMemo(
    () => isEditable && (multiple || fileDataList.length === 0),
    [isEditable, multiple, fileDataList.length]
  );

  return (
    <>
      {shouldShowUploadBox && (
        <div
          className={cn(
            'relative rounded-md border-[1.2px] border-dashed select-none cursor-pointer',
            dragOver ? 'bg-blue-100' : 'bg-backgroundFill',
            'border-color1',
            'w-full max-w-xl', 
            'aspect-[4/1]' 
          )}
          onClick={() => inputRef.current?.click()}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            type="file"
            ref={inputRef}
            onChange={handleFileChange}
            className="hidden"
            multiple={multiple}
          />
        <div
  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
             border-dashed border-color1 flex flex-col items-center justify-start gap-1.5 
             p-2 cursor-pointer
             w-[80%] max-w-[200px] min-w-[120px]
             max-h-[100px]"
>
  <Download
    className="w-1/2 max-w-[128px] h-auto rotate-180 text-color1 mb-1"
    aria-label="upload icon"
  />
  <div className="w-full flex flex-col items-center justify-center gap-1">
    <p className="text-base leading-6 text-color1 text-center">
      Upload by computer
    </p>
    <p className="text-xs text-color1 text-center">Drag & drop or click</p>
  </div>
</div>
        </div>
      )}

      {fileDataList.length > 0 && (
        <div className="space-y-3 mt-4 w-full max-w-xl">
          {fileDataList.map((file, index) => {
            const fileIcon = getFileIcon(file.name || file.type);
            const fileSizeFormatted = formatFileSize(file.size || 0);

            return (
              <div
                key={index}
                className="rounded-md bg-backgroundFill flex items-center justify-between select-none p-3"
                style={{ minHeight: '4.5rem' }}
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <img src={fileIcon} alt="file-icon" className="w-5 h-5 flex-shrink-0" />
                  <div className="flex flex-col min-w-0 overflow-hidden">
                    <p
                      className="text-sm text-color1 truncate"
                      title={file.name}
                    >
                      {file.name}
                    </p>
                    <p className="text-xs text-color3">{fileSizeFormatted}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 ml-4">
                  <Button
                    variant="primary"
                    size="sm"
                    className="bg-viewBtn text-[12px] text-color1 flex items-center gap-1.5 px-3"
                  >
                    <Eye size={16} />
                    View
                  </Button>

                  {isEditable && !viewOnly && (
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => handleRemoveFile(index)}
                      className="bg-color3 text-white flex items-center justify-center"
                      style={{ width: '36px', height: '36px', borderRadius: '10px', padding: '0' }}
                    >
                      <X size={16} />
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
