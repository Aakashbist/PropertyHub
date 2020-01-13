import { filter, flatMap } from 'lodash';
import Firebase from '../../config/Firebase';

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
    let dbPropertyRef = Firebase.database().ref(`Property/`);
    dbPropertyRef.off();
    const onResponse = (dataSnapshot) => {

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
    }
    dbPropertyRef.orderByChild(`ownerId`).equalTo(userId).on('value', onResponse);
}
export function deletePropertiesWithId(propertyId) {
    let dbPropertyRef = Firebase.database().ref(`Property/${propertyId}`);
    console.log(dbPropertyRef.toString());
    return new Promise((resolve, reject) => {
        return dbPropertyRef.remove()
            .then(resolve(), console.log("resolve"))
            .catch(error => reject(error))
    })
}

export function getPropertyById(propertyId) {
    return new Promise((resolve, reject) => {
        let dbPropertyRef = Firebase.database().ref(`Property/${propertyId}`);
        return dbPropertyRef.once("value", snapShot => {
            let data = snapShot.val();
            resolve(data)
        }, error => reject(error))
    })
}

export function createProperty(property) {
    return new Promise((resolve, reject) => {
        let propertyDbRef = Firebase.database().ref().child("Property");
        propertyDbRef.push(property)
            .then((snapshot) => {
                resolve(snapshot.key)
            })
            .catch(error => reject(error))
    })
}

export function updateProperty(property, key) {
    return new Promise((resolve, reject) => {
        let propertyDbRef = Firebase.database().ref().child(`Property/${key}`);
        propertyDbRef.update(property)
            .then(resolve())
            .catch(error => reject(error))
    })
}

