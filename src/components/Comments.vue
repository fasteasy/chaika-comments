<template>
    <div class="comments">
        <template v-if="!hasComments">No comments</template>
        <comments-list :comments="items" v-else></comments-list>
        <reply-form class="comments__reply-form" v-model="reply" @submit="postComment"></reply-form>
    </div>
</template>

<script>
    import { mapActions } from 'vuex'
    import CommentService from '../services/comments'
    import CommentModel from '../models/Comment'
    import ReplyForm from './ReplyForm.vue'
    export default {
        components: { ReplyForm },
        props: {
            items: { type: Array, default: () => ([]) }
        },
        data () {
            return {
                reply: new CommentModel()
            }
        },
        computed: {
            hasComments () {
                return this.items && this.items.length
            }
        },
        methods: {
            ...mapActions({
                add: 'comments/add'
            }),
            reset () {
                this.reply = new CommentModel()
            },
            postComment (comment) {
                this.add(comment)
                this.reset()
            }
        }
    }
</script>

<style lang="scss">
    .comments-list {
        display: block;
        list-style: none;
        padding: 0;
        margin: 0
    }

    .comments-list__item {
        padding: 0;
        margin: 0;
        margin-bottom: 30px;
        &:last-child {
            margin-bottom: 0;
        }

        &.is-reply {
            padding-left: 50px;
        }
    }
    .comments__reply-form {
        margin-top: 20px;
    }
</style>