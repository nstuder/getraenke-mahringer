import { NextResponse } from 'next/server';
import sendmailFactory from 'sendmail';

const sendmail = sendmailFactory({});

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const { name, email, website, phone, subject, message } = data;

        // Basic validation
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        console.log('Contact form submission received:', {
            name,
            email,
            website,
            phone,
            subject,
            message
        });

        const mailContent = `
            Name: ${name}
            E-Mail: ${email}
            Webseite: ${website || 'N/A'}
            Telefon: ${phone || 'N/A'}
            Betreff: ${subject || 'Kein Betreff'}

            Nachricht:
            ${message}
        `;

        await new Promise((resolve, reject) => {
            sendmail({
                from: email,
                to: process.env.CONTACT_FORM_TO_EMAIL || '',
                subject: subject || `Neue Kontaktanfrage von ${name}`,
                content: mailContent,
            }, (err: Error | null, reply: string) => {
                if (err) {
                    console.error('sendmail error:', err);
                    reject(err);
                } else {
                    console.log('sendmail success:', reply);
                    resolve(reply);
                }
            });
        });

        return NextResponse.json({ success: true, message: 'E-Mail wurde erfolgreich versendet.' });
    } catch (error) {
        console.error('Error in contact API:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
