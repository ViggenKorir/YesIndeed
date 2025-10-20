import { type Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import AlertProvider from "@/components/ui/Alert";

export const metadata: Metadata = {
  title: "YesIndeed",
  description: "Viggen Inc.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className="font-sans">
        <body className="antialiased">
          <AlertProvider>
            <header className="flex justify-end items-center p-4 gap-4 h-16" />
            <main>{children}</main>
          </AlertProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
