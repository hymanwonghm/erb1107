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

    console.log(userInput)
    // Check if ther is query
    let hasValidQuery = false
    if (title !== undefined || content !== undefined) {
        hasValidQuery = true
    }
    // Case for check All
    if (!hasValidQuery) {
        knex('notes')
        .join('authors', 'notes.author_id', '=', 'authors.id')
        .select('notes.id', "title", "content", knex.ref("notes.created_at").as('note_created_at'), "updated_at", "name", knex.ref("authors.created_at").as('author_created_at'), "modified_at")
        .then((result) => {
            if(result.length !== 0 ) {
                console.log(result)
                return res.json(result)
            } else if (userInput.keys() === 0) {
                console.log("There is no data in the notes table")
                return res.send("There is no data in the notes table")
            } else {
                console.log("Invaild query :There is no such query")
                return res.send("Invalid query : There is no such query")
            }
        }).catch((err) => {
            console.log("errors when check All notes" + err)
            return res.send("errors when check All notes" + err)
        })
    // Case for check by title 
    } else if (title !== undefined) {
        knex('notes').where({'title': title}).select()
        .then((result) => {
            if(result.length !== 0) {
                console.log(result)
                return res.json(result)
            } else {
                console.log("There is no note of such title")
                return res.send("There is no note of such title")
            }
        }).catch((err) => {
            console.log("errors when check by title" + err)
            return res.send("errors when check by title" + err)
        })
    // Case for check by content 
    } else if (content !== undefined) {
        knex('notes').where({'content': content}).select()
        .then((result) => {
            if(result.length !== 0) {
                console.log(result)
                return res.json(result)
            } else {
                console.log("There is no note of such content")
                return res.send("There is no note of such content")
            }
        }).catch((err) => {
            console.log("errors when check by title" + err)
            return res.send("errors when check by title" + err)
        })
    } 
    }

// POST /notes
const createController =  (req, res) => {
    const userInput = req.body
    const title = userInput.title
    const content = userInput.content
    const author_id = userInput.author_id
    knex('notes').insert({"title": title, "content": content, "author_id": author_id})
    .then((result) => {
        console.log("Post notes successfully")
        return res.send("Post notes successfully")
    }).catch((err) => {
        console.log("errors when create notes" + err)
        return res.send("errors when create notes" + err)
    })
}

// PUT /notes/:noteId
const updateController = (req, res) => {
    const noteId = req.params.noteId
    const userInput = req.body
    knex('notes')
    .where({'id': noteId})
    .update(
        {'title': userInput.title, 'content': userInput.content, 'author_id': userInput.author_id, 'updated_at': new Date()}
    ).then((result) => {
        console.log("Update notes successfully")
        return res.send("Update notes successfully")
    }).catch((err) => {
        console.log("errors when updating notes" + err)
        return res.send("errors when updating notes" + err)
    })
}

// GET /notes/:noteId
const checkItemContoller = (req, res) => {
    const noteId = req.params.noteId
    knex('notes')
    .join('authors', 'notes.author_id', '=', 'authors.id')
    .where({'notes.id': noteId})
    .select('notes.id', "title", "content", knex.ref("notes.created_at").as('note_created_at'), "updated_at", "name", knex.ref("authors.created_at").as('author_created_at'), "modified_at")
    .then((result) => {
        console.log(result)
        return res.json(result)
    }).catch((err) => {
        console.log("errors when checking Item notes" + err)
        return res.send("errors when checking Item notes" + err)
    })
}

// DELETE /notes/:noteId
const deleteController = (req, res) => {
    const noteId = req.params.noteId
    knex('notes').where({'id': noteId}).del()
    .then((result) => {
        console.log("Delete notes successfully")
        return res.send("Delete notes successfully")
    }).catch((err) => {
        console.log("errors when deleting notes" + err)
        return res.send("errors when deleting notes" + err)
    })
}

// Part 4
// GET /authors
const checkAuthorsController = (req, res) => {
    knex('authors').select()
    .then((result) => {
        console.log(result)
        return res.json(result)
    }).catch((err) => {
        console.log("errors when checking authors" + err)
        return res.send("errors when checking authors" + err)
    })
}

// POST /authors
const createAuthorsController =  (req, res) => {
    const userInput = req.body
    knex('authors').insert(userInput)
    .then((result) => {
        console.log("Post authors successfully")
        return res.send("Post authors successfully")
    }).catch((err) => {
        console.log("errors when creating authors" + err)
        return res.send("errors when creeting authors" + err)
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
    }).catch((err) => {
        console.log("errors when updating authors" + err)
        return res.send("errors when updating authors" + err)
    })
}


// GET /authors/:authorId
const checkItemAuthorsContoller = (req, res) => {
    const authorId = req.params.authorId
    knex('authors').where({'id': authorId}).select()
    .then((result) => {
        console.log(result)
        return res.json(result)
    }).catch((err) => {
        console.log("errors when checking one of the authors" + err)
        return res.send("errors when checking one of the authors" + err)
    })
}

// DELETE /authors/:authorId
const deleteAuthorsController = (req, res) => {
    const authorId = req.params.authorId
    knex('authors').where({'id': authorId}).del()
    .then((result) => {
        console.log("Delete authors successfully")
        return res.send("Delete authors successfully")
    }).catch((err) => {
        console.log("errors when deleting authors" + err)
        return res.send("errors when deleting authors" + err)
    })
}

module.exports = { indexController, checkController, createController, updateController, checkItemContoller, deleteController, checkAuthorsController, createAuthorsController, updateAuthorsController, checkItemAuthorsContoller, deleteAuthorsController}