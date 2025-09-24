import SubScriptionPlanCard from '@/components/shared/card/subScriptionPlanCard';
import React from 'react'


interface PricingPlan {
  _id: string;
  title: string;
  description: string;
  price: number;
  maxEmployees: number;
  features: string[];
  billingCycle: string;
}

async function getPricingPlans(): Promise<PricingPlan[]> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/subscription-plan`,
      {
        cache: "no-store",
      }
    );
    const data = await response.json();
    return data.success ? data.data : [];
  } catch (error) {
    console.error("Failed to fetch pricing plans:", error);
    return [];
  }
}


export async function MyPlan (){
    const plans = await getPricingPlans();
    console.log('my plan..............',plans)
  return (
    <section>
         <div className="py-16 bg-white ">
              <div className="container mx-auto ">
                <div className="text-center mb-12">
                  <h3 className="text-lg font-semibold font-manrope leading-[120%] text-[#D9AD5E] mb-3">
                    Get more from your swag Platform
                  </h3>
                  <h2 className=" text-[28px] md:text-[40px] font-bold leading-[120%] font-manrope text-center text-[#131313] max-w-[594px] mx-auto mb-4">
                    A Plan for Every Grateful Business
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                  {plans.map((plan, index) => (
                    <SubScriptionPlanCard key={plan._id} {...plan} index={index} />
                  ))}
                </div>
              </div>
            </div>
    </section>
  )
}

