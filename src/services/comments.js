export default {
    send () {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({ success: true })
            }, 300)
        })
    }
}