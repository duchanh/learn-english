import CryptoJS from 'crypto-js'

export const replaceSafeBase64 = (input: any) => {
  return input.replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')
}

// resize on the fly
export const urlSafeBase64 = (str: string) => {
  return replaceSafeBase64(Buffer.from(str).toString('base64'))
}

export const sign = (salt: any, target: any, secret: any) => {
  const hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, CryptoJS.enc.Hex.parse(secret))
  hmac.update(CryptoJS.enc.Hex.parse(salt))
  hmac.update(target)
  return replaceSafeBase64(hmac.finalize().toString(CryptoJS.enc.Base64))
}
