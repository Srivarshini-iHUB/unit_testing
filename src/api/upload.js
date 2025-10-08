import axiosInstance from "./axiosInstance";
import { URL_CONSTANTS } from "./urls";
import axios from "axios";

export const uploadFileToS3 = async (file, persona) => {
  try {

    // Step 1: Get presigned URL from backend
    const {
      data: { uploadUrl, key },
    } = await axiosInstance.post(URL_CONSTANTS.generatePresignedURL, {
      fileName: file.name,
      fileType: file.type,
      persona,
    });

    
    // Step 2: Upload the file directly to S3
    await axios.put(uploadUrl, file, {
      headers: { "Content-Type": file.type || "application/octet-stream" },
    });


    // Step 3: Return final file URL from S3
    const { VITE_APP_AWS_S3_BUCKET_NAME, VITE_APP_AWS_REGION } = import.meta.env;

    return `https://${VITE_APP_AWS_S3_BUCKET_NAME}.s3.${VITE_APP_AWS_REGION}.amazonaws.com/${key}`;
  } catch (error) {
    console.error("S3 Upload Error:", error);
    throw new Error("File upload to S3 failed");
  }
};
