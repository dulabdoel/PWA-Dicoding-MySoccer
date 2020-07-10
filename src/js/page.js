import api from './api.js'
import saved from './saved.js'
import savedMatch from './saved-match.js'

const loadPage = (path = 'standing') => {
    let xhr = new XMLHttpRequest()
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            let element = document.querySelector('#body-content')
            if (xhr.status === 200) {
                element.innerHTML = xhr.responseText
                if (path === 'standing') {
                    //feth Standings
                    api.getKlasemen()
                }
                if (path === 'Match') {
                    api.getMatch()
                    window.addFavoritMatch = savedMatch.addFavoritMatch
                }
                if (path === 'FavoritTeams') {
                    saved.getFavoritTeam()
                    window.deleteFavoriteTeam = saved.deleteFavoriteTeam

                }
                if (path === 'FavoritMatch') {
                    savedMatch.getFavoritMatch()
                    window.deleteFavoriteMatch = savedMatch.deleteFavoriteMatch


                }
                if (path === 'Teams') {
                    api.getTeam()
                    window.addFavoritTeam = saved.addFavoritTeam
                }

            } else if (xhr.status === 404) {
                element.innerHTML = "<h1>Halaman Tidak Ditemukan</h1>"
            } else {
                element.innerHTML = "<h1>Maaf. halaman tidak dapat di akses!</h1>"
            }
        }
    }
    xhr.open('GET', `/pages/${path}.html`, true)
    xhr.send()
}

export default loadPage