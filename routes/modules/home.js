const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

router.get('/', (req, res) => {
  const userId = req.user._id
  Restaurant.find({ userId })
    .lean()
    .sort({ _id: 'asc' })
    .then(restaurants => res.render('index', { restaurants, css: 'index.css' }))
    .catch(error => console.log(error))
})

router.get('/search', (req, res) => {
  let keyword = req.query.keyword.trim()
  const userId = req.user._id

  Restaurant.find({ $or: [{ name: new RegExp(keyword, 'i') }, { category: new RegExp(keyword, 'i') }], userId })
    .lean()
    .then(restaurants => {

      if (!restaurants.length) {
        keyword = `你的收藏沒有"${keyword}"的相關項目唷！`
      }

      res.render('index', { restaurants, keyword, css: 'index.css' })
    })
    .catch(error => console.log(error))
})

router.get('/', (req, res) => {
  const userId = req.user._id
  Restaurant.find({ userId })
    .lean()
    .sort({ name: 'asc' })
    .then(restaurants => res.render('index', {
      restaurants, css: 'index.css'
    }))
    .catch(error => console.log(error))
})


router.get('/asc', (req, res) => {
  const userId = req.user._id
  const sort = req.path
  Restaurant.find({ userId })
    .lean()
    .sort({ name: 'asc' })
    .then(restaurants => res.render('index', {
      restaurants, css: 'index.css', sort
    }))
    .catch(error => console.log(error))
})

router.get('/desc', (req, res) => {
  const userId = req.user._id
  const sort = req.path
  Restaurant.find({ userId })
    .lean()
    .sort({ name: 'desc' })
    .then(restaurants => res.render('index', {
      restaurants, css: 'index.css'
    }))
    .catch(error => console.log(error))
})

router.get('/location', (req, res) => {
  const userId = req.user._id
  const sort = req.path
  Restaurant.find({ userId })
    .lean()
    .sort({ location: 'asc' })
    .then(restaurants => res.render('index', {
      restaurants, css: 'index.css'
    }))
    .catch(error => console.log(error))
})


router.get('/category', (req, res) => {
  const userId = req.user._id
  const sort = req.path
  Restaurant.find({ userId })
    .lean()
    .sort({ category: 'asc' })
    .then(restaurants => res.render('index', {
      restaurants, css: 'index.css'
    }))
    .catch(error => console.log(error))
})


module.exports = router