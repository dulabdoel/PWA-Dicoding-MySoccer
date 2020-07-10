let dbPromise = idb.open('My-Soccer', 1, upgradeDB => {
    if (!upgradeDB.objectStoreNames.contains('teams')) {
        upgradeDB.createObjectStore('teams')
    }
    if (!upgradeDB.objectStoreNames.contains('matches')) {
        upgradeDB.createObjectStore('matches')
    }
})
//add favorite Team
const addTeam = ({
    id,
    logo,
    name,
    venue,
    website
}) => {
    dbPromise
        .then(db => {
            let tx = db.transaction('teams', 'readwrite');
            let store = tx.objectStore('teams');
            let item = {
                id: id,
                logo: logo,
                name: name,
                venue: venue,
                website: website,
                created: new Date().getTime()
            };
            store.put(item, id); //menambahkan key "teams"
            return tx.complete;
        })
        .then(() => console.log('Succes Add Favorite Team', name))
        .catch(() => console.log('Failed Add Favorite Team,Please Retry'))
}

const deleteTeam = id => {
    dbPromise
        .then(db => {
            let tx = db.transaction('teams', 'readwrite')
            let store = tx.objectStore('teams')
            store.delete(id)
            return tx.complete
        })
        .then(() => console.log('Item Deleted'))
}

const getTeams = () => {
    return dbPromise
        .then(db => {
            let tx = db.transaction('teams', 'readonly')
            let store = tx.objectStore('teams')

            return store.getAll()
        })
        .then(data => data)
}
//End Add Favorite Team
//Add Match Favorite Team
const addMatch = ({
    id,
    lastUpdated,
    matchday,
    utcDate,
    home,
    away,
    name,
}) => {
    dbPromise
        .then(db => {
            let tx = db.transaction('matches', 'readwrite');
            let store = tx.objectStore('matches');
            let item = {
                id: id,
                lastUpdated: lastUpdated,
                matchday: matchday,
                utcDate: utcDate,
                home: home,
                away: away,
                name: name,
                created: new Date().getTime()
            };
            store.put(item, id); //menambahkan key "matches"
            return tx.complete;
        })
        .then(() => console.log('Succes Add Favorite Match'))
        .catch(() => console.log('Failed Add Favorite Match,Please Retry'))
}
const deleteMatch = id => {
    dbPromise
        .then(db => {
            let tx = db.transaction('matches', 'readwrite')
            let store = tx.objectStore('matches')
            store.delete(id)
            return tx.complete
        })
        .then(() => console.log('Item Deleted'))
}

const getMatches = () => {
    return dbPromise
        .then(db => {
            let tx = db.transaction('matches', 'readonly')
            let store = tx.objectStore('matches')

            return store.getAll()
        })
        .then(data => data)
}

export default {
    addTeam,
    deleteTeam,
    getTeams,
    //Match
    addMatch,
    deleteMatch,
    getMatches
}