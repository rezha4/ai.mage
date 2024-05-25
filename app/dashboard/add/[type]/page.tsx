import MediaUploader from "@/components/shared/media-uploader";
import TransformationForm from "@/components/shared/transformation-form";
import { useAuth } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { useState } from "react";

const transformOption = {
  "remove-background": {
    link: "remove-background",
    title: "Remove BG", 
    type: "removeBackground",
    subTitle: "Removes the background of the image using AI",
    config: { removeBackground: true },
  },
  restore: {
    link: "restore",
    title: "Restore Image",
    type: "restore",
    subTitle: "Restore image quality by enhancing its features, and removing noises",
    config: { restore: true },
  },
  "generative-fill": {
    link: "generative-fill",
    title: "Generative Fill",
    type: "fill",
    subTitle: "Resize image and fill the empty space with AI",
    config: { fillBackground: true },
  },
  "remove-object": {
    link: "remove-object",
    title: "Remove Objects",
    type: "remove",
    subTitle: "Remove any object with a prompt",
    config: {
      remove: { prompt: "", removeShadow: true, multiple: true },
    },
  },
  recolor: {
    link: "recolor-object",
    title: "Recolor Objects",
    type: "recolor",
    subTitle: "Recolor any object with a prompt",
    config: {
      recolor: { prompt: "", to: "", multiple: true },
    },
  },
} as const;

type TransformOptionKey = keyof typeof transformOption;

const AddNewImage = async ({
  params,
}: {
  params: { type: string };
}) => {
  const user = await currentUser();
  const userId = user?.publicMetadata.userId as string;

  const currentTransformation =
    transformOption[params.type as TransformOptionKey];

  return (
    <div className="w-full flex flex-col space-y-6 justify-center items-center">
      <div className="text-center space-y-2">
        <h1 className="sm:text-3xl underline">
          {currentTransformation.title}
        </h1>
        <p>{currentTransformation.subTitle}</p>
      </div>
      <div>
        <TransformationForm
          data={null}
          type={currentTransformation.type}
          userId={userId ?? "unkown"}
          creditBalance={1}
          configuration={currentTransformation.config}
        />
      </div>
    </div>
  );
};

export default AddNewImage;
