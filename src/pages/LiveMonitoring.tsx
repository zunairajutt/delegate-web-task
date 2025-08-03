import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
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
  RotateCcw
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ActivityLog {
  id: string;
  timestamp: string;
  step: string;
  status: 'completed' | 'in-progress' | 'pending';
  description: string;
  details?: string;
}

interface ReasoningEntry {
  id: string;
  timestamp: string;
  reasoning: string;
  confidence: number;
}

export default function LiveMonitoring() {
  const [progress, setProgress] = useState(35);
  const [currentStep, setCurrentStep] = useState(2);
  const [isRunning, setIsRunning] = useState(true);
  const [needsApproval, setNeedsApproval] = useState(false);
  const { toast } = useToast();

  const steps = [
    { id: 1, name: "Initial Analysis", status: "completed" },
    { id: 2, name: "Data Collection", status: "in-progress" },
    { id: 3, name: "Option Evaluation", status: "pending" },
    { id: 4, name: "Final Recommendations", status: "pending" }
  ];

  const activityLogs: ActivityLog[] = [
    {
      id: "1",
      timestamp: "2:03 PM",
      step: "Step 1/4: Initial Analysis",
      status: "completed",
      description: "Analyzed current insurance policy",
      details: "Extracted coverage details, premium costs, and policy terms from uploaded document"
    },
    {
      id: "2", 
      timestamp: "2:05 PM",
      step: "Step 2/4: Data Collection",
      status: "completed",
      description: "Identified 47 potential insurance providers",
      details: "Filtered by geographic availability and coverage requirements"
    },
    {
      id: "3",
      timestamp: "2:07 PM",
      step: "Step 2/4: Data Collection", 
      status: "in-progress",
      description: "Gathering quotes from top 12 providers...",
      details: "Requesting personalized quotes based on your profile and requirements"
    },
    {
      id: "4",
      timestamp: "2:08 PM",
      step: "Step 2/4: Data Collection",
      status: "pending",
      description: "Validating coverage options",
    }
  ];

  const reasoningLog: ReasoningEntry[] = [
    {
      id: "1",
      timestamp: "2:03 PM",
      reasoning: "Your current policy shows $1,200 annual premium with basic coverage. Market analysis suggests 25-40% savings possible with comparable coverage.",
      confidence: 95
    },
    {
      id: "2",
      timestamp: "2:05 PM", 
      reasoning: "Excluded State Farm per your request. Prioritizing providers with excellent customer service ratings (>4.5/5) and fire coverage inclusion.",
      confidence: 88
    },
    {
      id: "3",
      timestamp: "2:07 PM",
      reasoning: "Found 3 providers offering 30%+ savings with equivalent coverage. Verifying policy terms and hidden fees before final evaluation.",
      confidence: 92
    }
  ];

  useEffect(() => {
    // Simulate progress updates
    const interval = setInterval(() => {
      if (isRunning && progress < 75) {
        setProgress(prev => prev + 1);
      }
      
      // Simulate approval needed at 60%
      if (progress === 60 && !needsApproval) {
        setNeedsApproval(true);
        setIsRunning(false);
        toast({
          title: "Approval Required",
          description: "AI found multiple options and needs your input to proceed.",
          variant: "default"
        });
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [isRunning, progress, needsApproval]);

  const handleApproval = (approved: boolean) => {
    setNeedsApproval(false);
    if (approved) {
      setIsRunning(true);
      toast({
        title: "Processing Continued",
        description: "AI agent is proceeding with your approved selection.",
      });
    }
  };

  const toggleMonitoring = () => {
    setIsRunning(!isRunning);
    toast({
      title: isRunning ? "Monitoring Paused" : "Monitoring Resumed", 
      description: isRunning ? "AI processing has been paused." : "AI processing has resumed.",
    });
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-foreground">Real-Time Agent Monitoring</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Track your AI agent's live progress, review reasoning, and provide guidance when needed.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Progress Overview */}
        <div className="lg:col-span-4">
          <Card className="shadow-lg border-card-border">
            <CardHeader className="bg-gradient-surface">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <Activity className="w-6 h-6 text-primary" />
                    <span>Overall Progress</span>
                  </CardTitle>
                  <CardDescription>Finding cheaper home insurance policy</CardDescription>
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
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">Progress: {progress}% complete</span>
                  <span className="text-muted-foreground">
                    Est. time remaining: {Math.max(0, Math.ceil((100 - progress) / 10))} minutes
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
                        w-10 h-10 rounded-full flex items-center justify-center font-medium text-sm
                        ${step.status === 'completed' ? 'bg-success text-success-foreground' :
                          step.status === 'in-progress' ? 'bg-primary text-primary-foreground animate-pulse-glow' :
                          'bg-muted text-muted-foreground'}
                      `}>
                        {step.status === 'completed' ? (
                          <CheckCircle className="w-5 h-5" />
                        ) : (
                          step.id
                        )}
                      </div>
                      <div className="text-center">
                        <div className="text-xs font-medium">{step.name}</div>
                        <Badge 
                          variant={step.status === 'completed' ? 'default' : 
                                  step.status === 'in-progress' ? 'secondary' : 'outline'}
                          className="text-xs mt-1"
                        >
                          {step.status}
                        </Badge>
                      </div>
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`w-20 h-0.5 mx-4 ${
                        step.status === 'completed' ? 'bg-success' : 'bg-muted'
                      }`} />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Activity Feed */}
        <div className="lg:col-span-2">
          <Card className="shadow-lg border-card-border h-[600px] flex flex-col">
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
                  <div key={log.id} className="p-4 border-b border-card-border last:border-b-0 hover:bg-muted/30 transition-colors">
                    <div className="flex items-start space-x-3">
                      <div className={`
                        w-2 h-2 rounded-full mt-2 flex-shrink-0
                        ${log.status === 'completed' ? 'bg-success' :
                          log.status === 'in-progress' ? 'bg-primary animate-pulse' :
                          'bg-muted-foreground'}
                      `} />
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground font-medium">{log.timestamp}</span>
                          <Badge variant="outline" className="text-xs">{log.step}</Badge>
                        </div>
                        <p className="text-sm font-medium text-foreground">{log.description}</p>
                        {log.details && (
                          <p className="text-xs text-muted-foreground">{log.details}</p>
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

        {/* Reasoning Panel */}
        <div className="lg:col-span-2 space-y-6">
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
                <div key={entry.id} className="space-y-2 p-3 bg-secondary-light rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground font-medium">{entry.timestamp}</span>
                    <Badge variant="secondary" className="text-xs">
                      {entry.confidence}% confidence
                    </Badge>
                  </div>
                  <p className="text-sm text-foreground">{entry.reasoning}</p>
                  <div className="w-full bg-muted rounded-full h-1.5">
                    <div 
                      className="bg-secondary h-1.5 rounded-full transition-all duration-300"
                      style={{ width: `${entry.confidence}%` }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Action Required Panel */}
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
                
                <div className="space-y-2">
                  <div className="p-3 border border-card-border rounded-lg cursor-pointer hover:bg-muted/50">
                    <div className="font-medium text-sm">Progressive - $780/year</div>
                    <div className="text-xs text-muted-foreground">35% savings, excellent coverage</div>
                  </div>
                  <div className="p-3 border border-card-border rounded-lg cursor-pointer hover:bg-muted/50">
                    <div className="font-medium text-sm">Geico - $720/year</div>
                    <div className="text-xs text-muted-foreground">40% savings, good coverage</div>
                  </div>
                  <div className="p-3 border border-card-border rounded-lg cursor-pointer hover:bg-muted/50">
                    <div className="font-medium text-sm">Allstate - $695/year</div>
                    <div className="text-xs text-muted-foreground">42% savings, premium coverage</div>
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

          {/* Stats Panel */}
          <Card className="shadow-lg border-card-border">
            <CardHeader className="bg-gradient-surface">
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-success" />
                <span>Current Findings</span>
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
        </div>
      </div>
    </div>
  );
}