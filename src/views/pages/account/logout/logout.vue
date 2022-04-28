<template>
    <div>
        <p>Çıkış yapıldı....</p>
    </div>
</template>
<script>
import { AUTH_LOGOUT } from '@/store/actions/auth'

export default {
  data () {
    return {
      alertoptions: {
        okText: 'Tamam'
      }
    }
  },
  created: function () {
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }

    this.$store.dispatch(AUTH_LOGOUT, { headers })
      .then(response => {
        this.$router.push('/login')
      })
  }
}

</script>
