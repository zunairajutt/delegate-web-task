import { useState, useEffect, useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Activity, 
  Clock, 
  Brain, 
  CheckCircle, 
  AlertTriangle, 
  Search, 
  FileSearch, 
  TrendingUp,
  Zap,
  Play,
  Pause,
  RotateCcw,
  BarChart3,
  PieChart,
  Target,
  Timer,
  Eye,
  EyeOff,
  Maximize2,
  Minimize2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ActivityLog {
  id: string;
  timestamp: string;
  step: string;
  status: 'completed' | 'in-progress' | 'pending' | 'error';
  description: string;
  details?: string;
  duration?: string;
  confidence?: number;
}

interface ReasoningEntry {
  id: string;
  timestamp: string;
  reasoning: string;
  confidence: number;
  category: 'analysis' | 'decision' | 'optimization' | 'validation';
}

interface Metric {
  label: string;
  value: string | number;
  change?: string;
  trend: 'up' | 'down' | 'neutral';
  unit?: string;
}

export default function LiveMonitoring() {
  const [progress, setProgress] = useState(35);
  const [currentStep, setCurrentStep] = useState(2);
  const [isRunning, setIsRunning] = useState(true);
  const [needsApproval, setNeedsApproval] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedLog, setSelectedLog] = useState<string | null>(null);
  const { toast } = useToast();

  // Memoize static data to prevent unnecessary re-renders
  const steps = useMemo(() => [
    { id: 1, name: "Initial Analysis", status: "completed", description: "Analyzing requirements and constraints" },
    { id: 2, name: "Data Collection", status: "in-progress", description: "Gathering information from sources" },
    { id: 3, name: "Option Evaluation", status: "pending", description: "Comparing and ranking options" },
    { id: 4, name: "Final Recommendations", status: "pending", description: "Preparing final report" }
  ], []);

  const activityLogs = useMemo(() => [
    {
      id: "1",
      timestamp: "2:03 PM",
      step: "Step 1/4: Initial Analysis",
      status: "completed",
      description: "Analyzed current insurance policy",
      details: "Extracted coverage details, premium costs, and policy terms from uploaded document. Identified key areas for potential improvement.",
      duration: "2m 15s",
      confidence: 98
    },
    {
      id: "2", 
      timestamp: "2:05 PM",
      step: "Step 2/4: Data Collection",
      status: "completed",
      description: "Identified 47 potential insurance providers",
      details: "Filtered by geographic availability, coverage requirements, and customer service ratings. Excluded State Farm per user request.",
      duration: "1m 45s",
      confidence: 95
    },
    {
      id: "3",
      timestamp: "2:07 PM",
      step: "Step 2/4: Data Collection", 
      status: "in-progress",
      description: "Gathering quotes from top 12 providers...",
      details: "Requesting personalized quotes based on your profile and requirements. Processing real-time pricing data.",
      duration: "3m 20s",
      confidence: 87
    },
    {
      id: "4",
      timestamp: "2:08 PM",
      step: "Step 2/4: Data Collection",
      status: "pending",
      description: "Validating coverage options",
      details: "Cross-referencing policy terms and conditions to ensure compatibility with your needs."
    },
    {
      id: "5",
      timestamp: "2:09 PM",
      step: "Step 3/4: Option Evaluation",
      status: "pending",
      description: "Comparing cost-benefit ratios",
      details: "Analyzing premium costs, coverage limits, deductibles, and customer satisfaction scores."
    }
  ], []);

  const reasoningLog = useMemo(() => [
    {
      id: "1",
      timestamp: "2:03 PM",
      reasoning: "Your current policy shows $1,200 annual premium with basic coverage. Market analysis suggests 25-40% savings possible with comparable coverage.",
      confidence: 95,
      category: "analysis"
    },
    {
      id: "2",
      timestamp: "2:05 PM", 
      reasoning: "Excluded State Farm per your request. Prioritizing providers with excellent customer service ratings (>4.5/5) and fire coverage inclusion.",
      confidence: 88,
      category: "decision"
    },
    {
      id: "3",
      timestamp: "2:07 PM",
      reasoning: "Found 3 providers offering 30%+ savings with equivalent coverage. Verifying policy terms and hidden fees before final evaluation.",
      confidence: 92,
      category: "optimization"
    },
    {
      id: "4",
      timestamp: "2:08 PM",
      reasoning: "Allstate shows best value proposition: 42% savings, superior coverage, and 4.6/5 customer rating. Proceeding with detailed analysis.",
      confidence: 89,
      category: "validation"
    }
  ], []);

  const metrics = useMemo(() => [
    { label: "Providers Analyzed", value: 12, change: "+3", trend: "up", unit: "companies" },
    { label: "Potential Savings", value: 425, change: "+25", trend: "up", unit: "$/year" },
    { label: "Coverage Score", value: 95, change: "+15", trend: "up", unit: "%" },
    { label: "Processing Time", value: "8m 30s", change: "-2m", trend: "down", unit: "" },
    { label: "Confidence Level", value: 92, change: "+3", trend: "up", unit: "%" },
    { label: "Options Found", value: 3, change: "+1", trend: "up", unit: "policies" }
  ], []);

  // Optimize progress updates with useCallback
  const updateProgress = useCallback(() => {
    if (isRunning && progress < 75) {
      setProgress(prev => prev + 1);
    }
    
    // Simulate approval needed at 60% - only trigger once
    if (progress === 60 && !needsApproval) {
      setNeedsApproval(true);
      setIsRunning(false);
      toast({
        title: "Approval Required",
        description: "AI found multiple options and needs your input to proceed.",
        variant: "default"
      });
    }
  }, [isRunning, progress, needsApproval, toast]);

  // Optimize useEffect with proper dependencies
  useEffect(() => {
    // Use a longer interval to reduce processing load
    const interval = setInterval(updateProgress, 3000); // Increased from 2000ms to 3000ms

    return () => clearInterval(interval);
  }, [updateProgress]);

  // Memoize handlers to prevent unnecessary re-renders
  const handleApproval = useCallback((approved: boolean) => {
    setNeedsApproval(false);
    if (approved) {
      setIsRunning(true);
      toast({
        title: "Processing Continued",
        description: "AI agent is proceeding with your approved selection.",
      });
    }
  }, [toast]);

  const toggleMonitoring = useCallback(() => {
    setIsRunning(!isRunning);
    toast({
      title: isRunning ? "Monitoring Paused" : "Monitoring Resumed", 
      description: isRunning ? "AI processing has been paused." : "AI processing has resumed.",
    });
  }, [isRunning, toast]);

  // Memoize status color functions
  const getStatusColor = useCallback((status: string) => {
    switch (status) {
      case 'completed': return 'text-success';
      case 'in-progress': return 'text-primary';
      case 'error': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  }, []);

  const getStatusBg = useCallback((status: string) => {
    switch (status) {
      case 'completed': return 'bg-success';
      case 'in-progress': return 'bg-primary animate-pulse';
      case 'error': return 'bg-destructive';
      default: return 'bg-muted-foreground';
    }
  }, []);

  // Memoize estimated time calculation
  const estimatedTimeRemaining = useMemo(() => {
    return Math.max(0, Math.ceil((100 - progress) / 10));
  }, [progress]);

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-foreground">Real-Time Agent Monitoring</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Track your AI agent's live progress, review reasoning, and provide guidance when needed.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Progress Overview - Full Width */}
        <div className="xl:col-span-4">
          <Card className="shadow-lg border-card-border">
            <CardHeader className="bg-gradient-surface">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <Activity className="w-6 h-6 text-primary" />
                    <span>Overall Progress</span>
                  </CardTitle>
                  <CardDescription>Finding cheaper home insurance policy with better coverage</CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={toggleMonitoring}
                  >
                    {isRunning ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                    {isRunning ? "Pause" : "Resume"}
                  </Button>
                  <Button variant="ghost" size="sm">
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Restart
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setShowDetails(!showDetails)}
                  >
                    {showDetails ? <Minimize2 className="w-4 h-4 mr-2" /> : <Maximize2 className="w-4 h-4 mr-2" />}
                    {showDetails ? "Hide Details" : "Show Details"}
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">Progress: {progress}% complete</span>
                  <span className="text-muted-foreground">
                    Est. time remaining: {estimatedTimeRemaining} minutes
                  </span>
                </div>
                <Progress value={progress} className="h-3" />
              </div>

              {/* Step Timeline */}
              <div className="flex items-center justify-between">
                {steps.map((step, index) => (
                  <div key={step.id} className="flex items-center">
                    <div className="flex flex-col items-center space-y-2">
                      <div className={`
                        w-12 h-12 rounded-full flex items-center justify-center font-medium text-sm
                        ${step.status === 'completed' ? 'bg-success text-success-foreground' :
                          step.status === 'in-progress' ? 'bg-primary text-primary-foreground animate-pulse-glow' :
                          'bg-muted text-muted-foreground'}
                      `}>
                        {step.status === 'completed' ? (
                          <CheckCircle className="w-6 h-6" />
                        ) : (
                          step.id
                        )}
                      </div>
                      <div className="text-center max-w-32">
                        <div className="text-sm font-medium">{step.name}</div>
                        <div className="text-xs text-muted-foreground mt-1">{step.description}</div>
                        <Badge 
                          variant={step.status === 'completed' ? 'default' : 
                                  step.status === 'in-progress' ? 'secondary' : 'outline'}
                          className="text-xs mt-2"
                        >
                          {step.status}
                        </Badge>
                      </div>
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`w-24 h-0.5 mx-4 ${
                        step.status === 'completed' ? 'bg-success' : 'bg-muted'
                      }`} />
                    )}
                  </div>
                ))}
              </div>

              {/* Metrics Grid - Only render when showDetails is true */}
              {showDetails && (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 pt-4 border-t border-card-border">
                  {metrics.map((metric, index) => (
                    <div key={index} className="text-center space-y-1">
                      <div className="text-2xl font-bold text-foreground">{metric.value}{metric.unit}</div>
                      <div className="text-xs text-muted-foreground">{metric.label}</div>
                      {metric.change && (
                        <div className={`text-xs ${
                          metric.trend === 'up' ? 'text-success' : 
                          metric.trend === 'down' ? 'text-warning' : 'text-muted-foreground'
                        }`}>
                          {metric.change}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Activity Feed - 2 columns */}
        <div className="xl:col-span-2">
          <Card className="shadow-lg border-card-border h-[700px] flex flex-col">
            <CardHeader className="bg-gradient-surface">
              <CardTitle className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-primary" />
                <span>Live Activity Feed</span>
              </CardTitle>
              <CardDescription>Real-time AI actions and discoveries</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto p-0">
              <div className="space-y-1">
                {activityLogs.map((log, index) => (
                  <div 
                    key={log.id} 
                    className={`p-4 border-b border-card-border last:border-b-0 hover:bg-muted/30 transition-colors cursor-pointer ${
                      selectedLog === log.id ? 'bg-primary-light/20 border-l-4 border-l-primary' : ''
                    }`}
                    onClick={() => setSelectedLog(selectedLog === log.id ? null : log.id)}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`w-3 h-3 rounded-full mt-2 flex-shrink-0 ${getStatusBg(log.status)}`} />
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground font-medium">{log.timestamp}</span>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline" className="text-xs">{log.step}</Badge>
                            {log.duration && (
                              <Badge variant="secondary" className="text-xs">{log.duration}</Badge>
                            )}
                            {log.confidence && (
                              <Badge variant="outline" className="text-xs">{log.confidence}%</Badge>
                            )}
                          </div>
                        </div>
                        <p className="text-sm font-medium text-foreground">{log.description}</p>
                        {log.details && (
                          <p className="text-xs text-muted-foreground leading-relaxed">{log.details}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Live indicator */}
                <div className="p-4 flex items-center space-x-2 text-primary">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                  <span className="text-sm font-medium">Live monitoring active...</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Panel - 2 columns */}
        <div className="xl:col-span-2 space-y-6">
          {/* Reasoning Panel */}
          <Card className="shadow-lg border-card-border">
            <CardHeader className="bg-gradient-surface">
              <CardTitle className="flex items-center space-x-2">
                <Brain className="w-5 h-5 text-secondary" />
                <span>AI Reasoning Log</span>
              </CardTitle>
              <CardDescription>Understanding the AI's decision-making process</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {reasoningLog.map((entry) => (
                <div key={entry.id} className="space-y-3 p-4 bg-secondary-light rounded-lg border border-secondary">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground font-medium">{entry.timestamp}</span>
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary" className="text-xs">
                        {entry.category}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {entry.confidence}% confidence
                      </Badge>
                    </div>
                  </div>
                  <p className="text-sm text-foreground leading-relaxed">{entry.reasoning}</p>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-secondary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${entry.confidence}%` }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Action Required Panel - Only render when needed */}
          {needsApproval && (
            <Card className="shadow-lg border-warning animate-pulse-glow">
              <CardHeader className="bg-warning-light">
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="w-5 h-5 text-warning" />
                  <span>Action Required</span>
                </CardTitle>
                <CardDescription>AI needs your approval to proceed</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-foreground">
                  The AI found 3 insurance policies that meet your criteria with 30-45% cost savings. 
                  Please select your preferred option to continue:
                </p>
                
                <div className="space-y-3">
                  <div className="p-4 border border-card-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-sm">Progressive - $780/year</div>
                        <div className="text-xs text-muted-foreground">35% savings, excellent coverage</div>
                      </div>
                      <Badge variant="outline" className="text-xs">Recommended</Badge>
                    </div>
                  </div>
                  <div className="p-4 border border-card-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-sm">Geico - $720/year</div>
                        <div className="text-xs text-muted-foreground">40% savings, good coverage</div>
                      </div>
                      <Badge variant="secondary" className="text-xs">Best Value</Badge>
                    </div>
                  </div>
                  <div className="p-4 border border-card-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-sm">Allstate - $695/year</div>
                        <div className="text-xs text-muted-foreground">42% savings, premium coverage</div>
                      </div>
                      <Badge variant="default" className="text-xs">Top Pick</Badge>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button
                    onClick={() => handleApproval(true)}
                    variant="ai"
                    className="flex-1"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Approve Selection
                  </Button>
                  <Button
                    onClick={() => handleApproval(false)}
                    variant="outline"
                    className="flex-1"
                  >
                    Request Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Performance Metrics */}
          <Card className="shadow-lg border-card-border">
            <CardHeader className="bg-gradient-surface">
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="w-5 h-5 text-success" />
                <span>Performance Metrics</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center space-y-1">
                  <div className="text-2xl font-bold text-success">$425</div>
                  <div className="text-xs text-muted-foreground">Potential Annual Savings</div>
                </div>
                <div className="text-center space-y-1">
                  <div className="text-2xl font-bold text-primary">12</div>
                  <div className="text-xs text-muted-foreground">Providers Analyzed</div>
                </div>
                <div className="text-center space-y-1">
                  <div className="text-2xl font-bold text-secondary">3</div>
                  <div className="text-xs text-muted-foreground">Top Recommendations</div>
                </div>
                <div className="text-center space-y-1">
                  <div className="text-2xl font-bold text-foreground">42%</div>
                  <div className="text-xs text-muted-foreground">Max Savings Found</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="shadow-lg border-card-border">
            <CardHeader className="bg-gradient-surface">
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Eye className="w-4 h-4 mr-2" />
                View Detailed Analysis
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Target className="w-4 h-4 mr-2" />
                Adjust Parameters
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Timer className="w-4 h-4 mr-2" />
                Set Time Limits
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}