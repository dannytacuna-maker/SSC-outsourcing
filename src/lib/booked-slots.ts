import { del, list, put } from "@vercel/blob";

const PREFIX = "bookings/";

function slotPath(startIso: string) {
  return `${PREFIX}${encodeURIComponent(startIso)}.json`;
}

function pathToIso(pathname: string) {
  const raw = pathname.startsWith(PREFIX)
    ? pathname.slice(PREFIX.length)
    : pathname;
  return decodeURIComponent(raw.replace(/\.json$/i, ""));
}

export async function listBookedStartIsos(): Promise<string[]> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return [];

  const booked: string[] = [];
  let cursor: string | undefined;

  do {
    const page = await list({
      prefix: PREFIX,
      cursor,
      limit: 1000,
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });
    for (const blob of page.blobs) {
      booked.push(pathToIso(blob.pathname));
    }
    cursor = page.hasMore ? page.cursor : undefined;
  } while (cursor);

  return booked;
}

/** Returns true if reserved; false if the slot was already taken. */
export async function reserveBookedSlot(
  startIso: string,
  meta: Record<string, string> = {},
): Promise<boolean> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    throw new Error("Booking storage is not configured.");
  }

  try {
    await put(
      slotPath(startIso),
      JSON.stringify({
        startIso,
        bookedAt: new Date().toISOString(),
        ...meta,
      }),
      {
        access: "private",
        addRandomSuffix: false,
        allowOverwrite: false,
        contentType: "application/json",
        token: process.env.BLOB_READ_WRITE_TOKEN,
      },
    );
    return true;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (/already exists|overwrite|409|conflict/i.test(message)) {
      return false;
    }
    throw error;
  }
}

export async function releaseBookedSlot(startIso: string) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return;
  try {
    await del(slotPath(startIso), {
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });
  } catch {
    // Best-effort unlock if notification failed.
  }
}
