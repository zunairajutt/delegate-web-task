import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
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
  Zap
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Constraint {
  id: string;
  type: string;
  value: string;
}

export default function TaskDelegation() {
  const [goal, setGoal] = useState("");
  const [constraints, setConstraints] = useState<Constraint[]>([]);
  const [newConstraint, setNewConstraint] = useState({ type: "", value: "" });
  const [aiInterpretation, setAiInterpretation] = useState("");
  const [isConfirmed, setIsConfirmed] = useState(false);
  const { toast } = useToast();

  const constraintTypes = [
    { id: "budget", label: "Budget Cap", icon: DollarSign, placeholder: "e.g., Maximum $150/month" },
    { id: "exclusion", label: "Company Exclusion", icon: Building, placeholder: "e.g., Exclude State Farm" },
    { id: "requirement", label: "Feature Requirement", icon: Shield, placeholder: "e.g., Must include fire coverage" },
    { id: "timeline", label: "Timeline", icon: Zap, placeholder: "e.g., Complete within 2 weeks" }
  ];

  const addConstraint = () => {
    if (newConstraint.type && newConstraint.value) {
      setConstraints([...constraints, {
        id: Date.now().toString(),
        type: newConstraint.type,
        value: newConstraint.value
      }]);
      setNewConstraint({ type: "", value: "" });
    }
  };

  const removeConstraint = (id: string) => {
    setConstraints(constraints.filter(c => c.id !== id));
  };

  const generateInterpretation = () => {
    if (goal) {
      setAiInterpretation(
        `I understand you want to ${goal.toLowerCase()}. Based on your constraints, I will:\n\n` +
        `• Search for options that meet your budget requirements\n` +
        `• Exclude any companies you've specified\n` +
        `• Ensure all required features are included\n` +
        `• Present you with 3-5 top recommendations with detailed comparisons\n\n` +
        `I'll need approximately 5-10 minutes to complete this analysis.`
      );
    }
  };

  const handleStartTask = () => {
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
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-foreground">Task Delegation & Goal Setting</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Define your high-level goal, set constraints, and let our AI agent handle the complex work for you.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Goal Definition */}
          <Card className="shadow-lg border-card-border">
            <CardHeader className="bg-gradient-surface">
              <CardTitle className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-primary-foreground">1</span>
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
                  placeholder="Example: Find a cheaper home insurance policy with better coverage than my current one"
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  className="min-h-[100px] resize-none"
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
              </div>
            </CardContent>
          </Card>

          {/* Constraints */}
          <Card className="shadow-lg border-card-border">
            <CardHeader className="bg-gradient-surface">
              <CardTitle className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-primary-foreground">2</span>
                </div>
                <span>Set Constraints</span>
              </CardTitle>
              <CardDescription>
                Add specific requirements, exclusions, and limitations to guide the AI.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Add New Constraint */}
              <div className="flex space-x-2">
                <select
                  value={newConstraint.type}
                  onChange={(e) => setNewConstraint({ ...newConstraint, type: e.target.value })}
                  className="px-3 py-2 border border-input rounded-md bg-background text-sm"
                >
                  <option value="">Select type...</option>
                  {constraintTypes.map(type => (
                    <option key={type.id} value={type.id}>{type.label}</option>
                  ))}
                </select>
                <Input
                  placeholder={constraintTypes.find(t => t.id === newConstraint.type)?.placeholder || "Enter constraint..."}
                  value={newConstraint.value}
                  onChange={(e) => setNewConstraint({ ...newConstraint, value: e.target.value })}
                  className="flex-1"
                />
                <Button onClick={addConstraint} size="sm" variant="outline">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>

              {/* Constraint List */}
              {constraints.length > 0 && (
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Active Constraints</Label>
                  <div className="space-y-2">
                    {constraints.map((constraint) => {
                      const type = constraintTypes.find(t => t.id === constraint.type);
                      const Icon = type?.icon || FileText;
                      return (
                        <div key={constraint.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                          <div className="flex items-center space-x-3">
                            <Icon className="w-4 h-4 text-muted-foreground" />
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

          {/* Document Upload */}
          <Card className="shadow-lg border-card-border">
            <CardHeader className="bg-gradient-surface">
              <CardTitle className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-primary-foreground">3</span>
                </div>
                <span>Supporting Documents</span>
              </CardTitle>
              <CardDescription>
                Upload relevant files to help the AI understand your current situation.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-card-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <div className="space-y-2">
                  <p className="text-sm font-medium">Drop files here or click to upload</p>
                  <p className="text-xs text-muted-foreground">
                    PDF, DOC, XLS, or image files up to 10MB
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI Interpretation & Controls */}
        <div className="space-y-6">
          {/* AI Understanding */}
          <Card className="shadow-lg border-card-border">
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
                  <div className="text-sm text-foreground whitespace-pre-line bg-muted p-4 rounded-lg">
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
                  <CheckCircle className={`w-4 h-4 ${constraints.length > 0 ? 'text-success' : 'text-muted-foreground'}`} />
                  <span className={constraints.length > 0 ? 'text-foreground' : 'text-muted-foreground'}>
                    Constraints added ({constraints.length})
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
                disabled={!goal || !isConfirmed}
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