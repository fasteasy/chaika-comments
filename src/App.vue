<template>
    <div id="app">
        <div class="container">
            <comments :items="comments" @update="edit" @remove="remove"></comments>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions, mapMutations } from 'vuex'
    import Comments from './components/Comments.vue'
//    import Data from './data.json'
    import CommentModel from './models/Comment'
    import Vue from 'vue'
    import Comment from './components/Comment.vue'
    import CommentsList from './components/CommentsList.vue'

    Vue.component('comment', Comment)
    Vue.component('comments-list', CommentsList)

    export default {
        name: 'app',
        components: { Comments },
        created () {
            this.loadComments()
        },
        computed: {
            ...mapGetters({
                comments: 'comments/hierarchy'
            })
        },
        methods: {
            ...mapActions({
                loadComments: 'comments/load',
                remove: 'comments/remove',
                edit: 'comments/edit',
            })
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