const db = require('../../config/bd')

module.exports = {
    all() {

        
        return db.query(`
            SELECT * FROM categories
        `)
    }
}