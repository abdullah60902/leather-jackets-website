import { NextResponse } from 'next/server';
import { deleteSubmission } from '@/lib/github-db';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || "atsas-secret-key-2010";

export async function DELETE(req) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_token')?.value;

    if (!token) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    try {
      jwt.verify(token, JWT_SECRET);
    } catch (e) {
      return NextResponse.json({ success: false, message: "Invalid session" }, { status: 401 });
    }

    const { id } = await req.json();
    
    if (!id) {
      return NextResponse.json({ success: false, message: "Missing ID" }, { status: 400 });
    }

    const success = await deleteSubmission(id);
    
    if (success) {
      return NextResponse.json({ success: true, message: "Deleted successfully" });
    } else {
      return NextResponse.json({ success: false, message: "Failed to delete" }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
