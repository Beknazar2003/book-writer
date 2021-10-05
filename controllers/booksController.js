const { books, chapter } = require('../models/models')
const ApiError = require('../error/ApiError')

class booksController {
  async createBook(req, res, next) {
    try {
      let { title } = req.body
      let book = await books.create({
        title
      })
      return res.json(book)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }
  async createChapter(req, res, next) {
    try {
      let { title, text } = req.body
      let newChapter = await chapter.create({
        title,
        text
      })
      return res.json(newChapter)
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
    const doc = await documents.findOne({
      where: { id },
    })
    return res.json(doc)
  }
}

module.exports = new booksController()
