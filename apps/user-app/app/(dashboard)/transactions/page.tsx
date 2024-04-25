import { OnRampTransactions } from "../../../components/OnRampTransaction"
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";
export default async function() {
    async function getOnRampTransactions() {
        const session = await getServerSession(authOptions);
        const txns = await prisma.onRampTransaction.findMany({//array comes in this
            where: {
                userId: Number(session?.user?.id)
            }
        });
        return txns.map(t => ({
            time: t.startTime,
            amount: t.amount,
            status: t.status,
            provider: t.provider
        })) 
        
    }
   const transactions = await getOnRampTransactions();
    return <div>
        <div className="pt-4">
                    <OnRampTransactions transactions={transactions}  />
                </div>
    </div>
}
