import ApiCall from '../library/helpers/apicall'
import AuthHelper from 'Helpers/authhelper'

export default class ParameterService {
  static async GetParameters (request) {
    const headers = { Accept: 'application/json', 'Content-Type': 'application/json', Authorization: 'Bearer ' + AuthHelper.GetAccessToken() }
    return await new Promise((resolve, reject) => {
      const api = new ApiCall()
      api.AxiosPost('Parameter/GetParameters', request, headers)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
}
