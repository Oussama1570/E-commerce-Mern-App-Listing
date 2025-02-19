import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductFilter from "../../components/shooping-view/filter.jsx";
import ShoppingProductTile from "../../components/admin-view/product-title.jsx";
import { fetchAllFilteredProducts } from "../../store/shop/products-slice";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ArrowUpDownIcon } from "lucide-react";

const sortOptions = [
  { id: "price_asc", label: "Price: Low to High" },
  { id: "price_desc", label: "Price: High to Low" },
  { id: "newest", label: "Newest Arrivals" },
  { id: "best_selling", label: "Best Selling" },
];

function ShoppingListing() {
  const dispatch = useDispatch();
  const { productList } = useSelector((state) => state.shopProducts);
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState(null);

  function handleSort(value) {
    console.log("Sorting by:", value);
    setSort(value);
  }

  function handleFilter(getSectionId, getCurrentOption) {
    setFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters };

      if (!updatedFilters[getSectionId]) {
        updatedFilters[getSectionId] = [];
      }

      const index = updatedFilters[getSectionId].indexOf(getCurrentOption);
      if (index === -1) {
        updatedFilters[getSectionId].push(getCurrentOption);
      } else {
        updatedFilters[getSectionId].splice(index, 1);
      }

      sessionStorage.setItem("filters", JSON.stringify(updatedFilters));
      return updatedFilters;
    });
  }

  function handleGetProductDetails(product) {
    console.log("Fetching product details:", product);
  }

  function handleAddtoCart(product) {
    console.log("Adding to cart:", product);
  }

  useEffect(() => {
    if (filters !== null || sort !== null) {
      dispatch(
        fetchAllFilteredProducts({ filterParams: filters, sortParams: sort })
      );
    }
  }, [dispatch, filters, sort]);

  console.log(filters, "filters");

  return (
    <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 p-4 md:p-6">
      <ProductFilter filters={filters} handleFilter={handleFilter} />
      <div className="bg-background w-full rounded-lg shadow-sm">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-extrabold">All Products</h2>
          <div className="flex items-center gap-3">
            <span className="text-muted-foreground">
              {productList?.length} Products
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <ArrowUpDownIcon className="h-4 w-4" />
                  <span>Sort by</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                  {sortOptions.map((sortItem) => (
                    <DropdownMenuRadioItem
                      value={sortItem.id}
                      key={sortItem.id}
                    >
                      {sortItem.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {productList && productList.length > 0
            ? productList.map((productItem) => (
                <ShoppingProductTile
                  key={productItem.id} 
                  handleGetProductDetails={handleGetProductDetails}
                  product={productItem}
                  handleAddtoCart={handleAddtoCart}
                />
              ))
            : <p className="col-span-full text-center text-gray-500">No products found.</p>}
        </div>
      </div>
    </div> 
  );
}

export default ShoppingListing;
