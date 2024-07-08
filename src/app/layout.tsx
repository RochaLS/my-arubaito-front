// app/layout.tsx
import Head from "next/head";
import { Providers } from "./providers";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Arubaito",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const siteUrl = "https://www.myarubaito.com";
  const ogImageUrl = "/images/card-img.png";
  return (
    <html lang="en">
      <Head>
        {/* Open Graph meta tags */}
        <meta property="og:url" content={siteUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="My Arubaito" />
        <meta
          property="og:description"
          content="Get income predictions for your part-time job."
        />
        <meta property="og:image" content={siteUrl + ogImageUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@lsrocha_dev" />
        <meta name="twitter:title" content="My Arubaito" />
        <meta
          name="twitter:description"
          content="Get income predictions for your part-time job."
        />
        <meta name="twitter:image" content={siteUrl + ogImageUrl} />
      </Head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
