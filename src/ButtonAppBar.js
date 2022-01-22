import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';


export default function ButtonAppBar() {
  let navigate = new useNavigate();
  return (
    <Box sx={{ flexGrow: 1 ,marginBottom: "20px"}}>
      <AppBar position="static">
        <Toolbar >
          <Button variant="contained" color="primary"onClick={() => navigate("/")}>Angebote</Button>
          <Button variant="contained" color="primary"onClick={() => navigate("/angebot")}>neues Angebote</Button>
          <Button variant="contained" color="primary"onClick={() => navigate("auftraggeberverwaltung")}>Kundenverwaltung</Button>
          <form action="" onSubmit={() =>  sessionStorage.clear()}><Button variant="contained" type="submit" color="error">Logout</Button></form>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
