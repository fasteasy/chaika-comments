<template>
    <form class="reply-form" @submit.prevent="submit">
        <div class="reply-form__aside" v-if="showAvatar">
            <avatar class="reply-form__avatar" :image="comment.avatar" :username="comment.username"></avatar>
        </div>
        <div class="reply-form__main">
            <textarea name="reply"
                      rows="1"
                      @input="input"
                      :value="comment.text"
                      class="reply-form__textarea"
                      placeholder="Оставьте свой комментарий...">
            </textarea>
            <button type="submit" class="reply-form__submit" :disabled="!isValid">
                Комментировать
            </button>
            <button type="button" @click="$emit('cancel')">&times;</button>
        </div>
    </form>
</template>

<script>
    import Bus from '../bus'
    import CommentModel from '../models/Comment'
    import Avatar from './Avatar.vue'
    export default {
        components: { Avatar },
        model: { prop: 'comment', event: 'input' },
        props: {
            showAvatar: { type: Boolean, default: true },
            comment: { default: () => ({}), type: Object }
        },
        computed: {
            isValid () {
                return !!this.comment.text
            }
        },
        methods: {
            input (e) {
                this.$emit('input', Object.assign({}, this.comment, { text: e.target.value }))
            },
            submit () {
                const { parent, text } = this.comment
                this.$emit('submit', { parent, text })
            }
        }
    }
</script>

<style lang="scss">
    .reply-form {
        display: flex;
    }
    .reply-form__aside {
        margin-right: 20px;
    }
    .reply-form__main {
        flex: 1 1 auto;
    }
    .reply-form__textarea {
        display: block;
        width: 100%;
        padding: 20px 25px;
        resize: none;
        box-sizing: border-box;
        border-radius: 3px;
        border: 1px solid #DFE4E7;
        font-family: inherit;
        font-size: inherit;
        font-weight: 300;
        line-height: 1.31em;

        &::placeholder {
            color: rgba(#000, 0.5)
        }
    }
    .reply-form__submit {
        margin-top: 20px;
    }
</style>