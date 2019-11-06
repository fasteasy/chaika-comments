<template>
    <div id="app">
        <div class="container">
            <comments :items="comments" @push="push"></comments>
        </div>
    </div>
</template>

<script>
    import Comments from './components/Comments.vue'
    import Data from './data.json'
    import CommentModel from './models/Comment'
    import Vue from 'vue'
    import Comment from './components/Comment.vue'
    import CommentsList from './components/CommentsList.vue'

    Vue.component('comment', Comment)
    Vue.component('comments-list', CommentsList)

    export default {
        name: 'app',
        components: { Comments },
        data () {
            return {
                userId: '111',
                items: null
            }
        },
        created () {
            setTimeout(() => {
                this.items = Data.comments.map(item => new CommentModel(item))
            }, 1000)
        },
        computed: {
            comments () {
                if (!this.items) return []
                return this.items.length ? this.makeHierarchy(this.items) : []
            }
        },
        methods: {
            makeHierarchy (items) {
                const user = this.userId
                function makeComment (item) {
                    const Comment = new CommentModel(item)
                    Comment.isUser = item.user === user
                    Comment.comments = items.filter(i => i.parent === item.id).map(makeComment)
                    return Comment
                }

                const comments = items.map(makeComment).filter(comment => !comment.parent)
                return comments
            },
            push (comment) {
                this.items = this.items.concat([comment])
            }
        }
    }
</script>

<style lang="scss">
    body {
        font-family: 'Gotham Pro', sans-serif;
        background: #FAFBFC;
        font-weight: 300;
    }
    .container {
        max-width: 500px;
        margin-left: auto;
        margin-right: auto;
    }
</style>