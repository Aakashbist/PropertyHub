import Firebase from '../../config/Firebase';

export function propertyReference(userId, callback) {
    let dbPropertyRef = Firebase.database().ref('property/' + userId);
    dbPropertyRef.on('value', (dataSnapshot, key) => {
        if (dataSnapshot.exists()) {
            let data = dataSnapshot.val();
            let result = Object.keys(data).map((key) => {
                data[key].id = key;
                return data[key];
            })
            callback(result);
        } else {
            callback(null)
        }
    })
}

export function deletePropertiesWithId(userId, propertyId) {
    let dbPropertyRef = Firebase.database().ref(`property/${userId}/${propertyId}`);
    return new Promise((resolve, reject) => {
        return dbPropertyRef.remove()
            .then(resolve())
            .catch(error => reject(error))
    })
}

export function getPropertyById(userId, propertyId) {
    return new Promise((resolve, reject) => {
        let dbPropertyRef = Firebase.database().ref(`property/${userId}/${propertyId}`); return dbPropertyRef.once("value", snapShot => {
            let data = snapShot.val();
            resolve(data)
        }, error => reject(error))
    })
}