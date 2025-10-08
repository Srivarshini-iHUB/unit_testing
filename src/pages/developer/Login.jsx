import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { devLogin } from "@/api/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Eye, EyeOff, Code, Lock, Mail } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { cn } from "@/lib/utils";
import { ClipLoader } from "react-spinners";

const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const EmailField = ({ control }) => (
  <FormField
    control={control}
    name="email"
    render={({ field }) => (
      <FormItem>
        <FormLabel className="text-gray-700 font-medium">Email Address</FormLabel>
        <FormControl>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="email"
              placeholder="developer@company.com"
              className={cn(
                "pl-10 h-12 border-gray-200",
                "focus:border-blue-500 focus:ring-blue-500 transition-all duration-200"
              )}
              {...field}
            />
          </div>
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);

const PasswordField = ({ control }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <FormField
      control={control}
      name="password"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-gray-700 font-medium">Password</FormLabel>
          <FormControl>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className={cn(
                  "pl-10 pr-10 h-12 border-gray-200",
                  "focus:border-blue-500 focus:ring-blue-500 transition-all duration-200"
                )}
                {...field}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default function LoginForm() {
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const mutation = useMutation({
    mutationFn: devLogin,
    onSuccess: (response) => {
      setUser(response?.data);
      toast.success(response?.message);
      navigate(`/${response?.data?.role}/dashboard`);
    },
    onError: (error) => {
      console.error("Login Failed:", error.response?.data || error.message);
      const message = error?.response?.data?.message || "Login failed. Please try again.";
      toast.error(message);
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <div
      className={cn(
        "min-h-screen flex items-center justify-center relative overflow-hidden",
        "bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
      )}
    >
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />
        <div className="absolute top-20 left-20 text-purple-300/20 text-6xl font-mono animate-pulse">&lt;/&gt;</div>
        <div className="absolute top-40 right-32 text-blue-300/20 text-4xl font-mono animate-pulse delay-1000">{`{}`}</div>
        <div className="absolute bottom-32 left-16 text-indigo-300/20 text-5xl font-mono animate-pulse delay-500">[]</div>
        <div className="absolute bottom-20 right-20 text-violet-300/20 text-3xl font-mono animate-pulse delay-700">()</div>
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-purple-500/10 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-blue-500/10 rounded-full blur-xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-indigo-500/10 rounded-full blur-xl animate-pulse delay-500" />
      </div>

      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-white/20">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl mb-4">
              <Code className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Developer Login</h1>
            <p className="text-gray-600">Sign in to NAAC OKRion</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <EmailField control={form.control} />
              <PasswordField control={form.control} />
              <Button
                type="submit"
                className={cn(
                  "w-full h-12 text-white font-semibold rounded-lg transition-all duration-200 transform shadow-lg",
                  "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700",
                  "hover:scale-[1.02] active:scale-[0.98]"
                )}
                disabled={mutation.isPending}
              >
                {mutation.isPending ? (
                  <div className="flex items-center space-x-2">
                    <ClipLoader color="#fff" size={26} />
                  </div>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
