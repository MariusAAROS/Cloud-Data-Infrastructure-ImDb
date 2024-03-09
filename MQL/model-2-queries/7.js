//Select the average number of films released per decade per region

db.film.aggregate([
    // Filter movies
    { 
      $match: { 
        titleType: "movie" 
      } 
    },
    // Lookup region information
    { 
      $lookup: { 
        from: "akasPrimary", 
        localField: "tconst", 
        foreignField: "titleId", 
        as: "akas" 
      } 
    },
    // Unwind region 
    { 
      $unwind: "$akas.region" 
    },
    // Group by region and decade
    { 
      $group: { 
        _id: {region: "$akas.region", decade: {$trunc: {$divide: ["$startYear", 10 ]}}},
        count: { $sum: 1 }
      } 
    },
    // Group by region and calculate average number of films
    { 
      $group: { 
        _id: "$_id.region",
        average: { $avg: "$count" }
      } 
    },
    // Project required fields
    { 
      $project: { 
        _id: 0, 
        region: "$_id", 
        average: 1
      } 
    }
  ])