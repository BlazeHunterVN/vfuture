import { createClient } from '@supabase/supabase-js';

// ══════════════════════════════════════════
// RATE LIMITING — 30 requests/phút/IP
// ══════════════════════════════════════════
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 phút
const RATE_LIMIT_MAX = 30;

function checkRateLimit(ip) {
    const now = Date.now();
    const record = rateLimitMap.get(ip);

    if (!record || now - record.windowStart > RATE_LIMIT_WINDOW) {
        rateLimitMap.set(ip, { windowStart: now, count: 1 });
        return true;
    }

    record.count++;
    if (record.count > RATE_LIMIT_MAX) {
        return false;
    }
    return true;
}

// Cleanup cũ mỗi 5 phút
setInterval(() => {
    const now = Date.now();
    for (const [ip, record] of rateLimitMap) {
        if (now - record.windowStart > RATE_LIMIT_WINDOW * 2) {
            rateLimitMap.delete(ip);
        }
    }
}, 5 * 60 * 1000);

// Danh sách action hợp lệ
const VALID_ACTIONS = [
    'verify_admin_key',
    'manage_banner_upsert',
    'manage_banner_delete',
    'manage_home_settings',
    'manage_admin_access',
    'fetch_banners',
    'fetch_admin_list',
    'fetch_home_settings',
    'get_admin_session'
];

export default async function handler(req, res) {
    // Chỉ cho phép POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    // Rate limiting
    const clientIp = req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || 'unknown';
    if (!checkRateLimit(clientIp)) {
        return res.status(429).json({ error: 'Too many requests. Please try again later.' });
    }

    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
        console.error('Missing Supabase Environment Variables');
        return res.status(500).json({ error: 'Internal server error' });
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const { action, params = {} } = req.body || {};

    // Validate action
    if (!action || typeof action !== 'string') {
        return res.status(400).json({ error: 'Invalid request' });
    }

    if (!VALID_ACTIONS.includes(action)) {
        return res.status(400).json({ error: 'Invalid request' });
    }

    try {
        let result;

        switch (action) {
            case 'verify_admin_key':
                result = await supabase.rpc('verify_admin_key', params);
                break;

            case 'manage_banner_upsert':
                result = await supabase.rpc('manage_banner_upsert', params);
                break;

            case 'manage_banner_delete':
                result = await supabase.rpc('manage_banner_delete', params);
                break;

            case 'manage_home_settings':
                result = await supabase.rpc('manage_home_settings', params);
                break;

            case 'manage_admin_access':
                // Specifically for admin management, we ensure service role is used correctly
                result = await supabase.rpc('manage_admin_access', params);
                break;

            case 'fetch_banners':
                // Filter by nation_key if provided in params
                let query = supabase.from('nation_banners').select('*').order('created_at', { ascending: false });
                if (params && params.nation_key) {
                    query = query.eq('nation_key', params.nation_key);
                }
                result = await query;
                break;

            case 'fetch_admin_list':
                // DO NOT return access_key to the client
                result = await supabase.from('admin_access').select('email, role').order('email', { ascending: true });
                break;

            case 'fetch_home_settings':
                result = await supabase.from('home_settings').select('*').eq('id', 1).single();
                break;

            case 'get_admin_session':
                const token = params.auth_token;
                if (!token) {
                    return res.status(400).json({ error: 'Auth token required' });
                }
                // Verify the token with Supabase
                const { data: { user }, error: authError } = await supabase.auth.getUser(token);
                if (authError || !user) {
                    return res.status(401).json({ error: 'Invalid or expired session' });
                }
                // Fetch the access key for this email
                const { data: admin, error: dbError } = await supabase
                    .from('admin_access')
                    .select('email, role, access_key')
                    .eq('email', user.email)
                    .single();

                if (dbError || !admin) {
                    return res.status(403).json({ error: 'Email not authorized' });
                }

                result = { data: admin };
                break;

            default:
                return res.status(400).json({ error: 'Invalid action' });
        }

        if (result.error) {
            console.error(`Supabase error in action ${action}:`, result.error);
            return res.status(500).json({ error: 'Operation failed. Please try again.' });
        }

        return res.status(200).json(result.data);
    } catch (err) {
        console.error(`Server error in action ${action}:`, err);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
