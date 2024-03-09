//Select a movie containing the string “XXX” in at least one of its titles

db.film.aggregate([
    {$match: {"titleType": "movie"}},
    {$lookup: {
        from: "akasPrimary",
        localField: "tconst",
        foreignField: "titleId",
        as: "akas"}},
    {$unwind: "$akas.title"},
    {$or: [
        { "primaryTitle": { $regex: "love", $options: "i" } }, // Case-insensitive match
        { "akas.title": { $regex: "love", $options: "i" } } // Case-insensitive match in titles array
      ]},
    {$project: {
        _id: 0,
        tconst: 1,
        primaryTitle: 1}}
    ])