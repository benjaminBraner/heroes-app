import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { SearchScreen } from '../../../components/search/SearchScreen';

/*ES IMPORTANTE QUE TENGA EL NOMBRE DE 'mockNavigate' para que funcione,
declaro este mock del useNavigate afuera porque luego lo voy a probar en mi test porque si lo haria de adentro
no habria manera de sacar este mockNavigate que es lo que va a retornar el useNavigate*/
const mockNavigate = jest.fn();

/*yo podria hacer un mock de todo el react-router-dom, pero cosas que estoy usando en mis tests como el
mount() no funcionarian, y ademas solo requiero hacer un mock del useNavigate*/
jest.mock( 'react-router-dom' , () => ({

     /*con esto es como si yo no hiciera nada osea le digo que importe el paquete real del react-router-dom como si no
     pasara nada, esto me va a permitir sobreescribir el useNavigate que es el mock que quiero hacer en realidad*/
     ...jest.requireActual('react-router-dom'),
     useNavigate: () => mockNavigate
}))


describe('Pruebas en <SearchScreen />', () => {

     test('debe mostrarse correctamente con valores por defecto', () => {
          const wrapper = mount( 
               <MemoryRouter initialEntries={ [ '/search' ] }>
                    <SearchScreen /> 
               </MemoryRouter>
          );
          expect( wrapper ).toMatchSnapshot();
          expect( wrapper.find('.alert-info').text().trim() ).toBe('Buscar un heroe');
          
     })


     test('debe mostrar a Batman y el input con el valor del queryString', () => {
          const wrapper = mount( 
               <MemoryRouter initialEntries={ [ '/search?q=batman' ] }>
                    <SearchScreen /> 
               </MemoryRouter>
          );

          expect( wrapper.find( 'input' ).prop( 'value' ) ).toBe( 'batman' );
     })
     

     test('debe mostrar un error si no se encuentra el heroe', () => {
          const wrapper = mount( 
               <MemoryRouter initialEntries={ [ '/search?q=123' ] }>
                    <SearchScreen /> 
               </MemoryRouter>
          );

          expect( wrapper.find( '.alert-danger' ).text().trim() ).toBe( 'No hay resultados : 123' )
     })
     

     test('debe llamar el navigate a la nueva pantalla ', () => {
          const wrapper = mount( 
               <MemoryRouter initialEntries={ [ '/search?q=123' ] }>
                    <SearchScreen /> 
               </MemoryRouter>
          );

          //simulo que hice un cambio en el input con el valor de 'batman'
          wrapper.find( 'input' ).simulate( 'change' , {
               target: {
                    name: 'searchText',
                    value: 'batman'
               }
          })

          /*llamo el submit del formulario que dispara la funcion handleSearch y le proporciono el preventDefault 
          del evento pero esto pareceria que esta bien pero me lanzaria un error porque dentro del handleSearch
          estoy usando la funcion navigate que intenta hacer el cambio de la url pero ese cambio dispara ciertos 
          procedimientos, y el error diria ' An update to MemoryRouter inside a test was not wrapped in act(...)'
          y yo no quiero verificar que el navigate() funcione, yo quiero verificar que sea llamado, y para hacer esta
          prueba debo hacer un mock del useNavigate()*/
          wrapper.find( 'form' ).prop( 'onSubmit' )({
               preventDefault: () => {}
          })

          expect( mockNavigate ).toHaveBeenCalledWith( '?q=batman' );



     })
     
     
})
