<template>
    <form class="reply-form">
        <div class="reply-form__aside">
            <avatar class="reply-form__avatar" :image="avatar" :username="username"></avatar>
        </div>
        <div class="reply-form__main">
            <textarea name="reply" rows="1" v-model="message" class="reply-form__textarea"></textarea>
            <button type="submit" @submit.prevent="submit" class="reply-form__submit" :disabled="isValid">
                Комментировать
            </button>
        </div>
    </form>
</template>

<script>
    import Avatar from './Avatar.vue'
    export default {
        components: { Avatar },
        props: {
            avatar: { default: '', type: String },
            username: { default: 'Vadim Kochergin', type: String },
            value: { default: '', type: String }
        },
        computed: {
            message: {
                get () {
                    return this.value
                },
                set (value) {
                    this.$emit('input', value)
                }
            },
            isValid () {
                return !!this.message
            }
        },
        methods: {
            submit () {
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
    }
    .reply-form__submit {
        margin-top: 20px;
    }
</style>