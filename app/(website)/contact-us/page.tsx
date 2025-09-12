import { CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export default function Page() {
  return (
    <section className="min-h-screen bg-[#FCF7EF]">
      <div className="container mx-auto  px-4 sm:px-6  lg:px-8 text-center py-12 sm:py-16 lg:py-10 ">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#131313] mb-4">
          Get in Touch with a <span className="text-[#3258DA]">Swag Solutions Executive</span>
        </h2>
        <p className="text-[#424242] text-sm sm:text-base max-w-[884px] mx-auto">
          Our team is always ready to assist you with any questions or concerns you might have. Fill out the form below and we&apos;ll get back to you as soon as possible
        </p>
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-7">
        <div className="grid grid-cols-1 lg:grid-cols-9 gap-6 lg:gap-12">
          <div className="lg:col-span-6">
            <CardContent className="space-y-4 p-4 sm:p-6">
              <div className="space-y-1">
                <Label className="text-[#2A2A2A] text-sm sm:text-base font-medium" htmlFor="firstName">First Name</Label>
                <Input id="firstName" placeholder="Your first name" className="text-sm sm:text-base h-[45px] border-[#5A5A5A] rounded-[8px]" />
              </div>
              <div className="space-y-1">
                <Label className="text-[#2A2A2A] text-sm sm:text-base font-medium" htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  className="text-sm sm:text-base h-[45px] border-[#5A5A5A] rounded-[8px]"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-[#2A2A2A] text-sm sm:text-base font-medium" htmlFor="phone">Phone Number</Label>
                <Input id="phone" placeholder="(555) 000-0000" className="text-sm sm:text-base h-[45px] border-[#5A5A5A] rounded-[8px]" />
              </div>
              <div className="space-y-1">
                <Label className="text-[#2A2A2A] text-sm sm:text-base font-medium" htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="How can we help?" className="text-sm sm:text-base h-[45px] border-[#5A5A5A] rounded-[8px]" />
              </div>
              <div className="space-y-1 mb-6 sm:mb-10">
                <Label className="text-[#2A2A2A] text-sm sm:text-base font-medium" htmlFor="message">Your Message</Label>
                <Textarea
                  id="message"
                  placeholder="Tell us more about your needs..."
                  rows={4}
                  className="placeholder:text-gray-400 text-sm sm:text-base border-[#5A5A5A] rounded-[8px]"
                />
              </div>
              <Button className="w-full bg-[#D9AD5E] h-10 sm:h-12 rounded-lg hover:bg-[#D9AD5E]/90 text-black text-sm sm:text-base">
                Send Message
              </Button>
            </CardContent>
          </div>

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
                  <span className="text-sm sm:text-base">swag@example.com</span>
                </div>

                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="p-2 sm:p-3 bg-[#E7EEFD] rounded-full flex items-center justify-center">
                    <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                  </div>
                  <span className="text-sm sm:text-base">(555) 000-0000</span>
                </div>

                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="p-2 sm:p-3 bg-[#E7EEFD] rounded-full flex items-center justify-center">
                    <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                  </div>
                  <span className="text-sm sm:text-base">
                    123 Business Ave, Suite 100
                    <br />
                    New York, NY 10001
                  </span>
                </div>

                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="p-2 sm:p-3 bg-[#E7EEFD] rounded-full flex items-center justify-center">
                    <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                  </div>
                  <span className="text-sm sm:text-base">Mon-Fri: 9AM-6PM EST</span>
                </div>
              </div>
            </CardContent>
          </div>
        </div>
      </div>
    </section>
  );
}