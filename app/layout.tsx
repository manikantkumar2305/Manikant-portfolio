import type { Metadata } from "next";
import { Inter, Instrument_Serif, Caveat } from "next/font/google";
import SmoothScroll from "@/components/layout/SmoothScroll";
import { LanguageProvider } from "@/lib/i18n";
import { SITE_URL, PERSON } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-ui",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-script",
});

const DESCRIPTION =
  "Product Designer crafting UX for climate-tech and AI products — where design, data, and business strategy meet. Based in Antibes, France.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Manikant Kumar",
    template: "%s",
  },
  description: DESCRIPTION,
  openGraph: {
    title: "Manikant Kumar",
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: "Manikant — Portfolio",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Manikant Kumar",
    description: DESCRIPTION,
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: PERSON.name,
  jobTitle: PERSON.jobTitle,
  email: `mailto:${PERSON.email}`,
  address: { "@type": "PostalAddress", addressLocality: "Antibes", addressCountry: "FR" },
  url: SITE_URL,
  sameAs: PERSON.sameAs,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${instrumentSerif.variable} ${caveat.variable}`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(() => {
              const reset = () => {
                if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
                window.scrollTo(0, 0);
              };
              reset();
              window.addEventListener('beforeunload', reset);
              window.addEventListener('pagehide', reset);
              window.addEventListener('load', reset, { once: true });
              window.addEventListener('pageshow', reset);
              requestAnimationFrame(reset);
              setTimeout(reset, 0);
              setTimeout(reset, 50);
            })();`,
          }}
        />
      </head>
      <body>
        <LanguageProvider>
          <SmoothScroll>{children}</SmoothScroll>
        </LanguageProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </body>
    </html>
  );
}
