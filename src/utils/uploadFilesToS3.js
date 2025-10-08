export const uploadFilesToS3Util = async (files, uploadFileToS3, role = '') => {
  if (!Array.isArray(files) || files.length === 0) return [];

  return Promise.all(
    files.map(async (file) => {
      try {
        if (file?.url || file?.isDefault) {
          return {
            fileUrl: file.url || file.fileUrl,
            fileName: file.fileName || file.name,
          };
        }
        const fileUrl = await uploadFileToS3(file, role);
        return { fileUrl, fileName: file.name };
      } catch (err) {
        console.error(`Upload failed for file: ${file?.name}`, err);
        throw new Error(`Failed to upload file: ${file?.name || 'unknown'}`);
      }
    })
  );
};