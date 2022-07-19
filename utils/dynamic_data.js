export function generateUUID(){
    let dt = new Date().getTime();
    let uuidGenerated = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        let r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuidGenerated;
}

export function generateRandomString() {
    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let stringGenerated = '';
    const charactersLength = characters.length;
    for ( let i = 0; i < 10; i++ ) {
        stringGenerated += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return stringGenerated;
}
