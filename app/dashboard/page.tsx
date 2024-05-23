"use client";

import { getAllImages } from "@/lib/actions/image.actions";
import { useAuth } from "@clerk/nextjs";
import { auth, currentUser } from "@clerk/nextjs/server";
import { CldImage } from "next-cloudinary";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const { userId } = useAuth();
  const [images, setImages] = useState(null);
  
  useEffect(() => {
    const getAllImg = async () => {
      if (userId) {
        const images = await getAllImages(userId);
        setImages(images);
      }
    }

    getAllImg();
  }, [])

  return (
    <div>
      <h2 className="text-2xl">Welcome! {userId}</h2>
      <p className="text-wrap">{JSON.stringify(images)}</p>
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
  );
};

export default Dashboard;
