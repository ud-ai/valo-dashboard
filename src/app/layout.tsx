import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ThemeToggle } from "@/components/ThemeToggle";
import Cursor from "@/components/UI/Cursor";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Frontend Intern Take-Home Task | ValoCoach",
  description: "Valorant Player Dashboard with Match History",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} antialiased min-h-screen font-sans bg-bg-primary text-text-primary transition-colors duration-300`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="absolute top-4 right-4 z-50">
            <ThemeToggle />
          </div>
          <div className="absolute top-0 w-full h-[600px] bg-gradient-to-b from-bg-secondary/20 via-accent-red/5 to-transparent pointer-events-none -z-10" />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
