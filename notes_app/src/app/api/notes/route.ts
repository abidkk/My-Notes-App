import { NextResponse } from "next/server";
import connect from "@/../lib/db";
import Note from "@/../lib/models/note";
import { Types } from "mongoose";

const ObjectId = require("mongoose").Types.ObjectId;
export const GET = async () => {
  try {
    await connect();
    const notes = await Note.find();
    return new NextResponse(JSON.stringify(notes), { status: 200 });
  } catch (error: any) {
    return new NextResponse("Error in fetching notes" + error.message, {
      status: 500,
    });
  }
};




// Create Notes
export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    await connect();
    const newNote = new Note(body);
    await newNote.save();
    return new NextResponse(
      JSON.stringify({ message: "Note is created", note: newNote }),
      { status: 200 }
    );
  } catch (error: any) {
    return new NextResponse("Error in creating note " + error.message, {
      status: 500,
    });
  }
};




// Delete note
export const DELETE = async (request: Request) => {
  try {
    const { searchParams } = new URL(request.url);
    const noteId = searchParams.get("noteId");

    if (!noteId) {
      return new NextResponse(JSON.stringify({ message: "ID not found" }), {
        status: 400,
      });
    }

    if (!Types.ObjectId.isValid(noteId)) {
      return new NextResponse(JSON.stringify({ message: "Invalid Note id" }), {
        status: 400,
      });
    }

    await connect();
    const deletedNote = await Note.findByIdAndDelete(
      new Types.ObjectId(noteId)
    );

    if (!deletedNote) {
      return new NextResponse(
        JSON.stringify({ message: "Note not found in the database" }),
        { status: 400 }
      );
    }

    return new NextResponse(
      JSON.stringify({ message: "The Note is deleted", note: deletedNote }),
      { status: 200 }
    );
  } catch (error: any) {
    return new NextResponse("Error in deleting note" + error.message, {
      status: 500,
    });
  }
};
