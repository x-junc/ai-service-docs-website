import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { useState } from "react";

const ApiTest = () => {
  const [testResults, setTestResults] = useState<{
    cors: "pending" | "success" | "error";
    backend: "pending" | "success" | "error";
    message: string;
  }>({
    cors: "pending",
    backend: "pending",
    message: "",
  });

  const testApiConnection = async () => {
    setTestResults({
      cors: "pending",
      backend: "pending",
      message: "Testing...",
    });

    try {
      // Test with a simple GET request first
      const response = await fetch("/api/health", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setTestResults({
          cors: "success",
          backend: "success",
          message: "API connection successful!",
        });
      } else {
        setTestResults({
          cors: "success",
          backend: "error",
          message: `Backend responded with status: ${response.status}`,
        });
      }
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      if (errorMessage.includes("CORS")) {
        setTestResults({
          cors: "error",
          backend: "pending",
          message:
            "CORS error detected. Make sure to restart your dev server after proxy configuration.",
        });
      } else {
        setTestResults({
          cors: "error",
          backend: "error",
          message: `Connection failed: ${errorMessage}`,
        });
      }
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "error":
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "success":
        return <Badge className="bg-green-100 text-green-800">Working</Badge>;
      case "error":
        return <Badge className="bg-red-100 text-red-800">Error</Badge>;
      default:
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>API Connection Test</CardTitle>
        <CardDescription>
          Test your API connection and CORS configuration
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex items-center space-x-2">
              {getStatusIcon(testResults.cors)}
              <span className="font-medium">CORS Configuration</span>
            </div>
            {getStatusBadge(testResults.cors)}
          </div>

          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex items-center space-x-2">
              {getStatusIcon(testResults.backend)}
              <span className="font-medium">Backend Connection</span>
            </div>
            {getStatusBadge(testResults.backend)}
          </div>
        </div>

        {testResults.message && (
          <div className="p-3 bg-gray-50 rounded-lg">
            <p className="text-sm">{testResults.message}</p>
          </div>
        )}

        <Button onClick={testApiConnection} className="w-full">
          Test API Connection
        </Button>

        <div className="text-xs text-muted-foreground space-y-1">
          <p>
            <strong>Current API Base URL:</strong>{" "}
            {import.meta.env.VITE_API_URL || "/api"}
          </p>
          <p>
            <strong>Environment:</strong> {import.meta.env.MODE}
          </p>
          <p>
            <strong>Backend Expected:</strong> http://localhost:3000
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ApiTest;
