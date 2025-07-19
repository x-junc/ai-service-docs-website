import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Zap,
  Brain,
  Target,
  BarChart3,
  Rocket,
  Shield,
  Code,
  Users,
  Building2,
  TrendingUp,
  Moon,
  Sun,
  Menu,
  X,
  ChevronRight,
  Github,
  Twitter,
  MessageCircle,
  CheckCircle,
  Star,
  ArrowRight,
} from "lucide-react";

const Index = () => {
  const [isDark, setIsDark] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-xl font-bold text-foreground">
                  Smart Contact <span className="text-accent">API</span>
                </span>
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-8">
                  <Link
                    to="/docs"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Docs
                  </Link>
                  <a
                    href="#api"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    API
                  </a>
                  <Link
                    to="/examples"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Examples
                  </Link>
                  <a
                    href="#pricing"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Pricing
                  </a>
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
              <Button
                size="sm"
                className="btn-orange"
                onClick={() => navigate("/login")}
              >
                Get Started
              </Button>
            </div>

            <div className="md:hidden">
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
              <a
                href="#api"
                className="block px-3 py-2 text-muted-foreground hover:text-foreground"
              >
                API
              </a>
              <Link
                to="/examples"
                className="block px-3 py-2 text-muted-foreground hover:text-foreground"
              >
                Examples
              </Link>
              <a
                href="#pricing"
                className="block px-3 py-2 text-muted-foreground hover:text-foreground"
              >
                Pricing
              </a>
              <div className="flex items-center space-x-2 px-3 py-2">
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
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="gradient-hero py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in">
            <Badge variant="secondary" className="mb-6">
              <Star className="w-3 h-3 mr-1 fill-current" />
              AI-Powered Real Estate Intelligence
            </Badge>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
              Find the perfect buyers <br />
              <span className="text-accent">for every property</span>
            </h1>

            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Intelligent contact matching powered by LangChain + GPT-4. Get
              90%+ match accuracy for the Algerian real estate market with sub-2
              second response times.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button
                size="lg"
                className="btn-orange text-lg px-8 py-3"
                onClick={() => navigate("/examples")}
              >
                Try For Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-3">
                View Documentation
              </Button>
            </div>

            {/* Feature badges */}
            <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Zap className="h-4 w-4 mr-2 text-accent" />
                <span>Sub-2s response</span>
              </div>
              <div className="flex items-center">
                <Brain className="h-4 w-4 mr-2 text-accent" />
                <span>GPT-4 intelligence</span>
              </div>
              <div className="flex items-center">
                <Target className="h-4 w-4 mr-2 text-accent" />
                <span>90%+ accuracy</span>
              </div>
              <div className="flex items-center">
                <Shield className="h-4 w-4 mr-2 text-accent" />
                <span>Enterprise security</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* API Demo Section */}
      <section id="api" className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Simple. Powerful.{" "}
              <span className="text-accent">Intelligent.</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              One API call to get intelligent buyer recommendations with
              detailed explanations
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Code Example */}
            <div className="animate-slide-up">
              <div className="code-block text-white overflow-x-auto">
                <div className="text-sm text-gray-400 mb-2">
                  POST /api/recommendations
                </div>
                <pre className="text-sm">
                  {`{
  "propertyId": "prop_67890",
  "limit": 10,
  "threshold": 0.7,
  "includeExplanations": true
}`}
                </pre>
              </div>

              <div className="mt-4 code-block text-white overflow-x-auto">
                <div className="text-sm text-gray-400 mb-2">Response</div>
                <pre className="text-sm">
                  {`{
  "success": true,
  "data": {
    "recommendations": [
      {
        "contactId": "contact_123",
        "score": 0.94,
        "confidence": 0.89,
        "explanation": {
          "summary": "Perfect match: Budget aligned, seeking villa in Hydra",
          "reasons": [
            "Budget match: 18M DZD fits perfectly in 15-25M range",
            "Location preference: Specifically looking in Hydra district",
            "Property type: Actively seeking luxury villas",
            "High urgency: Score 9/10, ready to purchase immediately"
          ]
        }
      }
    ],
    "processingTime": "1.2s"
  }
}`}
                </pre>
              </div>
            </div>

            {/* Benefits */}
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-accent/10 rounded-lg">
                  <Brain className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">
                    AI-Powered Matching
                  </h3>
                  <p className="text-muted-foreground">
                    Multi-algorithm approach combining ML, collaborative
                    filtering, and rule-based matching for maximum accuracy.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-2 bg-accent/10 rounded-lg">
                  <BarChart3 className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">
                    Explainable Results
                  </h3>
                  <p className="text-muted-foreground">
                    Get detailed reasoning for every recommendation with
                    confidence scores and market insights.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-2 bg-accent/10 rounded-lg">
                  <Rocket className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">
                    Lightning Fast
                  </h3>
                  <p className="text-muted-foreground">
                    Optimized for speed with intelligent caching and parallel
                    processing. Sub-2 second responses guaranteed.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Built for <span className="text-accent">modern real estate</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to connect properties with perfect buyers
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Brain,
                title: "Advanced AI Matching",
                description:
                  "Multi-algorithm approach with ML, collaborative filtering, and rule-based systems for optimal results.",
              },
              {
                icon: Target,
                title: "Smart Filtering",
                description:
                  "Budget optimization algorithms, geospatial matching, and property type compatibility scoring.",
              },
              {
                icon: TrendingUp,
                title: "Market Intelligence",
                description:
                  "Algerian real estate insights, seasonal trends, and intelligent pricing recommendations.",
              },
              {
                icon: Shield,
                title: "Enterprise Security",
                description:
                  "HMAC authentication, rate limiting, monitoring, and GDPR compliant data handling.",
              },
              {
                icon: Zap,
                title: "Real-time Processing",
                description:
                  "Sub-2 second response times with intelligent caching and parallel processing architecture.",
              },
              {
                icon: Code,
                title: "Developer Friendly",
                description:
                  "RESTful API, comprehensive docs, SDKs for popular languages, and interactive playground.",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg hover:shadow-xl transition-shadow animate-scale-in"
              >
                <CardContent className="p-6">
                  <div className="p-3 bg-accent/10 rounded-lg w-fit mb-4">
                    <feature.icon className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Perfect for every{" "}
              <span className="text-accent">real estate professional</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Building2,
                title: "Real Estate Agencies",
                description: "Prioritize your hottest leads automatically",
                features: [
                  "Lead scoring",
                  "Automated follow-ups",
                  "Performance analytics",
                ],
              },
              {
                icon: Users,
                title: "Property Developers",
                description: "Pre-qualify buyers before launch",
                features: [
                  "Market analysis",
                  "Buyer personas",
                  "Launch optimization",
                ],
              },
              {
                icon: Code,
                title: "PropTech Platforms",
                description: "Enhance your platform with AI recommendations",
                features: [
                  "API integration",
                  "White-label solution",
                  "Custom algorithms",
                ],
              },
            ].map((useCase, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg hover:shadow-xl transition-shadow"
              >
                <CardContent className="p-8">
                  <div className="p-3 bg-accent/10 rounded-lg w-fit mb-6">
                    <useCase.icon className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {useCase.title}
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    {useCase.description}
                  </p>
                  <ul className="space-y-2">
                    {useCase.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-center text-sm text-muted-foreground"
                      >
                        <CheckCircle className="h-4 w-4 text-accent mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Simple, <span className="text-accent">transparent pricing</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Start free, scale as you grow
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "Free",
                price: "0 DZD",
                period: "/month",
                description: "Perfect for testing",
                features: [
                  "100 recommendations/month",
                  "Basic API access",
                  "Email support",
                  "7-day response time",
                ],
                highlighted: false,
              },
              {
                name: "Startup",
                price: "29 DZD",
                period: "/month",
                description: "For growing agencies",
                features: [
                  "1,000 recommendations/month",
                  "Full API access",
                  "Priority support",
                  "24-hour response time",
                  "Analytics dashboard",
                ],
                highlighted: false,
              },
              {
                name: "Professional",
                price: "99 DZD",
                period: "/month",
                description: "For established businesses",
                features: [
                  "10,000 recommendations/month",
                  "Advanced algorithms",
                  "Phone support",
                  "2-hour response time",
                  "Custom integrations",
                ],
                highlighted: true,
              },
              {
                name: "Enterprise",
                price: "Custom",
                period: "",
                description: "For large organizations",
                features: [
                  "Unlimited recommendations",
                  "Dedicated infrastructure",
                  "24/7 support",
                  "SLA guarantee",
                  "On-premise deployment",
                ],
                highlighted: false,
              },
            ].map((plan, index) => (
              <Card
                key={index}
                className={`border-0 shadow-lg hover:shadow-xl transition-shadow relative ${
                  plan.highlighted ? "ring-2 ring-accent" : ""
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-accent text-accent-foreground">
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {plan.name}
                    </h3>
                    <div className="mb-2">
                      <span className="text-3xl font-bold text-foreground">
                        {plan.price}
                      </span>
                      <span className="text-muted-foreground">
                        {plan.period}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {plan.description}
                    </p>
                  </div>

                  <Button
                    className={`w-full mb-6 ${
                      plan.highlighted ? "btn-orange" : ""
                    }`}
                    variant={plan.highlighted ? "default" : "outline"}
                  >
                    {plan.name === "Enterprise"
                      ? "Contact Sales"
                      : "Get Started"}
                  </Button>

                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-center text-sm"
                      >
                        <CheckCircle className="h-4 w-4 text-accent mr-3 flex-shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Ready to transform your{" "}
            <span className="text-accent">real estate business?</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join hundreds of real estate professionals using Smart Contact API
            to find perfect buyers faster than ever.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="btn-orange text-lg px-8 py-3">
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-3">
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="text-xl font-bold text-foreground">
                  Smart Contact <span className="text-accent">API</span>
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                The AI that connects properties with perfect buyers
              </p>
              <div className="flex space-x-4">
                <Button variant="ghost" size="sm">
                  <Github className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <MessageCircle className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-4">Product</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Documentation
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    API Reference
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Examples
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Playground
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Help Center
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Status
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Privacy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Terms
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2025 Smart Contact API. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
