import "./globals.css";
import ClientLayout from "./clientLayout";
import { ReactNode } from "react";

export const metadata = {
  title: "mu1zi47",
  description: "mu1zi47 partfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}