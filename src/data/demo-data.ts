// Demo data for the AI Task Delegation Dashboard
// This file contains sample data to demonstrate the system's capabilities

export interface DemoTask {
  id: string;
  title: string;
  description: string;
  category: 'insurance' | 'investment' | 'travel' | 'shopping' | 'research';
  complexity: 'simple' | 'moderate' | 'complex';
  estimatedTime: string;
  successRate: number;
}

export interface DemoConstraint {
  id: string;
  type: string;
  label: string;
  icon: string;
  placeholder: string;
  description: string;
}

export const demoTasks: DemoTask[] = [
  {
    id: "insurance-1",
    title: "Find Cheaper Home Insurance",
    description: "Compare home insurance policies to find better coverage at lower cost",
    category: "insurance",
    complexity: "moderate",
    estimatedTime: "10-15 minutes",
    successRate: 95
  },
  {
    id: "investment-1", 
    title: "Optimize Retirement Portfolio",
    description: "Analyze current investments and recommend portfolio improvements",
    category: "investment",
    complexity: "complex",
    estimatedTime: "20-30 minutes",
    successRate: 88
  },
  {
    id: "travel-1",
    title: "Plan Business Trip to Tokyo",
    description: "Find best flights, hotels, and create itinerary for 5-day business trip",
    category: "travel",
    complexity: "moderate",
    estimatedTime: "15-20 minutes",
    successRate: 92
  },
  {
    id: "shopping-1",
    title: "Find Best Laptop for Development",
    description: "Compare laptops based on performance, price, and developer needs",
    category: "shopping",
    complexity: "simple",
    estimatedTime: "8-12 minutes",
    successRate: 97
  },
  {
    id: "research-1",
    title: "Market Analysis for Startup",
    description: "Research competitive landscape and market opportunities",
    category: "research",
    complexity: "complex",
    estimatedTime: "25-35 minutes",
    successRate: 85
  }
];

export const demoConstraints: DemoConstraint[] = [
  {
    id: "budget",
    type: "budget",
    label: "Budget Cap",
    icon: "DollarSign",
    placeholder: "e.g., Maximum $150/month",
    description: "Set spending limits"
  },
  {
    id: "exclusion",
    type: "exclusion", 
    label: "Company Exclusion",
    icon: "Building",
    placeholder: "e.g., Exclude State Farm",
    description: "Avoid specific providers"
  },
  {
    id: "requirement",
    type: "requirement",
    label: "Feature Requirement", 
    icon: "Shield",
    placeholder: "e.g., Must include fire coverage",
    description: "Essential features"
  },
  {
    id: "timeline",
    type: "timeline",
    label: "Timeline",
    icon: "Clock",
    placeholder: "e.g., Complete within 2 weeks",
    description: "Time constraints"
  },
  {
    id: "quality",
    type: "quality",
    label: "Quality Standard",
    icon: "Star",
    placeholder: "e.g., Minimum 4-star rating",
    description: "Quality requirements"
  }
];

export const demoIntegrations = [
  {
    id: "bank",
    name: "Bank Account",
    description: "Connect for payment verification",
    icon: "CreditCard",
    connected: false,
    category: "banking"
  },
  {
    id: "dropbox",
    name: "Dropbox",
    description: "Access your document vault",
    icon: "Cloud",
    connected: false,
    category: "documents"
  },
  {
    id: "google",
    name: "Google Drive",
    description: "Import documents and data",
    icon: "Database",
    connected: false,
    category: "documents"
  },
  {
    id: "quickbooks",
    name: "QuickBooks",
    description: "Financial data integration",
    icon: "DollarSign",
    connected: false,
    category: "banking"
  },
  {
    id: "salesforce",
    name: "Salesforce",
    description: "CRM data access",
    icon: "Building",
    connected: false,
    category: "services"
  }
];

export const demoActivityLogs = [
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
  }
];

export const demoReasoningLog = [
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
  }
];

export const demoRecommendations = [
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
    riskLevel: "low",
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
    riskLevel: "medium",
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
    riskLevel: "medium",
    processingTime: "1-2 business days"
  }
];

export const demoComparisonData = [
  { feature: "Annual Premium", current: "$1,200", recommended: "$695", improvement: "better", impact: "high" },
  { feature: "Monthly Premium", current: "$100", recommended: "$58", improvement: "better", impact: "high" },
  { feature: "Deductible", current: "$500", recommended: "$750", improvement: "worse", impact: "medium" },
  { feature: "Fire Coverage", current: "$50,000", recommended: "$75,000", improvement: "better", impact: "high" },
  { feature: "Flood Protection", current: "Not included", recommended: "Included", improvement: "better", impact: "high" },
  { feature: "Personal Property", current: "$25,000", recommended: "$40,000", improvement: "better", impact: "medium" },
  { feature: "Liability Limit", current: "$100,000", recommended: "$200,000", improvement: "better", impact: "medium" },
  { feature: "Customer Rating", current: "3.8/5", recommended: "4.6/5", improvement: "better", impact: "medium" },
  { feature: "Claims Processing", current: "5-7 days", recommended: "24-48 hours", improvement: "better", impact: "low" },
  { feature: "Policy Flexibility", current: "Standard", recommended: "Enhanced", improvement: "better", impact: "low" }
];

export const demoMetrics = [
  { label: "Providers Analyzed", value: 12, change: "+3", trend: "up", unit: "companies" },
  { label: "Potential Savings", value: 425, change: "+25", trend: "up", unit: "$/year" },
  { label: "Coverage Score", value: 95, change: "+15", trend: "up", unit: "%" },
  { label: "Processing Time", value: "8m 30s", change: "-2m", trend: "down", unit: "" },
  { label: "Confidence Level", value: 92, change: "+3", trend: "up", unit: "%" },
  { label: "Options Found", value: 3, change: "+1", trend: "up", unit: "policies" }
]; 