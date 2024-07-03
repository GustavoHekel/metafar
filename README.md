## Metafar Challenge

Primero, instale las depencencias

```bash
npm install
```

Luego, para correr el proyecto en modo desarrollo

```bash
npm run dev
```

## Demo
https://metafar-three.vercel.app/

## Notas
* La aplicación usa una estragia de ISR (Incremental Site Regeneration) para obtener el listado de acciones de USA.
  * Opté por esta estrategia ya que es un volumen de información importante y delegar esa responsabilidad al cliente no era lo más performante ya que
    * La información no cambia seguido
    * La carga inicial era muy larga
    * De esta forma me aseguro que la información será obtenida desde la API al momento de deployear la app y será revalidada cada 10 minutos
* No se implementó Redux ya que consideré que para este tipo te aplicación no era necesario
  * De haberlo necesitado lo hubiera hecho con redux-tookit en conjunto con RTKQuery para obtener la información de la API

## Mejoras
Desde mi perspectiva varias cosas podrían ser mejoradas, pero por cuestiones de tiempo no llegué a hacerlas
* Validación de rango
  * Actualmente no se valida que la "fecha hasta" sea mayor a la "fecha desde"
* Unit tests
  * No todos los componentes tienen unit tests, ChartContainer quedó muy grande y debería ser atomizado para lograr una mejor testeabilidad y performance
* Componentización
  * ChartContainer debería ser más pequeño, para lograrlo podría utilizar context y redux y manejar un estado general para guardar la información de cada input y luego levantarlos dentro del componente ChartContainer
