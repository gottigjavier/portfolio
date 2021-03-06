# Portfolio


## Detalles generales

El sitio está desplegado en https://gottigportfolio.firebaseapp.com/


## FrontEnd

### Organización de archivos y vistas

El proyecto (single page) tiene tres rutas:

"/"

"/login"

"/user" (protegida)

además de las ventanas emergentes de edición.

Se trató de que cada componente pertenezcan a su módulo particular para lograr
mayor modularidad y facilitar la futura exportación y reuso.

La carpeta "app" contiene las carpetas "models", "services", "shared" y "views".

- La carpeta "models" contiene lo modelos cuya contraparte son las entidades 
del backend más alguna variante pertinente.

- La carpeta "services" contiene cuatro carpetas. "auth" y "guard" corresponden a
servicios de autenticación y autorización. "binding" contiene los servicios
que tranmiten los datos entre componentes a través de EventEmitter.
"data" maneja las peticiones http al backend.

- La carpeta "shared" contiene la carpeta "header" cuyo componente contiene al
componente "navbar". La carpeta "footer" también está contenida en "shared". Estos
componentes se comparten en todas las rutas.

- La carpeta "views" contiene tres carpetas: "home", "login" y "popups". 
La carpeta "home" contiene todas los módulos correspondientes a las vistas no 
protegidas que muestran la información al usuario. La excepción es el módulo 
"user" que maneja la parte administrativa de este y está en la ruta "/user". 
La carpeta "login" maneja el formulario de login.
La carpeta "popups" contiene todos los módulos de las ventanas emergentes de edición. 
Contiene tres carpetas: "create", "delete" y "edit".
Las carpetas "create" y "delete" demuestran su función por sí solas.
La carpeta "edit" contiene dos carpetas: "one-edit" y "set-edit".
La carpeta "one-edit" contiene todos los módulos que se encargan de la edición de un
modelo en particular.
La carpeta "set-edit" contiene los módulos que se encargan de la edición de un conjunto de modelos. Se puede, por ejemplo, elegir si como mostrar un objeto o cambiar su orden de aparición.


La carpeta mock-db se creó para simular el backend cuando todavía este no estaba configurado. Ya que este es un proyecto de estudio se decidió conservarla para tener fácil acceso a ella en caso de necesitarla como ejemplo o reusarla.


#### Edición

En muchos casos, las ediciones modifican el orden de la lista de objetos renderizados así que al principio se programó para que el backend devuelva la lista de objetos aunque eso no sea buena práctica.
En el ámbito del localhost esto funcionaba bien. 
Al desplegar a app se encontró que la respuesta de los servidores era demasiado lenta ya que se utilizan en su versión gratuita, por lo que se implementó el patrón de diseño Optimistic UI. Si bien ahora la devolución de la lista de objetos mencionada se vuelve redundante, se decidió conservarla por el momento.

#### DataService

Una capa de servicio se diseñó en forma similar a la del backend, es decir, se creó una clase DataService genérica y cada componente le pasa los ednpoints y tipos de datos esperados. Estos tipos de dato se modelaron a través de interfaces en la capa model.
Usar una clase genérica puede dificultar los test unitarios.

Para mejor claridad se creó otra clase genérica para manejar la autenticacón de login.


#### Modal Form y Bindin Service

Para el caso de editar componentes es importante que en los campos del formulario de la ventana emergente se reflejen los datos actuales de dicho componente. Para eso se apela a los servicios "binding-services" y así tanto el componente mostrado y la ventana de edición comparten los datos. Además se creó una capa ModeBinding para alternar entre el modo edición y visualización para un usuario logueado.

Ya se tiene en uso esta capa de servicio, se optó por no diseñar los componentes popup como hijos de los componentes a editar sino en módulos separados e hijos de PopupsModule. Esto permite prescindir de @Input y @Output y en su lugar se utilizan servicios que implementan "EventEmitter".

#### Iconos

