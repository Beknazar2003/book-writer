const Router = require('express')
const router = new Router()
const booksController = require('../controllers/booksController')

router.post('/', booksController.createBook)
router.post('/chapter', booksController.createChapter)
router.put('/chapter/:bookId', booksController.updateChapter)
router.get('/', booksController.getAll)
router.get('/chapter', booksController.getChapter)
router.get('/:id', booksController.getOne)

module.exports = router