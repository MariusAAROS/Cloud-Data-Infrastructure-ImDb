//Select directors that participate in the most number of film for each genre

db.film.aggregate([
    {$unwind: "$genres"},
    {$group: {
        _id: {genre: "$genres", director: "$directors"},
        count: {$sum: 1}}},
    {$sort: {count: -1}},
    {$group: {
        _id: "$genre",
        director: {$first: "$_id.director"},
        count: {$first: "$count"}}},
    {$project: {
        _id: 0,
        genre: "$_id",
        director: 1,
        count: 1}}
])
