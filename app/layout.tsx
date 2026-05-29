import type { Metadata } from "next";
import { Geist_Mono, Noto_Sans_SC, ZCOOL_QingKe_HuangYou } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toaster } from "@/components/ui/sonner";
import { PostHogProvider } from "@/components/providers/PostHogProvider";

const moeSans = Noto_Sans_SC({
  variable: "--font-moe-sans",
  weight: ["400", "500", "700", "900"],
  display: "swap",
  preload: false,
});

const moeDisplay = ZCOOL_QingKe_HuangYou({
  variable: "--font-moe-display",
  weight: "400",
  display: "swap",
  preload: false,
});

const geistMono = Geist_Mono({
  variable: "--font-moe-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  applicationName: "AnimationFrame",
  title: {
    default: "AnimationFrame",
    template: "%s · AnimationFrame",
  },
  description: "二次元风格的 AI 对话、图表与记账管理系统",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/app-icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/app-icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className={`${moeSans.variable} ${moeDisplay.variable} ${geistMono.variable} antialiased`}>
        <PostHogProvider>
          {children}
          <Analytics />
          <SpeedInsights />
          <Toaster />
        </PostHogProvider>
      </body>
    </html>
  );
}
