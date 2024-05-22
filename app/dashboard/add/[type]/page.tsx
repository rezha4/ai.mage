"use client"

import MediaUploader from "@/components/shared/media-uploader";
import TransformationForm from "@/components/shared/transformation-form";
import { useState } from "react";

const AddNewImage = ({ params }: { params: { type: string } }) => {
  return (
  <div className="w-full flex flex-col space-y-8 justify-center items-center">
    {/* <h1 className="sm:text-4xl underline">{params.type}</h1> */}
    <div>
      <TransformationForm
        data={null}
        type={""}
        userId={"1"}
        creditBalance={1}
        config={{}}
      />
    </div>
  </div>);
};

export default AddNewImage;
