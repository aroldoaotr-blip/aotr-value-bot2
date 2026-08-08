import { NextRequest, NextResponse } from "next/server";
import { getItems } from "@/lib/data";
import { searchItems } from "@/lib/search";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q") ?? "";

  if (q.trim().length < 2) {
    return NextResponse.json({ items: [] });
  }

  try {
    const items = await getItems();
    const results = searchItems(items, q, 8);
    return NextResponse.json({
      items: results.map(({ id, name, slug, category, apiValue, source }) => ({
        id,
        name,
        slug,
        category,
        apiValue,
        source
      }))
    });
  } catch (error) {
    return NextResponse.json({ items: [], error: String(error) }, { status: 500 });
  }
}
