import { listBookedStartIsos } from "@/lib/booked-slots";

export const runtime = "nodejs";

export async function GET() {
  try {
    const startIsos = await listBookedStartIsos();
    return Response.json(
      { startIsos },
      {
        headers: {
          "Cache-Control": "no-store",
        },
      },
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Could not load booked slots.";
    return Response.json({ error: message, startIsos: [] }, { status: 500 });
  }
}
