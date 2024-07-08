// app/layout.tsx
import Head from "next/head";
import { Providers } from "./providers";
import { Metadata } from "next";

const metadataBase = new URL("https://www.myarubaito.com");

export const metadata: Metadata = {
  title: "My Arubaito",
  metadataBase: metadataBase,
  openGraph: {
    title: "My Arubaito",
    description: "Get income predictions for your part-time job.",
    url: "https://www.myarubaito.com",
    siteName: "My Arubaito",
    images: [
      {
        url: "https://www.myarubaito.com/images/card-img.png",
        width: 800,
        height: 600,
      },
    ],
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
      <Head>
        {/* Open Graph meta tags */}

        <title>My Arubaito</title>
        <meta name="title" content="My Arubaito" />
        <meta
          name="description"
          content="Get income predictions for your part-time job."
        />

        {/* <meta property="og:type" content="website" />
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
        <meta name="twitter:image" content={siteUrl + ogImageUrl} /> */}
      </Head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
