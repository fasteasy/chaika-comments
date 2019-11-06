import CommentsService from '../services/comments'

export default {
    data () {
        return {
            comments: null
        }
    },
    computed: {
        hierarchy () {
            return this.comments
        },
        hasComments () {
            return this.comments && this.comments.length
        }
    },
    methods: {
        isReply (comment) {
            return !!comment.parent
        },
        sendComment (comment) {
            return CommentsService.send(comment).then(() => {
                comment.id = Math.ceil(Math.random()* 99999)
                this.comments.push(comment)
            })
        }
    }
}