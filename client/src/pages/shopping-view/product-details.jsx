import { Dialog, DialogContent } from "../../components/ui/dialog.jsx";
import { Separator } from "../../components/ui/separator.jsx";
import { Avatar, AvatarFallback } from "../../components/ui/avatar.jsx";
import { StarIcon } from "lucide-react";
import { Input } from "../../components/ui/input.jsx";
import { Button } from "../../components/ui/button.jsx";

function ProductDetailsDialog({ open, setOpen, productDetails }) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 sm:p-10 max-w-[800px] rounded-lg overflow-hidden">
        {/* Left: Product Image */}
        <div className="relative overflow-hidden rounded-lg">
          <img
            src={productDetails?.image}
            alt={productDetails?.title}
            width={600}
            height={600}
            className="aspect-square w-full object-cover"
          />
        </div>

        {/* Right: Product Details */}
        <div className="grid gap-6">
          <div>
            <h1 className="text-3xl font-extrabold">{productDetails?.title}</h1>
            <p className="text-muted-foreground text-lg mt-2">
              {productDetails?.description}
            </p>
          </div>

          {/* Product Rating */}
          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center gap-0.5">
              <StarIcon className="w-5 h-5 text-primary fill-current" />
              <StarIcon className="w-5 h-5 text-primary fill-current" />
              <StarIcon className="w-5 h-5 text-primary fill-current" />
              <StarIcon className="w-5 h-5 text-primary fill-current" />
              <StarIcon className="w-5 h-5 text-primary fill-current" />
            </div>
            <span className="text-muted-foreground">(4.5)</span>
          </div>

          {/* Add to Cart Button */}
          <div className="mt-4 mb-4">
            <button className="w-full bg-black hover:bg-gray-900 text-white font-bold py-2 px-4 rounded">
              Add to Cart
            </button>
          </div>

          <Separator />

          {/* Reviews Section */}
          <div className="max-h-[300px] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Reviews</h2>
            <div className="grid gap-6">
              {/* Static Review 1 */}
              <div className="flex gap-4">
                <Avatar className="w-10 h-10 border">
                  <AvatarFallback>SM</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold">Sangam Mukherjee</h3>
                    <span className="text-muted-foreground">(4.5)</span>
                    <div className="flex items-center gap-0.5">
                      <StarIcon className="w-5 h-5 text-primary fill-current" />
                      <StarIcon className="w-5 h-5 text-primary fill-current" />
                      <StarIcon className="w-5 h-5 text-primary fill-current" />
                      <StarIcon className="w-5 h-5 text-primary fill-current" />
                      <StarIcon className="w-5 h-5 text-primary fill-current" />
                    </div>
                  </div>
                  <p>This is the best product I have ever used.</p>
                </div>
              </div>

              {/* Static Review 2 */}
              <div className="flex gap-4">
                <Avatar className="w-10 h-10 border">
                  <AvatarFallback>SM</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold">Sangam Mukherjee</h3>
                    <span className="text-muted-foreground">(4.5)</span>
                    <div className="flex items-center gap-0.5">
                      <StarIcon className="w-5 h-5 text-primary fill-current" />
                      <StarIcon className="w-5 h-5 text-primary fill-current" />
                      <StarIcon className="w-5 h-5 text-primary fill-current" />
                      <StarIcon className="w-5 h-5 text-primary fill-current" />
                      <StarIcon className="w-5 h-5 text-primary fill-current" />
                    </div>
                  </div>
                  <p>This is the best product I have ever used.</p>
                </div>
              </div>

              {/* Static Review 3 */}
              <div className="flex gap-4">
                <Avatar className="w-10 h-10 border">
                  <AvatarFallback>SM</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold">Sangam Mukherjee</h3>
                    <span className="text-muted-foreground">(4.5)</span>
                    <div className="flex items-center gap-0.5">
                      <StarIcon className="w-5 h-5 text-primary fill-current" />
                      <StarIcon className="w-5 h-5 text-primary fill-current" />
                      <StarIcon className="w-5 h-5 text-primary fill-current" />
                      <StarIcon className="w-5 h-5 text-primary fill-current" />
                      <StarIcon className="w-5 h-5 text-primary fill-current" />
                    </div>
                  </div>
                  <p>This is the best product I have ever used.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Write a Review */}
          <div className="mt-6 flex gap-4">
            <Input placeholder="Write a review..." />
            <Button>Submit</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ProductDetailsDialog;
