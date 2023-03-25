import { mount } from 'enzyme'
import { MemoryRouter } from 'react-router-dom'
import { AuthContext } from '../../../auth/authContext'
import { LoginScreen } from '../../../components/login/LoginScreen'
import { types } from '../../../types/types'

const mockNavigate = jest.fn();

jest.mock( 'react-router-dom' , () => ({
     ...jest.requireActual('react-router-dom'),
     useNavigate: () => mockNavigate
}))

describe('Pruebas en el LoginComponent', () => {

     

     const contextValue = {
          user: {
               logged: false
          },
          dispatch: jest.fn()
     }
     
     const wrapper = mount(
          <AuthContext.Provider value={ contextValue }>
               <MemoryRouter initialEntries={ ['/login'] }>
                    <LoginScreen />
               </MemoryRouter>
          </AuthContext.Provider>
     )

     test('debe mostrarse correctamente', () => {
          expect( wrapper ).toMatchSnapshot()
          
     })
     

     test('debe realizar el dispatch y la navegacion', () => {
          
          wrapper.find( 'input' ).simulate( 'change' , {
               target: {
                    name: 'inputName',
                    value: 'Pedro Parques'
               }
          } )

          const handleClick = () => wrapper.find( 'button' ).simulate( 'click' );
          handleClick();

          expect( contextValue.dispatch ).toHaveBeenCalledWith({
               type: types.login,
               payload: {
                    name: 'Pedro Parques'
               }
          });

          expect( mockNavigate ).toHaveBeenCalledWith( '/marvel' , { replace: true } );

          localStorage.setItem( 'lastPath' , '/dc' );

          handleClick();

          expect( mockNavigate ).toHaveBeenCalledWith( '/dc' , { replace: true } )
     })
     
     
})
