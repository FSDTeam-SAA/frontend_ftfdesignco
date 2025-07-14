import { Navbar } from "@/components/shared/Navbar";
import "../globals.css";
import { Footer } from "@/components/shared/Footer";
import { Toaster } from "sonner";
import { CartProvider } from "@/hooks/use-cart";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body >
        <Navbar />
        <CartProvider>{children}</CartProvider>
        <Toaster richColors />
        <Footer />
      </body>
    </html>
  );
}
