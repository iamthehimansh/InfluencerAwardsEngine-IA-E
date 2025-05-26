import { type NextRequest, NextResponse } from "next/server"
import fs from "fs"
import path from "path"

// Define the data directory and file path
const DATA_DIR = path.join(process.cwd(), "data")
const REGISTRATIONS_FILE = path.join(DATA_DIR, "registrations.json")

// Simple admin authentication middleware
// In a real app, this would be more secure
function isAuthorized(request: NextRequest): boolean {
  // For demo purposes, we'll use a simple API key check
  // In production, use proper authentication
  const apiKey = request.headers.get("x-api-key")
  return apiKey === "admin-secret-key" // This should be an environment variable in production
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
  // Check authorization
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401, headers: corsHeaders })
  }

  try {
    // Check if file exists
    if (!fs.existsSync(REGISTRATIONS_FILE)) {
      return NextResponse.json({ registrations: [] }, { headers: corsHeaders })
    }

    // Read registrations file
    const data = fs.readFileSync(REGISTRATIONS_FILE, "utf8")
    const registrations = JSON.parse(data)

    return NextResponse.json({ registrations }, { headers: corsHeaders })
  } catch (error) {
    console.error("Error reading registrations:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500, headers: corsHeaders })
  }
}

export async function DELETE(request: NextRequest) {
  // Check authorization
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401, headers: corsHeaders })
  }

  try {
    const { searchParams } = new URL(request.url)
    const regId = searchParams.get("regId")

    if (!regId) {
      return NextResponse.json({ error: "Registration ID is required" }, { status: 400, headers: corsHeaders })
    }

    // Check if file exists
    if (!fs.existsSync(REGISTRATIONS_FILE)) {
      return NextResponse.json({ error: "No registrations found" }, { status: 404, headers: corsHeaders })
    }

    // Read registrations file
    const data = fs.readFileSync(REGISTRATIONS_FILE, "utf8")
    const registrations = JSON.parse(data)

    // Find registration index
    const index = registrations.findIndex((reg: any) => reg.regId === regId)

    if (index === -1) {
      return NextResponse.json({ error: "Registration not found" }, { status: 404, headers: corsHeaders })
    }

    // Remove registration
    registrations.splice(index, 1)

    // Write updated registrations back to file
    fs.writeFileSync(REGISTRATIONS_FILE, JSON.stringify(registrations, null, 2), "utf8")

    return NextResponse.json({ success: true }, { headers: corsHeaders })
  } catch (error) {
    console.error("Error deleting registration:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500, headers: corsHeaders })
  }
}
