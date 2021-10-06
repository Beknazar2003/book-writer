const { books, chapter, User} = require('../models/models')
const ApiError = require('../error/ApiError')
const jwt = require("jsonwebtoken");

class booksController {
  async createBook(req, res, next) {
    try {
      let { title} = req.body
      const token = req.headers.authorization.split(' ')[1]
      const { id } = jwt.verify(token, process.env.SECRET_KEY)
      let book = await books.create({
        title,
        userId: id
      })
      return res.json(book)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }
  async createChapter(req, res, next) {
    try {
      let { title, text , bookName} = req.body
      const token = req.headers.authorization.split(' ')[1]
      const { id } = jwt.verify(token, process.env.SECRET_KEY)
      const book = await books.findOne({where: {userId: id, title: bookName}})
      if(book !== null){
        let newChapter = await chapter.create({
          title,
          text,
          bookId: book.id
        })
        return res.json(newChapter)
      }
      return next(ApiError.internal('У вас нет такой книги'))

    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async getAll(req, res) {
    let allBooks = await books.findAndCountAll()
    return res.json(allBooks)
  }
  
  async getChapter(req, res) {
    let allChapters = await chapter.findAndCountAll()
    return res.json(allChapters)
  }
  
  async getOne(req, res) {
    const { id } = req.params
    const book = await books.findOne({
      where: { id },
    })
    return res.json(book)
  }

  async updateChapter(req, res) {
    let { title, text } = req.body
    let { bookId } = req.params
    const token = req.headers.authorization.split(' ')[1]
    const { id } = jwt.verify(token, process.env.SECRET_KEY)
    const book = await books.findOne({where: {id: bookId, userId: id}})
    let getChapter = await chapter.findOne({where: {bookId: book.id, title}})
    if(getChapter !== null){
      await chapter.update(
        { text },
        { where: { id: getChapter.id } }
      )
      getChapter = await chapter.findOne({where: {bookId: book.id, title}})
      return res.json(getChapter)
    }
    return next(ApiError.internal('У вас нет такой книги либо главы. Перепроверьте введённые данные.'))
  }
}

module.exports = new booksController()
