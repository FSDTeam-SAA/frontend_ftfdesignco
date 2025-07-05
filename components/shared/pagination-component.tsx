"use client"

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

interface PaginationComponentProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function PaginationComponent({ currentPage, totalPages, onPageChange }: PaginationComponentProps) {
  const renderPageNumbers = () => {
    const pages = []
    const maxVisiblePages = 5 // Number of page links to show directly (e.g., 1, 2, 3, ..., 10)

    if (totalPages <= maxVisiblePages) {
      // If total pages are few, show all of them
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <PaginationItem key={i}>
            <PaginationLink href="#" isActive={i === currentPage} onClick={() => onPageChange(i)}>
              {i}
            </PaginationLink>
          </PaginationItem>,
        )
      }
    } else {
      // Always show the first page
      pages.push(
        <PaginationItem key={1}>
          <PaginationLink href="#" isActive={1 === currentPage} onClick={() => onPageChange(1)}>
            1
          </PaginationLink>
        </PaginationItem>,
      )

      // Determine the range of pages to show around the current page
      let startPage = Math.max(2, currentPage - 1)
      let endPage = Math.min(totalPages - 1, currentPage + 1)

      // Adjust range if current page is near the beginning or end
      if (currentPage <= 3) {
        endPage = Math.min(totalPages - 1, 3) // Show 1, 2, 3
      } else if (currentPage >= totalPages - 2) {
        startPage = Math.max(2, totalPages - 3) // Show total-2, total-1, total
      }

      // Add ellipsis at the beginning if needed
      if (startPage > 2) {
        pages.push(
          <PaginationItem key="ellipsis-start">
            <PaginationEllipsis />
          </PaginationItem>,
        )
      }

      // Add pages in the calculated range
      for (let i = startPage; i <= endPage; i++) {
        pages.push(
          <PaginationItem key={i}>
            <PaginationLink href="#" isActive={i === currentPage} onClick={() => onPageChange(i)}>
              {i}
            </PaginationLink>
          </PaginationItem>,
        )
      }

      // Add ellipsis at the end if needed
      if (endPage < totalPages - 1) {
        pages.push(
          <PaginationItem key="ellipsis-end">
            <PaginationEllipsis />
          </PaginationItem>,
        )
      }

      // Always show the last page
      pages.push(
        <PaginationItem key={totalPages}>
          <PaginationLink href="#" isActive={totalPages === currentPage} onClick={() => onPageChange(totalPages)}>
            {totalPages}
          </PaginationLink>
        </PaginationItem>,
      )
    }
    return pages
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          {currentPage === 1 ? (
            <span className="pointer-events-none opacity-50">
              <PaginationPrevious href="#" />
            </span>
          ) : (
            <PaginationPrevious href="#" onClick={() => onPageChange(currentPage - 1)} />
          )}
        </PaginationItem>
        {renderPageNumbers()}
        <PaginationItem>
          {currentPage === totalPages ? (
            <span className="pointer-events-none opacity-50">
              <PaginationNext href="#" />
            </span>
          ) : (
            <PaginationNext href="#" onClick={() => onPageChange(currentPage + 1)} />
          )}
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
