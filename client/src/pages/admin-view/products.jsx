import { Fragment, useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../components/ui/button.jsx";
import ProductImageUpload from "../../components/admin-view/image-upload.jsx";
import AdminProductTile from "../../components/admin-view/product-title.jsx";
import { useToast } from "../../components/ui/use-toast.js";
import {
  addNewProduct,
  deleteProduct,
  editProduct,
  fetchAllProducts,
} from "@/store/admin/products-slice";

const initialFormData = {
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
  averageReview: 0,
};

function AdminProducts() {
  const [openCreateProductsDialog, setOpenCreateProductsDialog] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  const formRef = useRef(null);
  const { productList } = useSelector((state) => state.adminProducts);
  const dispatch = useDispatch();
  const { toast } = useToast();

  useEffect(() => {
    const fetchCategoriesAndBrands = async () => {
      setCategories(["Men", "Women", "Kids", "Electronics"]);
      setBrands(["Adidas", "Nike", "Apple", "Samsung"]);
    };
    fetchCategoriesAndBrands();
    dispatch(fetchAllProducts());
  }, [dispatch]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        setOpenCreateProductsDialog(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [formRef]);

  function onSubmit(event) {
    event.preventDefault();
    if (currentEditedId !== null) {
      dispatch(editProduct({ id: currentEditedId, formData })).then((data) => {
        if (data?.payload?.success) {
          dispatch(fetchAllProducts());
          resetForm();
          toast({ title: "Product updated successfully" });
        }
      });
    } else {
      dispatch(addNewProduct({ ...formData, image: uploadedImageUrl })).then((data) => {
        if (data?.payload?.success) {
          dispatch(fetchAllProducts());
          resetForm();
          toast({ title: "Product added successfully" });
        }
      });
    }
  }

  function resetForm() {
    setOpenCreateProductsDialog(false);
    setImageFile(null);
    setUploadedImageUrl("");
    setFormData(initialFormData);
    setCurrentEditedId(null);
  }

  function handleEdit(product) {
    setFormData({
      title: product.title,
      description: product.description,
      category: product.category,
      brand: product.brand,
      price: product.price,
      salePrice: product.salePrice,
      totalStock: product.totalStock,
      averageReview: product.averageReview,
    });
    setUploadedImageUrl(product.image);
    setCurrentEditedId(product.id);
    setOpenCreateProductsDialog(true);
  }

  function handleDelete(getCurrentProductId) {
    dispatch(deleteProduct(getCurrentProductId)).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllProducts());
      }
    });
  }

  function isFormValid() {
    return Object.keys(formData)
      .filter((key) => key !== "averageReview")
      .every((key) => formData[key] !== "");
  }

  return (
    <Fragment>
      <div className="mb-5 w-full flex justify-end">
        <Button onClick={() => setOpenCreateProductsDialog(true)}>Add New Product</Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {productList?.map((productItem) => (
          <AdminProductTile
            key={productItem.id}
            setFormData={setFormData}
            setOpenCreateProductsDialog={setOpenCreateProductsDialog}
            setCurrentEditedId={setCurrentEditedId}
            product={productItem}
            handleDelete={handleDelete}
            handleEdit={() => handleEdit(productItem)}
          />
        ))}
      </div>
      <div
        className={`fixed top-0 right-0 h-full w-96 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          openCreateProductsDialog ? "translate-x-0" : "translate-x-full"
        }`}
        ref={formRef}
      >
        <div className="p-6 h-full flex flex-col">
          <h2 className="text-xl font-semibold text-center mb-4">
            {currentEditedId !== null ? "Edit Product" : "Add New Product"}
          </h2>
          <div className="flex-grow overflow-y-auto pr-4">
            <form onSubmit={onSubmit} className="space-y-6">
              <ProductImageUpload
                imageFile={imageFile}
                setImageFile={setImageFile}
                uploadedImageUrl={uploadedImageUrl}
                setUploadedImageUrl={setUploadedImageUrl}
                setImageLoadingState={setImageLoadingState}
                imageLoadingState={imageLoadingState}
                isEditMode={currentEditedId !== null}
              />
              {[
                { label: "Title", key: "title", type: "text" },
                { label: "Description", key: "description", type: "textarea" },
                { label: "Category", key: "category", type: "select", options: categories },
                { label: "Brand", key: "brand", type: "select", options: brands },
                { label: "Price", key: "price", type: "number" },
                { label: "Sale Price", key: "salePrice", type: "number" },
                { label: "Total Stock", key: "totalStock", type: "number" },
                { label: "Average Review", key: "averageReview", type: "number" },
              ].map(({ label, key, type, options }) => (
                <div key={key} className="text-sm">
                  <label className="block font-medium text-gray-700 mb-1">{label}</label>
                  {type === "select" ? (
                    <select
                      value={formData[key]}
                      onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    >
                      <option value="">Select {label.toLowerCase()}</option>
                      {options.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  ) : type === "textarea" ? (
                    <textarea
                      value={formData[key]}
                      onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  ) : (
                    <input
                      type={type}
                      value={formData[key]}
                      onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  )}
                </div>
              ))}
              <div className="flex justify-center mt-4">
                <Button type="submit" disabled={!isFormValid()} className="w-full">
                  {currentEditedId !== null ? "Edit" : "Add"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default AdminProducts;
