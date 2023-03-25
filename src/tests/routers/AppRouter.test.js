import { mount } from 'enzyme';
import { AuthContext } from '../../auth/authContext';
import { AppRouter } from '../../routers/AppRouter';

describe('Pruebas en el <AppRouter />', () => {

     
     test('debe mostrar el <LoginScreen /> si el usuario no esta autenticado', () => {
          
          const contextValue = {
               user: {
                    logged: false
               }
          }

          const wrapper = mount(
               <AuthContext.Provider value={ contextValue }>
                    <AppRouter />
               </AuthContext.Provider>
          );

          expect( wrapper ).toMatchSnapshot();
          expect( wrapper.find('h1').text().trim() ).toBe( 'Login Screen' );
          
     });

     
     test('debe mostrar el <MarvelScreen /> si el usuario esta autenticado', () => {
          
          const contextValue = {
               user: {
                    logged: true,
                    name: 'Benjamin'
               }
          }

          const wrapper = mount(
               <AuthContext.Provider value={ contextValue }>
                    <AppRouter />
               </AuthContext.Provider>
          );

          expect( wrapper ).toMatchSnapshot();
          expect( wrapper.find('.navbar').exists() ).toBe( true );
     });

})