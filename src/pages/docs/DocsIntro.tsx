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
          Welcome to the Smart Contact X-Junc API documentation.
        </p>
      </div>

      <div className="space-y-8">
        {/* Introduction Section */}
        <section className="space-y-4">
          <p>
            In Algeria’s dynamic real estate market, agents manually match thousands of client profiles with hundreds of property listings. This results in missed sales, inefficient processes, and a poor customer experience.
          </p>
          <p>
            <strong>Smart Contact X-Junc</strong> is an intelligent AI-powered backend system built to solve this. It automatically recommends relevant buyers for a given property—instantly, accurately, and with full transparency.
          </p>
          <p>
            Powered by <strong>Express.js</strong>, <strong>MongoDB</strong>, <strong>LangChain</strong>, this scalable system provides real-time matching, explanations, bulk processing, and even PDF files.
          </p>
        </section>

        {/* Features Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Key Features</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {/* Feature Cards */}
            {[
              {
                title: "Smart AI Matching",
                desc: "Matches based on all client preferences and information."
              },
              {
                title: "Transparent Explanations",
                desc: "Each contact recommendation comes with a detailed explanation (reasons) and match score."
              },
              {
                title: "Bulk Recommendation Mode",
                desc: "Generate recommendations for all properties in a single query."
              },
              {
                title: "PDF Quote Generation",
                desc: "Compare properties and generate official quotes in PDF invoice format."
              },
              {
                title: "PDF Upload & AI Match",
                desc: "Upload contact PDFs to get instant AI-recommended matches for a specific property."
              }
            ].map((feature, index) => (
              <Card key={index}>
                <CardContent className="p-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-accent/10 rounded-md">
                      <Code className="h-5 w-5 text-accent" />
                    </div>
                    <h3 className="font-semibold">{feature.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Getting Started */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Getting Started</h2>
          <p>Follow these steps to start integrating the Smart Contact API:</p>
          <ol className="list-decimal list-inside space-y-2 ml-4">
            <li>Sign up and get your API key.</li>
            <li>
              To use the <strong>PDF Recommendation Service</strong>, call: <br />
              <code className="bg-gray-100 px-2 py-1 rounded">POST /api/v1/recommendations/with-pdf</code>
            </li>
            <li>
              To use the <strong>Database Integration</strong> service, call: <br />
              <code className="bg-gray-100 px-2 py-1 rounded">POST /api/v1/recommendations/property/:propID</code>
            </li>
            <li>
              Always include your API key in headers as: <br />
              <code className="bg-gray-100 px-2 py-1 rounded">x-api-key: YOUR_API_KEY</code>
            </li>
          </ol>
        </section>

        {/* API Example: PDF Recommendation */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">1. PDF Recommendation Service</h2>
          <div className="code-block text-white overflow-x-auto">
            <div className="text-sm text-gray-400 mb-2">POST /api/v1/recommendations/with-pdf</div>
            <pre className="text-sm bg-gray-800 p-4 rounded">
              <code>{`
axios.post(
  "http://localhost:3000/api/v1/recommendations/with-pdf",
  payload,
  {
    headers: {
      "x-api-key": "YOUR_API_KEY",
      "Content-Type": "application/json"
    },
    timeout: 30000
  }
);
              `}</code>
            </pre>
          </div>
        </section>

        {/* API Example: DB Recommendation */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">2. Database Property Recommendation Service</h2>
          <div className="code-block text-white overflow-x-auto">
            <div className="text-sm text-gray-400 mb-2">POST /api/v1/recommendations/property/:propID</div>
            <pre className="text-sm bg-gray-800 p-4 rounded mb-4">
              <code>{`
axios.post(
  "http://localhost:3000/api/v1/recommendations/property/\${propID}",
  { number: "001" },
  {
    headers: {
      "x-api-key": "YOUR_API_KEY",
      "Content-Type": "application/json"
    },
    timeout: 30000
  }
);
              `}</code>
            </pre>
            <div className="text-sm text-gray-400 mb-2">Sample Response</div>
            <pre className="text-sm bg-gray-800 p-4 rounded">
              <code>{`
{
  "status": "success",
  "data": {
    "status": "success",
    "data": {
      "recommendations": [
        {
          "property": {
            "location": "Unknown",
            "price": 1500000,
            "type": "Apartment",
            "area": 120,
            "rooms": 3
          },
          "topMatches": [
            {
              "clientName": "Alberto Kozey PhD",
              "matchScore": 80,
              "reasons": [
                "Property type matches",
                "Area within range",
                "Rooms within range"
              ]
            },
            {
              "clientName": "Myrtle Williamson",
              "matchScore": 70,
              "reasons": [
                "Property type matches",
                "Area within range",
                "Rooms within range"
              ]
            },
            {
              "clientName": "Client Name",
              "matchScore": 70,
              "reasons": [
                "Property type matches",
                "Area within range",
                "Rooms within range"
              ]
            },
            {
              "clientName": "Sammy Haley",
              "matchScore": 60,
              "reasons": [
                "Property type matches",
                "Rooms within range"
              ]
            },
            {
              "clientName": "Devin Doyle MD",
              "matchScore": 60,
              "reasons": [
                "Property type matches",
                "Rooms within range"
              ]
            }
          ]
        },
        {
          "property": {
            "location": "Unknown",
            "price": 402129,
            "type": "Studio",
            "area": 93,
            "rooms": 5
          },
          "topMatches": [
            {
              "clientName": "Amber Paucek",
              "matchScore": 90,
              "reasons": [
                "Property type matches",
                "Rooms within range",
                "Area within range"
              ]
            },
            {
              "clientName": "Donald Ratke",
              "matchScore": 80,
              "reasons": [
                "Property type matches",
                "Rooms within range",
                "Area within range"
              ]
            },
            {
              "clientName": "Matt Heathcote DDS",
              "matchScore": 80,
              "reasons": [
                "Property type matches",
                "Rooms within range",
                "Area within range"
              ]
            },
            {
              "clientName": "Sylvia Hauck",
              "matchScore": 70,
              "reasons": [
                "Property type matches",
                "Rooms within range"
              ]
            },
            {
              "clientName": "Mrs. Viola Fahey",
              "matchScore": 70,
              "reasons": [
                "Property type matches",
                "Rooms within range"
              ]
            }
          ]
        },
        {
          "property": {
            "location": "Unknown",
            "price": 1681070,
            "type": "Duplex",
            "area": 267,
            "rooms": 2
          },
          "topMatches": [
            {
              "clientName": "Client Name",
              "matchScore": 50,
              "reasons": [
                "Area within range"
              ]
            },
            {
              "clientName": "Tyrone VonRueden",
              "matchScore": 40,
              "reasons": [
                "Rooms within range"
              ]
            },
            {
              "clientName": "Myrtle Williamson",
              "matchScore": 40,
              "reasons": [
                "Rooms within range"
              ]
            },
            {
              "clientName": "Alberto Kozey PhD",
              "matchScore": 0,
              "reasons": []
            },
            {
              "clientName": "Amber Paucek",
              "matchScore": 0,
              "reasons": []
            }
          ]
        }
      ]
    }
  },
  "propertiesProcessed": 3
}

              `}</code>
            </pre>
          </div>
        </section>

{/* API Example: DB Recommendation */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">3. DataBase Bulk processing mode</h2>
          <div className="code-block text-white overflow-x-auto">
            <div className="text-sm text-gray-400 mb-2">POST http://localhost:4000/api/Agent/get-recommended-contacts-db-bulk</div>
            <pre className="text-sm bg-gray-800 p-4 rounded mb-4">
              <code>{`
const response = await axios.post(
      "http://localhost:3000/api/v1/recommendations/property-bulk", //  Use bulk endpoint
      {
        number,
        propertyIds //  Send array of property IDs
      },
      {
        headers: {
          "x-api-key": "a2d3a67c833126b35ec7ce348900c0e01ff71012fb98264db8a8b9c59c8e4ea4",
          "Content-Type": "application/json",
        },
        timeout: 30000,
      }
    );
              `}</code>
            </pre>
            <div className="text-sm text-gray-400 mb-2">Sample Response</div>
            <pre className="text-sm bg-gray-800 p-4 rounded">
              <code>{`
{
  "status": "success",
  "data": {
    "property": {
      "location": "Alger centre",
      "price": 1500000,
      "type": "Apartment",
      "area": 120,
      "rooms": 3
    },
    "recommendations": [
      {
        "clientName": "Amireche M",
        "matchScore": 80,
        "reasons": ["Property type match", "Within budget", "Room count within range", "Area within range"]
      },
      {
        "clientName": "Filali abd",
        "matchScore": 75,
        "reasons": ["Property type match", "Within budget", "Room count within range", "Area within range"]
      }
    ]
  }
}
              `}</code>
            </pre>
          </div>
        </section>


{/* API Example: DB Recommendation */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">3. PDF Bulk processing mode</h2>
          <div className="code-block text-white overflow-x-auto">
            <div className="text-sm text-gray-400 mb-2">POST http://localhost:4000/api/Agent/get-recommended-contacts-bulk</div>
            <pre className="text-sm bg-gray-800 p-4 rounded mb-4">
              <code>{`
const response = await axios.post(
      "http://localhost:3000/api/v1/recommendations/with-pdf-bulk", // ✅ Changed to bulk endpoint
      payload,
      {
        headers: {
          "x-api-key": "a2d3a67c833126b35ec7ce348900c0e01ff71012fb98264db8a8b9c59c8e4ea4",
          "Content-Type": "application/json",
        },
        timeout: 30000, // 30 second timeout
      }
    );
              `}</code>
            </pre>
            <div className="text-sm text-gray-400 mb-2">Sample Response</div>
            <pre className="text-sm bg-gray-800 p-4 rounded">
              <code>{`
{
  "msg": "Bulk property matching completed successfully",
  "data": {
    "status": "success",
    "result": {
      "recommendations": [
        {
          "property": {
            "location": "Downtown",
            "price": 1200000,
            "type": "Apartment",
            "area": 95,
            "rooms": 3
          },
          "topMatches": []
        },
        {
          "property": {
            "location": "Al Qods",
            "price": 980000,
            "type": "Studio",
            "area": 45,
            "rooms": 1
          },
          "topMatches": []
        }
      ]
    }
  },
  "propertiesProcessed": 2,
  "matchesFound": 0
}

              `}</code>
            </pre>
          </div>
        </section>

<section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">4. PDF Bulk processing mode</h2>
          <div className="code-block text-white overflow-x-auto">
            <div className="text-sm text-gray-400 mb-2">POST http://localhost:4000/api/Agent/get-recommended-contacts-bulk</div>
            <pre className="text-sm bg-gray-800 p-4 rounded mb-4">
              <code>{`
const response = await axios.post(
      "http://localhost:3000/api/v1/recommendations/with-pdf-bulk", // ✅ Changed to bulk endpoint
      payload,
      {
        headers: {
          "x-api-key": "a2d3a67c833126b35ec7ce348900c0e01ff71012fb98264db8a8b9c59c8e4ea4",
          "Content-Type": "application/json",
        },
        timeout: 30000, // 30 second timeout
      }
    );
              `}</code>
            </pre>
            <div className="text-sm text-gray-400 mb-2">Sample Response</div>
            <pre className="text-sm bg-gray-800 p-4 rounded">
              <code>{`
{
  "msg": "Bulk property matching completed successfully",
  "data": {
    "status": "success",
    "result": {
      "recommendations": [
        {
          "property": {
            "location": "Downtown",
            "price": 1200000,
            "type": "Apartment",
            "area": 95,
            "rooms": 3
          },
          "topMatches": []
        },
        {
          "property": {
            "location": "Al Qods",
            "price": 980000,
            "type": "Studio",
            "area": 45,
            "rooms": 1
          },
          "topMatches": []
        }
      ]
    }
  },
  "propertiesProcessed": 2,
  "matchesFound": 0
}

              `}</code>
            </pre>
          </div>
        </section>

      </div>
    </div>
  );
};

export default DocsIntro;
