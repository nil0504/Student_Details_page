import connect from "@/dbconfig/dbconfig";
import Students from "@/models/students_details";
import { NextRequest, NextResponse } from "next/server";
  
connect()

export async function POST(request: NextRequest){
    try { 
        const reqBody = await request.json()
        const { email, rollNo, name, batch, department } = reqBody
        const newStudent = new Students({
            email,
            rollNo,
            name,
            batch,
            department,
        });
        await newStudent.save()
        return NextResponse.json({
            message: "User created successfully",
            success: true,
        })
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}