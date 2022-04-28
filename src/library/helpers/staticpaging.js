export default class StaticPaging {
  GoNextPage (pageNum, pageCount, pageDataCount, showingList, copyList) {
    if (pageNum < pageCount) {
      showingList = copyList.slice(pageNum * pageDataCount, (pageNum + 1) * pageDataCount)
      return showingList
    } else {
      return []
    }
  }

  GoPreviousPage (pageNum, pageDataCount, showingList, copyList) {
    if (pageNum >= 1) {
      showingList = copyList.slice((pageNum - 1) * pageDataCount, pageNum * pageDataCount)
      return showingList
    } else {
      return []
    }
  }

  GoSelectedPage (pageDataCount, showingList, copyList, val) {
    showingList = copyList.slice((val - 1) * pageDataCount, (val) * pageDataCount)
    return showingList
  }

  GoEnteredPage (pageCount, pageDataCount, showingList, copyList, event) {
    if (Number(event.target.value) < 1 || Number(event.target.value) > pageCount) {
      return []
    } else {
      showingList = copyList.slice((Number(event.target.value) - 1) * pageDataCount, (Number(event.target.value)) * pageDataCount)
      return showingList
    }
  }
}
