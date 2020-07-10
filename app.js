import loadNav from './src/js/script.js';
import loadPage from './src/js/page.js';
import pwa from './src/js/registrasi-index.js'
import './src/component/footer-bar.js';
let path = window.location.hash.substr(1)
path ? path = path : path = 'standing'

pwa.registration()
pwa.notification()

document.addEventListener('DOMContentLoaded', () => {
    loadNav()
    loadPage(path)

})