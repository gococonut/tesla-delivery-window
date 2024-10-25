import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { FaEye, FaUsers } from "react-icons/fa"; // Importing icons from react-icons
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
        <div className="fixed bottom-0 left-0 w-full bg-black bg-opacity-70 text-white text-center py-4 z-50 flex justify-center items-center space-x-4">
          <div className="flex items-center space-x-2 text-[0.7rem]">
            <FaEye />
            <span>本页访问人次:</span>
            <span id="page_pv" className="text-[0.7rem]"></span>
          </div>
          <div className="flex items-center space-x-2 text-[0.7rem]">
            <FaUsers />
            <span>本页访问人数:</span>
            <span id="page_uv" className="text-[0.7rem]"></span>
          </div>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
