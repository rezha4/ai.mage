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
import { CldImage, CldUploadWidget } from "next-cloudinary";
import { useState } from "react";
import { FilePlusIcon } from "@radix-ui/react-icons";

const formSchema = z.object({
  title: z.string(),
  publicId: z.string(),
});

const RemoveBackgroundPage = () => {
  const [cldRes, setCldRes] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      publicId: "",
    },
  });

  const onUploadSuccessHandler = (result: any) => {
    console.log("cld result", result);
    console.log(result.info.public_id);
    setCldRes(result.info.public_id);
  };

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
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Image title" {...field} />
                </FormControl>
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
                onSuccess={onUploadSuccessHandler}
                // onError={onErrorHandler}
              >
                {({ open }) => (
                  <div className="flex items-center justify-center flex-col gap-4">
                    {cldRes ? (
                      <div className="flex gap-8">
                        <CldImage
                          className="shadow-md"
                          width={200}
                          height={300}
                          src={cldRes}
                          alt="image"
                        />
                        <CldImage
                          className="shadow-md"
                          width={200}
                          height={300}
                          src={cldRes}
                          alt="image"
                          removeBackground
                        />
                      </div>
                    ) : (
                      <FilePlusIcon
                        className="cursor-pointer shadow-md"
                        onClick={() => open()}
                        width={100}
                        height={200}
                      />
                    )}
                  </div>
                )}
              </CldUploadWidget>
            )}
          />
          <Button type="submit">Download</Button>
        </form>
      </Form>
    </>
  );
};

export default RemoveBackgroundPage;
