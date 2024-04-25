import { Card } from "@repo/ui/card";
import { getBalance } from "../transfer/page";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";

export default async function () {
    const session = await getServerSession(authOptions);
    console.log(session);
  const { amount } = await getBalance();
  return (
    <div className="w-screen">
      <div>
        <div className="  p-4 ml-12">
          <div className="text-center">
            <div className="text-5xl text-blue-600 pt-8 font-bold">
              Welcome to PayIT
            </div>
            <div className="text-lg text-white pt-8 mb-8 font-bold">
              You can now transfer money, add money to your account and view
              your transactions.
            </div>
          </div>
        </div>
        <div className="p-4 ml-12 text-center">
          <div className="text-4xl  text-blue-600 pt-8 font-bold">Hello</div>
          <div className="text-xl text-white pt-5 font-bold">
            {session.user.name}
          </div>
        </div>
        <div className="p-4 ml-12 text-center">
          <div className="text-4xl  text-blue-600 pt-8 font-bold">Balance</div>
          <div className="text-xl text-white pt-5 font-bold">
            {amount / 100} INR
          </div>
        </div>
      </div>
    </div>
  );
}
