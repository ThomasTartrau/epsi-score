import { NextResponse } from "next/server";
import { createReadStream, existsSync } from "fs";
import { join } from "path";

export async function GET(req: Request) {
  const storagePath = process.env.STORAGE_PATH || "storage";
  const { pathname } = new URL(req.url);
  const filePath = join(storagePath, pathname.split("/").slice(2).join("/"));

  if (!existsSync(filePath)) {
    return NextResponse.json(
      { error: "File not found", filePath, pathname },
      { status: 404 },
    );
  }

  const fileStream = createReadStream(filePath);
  const response = new Response(fileStream as unknown as ReadableStream, {
    headers: {
      "Content-Type": "image/png",
    },
  });

  return response;
}
