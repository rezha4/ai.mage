"use client";

import TransformationForm from "@/components/shared/transformation-form";
import { Button } from "@/components/ui/button";
import { getImage } from "@/lib/actions/image.actions";
import { IImage } from "@/lib/database/models/image.model";
import { download } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";
import { CldImage, getCldImageUrl } from "next-cloudinary";
import { useEffect, useState } from "react";

const ImageDetails = ({ params }: { params: { id: string } }) => {
  const [image, setImage] = useState<IImage | null>(null);

  useEffect(() => {
    const fetchDatas = async () => {
      const i = await getImage(params.id);
      setImage(i);
    };
    // const user = await currentUser();
    // const userId = user?.publicMetadata.userId;
    fetchDatas();
  }, []);

  const downloadImage = () => {
    if (image) {
      download(
        getCldImageUrl({
          width: image?.width,
          height: image?.height,
          src: image?.publicId,
          ...image.config,
        }),
        image.title
      );
    }
  };

  return (
    <div>
      {image && <h1 className="text-2xl">{image.title}</h1>}
      {image && (
        <div className="container mx-auto p-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <p>original upload:</p>
            <div className="overflow-auto">
              <CldImage
                width={image.width}
                height={image.height}
                src={image.publicId}
                alt="image"
                sizes="(max-width: 767px) 100vw, 50vw"
              />
            </div>
          </div>
          <div className="text-center">
            <p>transformation applied:</p>
            <div className="overflow-auto">
              <CldImage
                width={image.width}
                height={image.height}
                src={image.publicId}
                alt="image"
                sizes="(max-width: 767px) 100vw, 50vw"
                {...image.config}
              />
            </div>
          </div>
        </div>
        <Button className="w-full my-4" onClick={downloadImage}>Download</Button>
      </div>
      )}
    </div>
  );
};

export default ImageDetails;
