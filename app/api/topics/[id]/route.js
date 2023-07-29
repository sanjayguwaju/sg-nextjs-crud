import connectMongoDB from "@/libs/mongodb";
import Topic from "@/models/topic";
import { NextResponse } from "next/server";

export async function PUT(request,{params}) {
    const {id} = params;
    const {newTitle:title, newDescription:description}  = await request.json();
    if (!id) {
        return NextResponse.json(
            {message: "Invalid request"},
            {status:400}
        );
    }
    await connectMongoDB();
    await Topic.findByIdAndUpdate(id,{title, description});
    return NextResponse.json({message: "Topic updated successfully"},{status:200});
}


export async function GET(request,{params}) {
    const {id} = params;
    if (!id) {
        return NextResponse.json(
            {message: "Invalid request"},
            {status:400}
        );
    }
    await connectMongoDB();
    const topic = await Topic.findById({_id:id});
    return NextResponse.json({topic},{message: "Topic found successfully"},{status:200});
}

