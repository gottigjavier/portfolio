# Portfolio


## Detalles generales

El sitio está desplegado en https://gottigportfolio.firebaseapp.com/


## FrontEnd

#### Edición

En muchos casos, las ediciones modifican el orden de la lista de objetos renderizados así que en la mayoría de las ediciones, se programó para que el backend devuelva la lista de objetos aunque eso no sea buena práctica.
En el ámbito del localhost esto funciona bien. 
Al desplegar a app se encontró que la respuesta de los servidores era demasiado lenta ya que se utilizan en su versión gratuita, por lo que se implementó el patrón de diseño Optimistic UI. Si bien ahora la devolución de la lista de objetos mencionada se vuelve redundante, se decidió conservarla por el momento.

#### DataService

Una capa de servicio se diseñó en forma similar a la del backend, es decir, se creó una clase DataService genérica y cada componente le pasa los ednpoints y tipos de datos esperados: Estos tipos de dato se modelaron a través de interfaces en la capa model.
Para mejor claridad se creó otra clase genérica para manejar la autenticacón de login.

Dado que entre los componentes MyProject y Technology existe una estrecha relación, también se utiliza un service de binding para comunicar las modificaciones en uno u otro.
En consecuencia de que ya se tiene en uso esta capa de servicio, se optó por no diseñar los componentes popup como hijos de los componentes a editar sino en módulos separados e hijos de PopupsModule. Esto permite prescindir de @Input y @Output y en su lugar se utilizan servicion que implementan "EventEmitter".

#### Modal Form y Bindin Service

Para el caso de editar componentes es importante que en los campos del formulario de la ventana emergente se reflejen los datos actuales de dicho componente. Para eso se apela a los servicios "binding-services" y así tanto el componente y la ventana comparten los datos.
 Además se creó una capa ModeBinding para alternar entre el modo edición y visualización para un usuario logueado.


#### Iconos

Por el momento los íconos para edición se cargan desde [Getbootstrap](https://icons.getbootstrap.com/)
También se bajaron los .svg en una carpeta para ser invocados o para ser guardados en un repositorio en línea y ser cargados desde allí como se hace con los logos de tecnologías.

#### Tech. Tamaño de imágenes

(No implementado por el momento)
La idea es que el tamaño de la imagen o logo de las tecnologías que se manejan represente el nivel de habilidad respecto de cada una. Para ello, el tamaño pasado al html depende del atributo "techLevel". Dado que la vista es responsiva, las imágenes tienen que adaptarse al tamaño de la pantalla. Lo hacen, pero por el momento, el dato del tamaño de la pantalla se fija cuando el navegador hace la carga del sitio. Entonces, si se realiza una prueba desde la sección para desarrollador del navegador y se va "jugando" con el tamaño de la pantalla, los logos de las tecnologías mantendrán su tamaño a menos que se realice una recarga del sitio para que tome la nueva dimensión de la pantalla.




## Backend


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

Para este pryecto, la mejor forma de establecer la persistencia
es a través la reducción al mínimo del uso de tablas no relacionadas 
(one to one, one to many, etc) y así lograr consultas más rápidas a la base de
datos.


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

**La buena práctica indica que {petición} es redundante ya que es le verbo quien
llama al método que corresponde (GET, POST, etc), pero se dejó para seguir las
formas dictadas en los videos de la teoría.** 

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


### Despliegue

Para el despliegue se utiliza el sitio Heroku. La ulr de la app es:

https://portfoliogottig.herokuapp.com

que en los ejemplos reemplaza a http://localhost:8080


La base de datos está alojada en Clever-cloud. El archivo application-prod-properties
contiene las credenciales de conexión. Para el caso del despliegue de la app hay
que tener en cuenta que este archivo está incuído en el .gitignore así que es probable
que Heroku no encuentre las credenciales. Se lo puede borrar de .gitignore o se pueden
copiar las credenciales temporalmente en application-dev-properties.
