import React, { useState } from "react";
import { Modal } from "../../components/ui/Modal";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { quickBuySchema, type QuickBuyFormData } from "../../utils/validation";
import type { Product, Variant } from "../../types";
import { variantsApi } from "../../api/variants.api";

interface QuickBuyModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
  variant: Variant;
}

export const QuickBuyModal: React.FC<QuickBuyModalProps> = ({
  isOpen,
  onClose,
  product,
  variant,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<QuickBuyFormData>({
    resolver: zodResolver(quickBuySchema),
    defaultValues: {
      productId: product.id,
      variantId: variant.id,
      quantity: 1,
    },
  });

  const onSubmit = async (data: QuickBuyFormData) => {
    setIsLoading(true);

    try {
      await variantsApi.quickBuy({
        productId: product.id,
        variantId: variant.id,
        quantity: data.quantity,
      });
      setSuccess(true);

      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 2000);
    } catch (err: any) {
      alert(err.response?.data?.message || "Quick buy failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Quick Buy" footer={null}>
      {success ? (
        <div className="text-center py-6">
          <svg
            className="mx-auto h-12 w-12 text-green-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-900">
            Purchase Successful!
          </h3>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">{product.name}</h4>
            <div className="text-sm text-gray-600">
              <p>
                Variant: {variant.color} / {variant.size} / {variant.material}
              </p>
              <p>
                Price: $
                {variant.price
                  ? Number(variant.price).toFixed(2)
                  : Number(product.basePrice).toFixed(2)}
              </p>
            </div>
          </div>

          <Input
            label="Quantity"
            type="number"
            min="1"
            error={errors.quantity?.message}
            {...register("quantity", { valueAsNumber: true })}
          />

          <div className="flex space-x-3 pt-4">
            <Button type="submit" isLoading={isLoading} className="flex-1">
              Confirm Purchase
            </Button>
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
};
