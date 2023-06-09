import "./globals.css";
import {Poppins } from "next/font/google";
import Providers from "./providers";

const inter = Poppins({ subsets: ["devanagari"],weight:"400" });

export const metadata = {
  title: "Handic App",
  description: "",
};

export default function RootLayout(props: {
  children: React.ReactNode;
  authModal: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={"h-screen w-screen"} style={inter.style}>
        <Providers>
          {props.children}
        </Providers>
      </body>
    </html>
  );
}
