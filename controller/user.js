import commonPartial from './partials.js'
import { registerUser, login, logout } from '../models/user.js'
import { saveUserInfo, setHeader } from './auth.js'
import {getAll, getByOwner} from '../models/movies.js'

//getRegister
export function getRegister(ctx){
    ctx.loadPartials(commonPartial).partial('./view/user/register.hbs')
}

//postRegister
export function postRegister(ctx) {
    setHeader(ctx);
    const { email, password, repeatPassword } = ctx.params;
    if (password !== repeatPassword) {
        alert('Passwords do not match');
        //throw new Error ('Passwords do not match')
    }
    if (password.length < 6) {
        alert('Password should be at least 6 characters long!');
        //throw new Error('Password should be at least 6 characters long!');
    }
    if (email.length === 0) {
        alert('Email field should be full')
    }
     registerUser(email, password)
     .then( res => {
         saveUserInfo(res.user.email);
         ctx.redirect('#/home')
     })
     .catch(e => console.log(e))
}

//getLogin
export function getLogin (ctx){
    ctx.loadPartials(commonPartial).partial('./view/user/login.hbs')
}

//postLogin
export function postLogin(ctx) {
    const { email, password } = ctx.params;
    console.log(ctx.params);
    if (email.length === 0 || password.length == 0) {
        alert('Both fields are required!')
    }
    setHeader(ctx)
    login(email, password)
    .then( res => {     
        saveUserInfo(res.user.email)
        ctx.redirect('#/home')
    })
    .catch(e => console.log(e))
}

//getlogOut
export function getLogout (ctx) {
    logout()
    .then(res => { 
        sessionStorage.clear()
        ctx.redirect('#/login')
    }).catch(e => console.log(e))
}

