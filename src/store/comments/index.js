import Data from '../../data.json'
import CommentModel from '../../models/Comment'

export default {
    namespaced: true,
    state: {
        userId: '111',
        comments: []
    },
    getters: {
        // comment (state, id) {
        //     return state.comment.find(comment => comment.id === id)
        // },

        hierarchy (state) {
            const user = state.userId
            const items = state.comments

            function makeComment (item) {
                const Comment = new CommentModel(item)
                Comment.isUser = item.user === user
                Comment.comments = items.filter(i => i.parent === item.id).map(makeComment)
                return Comment
            }

            const comments = items.map(makeComment).filter(comment => !comment.parent)
            return comments
        }
    },
    actions: {
        load ({ commit }) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(commit('update', Data.comments))
                }, 500)
            })
        },

        remove ({ commit }, id) {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(commit('remove', id))
                }, 500)
            })
        },

        add ({ commit }, comment) {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(commit('add', comment))
                }, 500)
            })
        },

        edit ({ commit }, { comment, edited }) {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(commit('edit', { comment, edited }))
                }, 500)
            })
        },
    },
    mutations: {
        remove (state, id) {
            const comments = state.comments
            const idx = comments.findIndex(item => item.id === id)
            if (idx < 0) return
            comments.splice(idx, 1)
        },

        update (state, comments) {
            state.comments = comments.slice()
        },

        edit (state, { comment, edited }) {
            const comments = state.comments
            const idx = comments.findIndex(item => item.id === comment.id)
            comments[idx] = edited
            state.comments = state.comments.slice()
        },

        add (state, comment) {
            comment.created = (new Date).getTime()
            comment.user = state.userId
            state.comments = state.comments.slice().concat(comment)
        }
    }
}