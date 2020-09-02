import commonPartial from './partials.js'
import { create, get, update, close, getAll } from '../models/movies.js'
import { setHeader } from './auth.js';

//create
export function getCreate(ctx) {
    setHeader(ctx);
    ctx.loadPartials(commonPartial).partial('./view/movies/create.hbs')  
}

export function postCreate(ctx) {
    const { title, description, imageUrl } = ctx.params
    const creator = sessionStorage.getItem('user');

    if (title.length === 0 && description.length === 0 && imageUrl.length === 0 ) {
        alert('All fields should be filled with the asked information')
        throw new Error('All fields should be filled with the asked information')
    }

    create({ title, description, imageUrl , creator, peopleLiked: 0} )
    .then(res => {
        console.log(res)
        ctx.redirect('#/home')
    }).catch(e => console.log(e))
}

//details
export function getDetails(ctx) {
    setHeader(ctx);
    const id = ctx.params.id;
    get(id)
    .then(res => {
        const movie = {...res.data(), id: res.id }; 
        console.log(movie);
        ctx.isCreator = movie.creator === sessionStorage.getItem('user');
        ctx.movie = movie;

        ctx.loadPartials(commonPartial).partial('./view/movies/details.hbs')  
    }).catch(e => console.log(e))
}

//getEdit
export function getEdit(ctx) { 
    setHeader(ctx)  
    const id = ctx.params.id;
    get(id)
    .then(res => {
        const movie = {...res.data(), id: res.id }; 
        ctx.movie = movie;
        ctx.loadPartials(commonPartial).partial('./view/movies/edit.hbs');
    }).catch(e => console.log(e))
}

//postEdit
export function postEdit(ctx) {
    const { title, description, imageUrl } = ctx.params
    const id = ctx.params.id;
    const creator = sessionStorage.getItem('user');
    update(id, { title, description, imageUrl })
    .then(res => {
        console.log(res)
        ctx.redirect(`#/details/${id}`)
    }).catch(e => console.log(e))
}

//getDelete 
export function getDelete(ctx){
    const id = ctx.params.id;
    close(id)
    .then(res => {
        console.log(res);
        ctx.redirect('#/home')
    }).catch(e => console.log(e))
}

//getLikes
export function getLike(ctx) {
    const id = ctx.params.id;
    get(id)
    .then(res => {
        const movie = res.data(); 
        movie.peopleLiked++; 

        update(id, { peopleLiked: movie.peopleLiked })
           .then(res => {
               console.log(res); 
               ctx.redirect(`#/details/${id}`)
           }).catch(e => console.log(e))
    }).catch(e => console.log(e))
}

