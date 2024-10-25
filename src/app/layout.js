import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Tesla Delivery Window",
  description: "Query tesla order",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script
          defer
          src="//webviso.yestool.org/js/index.min.js"
          data-base-url="https://analytics.fusever.com"
          data-page-pv-id="page_pv"
          data-page-uv-id="page_uv"
        ></script>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
