import { LIST_PARAMETER } from '../actions/parameter'
import ParameterService from 'Services/ParameterService'

const state = {
  parameterValues: []
}

const getters = {
  parameterValues: state => state.parameterValues
}

const actions = {
  [LIST_PARAMETER]: ({ commit }, request) => {
    return new Promise((resolve, reject) => {
      ParameterService.GetParameters(request).then(response => {
        commit(LIST_PARAMETER, response)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  }
}

const mutations = {
  [LIST_PARAMETER]: (state, response) => {
    state.parameterValues = response.data.Response
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
