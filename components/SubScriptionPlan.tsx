
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
    const response = await fetch("http://localhost:5001/api/v1/subscription-plan", {
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
          <h2 className="text-3xl font-bold mb-4">Free To Get Started, Perks For When You Want More</h2>
          <p className="text-gray-600">Choose the perfect plan for your business needs</p>
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
