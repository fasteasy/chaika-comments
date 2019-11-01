<template>
    <figure class="avatar" :class="classList">
        <img :src="image" class="avatar__image" v-if="image">
        <div class="avatar__image avatar__placeholder" v-else></div>
        <figcaption :aria-label="username" class="avatar__username" v-if="abbr">{{ abbr }}</figcaption>
    </figure>
</template>

<script>
    export default {
        props: {
            image: { type: String, default: '' },
            username: { type: String, default: '' },
            size: { type: String, default: 'md' }
        },
        computed: {
            classList () {
                return {
                    [`avatar--${this.size}`]: true
                }
            },
            abbr () {
                return this.username.split(' ').map(word => word[0]).join(' ')
            }
        }
    }
</script>

<style lang="scss">
    .avatar {
        position: relative;
        padding: 0;
        margin: 0;
        display: inline-flex;
        &--sm {
            font-size: 50px;
        }
        &--md {
            font-size: 60px;
        }
        &--lg {
            font-size: 120px;
        }
    }
    .avatar__image {
        width: 1em;
        height: 1em;
        display: block;
        font-size: 1em;
    }
    .avatar__placeholder {
        background: #5C708E;
        border-radius: 50%;
    }
    .avatar__username {
        display: block;
        position: absolute;
        width: 100%;
        top: 50%;
        transform: translateY(-50%);
        font-size: 0.26em;
        line-height: 1em;
        text-align: center;
        color: #fff;
        font-family: sans-serif;
    }
</style>