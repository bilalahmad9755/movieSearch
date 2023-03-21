import { TextField} from "@mui/material";
import {makeStyles} from "@mui/styles";
import React, { useEffect, useState} from 'react';
import { Movies } from './movies';
import {Pages} from './pages';
import axios from 'axios';
import {DISCOVER_URL} from '../APIref';
import "../css/searchBar.css";
import "../css/button.css";
import "../css/topBar.css";
import { SortBy } from "./sortBy";

const useStyles = makeStyles((theme) => ({
    customTextField: {
      '& .MuiInputBase-root': {
        backgroundColor: 'rgb(15, 172, 151)',
        borderRadius: '50px',
        color: 'antiquewhite',

      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: 'antiquewhite',
        

        },
        '&:hover fieldset': {
          borderColor: 'antiquewhite',

        },
        '&.Mui-focused fieldset': {
          borderColor: 'antiquewhite',
        },
      },
    },
  }));


export const Interface = () => {
  const [searchKeyword, setSearchkeyword] = useState('');
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState('');

 useEffect(() => {
  fetchData(DISCOVER_URL, {});
 }, [])

  const fetchData = (url ,params) => {
    axios.get(url,{params:params})
    .then((response) => {
        setMovies(response.data.results); setPage(response.data.page); setTotalPages(response.data.total_pages);
    });
  };

 // param array is null coz there is no dependency for re-fetching data...
  
  const search = (e) => {
    if(e.target.value.length === 0)
    {
      fetchData(DISCOVER_URL, {});
    }
    else
    {
      setSearchkeyword(e.target.value);
      console.log("requesting url is: ", `https://api.themoviedb.org/3/movie/${e.target.value}?api_key=218b7f1fbdaf98f5b027b8b2bcd63007`);
      axios.get(`https://api.themoviedb.org/3/movie/${e.target.value}?api_key=218b7f1fbdaf98f5b027b8b2bcd63007`)
      .then((response) => {
        setMovies([response.data])})
        .catch(error => {
          setSearchkeyword("Invalid!!!");
          console.log("error: ", error);});
    }
  }
  
  const shiftPage = (page) =>
  {
    fetchData(DISCOVER_URL, {page: page});
    window.scrollTo(0,0);
  }

  const classes = useStyles();
  return (
  <React.Fragment>
    <div className="topBar">
      <h1 style={{color : "#0FAC97"}}>Movie Search App</h1>
      <Pages current={page} total={totalPages} shift={(page)=> {shiftPage(page)}}/>
      <TextField className={classes.customTextField} placeholder="Search by ID" onChange={search}></TextField>
      <SortBy selectedOption={(selectedValue)=>{console.log("selected values is :",selectedValue);fetchData(DISCOVER_URL, {sort_by:selectedValue, page: page})}}/>
      <Movies movies={movies}/>
      <p>search keyword is : {searchKeyword}</p>
    </div>
  </React.Fragment>
  );
}

 