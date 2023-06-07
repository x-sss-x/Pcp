import "./globals.css";
import { Inter } from "next/font/google";
import Providers from "./providers";
import Header from "@/components/sub-components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Handic App",
  description: "",
};

export default function RootLayout(props: {
  children: React.ReactNode;
  authModal: React.ReactNode;
}) {
  console.log(props)
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
