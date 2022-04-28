import {
  AUTH_REQUEST,
  AUTH_ERROR,
  AUTH_SUCCESS,
  AUTH_LOGOUT,
  REGISTER_REQUEST,
  REGISTER_ERROR,
  FORGOT_REQUEST,
  ACTIVATION_REQUEST,
  CHANGE_PASSWORD_REQUEST,
  AUTH_ISLOGIN
} from '../actions/auth'
import AuthService from '@/services/AuthService'
import AuthHelper from 'Helpers/authhelper'

const state = {
  currentUser: AuthHelper.GetUser() || '',
  accesstoken: AuthHelper.GetAccessToken() || '',
  refreshtoken: AuthHelper.GetRefreshToken() || ''
}

const getters = {
  isAuthenticated: state => !!state.accesstoken,
  currentUser: state => state.currentUser
}

const actions = {
  [AUTH_REQUEST]: ({ commit }, request) => {
    return new Promise((resolve, reject) => {
      AuthService.Login(request).then(response => {
        commit(AUTH_SUCCESS, response)
        resolve(response)
      })
        .catch(error => {
          AuthHelper.RemoveUser()
          AuthHelper.RemoveAccessToken()
          AuthHelper.RemoveRefreshToken()
          commit(AUTH_ERROR)
          reject(error)
        })
    })
  },
  [AUTH_LOGOUT]: ({ commit }) => {
    return new Promise(resolve => {
      AuthService.Logout()
      commit(AUTH_LOGOUT)
      AuthHelper.RemoveUser()
      AuthHelper.RemoveAccessToken()
      AuthHelper.RemoveRefreshToken()
      resolve()
    })
  },
  [REGISTER_REQUEST]: ({ commit }, request) => {
    return new Promise((resolve, reject) => {
      AuthService.Register(request).then(response => {
        resolve(response)
      })
        .catch(error => {
          reject(error)
        })
    })
  },
  [FORGOT_REQUEST]: ({ commit }, request) => {
    return new Promise((resolve, reject) => {
      AuthService.ForgotPassword(request).then(response => {
        resolve(response)
      })
        .catch(error => {
          reject(error)
        })
    })
  },
  [ACTIVATION_REQUEST]: ({ commit }, request) => {
    return new Promise((resolve, reject) => {
      AuthService.MailActivation(request).then(response => {
        resolve(response)
      })
        .catch(error => {
          reject(error)
        })
    })
  },
  [CHANGE_PASSWORD_REQUEST]: ({ commit }, request) => {
    return new Promise((resolve, reject) => {
      AuthService.ChangePassword(request).then(response => {
        resolve(response)
      })
        .catch(error => {
          reject(error)
        })
    })
  },
  [AUTH_ISLOGIN]: ({ commit }) => {
    return new Promise(resolve => {
      AuthService.IsLogin()
      resolve()
    })
  }
}

const mutations = {
  [AUTH_SUCCESS]: (state, response) => {
    state.currentUser = { UserName: response.data.Response.UserName, Roles: response.data.Response.Roles }
    state.accesstoken = response.data.Response.AccessToken
    state.refreshtoken = response.data.Response.RefreshToken
  },
  [AUTH_ERROR]: state => {
    state.currentUser = null
    state.accesstoken = null
    state.refreshtoken = null
  },
  [AUTH_LOGOUT]: state => {
    state.currentUser = ''
    state.accesstoken = ''
    state.refreshtoken = ''
  },
  [REGISTER_REQUEST]: (state, response) => {
    state.currentUser = ''
    state.accesstoken = ''
    state.refreshtoken = ''
  },
  [REGISTER_ERROR]: state => {
    state.currentUser = null
    state.accesstoken = null
    state.refreshtoken = null
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
