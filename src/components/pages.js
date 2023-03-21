import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import "../css/pageShift.css";
export const Pages = ({current, total, shift}) =>
{
    const [nextDisabled, setNextdisabled] = useState(false);
    const [prevDisabled, setPrevdisabled] = useState(false);


    useEffect(() => {
        if(current === 1)
        {
            setPrevdisabled(true);
        }
        else
        {
            setPrevdisabled(false);
        }
        if(current === total)
        {
            setNextdisabled(true);
        }
        else
        {
            setNextdisabled(false);
        }
    },[current, total]);

    return(
        
        <div className="pageShift">
            <br />
            <Button disabled={prevDisabled} onClick={()=>{shift(current - 1)}}>Previous</Button>
            <p>Page {current}/ {total}</p>
            <Button disabled={nextDisabled} onClick={()=>{shift(current + 1)}}>Next</Button>
        </div>
    )
}