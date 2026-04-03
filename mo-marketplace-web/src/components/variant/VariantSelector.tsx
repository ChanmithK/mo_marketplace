import React from "react";
import type { Variant } from "../../types";

interface VariantSelectorProps {
  variants: Variant[];
  selectedVariant: Variant | null;
  onSelectVariant: (variant: Variant) => void;
}

export const VariantSelector: React.FC<VariantSelectorProps> = ({
  variants,
  selectedVariant,
  onSelectVariant,
}) => {
  if (!variants || variants.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No variants available for this product.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Select Variant</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {variants.map((variant) => {
          const isOutOfStock = variant.stock === 0;
          const isSelected = selectedVariant?.id === variant.id;

          return (
            <button
              key={variant.id}
              onClick={() => !isOutOfStock && onSelectVariant(variant)}
              disabled={isOutOfStock}
              className={`p-4 border rounded-lg text-left transition-all ${
                isSelected
                  ? "border-blue-600 bg-blue-50 ring-2 ring-blue-500"
                  : "border-gray-200 hover:border-gray-300"
              } ${isOutOfStock ? "opacity-50 cursor-not-allowed bg-gray-100" : "cursor-pointer bg-white"}`}
            >
              <div className="flex justify-between items-start mb-2">
                <span className="font-medium text-gray-900 capitalize">
                  {variant.color} / {variant.size}
                </span>
                {isOutOfStock && (
                  <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">
                    Out of Stock
                  </span>
                )}
              </div>

              <div className="text-sm text-gray-600 mb-2">
                Material: <span className="capitalize">{variant.material}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="font-bold text-blue-600">
                  ${variant.price ? Number(variant.price).toFixed(2) : "N/A"}
                </span>
                <span className="text-xs text-gray-500">
                  Stock: {variant.stock}
                </span>
              </div>

              <div className="mt-2 text-xs text-gray-400">
                Key: {variant.combinationKey}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
