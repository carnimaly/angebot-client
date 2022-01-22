import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,Paper } from '@mui/material';
import React from 'react';
import { FetchAngebote,DeleteAngebot } from './api/api';
import { useQuery,useQueryClient,useMutation } from 'react-query';
import { DateTime } from 'luxon';
import { useNavigate} from "react-router-dom";
import  Kachel from "./Kachel" 


const Angebotsübersicht = () => {
    const [toggleAktuell,setToggleAktuell] = React.useState(true)
    const [toggleArchive,setToggleArchive] = React.useState(false)
let navigate = useNavigate();
    const queryClient = useQueryClient()
     // Queries
    const AngeboteQuery = useQuery('angebote', FetchAngebote)
    const AngeboteDel = useMutation(DeleteAngebot, {
        onSuccess: () => {
          // Invalidate and refetch
          queryClient.invalidateQueries('angebote')
        },
      })
const handleDel = (e) => {
   AngeboteDel.mutate(e)
}
const handleEdit = (e) => {
    navigate("/editangebot/"+e._id)
}
const handleView = (e) => {
    console.log(e)
    navigate("/view/"+e)
}
const aktuell= <TableContainer component={Paper} sx={{width: "90%",margin : "auto"}}>
<Table >
    <TableHead sx={{bgcolor: "lightblue"}}>
        <TableRow>
            <TableCell>Ansehen</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Datum / Zeit</TableCell>
            <TableCell>Personen</TableCell>
            <TableCell>Ort</TableCell>
            <TableCell>Ansprechpartner</TableCell>
            <TableCell>Ändern</TableCell>
            <TableCell>Löschen</TableCell>
        </TableRow>
    </TableHead>
    <TableBody>
{!AngeboteQuery.isLoading && !AngeboteQuery.isFetching ?
  AngeboteQuery.data.data.map((angebot,index) => {
      const angebotdatum = DateTime.fromISO(angebot.eckdaten.vaortzeit);
      const heute = DateTime.now();
      if(heute < angebotdatum){
      return (
        <TableRow key ={index} onDoubleClick={() => handleView(angebot._id)}>
            <TableCell><Button onClick={() => handleView(angebot._id)}>Ansehen</Button></TableCell>
            <TableCell>{angebot.status}</TableCell>
            <TableCell>{angebot.eckdaten.vaname}</TableCell>
            <TableCell>{DateTime.fromISO(angebot.eckdaten.vaortzeit).toFormat("dd.LL.yyyy / T")}</TableCell>
            <TableCell>{angebot.eckdaten.vapers}</TableCell>
            <TableCell>{angebot.eckdaten.vaort}</TableCell>
            <TableCell>{angebot.auftraggeber.auftraggeberAnsprechpartner}</TableCell>
            <TableCell><Button onClick={() => handleEdit(angebot)}>Ändern</Button></TableCell>
            <TableCell><Button onClick={() => handleDel(angebot._id)}>Löschen</Button></TableCell>
        </TableRow>
    )
      }
    })
  
: <TableRow><TableCell>Loading...</TableCell></TableRow>}
</TableBody>
</Table>
</TableContainer>
const archive = <TableContainer component={Paper} sx={{width: "90%",margin : "auto"}}>
<Table >
    <TableHead sx={{bgcolor: "lightblue"}}>
        <TableRow>
            <TableCell>Ansehen</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Datum / Zeit</TableCell>
            <TableCell>Personen</TableCell>
            <TableCell>Ort</TableCell>
            <TableCell>Ansprechpartner</TableCell>
            <TableCell>Ändern</TableCell>
            <TableCell>Löschen</TableCell>
        </TableRow>
    </TableHead>
    <TableBody>
{!AngeboteQuery.isLoading && !AngeboteQuery.isFetching ?
  AngeboteQuery.data.data.map((angebot,index) => {
      const angebotdatum = DateTime.fromISO(angebot.eckdaten.vaortzeit);
      const heute = DateTime.now();
      if(heute > angebotdatum){
      return (
        <TableRow key ={index} onDoubleClick={() => handleView(angebot._id)}>
            <TableCell><Button onClick={() => handleView(angebot._id)}>Ansehen</Button></TableCell>
            <TableCell>{angebot.status}</TableCell>
            <TableCell>{angebot.eckdaten.vaname}</TableCell>
            <TableCell>{DateTime.fromISO(angebot.eckdaten.vaortzeit).toFormat("dd.LL.yyyy / T")}</TableCell>
            <TableCell>{angebot.eckdaten.vapers}</TableCell>
            <TableCell>{angebot.eckdaten.vaort}</TableCell>
            <TableCell>{angebot.auftraggeber.auftraggeberAnsprechpartner}</TableCell>
            <TableCell><Button onClick={() => handleEdit(angebot)}>Ändern</Button></TableCell>
            <TableCell><Button onClick={() => handleDel(angebot._id)}>Löschen</Button></TableCell>
        </TableRow>
    )
      }
    })
  
: <TableRow><TableCell>Loading...</TableCell></TableRow>}
</TableBody>
</Table>
</TableContainer>
return(
    <>
    <Kachel title="Aktuell" content={aktuell} expand={toggleAktuell} expandToggle={setToggleAktuell}/>
    <Kachel title="Archiv" content={archive} expand={toggleArchive} expandToggle={setToggleArchive}/>
    </>
)


}

export default Angebotsübersicht

