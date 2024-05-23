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
import { saveImage } from "@/lib/actions/image.actions";
import { download } from "@/lib/utils";
import { getCldImageUrl } from "next-cloudinary";

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

  const downloadImage = () => {
    console.log("dwonao")
    if (image) {
      download(getCldImageUrl({
        width: image?.width,
        height: image?.height,
        src: image?.publicId,
        removeBackground: true
      }), "title")
    }
  }

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

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("form val", values)
    console.log(values.title)
    const newImage = {
      ...image,
      title: values.title,
      transformationType: type
    }
    const addImg = await saveImage(newImage, userId, "/dashboard");
    console.log("addImg res", addImg)
    console.log("image state", image)
    if (addImg) {
      console.log(addImg);
    } else {
      console.log("fail")
    }
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
          <Button onClick={() => downloadImage()} disabled={!image} type="button">Download</Button>
          <Button disabled={!image} type="submit">Save</Button>
        </div>
      </form>
    </Form>
  );
};

export default TransformationForm;
