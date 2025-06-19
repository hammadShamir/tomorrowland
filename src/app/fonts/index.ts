import localFont from "next/font/local";

// RobotoSlab for headings and important text elements
const robotoSlab = localFont({
    src: "./RobotoSlab-Bold.ttf",
    variable: "--font-primary",
    weight: "100 900",
    display: 'swap',
});

// Jost for body text and general content
const jost = localFont({
    src: "./Jost.woff",
    variable: "--font-secondary",
    weight: "100 900",
    display: 'swap',
});

// Export with more semantic names but keep original exports for compatibility
export { robotoSlab as helenehess, jost };
