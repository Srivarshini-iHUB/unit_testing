import { forgotPassword } from "@/api/auth";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email"),
});

export function ForgotPasswordModal({ open, onOpenChange }) {
  const handleCancel = () => {
    onOpenChange(false);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const forgotPasswordMutation = useMutation({
    mutationFn: forgotPassword,
    onSuccess: (response) => {
      toast.success(response?.message);
      onOpenChange(false);
    },
    onError: (error) => {
      console.error("Login Failed:", error.response?.data || error.message);
      toast.error(error.message);
    },
  });

  const onSubmit = (data) => {
    forgotPasswordMutation.mutate({
      email: data?.email,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <form>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-color1">Reset Password</DialogTitle>
            <DialogDescription className="text-color1">
              Enter your registered email to reset your password.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input type="email" placeholder="you@example.com" {...register("email")} />
              {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
            </div>
          </div>
          <DialogFooter>
            <Button variant="editButton" onClick={handleCancel}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              className="bg-gradient-custom font-medium rounded-md transition-colors text-sm"
              // disabled={forgotPasswordMutation.isPending}
              onClick={handleSubmit(onSubmit)}
            >
              {forgotPasswordMutation.isPending ? (
                <ClipLoader color="#fff" size={26} />
              ) : (
                "Send Reset Link"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
