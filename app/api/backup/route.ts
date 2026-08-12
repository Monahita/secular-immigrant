import { PutObjectCommand } from "@aws-sdk/client-s3"; 
import { NextResponse } from "next/server"; 
import { r2, R2_BUCKET_NAME } from "@/lib/r2"; 
export async function POST(req: Request) 
{ try { const formData = await req.formData(); 
        const file = formData.get("file") as File; 
        const folder = (formData.get("folder") as string)
     || "articles"; if (!file) 
        { return NextResponse.json( { error: "No file uploaded" }, 
            { status: 400 } ); } 
            const bytes = await file.arrayBuffer(); 
            const buffer = Buffer.from(bytes); 
            const safeName = file.name.replace( /[^a-zA-Z0-9._-]/g, "_" );
            const key = `secular-immigrant/${folder}/${Date.now()}-${safeName}`; 
            await r2.send( new PutObjectCommand({ Bucket: R2_BUCKET_NAME, 
            Key: key, Body: buffer, ContentType: file.type || "application/octet-stream", }) ); 
            return NextResponse.json({ result: "ok", key, }); } catch (error) { console.error("R2 backup error:", error); 
            return NextResponse.json( { result: "error", error: "R2 backup failed", }, { status: 500 } 
            
            ); 
        } 
    }