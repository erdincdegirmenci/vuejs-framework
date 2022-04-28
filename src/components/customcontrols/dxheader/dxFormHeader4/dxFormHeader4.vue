<template>
  <div>
      <h4 class="blue empty-left-side seperator-header" >{{ value }}</h4>
  </div>
</template>

<script>
export default {
  name: 'dxFormHeader4',
  props: {
    value: {
      type: String,
      required: false
    }
  }
}
</script>
