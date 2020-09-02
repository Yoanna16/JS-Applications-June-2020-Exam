import { getHome } from './controller/home.js'
import { getRegister, postRegister, getLogin, postLogin, getLogout } from './controller/user.js'
import { getCreate, postCreate, getDetails, getEdit, postEdit, getDelete, getLike} from './controller/movies.js';


//sled Sammy ne zabravqi Id- na containera v koito shte se pulnqt templatite
const app = Sammy("body", function () {
    this.use("Handlebars", "hbs");

    this.get('#/home', getHome);
   // this.get('/', getHome);
    this.get('index.html', getHome);

    this.get('#/register', getRegister );
    this.post('#/register', postRegister);

    this.get('#/login', getLogin);
    this.post('#/login', postLogin);

    this.get('#/logout', getLogout);

    this.get('#/create', getCreate);
    this.post('#/create', postCreate);

    this.get('#/details/:id', getDetails);

    this.get('#/edit/:id', getEdit);
    this.post('#/edit/:id', postEdit);

    this.get('#/delete/:id', getDelete);
    this.get('#/like/:id', getLike)

});
app.run('#/home');