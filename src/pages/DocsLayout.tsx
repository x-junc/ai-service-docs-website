import { useState, useEffect } from "react";
import { Outlet, useLocation, Link } from "react-router-dom";
import {
  ChevronRight,
  Moon,
  Sun,
  Menu,
  X,
  Github,
  User,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { useLogout } from "@/hooks/use-auth-mutations";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarProvider,
  SidebarTrigger,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarHeader,
  SidebarSeparator,
} from "@/components/ui/sidebar";

interface DocsSidebarItemProps {
  title: string;
  href: string;
  items?: { title: string; href: string }[];
}

const sidebarItems: DocsSidebarItemProps[] = [
  {
    title: "Overview",
    href: "/docs",
    items: [
      { title: "Introduction", href: "/docs" },
      { title: "Problem Statement", href: "/docs/problem" },
      { title: "Objectives", href: "/docs/objectives" },
    ],
  },
  {
    title: "System Design",
    href: "/docs/system-design",
    items: [
      { title: "Architecture", href: "/docs/system-design/architecture" },
      { title: "Data Models", href: "/docs/system-design/data-models" },
      { title: "Filtering Techniques", href: "/docs/system-design/filtering" },
    ],
  },
  {
    title: "API Endpoints",
    href: "/docs/api",
    items: [
      { title: "GET /recommendations", href: "/docs/api/recommendations" },
      { title: "Bulk Recommendation", href: "/docs/api/bulk" },
      { title: "Comparison & PDF", href: "/docs/api/comparison" },
    ],
  },
  {
    title: "AI & Scoring",
    href: "/docs/ai",
    items: [
      { title: "Matching Logic", href: "/docs/ai/matching" },
      { title: "Scoring System", href: "/docs/ai/scoring" },
      { title: "Explainability", href: "/docs/ai/explainability" },
    ],
  },
  {
    title: "Evaluation",
    href: "/docs/evaluation",
    items: [
      { title: "Relevance", href: "/docs/evaluation/relevance" },
      { title: "Performance", href: "/docs/evaluation/performance" },
      { title: "Integration", href: "/docs/evaluation/integration" },
    ],
  },
];

const DocsSidebarItem = ({
  item,
  currentPath,
}: {
  item: DocsSidebarItemProps;
  currentPath: string;
}) => {
  const isCurrentGroup = item.items?.some(
    (subItem) => currentPath === subItem.href
  );
  const [isOpen, setIsOpen] = useState(isCurrentGroup);

  // Force group to open when navigating to a page within it
  useEffect(() => {
    if (isCurrentGroup) {
      setIsOpen(true);
    }
  }, [currentPath, isCurrentGroup]);

  return (
    <>
      <SidebarGroupLabel
        className="text-sm font-medium cursor-pointer flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        {item.title}
        <ChevronRight
          className={cn("h-4 w-4 transition-transform", isOpen && "rotate-90")}
        />
      </SidebarGroupLabel>

      {isOpen && item.items && (
        <SidebarGroupContent>
          <SidebarMenu>
            {item.items.map((subItem) => (
              <SidebarMenuItem key={subItem.href}>
                <Link
                  to={subItem.href}
                  className={cn(
                    "flex w-full items-center rounded-md px-3 py-2 text-sm transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                    currentPath === subItem.href &&
                      "bg-accent/10 text-accent font-medium"
                  )}
                >
                  {subItem.title}
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      )}
    </>
  );
};

const DocsLayout = () => {
  const [isDark, setIsDark] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;
  const { user, isAuthenticated } = useAuth();

  console.log("isAuthenticated", isAuthenticated);

  const logoutMutation = useLogout();

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Link to="/" className="text-xl font-bold text-foreground">
                  Smart Contact <span className="text-accent">API</span>
                </Link>
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-8">
                  <Link
                    to="/docs"
                    className={cn(
                      "text-muted-foreground hover:text-foreground transition-colors",
                      currentPath.startsWith("/docs") &&
                        "text-foreground font-medium"
                    )}
                  >
                    Docs
                  </Link>
                  <Link
                    to="/docs/api"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    API
                  </Link>
                  <Link
                    to="/pricing"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Pricing
                  </Link>
                  <Link
                    to="/examples"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Examples
                  </Link>
                </div>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={toggleTheme}>
                {isDark ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </Button>
              <Button variant="ghost" size="sm">
                <Github className="h-4 w-4" />
              </Button>

              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center space-x-2"
                    >
                      <User className="h-4 w-4" />
                      <span className="hidden lg:inline">{user?.name}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={handleLogout}
                      disabled={logoutMutation.isPending}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      {logoutMutation.isPending ? "Logging out..." : "Logout"}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/login">Sign in</Link>
                  </Button>
                  <Button size="sm" className="btn-orange" asChild>
                    <Link to="/login">Get Started</Link>
                  </Button>
                </>
              )}
            </div>

            <div className="md:hidden flex items-center space-x-2">
              <Button variant="ghost" size="sm" onClick={toggleTheme}>
                {isDark ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="h-4 w-4" />
                ) : (
                  <Menu className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-background">
              <Link
                to="/docs"
                className="block px-3 py-2 text-muted-foreground hover:text-foreground"
              >
                Docs
              </Link>
              <Link
                to="/docs/api"
                className="block px-3 py-2 text-muted-foreground hover:text-foreground"
              >
                API
              </Link>
              <Link
                to="/pricing"
                className="block px-3 py-2 text-muted-foreground hover:text-foreground"
              >
                Pricing
              </Link>
              <Link
                to="/examples"
                className="block px-3 py-2 text-muted-foreground hover:text-foreground"
              >
                Examples
              </Link>

              {isAuthenticated ? (
                <>
                  <Link
                    to="/dashboard"
                    className="block px-3 py-2 text-muted-foreground hover:text-foreground"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    disabled={logoutMutation.isPending}
                    className="block w-full text-left px-3 py-2 text-muted-foreground hover:text-foreground"
                  >
                    {logoutMutation.isPending ? "Logging out..." : "Logout"}
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block px-3 py-2 text-muted-foreground hover:text-foreground"
                  >
                    Sign in
                  </Link>
                  <Link
                    to="/register"
                    className="block px-3 py-2 text-muted-foreground hover:text-foreground"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Documentation layout */}
      <div className="container mx-auto px-0 flex flex-col md:flex-row">
        <SidebarProvider>
          <div className="flex min-h-screen w-full">
            <Sidebar className="w-64 border-r min-h-screen">
              <SidebarHeader className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <SidebarTrigger className="h-8 w-8 md:hidden" />
                  <Link to="/docs" className="text-lg font-bold mt-16">
                    Documentation
                  </Link>
                </div>
              </SidebarHeader>
              <SidebarSeparator />
              <SidebarContent>
                {sidebarItems.map((item) => (
                  <SidebarGroup key={item.href}>
                    <DocsSidebarItem item={item} currentPath={currentPath} />
                  </SidebarGroup>
                ))}
              </SidebarContent>
            </Sidebar>

            <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8 min-h-screen">
              <Outlet />
            </main>
          </div>
        </SidebarProvider>
      </div>
    </div>
  );
};

export default DocsLayout;
