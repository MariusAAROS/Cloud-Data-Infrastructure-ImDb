//Select the top 10 movies of the year X shorter than 2 hours

db.film.aggregate([
    // Filter movies of the specific year and with runtime less than 120 minutes
    { 
      $match: { 
        titleType: "movie",
        startYear: 1999, 
        runTimeMinutes: { $lt: 120 } 
      } 
    },
    // Calculate ratingScore using averageRating and numVotes
    { 
      $addFields: { 
        ratingScore: { 
          $multiply: [ 
            "$averageRating", 
            { $log: { $add: ["$numVotes", 1] } } 
          ] 
        } 
      } 
    },
    // Sort by descending ratingScore
    { $sort: { ratingScore: -1 } },
    // Limit to top 10 results
    { $limit: 10 },
    // Project required fields
    { 
      $project: { 
        _id: 0, 
        tconst: 1, 
        primaryTitle: 1, 
        startYear: 1, 
        ratingScore: 1, 
        runTimeMinutes: 1 
      } 
    }
  ])