"use client"
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Center } from "@repo/ui/center";
import { TextInput } from "@repo/ui/textinput";
import { useState } from "react";
import { p2pTransfer } from "../app/lib/actions/p2pTransfer";
import toast from "react-hot-toast";

export function SendCard() {
    const [number, setNumber] = useState("");
    const [amount, setAmount] = useState("");

    return <div className="h-[90vh]">
        <Center>
            <Card title="Send">
                <div className="min-w-72 pt-2">
                    <TextInput placeholder={"Number"} label="Number" onChange={(value) => {
                        setNumber(value)
                    }} />
                    <TextInput placeholder={"Amount"} label="Amount" onChange={(value) => {
                        setAmount(value)
                    }} />
                    <div className="pt-4 flex justify-center">
                        <Button onClick={async () => {
                            const message = await p2pTransfer(number, Number(amount) * 100);
                            if (message.status === "error") {
                                toast.error(message.message);
                            } else {
                                toast.promise(
                                    p2pTransfer(number, Number(amount) * 100),
                                    {
                                        loading: 'Transferring..',
                                        success: <b>Money sent successfully</b>,
                                        error: <b>Could not sent.</b>
                                    }
                                );
                            }
                            document.getElementById("first_name")?.setAttribute("value", "");
                            document.getElementById("first_name")?.setAttribute("value", "");
                        }}>Send</Button>
                    </div>
                </div>
            </Card>
        </Center>
    </div>
}