import cloudinary from "cloudinary";
import fs from "fs";

// config cloudinary
cloudinary.v2.config({
  cloud_name: "dis89p0kx",
  api_key: "459428976496147",
  api_secret: "0Tze_NAzxAC9juj2a8kPCoGYhkw",
});

export const cloudUpload = async (req) => {
  // upload brand logo
  const data = await cloudinary.v2.uploader.upload(req?.file?.path);
  return data;
};

export const cloudUploads = async (path) => {
  // upload brand logo
  const data = await cloudinary.v2.uploader.upload(path);
  return data.secure_url;
};

export const cloudDelete = async (publicId) => {
  // delete brand logo
  await cloudinary.v2.uploader.destroy(publicId);
};
