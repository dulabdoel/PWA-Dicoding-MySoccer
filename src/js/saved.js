import database from './indexedDb.js'

const getFavoritTeam = () => {
    //Get All Bookmark Team From Database
    database.getTeams()
        .then(data => {
            let daftarTeamsHTML = ''
            data.forEach(daftarTeam => {
                daftarTeamsHTML +=
                    `
                    <style>
                    span h1{
                        color: #e69a18;
                    }
                    div a{
                        font-weight:bold;
                        color: #e69a18;
                    }
                    @media only screen and (max-width: 992px) {
                        span h1{
                            font-size :32px;
                            color: #e69a18;
                        }
                        span h3{
                            font-size :22px;

                        }
                    }
                    </style>
                <div class="col s12">
                    <div class="card transparent">
                    <div class="card-content row valign-wrapper">
                        <div class="col s4" class="logo-team">
                            <img src="${daftarTeam.logo}" alt="${daftarTeam.name}"  title = "${daftarTeam.name}" class="responsive-img center-align" width="50%" >
                        </div>
                        <div class="col s8 information-team">
                        <span><h1>${daftarTeam.name}</h1></span>
                        <span ><h3 class = "white-text">${daftarTeam.venue}</h3></span>
                        </div>
                    </div>
                    <div class="card-action right-align">
                        <a href="${daftarTeam.website}" target="_blank" class="waves-effect waves-light btn  blue darken-4">Website</a>
                        <button onclick="deleteFavoriteTeam(${daftarTeam.id},'${daftarTeam.name}')" class="waves-effect waves-light btn  red darken-4"><i class ="material-icons">delete</i></button>
                    </div>
                    </div>
                </div>
                `
            })
            //insert All Team in Database to DOM
            document.getElementById('preloader').style.display = 'none'
            document.getElementById('savedTeam').innerHTML = daftarTeamsHTML
        })
}
//Akhir GetTeam
//Add Favor Team

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
const addFavoritTeam = (id, logo, name, venue, website) => {
    //Add To Database
    database.addTeam({
        id,
        logo,
        name,
        venue,
        website
    })
    //disabled button
    document.getElementById(id).classList.add("disabled")
    //Display Toast
    M.toast({
        html: `Succes Add To Favorite ${name}`,
    });
    //Push Notification
    pushNotification(`Succes Add To Favorite ${name}`)
}
//Delete Favor Team
const deleteFavoriteTeam = (id, name) => {
    //Conform Delete Bookmark ?
    let yesDel = confirm
    if (yesDel) {
        //Delete Team From Database
        database.deleteTeam(id)
        //Fetch All Team
        getFavoritTeam()
        //Display Toast
        M.toast({
            html: `Delete Succes ${name}`,
        })
        //Push Notification
        pushNotification(`Delete Succes ${name}`)
    }

}
export default {
    addFavoritTeam,
    getFavoritTeam,
    deleteFavoriteTeam,
}