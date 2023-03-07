import axios from 'axios'
export default {
    getData: (pathParam) =>{
    const serviceUrl = 'http://172.18.18.57:8082/skill-tracker/api/v1/admin/'+pathParam;
    axios({
        'method':'GET',
        'url':serviceUrl,
        'headers': {
            'content-type':'application/json'            
        }
    })
}
}