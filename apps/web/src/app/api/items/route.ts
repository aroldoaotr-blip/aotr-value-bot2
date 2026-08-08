import { NextRequest, NextResponse } from "next/server";
import { getItems, getMeta } from "@/lib/data";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const items = await getItems();
    const { searchParams } = request.nextUrl;
    const q = searchParams.get("q")?.toLowerCase();
    const category = searchParams.get("cat");
    const light = searchParams.get("light") === "1";

    let result = items;
    if (q) result = result.filter((i) => i.name.toLowerCase().includes(q));
    if (category) result = result.filter((i) => i.category === category);

    if (light) {
      return NextResponse.json({
        total: result.length,
        keyRatio: getMeta().apiKeyValue,
        items: result.map(
          ({ id, name, slug, emoji, category, source, apiValue, apiKeys, valueOfficial }) => ({
            id,
            name,
            slug,
            emoji,
            category,
            source,
            apiValue,
            apiKeys,
            valueOfficial
          })
        )
      });
    }

    return NextResponse.json({ total: result.length, items: result });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
