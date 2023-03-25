import { mount } from 'enzyme'
import { MemoryRouter } from 'react-router-dom'
import { AuthContext } from '../../auth/authContext'
import { PrivateRoute } from '../../routers/PrivateRoute'


/*en este caso estoy haciendo un mock del componente Navigate, no del useNavigate() */
jest.mock('react-router-dom' , () =>({
     ...jest.requireActual('react-router-dom'),
     Navigate: () => <span>Redireccionado</span>
}))

describe('Pruebas en <PrivateRoute />', () => {

     /*hago un mock del localStorage.setItem para asegurarme si fue llamado y con que valores */
     Storage.prototype.setItem = jest.fn();

     test('debe mostrar el componente si esta autenticado y guardar en el localStorage', () => {
          
          const contextValue = {
               user: {
                    logged: true,
                    name: 'Pedro Benito'
               }
          }

          const wrapper = mount(
               <AuthContext.Provider value={ contextValue }>
                    <MemoryRouter initialEntries={ ['/'] }>
                         <PrivateRoute>
                              <h1>Private Component</h1>
                         </PrivateRoute>
                    </MemoryRouter>
               </AuthContext.Provider>
          )
          expect( wrapper.text().trim() ).toBe( 'Private Component' );
          expect( localStorage.setItem ).toHaveBeenCalledWith( 'lastPath' , '/' );

     })


     test('debe bloquear el componente si no esta autenticado', () => {
          
          const contextValue = {
               user: {
                    logged: false
               }
          }

          const wrapper = mount(
               <AuthContext.Provider value={ contextValue }>
                    <MemoryRouter initialEntries={ ['/'] }>
                         <PrivateRoute>
                              <h1>Private Component</h1>
                         </PrivateRoute>
                    </MemoryRouter>
               </AuthContext.Provider>
          )
          
          expect( wrapper.text().trim() ).toBe( 'Redireccionado' );

     })

})