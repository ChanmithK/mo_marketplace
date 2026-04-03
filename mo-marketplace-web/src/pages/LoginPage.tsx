import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/AuthContext";
import { loginSchema, type LoginFormData } from "../utils/validation";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { Alert } from "../components/ui/Alert";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      await login(data.email, data.password);
      navigate("/products");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Login failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to MO Marketplace
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Use: admin@mo-marketplace.com / password123
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error && (
            <Alert
              type="error"
              message={error}
              onClose={() => setError(null)}
            />
          )}

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <Input
              label="Email address"
              type="email"
              autoComplete="email"
              error={errors.email?.message}
              {...register("email")}
            />

            <Input
              label="Password"
              type="password"
              autoComplete="current-password"
              error={errors.password?.message}
              {...register("password")}
            />

            <Button type="submit" isLoading={isLoading} className="w-full">
              Sign in
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
