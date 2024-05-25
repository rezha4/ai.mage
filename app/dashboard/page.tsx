import AllImages from "@/components/shared/all-images";
import { getAllImages } from "@/lib/actions/image.actions";
import { currentUser } from "@clerk/nextjs/server";
import { CldImage } from "next-cloudinary";

const Dashboard = async () => {
  const user = await currentUser();
  const images = await getAllImages(user?.publicMetadata.userId);

  return (
    <div>
      <h2 className="text-2xl">
        Welcome! {user?.username}, you have
      </h2>

      <AllImages images={images} />
    </div>
  );
};

export default Dashboard;
