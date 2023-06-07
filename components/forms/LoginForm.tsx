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
import {signIn, signOut} from "next-auth/react"

const formSchema = z.object({
  username: z.string().trim(),
  password: z.string().trim()
});

export function LoginForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-1/5">
        <h1 className="text-3xl text-center font-bold">Sign In</h1>
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
        <Button onClick={()=>signIn()} size={"lg"} type="submit" className="w-full">
          Submit
        </Button>
        <Button onClick={()=>signIn("google").catch((e)=>{
          console.log(e)
        })} variant={"ghost"} className="w-full bg-black py-2 text-white gap-2 flex items-center justify-center rounded-md px-3">
          <AiOutlineGoogle className="text-3xl text-primary" /><span>Google</span>
        </Button>
        <Button onClick={()=>signOut().catch((e)=>{
          console.log(e)
        })} variant={"ghost"} className="w-full bg-black py-2 text-white gap-2 flex items-center justify-center rounded-md px-3">
          <AiOutlineGoogle className="text-3xl text-primary" /><span>Signout</span>
        </Button>
      </form>
    </Form>
  );
}
