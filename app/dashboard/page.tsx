"use client";

import { getAllImages } from "@/lib/actions/image.actions";
import { useAuth, useUser } from "@clerk/nextjs";
import { auth, currentUser } from "@clerk/nextjs/server";
import { CldImage } from "next-cloudinary";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const { user } = useUser();
  console.log(user);
  const [images, setImages] = useState<Array<IImage> | null>(null);
  
  useEffect(() => {
    const getAllImg = async () => {
      if (user) {
        const images = await getAllImages(user.id);
        setImages(images);
      }
    }

    getAllImg();
  }, [])

  return (
    <div>
      <h2 className="text-2xl">Welcome! {user?.username}</h2>
      <div className="grid grid-cols-4 gap-2">
        {images && images.map(img => 
          <CldImage
            key={img._id}
            alt={img.title}
            src={img.publicId}
            width={img.width}
            height={img.height}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
