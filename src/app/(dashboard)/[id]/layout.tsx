import { Inter } from "next/font/google";
import Header from "@/components/sub-components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Handic App",
  description: "",
};

export default function ViewPostLayout(props: {
  children: React.ReactNode;
}) {
  console.log(props)
  return (
      <div className={"h-full w-full"} style={inter.style}>
          <h1 className="py-2 border-b border-gray-300">View Post</h1>
          {props.children}
      </div>
  );
}
