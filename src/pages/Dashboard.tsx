import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDashboardStore } from "@/store/dashboard";
import { useSearchStore } from "@/store/search";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";
import { Bookmark, Clock, Settings, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("saved");
  
  const {
    savedCases,
    preferences,
    updatePreferences,
    removeSavedCase,
    clearSavedCases,
  } = useDashboardStore();

  const { history, clearHistory } = useSearchStore();

  const handleRemoveCase = (caseId: string) => {
    removeSavedCase(caseId);
    toast({
      title: "Case removed",
      description: "The case has been removed from your saved cases.",
    });
  };

  const handleClearSavedCases = () => {
    clearSavedCases();
    toast({
      title: "Saved cases cleared",
      description: "All saved cases have been removed.",
    });
  };

  const handleClearHistory = () => {
    clearHistory();
    toast({
      title: "Search history cleared",
      description: "Your search history has been cleared.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList>
            <TabsTrigger value="saved" className="flex items-center gap-2">
              <Bookmark className="h-4 w-4" />
              Saved Cases
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Search History
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="saved">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Saved Cases</CardTitle>
                {savedCases.length > 0 && (
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={handleClearSavedCases}
                    className="gap-2"
                  >
                    <Trash2 className="h-4 w-4" />
                    Clear All
                  </Button>
                )}
              </CardHeader>
              <CardContent>
                {savedCases.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <Bookmark className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                    <p>No saved cases yet</p>
                    <Button
                      variant="link"
                      onClick={() => navigate("/")}
                      className="mt-2"
                    >
                      Browse cases
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {savedCases.map((case_) => (
                      <div
                        key={case_.id}
                        className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200"
                      >
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-medium text-gray-900 truncate">
                            {case_.title}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {case_.court} • {format(new Date(case_.date), 'MMM d, yyyy')}
                          </p>
                        </div>
                        <div className="flex items-center gap-4">
                          <Button
                            variant="ghost"
                            onClick={() => navigate(`/case/${case_.id}`)}
                          >
                            View
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRemoveCase(case_.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Search History</CardTitle>
                {history.length > 0 && (
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={handleClearHistory}
                    className="gap-2"
                  >
                    <Trash2 className="h-4 w-4" />
                    Clear All
                  </Button>
                )}
              </CardHeader>
              <CardContent>
                {history.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <Clock className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                    <p>No search history yet</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {history.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {item.query}
                          </p>
                          <p className="text-xs text-gray-500">
                            {format(item.timestamp, 'MMM d, yyyy h:mm a')}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => navigate("/")}
                        >
                          Search Again
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Theme</Label>
                      <p className="text-sm text-gray-500">
                        Choose your preferred theme
                      </p>
                    </div>
                    <Select
                      value={preferences.theme}
                      onValueChange={(value: 'light' | 'dark' | 'system') =>
                        updatePreferences({ theme: value })
                      }
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Email Notifications</Label>
                      <p className="text-sm text-gray-500">
                        Receive email updates about your saved cases
                      </p>
                    </div>
                    <Switch
                      checked={preferences.emailNotifications}
                      onCheckedChange={(checked) =>
                        updatePreferences({ emailNotifications: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Default View</Label>
                      <p className="text-sm text-gray-500">
                        Choose how cases are displayed by default
                      </p>
                    </div>
                    <Select
                      value={preferences.defaultView}
                      onValueChange={(value: 'list' | 'grid') =>
                        updatePreferences({ defaultView: value })
                      }
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="list">List</SelectItem>
                        <SelectItem value="grid">Grid</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Default Sort</Label>
                      <p className="text-sm text-gray-500">
                        Choose how cases are sorted by default
                      </p>
                    </div>
                    <Select
                      value={preferences.defaultSort}
                      onValueChange={(value: 'date' | 'relevance') =>
                        updatePreferences({ defaultSort: value })
                      }
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="date">Date</SelectItem>
                        <SelectItem value="relevance">Relevance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard; 