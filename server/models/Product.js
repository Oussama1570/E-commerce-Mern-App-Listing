const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    image: { 
      type: String, 
      default: "/default-placeholder.jpg", // Local fallback
      set: (value) => value?.trim() ? value : "/default-placeholder.jpg"
    },
    
    
    title: String,
    description: String,
    category: String,
    brand: String,
    price: Number,
    salePrice: Number,
    totalStock: Number,
    averageReview: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);