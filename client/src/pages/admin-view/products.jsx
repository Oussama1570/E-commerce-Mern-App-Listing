import { SideNav, SideNavItems, SideNavLink } from "@carbon/react";
import ProductImageUpload from "../../components/admin-view/image-upload.jsx";
import AdminProductTile from "../../components/admin-view/product-title.jsx";
import CommonForm from "../../components/common/form.jsx";
import { Button } from "../../components/ui/button.jsx";
import { useToast } from "../../components/ui/use-toast.jsx";
import { addProductFormElements } from "@/config";
import {
  addNewProduct,
  deleteProduct,
  editProduct,
  fetchAllProducts,
} from "@/store/admin/products-slice/index.js";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

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

  const { productList } = useSelector((state) => state.adminProducts);
  const dispatch = useDispatch();
  const { toast } = useToast();

  function onSubmit(event) {
    event.preventDefault();

    if (currentEditedId !== null) {
      dispatch(editProduct({ id: currentEditedId, formData })).then((data) => {
        if (data?.payload?.success) {
          dispatch(fetchAllProducts());  // ✅ Corrected action
          setFormData(initialFormData);
          setOpenCreateProductsDialog(false);
          setCurrentEditedId(null);
        }
      });
    } else {
      dispatch(addNewProduct({ ...formData, image: uploadedImageUrl })).then((data) => {
        if (data?.payload?.success) {
          dispatch(fetchAllProducts());  // ✅ Corrected action
          setOpenCreateProductsDialog(false);
          setImageFile(null);
          setFormData(initialFormData);
          toast({ title: "Product added successfully" });
        }
      });
    }
  }

  function handleDelete(getCurrentProductId) {
    dispatch(deleteProduct(getCurrentProductId)).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllProducts());  // ✅ Corrected action
      }
    });
  }

  function isFormValid() {
    return Object.keys(formData)
      .filter((currentKey) => currentKey !== "averageReview")
      .map((key) => formData[key] !== "")
      .every((item) => item);
  }

  useEffect(() => {
    dispatch(fetchAllProducts());  // ✅ Corrected action to fetch products
  }, [dispatch]);

  return (
    <Fragment>
      <div className="mb-5 w-full flex justify-end">
        <Button onClick={() => setOpenCreateProductsDialog(true)}>
          Add New Product
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {productList && productList.length > 0
          ? productList.map((productItem) => (
              <AdminProductTile
                key={productItem._id}
                setFormData={setFormData}
                setOpenCreateProductsDialog={setOpenCreateProductsDialog}
                setCurrentEditedId={setCurrentEditedId}
                product={productItem}
                handleDelete={handleDelete}
              />
            ))
          : null}
      </div>
      <SideNav aria-label="Product Navigation">
        <SideNavItems>
          <SideNavLink onClick={() => setOpenCreateProductsDialog(true)}>
            {currentEditedId !== null ? "Edit Product" : "Add New Product"}
          </SideNavLink>
        </SideNavItems>
      </SideNav>
      {openCreateProductsDialog && (
        <div className="fixed right-0 top-0 h-full w-1/3 bg-white p-6 overflow-y-auto border-l shadow-lg">
          <ProductImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            setImageLoadingState={setImageLoadingState}
            imageLoadingState={imageLoadingState}
            isEditMode={currentEditedId !== null}
          />
          <CommonForm
            onSubmit={onSubmit}
            formData={formData}
            setFormData={setFormData}
            buttonText={currentEditedId !== null ? "Edit" : "Add"}
            formControls={addProductFormElements}
            isBtnDisabled={!isFormValid()}
          />
        </div>
      )}
    </Fragment>
  );
}

export default AdminProducts;
