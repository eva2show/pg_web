import PGElement from './pg.svelte';
import pg_connect from './pg_connect.svelte';


console.log("pg_connect-----------",pg_connect.element);
customElements.define('pg-element', PGElement.element);
customElements.define('pg-connect', pg_connect.element);

