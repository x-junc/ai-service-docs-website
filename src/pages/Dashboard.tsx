import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";
import { useLogout } from "@/hooks/use-auth-mutations";
import { Loader2, LogOut, User } from "lucide-react";
import ApiTest from "@/components/ApiTest";

const Dashboard = () => {
  const { user } = useAuth();
  const logoutMutation = useLogout();

  // Debug logging
  console.log("Dashboard - user:", user);
  console.log(
    "Dashboard - localStorage token:",
    localStorage.getItem("auth_token")
  );
  console.log(
    "Dashboard - localStorage user_data:",
    localStorage.getItem("user_data")
  );

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="container mx-auto max-w-4xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {user?.name}!</p>
          </div>
          <Button
            variant="outline"
            onClick={handleLogout}
            disabled={logoutMutation.isPending}
          >
            {logoutMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Logging out...
              </>
            ) : (
              <>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </>
            )}
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Profile Information
              </CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div>
                  <p className="text-sm font-medium">Name</p>
                  <p className="text-sm text-muted-foreground">{user?.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <p className="text-sm text-muted-foreground">{user?.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">User ID</p>
                  <p className="text-sm text-muted-foreground font-mono">
                    {user?.id}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">API Access</CardTitle>
              <div className="h-4 w-4 rounded-full bg-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">Active</div>
              <p className="text-xs text-muted-foreground">
                Your API access is enabled and ready to use.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start"
              >
                View API Documentation
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start"
              >
                Manage API Keys
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start"
              >
                View Usage Statistics
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Getting Started</CardTitle>
            <CardDescription>
              Quick links to help you get started with the Smart Contact API
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <h3 className="font-semibold">Documentation</h3>
              <p className="text-sm text-muted-foreground">
                Learn how to integrate our API into your applications
              </p>
              <Button variant="link" className="h-auto p-0">
                View Documentation →
              </Button>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">API Reference</h3>
              <p className="text-sm text-muted-foreground">
                Detailed reference for all available endpoints
              </p>
              <Button variant="link" className="h-auto p-0">
                View API Reference →
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>API Connection Test</CardTitle>
            <CardDescription>
              Test your API connection and troubleshoot CORS issues
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ApiTest />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
