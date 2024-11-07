exports.seed = function(knex) {
    return knex('notes').insert([
    {title: "Note 1", content: "Note 1 content"},
    {title: "Note 2", content: "Note 2 content"},
    {title: "Note 3", content: "Note 3 content"},
    ]).then(()=> {
        return knex('authors').insert([
            {name: "author 1"},
            {name: "author 2"},
            {name: "author 3"},
            ])
    })
}
