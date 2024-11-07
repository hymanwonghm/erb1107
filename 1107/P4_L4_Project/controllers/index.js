// Import the db config from knexfile.js
const dbConfigs = require("../knexfile") 
const knex = require("knex")(dbConfigs)

// Testing Controller
const indexController =  (req, res) => {
    res.send('Hello World')
}

// Part 1
// GET /notes
const checkController = (req, res) => {
    const userInput = req.query
    const title = userInput.title
    const content = userInput.content

    // Check if ther is query
    let hasQuery = false
    if (title !== undefined || content !== undefined) {
        hasQuery = true
    }
    // Case for check All
    if (!hasQuery) {
        knex('notes')
        .join('authors', 'notes.id', '=', 'authors.id')
        .select('title', 'content', 'name', 'notes.created_at', 'updated_at')
        .then((result) => {
            console.log(result)
            return res.json(result)
        })
    // Case for check by title 
    } else if (title !== undefined) {
        knex('notes').where({'title': title}).select()
        .then((result) => {
            console.log(result)
            return res.json(result)
        })
    // Case for check by content 
    } else if (content !== undefined) {
        knex('notes').where({'content': content}).select()
        .then((result) => {
            console.log(result)
            return res.json(result)
        })
    }
    }

// POST /notes
const createController =  (req, res) => {
    const userInput = req.body
    knex('notes').insert(userInput)
    .then((result) => {
        console.log("Post notes successfully")
        return res.send("Post notes successfully")
    })
}

// PUT /notes/:noteId
const updateController = (req, res) => {
    const noteId = req.params.noteId
    const userInput = req.body
    knex('notes').where({'id': noteId}).update(
        {'title': userInput.title, 'content': userInput.content, 'updated_at': new Date()}
    ).then((result) => {
        console.log("Update notes successfully")
        return res.send("Update notes successfully")
    })
}

// GET /notes/:noteId
const checkItemContoller = (req, res) => {
    const noteId = req.params.noteId
    knex('notes')
    .join('authors', 'notes.id', '=', 'authors.id')
    .where({'notes.id': noteId})
    .select()
    .then((result) => {
        console.log(result)
        return res.json(result)
    })
}

// DELETE /notes/:noteId
const deleteController = (req, res) => {
    const noteId = req.params.noteId
    knex('notes').where({'id': noteId}).del()
    .then((result) => {
        console.log("Delete notes successfully")
        return res.send("Delete notes successfully")
    })
}

// Part 4
// GET /authors
const checkAuthorsController = (req, res) => {
    knex('authors').select()
    .then((result) => {
        console.log(result)
        return res.json(result)
    })
}

// POST /authors
const createAuthorsController =  (req, res) => {
    const userInput = req.body
    knex('authors').insert(userInput)
    .then((result) => {
        console.log("Post authors successfully")
        return res.send("Post authors successfully")
    })
}

// PUT /authors/:authorId
const updateAuthorsController = (req, res) => {
    const authorId = req.params.authorId
    const userInput = req.body
    knex('authors').where({'id': authorId}).update(
        {'name': userInput.name, 'modified_at': new Date()}
    ).then((result) => {
        console.log("Update authors successfully")
        return res.send("Update authors successfully")
    })
}

// GET /authors/:authorId
const checkItemAuthorsContoller = (req, res) => {
    const authorId = req.params.authorId
    knex('authors').where({'id': authorId}).select()
    .then((result) => {
        console.log(result)
        return res.json(result)
    })
}

// DELETE /authors/:authorId
const deleteAuthorsController = (req, res) => {
    const authorId = req.params.authorId
    knex('authors').where({'id': authorId}).del()
    .then((result) => {
        console.log("Delete authors successfully")
        return res.send("Delete authors successfully")
    })
}

module.exports = { indexController, checkController, createController, updateController, checkItemContoller, deleteController, checkAuthorsController, createAuthorsController, updateAuthorsController, checkItemAuthorsContoller, deleteAuthorsController}