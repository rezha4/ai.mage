"use client";

import { CldImage } from 'next-cloudinary'

const AllImages = ({images}: {images: Object[]}) => {
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
