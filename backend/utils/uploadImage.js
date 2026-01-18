import cloudinary from "../config/cloudinary.js";

export const uploadImage = async (buffer) => {
  if (!buffer) throw new Error("No file buffer provided for upload");

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "hrmis/passports",
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result.secure_url);
      }
    );
    stream.end(buffer);
  });
};
