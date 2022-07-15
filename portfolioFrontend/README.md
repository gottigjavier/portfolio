# Portfolio

### Self help

### Detalles Generales

El sitio está desplegado en https://gottigportfolio.firebaseapp.com/

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

