import { Link } from "react-router-dom";
import { Code } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const DocsIntro = () => {
  return (
    <div className="max-w-4xl">
      <div className="space-y-2 mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Introduction</h1>
        <p className="text-xl text-muted-foreground">
          Welcome to the Smart Contact API documentation
        </p>
      </div>

      <div className="space-y-8">
        <section className="space-y-4">
          <p>
            Smart Contact API is an AI-powered recommendation system designed specifically for the Algerian real estate market. Our API provides intelligent matching between properties and potential buyers/renters, helping real estate professionals connect the right properties with the right people.
          </p>
          
          <p>
            Built on Express.js, MongoDB, LangChain, and OpenAI technologies, our API delivers accurate recommendations with detailed explanations in less than 2 seconds.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Key Features</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-accent/10 rounded-md">
                    <Code className="h-5 w-5 text-accent" />
                  </div>
                  <h3 className="font-semibold">Simple API Integration</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Easy-to-use RESTful API with comprehensive documentation and SDKs.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-accent/10 rounded-md">
                    <Code className="h-5 w-5 text-accent" />
                  </div>
                  <h3 className="font-semibold">Advanced AI Matching</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  LangChain + GPT-4 intelligence with 90%+ accuracy for the Algerian market.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-accent/10 rounded-md">
                    <Code className="h-5 w-5 text-accent" />
                  </div>
                  <h3 className="font-semibold">Explainable Results</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Detailed reasoning for every recommendation with confidence scores.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-accent/10 rounded-md">
                    <Code className="h-5 w-5 text-accent" />
                  </div>
                  <h3 className="font-semibold">Fast Performance</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Sub-2 second response times with intelligent caching and optimizations.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Getting Started</h2>
          <p>
            To start using the Smart Contact API, you'll need to:
          </p>
          <ol className="list-decimal list-inside space-y-2 ml-4">
            <li>Sign up for an API key</li>
            <li>Install our client library (optional)</li>
            <li>Make your first API call</li>
          </ol>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Button className="btn-orange">
              <Link to="/docs/quick-start">Quick Start Guide</Link>
            </Button>
            <Button variant="outline">
              <Link to="/docs/api">API Reference</Link>
            </Button>
          </div>
        </section>
        
        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">API Example</h2>
          
          <div className="code-block text-white overflow-x-auto">
            <div className="text-sm text-gray-400 mb-2">POST /api/recommendations</div>
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
        </section>
      </div>
    </div>
  );
};

export default DocsIntro;