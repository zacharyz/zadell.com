import { Playfair_Display, Itim, EB_Garamond, Inter } from "next/font/google";
import { ThemeProvider } from "@/context/ThemeContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: '--font-inter',
});

const garamond = EB_Garamond({
  subsets: ["latin"],
  variable: '--font-garamond',
  display: 'swap',
});

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: '--font-playfair',
});

const itim = Itim({ 
  weight: "400",
  subsets: ["latin"],
  variable: '--font-itim',
});

export const metadata = {
  title: "Zac Zadell | Full-Stack Developer & AI Engineer",
  description:
    "Building intelligent web applications and AI solutions. Explore my projects, insights, and development expertise.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${playfair.variable} ${itim.variable} ${inter.variable} ${garamond.variable} font-sans bg-background text-foreground transition-colors duration-300`}
      >
        <div dangerouslySetInnerHTML={{ __html: `
          <svg style="display: none;">
            <defs>
              <filter id="rough-edge">
                <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="3" result="noise" />
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" />
              </filter>
            </defs>
          </svg>
        ` }} />
        <ThemeProvider>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1 pb-16">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
