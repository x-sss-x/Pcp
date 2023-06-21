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
import { useRef, useState } from "react";
import { SupaClient } from "@/utils/supabase";
import { useSession } from "next-auth/react";
import { useAppDispatch } from "@/hooks";
import { Spinner } from "../ui/spinner";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

const formSchema = z.object({
  title: z.string().trim().nonempty({
    message: "This field is required",
  }),
  description: z
    .string()
    .trim()
    .nonempty({
      message: "This field is required",
    })
    .min(20, "description must be 20 characters or above"),
  qualification: z.string().trim().nonempty({
    message: "This field is required",
  }),
  experience: z.string().trim().nonempty({
    message: "This field is required",
  }),
  location: z.string().trim().nonempty({
    message: "This field is required",
  }),
  salary: z.string().nonempty({
    message: "This field is required",
  }),
});

export default function NewJobPostModal() {
  const router = useRouter();
  const [isUploading, setIsUploading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
      experience: "",
      location: "",
      qualification: "",
      salary: "600",
      title: "",
    },
  });
  const session = useSession();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsUploading(true);
    try {
      await SupaClient.from("Jobs").insert({
        description: values.description,
        experience: values.experience,
        location: values.location,
        qualification: values.qualification,
        title: values.title,
        salary: +values.salary,
        userId: session.data?.user?.id,
      });
      router.back();
      router.refresh();
    } catch (e) {}
    setIsUploading(false);
  };

  return (
    <Dialog
      onOpenChange={(open) => {
        if (!open) router.back();
      }}
      open={true}
    >
      <DialogContent className="absolute top-10">
        <DialogHeader>
          <DialogTitle>New Job Post</DialogTitle>
          <DialogDescription>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full h-full space-y-4 py-5"
              >
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex flex-col w-full gap-1">
                          <Label>Title</Label>
                          <Input {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex flex-col w-full gap-1">
                          <Label>Description</Label>
                          <Textarea {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="experience"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex flex-col w-full gap-1">
                          <Label>Experience</Label>
                          <Input {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="qualification"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex flex-col w-full gap-1">
                          <Label>Qualification</Label>
                          <Input {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-evenly gap-4">
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="flex flex-col w-full gap-1">
                            <Label>Location</Label>
                            <Input {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="salary"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="flex flex-col w-full gap-1">
                            <Label>Salary</Label>
                            <Input type="number" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <DialogFooter className="py-4">
                  <Button
                    size={"lg"}
                    variant={"secondary"}
                    onClick={() => router.back()}
                  >
                    Cancel
                  </Button>
                  <Button
                    disabled={isUploading}
                    variant={isUploading ? "secondary" : "default"}
                    size={"lg"}
                  >
                    {isUploading ? <Spinner /> : "Post"}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
