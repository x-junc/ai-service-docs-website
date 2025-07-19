import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

const Authentication = () => {
  return (
    <div className="max-w-4xl">
      <div className="space-y-2 mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Authentication</h1>
        <p className="text-xl text-muted-foreground">
          Securely authenticate your API requests
        </p>
      </div>

      <div className="space-y-8">
        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">API Keys</h2>
          <p>
            Smart Contact API uses API keys to authenticate requests. You can view and manage your API keys in the dashboard.
          </p>
          
          <Alert variant="warning" className="my-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Keep your API keys secure</AlertTitle>
            <AlertDescription>
              Your API keys grant access to your account and should be kept secure. Do not share your API keys in publicly accessible areas such as GitHub, client-side code, or in your website's source code.
            </AlertDescription>
          </Alert>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Authentication Methods</h2>
          <p>
            You can authenticate your API requests in two ways:
          </p>
          
          <h3 className="text-lg font-semibold mt-6">1. Bearer Authentication (Recommended)</h3>
          <p>
            Pass your API key in the Authorization header using the Bearer scheme:
          </p>
          
          <div className="code-block text-white">
            <pre className="text-sm">
{`Authorization: Bearer your_api_key_here`}
            </pre>
          </div>
          
          <h3 className="text-lg font-semibold mt-6">2. Query Parameter</h3>
          <p>
            You can also pass your API key as a query parameter, but this is not recommended for production:
          </p>
          
          <div className="code-block text-white">
            <pre className="text-sm">
{`https://api.smartcontact.com/api/recommendations?apiKey=your_api_key_here`}
            </pre>
          </div>
          
          <Alert variant="warning" className="my-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Not recommended for production</AlertTitle>
            <AlertDescription>
              Using query parameters may expose your API key in server logs, browser history, and referrer headers. Use the Authorization header method for production applications.
            </AlertDescription>
          </Alert>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Example Implementation</h2>
          
          <Tabs defaultValue="js">
            <TabsList>
              <TabsTrigger value="js">JavaScript</TabsTrigger>
              <TabsTrigger value="py">Python</TabsTrigger>
              <TabsTrigger value="curl">cURL</TabsTrigger>
            </TabsList>
            <TabsContent value="js" className="mt-2 code-block text-white">
              <pre className="text-sm">
{`// Using the client library
const smartContactClient = new SmartContact({
  apiKey: 'your_api_key_here'
});

// Using fetch directly
const fetchRecommendations = async () => {
  const response = await fetch('https://api.smartcontact.com/api/recommendations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer your_api_key_here'
    },
    body: JSON.stringify({
      propertyId: 'prop_67890',
      limit: 10
    })
  });
  
  const data = await response.json();
  return data;
};`}
              </pre>
            </TabsContent>
            <TabsContent value="py" className="mt-2 code-block text-white">
              <pre className="text-sm">
{`# Using the client library
from smart_contact import SmartContactClient

client = SmartContactClient(api_key='your_api_key_here')

# Using requests directly
import requests
import json

def fetch_recommendations():
    url = 'https://api.smartcontact.com/api/recommendations'
    headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer your_api_key_here'
    }
    payload = {
        'propertyId': 'prop_67890',
        'limit': 10
    }
    
    response = requests.post(url, headers=headers, json=payload)
    return response.json()`}
              </pre>
            </TabsContent>
            <TabsContent value="curl" className="mt-2 code-block text-white">
              <pre className="text-sm">
{`# Using Bearer authentication
curl -X POST "https://api.smartcontact.com/api/recommendations" \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer your_api_key_here" \\
  -d '{
    "propertyId": "prop_67890",
    "limit": 10
  }'

# Using query parameter (not recommended for production)
curl -X POST "https://api.smartcontact.com/api/recommendations?apiKey=your_api_key_here" \\
  -H "Content-Type: application/json" \\
  -d '{
    "propertyId": "prop_67890",
    "limit": 10
  }'`}
              </pre>
            </TabsContent>
          </Tabs>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">API Key Management</h2>
          <p>
            Best practices for managing your API keys:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Rotate your API keys periodically</li>
            <li>Use different API keys for different environments (development, staging, production)</li>
            <li>Set up environment-specific restrictions for each key</li>
            <li>Monitor API key usage for unusual activity</li>
            <li>Revoke compromised API keys immediately</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">HMAC Authentication</h2>
          <p>
            For enterprise customers, we also support HMAC authentication for added security. HMAC authentication involves signing your requests with a secret key.
          </p>
          
          <p>
            To learn more about HMAC authentication, please contact our sales team.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Authentication;