"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { RxEyeClosed } from "react-icons/rx";
import { AiOutlineGoogle } from "react-icons/ai";
import { signIn } from "next-auth/react";

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

const formSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .regex(/^[a-z0-9_\.]+$/, {
      message: "Only characters A-Z, a-z and '_','.' are  acceptable.",
    }),
  email: z.string().email().trim(),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

export function SignUpForm() {
  //validation schema for form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  //onsubmit handle funtion
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  function onGooglelogin(values: z.infer<typeof formSchema>) {}

  return (
    <div className="w-1/5 space-y-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <h1 className="text-3xl text-center font-bold">Sign Up</h1>
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Email" type="email" {...field} />
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
          <Button size={"lg"} type="submit" className="w-full">
            Submit
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
