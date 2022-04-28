import { LIST_COMPANY_USERS, SAVE_USER, UPDATE_USER, DELETE_USER } from '../actions/user'
import UserService from '../../services/UserService'

const state = {
  companyUsers: []
}

const getters = {
  companyUsers: state => state.companyUsers
}

const actions = {
  [LIST_COMPANY_USERS]: ({ commit }, request) => {
    return new Promise((resolve, reject) => {
      UserService.ListCompanyUsers(request).then(response => {
        commit(LIST_COMPANY_USERS, response)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  [SAVE_USER]: ({ commit }, request) => {
    return new Promise((resolve, reject) => {
      UserService.SaveUser(request).then(response => {
        commit(SAVE_USER, request, response)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  [UPDATE_USER]: ({ commit }, request) => {
    return new Promise((resolve, reject) => {
      UserService.UpdateUser(request).then(response => {
        commit(UPDATE_USER, request)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  [DELETE_USER]: ({ commit }, request) => {
    return new Promise((resolve, reject) => {
      UserService.DeleteUser(request).then(response => {
        commit(DELETE_USER, request)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  }
}

const mutations = {
  [LIST_COMPANY_USERS]: (state, response) => {
    state.companyUsers = response.data.Response
  },
  [SAVE_USER]: (state, request, response) => {
    request.Id = response.Id
    state.companyUsers.push(request)
  },
  [UPDATE_USER]: (state, request) => {
    var user = state.companyUsers.find(x => x.Id = request.Id)
    Object.assign(user, request)
  },
  [DELETE_USER]: (state, request) => {
    var index = state.companyUsers.indexOf(request)
    state.companyUsers.splice(index, 1)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
