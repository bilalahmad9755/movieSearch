import { DISCOVER_MOVIES, SEARCH_MOVIE } from "../graphQL/queries";
import { client } from "../graphQL/client";
import { useQuery} from '@apollo/client';
import { TextField} from "@mui/material";
import React, { useState } from 'react';
import {DISCOVER_URL} from '../APIref';
import {makeStyles} from "@mui/styles";
import { Movies } from './movies';
import { SortBy } from "./sortBy";
import {Pages} from './pages';
import "../css/searchBar.css";
import "../css/button.css";
import "../css/topBar.css";
import axios from 'axios';
import { parse } from "@ethersproject/transactions";

const useStyles = makeStyles((theme) => 
(
  {
    customTextField:
    {
      '& .MuiInputBase-root':
      {
        backgroundColor: 'rgb(15, 172, 151)',
        borderRadius: '50px',
        color: 'antiquewhite',
      },
      '& .MuiOutlinedInput-root': 
      {
        '& fieldset': 
        {
          borderColor: 'antiquewhite',
        },
        '&:hover fieldset':
        {
          borderColor: 'antiquewhite',
        },
        '&.Mui-focused fieldset': 
        {
          borderColor: 'antiquewhite',
        },
      },
    },  
  }
));


export const Interface = () => 
{
  const [searchKeyword, setSearchKeyword] = useState(9999);
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState('');
  var params = {page:page, sort_by:""};
  const classes = useStyles();

  
  
  useQuery
  (DISCOVER_MOVIES, {variables: {params},
    onCompleted: data => {setMovies(data.movies);
    setTotalPages(parseInt(data.movies[0].totalPages));
  }});



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
      console.log("search nothing...");
      client.query({query: DISCOVER_MOVIES, variables: {params}})
      .then(response => {setMovies(response.data.movies)})
      .catch(error => console.log("displaying error: ", error));
    }
    else
    {
      console.log("searching executed...");
      const searchId = e.target.value;
      client.query({query: SEARCH_MOVIE, variables: {searchId}})
      .then(response => {setMovies([response.data.search])})
      .catch(error => console.log("displaying error: ", error));
    }
  }
  
  const shiftPage = (page) =>
  {
    params = {...params, page: page};
    console.log("params updated: ", params);
    console.log(totalPages);
    client.query({query: DISCOVER_MOVIES, variables: {params}})
    .then(response => {setMovies(response.data.movies);setPage(parseInt(response.data.movies[0].page))
    })
    .catch(error => console.log("displaying error: ", error));
  }

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

 