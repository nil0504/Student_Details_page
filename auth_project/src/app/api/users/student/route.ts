import connect from "@/dbconfig/dbconfig";
import Students from "@/models/students_details";
import { NextResponse } from "next/server";
  
connect()

export async function GET() {
    try {
        const students = await Students.find();  //fetching students data
        return NextResponse.json({
             message: "Students Details",
             success: true,
             students,
        });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
