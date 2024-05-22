"use client";

import { IImage } from "@/lib/database/models/image.model";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormField, FormItem, FormLabel } from "../ui/form";
import MediaUploader from "./media-uploader";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Transformations } from "@/types";

export const formSchema = z.object({
  title: z.string(),
  aspectRatio: z.string().optional(),
  color: z.string().optional(),
  prompt: z.string().optional(),
  publicId: z.string(),
});

const TransformationForm = ({
  data = null,
  userId,
  type,
  creditBalance,
  config = null,
}: {
  data: IImage | null;
  userId: string;
  type: string;
  creditBalance: number;
  config: Transformations | null;
}) => {
  const [image, setImage] = useState(data);

  const initialValues = data
    ? {
        title: data?.title,
        aspectRatio: data?.aspectRatio,
        color: data?.color,
        prompt: data?.prompt,
        publicId: data?.publicId,
      }
    : {
        title: "",
        aspectRatio: "",
        color: "",
        prompt: "",
        publicId: "",
      };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues,
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
      >
        <FormField
          control={form.control}
          name="publicId"
          render={({ field }) => (
            <FormItem>
              <MediaUploader
                image={image}
                setImage={setImage}
                onValueChange={field.onChange}
                publicId={field.value}
                type={type}
              />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <Input {...field} />
            </FormItem>
          )}
        />
        <div className="flex flex-col space-y-4">
          <Button type="button">Download</Button>
          <Button type="submit">Save</Button>
        </div>
      </form>
    </Form>
  );
};

export default TransformationForm;
