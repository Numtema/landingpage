
export interface PricingPlan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  buttonLabel: string;
  isPopular?: boolean;
  color: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}
