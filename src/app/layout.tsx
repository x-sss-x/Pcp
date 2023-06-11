import "./globals.css";
import { Poppins } from "next/font/google";
import Providers from "./providers";

const inter = Poppins({
  preload: true,
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata = {
  title: "Handic App",
  description: "",
};

export default async function RootLayout(props: {
  children: React.ReactNode;
  authModal: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={"h-screen w-screen"} style={inter.style}>
        <Providers>{props.children}</Providers>
      </body>
    </html>
  );
}
