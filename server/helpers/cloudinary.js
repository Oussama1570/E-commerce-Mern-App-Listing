const cloudinary = require("cloudinary").v2;
const multer = require("multer");

// Configure Cloudinary
cloudinary.config({
  cloud_name: "dgtwkfd9o",
  api_key: "553419321351825",
  api_secret: "-B_GWxiiAuB1rOxlh0AdNspEpkc",
});

// Define storage using multer's memory storage
const storage = multer.memoryStorage(); // ✅ FIXED: storage is now defined

// Configure multer with storage
const upload = multer({ storage });

// Function to upload image to Cloudinary
async function handleImageUpload(file) {
  try {
    const result = await cloudinary.uploader.upload(file, {
      resource_type: "auto",
    });
    return result;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw error;
  }
}

// Export functions
module.exports = { upload, handleImageUpload };
