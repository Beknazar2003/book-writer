const sequelize = require('../db')
const { DataTypes } = require('sequelize')

const User = sequelize.define('user', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING },
  nickName: { type: DataTypes.STRING },
  password: { type: DataTypes.STRING },
})

const books = sequelize.define('book', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
})
const chapter = sequelize.define('chapter', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  text: { type: DataTypes.STRING, allowNull: false },
})

User.hasMany(books)
books.belongsTo(User)

books.hasMany(chapter)
chapter.belongsTo(books)

module.exports = {
  User,
  books,
  chapter
}