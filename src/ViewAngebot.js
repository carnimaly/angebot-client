import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { Button,  Input, Modal,  Box, Table, TableBody,TableRow,TableCell, TextField } from "@mui/material";
import Iframe from 'react-iframe'
import {useState} from "react"
import { useNavigate,useParams} from "react-router-dom";
import { useQuery,useQueryClient,useMutation } from 'react-query';
import { FetchAngebot, PostAngebot } from './api/api';
import {DateTime} from "luxon"
import Kachel from "./Kachel";
import { SendMail} from "./api/api"
pdfMake.vfs = pdfFonts.pdfMake.vfs;


const ViewAngebot = () => {
  const [expandToggle,setExpandToggle] = useState(true);
  const [dat,setDat] = useState();
  const [modalToggle,setModalToggle] = useState(false);
  const [mailContent,setMailContent] = useState({subject : "", mailTo: "", mailFrom : "", text : "" })
  let navigate = useNavigate();
  const { id } = useParams();
  const queryClient = new useQueryClient();
  const AngeboteQuery = useQuery('angebote', () => FetchAngebot(id))
  const AngebotUpdate = useMutation(PostAngebot, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries('angebote')
    },
  })
if(!AngeboteQuery.isLoading && !AngeboteQuery.isFetching){
  const angebot = AngeboteQuery.data.data

  let artikel = [];
let sum = {food: 0,drinks : 0,equip : 0,personal : 0}
 angebot.seiten.map(seite => {
  seite.items.map(item => {
    switch (seite.art) {
      case "S":
        sum.food += item.preis*angebot.eckdaten.vapers
        break;
      case "G":
        sum.drinks += item.preis*angebot.eckdaten.vapers
        break;
      case "E":
        sum.equip += item.preis*angebot.eckdaten.vapers
        break;
      case "P":
        sum.personal += item.preis*angebot.eckdaten.vapers
        break;
      
      default:
        break;
    }
    return null
  })
  return null
  })

 
let summary = [[{text:"Zusammenfassung" , lineHeight: 1,fontSize: 30},{text:" "},{text:" ",fontSize:30}]];
let summary2 = []
sum.food > 0 && summary.push([{text:"Speisen",fontSize: 30},{text:" ",fontSize:30},{text:(sum.food).toFixed(2)+" €" , lineHeight: 1,fontSize: 25 ,alignment : "right"}])
sum.drinks > 0 && summary.push([{text:"Getränke",fontSize: 30},{text:" ",fontSize:30},{text:(sum.drinks).toFixed(2)+" €" , lineHeight: 1,fontSize: 25 ,alignment : "right"}])
sum.equip > 0 && summary.push([{text:"Equipment & Logistik",fontSize: 30},{text:" ",fontSize:30},{text:(sum.equip).toFixed(2)+" €" , lineHeight: 1,fontSize: 25 ,alignment : "right"}])
sum.personal > 0 && summary.push([{text:"Personal",fontSize: 30},{text:" ",fontSize:30},{text:(sum.personal).toFixed(2)+" €" , lineHeight: 1,fontSize: 25 ,alignment : "right"}])

summary2.push([{text:"Gesamt",fontSize: 30},{text:" ",fontSize:30},{text:(sum.personal+sum.drinks+sum.equip+sum.food).toFixed(2)+" €" , lineHeight: 1,fontSize: 30 ,alignment : "right"}])
summary2.push([{text:"Gesamt pro Person",fontSize: 30},{text:" ",fontSize:30},{text:((sum.personal+sum.drinks+sum.equip+sum.food)/angebot.eckdaten.vapers).toFixed(2)+" €" , lineHeight: 1,fontSize: 30 ,alignment : "right"}])

   var docDefinition = {
    pageOrientation: 'landscape',
   
      content: [

       {text: " ",alignment : "center", lineHeight: 4,fontSize: 30},
       {
        layout: 'noBorders', 
        table: {
          headerRows: 1,
          widths: ["*",'auto',"*"],
          alignment: "center",
          body: [
            ["", {text: angebot.eckdaten.vaname,alignment : "center", lineHeight: 1,fontSize: 35}," "],
            ["", {text: DateTime.fromISO(angebot.eckdaten.vaortzeit).toFormat("dd.LL.yyyy t"),alignment : "center", lineHeight: 1,fontSize: 25},""],
            ["", {text: angebot.eckdaten.vapers+" Personen",alignment : "center", lineHeight: 1,fontSize: 25},""],
            ["", {text: angebot.eckdaten.vaort,alignment : "center", lineHeight: 1,fontSize: 30},""],
          ],
          
        },
       
      },

      angebot.seiten.map(seite => {
        
        if(seite.art !== "P"){

        seite.items.map(item => {
          artikel.push([{text:item.artikel , lineHeight: 1,fontSize: 25},{text:item.menge*angebot.eckdaten.vapers+" "+item.einheit,fontSize:25},{text:(item.preis*angebot.eckdaten.vapers).toFixed(2)+" €",fontSize:25 ,alignment : "right"}])
          return null
        })
      }else{
        seite.items.map(item => {
          artikel.push([{text:item.artikel , lineHeight: 1,fontSize: 25},{text:item.menge+" "+item.einheit,fontSize:25},{text:(item.preis*angebot.eckdaten.vapers).toFixed(2)+" €",fontSize:25 ,alignment : "right"}])
          return null
        })
      }

        artikel.unshift([{text:seite.header ,lineHeight: 1,fontSize: 25},{text:" " ,lineHeight: 1,fontSize: 25},{text:" " ,lineHeight: 1,fontSize: 25}])
        var tmp = artikel
        artikel = []
        return ([{text : " ",lineHeight: 4,pageBreak: 'before',},
          
            
          {
           layout: 'lightHorizontalLines', // optional
           table: {
            headerRows: 1,
            widths: ["auto",'*','auto'],
            alignment: "center",
            body: tmp,
           },
           
           }
        ]
          
        )
      }),       {text: " ",alignment : "center", lineHeight: 4,pageBreak: "before",},
      {
       layout: 'lightHorizontalLines', // optional
      
       table: {
         // headers are automatically repeated if the table spans over multiple pages
         // you can declare how many rows should be treated as headers
         headerRows: 1,
         alignment: "right",
         widths: ["auto",'*','auto'],
         body: summary,
         
       },

      
     },{text : " ",lineHeight: 3}, {
      layout: 'lightHorizontalLines', // optional
     
      table: {
        // headers are automatically repeated if the table spans over multiple pages
        // you can declare how many rows should be treated as headers
        headerRows: 1,
        alignment: "right",
        widths: ["auto",'*','auto'],
        body: summary2,
        
      },

     
    },
    {text : " ",lineHeight: 2},
    {text : "Hinweise : Der Preis für Getränke und Personal ist nur geschätzt und wird nach tatsächlichem Verbrauch abgerechnet."}

        
    ]
    
  };
if(dat === undefined){
const pdfDocGenerator = pdfMake.createPdf(docDefinition);
pdfDocGenerator.getDataUrl((dataUrl) => {
  setDat(dataUrl)
  console.log(angebot)
  const datum = DateTime.fromISO(angebot.eckdaten.vaortzeit).toFormat("dd.LL.yyyy");
  const text = "Sehr geehrte/r "+angebot.auftraggeber.auftraggeberAnsprechpartner+",\nanbei erhalten Sie heute Ihr Angebot für Ihre:\n"+angebot.eckdaten.vaname+"\nam "+datum+"\nfür "+angebot.eckdaten.vapers+" Personen\n\nSie können das Angebot unter folgendem Link Bestätigen oder Ablehnen:\nhttp://localhost:3000/offer/"+angebot._id+"\n\nBei Rückfragen Melden Sie sich gerne bei uns."
  setMailContent((o) => ({...o, subject: "Angebot für "+angebot.eckdaten.vaname+" am "+datum, mailTo : angebot.auftraggeber.auftraggeberEmail, text : text, mailFrom : "angebot@denzu.de"}))

})
}
}
const handleSend = () => {
setModalToggle(true)

}

