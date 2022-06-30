# Portfolio

### Self help

### Detalles Generales

El sitio está desplegado en https://gottigportfolio.firebaseapp.com/


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




