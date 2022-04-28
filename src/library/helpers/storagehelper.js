import Converter from 'Helpers/converthelper'
export default class AuthHelper {
  static GetLocalStorageItem (item) {
    if (item) {
      const localItem = localStorage.getItem(item)
      return Converter.DecodeBase64ToString(localItem)
    }
  }

  static SetLocalStorageItem (item, value) {
    if (item) {
      const localValue = Converter.EncodeBase64FromString(value)
      localStorage.setItem(item, localValue)
    }
  }

  static RemoveLocalStorageItem (item) {
    if (item) {
      localStorage.removeItem(item)
    }
  }
}
