import React,{useEffect} from 'react'
import Kachel from "./Kachel";
import Eckdaten from "./Eckdaten";
import Auftraggeber from './Auftraggeber';
import { Button, Grid} from '@mui/material';
import Artikel from './Artikel';
import { PostAngebot } from './api/api';
import { useParams ,useNavigate } from 'react-router-dom';
import { useQuery,useQueryClient,useMutation } from 'react-query';
import { FetchAngebot } from './api/api';
import { DateTime } from 'luxon';
const Angebot = () => {

  const { id } = useParams();

  // Queries
  const queryClient = new useQueryClient();

 const AngeboteQuery = useQuery('angebote', () => FetchAngebot(id))
 const AngebotUpdate = useMutation(PostAngebot, {
  onSuccess: () => {
    // Invalidate and refetch
    queryClient.invalidateQueries('angebote')
  },
})
    const [auftraggeber,setAuftraggeber] = React.useState({auftraggeberAnsprechpartner : "", auftraggeberFirma : ""});
    const [eckdaten,setEckdaten] = React.useState({vaname : "", vaort : "",vapers : "", vaortzeit :""});
    const [seiten,setSeiten] = React.useState([]);
    const [toggleAuftraggeber,setToggleAuftraggeber] = React.useState(true)
    const [toggleEckdaten, setToggleEckdaten] = React.useState(true)
    const [toggleArtikel, setToggleArtikel] = React.useState(true)
    const [toggleAktionen,setToggleAktionen] = React.useState(true)
    let navigate = new useNavigate();
const preis = () => {
  let p = 0
  seiten.map((seite) => {
    seite.items.map((item) => {
      p += item.preis
      return null
    })
    return null
  })
let result = p* parseFloat(eckdaten.vapers)

  return result ? result.toFixed(2): "0.00";
}
useEffect(() => {
  
  if(id && !AngeboteQuery.isFetching && !AngeboteQuery.isLoading){
   

 let edit = AngeboteQuery.data.data;
    edit.eckdaten.vaortzeit = DateTime.fromISO(edit.eckdaten.vaortzeit)
  setEckdaten(edit.eckdaten);
  setSeiten(edit.seiten);
  setAuftraggeber(edit.auftraggeber)
    setToggleAuftraggeber(false)
    setToggleEckdaten(false)

  }
}, [AngeboteQuery.isLoading,AngeboteQuery.isFetching,id])


const handleSave = () => {
  if(id){
let angebot = {auftraggeber,eckdaten,seiten,id,status : "geändert"}
AngebotUpdate.mutate(angebot);
  }else{
    let angebot = {auftraggeber,eckdaten,seiten,status : "neu"}
AngebotUpdate.mutate(angebot);
  }

navigate("/")
}
const handleDel = () => {
setEckdaten({vaname : "", vaort : "",vapers : "", vaortzeit :""});
setAuftraggeber({auftraggeberAnsprechpartner : "", auftraggeberFirma : ""});
setSeiten([])

}

return( 
    <>
  <Grid container spacing={4}>
<Grid item xs={12}><Kachel title="Auftraggeber" subtitle={auftraggeber.auftraggeberAnsprechpartner+" "+auftraggeber.auftraggeberFirma} content={<Auftraggeber data={auftraggeber} kundenData={setAuftraggeber} setToggle={setToggleAuftraggeber} />} expand={toggleAuftraggeber} expandToggle={setToggleAuftraggeber}/></Grid>
<Grid item xs={12}><Kachel title="Eckdaten" subtitle={!toggleEckdaten && eckdaten.vaortzeit !== "" ? eckdaten.vaname+" | " +eckdaten.vaortzeit.toFormat("dd/LL/yyyy t")+" | "+eckdaten.vaort+" | "+eckdaten.vapers+" Personen" : ""} content={<Eckdaten data={eckdaten} setToggle={setToggleEckdaten} vaDaten={setEckdaten}/>} expand={toggleEckdaten} expandToggle={setToggleEckdaten}/></Grid>
<Grid item xs={12}><Kachel title="Artikel" subtitle={"Preis Gesamt : "+preis()+" €"} content={<Artikel seiten={seiten} setSeiten={setSeiten} personen={eckdaten.vapers}/>} expand={toggleArtikel} expandToggle={setToggleArtikel}/></Grid>
<Grid item xs={12}><Kachel title="Aktionen" content={<><Button variant="contained"  onClick={handleSave}>Angebot Speichern</Button>  <Button variant="contained"  onClick={handleDel}>Angebot Löschen</Button></>} expand={toggleAktionen} expandToggle={setToggleAktionen}/></Grid>
</Grid>
</>
)
}

export default Angebot
