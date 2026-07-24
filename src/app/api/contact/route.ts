import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

interface ContactPayload {
  name: string
  email: string
  message: string
  honeypot?: string
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validatePayload(body: Partial<ContactPayload>): string | null {
  if (!body.name?.trim()) return 'Nama wajib diisi'
  if (!body.email?.trim() || !EMAIL_REGEX.test(body.email)) return 'Email tidak valid'
  if (!body.message?.trim()) return 'Pesan wajib diisi'
  if (body.name.length > 100) return 'Nama terlalu panjang'
  if (body.message.length > 5000) return 'Pesan terlalu panjang'
  return null
}

export async function POST(request: NextRequest) {
  try {
    // 1. Pastikan env vars benar-benar terbaca
    const requiredEnvVars = ['GMAIL_USER', 'GMAIL_APP_PASSWORD', 'CONTACT_RECEIVER_EMAIL']
    const missing = requiredEnvVars.filter((key) => !process.env[key])
    if (missing.length > 0) {
      console.error('[CONTACT_API] Missing env vars:', missing)
      return NextResponse.json(
        { success: false, error: `Server misconfigured: missing ${missing.join(', ')}` },
        { status: 500 }
      )
    }

    const body: Partial<ContactPayload> = await request.json()

    if (body.honeypot) {
      console.warn('[CONTACT_API] Honeypot triggered — likely bot')
      return NextResponse.json({ success: true }, { status: 200 })
    }

    const validationError = validatePayload(body)
    if (validationError) {
      return NextResponse.json({ success: false, error: validationError }, { status: 400 })
    }

    const { name, email, message } = body as ContactPayload

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    })

    // 2. Verifikasi koneksi SMTP sebelum kirim — ini akan melempar error jelas
    // kalau kredensial salah, bukan gagal diam-diam
    await transporter.verify()
    console.log('[CONTACT_API] SMTP connection verified successfully')

    const info = await transporter.sendMail({
      from: `"Portfolio Contact Form" <${process.env.GMAIL_USER}>`,
      to: process.env.CONTACT_RECEIVER_EMAIL,
      replyTo: email,
      subject: `Pesan Baru dari ${name} — Portfolio Website`,
      text: `Nama: ${name}\nEmail: ${email}\n\nPesan:\n${message}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px;">
          <h2 style="color: #E8C547;">Pesan Baru dari Portfolio</h2>
          <p><strong>Nama:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Pesan:</strong></p>
          <p style="white-space: pre-wrap; background: #f5f5f5; padding: 12px; border-radius: 6px;">${escapeHtml(message)}</p>
        </div>
      `,
    })

    // 3. Log message ID — kalau ini muncul, Google SMTP sudah menerima & memproses email
    console.log('[CONTACT_API] Email sent successfully. Message ID:', info.messageId)
    console.log('[CONTACT_API] Accepted:', info.accepted, '| Rejected:', info.rejected)

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    // 4. Log error LENGKAP, bukan cuma generic message
    console.error('[CONTACT_API_ERROR]', error)
    const message = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json(
      { success: false, error: `Gagal mengirim pesan: ${message}` },
      { status: 500 }
    )
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}