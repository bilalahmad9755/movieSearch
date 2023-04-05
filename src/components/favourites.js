import React, { useState, useEffect} from 'react';
import {Button} from "@material-ui/core";
import { getDatabase, ref, onValue, set, remove} from "firebase/database";
import CircularProgress from '@material-ui/core/CircularProgress';

export const Favourites = (props)=> {
    const db = getDatabase();
    const [status, setStatus] = useState('');
    const [loading, setLoading] = useState(true);
    const checkRecord = (_name, _id, _user)=>
    {
        const starCountRef = ref(db, 'favourites/'+ _user + '/' + _id +'/'+"movieName");
        onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        if(data === null)
        {
            setStatus('Add Favourites');
            setLoading(false);
        }
        else if(data === _name)
        {
            setStatus('Remove Favourites');
            setLoading(false);
        }
    })}

    const addFavourites = () => {
        if(props.user === "login")
        {alert("login first");return;}
        set(ref(db, 'favourites/' + props.user + '/' + props.id), 
        {movieName: props.name});
    }

    const removeFavourites = () => {
        remove(ref(db, 'favourites/' + props.user + '/' + props.id), {});
    }

    useEffect(() => {
    checkRecord(props.name, props.id, props.user)},
    [status, props.user]);

    return(
        <div>
            
            <br />
            <Button 
            onClick={()=>{
                if(status === "Add Favourites")
                {addFavourites()}
                else{removeFavourites()}}} 
                color='primary'
                variant='contained'>
                {  loading ? (<CircularProgress size={20} color='#0fac98'/>):(status)}
            </Button>
        </div>
    )
}