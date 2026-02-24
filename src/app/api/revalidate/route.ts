import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const secret = searchParams.get("secret");

    // Güvenlik: Vercel'deki environment variable veya varsayılan token
    const YOUR_SECRET_TOKEN =
      process.env.SANITY_REVALIDATE_SECRET || "yuceer-revalidate-token";

    if (secret !== YOUR_SECRET_TOKEN) {
      return NextResponse.json(
        { message: "Yetkisiz erişim: Hatalı veya eksik token" },
        { status: 401 },
      );
    }

    // İsteğe bağlı olarak güncellenen döküman türünü vb. okuyabilirsiniz
    // const body = await req.json();

    // Tüm siteyi yeniden oluştur ("layout" kullanımı ile app router'daki tüm cache'i temizleriz)
    revalidatePath("/", "layout");

    return NextResponse.json({
      revalidated: true,
      message: "Önbellek (Cache) başarıyla temizlendi",
      now: Date.now(),
    });
  } catch (err: any) {
    console.error("Revalidate hatası:", err);
    return NextResponse.json(
      {
        message: "Revalidate işlemi sırasında hata oluştu",
        error: err.message,
      },
      { status: 500 },
    );
  }
}
