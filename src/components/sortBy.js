
import {FormControl, InputLabel, Select, MenuItem} from '@mui/material';
import { makeStyles} from '@mui/styles';
import {useState, useEffect} from 'react';


const useStyles = makeStyles((theme) => ({
  select: {
    width: '300px',
    height: '50px',
    border: '1px solid #ccc',
    borderRadius: '100px',
    padding: '10px',
    backgroundColor: 'rgb(15, 172, 151)'
  },
  menuItem: {
    '&:hover': {
      backgroundColor: 'antiquewhite',
      color: 'rgb(15, 172, 151)',
    },
  },
  label: {
    color: 'antiquewhite',
  }
}));

export const SortBy = ({selectedOption}) => 
{
    const sortOptions = ['Release Date', 'Popularity', 'Recent Releases', 'Reviews'];
    const [sortBy, setSortby] = useState('');
    const classes = useStyles();
    const handleChange = (e) =>
    {
      switch(e.target.value)
      {
        case sortOptions[0]: setSortby('release_date.asc'); selectedOption('release_date.asc'); setSortby(sortOptions[0]); break;
        case sortOptions[1]: setSortby('popularity.asc'); selectedOption('popularity.asc'); setSortby(sortOptions[1]); break;
        case sortOptions[2]: setSortby('release_date.desc'); selectedOption('release_date.desc'); setSortby(sortOptions[2]); break;
        case sortOptions[3]: setSortby('vote_count.desc'); selectedOption('vote_count.desc'); setSortby(sortOptions[3]); break;
        default: break;
      }
    }
    // useEffect(()=> {
    //   selectedOption(sortBy);
    // }, [sortBy]);
    return(
    <div>
      <br />
      <FormControl>
        <InputLabel className={classes.input} >SortBy</InputLabel>
        <Select className={classes.select} 
        value={sortBy} 
        onChange = {handleChange}>
          {sortOptions.map((value, index)=>(
          <MenuItem 
          className={classes.menuItem} 
          key = {index} 
          value = {value}>
          {value}
          </MenuItem>))}
        </Select>
      </FormControl>
    </div>  
  );
}