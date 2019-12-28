import Firebase from '../../config/Firebase';
import { flatMap, filter } from 'lodash';

export function getPropertiesBySearch(searchTerm) {
    return new Promise((resolve, reject) => {
        Firebase.database().ref('property').once(
            'value',
            snapshot => {
                var data = snapshot.val();
                var properties = flatMap(data, (ownerList, ownerId) => {
                    return flatMap(ownerList, (property, propertyId) => {
                        property.id = propertyId;
                        return property;
                    });
                });

                if (searchTerm) {
                    var matching = filter(properties, (property) => {
                        return property.address.toLowerCase().includes(searchTerm.toLowerCase());
                    });
                    resolve(matching);
                } else {
                    resolve(properties);
                }
            },
            error => reject(error));
    });
}

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