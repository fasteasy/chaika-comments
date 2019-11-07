export default {
    create (comment) {
        const id = Math.floor(Math.random()*100000).toString()
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(id)
            }, 300)
        })
    },

    update (id, comment) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve()
            }, 500)
        })
    },

    remove (id) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve()
            }, 500)
        })
    }
}