import { Outfit } from "next/font/google";
import "./globals.css";
import { AppContextProvider } from "@/context/AppContext";
import { Toaster } from "react-hot-toast";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";
import { Suspense } from "react";

const outfit = Outfit({ subsets: ['latin'], weight: ["300", "400", "500"] })


export const metadata = {
  title: "E-Commerce - Juvenis",
  description: "E-Commerce with Next.js ",
};

export default function RootLayout({ children }) {
  return (
    
     <html lang="en">
      <body className={`${outfit.className} antialiased text-gray-700`}>
        <ClerkProvider>
          <Toaster />
          <AppContextProvider>
            <Suspense fallback={<div>Loading...</div>}>
         
            </Suspense>

            {children}
          </AppContextProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
