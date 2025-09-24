import { MyPlan } from '@/components/dashboard/myplan/MyPlan'
import YourCurrentSubScription  from '@/components/dashboard/myplan/YourCurrentSubScription'
import React from 'react'

const page = () => {
  return (
    <div>
        <h2>This is my Plan</h2>
        <YourCurrentSubScription />
        <MyPlan />
    </div>
  )
}

export default page