import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  productList: [],
};

// Add new product
export const addNewProduct = createAsyncThunk(
  "adminProducts/addNewProduct",  // Updated action name for consistency
  async (formData) => {
    const result = await axios.post(
      "http://localhost:5000/api/admin/products/add", // Correct endpoint
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return result?.data;
  }
);

// Fetch all products
export const fetchAllProducts = createAsyncThunk(
  "adminProducts/fetchAllProducts",  // Updated action name for consistency
  async () => {
    const result = await axios.get(
      "http://localhost:5000/api/admin/products/fetch" // Corrected to `/fetch`
    );
    return result?.data;
  }
);

// Edit product
export const editProduct = createAsyncThunk(
  "adminProducts/editProduct",  // Updated action name for consistency
  async ({ id, formData }) => {
    const result = await axios.put(
      `http://localhost:5000/api/admin/products/edit/${id}`, // Correct endpoint
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return result?.data;
  }
);

// Delete product
export const deleteProduct = createAsyncThunk(
  "adminProducts/deleteProduct",  // Updated action name for consistency
  async (id) => {
    const result = await axios.delete(
      `http://localhost:5000/api/admin/products/delete/${id}` // Correct endpoint
    );
    return result?.data;
  }
);

const AdminProductsSlice = createSlice({
  name: "adminProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload.data;  // Corrected the data path
      })
      .addCase(fetchAllProducts.rejected, (state) => {
        state.isLoading = false;
        state.productList = [];
      });
  },
});

export default AdminProductsSlice.reducer;
