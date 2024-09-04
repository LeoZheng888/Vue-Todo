import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const nickName = ref('')
  function setNickName(name) {
    nickName.value = name
  }
  return { nickName, setNickName }
})
