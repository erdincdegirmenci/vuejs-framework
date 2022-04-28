import Axios from 'axios'
import { refreshToken } from './refreshtoken'
import configStore from './configStore'
import router from '@/router/index'
import { AUTH_LOGOUT } from '@/store/actions/auth'
import store from '@/store'
import AuthHelper from 'Helpers/authhelper'

export default class ApiCall {
    baseUrl = '';
    headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }

    constructor () {
      this.baseUrl = (process.env.NODE_ENV === 'production' ? configStore.settings.publishUrl : configStore.settings.localUrl)
    }

    async AxiosGetAll (url, _headers) {
      this.headers = { ...this.headers, ..._headers }

      return await new Promise((resolve, reject) => {
        Axios({
          method: 'get',
          url: this.baseUrl + url,
          headers: this.headers
        })
          .catch(error => {
            if (error.response.status === 401 && AuthHelper.GetAccessToken()) {
              return new Promise((resolve) => {
                refreshToken().then(response => {
                  if (response.status === 200) {
                    if (response.data.IsSucceed) {
                      _headers = { Accept: 'application/json', 'Content-Type': 'application/json', Authorization: 'Bearer ' + AuthHelper.GetAccessToken() }
                      resolve(this.AxiosGetAll(url, _headers))
                    } else {
                      const headersForLogOut = {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                      }

                      store.dispatch(AUTH_LOGOUT, { headersForLogOut })
                        .then(response => {
                          router.push('/login')
                        })
                    }
                  }
                })
                  .catch(_error => {
                    // ilk promise'nin reject ini kullandÄ±m Ã§Ã¼nkÃ¼ ilkinden dÃ¶nÃ¼yor error aslÄ±nda
                    console.log(error)
                    console.log(_error)
                    router.push('/login')
                  })
              })
            } else if (error.response.status === 401 && !AuthHelper.GetAccessToken()) {
              router.push('/login')
              reject(error)
            } else {
              reject(error)
            }
          })
          .then(response => {
            if (response && response.data && !response.data.IsSucceed && response.data.ErrorCode) {
              reject(response.data.ErrorCode)
            } else {
              resolve(response)
            }
          })
      })
    }

    async AxiosReadFile (url, item, _headers) {
      this.headers = { ...this.headers, ..._headers }

      return await new Promise((resolve, reject) => {
        Axios({
          method: 'post',
          url: this.baseUrl + url,
          data: item,
          headers: this.headers,
          responseType: 'arraybuffer'
        })
          .catch(error => {
            if (error.response.status === 401 && AuthHelper.GetAccessToken()) {
              return new Promise((resolve) => {
                refreshToken().then(response => {
                  if (response.status === 200) {
                    if (response.data.IsSucceed) {
                      _headers = { Accept: 'application/json', 'Content-Type': 'application/json', Authorization: 'Bearer ' + AuthHelper.GetAccessToken() }
                      resolve(this.AxiosReadFile(url, item, _headers))
                    } else {
                      const headersForLogOut = {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                      }

                      store.dispatch(AUTH_LOGOUT, { headersForLogOut })
                        .then(response => {
                          router.push('/login')
                        })
                    }
                  }
                })
                  .catch(_error => {
                    // ilk promise'nin reject ini kullandÄ±m Ã§Ã¼nkÃ¼ ilkinden dÃ¶nÃ¼yor error aslÄ±nda
                    console.log(error)
                    console.log(_error)
                    router.push('/login')
                  })
              })
            } else if (error.response.status === 401 && !AuthHelper.GetAccessToken()) {
              router.push('/login')
              reject(error)
            } else {
              reject(error)
            }
          })
          .then(resp => {
            resolve(resp)
          })
      })
    }

    async AxiosGetWithId (url, item, _headers) {
      this.headers = { ...this.headers, ..._headers }

      return await new Promise((resolve, reject) => {
        Axios({
          method: 'get',
          url: this.baseUrl + url,
          data: item,
          headers: this.headers
        })
          .catch(error => {
            if (error.response.status === 401 && AuthHelper.GetAccessToken()) {
              return new Promise((resolve) => {
                refreshToken().then(response => {
                  if (response.status === 200) {
                    if (response.data.IsSucceed) {
                      _headers = { Accept: 'application/json', 'Content-Type': 'application/json', Authorization: 'Bearer ' + AuthHelper.GetAccessToken() }
                      resolve(this.AxiosGetWithId(url, item, _headers))
                    } else {
                      const headersForLogOut = {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                      }

                      store.dispatch(AUTH_LOGOUT, { headersForLogOut })
                        .then(response => {
                          router.push('/login')
                        })
                    }
                  }
                })
                  .catch(_error => {
                    // ilk promise'nin reject ini kullandÄ±m Ã§Ã¼nkÃ¼ ilkinden dÃ¶nÃ¼yor error aslÄ±nda
                    console.log(error)
                    console.log(_error)
                    router.push('/login')
                  })
              })
            } else if (error.response.status === 401 && !AuthHelper.GetAccessToken()) {
              router.push('/login')
              reject(error)
            } else {
              reject(error)
            }
          })
          .then(response => {
            if (response && response.data && !response.data.IsSucceed && response.data.ErrorCode) {
              reject(response.data.ErrorCode)
            } else {
              resolve(response)
            }
          })
      })
    }

    async AxiosPost (url, item, _headers) {
      this.headers = { ...this.headers, ..._headers }

      return await new Promise((resolve, reject) => {
        Axios({
          method: 'post',
          url: this.baseUrl + url,
          data: item,
          headers: this.headers
        })
          .catch(error => {
            if (error.response.status === 401 && AuthHelper.GetAccessToken()) {
              return new Promise((resolve) => {
                refreshToken().then(response => {
                  if (response.status === 200) {
                    if (response.data.IsSucceed) {
                      _headers = { Accept: 'application/json', 'Content-Type': 'application/json', Authorization: 'Bearer ' + AuthHelper.GetAccessToken() }
                      resolve(this.AxiosPost(url, item, _headers))
                    } else {
                      const headersForLogOut = {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                      }

                      store.dispatch(AUTH_LOGOUT, { headersForLogOut })
                        .then(response => {
                          router.push('/login')
                        })
                    }
                  }
                })
                  .catch(_error => {
                    // ilk promise'nin reject ini kullandÄ±m Ã§Ã¼nkÃ¼ ilkinden dÃ¶nÃ¼yor error aslÄ±nda
                    console.log(error)
                    console.log(_error)
                    router.push('/login')
                  })
              })
            } else if (error.response.status === 401 && !AuthHelper.GetAccessToken()) {
              router.push('/login')
              reject(error)
            } else {
              reject(error)
            }
          })
          .then(response => {
            if (response && response.data && !response.data.IsSucceed && response.data.ErrorCode) {
              reject(response.data.ErrorCode)
            } else {
              resolve(response)
            }
          })
      })
    }

    async AxiosPut (url, item, _headers) {
      this.headers = { ...this.headers, ..._headers }

      return await new Promise((resolve, reject) => {
        Axios({
          method: 'put',
          url: this.baseUrl + url,
          data: item,
          headers: this.headers
        })
          .catch(error => {
            if (error.response.status === 401 && AuthHelper.GetAccessToken()) {
              return new Promise((resolve) => {
                refreshToken().then(response => {
                  if (response.status === 200) {
                    if (response.data.IsSucceed) {
                      _headers = { Accept: 'application/json', 'Content-Type': 'application/json', Authorization: 'Bearer ' + AuthHelper.GetAccessToken() }
                      resolve(this.AxiosPut(url, item, _headers))
                    } else {
                      const headersForLogOut = {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                      }

                      store.dispatch(AUTH_LOGOUT, { headersForLogOut })
                        .then(response => {
                          router.push('/login')
                        })
                    }
                  }
                })
                  .catch(_error => {
                    // ilk promise'nin reject ini kullandÄ±m Ã§Ã¼nkÃ¼ ilkinden dÃ¶nÃ¼yor error aslÄ±nda
                    console.log(error)
                    console.log(_error)
                    router.push('/login')
                  })
              })
            } else if (error.response.status === 401 && !AuthHelper.GetAccessToken()) {
              router.push('/login')
              reject(error)
            } else {
              reject(error)
            }
          })
          .then(response => {
            if (response && response.data && !response.data.IsSucceed && response.data.ErrorCode) {
              reject(response.data.ErrorCode)
            } else {
              resolve(response)
            }
          })
      })
    }

    async AxiosDelete (url, item, _headers) {
      this.headers = { ...this.headers, ..._headers }

      return await new Promise((resolve, reject) => {
        Axios({
          method: 'delete',
          url: this.baseUrl + url,
          data: item,
          headers: this.headers
        })
          .catch(error => {
            if (error.response.status === 401 && AuthHelper.GetAccessToken()) {
              return new Promise((resolve) => {
                refreshToken().then(response => {
                  if (response.status === 200) {
                    if (response.data.IsSucceed) {
                      _headers = { Accept: 'application/json', 'Content-Type': 'application/json', Authorization: 'Bearer ' + AuthHelper.GetAccessToken() }
                      resolve(this.AxiosDelete(url, item, _headers))
                    } else {
                      const headersForLogOut = {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                      }

                      store.dispatch(AUTH_LOGOUT, { headersForLogOut })
                        .then(response => {
                          router.push('/login')
                        })
                    }
                  }
                })
                  .catch(_error => {
                    // ilk promise'nin reject ini kullandÄ±m Ã§Ã¼nkÃ¼ ilkinden dÃ¶nÃ¼yor error aslÄ±nda
                    console.log(error)
                    console.log(_error)
                    router.push('/login')
                  })
              })
            } else if (error.response.status === 401 && !AuthHelper.GetAccessToken()) {
              router.push('/login')
              reject(error)
            } else {
              reject(error)
            }
          })
          .then(response => {
            if (response && response.data && !response.data.IsSucceed && response.data.ErrorCode) {
              reject(response.data.ErrorCode)
            } else {
              resolve(response)
            }
          })
      })
    }
}
