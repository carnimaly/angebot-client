import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { Button, List, ListItem, ListItemIcon, Table, TableBody, TableCell, TableHead, TableRow, Typography} from "@mui/material";
import FestivalTwoToneIcon from '@mui/icons-material/FestivalTwoTone';
import CelebrationTwoToneIcon from '@mui/icons-material/CelebrationTwoTone';
import GroupsTwoToneIcon from '@mui/icons-material/GroupsTwoTone';
import AccessTimeTwoToneIcon from '@mui/icons-material/AccessTimeTwoTone';
import {useState} from "react"
import { useParams} from "react-router-dom";
import { useQuery,useQueryClient,useMutation } from 'react-query';
import { FetchAngebot, PostAngebot } from './api/api';
import {DateTime} from "luxon"
import Kachel from "./Kachel";

pdfMake.vfs = pdfFonts.pdfMake.vfs;


const OfferView = () => {
  const [expandToggle,setExpandToggle] = useState(true);
  const [sumToggle,setSumToggle] = useState(true);
  const [dat,setDat] = useState("no");

  const { id } = useParams();
  const queryClient = new useQueryClient();
  const AngeboteQuery = useQuery('angebote', () => FetchAngebot(id))
  let summary = ""
  const AngebotUpdate = useMutation(PostAngebot, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries('angebote')
    },
  })

const handleSuccess = () => {
  const angebot = AngeboteQuery.data.data;
  AngebotUpdate.mutate({...angebot, status : "Akzeptiert",id : angebot._id})
  setDat("Vielen Dank für die Erteilung des Auftrags")
  
}
const handleX = () => {
  const angebot = AngeboteQuery.data.data;
  AngebotUpdate.mutate({...angebot, status : "Abgelehnt",id : angebot._id})
  setDat("Angebot abgelehnt. Der Angebotersteller wird Informiert")
}


let sum = [];
let angebot = ""


if(AngeboteQuery.isSuccess && !AngeboteQuery.isLoading && !AngeboteQuery.isFetching){
let tmp = {preis : parseFloat(0)}
angebot = AngeboteQuery.data.data


angebot.seiten.map((seite) => {
  tmp.header = seite.header
  seite.items.map((item) => {
    console.log(item.preis)
    tmp.preis += parseFloat(item.preis)*angebot.eckdaten.vapers
    return null
  })
    sum.push(tmp)
    tmp = { preis : parseFloat(0)}
    return null
}

)

let gPreis = 0;
summary = (<>
<List>
  <ListItem>
    Hier sehen Sie die Zusammenfassung Ihres Angebots. Bei Rückfragen stehen wir Ihnen gerne zur Verfügung.
  </ListItem>
  <ListItem>
    <ListItemIcon><CelebrationTwoToneIcon/>
      </ListItemIcon>{angebot.eckdaten.vaname}</ListItem>
  <ListItem>    <ListItemIcon><FestivalTwoToneIcon/>
      </ListItemIcon>{angebot.eckdaten.vaort}</ListItem>
  <ListItem><ListItemIcon><GroupsTwoToneIcon/>
      </ListItemIcon>{angebot.eckdaten.vapers} Personen</ListItem>
  <ListItem><ListItemIcon><AccessTimeTwoToneIcon/>
      </ListItemIcon>{DateTime.fromISO(angebot.eckdaten.vaortzeit).toFormat("dd.LL.yyyy t")}</ListItem>
  <ListItem></ListItem>
  </List>
<Table size="small" sx={{width: "50%"}}>
          <TableHead>
            <TableRow>
              <TableCell>Seite</TableCell>
              <TableCell>Preis</TableCell>
            </TableRow> 
            </TableHead>
            <TableBody>
     { sum.map((i,dex) => {
gPreis += i.preis
        return (
            <TableRow  key={dex}>
              <TableCell>{i.header}</TableCell>
              <TableCell>{(i.preis).toFixed(2)+" €"}</TableCell>
            </TableRow>
          )})}
          <TableRow>
            <TableCell><Typography variant="h4">Gesamt</Typography></TableCell>
            <TableCell><Typography variant="h4">{gPreis.toFixed(2)+" €"}</Typography></TableCell>
          </TableRow>
 </TableBody>
 </Table>
        </>)


        }


  return (
    <>
{dat === "no" ? 

AngeboteQuery.isSuccess ?
       
   <div style={{height: "80vh"}}>
      { AngeboteQuery.isLoading || AngeboteQuery.isFetching ? "loading..." :  
       AngeboteQuery.data.data.status === "versendet" ? 
       <>
    <Kachel title="Zusammenfassung" expand={sumToggle} expandToggle={setSumToggle} content={summary} /><Kachel title="Aktionen" expand={expandToggle} expandToggle={setExpandToggle} content={<><Button variant="contained" color="success" onClick={handleSuccess}>Akzeptieren / Auftrag erteilen</Button> <Button variant="contained" color="error" onClick={handleX}>Ablehnen</Button></>} /></>
    : <Typography variant="h4">Kein gültiges Angebot gefunden. Sollten Sie über einen E-Mail link zu dieser Seite gekommen sein kontaktieren Sie bitte den Versender der Nachricht.</Typography>}
  </div> 
    : <div><Typography variant="h4">Kein gültiges Angebot gefunden. Sollten Sie über einen E-Mail link zu dieser Seite gekommen sein kontaktieren Sie bitte den Versender der Nachricht.</Typography></div>

: dat}</>)
}

export default OfferView