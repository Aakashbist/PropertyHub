import Firebase from '../../config/Firebase';
import DocumentPicker from 'react-native-document-picker';

const collection = "Documents"
export async function getDownloadUrl(uri, fileName) {
    const documentUri = getUriBasedOnOS(uri)
    const response = await fetch(documentUri);
    const blob = await response.blob();
    var storageRef = Firebase.storage().ref().child(`${collection}/${fileName}`);
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
    const documentUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
    return documentUri;
}

export function openDocumentPicker() {
    return new Promise((resolve, reject) => {
        try {
            const res = DocumentPicker.pickMultiple({
                type: [DocumentPicker.types.allFiles],
                // DocumentPicker.types.allFiles,image,plainText,audio,pdf
            });
            //uri,type,name(filename),size is in res obj

            resolve(res);

        } catch (err) {
            //Handling any exception (If any)
            if (DocumentPicker.isCancel(err)) {
                //If user canceled the document selection
                reject(error)
                console.log('Canceled from single doc picker');
            } else {
                reject(error)
                console.log('Unknown Error: ' + JSON.stringify(err));
                throw err;
            }
        }

    })
}
