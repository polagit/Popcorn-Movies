 



 import { movieapikey } from "./ApiKey";
 import axios from 'axios';



 const BaseUrl="https://api.themoviedb.org/3"
 const TrendingMovies=`${BaseUrl}/trending/movie/day?api_key=${movieapikey}`


 const MovieApiCall=async(endpoints,params)=>{
    const options={
        method:"Get",
        url:endpoints,
        params:params?params:{}
    }
    try{
    const response=await axios.request(options);
    return response.data
    }
    catch(error){
        console.log(error)
    }
    


 };

 export const image500=(posterpath)=>
    posterpath?"https://image.tmdb.org/t/p/w500"+posterpath:null;
export const FetchTrendingMovies=()=>{
    return MovieApiCall(TrendingMovies)
}

