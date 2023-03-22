import { gql } from '@apollo/client';

export const DISCOVER_MOVIES = gql`
  query discover($params: Params){
    movies(_params:$params){
      id
      name
      releaseDate
      image
      page
      totalPages
    }
  }
`;
export const SEARCH_MOVIE = gql`
query Query($searchId: ID){
  search(_id: $searchId){
    id
    name
    releaseDate
    image
    page
    totalPages
  }
}`;