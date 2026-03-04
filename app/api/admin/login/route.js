import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const ADMIN_USER = process.env.ADMIN_USER || "admin@atsasci.com";
const ADMIN_PASS = process.env.ADMIN_PASS || "Admin@ATSAS2010";
const JWT_SECRET = process.env.JWT_SECRET || "atsas-secret-key-2010";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    if (email === ADMIN_USER && password === ADMIN_PASS) {
      const token = jwt.sign({ role: 'admin' }, JWT_SECRET, { expiresIn: '1d' });
      
      const cookieStore = await cookies();
      cookieStore.set('admin_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 86400, // 1 day
        path: '/',
      });

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
