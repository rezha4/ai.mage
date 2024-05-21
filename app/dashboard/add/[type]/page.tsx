import React from "react";

const AddNewImage = ({ params }: { params: { type: string } }) => {
  return <div>{params.type}</div>;
};

export default AddNewImage;
