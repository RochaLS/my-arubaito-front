// app/layout.tsx
import Head from "next/head";
import { Providers } from "./providers";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Arubaito",
  openGraph: {
    title: "My Arubaito",
    description: "Get income predictions for your part-time job.",
    url: "https://www.myarubaito.com",
    siteName: "My Arubaito",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const siteUrl = "https://www.myarubaito.com";
  const ogImageUrl = "/images/card-img.png";

  console.log(siteUrl + ogImageUrl);
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
