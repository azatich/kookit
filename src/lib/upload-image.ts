import { UploadApiResponse } from "cloudinary";
import cloudinary from "./cloudinary";

export default async function UploadImage(file: File, folder: string): Promise<UploadApiResponse> {
  const buffer = await file.arrayBuffer();
  const bytes = Buffer.from(buffer);

  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          resource_type: "auto",
          folder: folder,
        },
        (error, result) => {
          if (error) {
            return reject(error);
          }
          if (result) return resolve(result);
          return reject(new Error('Upload failed, no result'))
        }
      )
      .end(bytes);
  });
}
