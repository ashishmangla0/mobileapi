import { NextRequest, NextResponse } from "next/server";
import { getOnboarding } from "@/lib/contentful/onboarding";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const limit  = Number(searchParams.get("limit") ?? 10);
    const skip   = Number(searchParams.get("skip") ?? 0);
    const locale = searchParams.get("locale") ?? "en-IN";

    const data = await getOnboarding({
      limit,
      skip,
      locale,
    });

    return NextResponse.json(data);

  } catch (error: any) {
    console.error("❌ API ERROR:", error?.response?.data);

    return NextResponse.json(
      { error: error?.response?.data || "Internal Server Error" },
      { status: 500 }
    );
  }
}