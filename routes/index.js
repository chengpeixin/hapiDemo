const glob = require('glob')
const path = require('path');
let routes = []
glob.sync(path.resolve(__dirname,'**/*.api.js')).forEach((v,i)=>{
    routes.push(...require(v))
})
module.exports = routes