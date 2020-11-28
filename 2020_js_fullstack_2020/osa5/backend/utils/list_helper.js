const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum += item.likes
  }
  return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return undefined
  } else {
    const reducer = (prev, current) => {
      return (prev.likes > current.likes) ? prev : current
    }
    return blogs.reduce(reducer)
  }
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return undefined
  } else {

    const reducer = (sums, entry) => {
      sums[entry.author] = (sums[entry.author] || 0) + 1
      return sums
    }

    // Laitetaan authorit ja blogien määrät listalle
    let list = blogs.reduce(reducer, {})

    // Laitetaan blogien määrät omalle listalle
    let blogSums = Object.values(list)
    // Etsitään suurin lukema blogien määristä
    let max = Math.max(...blogSums)
    // Laitetaan authorit omalle listalle
    let authorList = Object.keys(list)
    // Otetaan indeksi jossa suurin blogien määrä
    let index = blogSums.indexOf(max)

    // Palautetaan authorilistalta suurimman lukeman sisältä authori ja suurin lukema
    return { author: authorList[index], blogs: max }
  }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return undefined
  } else {
    const reducer = (sums, entry) => {
      sums[entry.author] = (sums[entry.author] || 0) + entry.likes
      return sums
    }

    // Laitetaan authorit ja tykkäysten määrät listalle
    let list = blogs.reduce(reducer, {})

    // Laitetaan tykkäysten määrät omalle listalle
    let likeSums = Object.values(list)
    // Etsitään suurin lukema tykkäysten määristä
    let max = Math.max(...likeSums)
    // Laitetaan authorit omalle listalle
    let authorList = Object.keys(list)
    // Otetaan indeksi jossa suurin tykkäysten määrä
    let index = likeSums.indexOf(max)

    // Palautetaan authorilistalta suurimman lukeman sisältä authori ja suurin lukema
    return { author: authorList[index], likes: max }
  }
}



module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}