import database from './indexedDb.js'
const getFavoritMatch = () => {
    //Get All Bookmark Team From Database
    database.getMatches()
        .then(data => {
            let daftarMatchHTML = ''
            data.forEach(jadwalTeam => {
                daftarMatchHTML +=
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
                            <h4 class="white-text">${jadwalTeam.home}</h4>
                            <h6 class="white-text">Home Team</h6>
                            <h5 class="white-text">VS</h5>
                            <h4 class="white-text">${jadwalTeam.away}</h4>
                            <h6 class="white-text">Away Team</h6>
                        </div>
                        <div class="card-action right-align">
                        <button onclick="deleteFavoriteMatch(${jadwalTeam.id},'${jadwalTeam.name}')" class="waves-effect waves-light btn  red darken-4"><i class ="material-icons">delete</i></button>
                        </div>
                    </div>
                </div>
                `
            })
            //insert All Team in Database to DOM
            document.getElementById('preloader').style.display = 'none'
            document.getElementById('savedMatch').innerHTML = daftarMatchHTML
        })
}


const pushNotification = msg => {
    const title = 'Notifikasi!!!';
    const options = {
        'body': msg,
        'icon': '/src/img/icon-laliga512.png',
        'badge': '/src/img/icon-laliga512.png',
        'image': '/src/img/notif-laliga.jpg'
    };
    if (Notification.permission === 'granted') {
        navigator.serviceWorker.ready.then(regis => {
            regis.showNotification(title, options);
        });
    }
}
//Add Favor Match

const addFavoritMatch = (id, lastUpdated, matchday, utcDate, home, away, name) => {
    //Add To Database
    database.addMatch({
        id,
        lastUpdated,
        matchday,
        utcDate,
        home,
        away,
        name,
    })
    //disabled button
    document.getElementById(id).classList.add("disabled")
    //Display Toast
    M.toast({
        html: `Succes Add To Favorite`,
    });
    //Push Notification
    pushNotification(`Succes Add To Favorite`)
}
//DELETE FAVOR MATCH
const deleteFavoriteMatch = (id) => {
    //Conform Delete Bookmark ?
    let yesDel = confirm
    if (yesDel) {
        //Delete Match From Database
        database.deleteMatch(id)
        //Fetch All Match
        getFavoritMatch()
        //Display Toast
        M.toast({
            html: `Delete Succes `,
        })
        //Push Notification
        pushNotification(`Delete Succes `)
    }

}
export default {
    //Match
    getFavoritMatch,
    addFavoritMatch,
    deleteFavoriteMatch
}