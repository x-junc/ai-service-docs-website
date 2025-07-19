import { useLocation, Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  verifyResetCodeSchema,
  type VerifyResetCodeFormData,
} from "@/lib/auth-schemas";
import { useVerifyResetCode } from "@/hooks/use-auth-mutations";

const VerifyResetCode = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const verifyMutation = useVerifyResetCode();
  const email = location.state?.email || "";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifyResetCodeFormData>({
    resolver: zodResolver(verifyResetCodeSchema),
    defaultValues: {
      email: email,
    },
  });

  const onSubmit = (data: VerifyResetCodeFormData) => {
    verifyMutation.mutate(data, {
      onSuccess: () => {
        navigate("/reset-password", { state: { email: data.email } });
      },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">SC</span>
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-center">
            Enter verification code
          </CardTitle>
          <CardDescription className="text-center">
            We've sent a 6-digit code to your email address
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                className={cn(errors.email && "border-destructive")}
                {...register("email")}
                readOnly={!!email}
              />
              {errors.email && (
                <p className="text-sm text-destructive">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="code">Verification Code</Label>
              <Input
                id="code"
                type="text"
                placeholder="123456"
                maxLength={6}
                className={cn(
                  errors.code && "border-destructive",
                  "text-center text-lg tracking-widest"
                )}
                {...register("code")}
              />
              {errors.code && (
                <p className="text-sm text-destructive">
                  {errors.code.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={verifyMutation.isPending}
            >
              {verifyMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                "Verify code"
              )}
            </Button>
          </form>

          <div className="text-center text-sm text-muted-foreground">
            Didn't receive the code?{" "}
            <Link
              to="/forgot-password"
              className="text-primary hover:underline"
            >
              Send again
            </Link>
          </div>

          <div className="text-center">
            <Link
              to="/login"
              className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VerifyResetCode;
