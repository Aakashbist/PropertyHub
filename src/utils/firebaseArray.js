
export function mapToArray(data) {
    return Object.keys(data).map((key) => {
        data[key].id = key;
        return data[key];
    });
}

export function mapToArray2(data) {
    return Object.keys(data).map((key) => {
        console.log('[',key,'] ===> ',data[key])
        var newId = data[key]._id ? data[key]._id: key;
        data[key].id = newId;
        return data[key];
    });
}