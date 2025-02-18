import ProductFilter from '../../components/shooping-view/filter.jsx';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem // Import other necessary components
} from "@/components/ui/dropdown-menu"; // Or your UI library path
import { Button } from "@/components/ui/button"; // Or your UI library path

const ShoppingListing = () => {
  const sortOptions = [
    { id: '1', label: 'Price: Low to High' },
    { id: '2', label: 'Price: High to Low' },
    // Add more sort options as needed
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 p-4 md:p-6">
      <ProductFilter />
      <div className="bg-background w-full rounded-lg shadow-sm">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-extrabold">All Products</h2>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">18 Products</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  Sort By
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuRadioGroup>
                  {sortOptions.map((sortItem) => (
                    <DropdownMenuRadioItem key={sortItem.id} value={sortItem.id}>
                      {sortItem.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        {/* Product listing or mapping logic goes here */}
      </div>
    </div>
  );
};

export default ShoppingListing;
