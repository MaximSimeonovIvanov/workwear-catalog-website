import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
    try {
        const { name, email, phone, message } = await request.json();

        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'Моля попълнете всички задължителни полета.' },
                { status: 400 }
            );
        }

        await resend.emails.send({
            from: 'СИМ Работно Облекло <onboarding@resend.dev>',
            to: process.env.CONTACT_EMAIL!,
            subject: `Запитване от ${name}`,
            html: `
        <h2>Ново запитване от сайта</h2>
        <p><strong>Име:</strong> ${name}</p>
        <p><strong>Имейл:</strong> ${email}</p>
        <p><strong>Телефон:</strong> ${phone || 'Не е посочен'}</p>
        <hr />
        <p><strong>Съобщение:</strong></p>
        <p>${message.replace(/\n/g, '<br/>')}</p>
      `,
            replyTo: email,
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Email error:', error);
        return NextResponse.json(
            { error: 'Грешка при изпращане.' },
            { status: 500 }
        );
    }
}