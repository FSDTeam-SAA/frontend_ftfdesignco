import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function PersonalInformationForm() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-semibold">Personal Information</CardTitle>
        <Button className="bg-amber-400 text-amber-950 hover:bg-amber-500">Update</Button>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" defaultValue="Bessie" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="company-address">Company Address</Label>
          <Input id="company-address" defaultValue="alma.lawson@example.com" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" type="email" defaultValue="alma.lawson@example.com" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" defaultValue="(307) 555-0133" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="country">Country</Label>
            <Input id="country" defaultValue="USA" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="city-state">City/State</Label>
            <Input id="city-state" defaultValue="California" />
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="road-area">Road/Area</Label>
          <Input id="road-area" defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit," />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="postal-code">Postal Code</Label>
          <Input id="postal-code" defaultValue="15268959" />
        </div>
      </CardContent>
    </Card>
  )
}
