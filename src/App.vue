<template>
    <div id="app">
        <div class="container">
            <comments :comments="comments"></comments>
        </div>
    </div>
</template>

<script>
    import Comments from './components/Comments.vue'
    import Data from './data.json'

    console.log(Data)

    export default {
        name: 'app',
        components: { Comments },
        data () {
            return {
                comments: null
            }
        },
        created () {
            setTimeout(() => {
                this.comments = Data.comments
            }, 1000)
        },
        mounted() {
            console.log('comments')
        }
    }
</script>

<style lang="scss">
    body {
        font-family: 'Gotham Pro', sans-serif;
        background: #FAFBFC;
        font-weight: 300;
    }
    .container {
        max-width: 500px;
        margin-left: auto;
        margin-right: auto;
    }
</style>