import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./styles/globals.css";
import ToastProvider from "./components/ToastProvider";
import DarkModeToggle from "./components/DarkModeToggle";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Task Manager",
  description: "A simple task management application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="flex justify-between p-4 dark:bg-black">
          <h1 className="text-2xl sm:text-4xl text-violet-600 font-serif font-bold">
            <Link href="/home">Task Manager</Link>
          </h1>
          <DarkModeToggle />
        </header>
        <hr />
        <main className="dark:bg-black h-screen">
          <ToastProvider>{children}</ToastProvider>
        </main>
      </body>
    </html>
  );
}
