import { defineStore } from 'pinia'
import {ref} from "vue";
import axios from 'axios';

export const useTodo = defineStore('todo', {
    state: () => ({
        isLoggedIn: ref(false),
        users: ref([]),
        currentUser: ref({}),
        todo: ref([]),
        savedTodo: ref([])
    }),
    actions: {
        async getUsers() {
            await axios.get('https://jsonplaceholder.typicode.com/users')
                .then(response => {
                    this.users = response.data
                })
        },
        async getLoggedInUser(data: { username: string, phone: string }) {
            await this.getUsers()
            const user = this.users.find(user => user.username === data.username && user.phone === data.phone)
            if (user) {
                this.currentUser = user
                this.isLoggedIn = true
            } else {
                this.isLoggedIn = false
            }
        },
        async logout() {
            this.isLoggedIn = false
            this.currentUser = {}
        },
        async getTodo() {
            await axios.get('https://jsonplaceholder.typicode.com/todos')
                .then(response => {
                    this.todo = response.data
                })
            await this.todoSaveMap()
        },
        async saveTodo(id: number) {
            if (this.savedTodo.includes(id)) {
                this.savedTodo = this.savedTodo.filter((todo: number) => todo !== id)
            } else {
                this.savedTodo.push(id)
            }
            await this.todoSaveMap()
            localStorage.setItem('savedTodo', JSON.stringify(this.savedTodo));
        },
        async addTodo(data: { title: string, userId: number }) {
            await axios.post('https://jsonplaceholder.typicode.com/todos', {
                title: data.title,
                userId: data.userId,
            }).then(response => {
                    this.todo.push(response.data)
                })
            await this.todoSaveMap()
        },
        async todoSaveMap() {
            this.todo.map((todo: any) => { todo.saved = this.savedTodo.includes(todo.id) })
        }
    },
    getters: {
        getUserById: (state) => (id: number) => {
            return state.users.find((user: any) => user.id === id).name
        },
        getTodoByUserId: (state) => (id: number) => {
            return state.todo.filter((todo: any) => todo.userId === id)
        }
    }
})