"use client";

import { CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { contactUs } from "@/lib/api";
import { contactSchema } from "@/lib/validations/contact";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import { toast } from "sonner";

// // ✅ Validation schema
// export const contactSchema = z.object({
//   name: z.string().min(2, "Name is required"),
//   address: z.string().optional(),
//   email: z.string().email("Invalid email"),
//   phone: z.string().min(6, "Phone is required"),
//   subject: z.string().min(2, "Subject is required"),
//   message: z.string().min(5, "Message must be at least 5 characters"),
// });
 
// interface contactdataform{
//     name: string;
//   address: string;
//   email: string;
//   phone: string;
//   subject: string;
//   message: string;
// }
export type ContactFormValues = z.infer<typeof contactSchema>;

export default function Page() {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      address: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationKey: ["contact"],
    mutationFn: (data: ContactFormValues) => contactUs(data),
    onSuccess: () => {
      toast.success("Message sent successfully!");
      form.reset();
    },
    onError: (err) => {
      toast.error(err.message || "Something went wrong");
    },
  });

  const onSubmit = (data: ContactFormValues) => {
    contactMutation.mutate(data);
  };

  return (
    <section className="min-h-screen bg-[#FCF7EF]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center py-12 sm:py-16 lg:py-10">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#131313] mb-4">
          Get in Touch with a{" "}
          <span className="text-[#3258DA]">Swag Solutions Executive</span>
        </h2>
        <p className="text-[#424242] text-sm sm:text-base max-w-[884px] mx-auto">
          Our team is always ready to assist you with any questions or concerns
          you might have. Fill out the form below and we&apos;ll get back to you
          as soon as possible
        </p>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-7">
        <div className="grid grid-cols-1 lg:grid-cols-9 gap-6 lg:gap-12">
          {/* Form */}
          <div className="lg:col-span-6">
            <CardContent className="space-y-4 p-4 sm:p-6">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  {/* Name */}
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Your name"
                            className="text-sm sm:text-base h-[45px] border-[#5A5A5A] rounded-[8px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Address */}
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Your address"
                            className="text-sm sm:text-base h-[45px] border-[#5A5A5A] rounded-[8px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Email */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="your.email@example.com"
                            className="text-sm sm:text-base h-[45px] border-[#5A5A5A] rounded-[8px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Phone */}
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="+8801234567890"
                            className="text-sm sm:text-base h-[45px] border-[#5A5A5A] rounded-[8px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Subject */}
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="How can we help?"
                            className="text-sm sm:text-base h-[45px] border-[#5A5A5A] rounded-[8px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Message */}
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Message</FormLabel>
                        <FormControl>
                          <Textarea
                            rows={4}
                            placeholder="Tell us more about your needs..."
                            className="placeholder:text-gray-400 text-sm sm:text-base border-[#5A5A5A] rounded-[8px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Submit button */}
                  <Button
                    type="submit"
                    disabled={contactMutation.isPending}
                    className="w-full bg-[#D9AD5E] h-10 sm:h-12 rounded-xl hover:bg-[#D9AD5E]/90 text-black text-sm sm:text-base"
                  >
                    {contactMutation.isPending ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-3">
            <CardContent className="p-4 sm:p-6">
              <h3 className="text-base text-[#424242] sm:text-lg font-semibold mb-4">
                Contact Information
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="p-2 sm:p-3 bg-[#E7EEFD] rounded-full flex items-center justify-center">
                    <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                  </div>
                  <p className="flex flex-col">
                    <span className="text-base font-medium text-[#131313]">
                      Email Address
                    </span>
                    <span className="text-sm sm:text-base text-[#424242]">
                      swag@example.com
                    </span>
                  </p>
                </div>

                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="p-2 sm:p-3 bg-[#E7EEFD] rounded-full flex items-center justify-center">
                    <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                  </div>
                  <p className="flex flex-col">
                    <span className="text-base font-medium text-[#131313]">
                      Phone Number
                    </span>
                    <span className="text-sm sm:text-base text-[#424242]">
                      (555) 000-0000
                    </span>
                  </p>
                </div>

                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="p-2 sm:p-3 bg-[#E7EEFD] rounded-full flex items-center justify-center">
                    <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                  </div>
                  <p className="flex flex-col">
                    <span className="text-base font-medium text-[#131313]">
                      Location
                    </span>
                    <span className="text-sm sm:text-base text-[#424242]">
                      70 Washington Square South, NY 10012
                      <br /> 400 Broome St, NY 10013
                    </span>
                  </p>
                </div>

                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="p-2 sm:p-3 bg-[#E7EEFD] rounded-full flex items-center justify-center">
                    <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                  </div>
                  <p className="flex flex-col">
                    <span className="text-base font-medium text-[#131313]">
                      Business Hour
                    </span>
                    <span className="text-sm sm:text-base text-[#424242]">
                      Monday to Friday, 9:00 AM – 5:00 PM
                    </span>
                  </p>
                </div>
              </div>
            </CardContent>
          </div>
        </div>
      </div>
    </section>
  );
}
