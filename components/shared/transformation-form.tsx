"use client";

import { IImage } from "@/lib/database/models/image.model";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { number, z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "../ui/form";
import MediaUploader from "./media-uploader";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Transformations } from "@/types";
import { saveImage } from "@/lib/actions/image.actions";
import { download } from "@/lib/utils";
import { getCldImageUrl } from "next-cloudinary";
import { Select, SelectTrigger } from "@radix-ui/react-select";
import { SelectContent, SelectItem, SelectValue } from "../ui/select";

export const formSchema = z.object({
  title: z.string(),
  aspectRatio: z.string().optional(),
  color: z.string().optional(),
  prompt: z.string().optional(),
  publicId: z.string(),
});

export type aspectRatioStateType = {
  width: number;
  height: number;
}

const TransformationForm = ({
  data = null,
  userId,
  type,
  creditBalance,
  configuration,
}: {
  data: IImage | null;
  userId: string;
  type: string;
  creditBalance: number;
  configuration: Transformations;
}) => {
  const [image, setImage] = useState<any>(data);
  const [transform, setTransform] = useState(false);
  const [aspectRatioState, setAspectRatioState] = useState<aspectRatioStateType | null>(null);

  const downloadImage = () => {
    console.log("downloading...");
    if (image) {
      download(
        getCldImageUrl({
          width: image?.width,
          height: image?.height,
          src: image?.publicId,
          ...image.config,
        }),
        "title"
      );
    }
  };

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
    console.log("form val", values);

    console.log(values.title);
    const newImage = {
      ...image,
      title: values.title,
      transformationType: type,
      config: {
        ...(type === "recolor" || type === "remove" ? {
          [type]: {
            ...configuration[type],
            prompt: values.prompt,
            ...(type === "recolor" && {
              to: values.color,
            })
          }
        } : {...configuration})
      },
    };

    setImage((prev: any) => ({
      ...prev,
      ...newImage,
    }));

    const ratio = {
      portrait: {
        width: 500,
        height: 1200
      },
      landscape: {
        width: 1200,
        height: 500
      }
    }
    
    if (values.aspectRatio === "portrait" || values.aspectRatio === "landscape")
      setAspectRatioState(ratio[values.aspectRatio]);

    console.log("newImage:", newImage);
    const addImg = await saveImage(newImage, userId, "/dashboard");
    console.log("addImg res", addImg);
    console.log("image state", image);
    if (addImg) {
      console.log(addImg);
      setTransform(true);
    } else {
      console.log("fail");
    }
  };

  useEffect(() => {
    console.log("image", image);
  }, [image]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
      >
        {/* Media Uploader TODO: DRAG AND DROP */}
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
                transform={transform}
                aspectRatio={aspectRatioState!}
              />
            </FormItem>
          )}
        />

        {/* Input Fields */}
        <div>
          {/* Prompt Field */}
          {(type === "remove" || type === "recolor") && (
            <FormField
              control={form.control}
              name="prompt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Object to {type === "remove" ? <span>Remove</span> : <span>Recolor</span>}</FormLabel>
                  <Input {...field} />
                </FormItem>
              )}
            />
          )}

          {/* Recolor to */}
          {(type === "recolor") && (
            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color</FormLabel>
                  <Input {...field} />
                </FormItem>
              )}
            />
          )}

          {/* Aspect Ratio */}
          {type === "fill" && (
            <FormField
              control={form.control}
              name="aspectRatio"
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="font-semibold select-field w-full border rounded-md p-2 mb-2">
                    <SelectValue className="font-semibold" placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="landscape">Landscape</SelectItem>
                    <SelectItem value="portrait">Portrait</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          )}

          {/* Title Field */}
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
        </div>

        {/* Buttons */}
        <div className="flex flex-col space-y-4">
          <Button
            onClick={() => downloadImage()}
            disabled={!image}
            type="button"
          >
            Download
          </Button>
          <Button disabled={!image} type="submit">
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default TransformationForm;
