
import { Footer } from "../components/Footer.jsx";
import { Header } from "../components/Header.jsx";
import { Inter as FontSans } from "next/font/google"
import { cn } from "../lib/utils"
import { I18nProvider } from './i18n'
import "../styles/globals.css";
import "../styles/loading.css";

export const metadata = {
  title: "Formulas AI",
  description: "Generated by create next app",
  icons: {
    icon: '/logo.svg'
  }
};

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased",
        fontSans.variable
      )}>
        <I18nProvider>
          <Header />
          <div className="flex max-full mx-auto flex-col justify-center py-0 min-h-screen">
            <main className="flex-1 flex justify-center">{children}</main>
            <Footer />
          </div>
        </I18nProvider>
      </body>
    </html>
  );
}
