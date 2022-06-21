# Portfolio

### Self help

#### DataService

Una capa de servicio se diseñó en forma similar a la del backend, es decir, se creó una clase DataService genérica y cada componente le pasa los ednpoints y tipos de datos esperados: Estos tipos de dato se modelaron a través de interfaces en la capa model.
Para mejor claridad se creó otra clase genérica para manejar la autenticacón de login.

Dado que entre los componentes MyProject y Technology existe una estrecha relación, también se utiliza un service de binding para comunicar las modificaciones en uno u otro.
En consecuencia de que ya se tiene en uso esta capa de servicio, se optó por no diseñar los componentes popup como hijos de los componentes a editar sino en módulos separados e hijos de PopupsModule. Esto permite prescindir de @Input y @Output y en su lugar se utilizan servicion que implementan "EventEmitter".

#### Modal Form y Bindin Service

Para el caso de editar componentes es importante que en los campos del formulario de la ventana emergente se reflejen los datos actuales de dicho componente. Para eso se apela al servicio (genérico) "PopupBinding" y así tanto el componente y la ventana comparten los datos.
 Además se creó una capa ModeBinding para alternar entre el modo edición y visualización para un usuario logueado.


#### Iconos

Por el momento los íconos para edición se cargan desde [Getbootstrap](https://icons.getbootstrap.com/)
También se bajaron los .svg en una carpeta para ser invocados o para ser guardados en un repositorio en línea y ser cargados desde allí como se hace con los logos de tecnologías.

#### Tech. Tamaño de imágenes

(No implementado por el momento)
La idea es que el tamaño de la imagen o logo de las tecnologías que se manejan represente el nivel de habilidad respecto de cada una. Para ello, el tamaño pasado al html depende del atributo "techLevel". Dado que la vista es responsiva, las imágenes tienen que adaptarse al tamaño de la pantalla. Lo hacen, pero por el momento, el dato del tamaño de la pantalla se fija cuando el navegador hace la carga del sitio. Entonces, si se realiza una prueba desde la sección para desarrollador del navegador y se va "jugando" con el tamaño de la pantalla, los logos de las tecnologías mantendrán su tamaño a menos que se realice una recarga del sitio para que tome la nueva dimensión de la pantalla.




This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.1.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

