"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";

const formSchema = z.object({
  content: z.string().trim().nonempty({
    message: "Enter some content for your post",
  }),
  media_url: z.string().trim().nonempty({
    message: "Choose image typeof .jpg .png",
  }),
});

export default function NewPostModal() {
  const router = useRouter();
  const [error, setError] = useState<null | string>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
      media_url: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {};

  return (
    <Dialog
      onOpenChange={(open) => {
        if (!open) router.back();
      }}
      open={true}
    >
      <DialogContent className="absolute top-10">
        <DialogHeader>
          <DialogTitle>New Post</DialogTitle>
          <DialogDescription>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full h-full space-y-8"
              >
                {error && (
                  <div className="bg-red-500 text-white p-2 rounded-md text-center">
                    Credentials are worong !
                  </div>
                )}
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="media_url"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input type="file" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button
                    size={"lg"}
                    variant={"secondary"}
                    onClick={() => router.back()}
                  >
                    Cancel
                  </Button>
                  <Button size={"lg"}>Post</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
