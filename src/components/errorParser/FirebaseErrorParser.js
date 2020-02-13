export default function parseFirebaseError(error) {
    let errorMessage;

    switch (error.code) {
        case 'auth/wrong-password':
            errorMessage = 'Wrong Password';
            break;
        case 'auth/invalid-email':
            errorMessage = 'Invalid Email';
            break;
        case 'auth/user-not-found':
            errorMessage = 'Invalid User';
            break;
        case 'auth/email-already-in-use':
            errorMessage = 'Email already used';
            break;
        case 'auth/weak-password':
            errorMessage = 'Password is to weak';
            break;
        case 'storage/unauthenticated':
            errorMessage = "User is unauthenticated, please authenticate and try again";
            break;
        case 'storage/canceled':
            errorMessage = "User canceled the upload"
            break;
        case 'storage/unknown':
            errorMessage = "An unknown error occurred."
            break;
        case 'storage/invalid-argument':
            errorMessage = "invalid url provided for image try again";
            break;
        case 'storage/unauthorized':
            errorMessage = "permission denied ";
            break;
        default:
            errorMessage = error.message;
            break;
    }
    return errorMessage;
}
