import type React from "react"
import type { Metadata } from "next"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

export const metadata: Metadata = {
  title: {
    default: "NoteDrop - Web3 Airdrop Database & Crypto Project Tracker",
    template: "%s | NoteDrop - Web3 Airdrop Platform",
  },
  description: "Discover, track, and claim the latest Web3 airdrops, blockchain projects, and crypto token distributions. Your comprehensive database for decentralized finance opportunities.",
  keywords: [
    "Web3 airdrops",
    "blockchain airdrops",
    "crypto token distribution",
    "DeFi projects",
    "crypto rewards",
    "blockchain ecosystem",
    "airdrop tracker",
    "crypto giveaways"
  ],
  openGraph: {
    title: "NoteDrop - Web3 Airdrop Database & Tracker",
    description: "Your comprehensive guide to blockchain airdrops and Web3 projects",
    url: "https://notedrop.xyz/",
    siteName: "NoteDrop",
    images: [
      {
        url: "https://www.notedrop.xyz/favicon.png",
        width: 1200,
        height: 630,
        alt: "NoteDrop Web3 Airdrop Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NoteDrop - Web3 Airdrop Database & Tracker",
    description: "Track and discover the latest blockchain airdrops & Web3 projects",
    creator: "@notedrop",
    images: ["https://www.notedrop.xyz/favicon.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  manifest: "/site.webmanifest",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#1a1a1a" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
  alternates: {
    canonical: "https://www.notedrop.xyz",
  },
  verification: {
    google: "google-site-verification=r6FNvjUo1xmzuKi294_0aLwFmNa-a1VbaRVRdpS0y7o",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link
          rel="icon"
          href="/icon?<generated>"
          type="image/<generated>"
          sizes="<generated>"
        />
        <link
          rel="apple-touch-icon"
          href="/apple-icon?<generated>"
          type="image/<generated>"
          sizes="<generated>"
        />
      </head>
      <body className="min-h-screen flex flex-col">
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "NoteDrop",
              "url": "https://www.notedrop.xyz/",
              "description": "Comprehensive Web3 airdrop database and blockchain project tracker",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://www.notedrop.xyz/search?q={search_term}",
                "query-input": "required name=search_term"
              }
            })
          }}
        />
        
        <ThemeProvider 
          attribute="class" 
          defaultTheme="dark" 
          enableSystem 
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
