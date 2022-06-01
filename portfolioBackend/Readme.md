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
(one to one, one to many, etc) y así lograr consultas más rápidas a la base de
datos ya que solo se devolverá el recurso solicitado, sobre todo en modificaciones.


#### User y About

Podría usarse la estrategia de utilizar una sola tabla para user, y separar a través
de DTOs la parte necesaria para manejo de usuario (MyUserDTO) y la parte de info (AboutDTO).
Se optó por usar dos tablas para simplificar la lógica a la hora de modificar
campos. Como se usa update con PUT, si faltara un atributo se sobreescribiría
el campo con null, y entonces habría que hacer la validación de todos los campos.


#### Paquete service

Todas las clases del paquete "service" imlementan lo métodos a partir de una
única intefaz "CRUDServiceInterface". Notar que al implemetarla se le debe
pasar el modelo entre <>.


#### DTO, Mapper struct y ModelMapper

Para el mapeo de los DTOs se comenzó usando las dependencias (pom.xml) "mapstruct" y
"mapstruct-processor". Luego se agrega @Mapper(componentModel = "spring")
en cada interface.
Estas dependencias generan los archivos con las clases de implementación de la interface
automáticamente en un paquete que crean llamado "Generated Sources(annotations)".
También se agrega una annotation "@Generated" automáticamente en dicha implementación.
Como en cada build o run se generan nuevamente, es imposible (al no encontré cómo)
modificar los archivos para mejorar el código.
Una de la opciones es copiar los archivos en un paquete generado por uno mismo, pero se
debe agregar la annotation @Primary para que no se cree una doble referencia y 
la implementación apunte a esa sola clase.

Entonces se optó por utilizar "modelmapper".
La desventaja es que no se generan los archivos automáticamente y hay que hacerlos
a mano. La ventaja es que se tiene control de las clases para modificarlas. Por ejemplo,
"mapstruct" mapea cada atributo del DTO, por lo tanto se generan tantas líneas
de código como atributos tenga. Con "modelmapper" esto se hace en dos líneas, siempre.
Hay que hacer la importación a través de @Autowired, y para que esté disponible
hay que agregar dentro de la clase que tiene el main:

``` 
@Bean
    public ModelMapper modelMapper(){
        return new ModelMapper(); 
    }    
``` 

### End Points

Los endpoints tienen la forma:

```
http://localhost:8080/{endpoint-recurso}/{petición}
```

**Recurso --> endpoint**
- User --> user
- About --> about
- Education --> education
- Job Experience --> job-experience
- Project --> my-project
- Skill --> skill
- Spoken Languages --> spoken-language
- Technology --> techology

**Peticiones:**

GET

Listar todos: ***list***
```
Ejemplo: http://localhost:8080/user/list
```
Traer uno: ***1*** (el id del recurso)
```
Ejemplo: http://localhost:8080/user/1
```
\----------------------------------------


POST

Crear un recurso: ***create*** (el id del recurso se genera automáticamente en la tabla de la DB)
```
Ejemplo: http://localhost:8080/user/create
```
\----------------------------------------
 

PUT

Editar recurso: ***update*** (el id del recurso debe estar incluída en el body (JSON) de la petición)
```
Ejemplo: http://localhost:8080/user/update
```
\----------------------------------------


DELETE

Borrar recurso: ***delete/1*** (el id del recurso)
```
Ejemplo: http://localhost:8080/user/delete/1
```
\----------------------------------------


### JWT Security

##### Importante

La clase "CreateRoles" del paquete "jwtutil" sólo se utiliza para generar la tabla 
de roles con dos registros: "ROLE_USER" y "ROLE_ADMIN".

Después de esto hay que comentar su código o borrarla para que no siga creando campos 
de roles repetidos y lance error.

Tener en cuenta que sólo puede crear nuevos usuarios un administrador (ver AuthController: newUser())
que obviamente tiene que estar logueado y adjuntar el token.

Para crear usuarios, el json debe tener la forma:

```
{
    "userName": "username",
    "email": "username@gmail.com",
    "password": "password"
}
```

Para crear un administrador, el json debe tener la forma:

```
{
    "userName": "username",
    "email": "username@gmail.com",
    "password": "password",
    "roles": ["admin"]
}
```

El administrador tiene ambos roles: "ROLE_USER" y "ROLE_ADMIN".

Todas las rutas terminadas en "/list" están exentas de autenticación ya que muestran
el contenido público del sitio (ver: "MainSecurity" del paquete "jwtconfig").

Si bien la norma es usar @Data de lombok, algunas clases necesitan que su
constructor esté presente explícitamente para funcionar correctamente.