import React, { useState,useEffect } from 'react'
import { Button,FormControl,Input,FormHelperText, Grid, Stack,TextField } from '@mui/material';
import DateTimePicker from '@mui/lab/DateTimePicker';
import { DateTime } from 'luxon';


const Eckdaten = ({setToggle,vaDaten,data }) => {
    const [eckdaten, setEckdaten] = useState({vaname : "", vaort : "",vapers : "", vaortzeit :""});
const handleChange = (e) => {

    setEckdaten((old) => ({...old, [e.target.id] : e.target.value}))
    vaDaten((old) => ({...old, [e.target.id] : e.target.value}))
}

const handleChangeDt = (e) => {
    setEckdaten((old) => ({...old, vaortzeit : e}))
    vaDaten((old) => ({...old, vaortzeit : e}))
}

useEffect(() => {
    setEckdaten(data)

}, [])
return(
<div>
    <form onSubmit={(e) => { e.preventDefault(); setToggle(false)}}>
   <Grid container marginTop={2} spacing={5} justifyContent="flex-start">
        <Grid item >
            <>
            <Stack spacing={3}>
            <FormControl >
                <Input  id="vaname" aria-describedby="VA Name" onChange={handleChange} value={eckdaten.vaname}/>
                <FormHelperText id="my-helper-text">Name der Veranstaltung</FormHelperText>
            </FormControl>
            <FormControl>
            <DateTimePicker
        renderInput={(props) => <TextField variant="filled" id="vaid" {...props} />}
        
        label="Datum / Uhrzeit"
        value={eckdaten.vaortzeit}
        onChange={handleChangeDt}
        minDate={DateTime.now()}
      />
            </FormControl>
            <FormControl>
         
                <Input variant="outlined" id="vaort" aria-describedby="Raum / Ort" onChange={handleChange} value={eckdaten.vaort || ""}/>
                <FormHelperText id="my-helper-text">Raum / Ort</FormHelperText>
                            </FormControl>
            <FormControl>
                <Input   id="vapers" aria-describedby="Adresse des Auftraggebers" onChange={handleChange} value={eckdaten.vapers || ""}/>
                <FormHelperText id="my-helper-text">Personenanzahl</FormHelperText>
            </FormControl>
            <Button type="submit" variant="contained" onClick={() => setToggle(false)}>Fertig</Button>
            </Stack>
            </>
       
           </Grid>  
        </Grid>
        </form>
   

   
    



    </div>
)
}

export default Eckdaten
