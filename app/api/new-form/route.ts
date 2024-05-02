import { NextResponse } from "next/server";

export interface Form {
  company: string;
  name: string;
  email: string;
  phone?: string;
}

export async function POST(request: Request) {
  return NextResponse.json(await request.json() as Form);
}
