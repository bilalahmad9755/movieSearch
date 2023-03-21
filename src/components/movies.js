import '../css/card.css';
import '../css/grid.css';
import '../css/img.css';
import { Grid } from '@mui/material';
import { IMG_BASE_URL} from '../APIref';
export const Movies = ({movies}) => 
{
  return(
  <div className='grid'>
    <br /><br />
    <Grid className='grid' container gap={3}>
     
      {
        movies.map((movie, index)=> (
        <div key= {index}className='card'>
          <br />
          {
            movie.poster_path != null ? (
            <img className='img' alt='No Preview' src={IMG_BASE_URL + movie.poster_path} width={250} height={250}></img>)
            : (<h1>No image</h1>)
          }
          
          <h2>{movie.original_title}</h2>
          <p>Id: {movie.id}</p>
          <p>Release Date: {movie.release_date}</p>
          <br />
        </div>
        ))
      }
      
    </Grid> 
  </div>
        );
}