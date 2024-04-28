"use server"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";





export async function p2pTransfer(to: string, amount: number) {
  try {
 
    const session = await getServerSession(authOptions);
    const from = session?.user?.id;
    if (!from) {
        return {
            message: "Error while sending",
            status:"error"
        }
    }
    const toUser = await prisma.user.findFirst({
        where: {
            number: to
        }
    });

    if (!toUser) {
        return {
            message: "User not found",
            status:"error"
        }
    }

    await prisma.$transaction(async (tx: any): Promise<void> => {
  
        await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(from)} FOR UPDATE`;
        const fromBalance = await tx.balance.findUnique({
            where: { userId: Number(from) },
          });
          if (!fromBalance || fromBalance.amount < amount) {
            throw new Error('Insufficient funds');
          }

          await tx.balance.update({
            where: { userId: Number(from) },
            data: { amount: { decrement: amount } },
          });
          await tx.Transaction.create({
            data: {
             
              amount: amount,
              timestamp: new Date(),
               cash:"out",
              fromUser: {
                connect: {
                  id: Number(from)// Replace with the correct ID of the 'from' user
                }
              },
               
                toUser: {
                  connect: {
                    id: toUser.id// Replace with the correct ID of the 'to' user
                  }
                }
             
            },
          });

          await tx.balance.update({
            where: { userId: toUser.id },
            data: { amount: { increment: amount } },
          });
          await tx.Transaction.create({
            
            data: {
             
              amount: amount,
              timestamp: new Date(), 
             
              cash:"in",
              
              fromUser: {
                connect: {
                  id: toUser.id
                }
              },
               
                toUser: {
                  connect: {
                    id: Number(from)// Replace with the correct ID of the 'to' user
                  }
                }
             
              
            },
          });
          await tx.p2pTransfer.create({
            data: {
                fromUserId: Number(from),
                toUserId: toUser.id,
                amount,
                timestamp: new Date()
            }
          })
    });
    return {  
        message: "Money sent successfully",
        status:"success"
    }
  }
  catch (e: any) {
  
    return e.message == "Insufficient funds" ? { message: e.message, status: "error" } : { message: "Server error, please try again", status: "error" };
  }
}
