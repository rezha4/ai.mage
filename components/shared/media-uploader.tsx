import { CldUploadWidget } from "next-cloudinary";
import { useToast } from "../ui/use-toast";
import React from "react";

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
    <div>
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
            <h3 className="text-xl">Original</h3>
            {publicId ? <>image</> : <div>nothing</div>}
          </div>
        )}
      </CldUploadWidget>
    </div>
  );
};

export default MediaUploader;
