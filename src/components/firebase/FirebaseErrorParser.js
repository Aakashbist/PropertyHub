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
        case 'auth/invalid-email':
            errorMessage = 'Email is invalid';
            break;
        default:
            errorMessage = error.message;
            break;
    }
    return errorMessage;
}
