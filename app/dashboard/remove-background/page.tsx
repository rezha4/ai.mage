"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import MediaUploader from "@/components/shared/media-uploader";
import { CldUploadWidget } from "next-cloudinary";

const formSchema = z.object({
  username: z.string().min(2).max(50),
  publicId: z.string(),
});

const RemoveBackgroundPage = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      publicId: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <>
      <h1 className="text-4xl">Remove BG</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="publicId"
            render={({ field }) => (
              // <MediaUploader
              //   onValueChange={field.onChange}
              //   setImage={setImage}
              //   publicId={field.value}
              //   image={image}
              //   type={type}
              // />
              <CldUploadWidget
                uploadPreset="rezha_aimage"
                options={{
                  multiple: false,
                  resourceType: "image",
                }}
                // onSuccess={onUploadSuccessHandler}
                // onError={onErrorHandler}
              >
                {({ open }) => (
                  <div className="flex flex-col gap-4">
                    <button type="button" onClick={() => open()}>open widget</button>
                  </div>
                )}
              </CldUploadWidget>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </>
  );
};

export default RemoveBackgroundPage;
