import prisma from "@repo/db/client";
import { getOnRampTransactions } from "../transfer/page";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";


export default async function () {
  const session = await getServerSession(authOptions);
  console.log(session);
  type OnRampStatus = "Success" | "Failure" | "Processing"
   type ty ={
        time: Date;
        amount: number;
        status: OnRampStatus;
        provider: string;
   }
  const transactions = await getOnRampTransactions();
   async function getusertransactions(from: string) {
    const p2ptransfer =await prisma.p2pTransfer.findMany({
      where: {
        fromUserId: Number(from)
      }
    });
    if(p2ptransfer.length===0){
      return [[],[]]
    }
     const touser:any=p2ptransfer.map((t)=>({
      touserid:t.toUserId
    }))
    const tousername=await prisma.user.findMany({
      where:{
        id:touser[0].touserid
      }
    })
    
      const userdata=[p2ptransfer,tousername] ;
      return userdata;
      
    }
    const usertransactions:any=await getusertransactions(session.user.id)
  return (
    <div className="text-center flex-auto overflow-hidden">
      <div className="  h-screen overflow-y-scroll  ">
        <div className="text-4xl text-blue-500 pt-8 mb-8 font-bold">
          Recent transactions
        </div>
        <div className="pt-2 ml-20">
          {transactions.map((t:ty) => (
            <div className="flex justify-between py-3" key={t.time.toString()}>
              <div>
                <div className="text-xl text-white">Received INR</div>
                <div className=" text-s text-white">
                  {t.time.toDateString()}
                </div>
                <div
                  className={`${
                    t.status === "Success"
                      ? "text-green-600"
                      : t.status === "Processing"
                        ? "text-blue-500"
                        : "text-red-700"
                  } text-l`}
                >
                  {t.status === "Success"
                    ? "Success"
                    : t.status === "Processing"
                      ? "Processing"
                      : "Failed"}
                </div>
              </div>
              <div className=""></div>
              <div className="flex flex-col justify-center text-white text-xl mr-28">
                + Rs {t.amount / 100}
              </div>
            </div>
          ))}
        </div>
        {usertransactions[0].length !== 0 && (
  <div>
    {usertransactions[0].map((t: any) =>
      usertransactions[1].map((u: any) => (
        <div className="pt-2 ml-14" key={t.timestamp.toString()}>
          <div className="flex justify-between py-3">
            <div>
              <div className="text-xl text-white">Sent INR</div>
              <div className="text-xl text-white">to-{u.name}</div>
              <div className="text-xl text-white">number-{u.number}</div>
              <div className="text-s text-white">
                {t.timestamp.toDateString()}
              </div>
              <div className="text-s text-green-500">
                Success
              </div>
            </div>
            <div className="flex flex-col justify-center mr-28 text-red-600 text-xl">
              - Rs {t.amount / 100}
            </div>
          </div>
        </div>
      ))
    )}
  </div>
)}

        
      </div>
    </div>
  );
}
