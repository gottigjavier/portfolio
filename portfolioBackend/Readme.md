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
    parseBodyMethods="POST,PUT,PATCH,DELETE"
/>


### Mysql Uso de XAMPP, o no

En el caso de levantar el servidor mysql desde el terminal a través de

$ systemctl start mysql.service

por alguna razón que aún no decifro, al querer conectarse jpa, no logra hacerlo sino hasta
que abrir Workbrench y activar la conexión o manejarla a través de XAMPP.

Al manejar la base de datos a tarvés de Xampp se levanta el servidor apache completo. 
En este caso hay que crear el usuario y contraseña que se usa en la configuración de jpa 
en phpMyAdmin y además hay que otorgarle los privilegios para esa base de datos específica
(phpMyAdmin pestaña "Privilegios").


### Persistencia

El proyecto consiste en un sitio que tendrá los datos de un solo usuario, el cual
es el único con acceso y permisos para modificarlo.
Teniendo esto en cuenta se deduce que la mejor forma de establecer la persistencia
es a través la reducción al mínimo del uso de tablas no relacionadas 
(one to one, one to many, etc)
y así lograr consultas más rápidas a la base de datos ya que solo se devolverá 
el recurso solicitado, sobre todo en modificaciones.
El único momento en que se cargarán más de uno o todos los recursos será en la
carga inicial. Para ello se apelará al uso de DTO.

#### Paquete service

Todas las clases del paquete "service" imlementan lo métodos a partir de una
única intefaz "CRUDServiceInterface". Notar que al implemetarla se le debe
pasar el modelo entre <>.
