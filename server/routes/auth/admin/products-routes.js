const express = require("express");
const {
  handleImageUpload,
  addProduct,
  editProduct,
  fetchAllProducts,
  deleteProduct,
} = require("../../../controllers/admin/products-controller.js"); // ✅ Fixed incorrect path

const { upload } = require("../../../helpers/cloudinary.js");

const router = express.Router();

// Routes for product image upload and CRUD operations
router.post("/upload-image", upload.single("my_file"), handleImageUpload);
router.post("/add", addProduct);
router.put("/edit/:id", editProduct);
router.get("/fetch", fetchAllProducts);  // ✅ Corrected to "/fetch"
router.delete("/delete/:id", deleteProduct);

module.exports = router;
