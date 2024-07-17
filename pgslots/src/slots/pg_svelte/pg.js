// import PGWeb from './pg_connect.svelte';
// import 

export default {

    name:"pg_app",
    type:"context",
    install(ctx){


        // customElements.define('pg-connect', PGWeb.element);

        
        // ctx.pg = new PGWeb({
        //     target:document.body,
        //     // props:
        // })
        console.log("ctx-install---pg_app")
    },
    uninstall(){

    }
    
}

