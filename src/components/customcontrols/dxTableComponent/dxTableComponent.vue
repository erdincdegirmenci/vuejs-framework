<template>
  <div>
    <v-data-table
      :value="selectedItems"
      :headers="headers"
      :items="items"
      :search="search"
      class="elevation-1"
      :show-select="showCheckbox"
      :item-key="itemKey"
      @input="itemSelected"
    >
      <template v-slot:top>
        <v-toolbar flat v-if="showToolbar">
          <!--<v-toolbar-title>Title</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>-->
          <v-text-field
            v-if="showSearch"
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
          <v-spacer></v-spacer>
          <slot name="fabs"> </slot>
          <v-btn
            v-if="isAddButtonVisible"
            color="primary"
            fab
            x-small
            dark
            class="mb-2"
            @click="newItem"
            ><v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-toolbar>
         <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="headline"
              >Are you sure you want to delete this item?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete"
                >Cancel</v-btn
              >
              <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                >OK</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </template>
      <template v-slot:item.actions="row"
        ><!--headers ta actions objesi olmali-->
        <slot name="actions" :item="row">
          <v-icon small class="mr-2" @click="editItem(row)">
            mdi-pencil
          </v-icon>
          <v-icon small @click="deleteItem(row)"> mdi-delete </v-icon>
        </slot>
      </template>
      <template v-slot:no-data>
        <span>No data found</span>
      </template>

      <template
        v-for="header in customCols"
        v-slot:[`item.${header.value}`]="{ item }"
      >
        <slot :name="header.value" :item="item">
          {{ item[header.value] }}
        </slot>
      </template>

    </v-data-table>
  </div>
</template>

<script>
export default {
  name: 'dxTableComponent',
  data () {
    return {
      search: '',
      dialog: false,
      dialogDelete: false,
      selectedItem: -1,
      editedItem: {},
      defaultItem: {},
      selectedItems: []
    }
  },

  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    },
    selected: {
      handler: function (val) {
        var _this = this
        _this.selectedItems = []
        val.forEach((element) => {
          _this.selectedItems.push(element)
        })
      },
      immediate: true
    }
  },

  props: {
    headers: {
      type: Array,
      default: () => [],
      note: 'JSON formatted data that will be listed in the Table'
    },
    items: {
      type: Array,
      default: () => [],
      note: 'JSON formatted data that will be listed in the Table'
    },
    showFields: {
      type: Array,
      default: () => [],
      note: 'String array that will be filtered in the Table'
    },
    showToolbar: {
      type: Boolean,
      required: false,
      default: false
    },
    isAddButtonVisible: {
      type: Boolean,
      required: false,
      default: true
    },
    showFooter: {
      type: Boolean,
      required: false,
      default: false
    },
    showCheckbox: {
      type: Boolean,
      required: false,
      default: false
    },
    showRowAction: {
      type: Boolean,
      required: false,
      default: false
    },
    renderAddDialog: {
      type: Boolean,
      required: false,
      default: false
    },
    itemKey: {
      type: String,
      required: false
    },
    selected: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    newItem () {
      this.$emit('new-item')
    },
    editItem (row) {
      this.$emit('edit-item', row.item)
    },

    deleteItem (row) {
      this.selectedItem = row.item
      this.dialogDelete = true
    },

    deleteItemConfirm () {
      var index = this.items.indexOf(this.selectedItem)
      this.$emit('delete-item', this.selectedItem, index)
      this.closeDelete()
    },

    closeDelete () {
      this.dialogDelete = false
    },
    itemSelected (val) {
      if (this.selectedItems !== val) {
        this.selectedItems = val
        this.$emit('selectionChanged', val)
      }
    }
  },
  computed: {
    customCols () {
      return this.headers.filter((h) => h.customRender)
    }
  }
}
</script>
