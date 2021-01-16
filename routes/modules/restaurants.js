const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

router.get('/new', (req, res) => {
  res.render('new', { css: 'show.css' })
})

router.get('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  Restaurant.findOne({ _id, userId })
    .lean()
    .then(restaurant => res.render('show', { restaurant, css: 'show.css' }))
    .catch(error => console.log(error))
})


router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  Restaurant.findOne({ _id, userId })
    .lean()
    .then(restaurant => res.render('edit', { restaurant, css: 'show.css' }))
    .catch(error => console.log(error))
})

router.post('/new', (req, res) => {
  const userId = req.user._id
  const name = req.body.name
  const category = req.body.category
  const location = req.body.location
  const google_map = req.body.google_map
  const phone = req.body.phone
  const rating = req.body.rating
  const image = req.body.image
  const description = req.body.description
  Restaurant.create({
    userId,
    name,
    category,
    location,
    google_map,
    phone,
    rating,
    image,
    description
  })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id

  Restaurant.findOne({ _id, userId })
    .then(restaurant => {
      restaurant = Object.assign(restaurant, req.body)
      restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})

router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  Restaurant.findOne({ _id, userId })
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router