import Firebase from '../../config/Firebase'

const ownerCollectionName = 'owners';
const tenantCollectionName = 'tenants';

export function getUserById(key, isOwner) {
    if (isOwner) {
        return getOwnerById(key);
    } else {
        return getTenantById(key);
    }
}

export function getOwnerById(key) {
    return new Promise((resolve, reject) => {
        const user = Firebase.database().ref(`${ownerCollectionName}/${key}`);
        user.once("value", data => {
            console.log(data.val(), "owner");
            resolve(data.val());
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

