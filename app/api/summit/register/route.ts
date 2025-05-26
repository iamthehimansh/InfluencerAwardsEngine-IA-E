import { type NextRequest, NextResponse } from "next/server"
import { Registration, loadRegistrationsFromBlob, saveRegistrationsToBlob } from "@/lib/blob-storage"


// Read registrations from Vercel Blob
async function readRegistrations(): Promise<Registration[]> {
  return await loadRegistrationsFromBlob()
}

// Write registrations to Vercel Blob
async function writeRegistrations(registrations: Registration[]) {
  await saveRegistrationsToBlob(registrations)
}
export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};


export async function OPTIONS(req: NextRequest) {
  return NextResponse.json({}, { headers: corsHeaders });
}
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { influencerId, email, name } = body

    // Validate required fields
    if (!influencerId || !email) {
      return NextResponse.json({ error: "influencerId and email are required" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    // Read existing registrations
    const registrations = await readRegistrations()

    // Check if already registered
    const existingRegistration = registrations.find((reg) => reg.influencerId === influencerId)

    if (existingRegistration) {
      return NextResponse.json({ error: "Influencer already registered for summit" }, { status: 409 })
    }

    // Generate registration ID
    const regId = `SR_${String(registrations.length + 1).padStart(3, "0")}`

    // Create registration record
    const registration: Registration = {
      regId,
      influencerId,
      email,
      ...(name && { name }),
      registeredAt: new Date().toISOString(),
    }

    // Add to registrations and save
    registrations.push(registration)
    await writeRegistrations(registrations)

    return NextResponse.json({ regId }, { status: 201, headers: corsHeaders })
  } catch (error) {
    console.error("Summit registration error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET() {
  const registrations = await readRegistrations()
  return NextResponse.json({ registrations }, { status: 200, headers: corsHeaders })
}
