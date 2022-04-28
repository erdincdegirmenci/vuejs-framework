export default class ConverterHelper {
  static EncodeBase64FromString (value) {
    if (value) {
      var byteString = btoa(value)
      return byteString
    }
  }

  static DecodeBase64ToString (value) {
    if (value) {
      var byteString = atob(value)
      return byteString
    }
  }
}
