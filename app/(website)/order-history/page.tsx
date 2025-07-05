// "use client"

// import { useState } from "react"
// import { Card } from "@/components/ui/card"
// import { PaginationComponent } from "@/components/shared/pagination-component"


// // Dummy data for the orders table
// const orders = [
//   { id: 1, productName: "Adidas-8105", coins: 130.0, date: "Feb 10, 2025", status: "Processing" },
//   { id: 2, productName: "Adidas-8105", coins: 150.0, date: "Feb 10, 2025", status: "Delivered" },
//   { id: 3, productName: "Adidas-8105", coins: 130.0, date: "Feb 10, 2025", status: "Delivered" },
//   { id: 4, productName: "Adidas-8105", coins: 130.0, date: "Feb 10, 2025", status: "Delivered" },
//   { id: 5, productName: "Adidas-8105", coins: 130.0, date: "Feb 10, 2025", status: "Delivered" },
//   { id: 6, productName: "Adidas-8105", coins: 130.0, date: "Feb 10, 2025", status: "Delivered" },
//   { id: 7, productName: "Adidas-8105", coins: 150.0, date: "Feb 10, 2025", status: "Delivered" },
//   { id: 8, productName: "Adidas-8105", coins: 200.0, date: "Feb 10, 2025", status: "Delivered" },
// ]

// export default function OrdersPage() {
//   const [currentPage, setCurrentPage] = useState(2) // Set initial page to 2 as per image
//   const totalPages = 10 // As per the image, showing 10 pages

//   const handlePageChange = (page: number) => {
//     if (page >= 1 && page <= totalPages) {
//       setCurrentPage(page)
//       // In a real application, you would fetch data for the new page here
//     }
//   }

//   return (
//     <div className="flex flex-col items-center justify-center py-4">
//       <h1 className="text-3xl font-bold mb-8">Orders</h1>
//       <Card className="container  rounded-xl overflow-hidden border border-[#3F3F3F] pt-4">
//         <div className="overflow-x-auto">
//           <table className="w-full text-left table-auto border border-[#3F3F3F] ">
//             <thead className=" border-b  border-[#3F3F3F]">
//               <tr className="text-[18px] text-[#131313] fjont-midium">
//                 <th className="px-4 py-3  tracking-wider">Product Name</th>
//                 <th className="px-4 py-3  tracking-wider">Coins</th>
//                 <th className="px-4 py-3  tracking-wider">Date</th>
//                 <th className="px-4 py-3  tracking-wider">Status</th>
//                 <th className="px-4 py-3  tracking-wider">Action</th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {orders.map((order) => (
//                 <tr className="text-[16px] text-[#0F0F0F] fjont-midium " key={order.id}>
//                   <td className="px-4 py-4 whitespace-nowrap">{order.productName}</td>
//                   <td className="px-4 py-4 whitespace-nowrap ">{order.coins.toFixed(2)}</td>
//                   <td className="px-4 py-4 whitespace-nowrap">{order.date}</td>
//                   <td className="px-4 py-4 whitespace-nowrap ">
//                     <span
//                       className={`px-2 py-1 rounded-full text-xs font-medium ${
//                         order.status === "Processing" ? "bg-orange-100 text-orange-800" : "bg-green-100 text-green-800"
//                       }`}
//                     >
//                       {order.status}
//                     </span>
//                   </td>
//                   <td className="px-4 py-4 whitespace-nowrap text-sm">
//                     <a href="#" className="text-blue-600 hover:underline">
//                       View Details
//                     </a>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//         <div className="flex flex-col sm:flex-row items-center justify-between p-4 border-t ">
//           <div className="text-sm text-gray-500">
//             Showing {currentPage} of {totalPages} results
//           </div>
//           <div>
//           <PaginationComponent currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
//           </div>
//         </div>
//       </Card>
//     </div>
//   )
// }


"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { PaginationComponent } from "@/components/shared/pagination-component"

// Dummy data for the orders table
const orders = [
  { id: 1, productName: "Adidas-8105", coins: 130.0, date: "Feb 10, 2025", status: "Processing" },
  { id: 2, productName: "Adidas-8105", coins: 150.0, date: "Feb 10, 2025", status: "Delivered" },
  { id: 3, productName: "Adidas-8105", coins: 130.0, date: "Feb 10, 2025", status: "Delivered" },
  { id: 4, productName: "Adidas-8105", coins: 130.0, date: "Feb 10, 2025", status: "Delivered" },
  { id: 5, productName: "Adidas-8105", coins: 130.0, date: "Feb 10, 2025", status: "Delivered" },
  { id: 6, productName: "Adidas-8105", coins: 130.0, date: "Feb 10, 2025", status: "Delivered" },
  { id: 7, productName: "Adidas-8105", coins: 150.0, date: "Feb 10, 2025", status: "Delivered" },
  { id: 8, productName: "Adidas-8105", coins: 200.0, date: "Feb 10, 2025", status: "Delivered" },
]

export default function OrdersPage() {
  const [currentPage, setCurrentPage] = useState(2) // Set initial page to 2 as per image
  const totalPages = 10 // As per the image, showing 10 pages

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
      // In a real application, you would fetch data for the new page here
    }
  }

  return (
    <div className="flex flex-col items-center justify-center py-4">
      <h1 className="text-3xl font-bold mb-8">Orders</h1>
      <Card className="container rounded-xl overflow-hidden border border-[#3F3F3F] pt-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left table-auto border border-[#3F3F3F] border-collapse">
            <thead className="border-b border-[#3F3F3F]">
              <tr className="text-[18px] text-[#131313] font-medium">
                <th className="px-4 py-3 tracking-wider border border-[#3F3F3F]">Product Name</th>
                <th className="px-4 py-3 tracking-wider border border-[#3F3F3F]">Coins</th>
                <th className="px-4 py-3 tracking-wider border border-[#3F3F3F]">Date</th>
                <th className="px-4 py-3 tracking-wider border border-[#3F3F3F]">Status</th>
                <th className="px-4 py-3 tracking-wider border border-[#3F3F3F]">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((order) => (
                <tr className="text-[16px] text-[#0F0F0F] font-medium" key={order.id}>
                  <td className="px-4 py-4 whitespace-nowrap border border-[#3F3F3F]">{order.productName}</td>
                  <td className="px-4 py-4 whitespace-nowrap border border-[#3F3F3F]">{order.coins.toFixed(2)}</td>
                  <td className="px-4 py-4 whitespace-nowrap border border-[#3F3F3F]">{order.date}</td>
                  <td className="px-4 py-4 whitespace-nowrap border border-[#3F3F3F]">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        order.status === "Processing" ? "bg-orange-100 text-orange-800" : "bg-green-100 text-green-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm border border-[#3F3F3F]">
                    <a href="#" className="text-blue-600 hover:underline">
                      View Details
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-between p-4 border-t">
          <div className="text-sm text-gray-500">
            Showing {currentPage} of {totalPages} results
          </div>
          <div>
            <PaginationComponent currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
          </div>
        </div>
      </Card>
    </div>
  )
}