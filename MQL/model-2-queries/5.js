//Count the number of actors dead before the end of a series

db.film.aggregate([
    {$match: {"titleType": "tvSeries"}},
    {$unwind: "$job"},
    {$match: {"job.job": "actor"}},
    {$lookup: {
        from: "personPrimary",
        localField: "job.nconst",
        foreignField: "nconst",
        as: "person"}},
    {$unwind: "$person.deathYear"},
    {$match: {$or: [ 
        {"person.deathYear": {$lt: "$endYear"}}, 
        {"person.deathYear": {$exists: true}, 
          "endYear": {$exists: false}}
    ]}},
    {$group: {
        _id: "$person.nconst",
        count: {$sum: 1}}},
    {$project: {
        _id: 0,
        count: 1}}
])