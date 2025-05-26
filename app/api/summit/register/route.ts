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


// Ensure data directory exists
function ensureDataDirExists() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true })
  }
}

// Read registrations from JSON file
function readRegistrations(): Registration[] {
  ensureDataDirExists()

  if (!fs.existsSync(REGISTRATIONS_FILE)) {
    // Create empty registrations file if it doesn't exist
    fs.writeFileSync(REGISTRATIONS_FILE, JSON.stringify([]), "utf8")
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

// Write registrations to JSON file
function writeRegistrations(registrations: Registration[]) {
  ensureDataDirExists()

  try {
    fs.writeFileSync(REGISTRATIONS_FILE, JSON.stringify(registrations, null, 2), "utf8")
  } catch (error) {
    console.error("Error writing registrations file:", error)
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
    const registrations = readRegistrations()

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
    writeRegistrations(registrations)

    return NextResponse.json({ regId }, { status: 201,headers:corsHeaders })
  } catch (error) {
    console.error("Summit registration error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET() {
  const registrations = readRegistrations()
  return NextResponse.json({ registrations }, { status: 200, headers: corsHeaders })
}
