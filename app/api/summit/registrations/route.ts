import { type NextRequest, NextResponse } from "next/server"
import fs from "fs"
import path from "path"

// Define the data directory and file path
const DATA_DIR = path.join(process.cwd(), "data")
const REGISTRATIONS_FILE = path.join(DATA_DIR, "registrations.json")

// Type for registration data
type Registration = {
  regId: string
  influencerId: string
  email: string
  name?: string
  registeredAt: string
}

// Read registrations from JSON file
function readRegistrations(): Registration[] {
  if (!fs.existsSync(DATA_DIR) || !fs.existsSync(REGISTRATIONS_FILE)) {
    return []
  }

  try {
    const data = fs.readFileSync(REGISTRATIONS_FILE, "utf8")
    return JSON.parse(data)
  } catch (error) {
    console.error("Error reading registrations file:", error)
    return []
  }
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

  // Read registrations from file
  const registrations = readRegistrations()

  if (influencerId) {
    const userRegistrations = registrations.filter((reg) => reg.influencerId === influencerId)
    return NextResponse.json(userRegistrations, { headers: corsHeaders })
  }

  return NextResponse.json(registrations, { headers: corsHeaders })
}
