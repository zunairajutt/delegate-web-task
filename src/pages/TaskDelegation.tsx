import { useState, useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Upload, 
  Plus, 
  X, 
  FileText, 
  DollarSign, 
  Shield, 
  Building,
  CheckCircle,
  AlertCircle,
  Zap,
  Link,
  CreditCard,
  Database,
  Cloud,
  Settings,
  HelpCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Constraint {
  id: string;
  type: string;
  value: string;
}

interface Integration {
  id: string;
  name: string;
  description: string;
  icon: any;
  connected: boolean;
  category: 'banking' | 'documents' | 'services';
}

export default function TaskDelegation() {
  const [goal, setGoal] = useState("");
  const [constraints, setConstraints] = useState<Constraint[]>([]);
  const [newConstraint, setNewConstraint] = useState({ type: "", value: "" });
  const [aiInterpretation, setAiInterpretation] = useState("");
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const { toast } = useToast();

  // Memoize static data to prevent unnecessary re-renders
  const constraintTypes = useMemo(() => [
    { id: "budget", label: "Budget Cap", icon: DollarSign, placeholder: "e.g., Maximum $150/month", description: "Set spending limits" },
    { id: "exclusion", label: "Company Exclusion", icon: Building, placeholder: "e.g., Exclude State Farm", description: "Avoid specific providers" },
    { id: "requirement", label: "Feature Requirement", icon: Shield, placeholder: "e.g., Must include fire coverage", description: "Essential features" },
    { id: "timeline", label: "Timeline", icon: Zap, placeholder: "e.g., Complete within 2 weeks", description: "Time constraints" },
    { id: "quality", label: "Quality Standard", icon: CheckCircle, placeholder: "e.g., Minimum 4-star rating", description: "Quality requirements" }
  ], []);

  const integrations = useMemo(() => [
    { id: "bank", name: "Bank Account", description: "Connect for payment verification", icon: CreditCard, connected: false, category: 'banking' as const },
    { id: "dropbox", name: "Dropbox", description: "Access your document vault", icon: Cloud, connected: false, category: 'documents' as const },
    { id: "google", name: "Google Drive", description: "Import documents and data", icon: Database, connected: false, category: 'documents' as const },
    { id: "quickbooks", name: "QuickBooks", description: "Financial data integration", icon: DollarSign, connected: false, category: 'banking' as const },
    { id: "salesforce", name: "Salesforce", description: "CRM data access", icon: Building, connected: false, category: 'services' as const }
  ], []);

  // Memoize constraint placeholder
  const constraintPlaceholder = useMemo(() => {
    return constraintTypes.find(t => t.id === newConstraint.type)?.placeholder || "Enter constraint value...";
  }, [newConstraint.type, constraintTypes]);

  // Optimize handlers with useCallback
  const addConstraint = useCallback(() => {
    if (newConstraint.type && newConstraint.value) {
      setConstraints(prev => [...prev, {
        id: Date.now().toString(),
        type: newConstraint.type,
        value: newConstraint.value
      }]);
      setNewConstraint({ type: "", value: "" });
    }
  }, [newConstraint.type, newConstraint.value]);

  const removeConstraint = useCallback((id: string) => {
    setConstraints(prev => prev.filter(c => c.id !== id));
  }, []);

  const generateInterpretation = useCallback(() => {
    if (goal) {
      const constraintText = constraints.length > 0 
        ? `\n\nConstraints:\n${constraints.map(c => `• ${constraintTypes.find(t => t.id === c.type)?.label}: ${c.value}`).join('\n')}`
        : '';
      
      setAiInterpretation(
        `I understand you want to ${goal.toLowerCase()}.${constraintText}\n\n` +
        `My approach will be:\n` +
        `• Analyze your requirements and constraints thoroughly\n` +
        `• Research available options within your specified parameters\n` +
        `• Compare features, costs, and quality metrics\n` +
        `• Present you with 3-5 top recommendations with detailed analysis\n` +
        `• Provide clear reasoning for each recommendation\n\n` +
        `Estimated completion time: 5-15 minutes depending on complexity.`
      );
    }
  }, [goal, constraints, constraintTypes]);

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setUploadedFiles(prev => [...prev, ...files]);
    toast({
      title: "Files Uploaded",
      description: `${files.length} file(s) added successfully.`,
    });
  }, [toast]);

  const removeFile = useCallback((index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  }, []);

  const toggleIntegration = useCallback((id: string) => {
    // In a real app, this would handle OAuth flow
    toast({
      title: "Integration Toggled",
      description: "Integration connection status updated.",
    });
  }, [toast]);

  const handleStartTask = useCallback(() => {
    if (!goal) {
      toast({
        title: "Goal Required",
        description: "Please enter your high-level goal before proceeding.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Task Initiated",
      description: "Your AI agent has started working on your task. You'll be redirected to monitoring.",
    });
    
    // In a real app, this would navigate to monitoring
    setTimeout(() => {
      window.location.href = "/monitoring";
    }, 2000);
  }, [goal, toast]);

  // Memoize computed values
  const isFormValid = useMemo(() => {
    return goal && isConfirmed;
  }, [goal, isConfirmed]);

  const constraintCount = useMemo(() => constraints.length, [constraints]);
  const fileCount = useMemo(() => uploadedFiles.length, [uploadedFiles]);

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-foreground">Task Delegation & Goal Setting</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Define your high-level goal, set constraints, and let our AI agent handle the complex work for you.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        {/* Main Form - Takes up 3 columns on large screens */}
        <div className="xl:col-span-3 space-y-6">
          <Tabs defaultValue="goal" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="goal">Goal & Constraints</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="integrations">Integrations</TabsTrigger>
              <TabsTrigger value="advanced">Advanced</TabsTrigger>
            </TabsList>

            <TabsContent value="goal" className="space-y-6">
              {/* Goal Definition */}
              <Card className="shadow-lg border-card-border">
                <CardHeader className="bg-gradient-surface">
                  <CardTitle className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-primary-foreground">1</span>
                    </div>
                    <span>Define Your Goal</span>
                  </CardTitle>
                  <CardDescription>
                    Describe what you want to accomplish in clear, simple terms.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="goal" className="text-sm font-medium">High-Level Goal</Label>
                    <Textarea
                      id="goal"
                      placeholder="Example: Find a cheaper home insurance policy with better coverage than my current one, or Research the best investment portfolio for my retirement savings"
                      value={goal}
                      onChange={(e) => setGoal(e.target.value)}
                      className="min-h-[120px] resize-none text-base"
                    />
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="text-xs">
                      💡 Be specific about your desired outcome
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      ⏰ Include any time constraints
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      🎯 Focus on the "what", not the "how"
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      📊 Mention any specific metrics or criteria
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Constraints */}
              <Card className="shadow-lg border-card-border">
                <CardHeader className="bg-gradient-surface">
                  <CardTitle className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-primary-foreground">2</span>
                    </div>
                    <span>Set Constraints & Requirements</span>
                  </CardTitle>
                  <CardDescription>
                    Add specific requirements, exclusions, and limitations to guide the AI.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Add New Constraint */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <select
                      value={newConstraint.type}
                      onChange={(e) => setNewConstraint(prev => ({ ...prev, type: e.target.value }))}
                      className="px-3 py-2 border border-input rounded-md bg-background text-sm"
                    >
                      <option value="">Select constraint type...</option>
                      {constraintTypes.map(type => (
                        <option key={type.id} value={type.id}>{type.label}</option>
                      ))}
                    </select>
                    <Input
                      placeholder={constraintPlaceholder}
                      value={newConstraint.value}
                      onChange={(e) => setNewConstraint(prev => ({ ...prev, value: e.target.value }))}
                      className="md:col-span-2"
                    />
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button 
                      onClick={addConstraint} 
                      size="sm" 
                      variant="outline" 
                      disabled={!newConstraint.type || !newConstraint.value}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Constraint
                    </Button>
                    <Button variant="ghost" size="sm" className="text-muted-foreground">
                      <HelpCircle className="w-4 h-4 mr-2" />
                      Help
                    </Button>
                  </div>

                  {/* Constraint List */}
                  {constraintCount > 0 && (
                    <div className="space-y-3">
                      <Label className="text-sm font-medium">Active Constraints ({constraintCount})</Label>
                      <div className="grid gap-3">
                        {constraints.map((constraint) => {
                          const type = constraintTypes.find(t => t.id === constraint.type);
                          const Icon = type?.icon || FileText;
                          return (
                            <div key={constraint.id} className="flex items-center justify-between p-4 bg-muted rounded-lg border border-card-border">
                              <div className="flex items-center space-x-3">
                                <Icon className="w-5 h-5 text-muted-foreground" />
                                <div>
                                  <div className="text-sm font-medium">{type?.label}</div>
                                  <div className="text-xs text-muted-foreground">{constraint.value}</div>
                                </div>
                              </div>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => removeConstraint(constraint.id)}
                                className="h-8 w-8 text-muted-foreground hover:text-destructive"
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="documents" className="space-y-6">
              {/* Document Upload */}
              <Card className="shadow-lg border-card-border">
                <CardHeader className="bg-gradient-surface">
                  <CardTitle className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-primary-foreground">3</span>
                    </div>
                    <span>Supporting Documents</span>
                  </CardTitle>
                  <CardDescription>
                    Upload relevant files to help the AI understand your current situation.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Upload Area */}
                  <div className="border-2 border-dashed border-card-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
                    <input
                      type="file"
                      multiple
                      onChange={handleFileUpload}
                      className="hidden"
                      id="file-upload"
                      accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <div className="space-y-2">
                        <p className="text-sm font-medium">Drop files here or click to upload</p>
                        <p className="text-xs text-muted-foreground">
                          PDF, DOC, XLS, or image files up to 10MB each
                        </p>
                      </div>
                    </label>
                  </div>

                  {/* Uploaded Files */}
                  {fileCount > 0 && (
                    <div className="space-y-3">
                      <Label className="text-sm font-medium">Uploaded Files ({fileCount})</Label>
                      <div className="space-y-2">
                        {uploadedFiles.map((file, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                            <div className="flex items-center space-x-3">
                              <FileText className="w-4 h-4 text-muted-foreground" />
                              <div>
                                <div className="text-sm font-medium">{file.name}</div>
                                <div className="text-xs text-muted-foreground">
                                  {(file.size / 1024 / 1024).toFixed(2)} MB
                                </div>
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeFile(index)}
                              className="h-8 w-8 text-muted-foreground hover:text-destructive"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="integrations" className="space-y-6">
              {/* Integrations */}
              <Card className="shadow-lg border-card-border">
                <CardHeader className="bg-gradient-surface">
                  <CardTitle className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-primary-foreground">4</span>
                    </div>
                    <span>Connect External Services</span>
                  </CardTitle>
                  <CardDescription>
                    Link your accounts to provide the AI with additional context and data.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {integrations.map((integration) => {
                      const Icon = integration.icon;
                      return (
                        <div key={integration.id} className="flex items-center justify-between p-4 border border-card-border rounded-lg hover:bg-muted/30 transition-colors">
                          <div className="flex items-center space-x-3">
                            <Icon className="w-5 h-5 text-muted-foreground" />
                            <div>
                              <div className="text-sm font-medium">{integration.name}</div>
                              <div className="text-xs text-muted-foreground">{integration.description}</div>
                            </div>
                          </div>
                          <Button
                            variant={integration.connected ? "default" : "outline"}
                            size="sm"
                            onClick={() => toggleIntegration(integration.id)}
                          >
                            <Link className="w-4 h-4 mr-2" />
                            {integration.connected ? "Connected" : "Connect"}
                          </Button>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="advanced" className="space-y-6">
              {/* Advanced Settings */}
              <Card className="shadow-lg border-card-border">
                <CardHeader className="bg-gradient-surface">
                  <CardTitle className="flex items-center space-x-2">
                    <Settings className="w-6 h-6 text-primary" />
                    <span>Advanced Configuration</span>
                  </CardTitle>
                  <CardDescription>
                    Fine-tune AI behavior and processing preferences.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Processing Speed</Label>
                      <select className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm">
                        <option value="balanced">Balanced (Recommended)</option>
                        <option value="fast">Fast (Less thorough)</option>
                        <option value="thorough">Thorough (More detailed)</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Output Format</Label>
                      <select className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm">
                        <option value="summary">Summary + Details</option>
                        <option value="detailed">Detailed Analysis</option>
                        <option value="executive">Executive Summary</option>
                      </select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* AI Interpretation & Controls - Takes up 1 column on large screens */}
        <div className="space-y-6">
          {/* AI Understanding */}
          <Card className="shadow-lg border-card-border sticky top-8">
            <CardHeader className="bg-gradient-surface">
              <CardTitle className="flex items-center space-x-2">
                <AlertCircle className="w-5 h-5 text-secondary" />
                <span>AI Interpretation</span>
              </CardTitle>
              <CardDescription>
                How the AI understands your task
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {!aiInterpretation ? (
                <div className="text-center py-8">
                  <p className="text-sm text-muted-foreground mb-4">
                    Enter your goal to see how the AI interprets your task
                  </p>
                  <Button
                    onClick={generateInterpretation}
                    disabled={!goal}
                    variant="outline"
                    size="sm"
                  >
                    Generate Interpretation
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="text-sm text-foreground whitespace-pre-line bg-muted p-4 rounded-lg max-h-64 overflow-y-auto">
                    {aiInterpretation}
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button
                      variant={isConfirmed ? "success" : "outline"}
                      size="sm"
                      onClick={() => setIsConfirmed(!isConfirmed)}
                      className="flex-1"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      {isConfirmed ? "Confirmed" : "Confirm"}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={generateInterpretation}
                    >
                      Regenerate
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Action Panel */}
          <Card className="shadow-lg border-card-border">
            <CardHeader className="bg-gradient-surface">
              <CardTitle>Ready to Start?</CardTitle>
              <CardDescription>
                Begin AI delegation when you're satisfied with the setup
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <CheckCircle className={`w-4 h-4 ${goal ? 'text-success' : 'text-muted-foreground'}`} />
                  <span className={goal ? 'text-foreground' : 'text-muted-foreground'}>
                    Goal defined
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className={`w-4 h-4 ${constraintCount > 0 ? 'text-success' : 'text-muted-foreground'}`} />
                  <span className={constraintCount > 0 ? 'text-foreground' : 'text-muted-foreground'}>
                    Constraints added ({constraintCount})
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className={`w-4 h-4 ${fileCount > 0 ? 'text-success' : 'text-muted-foreground'}`} />
                  <span className={fileCount > 0 ? 'text-foreground' : 'text-muted-foreground'}>
                    Documents uploaded ({fileCount})
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className={`w-4 h-4 ${isConfirmed ? 'text-success' : 'text-muted-foreground'}`} />
                  <span className={isConfirmed ? 'text-foreground' : 'text-muted-foreground'}>
                    AI interpretation confirmed
                  </span>
                </div>
              </div>
              
              <Separator />
              
              <Button
                onClick={handleStartTask}
                className="w-full"
                size="lg"
                variant="ai"
                disabled={!isFormValid}
              >
                <Zap className="w-5 h-5 mr-2" />
                Start AI Delegation
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}