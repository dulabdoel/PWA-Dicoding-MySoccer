//Add Workbox
importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if (workbox) {
    console.log(`Workbox berhasil dimuat`);
    //CACHEES
    workbox.precaching.precacheAndRoute([{
            url: '/index.html',
            revision: '2'
        },
        {
            url: '/app.js',
            revision: '2'
        },
        {
            url: '/manifest.json',
            revision: '2'
        },
        {
            url: '/push.js',
            revision: '2'
        },
        {
            url: '/nav.html',
            revision: '2'
        },
        {
            url: '/src/css/materialize.min.css',
            revision: '2'
        },
        {
            url: '/src/css/style.css',
            revision: '2'
        },
        //Javascript
        {
            url: '/src/js/materialize.min.js',
            revision: '2'
        },
        {
            url: '/src/js/script.js',
            revision: '2'
        },
        {
            url: '/src/js/saved.js',
            revision: '2'
        },
        {
            url: '/src/js/saved-match.js',
            revision: '2'
        },
        {
            url: '/src/js/registrasi-index.js',
            revision: '2'
        },
        {
            url: '/src/js/page.js',
            revision: '2'
        },
        {
            url: '/src/js/indexedDb.js',
            revision: '2'
        },
        {
            url: '/src/js/idb.js',
            revision: '2'
        },
        {
            url: '/src/js/api.js',
            revision: '2'
        },
        {
            url: '/src/component/footer-bar.js',
            revision: '2'
        },
        //End javascript
        //Image Workbox
        {
            url: '/src/img/arrow.png',
            revision: '2'
        },
        {
            url: '/src/img/icon-laliga-2-292.png',
            revision: '2'
        },
        {
            url: '/src/img/icon-laliga-292.png',
            revision: '2'
        },
        {
            url: '/src/img/icon-laliga522.png',
            revision: '2'
        },
        {
            url: '/src/img/laliga-bg.jpg',
            revision: '2'
        },
        {
            url: '/src/img/notif-laliga.jpg',
            revision: '2'
        },
        //End image
        //Pages
        {
            url: '/pages/FavoritMatch.html',
            revision: '2'
        },
        {
            url: '/pages/FavoritTeams.html',
            revision: '2'
        },
        {
            url: '/pages/Match.html',
            revision: '2'
        },
        {
            url: '/pages/standing.html',
            revision: '2'
        },
        {
            url: '/pages/Teams.html',
            revision: '2'
        },
        //End Pages
    ])
    workbox.routing.registerRoute(
        new RegExp('/pages/'),
        workbox.strategies.staleWhileRevalidate({
            cacheName: 'pages'
        })
    )
    workbox.routing.registerRoute(
        /\.(?:png|gif|jpg|jpeg|svg)$/,
        workbox.strategies.cacheFirst({
            cacheName: 'images',
            plugins: [
                new workbox.expiration.Plugin({
                    maxEntries: 60,
                    maxAgeSeconds: 30 * 24 * 60 * 60, // 30 hari
                }),
            ],
        }),
    );
    workbox.routing.registerRoute(
        /\.(?:js|css)$/,
        new workbox.strategies.StaleWhileRevalidate({
            cacheName: 'static',
        })
    )
    // Menyimpan font awesome google css
    workbox.routing.registerRoute(
        /^https:\/\/fonts\.googleapis\.com/,
        workbox.strategies.staleWhileRevalidate({
            cacheName: 'google-fonts-stylesheets',
        })
    )

    // Menyimpan cache untuk file font selama 1 tahun
    workbox.routing.registerRoute(
        /^https:\/\/fonts\.gstatic\.com/,
        workbox.strategies.cacheFirst({
            cacheName: 'google-fonts-webfonts',
            plugins: [
                new workbox.cacheableResponse.Plugin({
                    statuses: [0, 200],
                }),
                new workbox.expiration.Plugin({
                    maxAgeSeconds: 60 * 60 * 24 * 365,
                    maxEntries: 30,
                }),
            ],
        })
    )
    workbox.routing.registerRoute(
        new RegExp('https://api.football-data.org/'),
        workbox.strategies.staleWhileRevalidate({
            cacheName: 'CACHES_API'
        })
    )
} else {
    console.log("Workbox Gagal")
}
self.addEventListener('push', event => {
    let body

    event.data ? body = event.data.text() : body = 'Push message no payload'
    const options = {
        body: body,
        icon: '/src/img/icon-laliga512.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    }
    event.waitUntil(
        self.registration.showNotification('Push Notification', options)
    )
});