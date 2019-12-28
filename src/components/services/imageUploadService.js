import Firebase from '../../config/Firebase';

export async function getDownloadImageUrl(uri, fileName) {
    const imageUri = getUriBasedOnOS(uri)
    const response = await fetch(imageUri);
    const blob = await response.blob();
    var storageRef = Firebase.storage().ref().child('images/' + fileName);
    let task = storageRef.put(blob);
    return new Promise((resolve, reject) => {
        task.on('state_changed', () => { },
            (error) => { reject(error) },
            () => {
                task.snapshot.ref.getDownloadURL()
                    .then((downloadUrl) => {
                        resolve(downloadUrl)
                    })
                    .catch((error) => reject(error))
            }
        )
    });
}

function getUriBasedOnOS(uri) {
    const imageUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
    return imageUri;
}