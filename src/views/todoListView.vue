<template>
  <div id="todoListPage" class="bg-half">
    <nav>
      <h1><a>ONLINE TODO LIST</a></h1>
      <ul>
        <li class="todo_sm">
          <a
            ><span>{{ todosName }}的代辦</span></a
          >
        </li>
        <li><a @click="signOut">登出</a></li>
      </ul>
    </nav>
    <div class="conatiner todoListPage vhContainer">
      <div class="todoList_Content">
        <div class="inputBox">
          <input v-model="addTodo" type="text" placeholder="請輸入待辦事項" />
          <a href="#" @click.prevent="addTodoItem">
            <i class="fa fa-plus"></i>
          </a>
        </div>
        <div class="todoList_nolist" v-if="todos.length == 0">
          <div class="d-flex justify-content-center align-items-center">
            <p class="text-center">目前尚無待辦事項</p>
            <div class="todoList_nolist_image"></div>
            <!-- <img src="@/assets/images/empty.png"/> -->
          </div>
        </div>
        <div class="todoList_list" v-else>
          <ul class="todoList_tab">
            <li>
              <a
                href="#"
                @click.prevent="setFilter('all')"
                :class="{ active: filterStatus == 'all' }"
                >全部</a
              >
            </li>
            <li>
              <a
                href="#"
                :class="{ active: filterStatus == 'false' }"
                @click.prevent="setFilter('false')"
              >
                待完成
              </a>
            </li>
            <li>
              <a
                href="#"
                :class="{ active: filterStatus == 'true' }"
                @click.prevent="setFilter('true')"
              >
                已完成
              </a>
            </li>
          </ul>
          <div class="todoList_items">
            <ul class="todoList_item" v-for="item in filterTodos" :key="index">
              <li>
                <label class="todoList_label">
                  <input
                    class="todoList_input"
                    type="checkbox"
                    @click.prevent="updateStatus(item.id)"
                    v-model="item.status"
                  />
                  <span>{{ item.content }}</span>
                </label>
                <a href="#" @click.prevent="deleteTodo(item.id)">
                  X
                  <i class="fa fa-times"></i>
                </a>
              </li>
            </ul>
            <div class="todoList_statistics">
              <p>{{ NoFinishTodo }}個待完成事項</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useCounterStore } from '@/stores/counter'
import Swal from 'sweetalert2'
import router from '@/router'
import axios from 'axios'
const userStore = useCounterStore()
const filterStatus = ref('all')
const api = 'https://todolist-api.hexschool.io'
const addTodo = ref('')
const todosName = ref('')
onMounted(async () => {
  await checkUser()
})
const token = ref('')
const todos = ref([])

const signOut = () => {
  Swal.fire({
    title: '登出成功',
    icon: 'success',
    confirmButtonText: '關閉',
    timer: 2000,
    willClose: () => {
      router.push({ name: 'home' })
    }
  })
}

// 檢查是否登入有效
const checkUser = async () => {
  token.value = getCookie('someCookieName')
  if (token.value) {
    try {
      const res = await axios.get(`${api}/users/checkout`, {
        headers: {
          Authorization: token.value
        }
      })
      todosName.value = res.data.nickname
      if (res.data.status == true) {
        await getTodos()
      }
    } catch (error) {
      Swal.fire({
        title: '登入失效',
        icon: 'error',
        text: '請重新登入',
        confirmButtonText: '關閉',
        timer: 2000
      }).then(() => {
        router.push({ name: 'home' })
      })
    }
  } else {
    Swal.fire({
      title: '登入失效',
      icon: 'error',
      text: '請重新登入',
      timer: 2000
    }).then(() => {
      router.push({ name: 'home' })
    })
  }
}

function getCookie(name) {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop().split(';').shift()
  return null // 如果找不到，返回 null
}

// 取得待辦事項
const getTodos = async () => {
  token.value = getCookie('someCookieName')
  const res = await axios.get(`${api}/todos`, {
    headers: {
      Authorization: token.value
    }
  })
  todos.value = res.data.data
}
const NoFinishTodo = computed(() => {
  return todos.value.filter((item) => !item.status).length
})
// 新增事項
const addTodoItem = async () => {
  token.value = getCookie('someCookieName')
  try {
    const res = await axios.post(
      `${api}/todos`,
      {
        content: addTodo.value
      },
      {
        headers: {
          Authorization: token.value
        }
      }
    )
    if (res.data.status == true) {
      Swal.fire({
        title: '新增成功',
        icon: 'success',
        confirmButtonText: '關閉',
        timer: 2000
      })
    }
    addTodo.value = ''
    await getTodos()
  } catch (error) {
    Swal.fire({
      title: '新增失敗',
      icon: 'error',
      text: '請重新新增',
      confirmButtonText: '關閉',
      timer: 2000
    })
    addTodo.value = ''
  }
}
const filterTodos = computed(() => {
  if (filterStatus.value == 'true') {
    return todos.value.filter((todo) => todo.status)
  } else if (filterStatus.value == 'false') {
    return todos.value.filter((todo) => !todo.status)
  } else {
    return todos.value
  }
})
const setFilter = (filter) => {
  filterStatus.value = filter
}
const updateStatus = async (id) => {
  token.value = getCookie('someCookieName')
  try {
    const res = await axios.patch(
      `${api}/todos/${id}/toggle`,
      {},
      {
        headers: {
          Authorization: token.value
        }
      }
    )
    await getTodos()
  } catch (error) {
    alert('失敗', error.response.data.message)
  }
}

const deleteTodo = async (id) => {
  token.value = getCookie('someCookieName')
  try {
    const res = await axios.delete(`${api}/todos/${id}`, {
      headers: {
        Authorization: token.value
      }
    })
    await getTodos()
  } catch (error) {
    alert('失敗', error.response.data.message)
  }
}
</script>
