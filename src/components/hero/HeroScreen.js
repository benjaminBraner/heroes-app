import React, { useMemo } from 'react'
import { Navigate, useParams, useNavigate } from 'react-router-dom'
import { getHeroById } from '../../helpers/getHeroById';
// import batman from '../../assets/heroes/dc-batman.jpg'


//otra forma de trabajar con imagenes
const heroImages = require.context( '../../assets/heroes', true ) //el true es para que busque tambien en subdirectorios





export const HeroScreen = () => {

     /*es un hook para recibir los parametros mandados por el url, aqui por ejm quiero recibir lo que defini en el
     ":heroId" en el <DashboadRoutes /> */
     const { heroId } = useParams();


     //volvera a memorizar el nuevo valor solo si heroId cambia, de lo contrario no se volvera a llamar el getHeroById
     const hero = useMemo( () => getHeroById(heroId), [ heroId ] );

     const navigate = useNavigate();

     const handleReturn = () => {     
          navigate( -1 );   //regresa a la pantalla asnterior
     }

     /* hago una validacion porque que pasa si en la url el heroId es un heroe que no existe, y como arriba estoy buscando
     el id de un heroe que no existe, al no existir me saldria un error, y esta validacion es para que cuando el url haya mandado
     un heroe que no existe, redireccione a otra pagina, y podria hacer esto:
     
     if( !hero ) {
          Navigate("/");
          return;
     }

     pero esto funcionaria pero no esta bien porque esto es un functional component y al no retornar nada, es como una simple
     funcion, pero por eso react-router-dom creo un componente que se encarga de hacer la redireccion: */
     if (!hero) {
          return <Navigate to="/" />;
     }

     const {
          id,
          superhero,
          publisher,
          alter_ego,
          first_appearance,
          characters
     } = hero;

     // const imagePath = `/assets/heroes/${ id }.jpg`;

     return (
          <div className="row mt-5 animate__animated animate__fadeInLeft">
               <div className="col-4">
                    <img
                         // src={ imagePath }     // desde public/assets
                         // src={ batman }     // desde un import
                         src={ heroImages( `./${ id }.jpg` ).default }   
                         alt={ superhero }
                         className="img-thumbnail"
                    />
               </div>

               <div className="col-8">
                    <h3>{ superhero }</h3>
                    <ul className="list-group list-group-flush">
                         <li className="list-group-item"> <b>Alter ego:</b> { alter_ego }</li>
                         <li className="list-group-item"> <b>publisher:</b> { publisher }</li>
                         <li className="list-group-item"> <b>First Appearance:</b> { first_appearance }</li>
                    </ul>

                    <h5 className="mt-3">Characters</h5>
                    <p>{ characters }</p>

                    <button
                         className="btn btn-outline-info"
                         onClick={ handleReturn }
                    >
                         Return
                    </button>

               </div>

          </div>
     )
}
