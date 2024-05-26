import { SignedIn } from "@clerk/nextjs";
import Image from "next/image";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import { getUserById } from "@/lib/actions/user.actions";
import Checkout from "@/components/shared/checkout";
import { auth, currentUser } from "@clerk/nextjs/server";

const plans = [
  {
    _id: 2,
    name: "Pro Package",
    icon: "/assets/icons/free-plan.svg",
    price: 40,
    credits: 120,
    inclusions: [
      {
        label: "120 Credits",
        isIncluded: true,
      },
      {
        label: "Full Access to Services",
        isIncluded: true,
      },
      {
        label: "Priority Customer Support",
        isIncluded: true,
      },
      // {
      //   label: "Priority Updates",
      //   isIncluded: false,
      // },
    ],
  },
  {
    _id: 3,
    name: "Premium Package",
    icon: "/assets/icons/free-plan.svg",
    price: 199,
    credits: 2000,
    inclusions: [
      {
        label: "2000 Credits",
        isIncluded: true,
      },
      {
        label: "Full Access to Services",
        isIncluded: true,
      },
      {
        label: "Priority Customer Support",
        isIncluded: true,
      },
      {
        label: "Priority Updates",
        isIncluded: true,
      },
    ],
  },
];

const Credits = async () => {
  const user = await currentUser();
  const userId = user?.publicMetadata.userId;
  // const user = await getUserById(u.publicMetadata.userId!);

  return (
    <>
      {/* <Header
        title="Buy Credits"
        subtitle="Choose a credit package that suits your needs!"
      /> */}

      <section>
        <div className="grid grid-cols-2 gap-4">
          {plans.map((plan) => (
            <div
              key={plan._id}
              className="bg-gray-200 flex flex-col justify-between p-2 rounded-md text-center min-h-80 space-y-4"
            >
              <h1 className="text-xl font-semibold">{plan.name}</h1>
              <p className="text-2xl">${plan.price}</p>
              <p className="text-xl">{plan.credits} Credits</p>
              <ul>
                {plan.inclusions.map((inc) => (
                  <li key={inc.label}>{inc.label}</li>
                ))}
              </ul>
              <div>
                <SignedIn>
                  <Checkout
                    plan={plan.name}
                    amount={plan.price}
                    credits={plan.credits}
                    buyerId={userId as string}
                  />
                </SignedIn>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Credits;