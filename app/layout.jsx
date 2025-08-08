import { Footer } from "../components/Footer.jsx";
import { Header } from "../components/Header.jsx";
import { Inter as FontSans } from "next/font/google"
import { cn } from "../lib/utils"
import { I18nProvider } from './i18n'
import { Analytics } from "@vercel/analytics/react"
import Script from "next/script";
import { BuyMeCoffee } from "../components/BuyMeCoffee.jsx";
import { DynamicLangUpdater } from "../components/DynamicLangUpdater.jsx";
import "../styles/globals.css";
import "../styles/loading.css";

export const metadata = {
  title: "Formulas AI",
  description: "Formulas AI is an intelligent Excel formula generation tool that leverages AI technology to help you easily create complex Excel formulas, thereby enhancing your work efficiency.",
  keywords: ['Excel AI', 'Excel formula', 'DeepSeek', 'Excel', 'ChatGPT', 'AI', 'OpenAI', 'Vercel', 'Vercel AI SDK', 'Next.js', '公式生成', 'Excel 助手', '人工智能', '数据分析'],
  icons: {
    icon: '/logo.svg'
  },
  // 添加 Open Graph 协议支持
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://formulas-ai.vercel.app/',
    title: 'Formulas AI - A tool for generating Excel formulas',
    description: 'Formulas AI is an intelligent Excel formula generation tool that leverages AI technology to help you easily create complex Excel formulas, thereby enhancing your work efficiency.',
    siteName: 'Formulas AI',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Formulas AI',
      }
    ],
  },
  // 添加 Twitter 卡片支持
  twitter: {
    card: 'summary_large_image',
    title: 'Formulas AI - A tool for generating Excel formulas',
    description: 'Formulas AI is an intelligent Excel formula generation tool that leverages AI technology to help you easily create complex Excel formulas, thereby enhancing your work efficiency.',
    images: ['/og-image.png'],
  },
  // 添加机器人元标记
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="google-adsense-account" content="ca-pub-8598116000817169"></meta>
        <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8598116000817169" crossorigin="anonymous"></Script>
        {/* 添加结构化数据 */}
        <Script
          id="schema-structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "Formulas AI",
              "description": "Formulas AI is an intelligent Excel formula generation tool that leverages AI technology to help you easily create complex Excel formulas, thereby enhancing your work efficiency.",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "All",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "author": {
                "@type": "Person",
                "name": "CrisChr"
              }
            })
          }}
        />
      </head>
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased",
        fontSans.variable
      )}>
        <I18nProvider>
          <DynamicLangUpdater />
          <Header />
          <div className="flex max-full mx-auto flex-col justify-center py-0 min-h-screen">
            <main className="flex-1 flex justify-center">
              {children}
              <Analytics />
            </main>
            <Footer />
          </div>
          <BuyMeCoffee />
        </I18nProvider>
      </body>
    </html>
  );
}
