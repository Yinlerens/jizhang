import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { PostHogProvider } from "@/components/providers/PostHogProvider";
import { Ma_Shan_Zheng, Noto_Sans, Playfair_Display } from "next/font/google";
import { cn } from "@/lib/utils";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Toaster } from "@/components/ui/sonner";

const playfairDisplayHeading = Playfair_Display({ subsets: ["latin"], variable: "--font-heading" });

const bannerTitleFont = Ma_Shan_Zheng({
  display: "swap",
  fallback: ["KaiTi", "STKaiti", "serif"],
  subsets: ["latin"],
  variable: "--font-banner-title",
  weight: "400",
});

const notoSans = Noto_Sans({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  applicationName: "Resonance Convene",
  title: {
    default: "抽卡模拟器",
    template: "%s · 抽卡模拟器",
  },
  description: "静态数据驱动的二次元抽卡模拟器。",
  icons: {
    icon: [{ url: "/favicon.ico", sizes: "any" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      suppressHydrationWarning
      className={cn(
        "font-sans",
        notoSans.variable,
        playfairDisplayHeading.variable,
        bannerTitleFont.variable,
      )}
    >
      <body suppressHydrationWarning>
        <PostHogProvider>
          <AntdRegistry>{children}</AntdRegistry>
          <Toaster richColors position="top-center" />
          <Analytics />
          <SpeedInsights />
        </PostHogProvider>
      </body>
    </html>
  );
}
