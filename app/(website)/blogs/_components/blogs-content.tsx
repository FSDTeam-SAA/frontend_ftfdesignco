'use client';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

// Define interfaces for Blog and BlogsResponse
interface Blog {
  _id: string;
  blogTitle: string;
  blogDescription: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

interface BlogsResponse {
  status: boolean;
  message: string;
  data: Blog[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

// Fetch function with proper typing
const fetchBlogs = async (page: number = 1, limit: number = 6): Promise<BlogsResponse> => {
  const response = await fetch(`https://ftfdesignco-backend.onrender.com/api/v1/blog?page=${page}&limit=${limit}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

function BlogsContent() {
  const [page, setPage] = React.useState(1);
  const limit = 6; // Configurable limit

  // UseQuery with explicit typing
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['blogs', page, limit],
    queryFn: () => fetchBlogs(page, limit),
    // Use placeholderData to retain previous data during pagination (equivalent to keepPreviousData in v4)
    placeholderData: (previousData) => previousData,
  });

  if (isLoading) {
    return <div className="text-center py-12">Loading blogs...</div>;
  }

  if (isError) {
    return <div className="text-center py-12 text-red-500">Error: {error.message}</div>;
  }

  // Safely access meta and data with fallback values
  const totalPages = data?.meta?.totalPages ?? 1;
  const currentPage = data?.meta?.page ?? 1;
  const blogs = data?.data ?? [];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Our Blog Posts</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {blogs.map((blog: Blog) => (
          <Link key={blog._id} href={`/blogs/${blog._id}`} passHref>
            <Card className="hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
              <div className="relative aspect-video">
                <Image
                  src={blog.image || '/placeholder.svg'}
                  alt={blog.blogTitle}
                  fill
                  className="object-cover rounded-t-lg"
                />
              </div>
              <CardHeader>
                <CardTitle className="line-clamp-2">{blog.blogTitle}</CardTitle>
                <CardDescription className="line-clamp-3">{blog.blogDescription}</CardDescription>
              </CardHeader>
              <CardContent className="mt-auto">
                <div className="text-sm text-gray-500">
                  Posted: {new Date(blog.createdAt).toLocaleDateString()}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setPage((old) => Math.max(old - 1, 1))}
                className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <PaginationItem key={pageNum}>
                <PaginationLink
                  onClick={() => setPage(pageNum)}
                  isActive={pageNum === currentPage}
                >
                  {pageNum}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                onClick={() => setPage((old) => Math.min(old + 1, totalPages))}
                className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}

export default BlogsContent;