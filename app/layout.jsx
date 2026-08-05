import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppContext, AppContextProvider } from "../context/AppContext";
import Script from "next/script";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Juvenis Innovations",
  description: "Juvenis Innovations website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" >
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-5YJ1ZSKXWL"
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-5YJ1ZSKXWL');
          `}
        </Script>
        <Toaster/>
        <AppContextProvider>
        {children}
        </AppContextProvider>
      </body>
    </html>
  );
}
