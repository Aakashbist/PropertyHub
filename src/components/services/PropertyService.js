import { filter } from 'lodash';
import Firebase from '../../config/Firebase';
import { mapToArray } from '../../utils/firebaseArray';

const propertyCollection = 'property';

export function getPropertiesBySearch(searchTerm) {
    return new Promise((resolve, reject) => {
        Firebase.database().ref(`${propertyCollection}`).once(
            'value',
            snapshot => {
                var data = snapshot.val();
                if (data) {
                    const properties = mapToArray(data);
                    if (searchTerm) {
                        var matching = filter(properties, (property) => {
                            return property.address.toLowerCase().includes(searchTerm.toLowerCase());
                        });
                        resolve(matching);
                    } else {
                        resolve(properties);
                    }
                } else {
                    resolve([]);
                }
            },
            error => reject(error));
    });
}

export function propertyReference(userId, callback) {
    let dbPropertyRef = Firebase.database().ref(`${propertyCollection}/`);

    dbPropertyRef.off();
    const onResponse = (dataSnapshot) => {

        if (dataSnapshot.exists()) {
            let data = dataSnapshot.val();
            let result = mapToArray(data)
            callback(result);
        } else {
            callback(null)
        }
    }
    dbPropertyRef.orderByChild(`ownerId`).equalTo(userId).on('value', onResponse);
}

export function deletePropertiesWithId(propertyId) {
    let dbPropertyRef = Firebase.database().ref(`${propertyCollection}/${propertyId}`);
    return new Promise((resolve, reject) => {
        return dbPropertyRef.remove()
            .then(resolve())
            .catch(error => reject(error))
    })
}

export function getPropertyById(propertyId) {
    return new Promise((resolve, reject) => {
        let dbPropertyRef = Firebase.database().ref(`${propertyCollection}/${propertyId}`);
        return dbPropertyRef.once("value", snapShot => {
            let data = snapShot.val();
            resolve(data)
        }, error => reject(error))
    })
}

export function createProperty(property) {
    return new Promise((resolve, reject) => {
        let propertyDbRef = Firebase.database().ref().child(propertyCollection);
        propertyDbRef.push(property)
            .then((snapshot) => {
                resolve(snapshot.key)
            })
            .catch(error => reject(error))
    })
}

export function updateProperty(property, key) {
    return new Promise((resolve, reject) => {
        let propertyDbRef = Firebase.database().ref().child(`${propertyCollection}/${key}`);
        propertyDbRef.update(property)
            .then(resolve())
            .catch(error => reject(error))
    })
}

