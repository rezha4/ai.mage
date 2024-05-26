"use client";

import { CldImage, CldUploadWidget } from "next-cloudinary";
import { useToast } from "../ui/use-toast";
import React, { useEffect, useState } from "react";
import { FilePlusIcon } from "@radix-ui/react-icons";
import { PlaceholderValue } from "next/dist/shared/lib/get-img-props";
import { aspectRatioStateType } from "./transformation-form";
import {
  getUserById,
  updateCredits,
} from "@/lib/actions/user.actions";
import { useUser } from "@clerk/nextjs";
import { Button } from "../ui/button";

type MediaUploaderProps = {
  onValueChange: (value: string) => void;
  setImage: React.Dispatch<any>;
  publicId: string;
  image: any;
  type: string;
  transform: boolean;
  aspectRatio: aspectRatioStateType;
  setUploadLoading: React.Dispatch<any>;
};

const MediaUploader = ({
  onValueChange,
  setImage,
  image,
  publicId,
  type,
  transform,
  aspectRatio,
  setUploadLoading,
}: MediaUploaderProps) => {
  const { toast } = useToast();
  const { user } = useUser();
  const [isTransforming, setIstransforming] = useState(true);

  const onUploadSuccessHandler = async (result: any) => {
    try {
      if (user) {
        const currentUser = await getUserById(
          user.publicMetadata.userId as string
        );
        if (currentUser.creditBalance <= 0) {
          throw new Error("Insufficient credit");
        }
        await updateCredits(user.publicMetadata.userId as string, -1);
      }
      setImage((prev: any) => ({
        publicId: result?.info?.public_id,
        width: result?.info?.width,
        height: result?.info?.height,
        secureUrl: result?.info?.secure_url,
        transformationType: type,
      }));

      onValueChange(result?.info?.public_id);

      setUploadLoading(false);
    } catch (error) {
      console.error(error);
    } finally {
      toast({
        title: "Success uploading image",
        description: "1 credit deducted from your account",
        duration: 5000,
        className: "success-toast",
      });
    }
  };

  const onErrorHandler = () => {
    toast({
      title: "Something went wrong while uploading",
      description: "Please try again",
      duration: 5000,
      className: "error-toast",
    });
  };

  useEffect(() => {
    console.log("image", image);
  }, [image]);

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
      {({ open, isLoading }) => (
        <div className="flex flex-col gap-4">
          {publicId ? (
            <div className="grid grid-cols-2 gap-4 overflow-clip">
              <CldImage
                onClick={() => open()}
                width={image.width}
                height={image.height}
                src={publicId}
                alt="image"
                sizes={"(max-width: 767px) 100vw, 50vw"}
                className="cursor-pointer"
              />
              {image.config && (
                <div className="">
                  {isTransforming && <p>Transforming...</p>}
                    <CldImage
                      width={
                        aspectRatio ? aspectRatio.width : image.width
                      }
                      height={
                        aspectRatio
                          ? aspectRatio.height
                          : image.height
                      }
                      src={publicId}
                      alt="image"
                      sizes={"(max-width: 767px) 100vw, 50vw"}
                      className=""
                      onLoad={() => {
                        console.log("loaded")
                        setIstransforming(false)
                      }}
                      {...image.config}
                    />
                  
                </div>
              )}
            </div>
          ) : (
            <Button onClick={() => open()}>
              {isLoading ? (
                <p>loading...</p>
              ) : (
                <span className="flex items-center">
                  <FilePlusIcon width={20} /> Upload
                </span>
              )}
            </Button>
          )}
        </div>
      )}
    </CldUploadWidget>
  );
};

export default MediaUploader;
