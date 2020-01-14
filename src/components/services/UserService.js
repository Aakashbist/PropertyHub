import Firebase from '../../config/Firebase'

export function getUserById(key, isOwner) {
    return new Promise((resolve, reject) => {
        var collectionName;
        if (isOwner) {
            collectionName = "owners"
        } else {
            collectionName = "tenants"
        }
        const user = Firebase.database().ref(`${collectionName}/${key}`);
        user.once("value", data => {
            resolve(data.val());
        }, error => reject(error));
    })
}

