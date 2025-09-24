"use client";

import CheckoutForm from "@/components/SubScripCheckoutForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
// import { Check } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";

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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const session = useSession();
  const userId = session.data?.user?._id;

  const handleGetStarted = () => {
    if (!userId) {
      console.error("User ID is missing. Please log in.");
      return;
    }
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };
  // console.log("propssss", props);
  return (
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
        <CardTitle className="text-2xl border-b-2 pb-2 inline-block  w-full">
          {title}
        </CardTitle>
        <p className="text-gray-600">{description}</p>
        <div className="mt-4">
          <span className="text-4xl font-bold">${price}</span>
          <span className="text-gray-500">/{billingCycle}</span>
        </div>
      </CardHeader>

      <CardContent>
        <p className="bg-[#EEF2FF]  text-[#4338CA] text-[16px] my-6 font-medium leading-[150%] uppercase p-2 rounded-md">
          This plan includes
        </p>
        <ul className="space-y-3 mb-6 ml-6 list-disc">
          <li>
            <div className="flex items-center">
              <span>Up to {maxEmployees} employees</span>
            </div>
          </li>
          {features.map((feature, featureIndex) => (
            <li key={featureIndex}>
              <div className="flex items-center">
                <span>{feature}</span>
              </div>
            </li>
          ))}
        </ul>

        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button
              variant={index === 1 ? "default" : "outline"}
              onClick={handleGetStarted}
              disabled={!userId || session.status === "loading"}
              className="w-full bg-[#28A745] text-white hover:text-black rounded-xl"
            >
              Get Started
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-lg max-h-[800px] overflow-y-auto bg-white">
            <DialogHeader>
              <DialogTitle className="text-center">
                Complete Your {title} Subscription
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-lg">{title}</h3>
                <p className="text-2xl font-bold text-blue-600">
                  ${price}
                  <span className="text-sm font-normal text-gray-500">
                    /{billingCycle}
                  </span>
                </p>
              </div>

              {userId && (
                <CheckoutForm
                  userId={userId}
                  planId={_id}
                  amount={price}
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
  );
}
