import axios from "axios";

const api = "https://angebot-server.herokuapp.com/api/"

function FetchAuftraggeber() {
    return axios.get(api+"auftraggeber")
}
function PostAuftraggeber(data){
    return axios.post(api+"auftraggeber/",data)
}
function DeleteAuftraggeber(id){
    return axios.delete((api+"auftraggeber/"+id))
}
function PostAngebot(data){
    return axios.post(api+"angebot/",data)
}
function FetchAngebote() {
    return axios.get(api+"angebot")
}
function FetchAngebot(id) {
    return axios.get(api+"angebot/"+id)
}
function DeleteAngebot(id){
    return axios.delete((api+"angebot/"+id))
}
function SendMail(data){
    return axios.post(api+"send/",data)
}
function LoginSend(data){
    return axios.post(api+"login",data)
}
function GetT() {
    return axios.get(api+"login")
}
export {FetchAuftraggeber,PostAuftraggeber,DeleteAuftraggeber,PostAngebot,FetchAngebote,DeleteAngebot,FetchAngebot,SendMail,LoginSend,GetT}

