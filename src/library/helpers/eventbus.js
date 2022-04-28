import Vue from 'vue'

export default class EventBus {
    eventBus = '';

    static CreateEventBus () {
      // export const eventBus = new Vue()
      this.eventBus = new Vue()
    }

    static EmitMethod (description) {
      if (typeof description === 'string') {
        this.eventBus.$emit(description)
      } else { console.log('Parameter must be type of string.') }
    }

    static EmitMethodWithValue (name, value) {
      if (typeof name === 'string') {
        this.eventBus.$emit(name, value)
      } else { console.log('name must be type of string.') }
    }

    static GetEventBus () {
      return this.eventBus
    }

    static CatchEventWithValue (event) {
      this.eventBus.$on(event, (data) => {
        return data
      })
    }

    static CloseEventBus () {
      this.eventBus.$off()
    }
}
