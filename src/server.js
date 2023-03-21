const axios = require('axios');
const DISCOVER_URL = 'https://api.themoviedb.org/3/discover/movie?api_key=218b7f1fbdaf98f5b027b8b2bcd63007';
const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
type Movie {
  id: ID
  name: String
  releaseDate: String
  image: String
},
type Query {
  movies: [Movie],
  search(_id: ID): Movie,
  hello: String
}
`;

const discoverMovies = async () => {
    return (await axios.get(DISCOVER_URL)
    .then((response) => {
        return response.data.results;
    }).catch(error => {
      console.log("error: ", error);
      throw error;
  }));
};

const searchMovie = async (_id) => 
{
  return (
    await axios.get(`https://api.themoviedb.org/3/movie/${_id}?api_key=218b7f1fbdaf98f5b027b8b2bcd63007`)
    .then((response) => 
    {
      return response.data;
    })
    .catch(error => 
      {
        console.log("error: ", error);
        throw error;
      }
    ));
}

const resolvers = {
  Query: {
    movies: async () => {
        const _movies = await discoverMovies();
        console.log("rest api data: ", _movies);
        const data = _movies.map(movie => ({
            id: movie.id,
            name: movie.original_title,
            releaseDate: movie.release_date,
            image: movie.poster_path}));
      return data;
    },
    search: async (_, {_id}, context) => {
      console.log("user was searching for that specific id: ", _id);
        const movie = await searchMovie(_id);
        return {
            id: movie.id,
            name: movie.original_title,
            releaseDate: movie.release_date,
            image: movie.poster_path
        }
    },
    hello: () => "hello from graphQL",
  },
};


const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
