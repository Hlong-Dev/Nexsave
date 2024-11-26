import { ThemeProvider } from "@/components/providers/theme-provider";
import "../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ConvexProvider from "@/components/providers/convex-provider";
import { Toaster } from "sonner";
import ModalProvider from "@/components/providers/modal-provider";
import { EdgeStoreProvider } from "../../lib/edgestore";
import { NextIntlClientProvider } from "next-intl";

import { notFound } from "next/navigation";
import { locales } from "@/i18n";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "NoteWorth",
    description: "NoteWorth website by HoangLong",
};

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: {
    locale?: string;
  };
}) {
  let messages;
  try {
    messages = (await import(`@/messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  if (!locales.includes(locale as any)) notFound();

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <html lang={locale} suppressHydrationWarning>
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
    </NextIntlClientProvider>
  );
}
