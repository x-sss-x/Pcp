"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { RxEyeClosed } from "react-icons/rx";
import { AiOutlineGoogle } from "react-icons/ai";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const formSchema = z.object({
  userId: z.string().trim().nonempty({
    message: "this field must be fill",
  }),
  password: z.string().trim().nonempty({
    message: "this field must be fill",
  }),
});

export function LoginForm() {
  const error = useSearchParams().get("error");
  const [isLoading, setIsLoading] = useState(false);
  const session = useSession();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userId: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    const response = await signIn("credentials", {
      userId: values.userId,
      password: values.password,
    });
    setIsLoading(false);
  }

  return (
    <div className="w-1/5 space-y-4">
      <Form {...form}>
        <pre>{JSON.stringify(session)}</pre>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full h-full space-y-8"
        >
          {error && (
            <div className="bg-red-500 text-white p-2 rounded-md text-center">
              Credentials are worong !
            </div>
          )}
          <h1 className="text-3xl text-center font-bold">Sign In</h1>
          <FormField
            control={form.control}
            name="userId"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Username or Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    rightIcon={<RxEyeClosed />}
                    type="password"
                    placeholder="Password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            size={"lg"}
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? "Signing..." : "SingIn"}
          </Button>
        </form>
      </Form>
      <Button
        onClick={() =>
          signIn("google").catch((e) => {
            console.log(e);
          })
        }
        variant={"ghost"}
        className="w-full bg-black py-2 text-white gap-2 flex items-center justify-center rounded-md px-3"
      >
        <AiOutlineGoogle className="text-3xl text-primary" />
        <span>Google</span>
      </Button>
    </div>
  );
}
