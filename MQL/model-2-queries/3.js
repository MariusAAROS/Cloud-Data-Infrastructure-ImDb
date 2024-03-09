//Actors that played in at least 3 adult films

db.film.aggregate([
    {$match: {"isAdult": 1,
              "job.job": "actor"}},
    {$unwind: "$job"},
    {$group: {
        _id: "$job.job",
        count: {$sum: 1}}},
    {$match: {"$count": {$gt: 3}}},
    {$lookup: {
        from: "personPrimary",
        localField: "job.nconst",
        foreignField: "nconst",
        as: "person"}},
    {$project: {
        "_id": 0,
        "person.name" : 1,
        "job.job" : 1,
        "count": 1}}
])