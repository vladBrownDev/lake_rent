import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "../components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Озеро Бердихів",
  description: "Орендуйте озеро для рибалки",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Script
          src="https://cdn.jsdelivr.net/npm/eruda"
          strategy="beforeInteractive"
        />
        <Script id="eruda-init" strategy="afterInteractive">
          {`eruda.init();`}
        </Script>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
