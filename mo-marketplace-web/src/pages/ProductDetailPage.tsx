import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { productsApi } from "../api/products.api";
import type { Product, Variant } from "../types";
import { LoadingSpinner } from "../components/ui/LoadingSpinner";
import { Button } from "../components/ui/Button";
import { VariantSelector } from "../components/variant/VariantSelector";
import { QuickBuyModal } from "../components/variant/QuickBuyModal";

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isQuickBuyOpen, setIsQuickBuyOpen] = useState(false);

  useEffect(() => {
    if (id) {
      loadProduct(id);
    }
  }, [id]);

  const loadProduct = async (productId: string) => {
    try {
      setIsLoading(true);
      const data = await productsApi.getById(productId);
      setProduct(data);
    } catch (err: any) {
      alert("Failed to load product");
      navigate("/products");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectVariant = (variant: Variant) => {
    setSelectedVariant(variant);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!product) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Back button */}
      <button
        onClick={() => navigate("/products")}
        className="mb-6 text-blue-600 hover:text-blue-800 flex items-center"
      >
        <svg
          className="w-5 h-5 mr-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back to Products
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Info */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {product.name}
          </h1>

          {product.description && (
            <p className="text-gray-600 mb-6">{product.description}</p>
          )}

          <div className="mb-6">
            <span className="text-sm text-gray-500">Base Price:</span>
            <p className="text-2xl font-bold text-blue-600">
              ${Number(product.basePrice).toFixed(2)}
            </p>
          </div>

          <div className="text-sm text-gray-500">
            <p>Created: {new Date(product.createdAt).toLocaleDateString()}</p>
            <p>Updated: {new Date(product.updatedAt).toLocaleDateString()}</p>
          </div>
        </div>

        {/* Variants Section */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <VariantSelector
            variants={product.variants || []}
            selectedVariant={selectedVariant}
            onSelectVariant={handleSelectVariant}
          />

          {selectedVariant && (
            <div className="mt-6 pt-6 border-t">
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-1">Selected Variant:</p>
                <p className="font-medium capitalize">
                  {selectedVariant.color} / {selectedVariant.size} /{" "}
                  {selectedVariant.material}
                </p>
                <p className="text-lg font-bold text-blue-600 mt-2">
                  $
                  {selectedVariant.price
                    ? Number(selectedVariant.price).toFixed(2)
                    : Number(product.basePrice).toFixed(2)}
                </p>
              </div>

              <Button
                onClick={() => setIsQuickBuyOpen(true)}
                className="w-full"
                size="lg"
              >
                Quick Buy Now
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Quick Buy Modal */}
      {product && selectedVariant && (
        <QuickBuyModal
          isOpen={isQuickBuyOpen}
          onClose={() => setIsQuickBuyOpen(false)}
          product={product}
          variant={selectedVariant}
        />
      )}
    </div>
  );
};

export default ProductDetailPage;
