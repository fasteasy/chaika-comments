import Data from '../../data.json'
import CommentModel from '../../models/Comment'
import CommentService from '../../services/comments'

export default {
    namespaced: true,
    state: {
        userId: '111',
        comments: []
    },
    getters: {
        hierarchy (state) {
            const user = state.userId
            const items = state.comments.slice()

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
            return CommentService
                .remove(id)
                .then(() => {
                    commit('remove', id)
                })
        },

        add ({ commit, state }, comment) {
            comment.created = (new Date).getTime()
            comment.user = state.userId
            return CommentService
                .create(comment)
                .then((id) => {
                    comment.id = id
                    commit('add', comment)
                })
        },

        edit ({ commit }, editable) {
            editable.updated = (new Date).getTime()
            return CommentService
                .update(editable.id, editable)
                .then(() => commit('edit', editable))
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

        edit (state, edited) {
            const comments = state.comments
            const idx = comments.findIndex(item => item.id === edited.id)
            comments[idx] = edited
            state.comments = state.comments.slice()
        },

        add (state, comment) {
            state.comments.push(comment)
        }
    }
}