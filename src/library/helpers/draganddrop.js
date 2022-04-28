export default class DragAndDrop {
  static Drag (event, param) {
    event.dataTransfer.setData(param, event.target.id)
  }

  static Drop (event, param) {
    event.preventDefault()
    var data = event.dataTransfer.getData(param)
    return data
  }
}
