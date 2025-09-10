

import SubScriptionPlanCard from "./shared/card/subScriptionPlanCard"

interface PricingPlan {
  _id: string
  title: string
  description: string
  price: number
  maxEmployees: number
  features: string[]
  billingCycle: string
}

async function getPricingPlans(): Promise<PricingPlan[]> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/subscription-plan`, {
      cache: "no-store",
    })
    const data = await response.json()
    return data.success ? data.data : []
  } catch (error) {
    console.error("Failed to fetch pricing plans:", error)
    return []
  }
}

export async function SubScriptionPlan() {
  const plans = await getPricingPlans()

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h3 className="text-lg font-semibold text-[#D9AD5E] mb-3">Get more from your swag Platform</h3>
          <h2 className=" text-[28px] md:text-[40px] font-bold text-[#131313] max-w-[594px] mx-auto mb-4">A Plan for Every Grateful Business</h2>
         
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <SubScriptionPlanCard key={plan._id} {...plan} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
