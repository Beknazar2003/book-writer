const Router = require('express')
const router = new Router()
const booksRouter = require('./booksRouter')
const userRouter = require('./userRouter')

router.use('/auth', userRouter)
router.use('/books', booksRouter)

module.exports = router