import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { setNewPassword } from "@/api/auth";
import { toast } from "react-toastify";
import { useAuthStore } from "@/store/authStore";
import { useNavigate, useLocation } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

const forgotPasswordSchema = z
  .object({
    newPassword: z.string().min(8, "New password must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Confirm password must be at least 8 characters"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const ForgotPassword = () => {
  const location = useLocation();
  const token = new URLSearchParams(location.search).get("token");

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const { user } = useAuthStore();
  const navigate = useNavigate();

  const forgotPasswordMutation = useMutation({
    mutationFn: setNewPassword,
    onSuccess: () => {
      toast.success("Password updated successfully!");
      navigate("/");
    },
    onError: (error) => {
      console.error("Password reset failed:", error.response?.data || error.message);
      toast.error("Error updating password");
    },
  });

  const onSubmit = (data) => {
    forgotPasswordMutation.mutate({
      token,
      newPassword: data.newPassword,
      confirmPassword: data.confirmPassword,
    });
  };

  return (
    <div className="h-screen flex justify-center items-center reset-password-bg">
      <div className="xsm:w-1/2 md:w-[400px] shadow-2xl h-fit p-6 rounded-md bg-white">
        <h1 className="text-center text-lg font-bold text-color1">Forgot Password</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-5 flex flex-col gap-4">
          {/* New Password Field */}
          <div className="flex flex-col gap-1">
            <Label className="text-sm">
              Enter New Password <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <Input
                type={showNewPassword ? "text" : "password"}
                placeholder="Enter your new password"
                {...register("newPassword")}
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-color1 hover:text-gray-700"
              >
                {showNewPassword ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>
            </div>
            {errors.newPassword && (
              <span className="text-red-500 text-xs">{errors.newPassword.message}</span>
            )}
          </div>

          {/* Confirm Password Field */}
          <div className="flex flex-col gap-1">
            <Label className="text-sm">
              Confirm New Password <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <Input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Re-enter new password"
                {...register("confirmPassword")}
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-color1 hover:text-gray-700"
              >
                {showConfirmPassword ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>
            </div>
            {errors.confirmPassword && (
              <span className="text-red-500 text-xs">{errors.confirmPassword.message}</span>
            )}
          </div>

          <Button type="submit" className="mt-3" disabled={forgotPasswordMutation.isPending}>
            {forgotPasswordMutation.isPending ? "Updating..." : "Submit"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
