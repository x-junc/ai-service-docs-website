import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { authApi } from "@/lib/auth-api";
import { useAuth } from "@/hooks/use-auth";
import type {
  LoginFormData,
  RegisterFormData,
  ForgotPasswordFormData,
  VerifyResetCodeFormData,
  ResetPasswordFormData,
} from "@/lib/auth-schemas";
import { toast } from "@/hooks/use-toast";

interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
}

export const useLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  return useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      login(data.token, data.user);
      toast({
        title: "Welcome back!",
        description: data.message || "Successfully logged in.",
      });
      navigate("/docs");
    },
    onError: (error: ApiError) => {
      toast({
        title: "Login failed",
        description:
          error.response?.data?.message || "Please check your credentials.",
        variant: "destructive",
      });
    },
  });
};

export const useRegister = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  return useMutation({
    mutationFn: authApi.register,
    onSuccess: (data) => {
      login(data.token, data.user);
      toast({
        title: "Welcome!",
        description: data.message || "Account created successfully.",
      });
      navigate("/docs");
    },
    onError: (error: ApiError) => {
      toast({
        title: "Registration failed",
        description: error.response?.data?.message || "Please try again.",
        variant: "destructive",
      });
    },
  });
};

export const useLogout = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  return useMutation({
    mutationFn: async () => {
      await logout();
    },
    onSuccess: () => {
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
      navigate("/");
    },
    onError: (error: ApiError) => {
      toast({
        title: "Logout failed",
        description: error.response?.data?.message || "An error occurred.",
        variant: "destructive",
      });
    },
  });
};

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: authApi.forgotPassword,
    onSuccess: (data) => {
      toast({
        title: "Reset code sent",
        description:
          data.message || "Please check your email for the reset code.",
      });
    },
    onError: (error: ApiError) => {
      toast({
        title: "Failed to send reset code",
        description: error.response?.data?.message || "Please try again.",
        variant: "destructive",
      });
    },
  });
};

export const useVerifyResetCode = () => {
  return useMutation({
    mutationFn: authApi.verifyResetCode,
    onSuccess: (data) => {
      toast({
        title: "Code verified",
        description: data.message || "Reset code verified successfully.",
      });
    },
    onError: (error: ApiError) => {
      toast({
        title: "Invalid code",
        description:
          error.response?.data?.message || "Please check your reset code.",
        variant: "destructive",
      });
    },
  });
};

export const useResetPassword = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: authApi.resetPassword,
    onSuccess: (data) => {
      toast({
        title: "Password reset successful",
        description:
          data.message || "Your password has been reset successfully.",
      });
      navigate("/login");
    },
    onError: (error: ApiError) => {
      toast({
        title: "Password reset failed",
        description: error.response?.data?.message || "Please try again.",
        variant: "destructive",
      });
    },
  });
};
