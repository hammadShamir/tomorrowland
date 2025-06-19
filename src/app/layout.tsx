import type { Metadata } from "next";
import { helenehess, jost } from "./fonts";
import "./globals.css";
import { Toaster } from 'react-hot-toast';
import { Suspense } from "react";
import { SearchParamsProvider } from "@/components/SearchParamsProvider";

export const metadata: Metadata = {
  title: "Get Tomorrowland Tickets",
  description: "The Best way to get your Tomorrowland tickets!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`bg-background ${helenehess.variable} ${jost.variable} antialiased font-secondary`}
      >
        <script defer src="https://umami.azlanmalik.me/script.js" data-website-id="7bfdd1c5-4df2-47dc-9322-da5a2250aa0a"></script>
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{
            // Increased duration for all toasts
            duration: 6000,
            // Base style for all toasts
            style: {
              background: 'rgba(237, 242, 244, 0.95)', // Primary color with transparency
              color: '#064789', // Foreground color
              padding: '16px',
              borderRadius: '12px',
              fontWeight: '500',
              fontSize: '16px',
              boxShadow: '0 4px 15px rgba(6, 71, 137, 0.1)', // Shadow with foreground color
              maxWidth: '400px',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(237, 242, 244, 0.8)',
              fontFamily: 'var(--font-secondary), sans-serif',
            },
            // Success toast styling
            success: {
              iconTheme: {
                primary: '#427aa1', // Secondary color for icon
                secondary: '#ffffff', // White color for contrast
              },
              style: {
                borderLeft: '6px solid #427aa1', // Secondary color border
              },
            },
            error: {
              duration: 8000, // Longer duration for errors
              iconTheme: {
                primary: '#e11d48', // More vibrant red for icon
                secondary: '#ffffff', 
              },
              style: {
                background: 'rgba(254, 226, 226, 0.98)', // Stronger red background
                borderLeft: '6px solid #e11d48', // Brighter red error indicator
                color: '#991b1b', // Dark red text color for better contrast
                padding: '18px 20px',
                fontSize: '17px',
                fontWeight: '600',
                maxWidth: '450px',
                boxShadow: '0 8px 20px rgba(220, 38, 38, 0.2)', // Red-tinted shadow
                border: '1px solid rgba(248, 113, 113, 0.4)', // Light red border all around
              },
            },
          }}
        />
        <Suspense fallback={<div>Loading...</div>}>
          <SearchParamsProvider>
            {children}
          </SearchParamsProvider>
        </Suspense>
      </body>
    </html>
  );
}
