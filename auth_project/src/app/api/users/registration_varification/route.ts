import connect from "@/dbconfig/dbconfig";
import Students from "@/models/students_details";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

connect();

export async function GET(request: NextRequest) {
    try {
        const token = request.cookies.get("token")?.value || '';
        if (token) {
            const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!);
            const student = await Students.findOne({ email: decodedToken.email })
            return NextResponse.json({
                message: "Students Details",
                student,
            });
        }
    } catch (error) {
        return NextResponse.json(
            { error: "Invalid token" },
            { status: 400 } // Unauthorized
        );
    }
}