import { readFile } from "node:fs/promises";
import path from "node:path";

const FILENAME = "forge-mes-product-cookbook.pdf";
const PDF_PATH = path.join(process.cwd(), "public", "downloads", FILENAME);

export async function GET() {
  let pdf: Buffer;
  try {
    pdf = await readFile(PDF_PATH);
  } catch {
    return Response.json({ error: "Cookbook PDF is unavailable" }, { status: 404 });
  }

  return new Response(new Uint8Array(pdf), {
    headers: {
      "Cache-Control": "public, max-age=86400",
      "Content-Disposition": `attachment; filename="${FILENAME}"`,
      "Content-Length": String(pdf.byteLength),
      "Content-Type": "application/pdf",
    },
  });
}
