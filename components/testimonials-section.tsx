"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useState, useEffect } from "react";
import Image from "next/image";

// Define TypeScript interface
interface Testimonial {
  image: string;
  name: string;
  company: string;
  content: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    image: "/assets/testimonials.avif",
    name: "Sarah Johnson",
    company: "Tech Corp",
    content:
      "Amazing service and quality products. Our team loves the swag we ordered!",
    rating: 5,
  },
  {
    image: "/assets/testimonials.avif",
    name: "Mike Chen",
    company: "StartupXYZ",
    content:
      "Fast delivery and excellent customer support. Highly recommended!",
    rating: 5,
  },
  {
    image: "/assets/testimonials.avif",
    name: "Emily Davis",
    company: "Design Studio",
    content:
      "The customization options are fantastic. Perfect for our brand needs.",
    rating: 5,
  },
  {
    image: "/assets/testimonials.avif",
    name: "Emily Davis",
    company: "Design Studio",
    content:
      "The customization options are fantastic. Perfect for our brand needs.",
    rating: 5,
  },
  {
    image: "/assets/testimonials.avif",
    name: "Emily Davis",
    company: "Design Studio",
    content:
      "The customization options are fantastic. Perfect for our brand needs.",
    rating: 5,
  },
];

// Skeleton component for loading state
function TestimonialSkeleton() {
  return (
    <CarouselItem
      className="pl-4 bg-white md:basis-1/2 lg:basis-1/3"
      style={{ boxShadow: "0px 0px 32px 0px #0000003D" }}
    >
      <Card className="border rounded-lg p-6 h-full">
        <CardContent className="p-0 space-y-4 flex flex-col h-full">
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-5 h-5 bg-gray-200 rounded-full animate-pulse"
              />
            ))}
          </div>
          <div className="space-y-2 flex-grow">
            <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse" />
          </div>
          <div className="mt-4">
            <div className="h-4 bg-gray-200 rounded w-24 animate-pulse" />
            <div className="h-3 bg-gray-200 rounded w-16 mt-2 animate-pulse" />
          </div>
        </CardContent>
      </Card>
    </CarouselItem>
  );
}

export function TestimonialsSection() {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading for better UX
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000); // Adjust delay as needed
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      className="py-16 bg-[#FBF7EF]"
      aria-labelledby="testimonials-heading"
    >
      <div className="container mx-auto px-4">
        <Carousel opts={{ align: "start", loop: true }} className="w-full">
          <div className="flex justify-between py-4">
            <h2
              id="testimonials-heading"
              className="text-3xl font-bold text-[#272727]"
            >
              What They&apos;ve Said About Us
            </h2>
            <div className="flex gap-2 mt-4">
              <CarouselPrevious
                className="h-9 w-9 rounded-full border border-gray-500 flex items-center justify-center text-gray-500 static"
                aria-label="Previous testimonial"
              />
              <CarouselNext
                className="h-9 w-9 rounded-full border border-gray-500 flex items-center justify-center text-gray-500 static"
                aria-label="Next testimonial"
              />
            </div>
          </div>
          <CarouselContent className="-ml-4">
            {isLoading ? (
              <>
                <TestimonialSkeleton />
                <TestimonialSkeleton />
                <TestimonialSkeleton />
              </>
            ) : (
              testimonials.map((testimonial, index) => (
                <CarouselItem
                  key={index}
                  className="pl-4 md:basis-1/2 lg:basis-1/3"
                >
                  <Card
                    className=" bg-white p-6 h-full"
                    role="article"
                    aria-label={`Testimonial by ${testimonial.name}`}
                  >
                    <CardContent className="p-0 space-y-4 flex flex-col h-full">
                      <div>
                        <Image
                          src={testimonial.image}
                          alt={testimonial.name}
                          width={500}
                          height={500}
                          className="object-contain w-14 h-14 rounded-full"
                        />
                        <p className="font-medium text-[#595959] text-[18px]">
                          {testimonial.name}
                        </p>
                      </div>
                      <div
                        className="flex"
                        aria-label={`${testimonial.rating} out of 5 stars`}
                      >
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-5 h-5 ${
                              i < testimonial.rating
                                ? "text-yellow-400 fill-yellow-400"
                                : "text-[#595959] fill-[#595959]"
                            }`}
                            aria-hidden="true"
                          />
                        ))}
                      </div>
                      <p className="text-base text-[#272727] font-normal leading-[150%] flex-grow">
                        {testimonial.content}
                      </p>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))
            )}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
