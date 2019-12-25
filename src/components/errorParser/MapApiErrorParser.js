export default function parseMapApiError(json) {
    let errorMessage;
    switch (json.status) {
        case "REQUEST_DENIED":
            errorMessage = "Invalid Api Key"
            break;
        case "UNKNOWN_ERROR":
            errorMessage = "Server error try again"
            break;
        case "ZERO_RESULTS":
            errorMessage = "No result found"
            break;
        case "INVALID_REQUEST":
            errorMessage = "Invalid request operation"
            break;
        default:
            errorMessage = json.status;
            break;
    }
    return errorMessage;
}
