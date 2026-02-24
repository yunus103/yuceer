import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, surname, email, phone, message, type } = body;

    // Validate inputs
    if (!name || !email || !phone) {
      return NextResponse.json(
        { message: "Lütfen zorunlu alanları doldurun." },
        { status: 400 },
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT) || 465,
      secure: Number(process.env.SMTP_PORT) === 465, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: "info@yuceerkereste.com", // Recipient email
      subject: `Web Sitesi İletişim Formu: ${name} ${surname || ""}`,
      html: `
        <h2>Yeni İletişim Formu Mesajı</h2>
        <p><strong>Ad:</strong> ${name}</p>
        ${surname ? `<p><strong>Soyad:</strong> ${surname}</p>` : ""}
        <p><strong>E-posta:</strong> ${email}</p>
        <p><strong>Telefon:</strong> ${phone}</p>
        ${type ? `<p><strong>Form Türü:</strong> ${type}</p>` : ""}
        ${message ? `<p><strong>Mesaj:</strong><br/>${message.replace(/\n/g, "<br/>")}</p>` : ""}
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Mesajınız başarıyla gönderildi." },
      { status: 200 },
    );
  } catch (error) {
    console.error("Email gönderim hatası:", error);
    return NextResponse.json(
      { message: "Mesaj gönderilirken bir hata oluştu." },
      { status: 500 },
    );
  }
}
