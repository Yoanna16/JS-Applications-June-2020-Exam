import commonPartial from './partials.js'
import { setHeader } from './auth.js'
import { getAll } from '../models/movies.js'

export function getHome (ctx){
   setHeader(ctx);
   getAll()
    .then(res => {
        console.log(res);
        const movies = res.docs.map(x => x = { ...x.data(), id: x.id}); 
        ctx.movies = movies;
        ctx.loadPartials(commonPartial).partial('./view/home.hbs')
    })
    //ctx.loadPartials(commonPartial).partial('./view/home.hbs')
    
}