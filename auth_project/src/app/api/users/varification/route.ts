import connect from "@/dbconfig/dbconfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

connect();

export async function GET(request: NextRequest) {
    try {
        const token = request.cookies.get("token")?.value || '';
        const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!);
        const user = await User.findOne({ _id: decodedToken.id })
        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 400 } 
            );
        }
        const { email } = user;
        
        return NextResponse.json({
            message: "User Details",
            email,
        });
    } catch (error) {
        return NextResponse.json(
            { error: "Invalid token" },
            { status: 400 } 
        );
    }
}