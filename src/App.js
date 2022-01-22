import React from "react";
import AuftraggeberVerwaltung from "./AuftraggeberVerwaltung";
import ButtonAppBar from "./ButtonAppBar";
import AdapterDateLuxon from '@mui/lab/AdapterLuxon';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { QueryClient, QueryClientProvider } from "react-query";
import Angebot from "./Angebot";
import Angebotsübersicht from "./Angebotsübersicht";
import { Routes, Route} from "react-router-dom";
import ViewAngebot from "./ViewAngebot";
import Kachel from "./Kachel";
import OfferView from "./OfferView";
import { Button,  TextField } from "@mui/material";
import { LoginSend ,GetT} from "./api/api";


const queryClient = new QueryClient();

function Login() {
  const [expT,setExpT] = React.useState(true);
  const [v,setV] = React.useState("");
  const handleSubmit = (e) => {
    e.preventDefault()

    LoginSend({data : v}).then((data) => {

      GetT().then((t) => {
        console.log(t)
        if(data.data === t.data){
          sessionStorage.setItem("id", t.data)
          window.location.reload()
        }
      })
    }

    )
    
  }
  return(<>
  <Kachel expand={expT} expandToggle={setExpT} title="Login" content={
    <>

  <form action="/" onSubmit={(e) =>handleSubmit(e)}>
  <div style={{display : "flex",justifyContent : "center"}}> 
  <TextField type="password" variant="outlined" label="Passwort" onChange={(e) => setV(e.target.value)} value={v}></TextField>
  <Button sx={{height: "55px",marginLeft: "5px"}} variant="contained" type="submit">Senden</Button>
  </div>
  </form>



 
  </>
}>

  </Kachel>
  </>
  )
}
function App() {
const [logged,setLogged] = React.useState(false);

GetT().then((data)=> {
  if(sessionStorage.getItem("id") === data.data){
    setLogged(true)
  }
}
)
  return (
    <div className="App">

 <LocalizationProvider dateAdapter={AdapterDateLuxon}locale={"deLocale"}>
   <QueryClientProvider client={queryClient}>


{logged ?   <>
  <ButtonAppBar/>
  <Routes>

        <Route path="/" element={<Angebotsübersicht />}/>
          <Route path="auftraggeberverwaltung" element={<AuftraggeberVerwaltung />} />
          <Route path="angebot" element={<Angebot />} />
          <Route path="editangebot/:id" element={<Angebot />} />
          <Route path="view/:id" element={<ViewAngebot />}/>
          <Route path="offer/:id" element={<OfferView />}/>
      </Routes>
      </>

: <>
   <Routes>
     <Route exact path="/offer/:id" element={<OfferView />}/>
       <Route path="*" element={<Login/>}/>
       </Routes>
</>
}

</QueryClientProvider>
</LocalizationProvider>
    </div>
  );
}
export default App;
