import { Inter } from "next/font/google";
import "./globals.css";
import BootstrapClient from "@/components/BootstrapClient";
import "bootstrap/dist/css/bootstrap.css";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Unsplash Photo Extractor",
  description: "Best Photo Extractor Ever Created!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="container">
        <main className={inter.className}>
          {children}
          <Footer />
          <BootstrapClient />
        </main>
      </body>
    </html>
  );
}
