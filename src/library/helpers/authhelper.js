import Converter from 'Helpers/converthelper'
const SecretKey = 'a2d'
export default class AuthHelper {
  static SetUser (value) {
    if (value) {
      const localItem = Converter.EncodeBase64FromString(JSON.stringify(value))
      localStorage.setItem('ui', SecretKey + localItem)
    }
  }

  static GetUser () {
    const localItem = localStorage.getItem('ui')
    if (localItem !== null) {
      return JSON.parse(Converter.DecodeBase64ToString(localItem.substr(3, localItem.length)))
    }
    return null
  }

  static RemoveUser () {
    localStorage.removeItem('ui')
  }

  static SetAccessToken (value) {
    if (value) {
      localStorage.setItem('at', value)
    }
  }

  static GetAccessToken () {
    const localItem = localStorage.getItem('at')
    if (localItem !== null) {
      return localItem
    }
    return null
  }

  static RemoveAccessToken () {
    localStorage.removeItem('at')
  }

  static SetRefreshToken (value) {
    if (value) {
      localStorage.setItem('rt', value)
    }
  }

  static GetRefreshToken () {
    const localItem = localStorage.getItem('rt')
    if (localItem !== null) {
      return localItem
    }
    return null
  }

  static RemoveRefreshToken () {
    localStorage.removeItem('rt')
  }
}
