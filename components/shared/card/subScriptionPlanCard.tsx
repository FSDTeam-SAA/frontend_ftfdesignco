import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import React from "react";

interface PricingPlan {
  _id: string
  title: string
  description: string
  price: number
  maxEmployees: number
  features: string[]
  billingCycle: string
}

interface SubScriptionPlanCardProps extends PricingPlan {
  index: number
}

export default function SubScriptionPlanCard(props: SubScriptionPlanCardProps) {
  const { _id, title, description, price, maxEmployees, features, billingCycle, index } = props;
  return (
    <div>
      <Card
        key={_id}
        className={`relative ${
          index === 1 ? "border-blue-500 shadow-lg scale-105" : ""
        }`}
      >
        {index === 1 && (
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
            <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
              Most Popular
            </span>
          </div>
        )}
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">{title}</CardTitle>
          <p className="text-gray-600">{description}</p>
          <div className="mt-4">
            <span className="text-4xl font-bold">${price}</span>
            <span className="text-gray-500">/{billingCycle}</span>
          </div>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3 mb-6">
            <li className="flex items-center">
              <Check className="h-5 w-5 text-green-500 mr-2" />
              <span>Up to {maxEmployees} employees</span>
            </li>
            {features.map((feature, featureIndex) => (
              <li key={featureIndex} className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
          <Button
            className="w-full"
            variant={index === 1 ? "default" : "outline"}
          >
            Get Started
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

