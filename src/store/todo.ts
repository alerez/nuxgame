import { defineStore } from 'pinia'
import {ref} from "vue";
import axios from 'axios';

export const useTodo = defineStore('todo', {
    state: () => ({
        isLoggedIn: ref(false),
        users: ref<user[]>([]),
        currentUser: ref<user>({
            address: {city: "", geo: {lat: 0, lng: 0}, street: "", suite: "", zipcode: ""},
            company: {bs: "", catchPhrase: "", name: ""},
            email: "",
            id: 0,
            name: "",
            phone: "",
            username: "",
            website: ""
        }),
        todo: ref<todo[]>([]),
        savedTodo: ref<number[]>([])
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
            this.currentUser = {
                address: {city: "", geo: {lat: 0, lng: 0}, street: "", suite: "", zipcode: ""},
                company: {bs: "", catchPhrase: "", name: ""},
                email: "",
                id: 0,
                name: "",
                phone: "",
                username: "",
                website: ""
            }
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
            this.todo.map((todo: todo) => { todo.saved = this.savedTodo.includes(todo.id) })
        }
    },
    getters: {
        getUserById: (state) => (id: number) => {
            const user = state.users.find((user: user) => user.id === id)
            return user ? user.name : ''
        },
        getTodoByUserId: (state) => (id: number) => {
            return state.todo.filter((todo: todo) => todo.userId === id)
        }
    }
})