const handleModalClose = () => {
setModalToggle(false)
}
const handleSendMail = () => {
  const data = {dat : dat, content : mailContent}
  SendMail(data)
  
  const angebot = AngeboteQuery.data.data
  AngebotUpdate.mutate({...angebot, status : "versendet", id : angebot._id})
console.log({...angebot,status : "versendet"})
    navigate("/")
  

}
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
  return (
    <>    
          <Modal open={modalToggle} onClose={handleModalClose}>

        <Box sx={style}>
         <form action="submit" onClick={(e) => {e.preventDefault()}}>
           <Table  size="small" sx={{minWidth : 800}} >
             <TableBody>
               <TableRow>
                 <TableCell style={{width: 100}}>Empfänger</TableCell>
                  <TableCell>
                  <Input  fullWidth id="mailTo" label="Empfänger" value={mailContent.mailTo}></Input>
                  </TableCell>
               </TableRow>
               <TableRow>
               <TableCell style={{width: 100}}>Betreff</TableCell>
                  <TableCell>
                  <Input fullWidth id="mailSubject" label="Betreff" value={mailContent.subject}></Input>
                  </TableCell>
               </TableRow>
               <TableRow>
               <TableCell style={{width: 100}}>Nachricht</TableCell>
                  <TableCell >
                  <TextField minRows={9} fullWidth  multiline id="mailContent" label="Nachricht" value={mailContent.text}></TextField>
                  </TableCell>
               </TableRow>
               <TableRow>
               <TableCell style={{width: 100}}>Absender</TableCell>
                  <TableCell>
                  <Input fullWidth id="mailFrom" label="Von" value={mailContent.mailFrom}></Input>
                  </TableCell>
               </TableRow>
               <TableRow>
                  <TableCell>
                  <Button id="submit" type="submit" value="Versenden" variant="contained" color="success" onClick={handleSendMail}>Versenden</Button>
                  </TableCell>
                  <TableCell>          <Button id="abourt" value="Abbrechen" onClick={handleModalClose} variant="contained" color="error">Abbrechen</Button></TableCell>
               </TableRow>
             </TableBody>
           </Table>
        
      

     
    

          </form>
          </Box>
       
      </Modal>
    <div style={{height: "80vh"}}>

    <Kachel title="Aktionen" expand={expandToggle} expandToggle={setExpandToggle} content={<><Button variant="contained" onClick={() => navigate("/")}>Zurück</Button> <Button variant="contained" color="error" onClick={handleSend}>Versenden</Button> <Button variant="contained" color="warning" onClick={() => navigate("/editangebot/"+id)}>Ändern</Button></>} />
      { AngeboteQuery.isLoading || AngeboteQuery.isFetching ? "loading..." :
    <Iframe height="100%" width="100%" src={dat}/>
  }
    </div>
    </>
  )
}

export default ViewAngebot