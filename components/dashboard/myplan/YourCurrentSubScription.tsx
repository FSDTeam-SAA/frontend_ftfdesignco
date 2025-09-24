"use client";

import React, { useEffect, useState } from "react";
import CheckoutForm from "@/components/SubScripCheckoutForm";
// import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useSession } from "next-auth/react";

interface PricingPlan {
  _id: string;
  title: string;
  description: string;
  price: number;
  maxEmployees: number;
  features: string[];
  billingCycle: string;
}

export default function YourCurrentSubscription() {
  const [plan, setPlan] = useState<PricingPlan | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const session = useSession();
  const userId = session.data?.user?._id;
  const token = session.data?.accessToken || "";

  useEffect(() => {
    async function fetchPlan() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/subscription-plan/my-subscription`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        // Corrected: extract planId from the API response
        setPlan(data.success ? data.data.planId : null);
      } catch (error) {
        console.error("Failed to fetch the subscription plan:", error);
      }
    }
    if (token) fetchPlan();
  }, [token]);

//   const handleGetStarted = () => {
//     if (!userId) {
//       console.error("User ID is missing. Please log in.");
//       return;
//     }
//     setIsModalOpen(true);
//   };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  if (!plan) return <p>Loading your subscription...</p>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl text-center py-2 font-bold">Your Current Subscription</h2>
      <Card className="relative border-blue-500 max-w-2xl mx-auto shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl border-b-2 pb-2 inline-block w-full">
            {plan.title}
          </CardTitle>
          <p className="text-gray-600">{plan.description}</p>
          <div className="mt-4">
            <span className="text-4xl font-bold">${plan.price}</span>
            <span className="text-gray-500">/{plan.billingCycle}</span>
          </div>
        </CardHeader>
        <CardContent>
          <p className="bg-[#EEF2FF] text-[#4338CA] text-[16px] my-6 font-medium leading-[150%] uppercase p-2 rounded-md">
            This plan includes
          </p>
          <ul className="space-y-3 mb-6 ml-6 list-disc">
            <li>Up to {plan.maxEmployees} employees</li>
            {plan.features.map((feature, i) => (
              <li key={i}>{feature}</li>
            ))}
          </ul>

          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              {/* <Button
                onClick={handleGetStarted}
                disabled={!userId || session.status === "loading"}
                className="w-full bg-[#28A745] text-white hover:text-black rounded-xl"
              >
                Get Started
              </Button> */}
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg max-h-[800px] overflow-y-auto bg-white">
              <DialogHeader>
                <DialogTitle className="text-center">
                  Complete Your {plan.title} Subscription
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-lg">{plan.title}</h3>
                  <p className="text-2xl font-bold text-blue-600">
                    ${plan.price}
                    <span className="text-sm font-normal text-gray-500">
                      /{plan.billingCycle}
                    </span>
                  </p>
                </div>
                {userId && (
                  <CheckoutForm
                    userId={userId}
                    planId={plan._id}
                    amount={plan.price}
                    onSuccess={handleModalClose}
                    onCancel={handleModalClose}
                    type="subscription"
                  />
                )}
              </div>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </div>
  );
}
