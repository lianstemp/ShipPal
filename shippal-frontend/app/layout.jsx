import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ShipPal - Tinder for Export",
  description: "Connect Local MSMEs with Global Buyers",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-zinc-950 text-zinc-100 min-h-screen selection:bg-blue-500/30`}>
        <Navbar />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
