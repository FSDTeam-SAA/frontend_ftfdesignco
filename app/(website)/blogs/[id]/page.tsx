import React from 'react'
import BlogDetails from '../_components/blog-content-details';

export default function Page({ params }: { params: { id: string } }) {
  return (
    <div>
      <BlogDetails params={params} />
    </div>
  );
}