// pages/api/pickup.js

let storedData = []; // Variabel untuk menyimpan data pickup

export default function handler(req, res) {
    if (req.method === 'POST') {
        try {
            // Ambil data dari permintaan POST
            const { pickupCords, dropLocationCors } = req.body;

            // Lakukan logika yang diperlukan di sini, misalnya menyimpan data ke dalam variabel
            const pickupData = {
                pickupCords,
                dropLocationCors,
                timestamp: new Date().toISOString(),
            };

            // Simpan data ke dalam variabel storedData
            storedData.push(pickupData);

            // Di sini, Anda dapat menyimpan data ini ke database atau melakukan operasi lain yang Anda butuhkan.

            // Kemudian, kirim respons dengan data yang diterima
            res.status(200).json({ success: true, data: pickupData });
        } catch (error) {
            // Tangani kesalahan jika ada
            console.error('Error:', error);
            res.status(500).json({ success: false, error: 'Internal Server Error' });
        }
    } else if (req.method === 'GET') {
        // Jika metode permintaan adalah GET, kirim data yang telah disimpan
        res.status(200).json({ success: true, data: storedData });
    } else {
        // Jika metode permintaan bukan POST atau GET, kirim respons kesalahan
        res.status(405).json({ success: false, error: 'Method Not Allowed' });
    }
}
