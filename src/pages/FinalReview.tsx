import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  CheckCircle, 
  Download, 
  TrendingDown, 
  Shield, 
  DollarSign, 
  FileText, 
  Star,
  AlertCircle,
  ArrowRight,
  RefreshCw,
  X,
  BarChart3,
  PieChart,
  Target,
  Timer,
  Eye,
  EyeOff,
  Maximize2,
  Minimize2,
  ThumbsUp,
  ThumbsDown,
  Share2,
  Printer
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PolicyComparison {
  feature: string;
  current: string;
  recommended: string;
  improvement: 'better' | 'same' | 'worse';
  impact: 'high' | 'medium' | 'low';
}

interface Recommendation {
  id: string;
  provider: string;
  annualPremium: number;
  monthlySavings: number;
  rating: number;
  coverageScore: number;
  recommended: boolean;
  features: string[];
  pros: string[];
  cons: string[];
  aiReasoning: string[];
  riskLevel: 'low' | 'medium' | 'high';
  processingTime: string;
}

export default function FinalReview() {
  const [selectedRecommendation, setSelectedRecommendation] = useState("allstate");
  const [showAlternatives, setShowAlternatives] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [decisionMade, setDecisionMade] = useState(false);
  const { toast } = useToast();

  const recommendations: Recommendation[] = [
    {
      id: "allstate",
      provider: "Allstate",
      annualPremium: 695,
      monthlySavings: 42,
      rating: 4.6,
      coverageScore: 95,
      recommended: true,
      features: ["Fire Coverage", "Flood Protection", "Personal Property", "Liability Coverage", "24/7 Claims Support"],
      pros: ["Highest coverage score", "Excellent customer service", "24/7 claims support", "No hidden fees"],
      cons: ["Slightly higher deductible", "Premium pricing"],
      aiReasoning: [
        "Allstate offers the best balance of coverage and cost savings with 42% annual savings ($505 reduction)",
        "Enhanced fire and flood coverage significantly exceeds your current policy limits",
        "4.6/5 customer rating and 24/7 claims support provide superior service experience",
        "All your specified requirements (fire coverage, State Farm exclusion) are met",
        "Policy terms include no hidden fees and straightforward cancellation policy"
      ],
      riskLevel: 'low',
      processingTime: "2-3 business days"
    },
    {
      id: "progressive",
      provider: "Progressive",
      annualPremium: 780,
      monthlySavings: 35,
      rating: 4.3,
      coverageScore: 88,
      recommended: false,
      features: ["Fire Coverage", "Personal Property", "Liability Coverage", "Online Management"],
      pros: ["Lower deductible", "Easy online management", "Good mobile app", "Fast claims processing"],
      cons: ["No flood protection included", "Limited coverage options"],
      aiReasoning: [
        "Progressive offers competitive pricing with 35% savings",
        "Excellent digital experience and mobile app functionality",
        "Lower deductible provides immediate cost relief",
        "Limited coverage compared to recommended option"
      ],
      riskLevel: 'medium',
      processingTime: "1-2 business days"
    },
    {
      id: "geico",
      provider: "Geico",
      annualPremium: 720,
      monthlySavings: 40,
      rating: 4.1,
      coverageScore: 82,
      recommended: false,
      features: ["Fire Coverage", "Personal Property", "Basic Liability", "Multi-policy Discounts"],
      pros: ["Competitive pricing", "Fast claim processing", "Multi-policy discounts available"],
      cons: ["Limited coverage options", "Basic customer support", "Lower coverage score"],
      aiReasoning: [
        "Geico provides the highest cost savings at 40%",
        "Fast claims processing and competitive pricing",
        "Lower coverage score may not meet all requirements",
        "Basic customer support compared to competitors"
      ],
      riskLevel: 'medium',
      processingTime: "1-2 business days"
    }
  ];

  const comparisonData: PolicyComparison[] = [
    { feature: "Annual Premium", current: "$1,200", recommended: "$695", improvement: 'better', impact: 'high' },
    { feature: "Monthly Premium", current: "$100", recommended: "$58", improvement: 'better', impact: 'high' },
    { feature: "Deductible", current: "$500", recommended: "$750", improvement: 'worse', impact: 'medium' },
    { feature: "Fire Coverage", current: "$50,000", recommended: "$75,000", improvement: 'better', impact: 'high' },
    { feature: "Flood Protection", current: "Not included", recommended: "Included", improvement: 'better', impact: 'high' },
    { feature: "Personal Property", current: "$25,000", recommended: "$40,000", improvement: 'better', impact: 'medium' },
    { feature: "Liability Limit", current: "$100,000", recommended: "$200,000", improvement: 'better', impact: 'medium' },
    { feature: "Customer Rating", current: "3.8/5", recommended: "4.6/5", improvement: 'better', impact: 'medium' },
    { feature: "Claims Processing", current: "5-7 days", recommended: "24-48 hours", improvement: 'better', impact: 'low' },
    { feature: "Policy Flexibility", current: "Standard", recommended: "Enhanced", improvement: 'better', impact: 'low' }
  ];

  const selectedPolicy = recommendations.find(r => r.id === selectedRecommendation);

  const handleApprove = () => {
    setDecisionMade(true);
    toast({
      title: "Policy Approved!",
      description: `Processing your ${selectedPolicy?.provider} policy application. You'll receive confirmation shortly.`,
    });
  };

  const handleExport = () => {
    toast({
      title: "Report Downloaded",
      description: "Comprehensive analysis report has been saved to your downloads.",
    });
  };

  const handleExploreAlternatives = () => {
    setShowAlternatives(true);
    toast({
      title: "Exploring Alternatives",
      description: "AI is searching for additional options based on your feedback.",
    });
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-success';
      case 'medium': return 'text-warning';
      case 'low': return 'text-muted-foreground';
      default: return 'text-foreground';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-success';
      case 'medium': return 'text-warning';
      case 'high': return 'text-destructive';
      default: return 'text-foreground';
    }
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-foreground">Final Review & Decision</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Review AI recommendations, compare options, and make your final decision with confidence.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        {/* Main Content - 3 columns */}
        <div className="xl:col-span-3 space-y-6">
          {/* Recommendation Summary */}
          <Card className="shadow-lg border-success border-2">
            <CardHeader className="bg-success-light">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <CheckCircle className="w-6 h-6 text-success" />
                    <span>AI Recommendation: {selectedPolicy?.provider}</span>
                  </CardTitle>
                  <CardDescription>Best match for your requirements and budget</CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary" className="bg-success text-success-foreground">
                    Recommended
                  </Badge>
                  <Badge variant="outline" className={`${getRiskColor(selectedPolicy?.riskLevel || 'low')}`}>
                    {selectedPolicy?.riskLevel} Risk
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Key Metrics */}
              <div className="grid grid-cols-4 gap-6">
                <div className="text-center space-y-2">
                  <div className="text-3xl font-bold text-success">${selectedPolicy?.annualPremium}</div>
                  <div className="text-sm text-muted-foreground">Annual Premium</div>
                  <Badge variant="outline" className="text-xs">
                    <TrendingDown className="w-3 h-3 mr-1" />
                    ${1200 - (selectedPolicy?.annualPremium || 0)} saved
                  </Badge>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-3xl font-bold text-primary">{selectedPolicy?.monthlySavings}%</div>
                  <div className="text-sm text-muted-foreground">Monthly Savings</div>
                  <Badge variant="outline" className="text-xs">
                    <DollarSign className="w-3 h-3 mr-1" />
                    $42/month less
                  </Badge>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-3xl font-bold text-secondary">{selectedPolicy?.rating}/5</div>
                  <div className="text-sm text-muted-foreground">Customer Rating</div>
                  <div className="flex justify-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-3 h-3 ${i < Math.floor(selectedPolicy?.rating || 0) ? 'text-warning fill-current' : 'text-muted'}`} />
                    ))}
                  </div>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-3xl font-bold text-foreground">{selectedPolicy?.coverageScore}%</div>
                  <div className="text-sm text-muted-foreground">Coverage Score</div>
                  <Badge variant="outline" className="text-xs">
                    <Shield className="w-3 h-3 mr-1" />
                    Excellent
                  </Badge>
                </div>
              </div>

              <Separator />

              {/* Policy Features */}
              <div className="space-y-4">
                <h4 className="font-semibold text-foreground">Coverage Features</h4>
                <div className="grid grid-cols-2 gap-4">
                  {selectedPolicy?.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-success" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pros & Cons */}
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h5 className="font-medium text-success">Advantages</h5>
                  <ul className="space-y-1">
                    {selectedPolicy?.pros.map((pro, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <CheckCircle className="w-3 h-3 text-success mt-0.5 flex-shrink-0" />
                        <span className="text-xs text-foreground">{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-2">
                  <h5 className="font-medium text-warning">Considerations</h5>
                  <ul className="space-y-1">
                    {selectedPolicy?.cons.map((con, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <AlertCircle className="w-3 h-3 text-warning mt-0.5 flex-shrink-0" />
                        <span className="text-xs text-foreground">{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Detailed Comparison */}
          <Card className="shadow-lg border-card-border">
            <CardHeader className="bg-gradient-surface">
              <CardTitle>Detailed Comparison</CardTitle>
              <CardDescription>Current policy vs. recommended policy breakdown</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="comparison" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="comparison">Side-by-Side</TabsTrigger>
                  <TabsTrigger value="reasoning">AI Reasoning</TabsTrigger>
                  <TabsTrigger value="impact">Impact Analysis</TabsTrigger>
                </TabsList>
                
                <TabsContent value="comparison" className="space-y-4">
                  <div className="space-y-3">
                    {comparisonData.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="font-medium text-sm text-foreground">{item.feature}</div>
                          <Badge variant="outline" className={`text-xs ${getImpactColor(item.impact)}`}>
                            {item.impact} impact
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-center">
                            <div className="text-xs text-muted-foreground">Current</div>
                            <div className="text-sm font-medium">{item.current}</div>
                          </div>
                          <ArrowRight className="w-4 h-4 text-muted-foreground" />
                          <div className="text-center">
                            <div className="text-xs text-muted-foreground">Recommended</div>
                            <div className={`text-sm font-medium ${
                              item.improvement === 'better' ? 'text-success' :
                              item.improvement === 'worse' ? 'text-warning' : 'text-foreground'
                            }`}>
                              {item.recommended}
                            </div>
                          </div>
                          <div className="w-6 h-6 flex items-center justify-center">
                            {item.improvement === 'better' && <CheckCircle className="w-4 h-4 text-success" />}
                            {item.improvement === 'worse' && <AlertCircle className="w-4 h-4 text-warning" />}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="reasoning" className="space-y-4">
                  <div className="space-y-3">
                    {selectedPolicy?.aiReasoning.map((reason, index) => (
                      <div key={index} className="flex items-start space-x-3 p-4 bg-secondary-light rounded-lg">
                        <div className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center text-xs font-bold text-secondary-foreground flex-shrink-0">
                          {index + 1}
                        </div>
                        <p className="text-sm text-foreground">{reason}</p>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="impact" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-success-light rounded-lg">
                      <div className="text-2xl font-bold text-success">$505</div>
                      <div className="text-sm text-muted-foreground">Annual Savings</div>
                    </div>
                    <div className="text-center p-4 bg-primary-light rounded-lg">
                      <div className="text-2xl font-bold text-primary">+23%</div>
                      <div className="text-sm text-muted-foreground">Coverage Improvement</div>
                    </div>
                    <div className="text-center p-4 bg-secondary-light rounded-lg">
                      <div className="text-2xl font-bold text-secondary">+0.8★</div>
                      <div className="text-sm text-muted-foreground">Service Rating</div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Alternative Options */}
          {showAlternatives && (
            <Card className="shadow-lg border-card-border">
              <CardHeader className="bg-gradient-surface">
                <CardTitle>Alternative Options</CardTitle>
                <CardDescription>Other policies that meet your criteria</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recommendations.filter(r => !r.recommended).map((policy) => (
                  <div 
                    key={policy.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                      selectedRecommendation === policy.id ? 'border-primary bg-primary-light' : 'border-card-border'
                    }`}
                    onClick={() => setSelectedRecommendation(policy.id)}
                  >
                    <div className="flex justify-between items-start">
                      <div className="space-y-2">
                        <div className="font-semibold text-foreground">{policy.provider}</div>
                        <div className="text-sm text-muted-foreground">
                          ${policy.annualPremium}/year • {policy.monthlySavings}% savings • {policy.rating}/5 rating
                        </div>
                        <div className="flex space-x-2">
                          {policy.features.slice(0, 2).map((feature, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">{feature}</Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className={`text-xs ${getRiskColor(policy.riskLevel)}`}>
                          {policy.riskLevel} Risk
                        </Badge>
                        <Button
                          variant={selectedRecommendation === policy.id ? "default" : "outline"}
                          size="sm"
                        >
                          {selectedRecommendation === policy.id ? "Selected" : "Select"}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Action Panel - 1 column */}
        <div className="space-y-6">
          {/* Decision Panel */}
          <Card className="shadow-lg border-card-border">
            <CardHeader className="bg-gradient-surface">
              <CardTitle>Make Your Decision</CardTitle>
              <CardDescription>Ready to proceed with this recommendation?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <Button
                  onClick={handleApprove}
                  variant="ai"
                  size="lg"
                  className="w-full"
                  disabled={decisionMade}
                >
                  <CheckCircle className="w-5 h-5 mr-2" />
                  {decisionMade ? "Decision Made" : "Approve & Finalize"}
                </Button>
                
                <Button
                  onClick={handleExploreAlternatives}
                  variant="outline"
                  className="w-full"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Explore Alternatives
                </Button>
                
                <Button
                  variant="ghost"
                  className="w-full text-destructive hover:text-destructive"
                >
                  <X className="w-4 h-4 mr-2" />
                  Reject & Start Over
                </Button>
              </div>

              <Separator />

              <div className="space-y-2">
                <Button
                  onClick={handleExport}
                  variant="minimal"
                  className="w-full"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Full Report
                </Button>
                <Button
                  variant="minimal"
                  className="w-full"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Analysis
                </Button>
                <Button
                  variant="minimal"
                  className="w-full"
                >
                  <Printer className="w-4 h-4 mr-2" />
                  Print Summary
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Summary Stats */}
          <Card className="shadow-lg border-card-border">
            <CardHeader className="bg-gradient-surface">
              <CardTitle>Impact Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Annual Savings</span>
                  <span className="text-lg font-bold text-success">$505</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Coverage Improvement</span>
                  <span className="text-lg font-bold text-primary">+23%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Service Rating</span>
                  <span className="text-lg font-bold text-secondary">+0.8★</span>
                </div>
                
                <Separator />
                
                <div className="text-center space-y-2">
                  <div className="text-2xl font-bold text-success">42%</div>
                  <div className="text-xs text-muted-foreground">Total Cost Reduction</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card className="shadow-lg border-card-border">
            <CardHeader className="bg-gradient-surface">
              <CardTitle className="flex items-center space-x-2">
                <FileText className="w-5 h-5 text-primary" />
                <span>Next Steps</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex items-start space-x-2">
                  <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center text-xs font-bold text-primary-foreground">1</div>
                  <span className="text-foreground">Policy application submitted automatically</span>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-5 h-5 bg-muted rounded-full flex items-center justify-center text-xs font-bold text-muted-foreground">2</div>
                  <span className="text-muted-foreground">Receive confirmation within 24 hours</span>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-5 h-5 bg-muted rounded-full flex items-center justify-center text-xs font-bold text-muted-foreground">3</div>
                  <span className="text-muted-foreground">Current policy cancellation scheduled</span>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-5 h-5 bg-muted rounded-full flex items-center justify-center text-xs font-bold text-muted-foreground">4</div>
                  <span className="text-muted-foreground">New coverage begins seamlessly</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}