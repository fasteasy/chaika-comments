export default class Comment {
    defaults () {
        return {
            parent: null,
            user: null,
            id: null,
            username: null,
            avatar: null,
            text: null,
            created: null,
            updated: null,
            comments: null,
            isUser: null
        }
    }

    constructor (options = {}) {
        this.parent = options.parent
        this.id = options.id
        this.user = options.user
        this.username = options.username
        this.text = options.text
        this.created = options.created
        this.updated = options.updated
        this.comments = [].concat(options.comments)
    }
}