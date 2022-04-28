import configStore from './configStore'
import Axios from 'axios'
import AuthHelper from 'Helpers/authhelper'

export async function refreshToken () {
  return new Promise((resolve, reject) => {
    const headers = { Accept: 'application/json', 'Content-Type': 'application/json' }

    Axios({
      method: 'post',
      url: (process.env.NODE_ENV === 'production' ? configStore.settings.publishUrl : configStore.settings.localUrl) + 'Authentication/RefreshAccessToken/',
      data: { refreshToken: AuthHelper.GetRefreshToken(), accessToken: AuthHelper.GetAccessToken() },
      headers: headers
    }).then(function (response) {
      AuthHelper.SetAccessToken(response.data.Response.AccessToken)
      AuthHelper.SetRefreshToken(response.data.Response.RefreshToken)
      resolve(response)
    })
      .catch(error => {
        // burda ki error ikinci promise nin reject'inde yakalanıyor
        console.log(error)
        reject(error)
      })
  })
}
