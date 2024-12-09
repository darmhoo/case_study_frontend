
import CryptoJS from 'crypto-js';
const _key = import.meta.env.VITE_APP_SECRET_KEY

export function encrypt(txt: string) {
    return CryptoJS.AES.encrypt(txt, _key).toString();
}
export function decrypt(txtToDecrypt: string) {
    return CryptoJS.AES.decrypt(txtToDecrypt, _key).toString(CryptoJS.enc.Utf8);
}
