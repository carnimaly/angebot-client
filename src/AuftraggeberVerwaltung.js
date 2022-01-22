import React from 'react'
import {  Button } from '@mui/material';
import { useQuery,useQueryClient,useMutation } from 'react-query';
import { FetchAuftraggeber, DeleteAuftraggeber } from './api/api';
import { DataGrid } from '@mui/x-data-grid';



const AuftraggeberVerwaltung = () => {
    const queryClient = useQueryClient()
     // Queries
    const AuftraggeberQuery = useQuery('Auftraggeber', FetchAuftraggeber)
    const AuftraggeberDel = useMutation(DeleteAuftraggeber, {
        onSuccess: () => {
          // Invalidate and refetch
          queryClient.invalidateQueries('Auftraggeber')
        },
      })

const cols = [{field : "auftraggeberEmail", headerName : "Email", width: "200"},{field : "auftraggeberAnsprechpartner",headerName: "Name"},{field: "auftraggeberFirma",headerName:"Firma",width: "150"},
            {field : "_id", headerName : "Löschen", width: "200",renderCell: (params) => { return(<Button variant="contained" onClick={() => AuftraggeberDel.mutate(params.id)}>Lösche Kunde</Button>)}}]
return(
    <div style={{ height: 400, width: '100%' }}>
    <div style={{ display: 'flex', height: '100%' }}>
      <div style={{ flexGrow: 1 }}>


{!AuftraggeberQuery.isLoading ? 
           <DataGrid sx={{width : "700px",margin: "auto"}} getRowId={(row) => row._id} rows={AuftraggeberQuery.data.data} columns={cols}/>           
    : ""}
</div>
</div>
</div>
)
}

export default AuftraggeberVerwaltung
