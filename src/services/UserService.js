import ApiCall from '../library/helpers/apicall'
import AuthHelper from 'Helpers/authhelper'

export default class UserService {
  // get company information

  static async ListCompanyUsers (request) {
    const headers = { Accept: 'application/json', 'Content-Type': 'application/json', Authorization: 'Bearer ' + AuthHelper.GetAccessToken() }
    return await new Promise((resolve, reject) => {
      const api = new ApiCall()
      api.AxiosPost('User/ListUsersByCompanyId', request, headers)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  static async SaveUser (request) {
    const headers = { Accept: 'application/json', 'Content-Type': 'application/json', Authorization: 'Bearer ' + AuthHelper.GetAccessToken() }
    return await new Promise((resolve, reject) => {
      const api = new ApiCall()
      api.AxiosPost('User/CreateUser', request, headers)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  static async UpdateUser (request) {
    const headers = { Accept: 'application/json', 'Content-Type': 'application/json', Authorization: 'Bearer ' + AuthHelper.GetAccessToken() }
    return await new Promise((resolve, reject) => {
      const api = new ApiCall()
      api.AxiosPost('User/UpdateUser', request, headers)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  static async DeleteUser (request) {
    const headers = { Accept: 'application/json', 'Content-Type': 'application/json', Authorization: 'Bearer ' + AuthHelper.GetAccessToken() }
    return await new Promise((resolve, reject) => {
      const api = new ApiCall()
      api.AxiosPost('User/DeleteUser', request, headers)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
}
