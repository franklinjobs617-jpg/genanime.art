import { type NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { googleUserId, credits, streak } = await req.json();

    if (!googleUserId || !credits) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // 查找用户
    const user = await prisma.user.findUnique({
      where: { googleUserId }
    });

    if (!user) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    // 检查今天是否已经领取过奖励
    const today = new Date().toDateString();
    const lastClaimDate = user.lastDailyReward ? new Date(user.lastDailyReward).toDateString() : null;

    if (lastClaimDate === today) {
      return NextResponse.json(
        { success: false, error: "Already claimed today" },
        { status: 400 }
      );
    }

    // 更新用户积分和最后领取时间
    const updatedUser = await prisma.user.update({
      where: { googleUserId },
      data: {
        credits: (Number(user.credits) + credits).toString(),
        lastDailyReward: new Date(),
        currentStreak: streak
      }
    });

    return NextResponse.json({
      success: true,
      newCredits: updatedUser.credits,
      streak: streak
    });

  } catch (error) {
    console.error("Daily reward claim error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}