// import { redirect } from "next/navigation"

// export default function HomePage() {
//   redirect("/dashboard")
// }


import React from 'react'
import MainDashboard from './_components/MainDashboard'

function page() {
  return (
    <div>
        <MainDashboard />
    </div>
  )
}

export default page