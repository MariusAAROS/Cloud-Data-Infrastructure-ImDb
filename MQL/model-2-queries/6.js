//Select the top Y favorite genres of the year X

db.film.aggregate([
    // Filter movies of the specific year
    { 
      $match: { 
        titleType: "movie",
        startYear: 1999
      } 
    },
    // Group by genre and calculate average rating
    { 
      $group: { 
        _id: "$genres", 
        averageRating: { $avg: "$averageRating" }
      } 
    },
    // Sort by descending averageRating
    { $sort: { averageRating: -1 } },
    // Limit to top Y results
    { $limit: 3 },
    // Project required fields
    { 
      $project: { 
        _id: 0, 
        genre: "$_id", 
        averageRating: 1
      } 
    }
  ])