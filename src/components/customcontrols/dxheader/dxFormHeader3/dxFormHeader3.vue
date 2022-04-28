<template>
  <div>
      <h3>{{ value }}</h3>
  </div>
</template>

<script>
export default {
  name: 'dxFormHeader3',
  props: {
    value: {
      type: String,
      required: false
    }
  }
}
</script>
