import { ThemeProvider } from "@/components/providers/theme-provider";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ConvexProvider from "@/components/providers/convex-provider";
import { Toaster } from "sonner";
import ModalProvider from "@/components/providers/modal-provider";
import { EdgeStoreProvider } from "../lib/edgestore";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Notion",
  description: "Notion website cloned by Bui Ngoc",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/logo.png" />
        <link rel="apple-touch-icon" href="/demo.png" />
      </head>
      <body className={inter.className}>
        <ConvexProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            storageKey="Notion-theme"
          >
            <EdgeStoreProvider>
              <Toaster position="top-right" />
              <ModalProvider />
              {children}
            </EdgeStoreProvider>
          </ThemeProvider>
        </ConvexProvider>
      </body>
    </html>
  );
}
