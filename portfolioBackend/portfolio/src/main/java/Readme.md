### PUT y DELETE
#### Recibir valores en el body

Por defecto, los Controllers pueden recibir datos en el body de la petición http
a través de la notación @RequestBody solo en las peticiones de tipo POST.
En los casos de peticiones tipo PUT o DELETE, por defecto se espera que el valor, 
generalmente un "id", venga en la URI de la petición y se reciba a través de 
@PathVariable o @RequestParam.
¿Cómo lograr que las peticiones PUT y DELETE puedan pasar valores a través del body?
La solución está en la configuración del servidor Tomcat.

Hay que ir al side-menu (NetBeans), pestaña "Services" (si no está activarla en 
"Window" del menú principal), "Servers": se desplegará "Apache Tomcat...",
click derecho del ratón y "Editar server.xml".

En el archivo "server.xml", buscar la línea:
<Connector 
    connectionTimeout="20000" 
    port="8080" 
    protocol="HTTP/1.1" 
    redirectPort="8443" 
/>

y agregarle parseBodyMethods="POST,PUT,DELETE" para que quede:

<Connector 
    connectionTimeout="20000" 
    port="8080" 
    protocol="HTTP/1.1" 
    redirectPort="8443" 
    parseBodyMethods="POST,PUT,DELETE"
/>