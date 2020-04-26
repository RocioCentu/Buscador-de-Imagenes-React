import React ,{useState,useEffect} from 'react';
import Formulario from './components/Formulario';
import ListaImagenes from './components/ListaImagenes';


function App() {
  const [ busqueda, guardarBusqueda ] = useState('');
  const [ imagenes, guardarImagenes ] = useState([]);
  const [ paginaActual, guardarPaginaActual ] = useState(1);
  const [ totalPaginas, guardartotalPaginas ] = useState(1);

  useEffect(() => {
  
    const consultarApi=async () => {
        if(busqueda==='')return;
        const imagenesPorPagina=30;
        const key='16232940-b134f57a3d8428d83868a8c48';
          const url= `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}&page=${paginaActual}`;

          const respuesta = await fetch(url);
        const resultado = await respuesta.json();
          guardarImagenes(resultado.hits);
       

          //paginacion total
          const paginasTotales=Math.ceil(resultado.totalHits/imagenesPorPagina);
          guardartotalPaginas(paginasTotales);
           //mover la pantalla hacia arriba
           const jumbotron= document.querySelector(".jumbotron");
           jumbotron.scrollIntoView({behavior:'smooth'});
       }

       consultarApi();
  }, [busqueda,paginaActual])

  const paginaAnterior=()=>{
  const nuevaPaginaActual=paginaActual - 1 ;

   if(nuevaPaginaActual=== 0)return;

   guardarPaginaActual(nuevaPaginaActual);
  }

  const siguientePagina=()=>{

    const nuevaPaginaActual=paginaActual + 1 ;

    if(nuevaPaginaActual > totalPaginas)return;

    guardarPaginaActual(nuevaPaginaActual);
    }

  return (
    <div className="container">
      <div className="jumbotron">
      <p className="lead text-center">Buscador de Imagenes</p>
      <Formulario
      guardarBusqueda={guardarBusqueda}
      />
      
      </div>

      <div className="row justify-content-center">
      <ListaImagenes
      imagenes={imagenes}
      />

      {(paginaActual === 1) ? null:(
      <button onClick={paginaAnterior}
      type="button" 
      className="btn btn-info mr-1">&laquo; Anterior </button>)}
      
      {(paginaActual === totalPaginas) ? null:
      <button
      onClick={siguientePagina}
      type="button" 
      className="btn btn-info mr-1">Siguiente &raquo;</button>}
      </div>
    </div>
  );
}

export default App;
