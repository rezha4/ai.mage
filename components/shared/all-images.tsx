"use client";

import { IImage } from '@/lib/database/models/image.model';
import { CldImage } from 'next-cloudinary'

const AllImages = ({images}: {images: IImage[]}) => {
  return (
    <div className="grid grid-cols-4 gap-2">
      {images.map(img => 
          <CldImage
            key={img._id}
            alt={img.title}
            src={img.publicId}
            width={img.width}
            height={img.height}
          />
        )}
    </div>
  )
}

export default AllImages
