import { CardContent} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export default function Page() {
  return (
    <section className="">
      <div className="container  text-center py-24">
        <h2 className="text-3xl font-bold mb-4">
          Get in Touch with a <span className="text-[#3258DA]">Swag Solutions Executive</span>
        </h2>
        <p className="text-gray-600">
          We&apos;d love to hear from you. Send us a message and we&apos;ll
          respond as soon as possible.
        </p>
      </div>
      <div className="container py-12">
        <div className="grid grid-cols-8 gap-12">
          <div className="col-span-6">
            <div>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="Your first name" className=""/>
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Your last name" />
                  </div>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" placeholder="(555) 000-0000" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="How can we help?" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="message">Your Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us more about your needs..."
                    rows={4}
                    className="placeholder:text-gray-400"
                  />
                </div>
                <Button className="w-full bg-[#D9AD5E] text-black">Send Message</Button>
              </CardContent>
            </div>
          </div>

          <div className="col-span-2">
            <div>
              <CardContent className="p-6">
                <h3 className="text-[16px] font-semibold mb-4">
                  Contact Information
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-[#E7EEFD] rounded-full flex items-center justify-center">
                      <Mail className="h-5 w-5 text-blue-600" />
                    </div>
                    <span>swag@example.com</span>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-[#E7EEFD] rounded-full flex items-center justify-center">
                      <Phone className="h-5 w-5 text-blue-600" />
                    </div>
                    <span>(555) 000-0000</span>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-[#E7EEFD] rounded-full flex items-center justify-center">
                      <MapPin className="h-5 w-5 text-blue-600" />
                    </div>
                    <span>
                      123 Business Ave, Suite 100
                      New York, NY 10001
                    </span>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-[#E7EEFD] rounded-full flex items-center justify-center">
                      <Clock className="h-5 w-5 text-blue-600" />
                    </div>
                    <span>Mon-Fri: 9AM-6PM EST</span>
                  </div>
                </div>
              </CardContent>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
