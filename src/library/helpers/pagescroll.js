export default class PageScroll {
  static WindowScrollTop () {
    window.scrollTo(0, 0)
  }

  static WindowScrollWithCoordinates (xCoord, yCoord) {
    window.scrollTo(xCoord, yCoord)
  }

  static GetYCoordinate () {
    return window.scrollY
  }

  static GetXCoordinate () {
    return window.scrollX
  }
}
