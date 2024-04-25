import { getOnRampTransactions } from "../transfer/page";

export default async function () {
  type OnRampStatus = "Success" | "Failure" | "Processing"
   type ty ={
        time: Date;
        amount: number;
        status: OnRampStatus;
        provider: string;
   }
  const transactions = await getOnRampTransactions();
  return (
    <div>
      <div className=" ">
        <div className="text-4xl text-blue-500 pt-8 mb-8 font-bold">
          Recent transactions
        </div>
        <div className="pt-2">
          {transactions.map((t:ty) => (
            <div className="flex justify-between" key={t.time.toString()}>
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
              <div className="flex flex-col justify-center text-white text-xl">
                + Rs {t.amount / 100}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
