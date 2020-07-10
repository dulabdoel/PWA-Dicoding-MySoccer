//Fetch API
import database from './indexedDb.js';
const base_url = 'https://api.football-data.org'
const API_TOKEN = '3468bf9ffc234b6281a2899f8d8be43d'

let status = respon => {
    if (respon.status != 200) {
        console.log(`Error : ${respon.status}`)
        return Promise.reject(new Error(respon.statusText()))
    } else {
        return Promise.resolve(respon)
    }
}
//ambil data json masukin ke html di klasemen
const getKlasemen = () => {
    if ('caches' in window) {
        caches.match(`${base_url}/v2/competitions/2014/standings`)
            .then(respon => {
                if (respon) {
                    respon.json()
                        .then(data => {
                            let standingsHTML = ''
                            data = data.standings[0].table

                            data.forEach(dataKlasemen => {
                                let urlTimImg = dataKlasemen.team.crestUrl
                                urlTimImg = urlTimImg.replace(/^http:\/\//i, 'https://')
                                standingsHTML +=
                                    //buat komponen secara dinamis
                                    `
                                    <style>
                                    @media only screen and (max-width: 992px) {
                                        td img{
                                            width: 30px;
                                        }
                                        td{
                                            font-size :12px;
                                        }
                                    }
                                      </style>
                        <tr>
                        <td>${dataKlasemen.position}</td>
                        <td><img src="${urlTimImg}" alt="${dataKlasemen.team.name}" title="${dataKlasemen.team.name}" class="responsive-img" width="60"></td>
                        <td>${dataKlasemen.team.name}</td>
                        <td>${dataKlasemen.playedGames}</td>
                        <td>${dataKlasemen.won}</td>
                        <td>${dataKlasemen.draw}</td>
                        <td>${dataKlasemen.lost}</td>
                        <td>${dataKlasemen.goalsFor}</td>
                        <td>${dataKlasemen.goalsAgainst}</td>
                        <td>${dataKlasemen.goalDifference}</td>
                        <td>${dataKlasemen.points}</td>
                        </tr>
                        `
                            })
                            //masukin ke elemen dengan ID
                            document.getElementById('preloader').style.display = 'none'
                            document.getElementById('standings').innerHTML = standingsHTML
                        })
                        .catch(e => console.log(e))
                }
            })

    }
    //get fetch API
    fetch(`${base_url}/v2/competitions/2014/standings`, {
            headers: {
                'X-Auth-Token': API_TOKEN
            }
        })
        .then(status)
        .then(respon => respon.json())
        .then(data => {
            let standingsHTML = ''
            data = data.standings[0].table

            data.forEach(dataKlasemen => {
                let urlTimImg = dataKlasemen.team.crestUrl
                urlTimImg = urlTimImg.replace(/^http:\/\//i, 'https://')
                standingsHTML +=
                    `
                 <style>

                @media only screen and (max-width: 992px) {
                    td img{
                        width: 30px;
                    }
                    td{
                        font-size :12px;
                    }
                }
                            </style>
            <tr>
            <td>${dataKlasemen.position}</td>
            <td><img src="${urlTimImg}" alt="${dataKlasemen.team.name}" title="${dataKlasemen.team.name}" class="responsive-img" width="60"></td>
            <td>${dataKlasemen.team.name}</td>
            <td>${dataKlasemen.playedGames}</td>
            <td>${dataKlasemen.won}</td>
            <td>${dataKlasemen.draw}</td>
            <td>${dataKlasemen.lost}</td>
            <td>${dataKlasemen.goalsFor}</td>
            <td>${dataKlasemen.goalsAgainst}</td>
            <td>${dataKlasemen.goalDifference}</td>
            <td>${dataKlasemen.points}</td>
            </tr>
            `
            })
            document.getElementById('preloader').style.display = 'none'
            document.getElementById('standings').innerHTML = standingsHTML
        })
        .catch(e => console.log(e))
}
//get data Team dimasukin ke html
const getTeam = () => {

    if ('caches' in window) {
        caches.match(`${base_url}/v2/competitions/2014/teams`)
            .then(respon => {
                if (respon) {
                    respon.json()
                        .then(data => {
                            let daftarTeamsHTML = ""
                            data = data.teams
                            data.forEach(daftarTeam => {
                                let urlTimImg = daftarTeam.crestUrl
                                urlTimImg = urlTimImg.replace(/^http:\/\//i, 'https://')
                                daftarTeamsHTML +=
                                    //susun komponen ke daalm htmml
                                    `
                                        <style>
                                        .card .card-image img{
                                            width :50%;
                                            margin-left :145px;
                                            padding-top :20px;

                                        }
                                        .card{
                                            height:135vh;
                                        }
                                        li > span{
                                            font-weight :bolder;
                                        }
                                    .card-content ul>li>{
                                            font-weight :bolder;
                                        }
                                        .card .card-action a{
                                            margin :15px;
                                        }
                        @media only screen and (max-width: 992px) {
                            .card .card-image img{
                                width :35%;
                                margin-left :95px;
                                padding-top :20px;

                            }
                            .card{
                                height:100%;
                            }

                        }
                         </style>
                                        <div class="container col s12 m6 ">
                                        <div class="card hoverable">
                                            <div class="card-image center-align">
                                                <img src="${urlTimImg}" alt = "${daftarTeam.name}" title = "${daftarTeam.name}" class ="responsive-img">
                                            </div>
                                            <div class="card-content">
                                            <ul class="collection with-header">
                                            <li class="collection-header center-align"><h6>${daftarTeam.name}</h6></li>
                                            <li class="collection-item">ShortName : <span>${daftarTeam.shortName}</span></li>
                                            <li class="collection-item">Alamat Club <span>${daftarTeam.address}</li>
                                            <li class="collection-item">Phone : <span>${daftarTeam.phone}</span></li>
                                            <li class="collection-item">Email : <span>${daftarTeam.email}<span></li>
                                            <li class="collection-item">Tahun Berdiri : <span>${daftarTeam.founded}<span></li>
                                            <li class="collection-item">Stadion: <span>${daftarTeam.venue}<span></li>
                                          </ul>
                                            </div>
                                            <div class="card-action center-align">
                                            <button onclick="addFavoritTeam(${daftarTeam.id},'${urlTimImg}','${daftarTeam.name}','${daftarTeam.venue}','${daftarTeam.website}')" class="waves-effect waves-light btn btn-large blue darken-4" id="${daftarTeam.id}"><i class ="material-icons">favorite_border</i></button>
                                                <a href="${daftarTeam.website}" target ="_blank" class="waves-effect waves-light btn btn-large blue darken-4">Website</a>
                                            </div>
                                        </div>
                                    </div>
                            `;
                            })
                            //masukin komponen BYID

                            document.getElementById('preloader').style.display = 'none'
                            document.getElementById('datateam').innerHTML = daftarTeamsHTML
                            var dataDB = database.getTeams();
                            let team = '';
                            dataDB.then(data => {
                                for (team of data) {
                                    document.getElementById(team.id).classList.add("disabled");
                                }
                            })
                        })
                }
            })
    }
    fetch(`${base_url}/v2/competitions/2014/teams`, {
            headers: {
                'X-Auth-Token': API_TOKEN
            }
        })
        .then(status)
        .then(respon => respon.json())
        .then(data => {
            let daftarTeamsHTML = ""
            data = data.teams
            data.forEach(daftarTeam => {
                let urlTimImg = daftarTeam.crestUrl
                urlTimImg = urlTimImg.replace(/^http:\/\//i, 'https://')
                //masukin komponen secara dinamis
                daftarTeamsHTML += `
                    <style>
                    .card .card-image img{
                        width :35%;
                        margin-left :145px;
                        padding-top :20px;
                    }
                    .card{
                        height:135vh;

                    }
                    li > span{
                        font-weight :bolder;
                    }
                    ul li{
                        font-weight :bolder;
                    }
                    ul li h6{
                        color:#e69a18;
                        font-weight: bold;
                    }
                    .card .card-action a{
                        margin :15px;
                    }
    @media only screen and (max-width: 992px) {
        .card .card-image img{
            width :35%;
            margin-left :95px;
            padding-top :20px;
        }
        .card{
            height:100%;
        }

    }
                    </style>
                    <div class="container col s12 m6 ">
                    <div class="card hoverable">
                        <div class="card-image center-align">
                            <img src="${urlTimImg}" alt = "${daftarTeam.name}" title = "${daftarTeam.name}" class ="responsive-img">

                        </div>
                        <div class="card-content">
                        <ul class="collection with-header">
                        <li class="collection-header center-align"><h6>${daftarTeam.name}</h6></li>
                        <li class="collection-item">ShortName : <span>${daftarTeam.shortName}</span></li>
                        <li class="collection-item">Alamat Club <span>${daftarTeam.address}</li>
                        <li class="collection-item">Phone : <span>${daftarTeam.phone}</span></li>
                        <li class="collection-item">Email : <span>${daftarTeam.email}<span></li>
                        <li class="collection-item">Tahun Berdiri : <span>${daftarTeam.founded}<span></li>
                        <li class="collection-item">Stadion: <span>${daftarTeam.venue}<span></li>
                      </ul>
                        </div>
                        <div class="card-action center-align">
                        <button onclick="addFavoritTeam(${daftarTeam.id},'${urlTimImg}','${daftarTeam.name}','${daftarTeam.venue}','${daftarTeam.website}')" class="waves-effect waves-light btn btn-large blue darken-4" id="${daftarTeam.id}"><i class ="material-icons">favorite_border</i></button>
                            <a href="${daftarTeam.website}" target ="_blank" class="waves-effect waves-light btn btn-large blue darken-4">Website</a>
                        </div>
                    </div>
                </div>
                `;
            })
            //masukin kompnen ke ID
            document.getElementById('preloader').style.display = 'none'
            document.getElementById('datateam').innerHTML = daftarTeamsHTML
            var dataDB = database.getTeams();
            let team = '';
            dataDB.then(data => {
                for (team of data) {
                    document.getElementById(team.id).classList.add("disabled");
                }
            })
        })
        .catch(e => console.log(e))
}

//get Match  dari API
const getMatch = () => {
    if ('caches' in window) {
        caches.match(`${base_url}/v2/competitions/2014/matches`)
            .then(respon => {
                if (respon) {
                    respon.json()
                        .then(data => {
                            let daftarMatchHTML = ""
                            data = data.matches
                            data.forEach(jadwalTeam => {

                                daftarMatchHTML +=
                                    //susun secara dinmais ke html
                                    `
                        <div class="col s12 m12">
                            <div class="card transparent">
                                <div class="card-content white-text">
                                    <p>Last Update : ${jadwalTeam.lastUpdated}</p>
                                    <span class="card-title center-align">
                                        <h2>Matchday : <span>${jadwalTeam.matchday}</span></h2>
                                    </span>
                                    <h5 class="center-align">${jadwalTeam.utcDate}</h5>
                                </div>
                                <div class="div card-content center-align">
                                    <h4 class="white-text">${jadwalTeam.homeTeam.name}</h4>
                                    <h6 class="white-text">Home Team</h6>
                                    <h5 class="white-text">VS</h5>
                                    <h4 class="white-text">${jadwalTeam.awayTeam.name}</h4>
                                    <h6 class="white-text">Away Team</h6>
                                </div>
                                <div class="card-action right-align">
                                <button onclick="addFavoritMatch(${jadwalTeam.id},'${jadwalTeam.lastUpdated}','${jadwalTeam.matchday}','${jadwalTeam.utcDate}','${jadwalTeam.homeTeam.name}','${jadwalTeam.awayTeam.name}')" class="waves-effect waves-light btn btn-large blue darken-4" id="${jadwalTeam.id}"><i class ="material-icons">favorite_border</i></button>
                                </div>
                            </div>
                        </div>
                        `;
                            })
                            //masukin ke ID
                            document.getElementById('preloader').style.display = 'none'
                            document.getElementById('jadwal').innerHTML = daftarMatchHTML
                            var dataDB = database.getMatches();
                            let match = '';
                            dataDB.then(data => {
                                for (match of data) {
                                    document.getElementById(match.id).classList.add("disabled");
                                }
                            })
                        })
                }
            })
    }
    fetch(`${base_url}/v2/competitions/2014/matches`, {
            headers: {
                'X-Auth-Token': API_TOKEN
            }
        })
        .then(status)
        .then(respon => respon.json())
        .then(data => {
            let daftarMatchHTML = ""
            data = data.matches
            data.forEach(jadwalTeam => {
                daftarMatchHTML += `
                <div class="col s12 m12">
                            <div class="card transparent">
                                <div class="card-content white-text">
                                    <p>Last Update : ${jadwalTeam.lastUpdated}</p>
                                    <span class="card-title center-align">
                                        <h2>Matchday : <span>${jadwalTeam.matchday}</span></h2>
                                    </span>
                                    <h5 class="center-align">${jadwalTeam.utcDate}</h5>
                                </div>
                                <div class="div card-content center-align">
                                    <h4 class="white-text">${jadwalTeam.homeTeam.name}</h4>
                                    <h6 class="white-text">Home Team</h6>
                                    <h5 class="white-text">VS</h5>
                                    <h4 class="white-text">${jadwalTeam.awayTeam.name}</h4>
                                    <h6 class="white-text">Away Team</h6>
                                </div>
                                <div class="card-action right-align">
                                <button onclick="addFavoritMatch(${jadwalTeam.id},'${jadwalTeam.lastUpdated}','${jadwalTeam.matchday}','${jadwalTeam.utcDate}','${jadwalTeam.homeTeam.name}','${jadwalTeam.awayTeam.name}')" class="waves-effect waves-light btn btn-large blue darken-4" id="${jadwalTeam.id}"><i class ="material-icons">favorite_border</i></button>
                                </div>
                            </div>
                        </div>

            `;
            })
            //masukin ke BYID
            document.getElementById('preloader').style.display = 'none'
            document.getElementById('jadwal').innerHTML = daftarMatchHTML
            var dataDB = database.getMatches();
            let match = '';
            dataDB.then(data => {
                for (match of data) {
                    document.getElementById(match.id).classList.add("disabled");
                }
            })
        })
        .catch(e => console.log(e))

}
export default {
    getKlasemen,
    getTeam,
    getMatch
}