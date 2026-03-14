#!name= CapCut Server Emulator
#!desc= Giả lập hoàn toàn server CapCut - KHÔNG QUẢNG CÁO - XUẤT VIDEO NGAY
#!author= CapCut-Emulator-Pro

[General]
bypass-system = true
dns-server = system, 8.8.8.8, 1.1.1.1
ipv6 = false

# ===== CHẶN KẾT NỐI ĐẾN SERVER THẬT =====
[Rule]
# Chặn kết nối đến server thật của CapCut
DOMAIN-SUFFIX,capcut.com,REJECT
DOMAIN-SUFFIX,bytedance.com,REJECT
DOMAIN-SUFFIX,byteoversea.com,REJECT
DOMAIN-SUFFIX,snssdk.com,REJECT
DOMAIN-SUFFIX,pangolin.com,REJECT
DOMAIN-SUFFIX,pangle.com,REJECT
DOMAIN-SUFFIX,tiktok.com,REJECT

# ===== LỚP 1: MAP LOCAL - GIẢ LẬP API =====
[Map Local]
# === USER API - TRẢ VỀ USER PREMIUM ===
^https?:\/\/api\.capcut\.com\/api\/v1\/user data-type=json data={
    "code": 0,
    "message": "success",
    "data": {
        "user": {
            "id": "premium_999999",
            "name": "Premium User",
            "email": "premium@user.com",
            "is_vip": true,
            "is_premium": true,
            "vip_type": "premium_yearly",
            "vip_level": 999,
            "vip_score": 999999,
            "vip_expired": false,
            "vip_expire_time": "2099-12-31T23:59:59Z",
            "vip_create_time": "2024-01-01T00:00:00Z",
            "vip_days": 99999,
            "vip_permanent": true,
            "can_export_4k": true,
            "can_export_60fps": true,
            "can_export_hdr": true,
            "can_export_120fps": true,
            "no_watermark": true,
            "no_ad_export": true,
            "unlimited_export": true,
            "export_limit": 999999,
            "export_count": 0,
            "export_today": 0,
            "cloud_storage": "1TB",
            "cloud_used": "0MB",
            "premium_features": [
                "no_watermark",
                "4k_export",
                "60fps_export",
                "hdr_export",
                "120fps_export",
                "no_ads",
                "no_ad_export",
                "premium_effects",
                "premium_filters",
                "premium_stickers",
                "premium_texts",
                "premium_transitions",
                "premium_sounds",
                "cloud_storage_1tb",
                "team_collaboration",
                "priority_export"
            ]
        }
    }
} status-code=200

# === SUBSCRIPTION API - TRẢ VỀ SUBSCRIPTION ACTIVE ===
^https?:\/\/api\.capcut\.com\/api\/v1\/subscription data-type=json data={
    "code": 0,
    "message": "success",
    "data": {
        "subscription": {
            "status": "active",
            "type": "premium_yearly",
            "platform": "apple",
            "product_id": "com.capcut.premium.yearly",
            "original_transaction_id": "premium_999999",
            "purchase_date": "2024-01-01T00:00:00Z",
            "expiry_date": "2099-12-31T23:59:59Z",
            "auto_renew": true,
            "cancellation_date": null,
            "refund_date": null,
            "grace_period": false,
            "in_trial": false,
            "valid": true,
            "latest_receipt": "premium_receipt_999999"
        }
    }
} status-code=200

# === PREMIUM CHECK - TRẢ VỀ PREMIUM ACTIVE ===
^https?:\/\/api\.capcut\.com\/api\/v1\/premium\/check data-type=json data={
    "code": 0,
    "message": "success",
    "data": {
        "is_premium": true,
        "premium_type": "yearly",
        "premium_until": "2099-12-31T23:59:59Z",
        "premium_permanent": true,
        "features": [
            "no_ads",
            "no_ad_export",
            "4k_export",
            "60fps_export",
            "hdr_export",
            "no_watermark",
            "unlimited_export",
            "premium_effects",
            "premium_filters"
        ],
        "available_features": [
            "export_4k",
            "export_60fps",
            "export_hdr",
            "export_120fps",
            "remove_watermark",
            "no_ads",
            "cloud_storage",
            "team_share"
        ]
    }
} status-code=200

# === EXPORT CHECK - TRẢ VỀ ĐƯỢC XUẤT NGAY ===
^https?:\/\/api\.capcut\.com\/api\/v1\/export\/check data-type=json data={
    "code": 0,
    "message": "success",
    "data": {
        "can_export": true,
        "export_status": "ready",
        "require_ad": false,
        "ad_completed": true,
        "ad_viewed": true,
        "ad_skipped": false,
        "watermark_removed": true,
        "watermark": false,
        "quality_available": [
            "480p",
            "720p",
            "1080p",
            "2k",
            "4k",
            "8k"
        ],
        "fps_available": [24, 25, 30, 48, 50, 60, 120],
        "max_duration": 999999,
        "max_file_size": "10GB",
        "export_limit_remaining": 999999,
        "priority": "high",
        "estimated_time": 0
    }
} status-code=200

