import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Loader2, Upload, FileText, Trophy } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import api from "@/lib/auth-api";

interface Recommendation {
  clientName: string;
  matchScore: number;
  reasons: string[];
}

interface PropertyMatchResponse {
  property: {
    location: string;
    price: number;
    type: string;
    area: number;
    rooms: number;
  };
  recommendations: Recommendation[];
}

const Examples = () => {
  const [property, setProperty] = useState({
    location: "Algiers",
    price: "15000000",
    type: "Apartment",
    area: "110",
    rooms: "4",
  });
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [numberOfResults, setNumberOfResults] = useState("5");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<PropertyMatchResponse | null>(null);
  const [error, setError] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type === "application/pdf") {
        setPdfFile(file);
        setError("");
      } else {
        setError("Please select a PDF file");
        setPdfFile(null);
      }
    }
  };

  const handlePropertyChange = (field: string, value: string) => {
    setProperty((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!pdfFile) {
      setError("Please select a PDF file");
      return;
    }

    setIsLoading(true);
    setError("");
    setResults(null);

    try {
      const formData = new FormData();

      // Prepare property data
      const propertyData = {
        location: property.location,
        price: parseInt(property.price),
        type: property.type,
        area: parseInt(property.area),
        rooms: parseInt(property.rooms),
      };

      formData.append("proprety", JSON.stringify(propertyData));
      formData.append("pdf", pdfFile, "contacts.pdf");
      formData.append("number", numberOfResults);

      const response = await api.post(
        "/recommendations/with-pdf-tst",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.status === "success") {
        // Parse the JSON string from the result field
        const resultData = JSON.parse(
          response.data.result.replace(/```json\n|\n```/g, "")
        );

        // Sort recommendations by matchScore in descending order
        const sortedRecommendations = resultData.recommendations.sort(
          (a: Recommendation, b: Recommendation) => b.matchScore - a.matchScore
        );

        setResults({
          ...resultData,
          recommendations: sortedRecommendations,
        });

        toast({
          title: "Success!",
          description: `Found ${sortedRecommendations.length} matching clients`,
        });
      } else {
        throw new Error("Failed to get recommendations");
      }
    } catch (err: unknown) {
      console.error("Error:", err);
      let errorMessage = "Failed to get recommendations";

      if (err instanceof Error) {
        errorMessage = err.message;
      } else if (typeof err === "object" && err !== null && "response" in err) {
        const response = (err as { response?: { data?: { message?: string } } })
          .response;
        errorMessage =
          response?.data?.message || "Failed to get recommendations";
      }

      setError(errorMessage);
      toast({
        title: "Error",
        description: "Failed to get property recommendations",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getMatchScoreColor = (score: number) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getMatchScoreVariant = (score: number) => {
    if (score >= 80) return "default";
    if (score >= 60) return "secondary";
    return "destructive";
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">API Examples</h1>
          <p className="text-xl text-muted-foreground">
            Test the property matching API with real data
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Property Matching with PDF Contacts
            </CardTitle>
            <CardDescription>
              Upload a PDF file containing client contacts and find the best
              matches for your property
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Property Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={property.location}
                    onChange={(e) =>
                      handlePropertyChange("location", e.target.value)
                    }
                    placeholder="e.g., Algiers"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Price (DZD)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={property.price}
                    onChange={(e) =>
                      handlePropertyChange("price", e.target.value)
                    }
                    placeholder="e.g., 15000000"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Property Type</Label>
                  <Input
                    id="type"
                    value={property.type}
                    onChange={(e) =>
                      handlePropertyChange("type", e.target.value)
                    }
                    placeholder="e.g., Apartment"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="area">Area (m²)</Label>
                  <Input
                    id="area"
                    type="number"
                    value={property.area}
                    onChange={(e) =>
                      handlePropertyChange("area", e.target.value)
                    }
                    placeholder="e.g., 110"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rooms">Number of Rooms</Label>
                  <Input
                    id="rooms"
                    type="number"
                    value={property.rooms}
                    onChange={(e) =>
                      handlePropertyChange("rooms", e.target.value)
                    }
                    placeholder="e.g., 4"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="number">Number of Results</Label>
                  <Input
                    id="number"
                    type="number"
                    value={numberOfResults}
                    onChange={(e) => setNumberOfResults(e.target.value)}
                    placeholder="e.g., 5"
                    min="1"
                    max="20"
                    required
                  />
                </div>
              </div>

              {/* PDF Upload */}
              <div className="space-y-2">
                <Label htmlFor="pdf">Client Contacts PDF</Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="pdf"
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="flex-1"
                    required
                  />
                  {pdfFile && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <FileText className="h-4 w-4" />
                      {pdfFile.name}
                    </div>
                  )}
                </div>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Finding Matches...
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    Find Property Matches
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Results */}
        {results && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5" />
                Property Matching Results
              </CardTitle>
              <CardDescription>
                Best matching clients for your property in{" "}
                {results.property.location}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Property Summary */}
              <div className="mb-6 p-4 bg-muted/50 rounded-lg">
                <h3 className="font-semibold mb-2">Property Details</h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Location:</span>
                    <div className="font-medium">
                      {results.property.location}
                    </div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Price:</span>
                    <div className="font-medium">
                      {results.property.price.toLocaleString()} DZD
                    </div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Type:</span>
                    <div className="font-medium">{results.property.type}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Area:</span>
                    <div className="font-medium">
                      {results.property.area} m²
                    </div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Rooms:</span>
                    <div className="font-medium">{results.property.rooms}</div>
                  </div>
                </div>
              </div>

              {/* Results Table */}
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[60px]">Rank</TableHead>
                      <TableHead>Client Name</TableHead>
                      <TableHead>Match Score</TableHead>
                      <TableHead>Matching Reasons</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {results.recommendations.map((rec, index) => (
                      <TableRow key={rec.clientName}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">#{index + 1}</span>
                            {index === 0 && (
                              <Trophy className="h-4 w-4 text-yellow-500" />
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">
                          {rec.clientName}
                        </TableCell>
                        <TableCell>
                          <Badge variant={getMatchScoreVariant(rec.matchScore)}>
                            {rec.matchScore}%
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            {rec.reasons.map((reason, reasonIndex) => (
                              <div
                                key={reasonIndex}
                                className="text-sm text-muted-foreground"
                              >
                                • {reason}
                              </div>
                            ))}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Summary Stats */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="text-2xl font-bold text-center">
                      {results.recommendations.length}
                    </div>
                    <div className="text-sm text-muted-foreground text-center">
                      Total Matches
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-2xl font-bold text-center">
                      {Math.max(
                        ...results.recommendations.map((r) => r.matchScore)
                      )}
                      %
                    </div>
                    <div className="text-sm text-muted-foreground text-center">
                      Highest Score
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-2xl font-bold text-center">
                      {Math.round(
                        results.recommendations.reduce(
                          (sum, r) => sum + r.matchScore,
                          0
                        ) / results.recommendations.length
                      )}
                      %
                    </div>
                    <div className="text-sm text-muted-foreground text-center">
                      Average Score
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Examples;
