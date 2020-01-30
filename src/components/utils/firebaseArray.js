
export function mapToArray(data) {
    return Object.keys(data).map((key) => {
        data[key].id = key;
        return data[key];
    });
}  
