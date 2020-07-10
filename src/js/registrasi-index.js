const registration = () => {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker
                .register('/service-worker.js')
                .then(() => console.log('Register Success'))
                .catch(() => console.log('Register Not Success'))
        })
    } else {
        console.log('Service Worker it is not supported!')
    }
}
const notification = () => {
    if ('Notification' in window) {
        Notification.requestPermission()
            .then(result => {
                if (result === 'denied') {
                    console.log('Fitur notifikasi tidak diijinkan.')
                    return
                } else if (result === 'default') {
                    console.log('Pengguna menutup kotak dialog permintaan ijin.')
                    return
                }
                navigator.serviceWorker.ready
                    .then(() => {
                        if (('PushManager' in window)) {
                            navigator.serviceWorker.getRegistration()
                                .then((registration) => {
                                    registration.pushManager.subscribe({
                                            userVisibleOnly: true,
                                            applicationServerKey: urlBase64ToUint8Array('BOrUPOUFHlK0RRCSsyeVANp_unl4d-LYLRiU1DwaouTGwHbyuj0o9XuVyjeARmmpVa5zldrMLldU23aKeR47AwY')
                                        })
                                        .then(subscribe => {
                                            console.log('Berhasil subscribescribe dengan endpoint', subscribe.endpoint)
                                            console.log('Berhasil melakukan subscribe dengan p256dh key: ', btoa(String.fromCharCode.apply(null, new Uint8Array(subscribe.getKey('p256dh')))))
                                            console.log('Berhasil melakukan subscribe dengan auth key: ', btoa(String.fromCharCode.apply(null, new Uint8Array(subscribe.getKey('auth')))))
                                        })
                                        .catch(e => console.log('Tidak dapat melakukan subscribe : ', e.message))
                                })
                        }
                    })
            })
    }
}

const urlBase64ToUint8Array = (base64String) => {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}
export default {
    registration,
    notification,
    urlBase64ToUint8Array
}