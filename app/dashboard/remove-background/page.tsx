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
import { saveImage } from "@/lib/actions/image.actions";
import { auth } from "@clerk/nextjs/server";
import { useAuth } from "@clerk/nextjs";

const formSchema = z.object({
  title: z.string(),
  publicId: z.string()
});

const RemoveBackgroundPage = () => {
  // TODO: save image, and its transformed img to mongoDB
  // TODO: width height based off of res
  const { userId } = useAuth();

  const [cldRes, setCldRes] = useState(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      publicId: ""
    },
  });

  const onUploadSuccessHandler = async (result: any) => {
    // console.log("cld result", result);
    // console.log(result.info.public_id);
    const image = {
      publicId: result?.info?.public_id,
      secureUrl: result?.info?.secure_url,
      url: result?.info?.url,
      width: result?.info?.width,
      height: result?.info?.height,
      title: "testo",
      transformationType: "removeBackground"
    }
    console.log(image);
    const addImg = await saveImage(image, userId, "/");
    if (addImg) {
      console.log(addImg);
    } else {
      console.log("fail")
    }
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // saveImage(cldRes, userId, "/");
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
                      <>
                        <div className="min-w-full flex gap-4 flex-wrap">
                          {/* <CldImage
                            className="shadow-md"
                            width={cldRes.width}
                            height={cldRes.height}
                            src={cldRes.url}
                            alt="image"
                          />
                          <div>
                            <CldImage
                              className="shadow-md"
                              width={cldRes.width}
                              height={cldRes.height}
                              src={cldRes.url}
                              alt="image"
                              removeBackground
                              
                            />
                          </div> */}
                        </div>
                        <Button type="button" onClick={() => console.log(cldRes)}>
                          Download Transformed Image
                        </Button>
                      </>
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
          <Button size="lg" type="submit" variant="secondary">Save</Button>
        </form>
        <Button onClick={() => console.log(userId)}>userid</Button>
      </Form>
    </>
  );
};

export default RemoveBackgroundPage;
