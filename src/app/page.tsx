import { LoginForm } from "@/components/forms/LoginForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    <main className="flex flex-col h-[100vh] items-center justify-center p-24 w-full">
      <LoginForm/>
    </main>
  );
}
