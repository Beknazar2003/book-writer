const Router = require('express')
const router = new Router()
const booksController = require('../controllers/booksController')

router.post('/', booksController.createBook)
router.post('/chapter', booksController.createChapter)
router.get('/', booksController.getAll)
router.get('/', booksController.getChapter)
router.get('/:id', booksController.getOne)

module.exports = router