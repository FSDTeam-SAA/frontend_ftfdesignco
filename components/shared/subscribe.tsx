"use client";

import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "sonner";

function Subscribe() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  interface SubscribeResponse {
    message?: string;
    key: string;
  }

  const handleSubscribe = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response: Response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/newsletter/subscribe`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      if (response.ok) {
        toast.success("Successfully subscribed!");
        setEmail("");
      } else {
        const errorData: SubscribeResponse = await response.json();
        toast.error(
          errorData.message || "Subscription failed. Please try again."
        );
      }
    } catch (error) {
      console.error("Error subscribing to newsletter:", error);
      toast.error("Subscription failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="">
      <form onSubmit={handleSubscribe} className="flex border justify-between rounded-xl border-white/50">
        <Input
          type="email"
          placeholder="Enter Your Email..."
          className="bg-gratisswag-blue px-4 py-2 text-white placeholder:text-white rounded-l-xl outline-none border-none "
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Button
          type="submit"
          className="rounded-md bg-[#D9AD5E] px-6 py-2 text-white rounded-r-xl hover:bg-[#f5b641]"
          disabled={isLoading}
        >
          {isLoading ? "Subscribing..." : "Subscribe"}
        </Button>
      </form>
    </div>
  );
}

export default Subscribe;
