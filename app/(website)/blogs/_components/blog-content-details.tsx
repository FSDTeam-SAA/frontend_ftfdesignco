'use client'
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { format } from 'date-fns';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';

interface Blog {
  _id: string;
  blogTitle: string;
  blogDescription: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface BlogResponse {
  status: boolean;
  message: string;
  data: Blog;
}

const fetchBlog = async (id: string): Promise<BlogResponse> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/blog/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch blog');
  }
  return response.json();
};

interface BlogDetailsProps {
  params: {
    id: string;
  };
}

export default function BlogDetails({ params }: BlogDetailsProps) {
  const { data, isLoading, isError, error } = useQuery<BlogResponse, Error>({
    queryKey: ['blog', params.id],
    queryFn: () => fetchBlog(params.id),
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-12 text-red-500">
        Error: {error.message}
      </div>
    );
  }

  const blog = data?.data;

  return (
    <div className="container mx-auto py-12">
      <article className="prose prose-lg dark:prose-invert max-w-none">
        <header className="mb-12">
          <h1 className="text-4xl font-bold mb-4">{blog?.blogTitle}</h1>
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <span>
              Published: {format(new Date(blog?.createdAt || ''), 'MMMM d, yyyy')}
            </span>
            {blog?.updatedAt !== blog?.createdAt && (
              <span className="ml-4">
                (Updated: {format(new Date(blog?.updatedAt || ''), 'MMMM d, yyyy')})
              </span>
            )}
          </div>
        </header>

        <div className="relative aspect-video w-full mb-8 rounded-lg overflow-hidden">
          <Image
            src={blog?.image || '/placeholder.svg'}
            alt={blog?.blogTitle || 'Blog image'}
            fill
            className="object-cover"
            priority
          />
        </div>

        {blog && (
          <div
            className="line-clamp-3"
            dangerouslySetInnerHTML={{ __html: blog.blogDescription }}
          />
        )}

        <footer className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-700">
          <Link
            href="/blogs"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
          >
            ← Back to all blogs
          </Link>
        </footer>
      </article>
    </div>
  );
}