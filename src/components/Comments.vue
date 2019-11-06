<template>
    <div class="comments">
        <template v-if="!hasComments">No comments</template>
        <comments-list :comments="items" v-else></comments-list>
        <reply-form class="comments__reply-form" v-model="reply"></reply-form>
    </div>
</template>

<script>
    import Bus from '../bus'
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
                return this.comments && this.comments.length
            },
            comments () {
                return this.items
            }
        },
        mounted () {
            const app = this
            Bus.$on('submit', (comment) => {
                CommentService.send(comment).then(() => {
                    comment.id = String(Math.ceil(Math.random() * 100))
                    app.$emit('push', comment)
                })
            })
        },
        methods: {
            parents () {
                return this.comments.filter(comment => !comment.parent)
            },
            children (id) {
                const children = this.comments.filter(comment => {
                    return comment.parent === id
                })
                return children
            },
            isReply (comment) {
                return !!comment.parent
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