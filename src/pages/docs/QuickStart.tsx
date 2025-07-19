import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Copy, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import api from "@/lib/auth-api";

const QuickStart = () => {
  const [mongoUri, setMongoUri] = useState("");
  const [generatedApiKey, setGeneratedApiKey] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState("");

  // Load saved data from localStorage on component mount
  useEffect(() => {
    const savedMongoUri = localStorage.getItem("quickstart_mongo_uri");
    const savedApiKey = localStorage.getItem("quickstart_api_key");

    if (savedMongoUri) {
      setMongoUri(savedMongoUri);
    }

    if (savedApiKey) {
      setGeneratedApiKey(savedApiKey);
    }
  }, []);

  // Save MongoDB URI to localStorage whenever it changes
  useEffect(() => {
    if (mongoUri) {
      localStorage.setItem("quickstart_mongo_uri", mongoUri);
    }
  }, [mongoUri]);

  // Save API key to localStorage whenever it changes
  useEffect(() => {
    if (generatedApiKey) {
      localStorage.setItem("quickstart_api_key", generatedApiKey);
    }
  }, [generatedApiKey]);

  const generateApiKey = async () => {
    if (!mongoUri.trim()) {
      setError("Please enter a MongoDB URI");
      return;
    }

    setIsGenerating(true);
    setError("");

    try {
      const response = await api.post("/auth/apiKey", {
        mongoUri: mongoUri.trim(),
      });

      // Handle different response formats
      const apiKey =
        response.data?.apiKey ||
        response.data?.data?.apiKey ||
        response.data?.key;

      if (apiKey) {
        setGeneratedApiKey(apiKey);
        toast({
          title: "API Key Generated!",
          description: "Your API key has been generated successfully.",
        });
      } else {
        throw new Error("API key not found in response");
      }
    } catch (err: unknown) {
      const error = err as {
        response?: { data?: { message?: string } };
        message?: string;
      };
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to generate API key";
      setError(errorMessage);
      toast({
        title: "Generation Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const copyApiKey = () => {
    navigator.clipboard.writeText(generatedApiKey);
    toast({
      title: "Copied!",
      description: "API key copied to clipboard.",
    });
  };

  const copyMongoUri = () => {
    const exampleUri =
      "mongodb+srv://abdechafifilali:<db_password>@cluster0.9sdc7rh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
    navigator.clipboard.writeText(exampleUri);
    setMongoUri(exampleUri);
    toast({
      title: "Copied!",
      description: "Example MongoDB URI copied and filled.",
    });
  };

  const clearStoredData = () => {
    localStorage.removeItem("quickstart_mongo_uri");
    localStorage.removeItem("quickstart_api_key");
    setMongoUri("");
    setGeneratedApiKey("");
    setError("");
    toast({
      title: "Data Cleared",
      description: "All stored data has been cleared.",
    });
  };

  const generateNewKey = () => {
    setGeneratedApiKey("");
    setError("");
    generateApiKey();
  };
  return (
    <div className="max-w-4xl">
      <div className="space-y-2 mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Quick Start</h1>
        <p className="text-xl text-muted-foreground">
          Get up and running with Smart Contact API in minutes
        </p>
      </div>

      <div className="space-y-8">
        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Installation</h2>
          <p>
            Install our client library using your preferred package manager:
          </p>

          <Tabs defaultValue="npm">
            <TabsList>
              <TabsTrigger value="npm">npm</TabsTrigger>
              <TabsTrigger value="yarn">yarn</TabsTrigger>
              <TabsTrigger value="pnpm">pnpm</TabsTrigger>
            </TabsList>
            <TabsContent value="npm" className="mt-2 code-block text-white">
              <pre className="text-sm">
                npm install @smart-contact/api-client
              </pre>
            </TabsContent>
            <TabsContent value="yarn" className="mt-2 code-block text-white">
              <pre className="text-sm">yarn add @smart-contact/api-client</pre>
            </TabsContent>
            <TabsContent value="pnpm" className="mt-2 code-block text-white">
              <pre className="text-sm">pnpm add @smart-contact/api-client</pre>
            </TabsContent>
          </Tabs>

          <p className="mt-4">
            Alternatively, you can use the API directly with any HTTP client.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Authentication</h2>
          <p>
            To use the Smart Contact API, you'll need an API key. Generate one
            below by providing your MongoDB URI.
          </p>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg">Generate API Key</CardTitle>
              <CardDescription>
                Enter your MongoDB connection URI to generate a new API key for
                your application. Your data will be saved locally for
                convenience.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="mongoUri">MongoDB URI</Label>
                <div className="flex gap-2">
                  <Input
                    id="mongoUri"
                    type="text"
                    placeholder="mongodb+srv://username:password@cluster.mongodb.net/..."
                    value={mongoUri}
                    onChange={(e) => setMongoUri(e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={copyMongoUri}
                    className="px-3"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Click the copy button to use the example URI format. Your URI
                  will be saved locally.
                </p>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="flex gap-2">
                <Button
                  onClick={generatedApiKey ? generateNewKey : generateApiKey}
                  disabled={isGenerating || !mongoUri.trim()}
                  className="flex-1"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating API Key...
                    </>
                  ) : generatedApiKey ? (
                    "Generate New API Key"
                  ) : (
                    "Generate API Key"
                  )}
                </Button>

                {(mongoUri || generatedApiKey) && (
                  <Button
                    variant="outline"
                    onClick={clearStoredData}
                    disabled={isGenerating}
                  >
                    Clear All
                  </Button>
                )}
              </div>

              {generatedApiKey && (
                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>
                    <div className="space-y-2">
                      <p className="font-medium">
                        Your API Key (Saved Locally):
                      </p>
                      <div className="flex items-center gap-2 p-2 bg-muted rounded font-mono text-sm">
                        <code className="flex-1">{generatedApiKey}</code>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={copyApiKey}
                          className="h-6 w-6 p-0"
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        This key is saved locally and will persist after page
                        refresh. Keep it secure and never expose it in
                        client-side code.
                      </p>
                    </div>
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>

          <h3 className="text-lg font-semibold mt-8">Using Your API Key</h3>
          <p>Once you have your API key, initialize the client:</p>

          <div className="code-block text-white">
            <pre className="text-sm">
              {`// Initialize the client with your API key
const smartContactClient = new SmartContact({
  apiKey: '${generatedApiKey || "your_api_key_here"}'
});`}
            </pre>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">
            Making Your First Request
          </h2>
          <p>
            Here's a simple example of getting recommendations for a property:
          </p>

          <Tabs defaultValue="js">
            <TabsList>
              <TabsTrigger value="js">JavaScript</TabsTrigger>
              <TabsTrigger value="py">Python</TabsTrigger>
              <TabsTrigger value="curl">cURL</TabsTrigger>
            </TabsList>
            <TabsContent value="js" className="mt-2 code-block text-white">
              <pre className="text-sm">
                {`// Initialize the client
const smartContactClient = new SmartContact({
  apiKey: 'your_api_key_here'
});

// Get recommendations
const getRecommendations = async () => {
  try {
    const response = await smartContactClient.recommendations.get({
      propertyId: 'prop_67890',
      limit: 10,
      threshold: 0.7,
      includeExplanations: true
    });
    
    console.log(response.data.recommendations);
  } catch (error) {
    console.error('Error getting recommendations:', error);
  }
};

getRecommendations();`}
              </pre>
            </TabsContent>
            <TabsContent value="py" className="mt-2 code-block text-white">
              <pre className="text-sm">
                {`# Initialize the client
from smart_contact import SmartContactClient

client = SmartContactClient(api_key='your_api_key_here')

# Get recommendations
try:
    response = client.recommendations.get(
        property_id='prop_67890',
        limit=10,
        threshold=0.7,
        include_explanations=True
    )
    
    print(response.data.recommendations)
except Exception as e:
    print(f"Error getting recommendations: {e}")`}
              </pre>
            </TabsContent>
            <TabsContent value="curl" className="mt-2 code-block text-white">
              <pre className="text-sm">
                {`curl -X POST "https://api.smartcontact.com/api/recommendations" \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer your_api_key_here" \\
  -d '{
    "propertyId": "prop_67890",
    "limit": 10,
    "threshold": 0.7,
    "includeExplanations": true
  }'`}
              </pre>
            </TabsContent>
          </Tabs>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Response Format</h2>
          <p>All responses follow a standard format:</p>

          <div className="code-block text-white">
            <pre className="text-sm">
              {`{
  "success": true,
  "data": {
    // Response data specific to the endpoint
  }
}`}
            </pre>
          </div>

          <p className="mt-2">
            In case of errors, the response will have the following format:
          </p>

          <div className="code-block text-white">
            <pre className="text-sm">
              {`{
  "success": false,
  "error": {
    "code": "error_code",
    "message": "Human-readable error message",
    "details": {
      // Additional error details if available
    }
  }
}`}
            </pre>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Next Steps</h2>
          <p>Now that you've made your first API call, you can explore:</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>
              Learn about{" "}
              <a
                href="/docs/authentication"
                className="text-accent hover:underline"
              >
                authentication options
              </a>
            </li>
            <li>
              Explore the{" "}
              <a href="/docs/endpoints" className="text-accent hover:underline">
                available endpoints
              </a>
            </li>
            <li>
              Understand our{" "}
              <a href="/docs/ai-models" className="text-accent hover:underline">
                AI models and algorithms
              </a>
            </li>
            <li>
              Check out{" "}
              <a
                href="/docs/advanced-usage/sdks"
                className="text-accent hover:underline"
              >
                SDKs and code examples
              </a>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default QuickStart;
