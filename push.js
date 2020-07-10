const webPush = require('web-push');

const vapidKeys = {
    "publicKey": "BOrUPOUFHlK0RRCSsyeVANp_unl4d-LYLRiU1DwaouTGwHbyuj0o9XuVyjeARmmpVa5zldrMLldU23aKeR47AwY",
    "privateKey": "ziWjgNoACiZOrtfbNhZ9hb96KulvDAg6s4MsKiYMPOY"
};


webPush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
const pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/cednpNX_IwU:APA91bGJSW-WMuypAzgmKm_kPPKDOh1yCZsZHx4wimKoHaqRI5RT2dCeZTM8nMSmH4R-mEBUHMghCz-c-PiSZ358L7e_MEzeYnK5SC2Kyt7pXSu19faLNU--Ymijh7WBHTKLq3Et89dU",
    "keys": {
        "p256dh": "BBJ3c2XL+F7d6hRjJXoS1xSv88F9lQ3Urxer+se+I3W5/1TNsJDQQ2B0YT4YJl4yhQMz4+qM4jtPg4Wnm5gd7s0=",
        "auth": "XQJyFUO0Vcvgoh29iNM9YQ=="
    }
};
const payload = 'Push Notifikasi Aplikasi My-Soccer';

const options = {
    gcmAPIKey: '833311911761',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);