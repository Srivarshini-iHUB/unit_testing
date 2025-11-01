import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { resetPassword } from "@/api/auth";
import { toast } from "react-toastify";
import { useAuthStore } from "@/store/authStore";
import { useNavigate } from "react-router-dom";

const resetPasswordSchema = z
  .object({
    oldPassword: z.string().min(8, "Old password must be at least 8 characters"),
    newPassword: z.string().min(8, "New password must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Confirm password must be at least 8 characters"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
  });

  const { user } = useAuthStore();
  const navigate = useNavigate();

  const resetPasswordMutation = useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      toast.success("Password reset successfully!");
      navigate(`/${user?.role}/dashboard`);
    },
    onError: (error) => {
      console.error("Login Failed:", error.response?.data || error.message);
      toast.error("Error resetting password");
      console.log("tetsing");
    },
  });

  const onSubmit = (data) => {
    resetPasswordMutation.mutate({
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
      confirmPassword: data.confirmPassword,
      email: user.email,
    });
  };

  return (
    <div className="h-screen flex justify-center items-center reset-password-bg">
      <div className="xsm:w-1/2 md:w-[400px] shadow-2xl h-fit p-6 rounded-md bg-white">
        <h1 className="text-center text-lg font-bold text-color1">Reset Password</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-5 flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <Label className="text-sm" htmlFor="oldPassword">
              Enter Old Password <span className="text-red-500">*</span>
            </Label>
            <Input
              type="password"
              placeholder="Enter your old password"
              {...register("oldPassword")}
            />
            {errors.oldPassword && (
              <span className="text-red-500 text-xs">{errors.oldPassword.message}</span>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <Label className="text-sm">
              Enter New Password <span className="text-red-500">*</span>
            </Label>
            <Input
              type="password"
              placeholder="Enter your new password"
              {...register("newPassword")}
            />
            {errors.newPassword && (
              <span className="text-red-500 text-xs">{errors.newPassword.message}</span>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <Label className="text-sm">
              Confirm New Password <span className="text-red-500">*</span>
            </Label>
            <Input
              type="password"
              placeholder="Re-enter new password"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <span className="text-red-500 text-xs">{errors.confirmPassword.message}</span>
            )}
          </div>
          <Button type="submit" className="mt-3" disabled={resetPasswordMutation.isPending}>
            {resetPasswordMutation.isPending ? "Resetting..." : "Submit"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
