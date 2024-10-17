import { useContext } from 'react';
import {Grid } from '@mui/material';

import { AuthUser } from '../App';
import {Favourites} from './favourites';
import '../css/card.css';
import '../css/grid.css';
import '../css/img.css';

export const Movies = ({movies}) => 
{
  const {user} = useContext(AuthUser);
 
  return(
    
  <div className='grid'>
    <br /><br />
    <Grid className='grid' container gap={3}>
      {
        movies.map((movie, index)=> (
        <div key= {index}className='card'>
          <br />
          {
            movie.image != null ? (
            <img className='img' alt='No Preview' src={`https://image.tmdb.org/t/p/w300/` + movie.image} width={250} height={250}></img>)
            :(<h1>No Preview</h1>)
          }
          <h2>{movie.name}</h2>
          <p>Id: {movie.id}</p>
          <p>Release Date: {movie.releaseDate}</p>
          <br />
          <Favourites id={movie.id} name={movie.name} user={user} />
          <br />
        </div>
        ))
      }
      
    </Grid> 
  </div>
);
}