import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCaseStore } from "@/store/case";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2, Brain } from "lucide-react";
import { format } from "date-fns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

const CaseDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { currentCase, isLoading, error, fetchCase, generateAnalysis } = useCaseStore();

  useEffect(() => {
    if (id) {
      fetchCase(id);
    }
  }, [id]);

  if (isLoading && !currentCase) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-red-600 mb-4">{error}</p>
        <Button onClick={() => navigate(-1)}>Go Back</Button>
      </div>
    );
  }

  if (!currentCase) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Search
        </Button>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {currentCase.title}
          </h1>
          
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="secondary">
              {currentCase.court}
            </Badge>
            <Badge variant="secondary">
              {currentCase.jurisdiction}
            </Badge>
            <Badge variant="secondary">
              {format(new Date(currentCase.date), 'MMMM d, yyyy')}
            </Badge>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Plaintiff</h3>
              <p className="text-gray-900">{currentCase.parties.plaintiff}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Defendant</h3>
              <p className="text-gray-900">{currentCase.parties.defendant}</p>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Judges</h3>
            <div className="flex flex-wrap gap-2">
              {currentCase.judges.map((judge, index) => (
                <Badge key={index} variant="outline">
                  {judge}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Citations</h3>
            <div className="flex flex-wrap gap-2">
              {currentCase.citations.map((citation, index) => (
                <Badge key={index} variant="outline">
                  {citation}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <Tabs defaultValue="summary" className="space-y-6">
          <TabsList>
            <TabsTrigger value="summary">Summary</TabsTrigger>
            <TabsTrigger value="analysis">AI Analysis</TabsTrigger>
            <TabsTrigger value="full-text">Full Text</TabsTrigger>
          </TabsList>

          <TabsContent value="summary">
            <Card>
              <CardHeader>
                <CardTitle>Case Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 whitespace-pre-wrap">
                  {currentCase.summary}
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analysis">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>AI Analysis</CardTitle>
                {!currentCase.analysis && (
                  <Button
                    onClick={generateAnalysis}
                    disabled={isLoading}
                    className="gap-2"
                  >
                    {isLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Brain className="h-4 w-4" />
                    )}
                    Generate Analysis
                  </Button>
                )}
              </CardHeader>
              <CardContent>
                {isLoading && currentCase.analysis ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                  </div>
                ) : currentCase.analysis ? (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-2">AI Summary</h3>
                      <p className="text-gray-700">
                        {currentCase.analysis.summary}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-2">Key Points</h3>
                      <ul className="list-disc list-inside space-y-1">
                        {currentCase.analysis.keyPoints.map((point, index) => (
                          <li key={index} className="text-gray-700">
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-2">Legal Principles</h3>
                      <ul className="list-disc list-inside space-y-1">
                        {currentCase.analysis.legalPrinciples.map((principle, index) => (
                          <li key={index} className="text-gray-700">
                            {principle}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-2">Similar Cases</h3>
                      <div className="space-y-2">
                        {currentCase.analysis.similarCases.map((case_) => (
                          <div
                            key={case_.id}
                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                          >
                            <span className="text-gray-700">{case_.title}</span>
                            <Badge variant="secondary">
                              {Math.round(case_.similarity * 100)}% similar
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-2">AI Insights</h3>
                      <p className="text-gray-700">
                        {currentCase.analysis.aiInsights}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Brain className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                    <p>Click the button above to generate AI analysis</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="full-text">
            <Card>
              <CardHeader>
                <CardTitle>Full Text</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[600px] rounded-md border p-4">
                  <p className="text-gray-700 whitespace-pre-wrap">
                    {currentCase.fullText}
                  </p>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CaseDetail;
