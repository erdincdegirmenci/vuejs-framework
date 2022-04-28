import he from 'he'

export default class HtmlEncoding {
  static Encode (value) {
    if (value) { return he.encode(value) }
  }

  static Decode (value) {
    if (value) { return he.decode(value) }
  }
}
