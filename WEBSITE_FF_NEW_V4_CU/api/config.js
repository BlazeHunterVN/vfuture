// ══════════════════════════════════════════
// RATE LIMITING — 60 requests/phút/IP
// ══════════════════════════════════════════
const configRateMap = new Map();
const CONFIG_RATE_WINDOW = 60 * 1000;
const CONFIG_RATE_MAX = 60;

function checkConfigRate(ip) {
    const now = Date.now();
    const record = configRateMap.get(ip);

    if (!record || now - record.windowStart > CONFIG_RATE_WINDOW) {
        configRateMap.set(ip, { windowStart: now, count: 1 });
        return true;
    }

    record.count++;
    return record.count <= CONFIG_RATE_MAX;
}

// Cleanup mỗi 5 phút
setInterval(() => {
    const now = Date.now();
    for (const [ip, record] of configRateMap) {
        if (now - record.windowStart > CONFIG_RATE_WINDOW * 2) {
            configRateMap.delete(ip);
        }
    }
}, 5 * 60 * 1000);

export default function handler(req, res) {
    // Chỉ cho phép GET
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    // Rate limiting
    const clientIp = req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || 'unknown';
    if (!checkConfigRate(clientIp)) {
        return res.status(429).json({ error: 'Too many requests. Please try again later.' });
    }

    res.status(200).json({
        supabaseUrl: process.env.SUPABASE_URL,
        supabaseAnonKey: process.env.SUPABASE_ANON_KEY
    });
}
