import { Inter } from "next/font/google";
import Header from "@/components/sub-components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Handic App",
  description: "",
};

export default function RootLayout(props: {
  children: React.ReactNode;
}) {
  console.log(props);
  return (
    <div className={"h-full w-full"} style={inter.style}>
      <Header />
      {props.children}
    </div>
  );
}
