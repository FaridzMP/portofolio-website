// src/lib/contact.ts

export interface ContactFormData {
  name: string
  email: string
  message: string
  honeypot?: string
}

export interface ContactFormResult {
  success: boolean
  error?: string
}

const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit'

export async function sendContactForm(
  data: ContactFormData
): Promise<ContactFormResult> {
  // Honeypot terisi → kemungkinan besar bot, gagalkan diam-diam tanpa call API
  if (data.honeypot) {
    return { success: true }
  }

  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY

  if (!accessKey) {
    return { success: false, error: 'Form service belum dikonfigurasi.' }
  }

  try {
    const response = await fetch(WEB3FORMS_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        access_key: accessKey,
        name: data.name,
        email: data.email,
        message: data.message,
        subject: `Pesan baru dari ${data.name} — Portfolio Website`,
      }),
    })

    const result = await response.json()

    if (result.success) {
      return { success: true }
    }

    return { success: false, error: result.message ?? 'Gagal mengirim pesan.' }
  } catch {
    return { success: false, error: 'Terjadi kesalahan jaringan.' }
  }
}