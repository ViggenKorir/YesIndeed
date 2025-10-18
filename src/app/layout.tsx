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
      <html
        lang="en"
        className="font-sans"
        style={{
          fontFamily:
            "var(--font-nunito), system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif",
        }}
      >
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            as="style"
            href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200..1000;1,200..1000&display=swap"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200..1000;1,200..1000&display=swap"
            rel="stylesheet"
          />
        </head>
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
