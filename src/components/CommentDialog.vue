<script>
    import Comment from './Comment.vue'
    export default {
        extends: Comment,
        methods: {
            getParentId () {
                return this.getRootComment(this)
            }
        }
    }
</script>