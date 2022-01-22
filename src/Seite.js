import React from 'react'
import { Button, FormControl,Input,FormControlLabel,Radio,RadioGroup, Grid } from '@mui/material';
import { DataGrid} from '@mui/x-data-grid';
import "./Seite.css"


const Seite = ({setArtikel,getArtikel}) => {

const [item,setItem] = React.useState({artikel : "",menge : "0",preis : "0",einheit : "", id: getArtikel.items.length + 1 || 1 })

const handleOptions = (e) => {
    setArtikel((old) => ({...old, [e.target.id] : e.target.value}))
}
const handleNewRow = (e) => {
    setItem((o) => ({...o,id : o.id+1}))
    setArtikel((old) => ({...old,items : [...old.items,item]}))
  
}
const handleEditRowsModelChange = 
    (params) => {
        let oldArr = getArtikel.items;
        let newArr = oldArr.filter(pos => {
       
            if(pos.id === params.id){
     
                switch (params.field) {
                    case "artikel":
                        pos.artikel = params.value
                        break;
                        case "menge":
                            pos.menge = params.value
                            break;
                            case "preis":
                                pos.preis = params.value
                                break;
                                case "einheit":
                                    pos.einheit = params.value
                        break;
                
                    default:
                        break;
                }
            
            }
            return pos
        })
   
    
    setArtikel((old) => ({...old, items : newArr}))

        

     }
  const handleDelArtikel = (e) => {

    let id = e.row.id;
    console.log(id)
    const neu = getArtikel.items.filter((item,i) => item.id !== id)
    setArtikel((old) => ({...old, items : neu}))
  }  




const columns = [
    
    { field: "artikel", headerName : "Artikel", width: 548, editable: true,headerClassName: 'artikel-grid--header',},
    { field: "menge",type : "number", headerName : "Menge pro Person", width: 100, editable: true,headerClassName: 'artikel-grid--header'},
    { field: "einheit", headerName : "Einheit", width: 100, editable: true,headerClassName: 'artikel-grid--header'},
    { field: "preis", type : "number", headerName : "Preis pro Pers.", valueFormatter: ({ value }) => `${value} €`, width: 150, editable: true,headerClassName: 'artikel-grid--header'},
    {field : "id",headerClassName: 'artikel-grid--header', headerName : "Löschen", width: "100",renderCell: (params) => { return(<Button variant="contained" onClick={() => handleDelArtikel(params)}>X</Button>)}}
    
]

return(
<div>

<Grid container marginTop={2}  justifyContent="flex-start">
    <Grid item xs={12}>
         <Input onChange={handleOptions} id="header" placeholder="Überschrift der Seite" fullWidth value={getArtikel.header}></Input>
        
        </Grid>
        <Grid item xs={12}>
        <FormControl component="fieldset">
        <RadioGroup row aria-label="gender"
                    name="controlled-radio-buttons-group"
                value={getArtikel.art}
                onChange={(e) => {setArtikel((old) => ({...old,art : e.target.value}))}}
                    >
                        <FormControlLabel  value="S" control={<Radio />} label="Speisen" />
                        <FormControlLabel  value="G" control={<Radio />} label="Getränke" />
                        <FormControlLabel  value="E" control={<Radio />} label="Equipment" />
                        <FormControlLabel  value="P" control={<Radio />} label="Personal" />
        </RadioGroup>
    </FormControl> 
    </Grid>
    <Grid item xs={12}><Button onClick={handleNewRow}>neue Zeile</Button></Grid>

    <DataGrid  onCellEditCommit={handleEditRowsModelChange} autoHeight columns={columns} rows={getArtikel.items} />
 
        </Grid>
    </div>
)
}

export default Seite
