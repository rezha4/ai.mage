"use client";

import { auth, currentUser } from "@clerk/nextjs/server";
import { useEffect, useState } from "react";

const Dashboard = () => {
  // const [user, setUser] = useState<string>("");

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     const fetchedUser = await currentUser();
  //     setUser(fetchedUser);
  //   }

  //   fetchUser();
  // }, [])

  return (
    <div>
      <h2 className="text-2xl">Welcome!</h2>
    </div>
  );
};

export default Dashboard;
