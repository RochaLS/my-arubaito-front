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
  const ogImageUrl = "/public/images/card-img.png";
  return (
    <html lang="en">
      <Head>
        {/* Open Graph meta tags */}

        <title>My Arubaito</title>
        <meta name="title" content="My Arubaito" />
        <meta
          name="description"
          content="Get income predictions for your part-time job."
        />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.myarubaito.com/" />
        <meta property="og:title" content="My Arubaito" />
        <meta
          property="og:description"
          content="Get income predictions for your part-time job."
        />
        <meta property="og:image" content={siteUrl + ogImageUrl} />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://www.myarubaito.com/" />
        <meta property="twitter:title" content="My Arubaito" />
        <meta
          property="twitter:description"
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
