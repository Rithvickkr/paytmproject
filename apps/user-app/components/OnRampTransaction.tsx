import { Card } from "@repo/ui/card"

export const OnRampTransactions = ({
    transactions
}: {
    transactions: {
        time: Date,
        amount: number,
       
        status: string,
        provider: string
    }[]
}) => {
    if (!transactions.length) {
        return <Card title="Recent Transactions">
            <div className="text-center pb-8 pt-8 text-white">
                No Recent transactions
            </div>
        </Card>
    }
    return <Card title="Recent Transactions">
        <div className="pt-2">
            {transactions.map(t => (
                <div className="flex justify-between" key={t.time.toString()}>
                    <div>
                        <div className="text-sm text-white">
                            Received INR
                        </div>
                        <div className=" text-xs text-white">
                            {t.time.toDateString()}
                        </div>
                        <div className={`${
                            t.status === "Success" ? "text-green-600" :
                            t.status === "Processing" ? "text-blue-500" :
                            "text-red-700"
                        }`}>
                            {t.status === "Success" ? "Success" :
                            t.status === "Processing" ? "Processing" :
                            "Failed"}
                        </div>
                    </div>
                    <div className="flex flex-col justify-center text-white">
                        + Rs {t.amount / 100}
                    </div>
                </div>
            ))}
        </div>
    </Card>
}
