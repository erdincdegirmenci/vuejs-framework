import constants from '../constants/constants'

export default class CustomDateFormatter {
  static ConvertDateToServiceZone (date) {
    if (date) {
      var offset = date.getTimezoneOffset() / 60
      var hours = date.getHours()

      date.setHours(hours - offset)
    }

    return date
  }

  static GetDate (date) {
    if (date) {
      var offset = date.getTimezoneOffset() / 60
      var hours = date.getHours()

      date.setHours(hours + offset)
    }
    return date
  }

  static CheckIfDateIsNull (date) {
    return (date == null || date.toISOString().split('T')[0] === '1970-01-01' || date.toISOString().split('T')[0] === '1969-12-31')
  }

  static SetSelectedHourToDate (date, input) {
    if (date !== null) {
      if (input) {
        let hour = ''
        const minute = input.split(':')[1].split(' ')[0]

        if (input.split(' ')[1] === 'pm') {
          hour = constants.timePm[Number(input.split(':')[0]) - 1]
        } else {
          hour = constants.timeAm[Number(input.split(':')[0]) - 1]
        }

        date.setHours(hour, Number(minute), 0)
      } else {
        date.setHours(12, 0, 0)
      }

      return date
    }
  }
}
