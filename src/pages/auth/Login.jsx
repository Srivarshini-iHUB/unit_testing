import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { login } from "@/api/auth";
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
import { useAuthStore } from "@/store/authStore";
import appLogo from "../../assets/appLogo/logo.svg";
// import Login_page_img from "../../assets/images/login_page.svg";
import dashboard_img from "../../assets/images/dashboard_img.svg";
import { useState } from "react";
import { EyeOff, Eye } from "lucide-react";
import { ForgotPasswordModal } from "@/components/customComponents/forgotPasswordModal";
import { ClipLoader } from "react-spinners";

const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function LoginForm() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);

console.log("Render LoginForm");


  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (response) => {
      setUser(response?.data);
      toast.success(response?.message);
      navigate(`/${response?.data?.role}/dashboard`);
    },
    onError: (error) => {
      console.error("Login Failed:", error.response?.data || error.message);
      toast.error("Error during login");
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <div className="h-screen flex bg-white">
      <ForgotPasswordModal open={isResetModalOpen} onOpenChange={setIsResetModalOpen} />
      {/* Left Side - Login Form */}
      <div className="w-1/2 flex items-center justify-center p-12">
        <div className="w-full max-w-sm">
          {/* NAAC Logo and Tagline */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="flex items-center">
                <div className="flex items-center justify-center mr-2">
                  <img src={appLogo} />
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed max-w-xs mx-auto">
              No more guess-work—just one click, and your entire compliance report is ready.
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium ">
                      Email <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter your email ID"
                        className="h-11 bg-gray-100 border-0 rounded-md placeholder:text-gray-400 text-sm focus:bg-white focus:ring-1 focus:ring-blue-500 transition-all"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">
                      Password <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={isPasswordVisible ? "text" : "password"}
                          placeholder="Enter your password"
                          className="h-11 bg-gray-100 border-0 rounded-md placeholder:text-gray-400 text-sm focus:bg-white focus:ring-1 focus:ring-blue-500 transition-all pr-10"
                          {...field}
                        />
                        <button
                          type="button"
                          onClick={() => setIsPasswordVisible((prev) => !prev)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-color1 hover:text-gray-700"
                        >
                          {isPasswordVisible ? <Eye size={18} /> : <EyeOff size={18} />}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full h-11 bg-gradient-custom  font-medium rounded-md transition-colors text-md"
                disabled={mutation.isPending}
              >
                {mutation.isPending ? <ClipLoader color="#fff" size={26} /> : "Sign In"}
              </Button>
              <div className=" text-right">
                <span
                  to="/forgot-password"
                  onClick={() => setIsResetModalOpen(true)}
                  className="text-xs text-gray-500 cursor-pointer"
                >
                  Forgot password?
                </span>
              </div>
            </form>
          </Form>

          <div className="mt-8 text-center">
            <p className="text-xs text-gray-500">
              Having issue with sign in?{" "}
              <a
                href="mailto:okrion.info@gmail.com"
                className="text-blue-600 hover:underline font-medium"
              >
                help@krion.com
              </a>
            </p>
          </div>
        </div>
      </div>
      {/* Right Side */}

      <div className="w-1/2 h-full flex justify-center items-center">
        {/* <div className="h-[90%] w-[80%] overflow-hidden rounded-3xl">
          <img src={Login_page_img} className="h-full w-full object-cover" />
        </div> */}
        <div className="h-[95%] w-[100%] overflow-hidden rounded-3xl">
          <img src={dashboard_img} className="w-full h-full" />
        </div>
      </div>
    </div>
  );
}
