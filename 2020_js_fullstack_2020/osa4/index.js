const app = require('./app') //Sovellus
const http = require('http')
const config = require('./utils/config.js') //Portti ja mongouri-konffaus
const logger = require('./utils/logger') // Loggaus

const server = http.createServer(app)

server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})