import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "./components/footer";
import { ToastContainer } from "react-toastify";
import NavbarSidebarLayout from "./components/NavbarSidebarLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: 'Animal Help PWA',
  description: 'Find vets, adopt animals, and help street animals near you.',
  manifest: '/manifest.json',

};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NavbarSidebarLayout>
  {children}
  <ToastContainer position="top-right" autoClose={2000} />
  <Footer />
</NavbarSidebarLayout>

      </body>
    </html>
  );
}
