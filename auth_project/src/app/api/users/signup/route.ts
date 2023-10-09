import connect from "@/dbconfig/dbconfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
  
connect()

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json()
        const { email, password} = reqBody
        
        const user = await User.findOne({email})  //check if the email is already register
        if(user){
            return NextResponse.json({error: "User already exists"}, {status: 400})
        }

        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)  //hash password
        const newUser = new User({
            email,
            password: hashedPassword
        })
        await newUser.save()        //save the use data using newUser variable
        return NextResponse.json({
            message: "User created successfully",
            success: true,
        })
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}