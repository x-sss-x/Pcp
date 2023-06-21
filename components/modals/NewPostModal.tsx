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
import Image from "next/image";
import { SupaClient } from "@/utils/supabase";
import { useSession } from "next-auth/react";
import { useAppDispatch } from "@/hooks";
import { addOnePost, fetchIntialPosts } from "@/store/post.slice";
import { Spinner } from "../ui/spinner";

const formSchema = z.object({
  content: z.string().trim().nonempty({
    message: "Enter some content for your post",
  }),
});

export default function NewPostModal() {
  const router = useRouter();
  const [error, setError] = useState<null | string>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [file, setFile] = useState<null | File>(null);
  const [previewUrl, setPreviewUrl] = useState<null | string>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  });
  const fileref = useRef<null | HTMLInputElement>(null);
  const session = useSession();
  const dispatch = useAppDispatch();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsUploading(true);
    try {
      if (file && session.data?.user) {
        const post = await SupaClient.from("Post")
          .insert({
            media_url: "",
            userId: session.data?.user?.id,
            content: values.content,
          })
          .select("id")
          .single();

        if (post.data) {
          const posterResponse = await SupaClient.storage
            .from("posts")
            .upload(`/p/${post.data.id}`, file, { upsert: true });
          const posterPath = posterResponse.data?.path;
          await SupaClient.from("Post")
            .update({
              media_url: posterPath,
            })
            .eq("id", post.data.id);
          router.back();
          router.refresh();
        }
      }
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
                <div
                  onClick={() => fileref.current?.click()}
                  className="w-full h-[280px] relative overflow-hidden rounded-sm cursor-pointer"
                >
                  <Image
                    alt="Production Poster"
                    src={previewUrl ?? "/default.png"}
                    fill
                  />
                </div>
                <FormControl hidden>
                  <Input
                    hidden
                    ref={(refInput) => (fileref.current = refInput)}
                    type="file"
                    onChange={(e) => {
                      if (e?.target?.files?.[0]) {
                        const reader = new FileReader();

                        reader.readAsDataURL(e.target.files[0]);

                        reader.onloadend = (e) => {
                          setPreviewUrl(reader.result as string);
                        };

                        setFile(e.target.files[0]);
                      }
                    }}
                  />
                </FormControl>
                <DialogFooter>
                  <Button
                    size={"lg"}
                    variant={"secondary"}
                    onClick={() => router.back()}
                  >
                    Cancel
                  </Button>
                  <Button
                    disabled={!file || isUploading}
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
