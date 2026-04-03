import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import {
  productSchema,
  variantSchema,
  type ProductFormData,
  type VariantFormData,
} from "../utils/validation";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { Alert } from "../components/ui/Alert";
import { productsApi } from "../api/products.api";

const ProductCreatePage: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "variants",
  });

  const onSubmit = async (
    data: ProductFormData & { variants?: VariantFormData[] },
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      // Create product first
      const product = await productsApi.create({
        name: data.name,
        description: data.description,
        basePrice: data.basePrice,
      });

      // Create variants if any
      if (data.variants && data.variants.length > 0) {
        for (const variant of data.variants) {
          await productsApi.createVariant(product.id, variant);
        }
      }

      navigate(`/products/${product.id}`);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to create product");
    } finally {
      setIsLoading(false);
    }
  };

  const addVariant = () => {
    append({
      color: "",
      size: "",
      material: "",
      stock: 0,
      price: undefined,
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Create New Product
      </h1>

      {error && (
        <Alert type="error" message={error} onClose={() => setError(null)} />
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Product Details */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Product Details</h2>

          <Input
            label="Product Name"
            error={errors.name?.message}
            {...register("name")}
          />

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              {...register("description")}
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="mt-4">
            <Input
              label="Base Price"
              type="number"
              step="0.01"
              error={errors.basePrice?.message}
              {...register("basePrice", { valueAsNumber: true })}
            />
          </div>
        </div>

        {/* Variants Section */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Variants</h2>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addVariant}
            >
              Add Variant
            </Button>
          </div>

          {fields.length === 0 ? (
            <p className="text-gray-500 text-sm">No variants added yet.</p>
          ) : (
            <div className="space-y-4">
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="border rounded-lg p-4 bg-gray-50 relative"
                >
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="absolute top-2 right-2 text-red-600 hover:text-red-800"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>

                  <h3 className="font-medium mb-3">Variant {index + 1}</h3>

                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="Color"
                      error={(errors.variants?.[index]?.color as any)?.message}
                      {...register(`variants.${index}.color`)}
                    />

                    <Input
                      label="Size"
                      error={(errors.variants?.[index]?.size as any)?.message}
                      {...register(`variants.${index}.size`)}
                    />

                    <Input
                      label="Material"
                      error={
                        (errors.variants?.[index]?.material as any)?.message
                      }
                      {...register(`variants.${index}.material`)}
                    />

                    <Input
                      label="Stock"
                      type="number"
                      error={(errors.variants?.[index]?.stock as any)?.message}
                      {...register(`variants.${index}.stock`, {
                        valueAsNumber: true,
                      })}
                    />

                    <Input
                      label="Price (optional)"
                      type="number"
                      step="0.01"
                      error={(errors.variants?.[index]?.price as any)?.message}
                      {...register(`variants.${index}.price`, {
                        valueAsNumber: true,
                      })}
                    />
                  </div>

                  {/* Combination Key Preview */}
                  <div className="mt-3 text-sm text-gray-600">
                    <span className="font-medium">
                      Combination Key Preview:
                    </span>{" "}
                    <code className="bg-gray-200 px-2 py-1 rounded">
                      {(watch(`variants.${index}.color`) || "").toLowerCase()}-
                      {(watch(`variants.${index}.size`) || "").toLowerCase()}-
                      {(
                        watch(`variants.${index}.material`) || ""
                      ).toLowerCase()}
                    </code>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex space-x-4">
          <Button type="submit" isLoading={isLoading} className="flex-1">
            Create Product
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => navigate("/products")}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProductCreatePage;
