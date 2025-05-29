
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, ArrowLeft } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";

const CaseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock case data
  const caseData = {
    id: id,
    title: "Smith v. TechCorp Industries",
    court: "U.S. District Court, Northern District of California",
    dateFiled: "2024-03-15",
    state: "California",
    type: "Employment",
    status: "Active",
    summary: "This employment discrimination case involves allegations of wrongful termination and hostile work environment. The plaintiff, Sarah Smith, was a senior software engineer at TechCorp Industries for five years before her termination in February 2024. She claims she was terminated in retaliation for reporting gender-based discrimination and harassment by her supervisor. The case includes claims under Title VII, the California Fair Employment and Housing Act, and wrongful termination in violation of public policy. TechCorp has denied all allegations and claims the termination was based on legitimate performance issues.",
    parties: {
      plaintiff: "Sarah Smith",
      defendant: "TechCorp Industries Inc.",
      plaintiffAttorney: "Johnson & Associates LLP",
      defendantAttorney: "Corporate Defense Partners"
    }
  };

  const timelineData = [
    { month: "Jan", filings: 12 },
    { month: "Feb", filings: 19 },
    { month: "Mar", filings: 15 },
    { month: "Apr", filings: 22 },
    { month: "May", filings: 18 },
    { month: "Jun", filings: 25 }
  ];

  const outcomeData = [
    { name: "Plaintiff Victory", value: 35, color: "#3b82f6" },
    { name: "Defendant Victory", value: 40, color: "#ef4444" },
    { name: "Settlement", value: 25, color: "#10b981" }
  ];

  const damagesData = [
    { range: "$0-50K", cases: 15 },
    { range: "$50K-100K", cases: 22 },
    { range: "$100K-500K", cases: 18 },
    { range: "$500K-1M", cases: 12 },
    { range: "$1M+", cases: 8 }
  ];

  const handleDownloadCSV = () => {
    const csvData = `Case ID,Title,Court,Date Filed,Type,Status
${caseData.id},"${caseData.title}","${caseData.court}",${caseData.dateFiled},${caseData.type},${caseData.status}`;
    
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `case-${caseData.id}-data.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Button
              variant="ghost"
              onClick={() => navigate("/")}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Cases
            </Button>
            <h1 className="text-2xl font-bold text-blue-600">Verdicto</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-gray-900">{caseData.title}</h1>
            <Button onClick={handleDownloadCSV} className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Download CSV
            </Button>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              {caseData.type}
            </Badge>
            <Badge variant="outline" className="border-green-500 text-green-700">
              {caseData.status}
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
            <div>
              <strong>Court:</strong> {caseData.court}
            </div>
            <div>
              <strong>Date Filed:</strong> {new Date(caseData.dateFiled).toLocaleDateString()}
            </div>
            <div>
              <strong>Plaintiff:</strong> {caseData.parties.plaintiff}
            </div>
            <div>
              <strong>Defendant:</strong> {caseData.parties.defendant}
            </div>
          </div>
        </div>

        <Tabs defaultValue="summary" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="summary">Case Summary</TabsTrigger>
            <TabsTrigger value="analytics">Legal Analytics</TabsTrigger>
            <TabsTrigger value="transcript">Transcript</TabsTrigger>
          </TabsList>

          <TabsContent value="summary" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Case Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed text-lg">
                  {caseData.summary}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Party Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Plaintiff</h4>
                    <p>{caseData.parties.plaintiff}</p>
                    <p className="text-sm text-gray-600">Represented by: {caseData.parties.plaintiffAttorney}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Defendant</h4>
                    <p>{caseData.parties.defendant}</p>
                    <p className="text-sm text-gray-600">Represented by: {caseData.parties.defendantAttorney}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Filing Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={timelineData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="filings" stroke="#3b82f6" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Case Outcomes</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={outcomeData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                        {outcomeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Damages Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={damagesData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="range" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="cases" fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="transcript" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Transcript Availability</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg mb-4">
                    No transcripts are currently available for this case.
                  </p>
                  <p className="text-sm text-gray-400">
                    Transcripts will appear here once court proceedings begin and documents become available.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CaseDetail;
