import ApiCall from '../library/helpers/apicall'
import AuthHelper from '../library/helpers/authhelper'

export default class AuthService {
  static async Login (request) {
    const headers = { Accept: 'application/json', 'Content-Type': 'application/json' }
    return new Promise((resolve, reject) => {
      const api = new ApiCall()
      api.AxiosPost('Authentication/Login', request, headers)
        .then(response => {
          AuthHelper.SetUser({ UserName: response.data.Response.Username, Roles: response.data.Response.Roles, Permissions: response.data.Response.Permissions })
          AuthHelper.SetAccessToken(response.data.Response.AccessToken)
          AuthHelper.SetRefreshToken(response.data.Response.RefreshToken)
          resolve(response)
        })
        .catch(error => {
          AuthHelper.RemoveUser()
          AuthHelper.RemoveAccessToken()
          AuthHelper.RemoveRefreshToken()
          reject(error)
        })
    })
  }

  static async Register (request) {
    const headers = { Accept: 'application/json', 'Content-Type': 'application/json' }
    return new Promise((resolve, reject) => {
      const api = new ApiCall()
      api.AxiosPost('Authentication/Register', request, headers)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  static async Logout () {
    const headers = { Accept: 'application/json', 'Content-Type': 'application/json', Authorization: 'Bearer ' + AuthHelper.GetAccessToken() }
    return new Promise((resolve, reject) => {
      const api = new ApiCall()
      api.AxiosPost('Authentication/Logout', {}, headers)
    })
  }

  static async ForgotPassword (request) {
    const headers = { Accept: 'application/json', 'Content-Type': 'application/json' }
    return new Promise((resolve, reject) => {
      const api = new ApiCall()
      api.AxiosPost('Authentication/ForgotPassword', request, headers)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  static async MailActivation (request) {
    const headers = { Accept: 'application/json', 'Content-Type': 'application/json' }
    return new Promise((resolve, reject) => {
      const api = new ApiCall()
      api.AxiosPost('Authentication/MailActivation', request, headers)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  static async ChangePassword (request) {
    const headers = { Accept: 'application/json', 'Content-Type': 'application/json' }
    return new Promise((resolve, reject) => {
      const api = new ApiCall()
      api.AxiosPost('Authentication/ChangePassword', request, headers)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  static async IsLogin () {
    const headers = { Accept: 'application/json', 'Content-Type': 'application/json', Authorization: 'Bearer ' + AuthHelper.GetAccessToken() }
    return new Promise((resolve, reject) => {
      const api = new ApiCall()
      api.AxiosPost('Authentication/IsLogin', {}, headers)
    })
  }
}
