import { Footer } from "@/components/shared/Footer";
import { Navbar } from "@/components/shared/Navbar";
import { Banner } from "@/components/web_components/Banner";


export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Banner />
      </main>
      <Footer />
    </div>
  )
}