Los íconos para edición se cargan desde [Getbootstrap](https://icons.getbootstrap.com/)

El banner y algunos íconos de escaso tamaño se conservaron en la carpeta "assets".

Gran parte de los íconos e imágenes se las guardó en [Imgur](https://imgur.com) y se las trae desde allí.

#### Tech. Tamaño de imágenes

(No implementado por el momento)

Al principio se consideró usar el tamaño mostrado de la imagen o logo de las tecnologías que se manejan para representar el nivel de habilidad respecto de cada una. Para ello, el tamaño pasado al html depende del atributo "techLevel". Dado que la vista es responsiva, las imágenes tienen que adaptarse al tamaño de la pantalla. Lo hacen, pero por el momento, el dato del tamaño de la pantalla se fija cuando el navegador hace la carga del sitio. Entonces, si se realizaba una prueba desde la sección para desarrollador del navegador y se iba "jugando" con el tamaño de la pantalla, los logos de las tecnologías mantenían su tamaño a menos que se realizara una recarga del sitio para que tome la nueva dimensión de la pantalla.
Esta implementación se descartó por dos razones: no mejora la experiencia de usuario y la técnica de mostrar un nivel de desctreza en el manejo de una tecnología no es recomendable ya que es subjetiva y autoreferencial.

#### Sección admin

En la barra de navegación, junto al username del usuario logueado aparece una flecha que dirige a la página de administración del usuario.

(Esta ruta es ruta protegida)

El usuario puede tener dos niveles de privilegios que se definen por ROLE_USER Y ROLE_ADMIN.
El primero tiene privilegios para editar el portfolio y cambiar su contraseña.
El segundo, además de los privilegios del primero, puede crear nuevos usuarios decidiendo su nivel de privilegios y eliminar usuarios.



## Backend


### PUT y DELETE

#### Recibir valores en el body

Por defecto, los Controllers pueden recibir datos en el body de la petición http
a través de la notación @RequestBody solo en las peticiones de tipo POST.
En los casos de peticiones tipo PUT o DELETE, por defecto se espera que el valor, 
generalmente un "id", venga en la URI de la petición y se reciba a través de 
@PathVariable o @RequestParam.
Para lograr que las peticiones PUT y DELETE puedan pasar valores a través del body
hay que configurar el servidor Tomcat.

En side-menu (NetBeans), pestaña "Services" (si no está activarla en 
"Window" del menú principal), "Servers": se desplegará "Apache Tomcat...",
click derecho del ratón y "Editar server.xml".

En el archivo "server.xml", buscar la línea:

```
<Connector 
    connectionTimeout="20000" 
    port="8080" 
    protocol="HTTP/1.1" 
    redirectPort="8443" 
/>
``` 

y agregarle parseBodyMethods="POST,PUT,DELETE" para que quede:

``` 
<Connector 
    connectionTimeout="20000" 
    port="8080" 
    protocol="HTTP/1.1" 
    redirectPort="8443" 
    parseBodyMethods="POST,PUT,PATCH,DELETE"
/>
``` 


### Ámbito Dev. Mysql Uso de XAMPP (o no)

Usando el SO Ubuntu, en el caso de levantar el servidor mysql desde el terminal a través de

$ systemctl start mysql.service

por alguna razón que aún no decifro, al querer conectarse jpa, no logra hacerlo.
Hay que arrancar mysql desde Workbrench y activar la conexión o manejarla a través de XAMPP.

Al manejar la base de datos a tarvés de Xampp se levanta el servidor apache completo. 
En este caso hay que crear el usuario y contraseña que se usa en la configuración de jpa 
en phpMyAdmin y además, hay que otorgarle los privilegios para esa base de datos específica
(phpMyAdmin pestaña "Privilegios").


### Persistencia

Para este pryecto, la mejor forma de establecer la persistencia
es a través la reducción al mínimo del uso de tablas no relacionadas 
(one to one, one to many, etc) y así lograr consultas más rápidas a la base de datos.
Las únicas tablas relacionadas son las correspondientes a las entidades 
Technology-MyProject y las JwtUser-JwtRole


#### User y About

Podría usarse la estrategia de utilizar una sola tabla para user, y separar a través
de DTOs la parte necesaria para manejo de usuario (MyUserDTO) y la parte de info (AboutDTO).
Se optó por usar dos tablas para simplificar la lógica a la hora de modificar
campos. Como se usa update con PUT, si faltara un atributo se sobreescribiría
el campo con null, y entonces habría que hacer la validación de todos los campos.


#### Paquete service

Todas las clases del paquete "service" imlementan lo métodos a partir de una
única intefaz "CRUDServiceInterface". Notar que al implemetarla se le deben
pasar los parámetros (como el modelo) entre <>.


#### DTO, Mapper struct y ModelMapper

Para el mapeo de los DTOs se comenzó usando las dependencias (pom.xml) "mapstruct" y
"mapstruct-processor". Luego se agrega @Mapper(componentModel = "spring")
en cada interface.
Estas dependencias generan los archivos con las clases de implementación de la interface
automáticamente en un paquete que crean llamado "Generated Sources(annotations)".
También se agrega una annotation "@Generated" automáticamente en dicha implementación.
Como en cada build o run se generan y sobreescriben nuevamente, es imposible (no encontré cómo)
modificar los archivos para mejorar el código y que persistan.
Una de la opciones es copiar los archivos en un paquete generado por uno mismo, pero se
debe agregar la annotation @Primary para que no se cree una doble referencia y 
la implementación apunte a esa sola clase.

Entonces se optó por utilizar "modelmapper".
La desventaja es que no se generan los archivos automáticamente y hay que hacerlos
a mano. La ventaja es que se tiene control de las clases para modificarlas. Por ejemplo,
"mapstruct" mapea cada atributo del DTO, por lo tanto se generan tantas líneas
de código como atributos tenga. Con "modelmapper" esto se hace en dos líneas (simple).
Hay que hacer la importación a través de @Autowired, y para que esté disponible
hay que agregar dentro de la clase que tiene el main:

``` 
@Bean
    public ModelMapper modelMapper(){
        return new ModelMapper(); 
    }    
``` 

### End Points

Los endpoints en el ámbito dev tienen la forma:

```
http://localhost:8080/{endpoint-recurso}/{id}
```

El ámbito prod tienen la forma:

```
https://portfoliogottig.herokuapp.com/{endpoint-recurso}/{id}
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

Tratando de imitar las buenas prácticas, en los endpoints se prescinde de los 
sustantivos (create, delete, etc) dejando la elección del método pertinente 
al verbo de la petición.


GET

Listar todos: ***list***
```
Ejemplo: http://localhost:8080/about/list
``` 

Traer uno: ***1*** (el id del recurso)
```
Ejemplo: http://localhost:8080/about/1
```

\----------------------------------------


POST

Crear un recurso: ***create*** (el id del recurso se genera automáticamente en la tabla de la DB)
```
Ejemplo: http://localhost:8080/about
```

\----------------------------------------
 

PUT

Editar recurso: ***update*** (el id del recurso debe estar incluída en el body (JSON) de la petición)
```
Ejemplo: http://localhost:8080/about
```

\----------------------------------------


DELETE

Borrar recurso: ***delete*** (el id del recurso)
```
Ejemplo: http://localhost:8080/about/1
```

\----------------------------------------


### JWT Security

##### Importante

La clase "CreateRoles" del paquete "jwtutil" sólo se utiliza para generar la tabla 
de roles con dos registros: "ROLE_USER" y "ROLE_ADMIN".

Después de esto hay que comentar su código o borrarla para que no siga creando campos 
de roles repetidos y lance error.

Tener en cuenta que sólo puede crear nuevos usuarios un administrador "ROLE_ADMIN"

(ver AuthController: newUser())

que obviamente tiene que estar logueado y adjuntar el token.

Para crear usuarios sin privilegios de administrador, el json debe tener la forma:

```
{
    "userName": "username",
    "email": "username@gmail.com",
    "password": "password"
}
```

Para crear un usuario con privilegios de administrador, el json debe tener la forma:

```
{
    "userName": "username",
    "email": "username@gmail.com",
    "password": "password",
    "roles": ["admin"]
}
```

El administrador tiene ambos roles: "ROLE_USER" y "ROLE_ADMIN".

Todas las peticiones GET con endpoints terminados en "/list" están exentas de 
autenticación ya que muestran el contenido público del sitio 

(ver: "MainSecurity" del paquete "jwtconfig").

También, por razones obvias, está exenta de autenticación la petición
POST del endpoint "/auth/login"

Si bien la norma es usar @Data de lombok, algunas clases necesitan que su
constructor esté presente explícitamente para funcionar correctamente.


### Despliegue

Para el despliegue se utiliza el sitio Heroku. La ulr de la app es:

https://portfoliogottig.herokuapp.com

que en los ejemplos reemplaza a http://localhost:8080


La base de datos está alojada en Clever-cloud. 
El archivo application-prod-properties contiene las credenciales de conexión. 

Para el caso del despliegue de la app se utiliza el cli de heroku. Heroku crea un 
repositorio git y desde allí realiza el despliegue. El comando es:

~$ git push heroku master 

Hay que tener en cuenta que el archivo application-prod-properties está incuído en el .gitignore 
así que es probable que Heroku no encuentre las credenciales. 
Se lo puede excluír de .gitignore o se pueden copiar las credenciales temporalmente en 
application-dev-properties.
Otra opción es definir las variables de entorno directamente en Heroku y dejar 
application-prod-properties vacío.


### Swagger

En el hámbito dev, puede ver la definición de la API en la ruta no protegida:

http://localhost:8080/swagger-ui/index.html

En producción:

https://portfoliogottig.herokuapp.com/swagger-ui/index.html


(En el footer se agregó este último enlace)

El propósito del backend es el de funcionar como API para un frontend específico y no 
como API pública. La implementación de Swagger es meramente con fines
informativos aunque se trató de aplicar las buenas prácticas y presentarla de la
forma más completa posible.

Para realizar peticiones a endpoints protegidos debe loguearse a través del endpoint
"auth/login" y enviar el JSON con username y password.

Al recibir el token podrá copiarlo y pegarlo en la ventana "Available authorizations".
Los candados cerrados son la señal de que se tiene acceso a los endpoints protegidos.

 
