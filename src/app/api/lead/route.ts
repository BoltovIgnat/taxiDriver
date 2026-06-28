import { z } from "zod";
import { NextResponse } from "next/server";
import { submitLead } from "@/lib/crm";

const leadSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(10),
  city: z.string().optional(),
  carType: z.enum(["own", "rental"]).optional(),
  calculatedIncome: z.number().optional(),
  page: z.string().optional(),
  consent: z.literal(true),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = leadSchema.parse(body);
    const result = await submitLead(data);

    if (!result.ok) {
      return NextResponse.json({ error: "Failed to submit" }, { status: 500 });
    }

    return NextResponse.json({ success: true, channel: result.channel });
  } catch {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }
}
