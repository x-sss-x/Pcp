import "./globals.css";
import { Inter, Source_Sans_Pro} from "next/font/google";
import Providers from "./providers";

const inter = Source_Sans_Pro({ subsets: ["latin"],weight:"400"});

export const metadata = {
  title: "Handic App",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={"h-[100vh] w-[100vw]"} style={inter.style}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
