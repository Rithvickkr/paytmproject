import prisma from "@repo/db/client";
import { AddMoney } from "../../../components/AddMoneyCard";
import { BalanceCard } from "../../../components/BalanceCard";
import { OnRampTransactions } from "../../../components/OnRampTransaction";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";


 export async function getBalance() {
   
    const session = await getServerSession(authOptions);
    const balance = await prisma.balance.findFirst({
        where: {
            userId: Number(session?.user?.id)
        }
    });
    return {
        amount: balance?.amount || 0,
        locked: balance?.locked || 0
    }
}

export async function getOnRampTransactions() {
    type OnRampStatus = "Success" | "Failure" | "Processing"
    type tp= {
        id: number;
        status: OnRampStatus;
        token: string;
        provider: string;
        amount: number;
        startTime: Date;
        userId: number;
    }
    const session = await getServerSession(authOptions);
    const txns = await prisma.onRampTransaction.findMany({//array comes in this
        where: {
            userId: Number(session?.user?.id)
        }
    });
    return txns.map((t:tp)=> ({
        time: t.startTime,
        amount: t.amount,
        status: t.status,
        provider: t.provider
    }))
}

export default async function() {
    const balance = await getBalance();
    const transactions = await getOnRampTransactions();

    return <div className="w-screen">
        <div className="text-4xl text-blue-500 pt-8 mb-8 font-bold">
            Transfer
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
            <div>
                <AddMoney />
            </div>
            <div>
                <BalanceCard amount={balance.amount} locked={balance.locked} />
                <div className="pt-4">
                    <OnRampTransactions transactions={transactions}  />
                </div>
            </div>
        </div>
    </div>
}