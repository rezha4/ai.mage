"use client";

import { IImage } from '@/lib/database/models/image.model';
import { CldImage } from 'next-cloudinary'
import Link from 'next/link';

const AllImages = ({images}: {images: IImage[]}) => {
  return (
    <div className="grid grid-cols-4 gap-2">
      {images.map((img) => (
        <Link href={`/dashboard/${img._id}`} key={img._id} className="pointer-cursor">
          <CldImage
            alt={img.title}
            src={img.publicId}
            width={img.width}
            height={img.height}
          />
        </Link>
      ))}
    </div>
  );
}

export default AllImages
