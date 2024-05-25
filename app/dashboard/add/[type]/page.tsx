"use client"

import MediaUploader from "@/components/shared/media-uploader";
import TransformationForm from "@/components/shared/transformation-form";
import { useAuth } from "@clerk/nextjs";
import { useState } from "react";

const transformOption = {
  "remove-background": {
    link: "remove-background",
    type: "removeBackground",
    subTitle: "Removes the background of the image using AI",
    config: { removeBackground: true },
  },
  "restore": {
    link: "restore",
    type: "restore",
    subTitle: "Refine images by removing noise and imperfections",
    config: { restore: true },
  },
  "generative-fill": {
    link: "generative-fill",
    type: "fill",
    subTitle: "Enhance an image's dimensions using AI outpainting",
    config: { fillBackground: true },
  },
  "remove-object": {
    link: "remove-object",
    type: "remove",
    subTitle: "Identify and eliminate objects from images",
    config: {
      remove: { prompt: "", removeShadow: true, multiple: true },
    },
  },
  "recolor": {
    link: "recolor-object",
    type: "recolor",
    subTitle: "Identify and recolor objects from the image",
    config: {
      recolor: { prompt: "", to: "", multiple: true },
    },
  }
}

const AddNewImage = ({ params }: { params: { type: string } }) => {
  const { userId } = useAuth();

  const currentTransformation = transformOption[params.type];
  console.log(currentTransformation);

  return (
  <div className="w-full flex flex-col space-y-8 justify-center items-center">
    <h1 className="sm:text-3xl underline">{params.type}</h1>
    <div>
      <TransformationForm
        data={null}
        type={currentTransformation.type}
        userId={userId ?? "unkown"}
        creditBalance={1}
        configuration={currentTransformation.config}
      />
    </div>
  </div>);
};

export default AddNewImage;
