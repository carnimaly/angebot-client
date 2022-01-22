import { TableContainer , Paper, TableHead,Table,TableRow,TableCell,TableBody, Button,Modal,Box} from '@mui/material'
import React from 'react'
import Seite from './Seite';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1000,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const Artikel = ({setSeiten,seiten,personen}) => {
    const [open, setOpen] = React.useState(false);
    const [artikelData,setArtikelData] = React.useState({art : "",header : "",items : []})
    const [openSnack, setOpenSnack] = React.useState(false);

  
    const handleCloseSnack = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpenSnack(false);
    };
  
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        if(artikelData.items.length){
        setSeiten((o) => [...o,artikelData])
        setArtikelData({art : "",header : "",items : []})
        setOpen(false)
        }else {
            setOpenSnack(true)
        }

     
    };
    const handleChange = (e,nr) => {
      setArtikelData(seiten[nr])
      const neu = seiten.filter((_,i) => i !== nr)
      setSeiten(neu)
      setOpen(true)
    }
    const handleDelete = (e,nr) => {
        console.log(nr)
        const neu = seiten.filter((_,i) => i !== nr)
        setSeiten(neu)
    }
    

    return(
        <>
         <Button onClick={handleOpen}>Neue Seite</Button>
<Modal

  open={open}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={style}>

<Seite getArtikel={artikelData} setArtikel={setArtikelData}/>

<Snackbar open={openSnack} autoHideDuration={6000} onClose={handleCloseSnack}>
            <Alert onClose={handleCloseSnack} severity="error" sx={{ width: '100%' }}>
              Mindestens Ein Artikel
            </Alert>
          </Snackbar>  


        <Button onClick={handleClose}>Fertig</Button>
        <Button onClick={() => {setOpen(false);    setArtikelData({art : "",header : "",items : []})}}>Abbrechen</Button>
        
  </Box>
</Modal>
        <TableContainer component={Paper} >
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Seite</TableCell>
                        <TableCell>Header</TableCell>
                        <TableCell>Art</TableCell>
                        <TableCell>Artikelmenge</TableCell>
                        <TableCell>Preis</TableCell>
                        <TableCell>Ändern</TableCell>
                        <TableCell>Löschen</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {seiten.map((item,i) => {
                      
                        let preis = 0;
                       item.items.forEach(ar => {
                      
                         
                           preis += parseFloat(ar.preis) *personen
                          })
                        return(
                        <TableRow key={i}>
                            <TableCell>{i+1}</TableCell>
                            <TableCell>{item.header}</TableCell>
                            <TableCell>{item.art}</TableCell>
                            <TableCell>{item.items.length}</TableCell>
                            <TableCell>{preis.toFixed(2)} €</TableCell>
                            <TableCell><Button onClick={(e) => handleChange(e,i)}>Ändern</Button></TableCell>
                            <TableCell><Button onClick={(e) => handleDelete(e,i)}>Löschen</Button></TableCell>
                        </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>
        </>
)
}

export default Artikel