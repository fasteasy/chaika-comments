<template>
    <div class="comments">
        <template v-if="!hasComments">
            No comments
        </template>
        <template v-else>
            <ul class="comments-list">
               <li class="comments-list__item"
                   v-for="comment in comments"
                   :class="{ 'is-reply': isReply(comment) }"
                   :key="comment.id">
                   <comment :comment="comment"></comment>
               </li>
            </ul>
        </template>
    </div>
</template>

<script>
    import Comment from './Comment.vue'
    export default {
        components: { Comment },
        props: {
            comments: {type: Array, default: () => ({}) }
        },
        computed: {
            hasComments () {
                return this.comments && this.comments.length
            }
        },
        methods: {
            isReply (comment) {
                return !comment.isUser
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
</style>