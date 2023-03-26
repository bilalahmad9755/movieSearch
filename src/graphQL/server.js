const axios = require('axios');
const DISCOVER_URL = 'https://api.themoviedb.org/3/discover/movie?api_key=218b7f1fbdaf98f5b027b8b2bcd63007';
const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
type Movie {
  id: ID
  name: String
  releaseDate: String
  image: String,
  page: ID,
  totalPages: ID
},
input Params{
  page: ID,
  sort_by: String
}

type Query {
  movies(_params: Params): [Movie],
  search(_id: ID): Movie,
  hello: String
}
`;

const discoverMovies = async (_params) => {
  console.log("query_params: ", _params);
  if(_params.sort_by.length === 0)
  {
    _params = {page: _params.page};
  }
    return (await axios.get(DISCOVER_URL, {params: _params})
    .then((response) => {
      console.log("fetched_data: ", response.data);
        return response.data;
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
    movies: async (_, {_params}, context) => {
      console.log("context: ", context);
      console.log("params: ", _params);
        const _movies = await discoverMovies(_params);
        const data = _movies.results.map(movie => ({
            id: movie.id,
            name: movie.original_title,
            releaseDate: movie.release_date,
            image: movie.poster_path,
            page: _movies.page,
            totalPages: _movies.total_pages,
          }));
      return data;
    },
    search: async (_, {_id}, context) => {
      console.log("user was searching for that specific id: ", _id);
        const movie = await searchMovie(_id);
        return {
            id: movie.id,
            name: movie.original_title,
            releaseDate: movie.release_date,
            image: movie.poster_path,
            page:"",
            totalPages:""
        }
    },
    hello: () => "hello from graphQL",
  },
};


const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
