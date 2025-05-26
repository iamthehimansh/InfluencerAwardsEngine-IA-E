import { type NextRequest, NextResponse } from "next/server"
import { Registration, loadRegistrationsFromBlob } from "@/lib/blob-storage"

// Read registrations from Vercel Blob
async function readRegistrations(): Promise<Registration[]> {
  return await loadRegistrationsFromBlob()
}
export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};


export async function OPTIONS(req: NextRequest) {
  return NextResponse.json({}, { headers: corsHeaders });
}
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const influencerId = searchParams.get("influencerId")

  // Read registrations from Vercel Blob
  const registrations = await readRegistrations()

  if (influencerId) {
    const userRegistrations = registrations.filter((reg) => reg.influencerId === influencerId)
    return NextResponse.json(userRegistrations, { headers: corsHeaders })
  }

  return NextResponse.json(registrations, { headers: corsHeaders })
}
