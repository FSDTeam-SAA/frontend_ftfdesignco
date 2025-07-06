"use client";

import CheckoutForm from "@/components/SubScripCheckoutForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import { useSession } from "next-auth/react";
import React, { useState } from "react";

interface PricingPlan {
  _id: string;
  title: string;
  description: string;
  price: number;
  maxEmployees: number;
  features: string[];
  billingCycle: string;
}

interface SubScriptionPlanCardProps extends PricingPlan {
  index: number;
}

export default function SubScriptionPlanCard(props: SubScriptionPlanCardProps) {
  const {
    _id,
    title,
    description,
    price,
    maxEmployees,
    features,
    billingCycle,
    index,
  } = props;
  const [showCheckout, setShowCheckout] = useState(false);
  const session = useSession();
  const userId = session.data?.user?._id;

  const handleGetStarted = () => {
    if (!userId) {
      console.error("User ID is missing. Please log in.");
      return;
    }
    setShowCheckout(true);
  };

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
            onClick={handleGetStarted}
            disabled={!userId || session.status === "loading"}
          >
            Get Started
          </Button>
        </CardContent>
      </Card>
      {showCheckout && userId && (
        <div className="p-8">
          <CheckoutForm userId={userId} planId={_id} amount={price} />
        </div>
      )}
    </div>
  );
}
