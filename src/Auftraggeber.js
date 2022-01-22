import React, { useState,useEffect } from 'react'
import { FormControl,InputLabel,Input,FormHelperText, Grid, Button, Select, MenuItem, Stack } from '@mui/material';
import { useQuery,useQueryClient,useMutation } from 'react-query';
import { PostAuftraggeber,FetchAuftraggeber } from './api/api';



const Auftraggeber = ({kundenData, setToggle,data}) => {
    const [auftraggeber, setAuftraggeber] = useState({auftraggeberAnsprechpartner : ''});
    const handleChange = (e) => {
        setAuftraggeber((old) =>  ({...old,[e.target.id] : e.target.value,_id : undefined}))
        kundenData((old) => ({...old,[e.target.id] : e.target.value}))
    }
    const handleBestandskunden = (e) => {

        setAuftraggeber({...e.target.value,_id : undefined})
        kundenData({...e.target.value})
        setToggle(false)
      
    }

    useEffect(() => {
        setAuftraggeber(data)

    }, [])
    const queryClient = useQueryClient()
 
    // Queries
    const AuftraggeberQuery = useQuery('Auftraggeber', FetchAuftraggeber)
  
    // Mutations
    const AuftraggeberMutation = useMutation(PostAuftraggeber, {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries('Auftraggeber')
      },
    })

return(
<div>

{!AuftraggeberQuery.isLoading ? 
   <Grid container marginTop={2} spacing={5} justifyContent="flex-start">
        <Grid item >
            <>
            <Stack spacing={3}>

           
            <FormControl variant="standard" sx={{ m: 1, minWidth: 220 }}>
                <InputLabel id ="Bestandskunde">Wähle Bestandskunden</InputLabel>
            <Select labelId="Bestandskunde" id="vorlage" value='' onChange={handleBestandskunden}>
           { AuftraggeberQuery.data.data.map((item) => (
                <MenuItem key={item._id} value={item}>{item.auftraggeberAnsprechpartner} {item.auftraggeberFirma}</MenuItem>
            )
            )}
            </Select>
            </FormControl>
            <FormControl >
                <Input variant="outlined" id="auftraggeberEmail" aria-describedby="Email des Kunden" onChange={handleChange} value={auftraggeber.auftraggeberEmail || ""}/>
                <FormHelperText id="my-helper-text">Email des Auftraggebers für Angebotsversand</FormHelperText>
            </FormControl>
            <FormControl>
                <Input id="auftraggeberAnsprechpartner" aria-describedby="Ansprechpartner" onChange={handleChange}  value={auftraggeber.auftraggeberAnsprechpartner || ""}/>
                <FormHelperText id="my-helper-text">Ansprechpartner / Auftraggeber</FormHelperText>
            </FormControl>
            <FormControl>
                <Input variant="outlined" id="auftraggeberFirma" aria-describedby="Auftraggeber Firma" onChange={handleChange} value={auftraggeber.auftraggeberFirma || ""}/>
                <FormHelperText id="my-helper-text">Firma des Auftraggebers</FormHelperText>
            </FormControl>
            <FormControl>
                <Input multiline rows={4} id="auftraggeberAdresse" aria-describedby="Adresse des Auftraggebers" onChange={handleChange} value={auftraggeber.auftraggeberAdresse || ""}/>
                <FormHelperText id="my-helper-text">Adresse des Auftraggebers</FormHelperText>
            </FormControl>
            <div>
                <Button  disabled={!auftraggeber.auftraggeberAdresse || !auftraggeber.auftraggeberAnsprechpartner|| !auftraggeber.auftraggeberEmail || !auftraggeber.auftraggeberFirma} variant="contained" onClick={() => 
                    {
                        AuftraggeberMutation.mutate(auftraggeber)
                        setToggle(false)
                        }}>Als neuen Kunden Speichern</Button>
                 
            </div>
            <div>  (pro Email nur eine Person / keine Rückmeldung vom System falls die Email schon vorhanden ist wird noch gemacht)</div>
            </Stack>
            </>
       
           </Grid>  
         </Grid>
           
    : ""}

   
    



    </div>
)
}

export default Auftraggeber
