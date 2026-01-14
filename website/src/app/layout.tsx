import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import AudioPlayer from "@/components/AudioPlayer";

export const metadata: Metadata = {
  title: "Aryan Bajracharya",
  description: "A professional portfolio showcasing my work and skills.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          {children}
          <AudioPlayer />
        </ThemeProvider>
      </body>
    </html>
  );
}