# === EXPORT STATUS - TRẢ VỀ EXPORT ĐANG XỬ LÝ ===
^https?:\/\/api\.capcut\.com\/api\/v1\/export\/status data-type=json data={
    "code": 0,
    "message": "success",
    "data": {
        "status": "processing",
        "progress": 100,
        "stage": "completed",
        "processing": true,
        "completed": true,
        "failed": false,
        "error": null,
        "start_time": "2024-01-01T00:00:00Z",
        "end_time": "2024-01-01T00:00:01Z",
        "duration": 1,
        "output": {
            "url": "https://export.capcut.com/video/export_completed.mp4",
            "download_url": "https://download.capcut.com/video/export_completed.mp4",
            "size": "100MB",
            "resolution": "3840x2160",
            "fps": 60,
            "bitrate": "50Mbps",
            "codec": "h264",
            "watermark": false
        }
    }
} status-code=200

# === EXPORT PROGRESS - TRẢ VỀ 100% ===
^https?:\/\/api\.capcut\.com\/api\/v1\/export\/progress data-type=json data={
    "code": 0,
    "message": "success",
    "data": {
        "progress": 100,
        "stage": "completed",
        "current_fps": 60,
        "estimated_time": 0,
        "remaining_time": 0,
        "processed_frames": 999999,
        "total_frames": 999999,
        "speed": "100x",
        "eta": "0s"
    }
} status-code=200

# === AD CHECK - TRẢ VỀ KHÔNG CÓ QUẢNG CÁO ===
^https?:\/\/api\.capcut\.com\/api\/v1\/ad\/check data-type=json data={
    "code": 0,
    "message": "success",
    "data": {
        "show_ad": false,
        "ad_type": null,
        "ad_data": null,
        "ad_viewed": true,
        "ad_completed": true,
        "ad_skipped": false,
        "ad_watched_today": 0,
        "max_ads_per_day": 999999,
        "next_ad_time": 9999999999,
        "remaining_ads": 0,
        "reward_claimed": true,
        "can_skip": true,
        "skip_time": 0,
        "ad_duration": 0,
        "ad_position": null
    }
} status-code=200

# === ADS LIST - TRẢ VỀ DANH SÁCH RỖNG ===
^https?:\/\/api\.capcut\.com\/api\/v1\/ads data-type=json data={
    "code": 0,
    "message": "success",
    "data": {
        "ads": [],
        "total": 0,
        "has_more": false,
        "refresh_time": 9999999999,
        "frequency": 0,
        "interstitial": [],
        "banner": [],
        "rewarded": [],
        "native": []
    }
} status-code=200

# === WATERMARK CHECK - TRẢ VỀ KHÔNG CÓ WATERMARK ===
^https?:\/\/api\.capcut\.com\/api\/v1\/watermark\/check data-type=json data={
    "code": 0,
    "message": "success",
    "data": {
        "has_watermark": false,
        "watermark_removed": true,
        "watermark_position": null,
        "watermark_text": null,
        "can_remove": true,
        "remove_free": true,
        "remove_with_premium": true
    }
} status-code=200

# === USER STATUS - TRẢ VỀ PREMIUM ===
^https?:\/\/api\.capcut\.com\/api\/v1\/user\/status data-type=json data={
    "code": 0,
    "message": "success",
    "data": {
        "status": "premium",
        "level": "vip",
        "is_vip": true,
        "is_premium": true,
        "is_trial": false,
        "trial_ended": true,
        "subscription_active": true,
        "features_active": true,
        "last_check": "2024-01-01T00:00:00Z",
        "next_check": "2099-12-31T23:59:59Z"
    }
} status-code=200

# === FEATURES - TRẢ VỀ TẤT CẢ TÍNH NĂNG ===
^https?:\/\/api\.capcut\.com\/api\/v1\/features data-type=json data={
    "code": 0,
    "message": "success",
    "data": {
        "features": [
            {
                "id": "export_4k",
                "name": "4K Export",
                "enabled": true,
                "premium_only": false,
                "available": true
            },
            {
                "id": "export_60fps",
                "name": "60FPS Export",
                "enabled": true,
                "premium_only": false,
                "available": true
            },
            {
                "id": "remove_watermark",
                "name": "Remove Watermark",
                "enabled": true,
                "premium_only": false,
                "available": true
            },
            {
                "id": "no_ads",
                "name": "No Ads",
                "enabled": true,
                "premium_only": false,
                "available": true
            },
            {
                "id": "no_ad_export",
                "name": "No Ad Export",
                "enabled": true,
                "premium_only": false,
                "available": true
            }
        ]
    }
} status-code=200

