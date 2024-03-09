//TOP X of the average number of appearances for an actor per series

db.film.aggregate([
    {$match: {"titleType": "tvSeries"}},
    {$unwind: "$job"},
    {$match: {"job.job": "actor"}},
    {$lookup: {
        from: "episode",
        localField: "tconst",
        foreignField: "parentTconst",
        as: "episodes"}},
    {$unwind: "$episodes"},
    {$lookup: {
        from: "personPrimary",
        localField: "job.nconst",
        foreignField: "nconst",
        as: "person"}},
    {$group: {
        _id: "$person.nconst",
        count: {$sum: 1}}},
    {$sort: {count: -1}},
    {$limit: 10},
    {$project: {
        _id: 0,
        "person.name": 1,
        "primaryTitle": 1,
        "count": 1}}
])
