<template>
  <v-container v-if="visible">
    <v-row>
      <v-col
        id="login__logo"
        col="12"
        md="12"
        class="d-flex flex-column justify-space-between align-center"
      >
        <v-img
            lazy-src="@/assets/images/legaltech-logo.png"
            alt="Legal Tech"
            max-width="300px"
            src="@/assets/images/legaltech-logo.png"
          ></v-img>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="12" class="mx-auto text-center">
        <h4 style="white-space: pre-line">{{ text }}</h4>
      </v-col>
    </v-row>
    <hr class="my-4" />
    <v-row>
      <v-col cols="12" md="12">
        <p class="col-12 h6 p-0 mb-3 float-right text-center">
          <a href="/login"
            ><span class="item-text" style="font-size:15px">{{
              GetLabel(this, "authentication_login")
            }}</span></a
          >
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  name: 'successPage',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    text: String
  }
}
</script>
<style>
</style>
