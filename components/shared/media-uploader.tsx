"use client";

import { CldImage, CldUploadWidget } from "next-cloudinary";
import { useToast } from "../ui/use-toast";
import React from "react";
import { FilePlusIcon } from "@radix-ui/react-icons";
import { PlaceholderValue } from "next/dist/shared/lib/get-img-props";

type MediaUploaderProps = {
  onValueChange: (value: string) => void;
  setImage: React.Dispatch<any>;
  publicId: string;
  image: any;
  type: string;
};

const MediaUploader = ({
  onValueChange,
  setImage,
  image,
  publicId,
  type,
}: MediaUploaderProps) => {
  const { toast } = useToast();

  const onUploadSuccessHandler = (result: any) => {
    setImage((prev: any) => ({
      ...prev,
      publicId: result?.info?.public_id,
      width: result?.info?.width,
      height: result?.info?.height,
      secureURL: result?.info?.secure_url,
    }));

    onValueChange(result?.info?.public_id);

    toast({
      title: "Success uploading image",
      description: "1 credit deducted from your account",
      duration: 5000,
      className: "success-toast",
    });
  };

  const onErrorHandler = () => {
    toast({
      title: "Something went wrong while uploading",
      description: "Please try again",
      duration: 5000,
      className: "error-toast",
    });
  };

  return (
    <CldUploadWidget
      uploadPreset="rezha_aimage"
      options={{
        multiple: false,
        resourceType: "image",
      }}
      onSuccess={onUploadSuccessHandler}
      onError={onErrorHandler}
    >
      {({ open }) => (
        <div className="flex flex-col gap-4">
          {publicId ? (
            <div className="grid grid-cols-2 gap-4overflow-clip">
              <CldImage
                onClick={() => open()}
                width={image.width}
                height={image.height}
                src={image.secureURL}
                alt="image"
                sizes={"(max-width: 767px) 100vw, 50vw"}
                className="cursor-pointer"
              />
              <CldImage
                width={image.width}
                height={image.height}
                src={publicId}
                alt="image"
                sizes={"(max-width: 767px) 100vw, 50vw"}
                removeBackground
                className=""
              />
            </div>
          ) : (
            <button
              onClick={() => open()}
              className="cursor-pointer transform transition-all ease-in-out hover:scale-110 flex justify-center items-center w-60 h-96 rounded-xl shadow-xl"
            >
              <FilePlusIcon width={150} height={100} />
            </button>
          )}
        </div>
      )}
    </CldUploadWidget>
  );
};

export default MediaUploader;
