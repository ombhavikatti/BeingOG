import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/providers/theme-provider";
import "./globals.css";
import { AuthProvider } from "@/contexts/auth-context";

// Display font — for hero text, section headings
const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

// Body font — for all UI text, paragraphs, buttons
const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// Monospace font — for code snippets, technical labels
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://being-og-web.vercel.app"),
  title: {
    default: "BeingOG — The OS for ambitious students",
    template: "%s · BeingOG",
  },
  description:
    "The all-in-one productivity, accountability, and AI-coaching platform for students who refuse to be average. Level up. Stay OG.",
  applicationName: "BeingOG",
  authors: [{ name: "Om Bhavikatti", url: "https://github.com/ombhavikatti" }],
  creator: "Om Bhavikatti",
  publisher: "BeingOG",
  keywords: [
    "productivity",
    "student productivity",
    "habit tracker",
    "study tracker",
    "pomodoro",
    "accountability partner",
    "AI coach",
    "study group",
    "placement preparation",
    "DSA tracker",
    "gamified productivity",
    "college student app",
    "beingog",
    "BeingOG",
    "level up stay OG",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://being-og-web.vercel.app",
    siteName: "BeingOG",
    title: "BeingOG — The OS for ambitious students",
    description:
      "Habits · AI Coach · Real accountability. The productivity platform built for students who refuse to be average.",
  },
  twitter: {
    card: "summary_large_image",
    title: "BeingOG — The OS for ambitious students",
    description:
      "Habits · AI Coach · Real accountability. Built for students who refuse to be average.",
    creator: "@ombhavikatti",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  category: "productivity",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} font-body antialiased`}
      >
       <ThemeProvider
  attribute="class"
  defaultTheme="system"
  enableSystem
  disableTransitionOnChange
>
  <AuthProvider>
    {children}
  </AuthProvider>
</ThemeProvider>
      </body>
    </html>
  );
}