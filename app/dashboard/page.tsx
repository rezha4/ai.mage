import AllImages from "@/components/shared/all-images";
import { getAllImages } from "@/lib/actions/image.actions";
import { getUserById } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server";
import { CldImage } from "next-cloudinary";

const Dashboard = async () => {
  const user = await currentUser();
  const images = await getAllImages(user?.publicMetadata?.userId as string);
  const userData = await getUserById(user?.publicMetadata?.userId as string);
  console.log(userData)

  return (
    <div>
      <h2 className="text-xl">
        Welcome {user?.username}! <br /> You have {userData.creditBalance} credit balance remaining!
      </h2>
      <AllImages images={images} />
    </div>
  );
};

export default Dashboard;
