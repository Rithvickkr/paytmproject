import { Card } from "@repo/ui/card";

export const BalanceCard = ({amount, locked}: {
    amount: number;
    locked: number;
}) => {
    return <Card title={"Balance"}>
        <div className="flex justify-between border-b border-slate-300 pb-2 text-white">
            <div className="p-2.5 ">
                Unlocked balance
            </div>
            <div className="p-2.5" >
                {amount / 100} INR
            </div>
        </div>
        <div className="flex justify-between border-b border-slate-300 py-2 text-white">
            <div className="p-2.5">
                Total Locked Balance
            </div>
            <div className="p-2.5">
                {locked / 100} INR
            </div>
        </div>
        <div className="flex justify-between border-b border-slate-300 py-2 text-white">
            <div className="p-2.5">
                Total Balance
            </div>
            <div className="p-2.5">
                {(locked + amount) / 100} INR
            </div>
        </div>
    </Card>
}