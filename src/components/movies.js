import '../css/card.css';
import '../css/grid.css';
import '../css/img.css';
import {Grid } from '@mui/material';
import { IMG_BASE_URL} from '../APIref';
import {Button} from "@material-ui/core";
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(45deg, antiquewhite 30%, white 90%)',
    borderRadius: 3,
    border: 0,
    color: '#0fac98',
    height: 30,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px #0fac98',
  },
});
export const Movies = ({movies}) => 
{
  const classes = useStyles();
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
            <img className='img' alt='No Preview' src={IMG_BASE_URL + movie.image} width={250} height={250}></img>)
            :(<h1>No image</h1>)
          }
          
          <h2>{movie.name}</h2>
          <p>Id: {movie.id}</p>
          <p>Release Date: {movie.releaseDate}</p>
          <br />
          <Button className='classes.root'>Add to favourites</Button>
          <br />
        </div>
        ))
      }
      
    </Grid> 
  </div>
        );
}