import type { Metadata } from "next";

import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { Roboto } from "next/font/google";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import "modern-normalize";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto",
  display: "swap",
});

const siteDescription =
  "No clutter, just notes. Organize your thoughts with categories and tags. A clean, fast, and simple note-taking experience.";

export const metadata: Metadata = {
  title: "Minimal Notes | Your Digital Notepad",
  description: siteDescription,
  openGraph: {
    title: `Minimal Notes | Your Digital Notepad`,
    description: siteDescription.slice(0, 100),
    url: "https://notehub.com/notes/",
    siteName: "NoteHub",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub photo",
      },
    ],
  },
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable}`}>
        <TanStackProvider>
          <Header />
          {children}
          {modal}
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}
