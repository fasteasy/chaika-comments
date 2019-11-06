<template>
    <ul class="comments-list">
        <li class="comments-list__item"
            v-for="comment in comments"
            :class="{ 'is-reply': isReply(comment) }"
            :key="comment.id">
            <comment :comment="comment"></comment>
        </li>
    </ul>
</template>

<script>
    export default {
        name: 'comments-list',
        props: {
            comments: { type: Array, default: () => ([]) }
        },
        methods: {
            isReply (comment) {
                return !!comment.parent
            }
        }
    }
</script>