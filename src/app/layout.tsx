import "./globals.css";
import type { Metadata } from "next";
import { Space_Grotesk, Manrope } from "next/font/google";
import Header from "./components/shared/Header";
import Footer from "./components/shared/Footer";
import Background from "./components/shared/Background";

const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-display" });
const sans = Manrope({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Data Scientist Portfolio",
  description: "Portfolio showcasing data science projects, skills, and contact information.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body
        className="font-sans antialiased"
        style={{
          // dynamic gradient inspired by modern landing pages
          // fallback for older browsers
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          "--bg-gradient": "radial-gradient(600px 300px at 0% 0%, rgba(125, 211, 252, 0.25), transparent 60%), radial-gradient(600px 300px at 100% 0%, rgba(167, 139, 250, 0.25), transparent 60%), radial-gradient(600px 300px at 100% 100%, rgba(236, 72, 153, 0.25), transparent 60%), radial-gradient(600px 300px at 0% 100%, rgba(2, 132, 199, 0.25), transparent 60%)",
        } as React.CSSProperties}
      >
        <script
          dangerouslySetInnerHTML={{
            __html: `
            (function(){
              try{
                var chosen = localStorage.getItem('siteTheme');
                if(chosen === 'mova'){
                  document.documentElement.classList.add('dark');
                  document.documentElement.classList.add('theme-mova');
                } else if(chosen === 'dark'){
                  document.documentElement.classList.add('dark');
                  document.documentElement.classList.remove('theme-mova');
                } else {
                  // light
                  var preferDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if(preferDark) document.documentElement.classList.add('dark');
                  document.documentElement.classList.remove('theme-mova');
                }
              }catch(e){}
            })();
          `,
          }}
        />
        <Background />
        <Header />
        <main className="container py-8">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

