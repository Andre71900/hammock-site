export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false });
  }

  try {
    const { product, price, name, email, phone } = req.body || {};

    const text = [
      'Нова заявка з сайту!',
      `Товар: ${product || 'Постільна білизна'}`,
      `Ціна: ${price || 'від 850 грн'}`,
      `Ім'я: ${name}`,
      `Телефон: ${phone}`,
      `E-mail: ${email}`
    ].join('\n');

    const telegramResponse = await fetch(
      `https://api.telegram.org/bot7741943551:AAEiJ0Me_JwTQJXXXZ7E7LZ4Vf2IzyfH2to/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: "584066273",
          text
        })
      }
    );

    const data = await telegramResponse.json();

    if (!telegramResponse.ok || !data.ok) {
      return res.status(500).json({ ok: false, error: data });
    }

    return res.status(200).json({ ok: true });

  } catch (error) {
    return res.status(500).json({ ok: false, error: error.message });
  }
}