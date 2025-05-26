import { type NextRequest, NextResponse } from "next/server"
import { loadRegistrationsFromBlob, saveRegistrationsToBlob } from "@/lib/blob-storage"

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
    // Read registrations from Vercel Blob
    const registrations = await loadRegistrationsFromBlob()
    
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

    // Read registrations from Vercel Blob
    const registrations = await loadRegistrationsFromBlob()

    // Find registration index
    const index = registrations.findIndex((reg: any) => reg.regId === regId)

    if (index === -1) {
      return NextResponse.json({ error: "Registration not found" }, { status: 404, headers: corsHeaders })
    }

    // Remove registration
    registrations.splice(index, 1)

    // Write updated registrations back to Vercel Blob
    await saveRegistrationsToBlob(registrations)

    return NextResponse.json({ success: true }, { headers: corsHeaders })
  } catch (error) {
    console.error("Error deleting registration:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500, headers: corsHeaders })
  }
}
