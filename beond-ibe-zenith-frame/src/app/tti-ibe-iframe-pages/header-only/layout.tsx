import type { Metadata } from "next";
import { Geist_Mono, Lato } from "next/font/google";
import "../../globals.css";

const lato = Lato({
  weight: ["300", "400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-lato",
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Header Only | Beond",
};

export default function HeaderOnlyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${lato.variable} ${geistMono.variable} h-full font-sans antialiased`}
    >
      <body className="min-h-full bg-white font-sans text-(--color-foreground)">
        {children}
      </body>
    </html>
  );
}
