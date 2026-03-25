import axios from "axios";
export const apiInstance = axios.create({
    baseURL:`${process.env.BASE_URL}${process.env.SPACE_ID}/environments/master/entries`,
     timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    }    ,
    params: {
    access_token: process.env.ACCESS_TOKEN,
  },
})
