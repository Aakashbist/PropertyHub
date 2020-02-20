import { Firebase } from '../../config/Firebase'

const ownerCollectionName = 'owners';
const tenantCollectionName = 'tenants';

export function getUserById(key) {
    // checks tenant first
    return new Promise((resolve, reject) => {
        Promise.all(
            [getTenantById(key),
            getOwnerById(key)]
        ).then(([tenant, owner]) => {
            resolve(tenant ? tenant : owner);
        }).catch(error => reject(error));
    });
}

export function getOwnerById(key) {
    return new Promise((resolve, reject) => {
        const user = Firebase.database().ref(`${ownerCollectionName}/${key}`);
        user.once("value", data => {
            resolve(data.val());
            console.log("service", JSON.stringify(data));
        }, error => reject(error));
    })
}

export function getTenantById(key) {
    return new Promise((resolve, reject) => {
        const user = Firebase.database().ref(`${tenantCollectionName}/${key}`);
        user.once("value", data => {
            resolve(data.val());
        }, error => reject(error));
    })
}

