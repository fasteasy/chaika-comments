<template>
    <div class="comment">
        <div class="comment__base">
            <div class="comment__aside">
                <div class="comment__avatar">
                    <avatar username="Vadim Kochergin"></avatar>
                </div>
            </div>
            <div class="comment__main">
                <div class="comment__text" v-if="!editable">
                    {{ comment.text }}
                </div>
                <reply-form v-model="editable" :show-avatar="false" @submit="save" @cancel="cancel" v-else></reply-form>

                <div class="comment__footer" v-if="!editable">
                    <div class="comment__actions">
                        <template v-if="comment.isUser">
                            <!--<button type="button" @click="save" class="comment__action">-->
                                <!--<span>Cancel</span>-->
                            <!--</button>-->
                            <!--<button type="button" @click="cancel" class="comment__action">-->
                                <!--<span>Cancel</span>-->
                            <!--</button>-->
                            <button type="button" @click="edit" class="comment__action">
                                <svg class="comment__action-icon" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g opacity="0.56">
                                        <path d="M15.8119 3.62902C14.9731 2.79033 13.6132 2.79033 12.7745 3.62902L4.25963 12.1431C4.20127 12.2014 4.15914 12.2738 4.13714 12.3532L3.01742 16.3953C2.97137 16.561 3.01816 16.7385 3.13972 16.8602C3.26146 16.9818 3.43894 17.0286 3.60468 16.9827L7.64714 15.8629C7.72656 15.8409 7.7989 15.7988 7.85725 15.7404L16.3719 7.22614C17.2094 6.38689 17.2094 5.02827 16.3719 4.18902L15.8119 3.62902ZM5.29956 12.4533L12.2683 5.485L14.5158 7.73227L7.54684 14.7006L5.29956 12.4533ZM4.85063 13.3541L6.64618 15.1496L4.1625 15.8377L4.85063 13.3541ZM15.697 6.55131L15.1908 7.05743L12.9432 4.80998L13.4495 4.30385C13.9154 3.838 14.6709 3.838 15.1368 4.30385L15.697 4.86385C16.1622 5.33027 16.1622 6.08508 15.697 6.55131Z" fill="currentColor"/>
                                    </g>
                                </svg>
                                <span>Edit</span>
                            </button>
                            <button type="button" @click="removed = true" v-if="!removed"  class="comment__action">
                                <svg class="comment__action-icon" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g opacity="0.56">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M12.6574 7.82754L11.5662 7.78664L11.3292 14.2747L12.4211 14.3148L12.6574 7.82754ZM9.4535 14.2955H10.5462V7.80671H9.4535V14.2955ZM8.67049 14.2747L8.43344 7.78664L7.34155 7.82679L7.5786 14.3148L8.67049 14.2747Z" fill="currentColor"/>
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M7.3054 5.10219V3.9139C7.30559 3.67158 7.40158 3.43924 7.57228 3.26789C7.74297 3.09654 7.97443 3.00019 8.21582 3H11.7842C12.0257 3.00019 12.2572 3.09665 12.428 3.26815C12.5987 3.43966 12.6946 3.6722 12.6946 3.91464V5.10219H16.5V6.19828H15.3429L14.4399 16.4995C14.428 16.6361 14.3656 16.7632 14.265 16.8559C14.1643 16.9485 14.0327 16.9999 13.8961 17H6.08533C5.94877 16.9999 5.81718 16.9485 5.71653 16.8559C5.61587 16.7632 5.55346 16.6361 5.5416 16.4995L4.63784 6.19902H3.5V5.10219H7.3054ZM8.39806 5.10219H11.6019V4.09683H8.39806V5.10219ZM13.3961 15.9032L14.2465 6.19902H5.73494L6.58536 15.9032H13.3961Z" fill="currentColor"/>
                                    </g>
                                </svg>
                                <span>Delete</span>
                            </button>

                            <template v-if="removed">
                                <button type="button" @click="remove" class="comment__action">
                                    <span>Yes</span>
                                </button>
                                <button type="button" @click="removed = false" class="comment__action">
                                    <span>No</span>
                                </button>
                            </template>

                        </template>
                        <button type="button" @click="createReply" class="comment__action">
                            <span>Reply</span>
                        </button>
                    </div>
                    <div class="comment__date" v-if="date">{{ date }}</div>
                </div>
            </div>
        </div>
        <div class="comment__reply" v-if="reply">
            <reply-form v-model="reply" @submit="sendReply" @cancel="cancelReply"></reply-form>
        </div>
        <comments-list class="comment__replies" v-if="comment.comments.length" :comments="comment.comments"></comments-list>
    </div>
</template>

<script>
    import Bus from '../bus'
    import CommentsList from './CommentsList.vue'
    import ReplyForm from './ReplyForm.vue'
    import Avatar from './Avatar.vue'
    import CommentModel from '../models/Comment'
    export default {
        components: { Avatar, ReplyForm, CommentsList },
        props: {
            comment: { type: Object, default: () => ({}) }
        },
        data () {
            return {
                editable: null,
                reply: null,
                showReply: false,
                removed: false
            }
        },
        computed: {
            date () {
                const date = this.comment.updated || this.comment.created
                return date ? (new Date(date)).getTime() : false
//                if (!date) return false
//                return `${date.getDate()}.${date.getMonth()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
            }
        },
        methods: {
            edit () {
                this.editable = new CommentModel(this.comment)
            },
            cancel () {
                this.editable = null
            },
            remove () {
                Bus.$emit('remove', this.comment)
            },
            save () {
                if (this.editable.text === this.comment.text) return
                this.editable.updated = new Date()
                Bus.$emit('update', { comment: this.comment, edited: this.editable } )
                this.cancel()
            },
            createReply () {
                this.reply = new CommentModel({ username: 'Hey Man', parent: this.comment.id })
            },
            sendReply (comment) {
                Bus.$emit('submit', comment)
                this.cancelReply()
            },
            cancelReply () {
                this.reply = null
            }
        }
    }
</script>

<style lang="scss">
    .comment {
    }
    .comment__base {
        display: flex;
    }
    .comment__aside {
        margin-right: 20px;
    }
    .comment__main {
        flex: 1 1 auto;
    }
    .comment__text {
        border: 1px solid #DFE4E7;
        border-radius: 3px;
        background: #fff;
        padding: 20px 25px;
        font-size: 16px;
        line-height: 1.31em;
    }
    .comment__actions {
        display: flex;
        align-items: center;
        & > * {
            margin-left: 2em;
            &:first-child {
                margin-left: 0;
            }
        }
    }
    .comment__action {
        display: inline-flex;
        align-items: center;
        -webkit-appearance: none;
        border: none;
        outline: none;
        border-radius: 0;
        text-align: left;
        padding: 0;
        background: none;
        font-family: inherit;
        font-weight: 300;
        cursor: pointer;
        color: inherit;

        &:hover,
        &:focus {
            color: #2F3B4E
        }

        span {
            margin-left: 0.3em;
        }
    }
    .comment__action-icon {
        width: 1em;
        height: 1em;
        font-size: 20px;
    }
    .comment__reply {
        flex: 0 0 100%;
        margin-top: 20px;
    }
    .comment__replies {
        margin-top: 20px;
        flex: 0 0 100%
    }
    .comment__footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 10px;
        font-size: 14px;
        color: rgba(#2F3B4E, 0.55);
        line-height: 1em;
    }
    .comment__date {
        width: 100px;
        flex: 0 0 100px;
        white-space: nowrap;
        overflow: hidden;
    }
</style>