# === SERVER TIME - TRẢ VỀ THỜI GIAN HIỆN TẠI ===
^https?:\/\/api\.capcut\.com\/api\/v1\/server\/time data-type=json data={
    "code": 0,
    "message": "success",
    "data": {
        "server_time": "2024-01-01T00:00:00Z",
        "timestamp": 1704067200,
        "timezone": "UTC"
    }
} status-code=200

# ===== LỚP 2: SCRIPT XỬ LÝ ĐỘNG =====
[Script]
# Script xử lý mọi request đến CapCut
CapCut-Universal-Handler = type=http-request, pattern=^https?:\/\/api\.capcut\.com\/.*, script-path=universal-handler.js

# === NỘI DUNG SCRIPT universal-handler.js ===
"""
// Script xử lý mọi request đến CapCut
const url = $request.url;
const method = $request.method;

// Log request để debug
console.log(`CapCut Request: ${method} ${url}`);

// Xác định loại request và trả về response phù hợp
if (url.includes('/user')) {
    $done({
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            code: 0,
            message: 'success',
            data: {
                user: {
                    id: 'premium_999999',
                    is_vip: true,
                    is_premium: true,
                    vip_type: 'premium_yearly',
                    vip_expired: false,
                    vip_expire_time: '2099-12-31T23:59:59Z',
                    no_watermark: true,
                    no_ad_export: true,
                    can_export_4k: true
                }
            }
        })
    });
} 
else if (url.includes('/export')) {
    $done({
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            code: 0,
            message: 'success',
            data: {
                can_export: true,
                require_ad: false,
                ad_completed: true,
                watermark_removed: true,
                progress: 100,
                status: 'completed',
                url: 'https://export.capcut.com/video/export.mp4'
            }
        })
    });
}
else if (url.includes('/ad') || url.includes('/ads')) {
    $done({
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            code: 0,
            message: 'success',
            data: {
                show_ad: false,
                ad_viewed: true,
                ad_completed: true,
                ads: [],
                next_ad_time: 9999999999
            }
        })
    });
}
else if (url.includes('/premium') || url.includes('/vip')) {
    $done({
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            code: 0,
            message: 'success',
            data: {
                is_premium: true,
                is_vip: true,
                premium_until: '2099-12-31T23:59:59Z',
                features: ['no_ads', '4k_export', 'no_watermark']
            }
        })
    });
}
else {
    // Default response cho các request khác
    $done({
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            code: 0,
            message: 'success',
            data: {}
        })
    });
}
"""

# ===== LỚP 3: HEADER REWRITE =====
[Header Rewrite]
# Xóa mọi tracking headers
^https?:\/\/api\.capcut\.com\/.* header-replace Authorization "Bearer premium_token_999999"
^https?:\/\/api\.capcut\.com\/.* header-replace X-Device-ID "premium_device_999999"
^https?:\/\/api\.capcut\.com\/.* header-replace X-User-ID "premium_user_999999"
^https?:\/\/api\.capcut\.com\/.* header-replace X-Tracking-ID "disabled"
^https?:\/\/api\.capcut\.com\/.* header-replace X-Ad-ID "watched_999999"
^https?:\/\/api\.capcut\.com\/.* header-replace X-Ad-View-Time "30000"
^https?:\/\/api\.capcut\.com\/.* header-replace X-Ad-Completed "true"
^https?:\/\/api\.capcut\.com\/.* header-replace X-Premium "true"
^https?:\/\/api\.capcut\.com\/.* header-replace X-Export-Without-Ad "true"

# ===== LỚP 4: HOSTS =====
[Host]
# Chuyển hướng tất cả về local
127.0.0.1 api.capcut.com
127.0.0.1 effect.capcut.com
127.0.0.1 www.capcut.com
127.0.0.1 developer.capcut.com
127.0.0.1 ads.capcut.com
127.0.0.1 tracking.capcut.com
127.0.0.1 analytics.capcut.com
127.0.0.1 log.capcut.com
127.0.0.1 event.capcut.com
127.0.0.1 export.capcut.com
127.0.0.1 upload.capcut.com
127.0.0.1 download.capcut.com

# ByteDance domains
127.0.0.1 api.bytedance.com
127.0.0.1 tracking.bytedance.com
127.0.0.1 log.bytedance.com

# ===== LỚP 5: MITM =====
[MITM]
hostname = %APPEND% *.capcut.com, *.bytedance.com, *.byteoversea.com
enable = true
skip-server-cert-verify = true
