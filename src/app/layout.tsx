import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import 'react-datepicker/dist/react-datepicker.min.css'
import { ClerkProvider } from "@clerk/nextjs";
  import { Toaster } from "@/components/ui/sonner"


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ZUNO",
  description: "Video Calling App",
  icons:'/assets/icon.png'
};

const clerkAppearance = {
  layout: {
    // socialButtonsVariant: "iconButton",
    logoImageUrl: "/assets/zuno-logo.png",
  },
  variables: {
    colorText: "#FFFFFF",
    colorPrimary: "#0E78F9",              // Accent color (bright blue)
    colorBackground: "#1C1F2E",           // Main background
    colorInputBackground: "#252A41",      // Inputs stand out slightly
    colorInputText: "#FFFFFF",            // High-contrast input text
    colorBorder: "#3A3E5A",               // Subtle borders for inputs
    colorMutedText: "#A1A4B7",            // Placeholder/label text
    colorDanger: "#FF5C5C",               // Error red
    colorSuccess: "#22C55E",              // Success green
    colorButtonText: "#FFFFFF",           // Ensures buttons are readable
  },
  elements: {
    card: {
      boxShadow: "0 8px 24px rgba(0,0,0,0.45)", // Gives it depth
      borderRadius: "12px",
      padding: "24px",
    },
    formButtonPrimary: {
      backgroundColor: "#0E78F9",
      color: "#FFFFFF",
      fontWeight: "600",
      borderRadius: "8px",
      ':hover': {
        backgroundColor: "#0A5FC0",
      },
    },
    socialButtonsBlockButton: {
      backgroundColor: "#252A41",
      border: "1px solid #3A3E5A",
      color: "#FFFFFF",
      borderRadius: "8px",
      ':hover': {
        backgroundColor: "#2F3551",
      },
    },
    dividerText: {
      color: "#6C7088",
    },
    footer: {
      color: "#666A82",
    },
    userButtonPopoverActionButton: {
      backgroundColor: "#1F2333",
      color: "#FFFFFF",
      fontWeight: "500",
      borderRadius: "6px",
      padding: "10px 14px",
      ':hover': {
        backgroundColor: "#2A2F45", 
        color: "#FFFFFF" 
      },
    },
    userButtonPopoverFooter: {
      backgroundColor: "#1C1F2E",
    },
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    <html lang="en">
      <ClerkProvider
       appearance={clerkAppearance}
      >

        <body
          className={`bg-[#161925] text-white ${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {children}
            <Toaster
             position="top-center"
             richColors 
            />
        </body>
      </ClerkProvider>
    </html>
  );
}
