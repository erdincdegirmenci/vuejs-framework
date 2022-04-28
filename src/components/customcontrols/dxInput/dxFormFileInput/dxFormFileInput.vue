<template>
  <v-file-input
    ref="file"
    id="fileId"
    v-on:change="handleImage"
    @input="selectUploadItem"
    placeholder="Upload your documents"
    label="File input"
    multiple
    prepend-icon="mdi-paperclip"
    :outlined="hasBorder"
    :clearable="clear"
  >
    <template v-slot:selection="{ text }">
      <v-chip small label color="primary">
        {{ text }}
      </v-chip>
    </template>
  </v-file-input>
</template>

<script>
export default {
  name: 'dxFormFileInput',
  props: {
    clear: {
      type: Boolean,
      required: false,
      default: false
    },
    hasBorder: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data () {
    return {
      file: '',
      fileName: ''
    }
  },
  methods: {
    handleImage (e) {
      if (e.length > 0) {
        const selectedImage = e[0]
        this.createBase64File(selectedImage)
        this.fileName = selectedImage.name
      }
    },
    createBase64File (fileObject) {
      var reader = new FileReader()
      reader.onload = (e) => {
        var data = new Uint8Array(e.target.result)
        var byteString = btoa(new Uint8Array(data).reduce(function (data, byte) {
          return data + String.fromCharCode(byte)
        }, '')
        )
        this.file = byteString
        this.selectUploadItem()
      }
      reader.readAsArrayBuffer(fileObject)
    },
    selectUploadItem () {
      this.$emit('select-item', this.file, this.fileName)
    }
  },
  watch: {
    clear: function (input) {
      if (input) {
        this.image = ''
        this.fileName = ''
        document.getElementById('#fileId').value = ''
      }
    }
  }
}
</script>
