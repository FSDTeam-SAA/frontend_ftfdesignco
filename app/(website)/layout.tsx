import { Navbar } from "@/components/shared/Navbar";
import "../globals.css";
import { Footer } from "@/components/shared/Footer";
import { Toaster } from "sonner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body >
        <Navbar />
        {children}
        <Toaster richColors />
        <Footer />
      </body>
    </html>
  );
}
