const { Router } = require('express')
const { indexController, checkController, createController, updateController, checkItemContoller, deleteController} = require('../controllers')
const { checkAuthorsController, createAuthorsController, updateAuthorsController, checkItemAuthorsContoller, deleteAuthorsController } = require('../controllers')

const router = Router()

// Testing
router.route('/').get(indexController)

// Part 1
router.route('/notes').get(checkController)
router.route('/notes').post(createController)
router.route('/notes/:noteId').put(updateController)
router.route('/notes/:noteId').get(checkItemContoller)
router.route('/notes/:noteId').delete(deleteController)

// Part4
router.route('/authors').get(checkAuthorsController)
router.route('/authors').post(createAuthorsController)
router.route('/authors/:authorId').put(updateAuthorsController)
router.route('/authors/:authorId').get(checkItemAuthorsContoller)
router.route('/authors/:authorId').delete(deleteAuthorsController)

module.exports = { router }