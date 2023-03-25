import { mount } from 'enzyme'
import { MemoryRouter } from 'react-router-dom'
import { AuthContext } from '../../../auth/authContext'
import { Navbar } from '../../../components/ui/Navbar'
import { types } from '../../../types/types';


const mockNavigate = jest.fn();

jest.mock( 'react-router-dom' , () => ({
     ...jest.requireActual( 'react-router-dom' ),
     useNavigate: () => mockNavigate
}) )



describe('Pruebas en el <Navbar />', () => {

     const contextValue = {
          user: {
               logged: true,
               name: 'Pedro'
          },
          dispatch: jest.fn()
     }
     
     const wrapper = mount(
          <AuthContext.Provider value={ contextValue }>
               <MemoryRouter initialEntries={ ['/'] }>
                    <Navbar />
               </MemoryRouter>
          </AuthContext.Provider>
     )

     test('debe mostrarse correctamente', () => {
          expect( wrapper ).toMatchSnapshot();
          expect( wrapper.find( '.text-info' ).text().trim() ).toBe( 'Pedro' );

     })


     test('debe llamar el logout, llamar el navigate y el dispatch con los argumentos', () => {

          wrapper.find( '.btn' ).simulate( 'click' );

          expect( mockNavigate ).toHaveBeenCalledWith("/login", {replace: true});

          expect( contextValue.dispatch ).toHaveBeenCalledWith({
               type: types.logout
          });

     })
     
})
