<template>
  <div class="todo-app">
    <h1>My To-Do List</h1>
    <div class="input-area">
      <el-input placeholder="Add a new task" v-model="newTodo" @keyup.enter="addTodo"></el-input>
      <el-button type="primary" @click="addTodo">Add</el-button>
    </div>
    <el-divider />
    <div class="filter-area">
      <el-radio-group v-model="filter">
        <el-radio-button value="all">All</el-radio-button>
        <el-radio-button value="active">Active</el-radio-button>
        <el-radio-button value="completed">Completed</el-radio-button>
      </el-radio-group>
    </div>

    <el-card class="todo-list">
      <el-checkbox-group v-model="completedTodos">
        <div class="todo-item" v-for="todo in filteredTodos" :key="todo.id">
          <el-checkbox :value="todo.id">
            <span :class="{ 'completed': todo.completed }">{{ todo.text }}</span>
          </el-checkbox>
          <el-button type="danger" size="small" circle @click="removeTodo(todo.id)">
            <el-icon>
              <delete />
            </el-icon>
          </el-button>
        </div>
      </el-checkbox-group>
    </el-card>

    <div class="stats">
      <span>{{ activeTodoCount }} items left</span>
      <el-button class="link-button" v-if="completedTodoCount > 0" @click="clearCompleted">Clear completed</el-button>
    </div>
  </div>
</template>
<script>
import { Delete } from '@element-plus/icons-vue'
import { ref, computed, watch } from "vue";
export default {
  components: { Delete },
  setup() {
    const STORAGE_KEY = 'vue-todo-list'

    //从localStorage加载初始数据
    const initialTodos = JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
    const newTodo = ref('')
    const todos = ref(initialTodos)
    const filter = ref('all')

    //监听todos变化并保存到localStorage
    watch(todos, (newTodos) => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newTodos))
    }, { deep: true })

    //添加新任务
    const addTodo = () => {
      if (newTodo.value.trim()) {
        todos.value.push({
          id: Date.now(),
          text: newTodo.value.trim(),
          completed: false
        })
        newTodo.value = ''
      }
    }

    //删除任务
    const removeTodo = (id) => {
      todos.value = todos.value.filter(todo => todo.id !== id)
    }

    //已完成任务列表
    const completedTodos = computed({
      get() {
        return todos.value.filter(todo => todo.completed).map(todo => todo.id)
      },
      set(ids) {
        todos.value.forEach(todo => {
          todo.completed = ids.includes(todo.id)
        })
      }
    })

    //过滤后的任务列表
    const filteredTodos = computed(() => {
      switch (filter.value) {
        case 'active':
          return todos.value.filter(todo => !todo.completed)
        case 'completed':
          return todos.value.filter(todo => todo.completed)
        default:
          return todos.value
      }
    })

    //未完成的任务数
    const activeTodoCount = computed(() => {
      return todos.value.filter(todo => !todo.completed).length
    })

    //已完成任务数
    const completedTodoCount = computed(() => {
      return todos.value.length - activeTodoCount.value
    })

    //清除已完成任务
    const clearCompleted = () => {
      todos.value = todos.value.filter(todo => !todo.completed)
    }

    return { newTodo, todos, filter, addTodo, filteredTodos, completedTodos, removeTodo, activeTodoCount, completedTodoCount, clearCompleted }
  }
}
</script>

<style scoped>
.todo-app {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.input-area {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.todo-list {
  margin: 20px 0;
}

.todo-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
}

.todo-item:last-child {
  border-bottom: none;
}

.completed {
  text-decoration: line-through;
  color: #999;
}

.stats {
  display: flex;
  justify-content: space-between;
  color: #666;
  font-size: 14px;
}

.link-button {
  padding: 0;
  border: none;
  color: var(--el-color-primary);
  background: transparent;
}

.link-button:hover {
  color: var(--el-color-primary-light-3);
  background: transparent;
}
</style>
