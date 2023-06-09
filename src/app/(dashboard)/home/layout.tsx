import Header from "@/components/sub-components/Header";
import RightBar from "@/components/sub-components/RightBar";

export const metadata = {
  title: "Handic App",
  description: "",
};

export default async function RootLayout(props: { children: React.ReactNode }) {
  return (
    <div className={"h-full w-full grid"} style={{gridTemplateColumns:"2fr 1fr"}}>
      <section aria-label="post-container block">
        <Header title="Home"/>
         {props.children}
      </section>  
      <RightBar/>
    </div>
  );
}
