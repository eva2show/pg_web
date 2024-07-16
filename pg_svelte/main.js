
import Loading from './pg_loading.svelte';

function main(){

    const app = new Loading({
        target: document.body,
        props: {
            // assuming App.svelte contains something like
            // `export let answer`:
            // answer: 42
        }
    }); 

}
window.onload = main;