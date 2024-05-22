"use client"

import MediaUploader from "@/components/shared/media-uploader";
import TransformationForm from "@/components/shared/transformation-form";
import { useAuth } from "@clerk/nextjs";
import { useState } from "react";

const AddNewImage = ({ params }: { params: { type: string } }) => {
  const { userId } = useAuth();

  return (
  <div className="w-full flex flex-col space-y-8 justify-center items-center">
    <h1 className="sm:text-3xl underline">{params.type}</h1>
    <div>
      <TransformationForm
        data={null}
        type={""}
        userId={userId}
        creditBalance={1}
        config={{}}
      />
    </div>
  </div>);
};

export default AddNewImage;
