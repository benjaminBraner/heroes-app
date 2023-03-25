import { mount } from "enzyme"
import { MemoryRouter } from "react-router-dom"
import { AuthContext } from "../../auth/authContext"
import { DashboardRoutes } from "../../routers/DashboardRoutes"

describe('Pruebas en <DashboardRoutes />', () => {

     const contextValue = {
          user: {
               logged: true,
               name: 'Benjamin'
          }
     }

     test('debe mostrarse correctamente - <MarvelScreen />', () => {

          const wrapper = mount( 
               <AuthContext.Provider value={ contextValue }>

                    {/* el MemoryRouter me va a permitir poder hacer evaluaciones y pruebas como si 
                    estuviera en el navegador web, porque en mi componente de <DashboardRoutes/>
                    utilizo metodos como el useNavigate que solo pueden ser usados en el contexto
                    de un router component, y aqui solo estoy ejecutando el DashboardRoutes y todo lo que 
                    tenga dentro por eso no lo lee como un router component porque el contexto para
                    que sea un router component fue establecido mas arriba, y aqui estoy ejecutando
                    el DashboardRoutes independiente*/}
                    <MemoryRouter initialEntries={ ['/'] }>
                         <DashboardRoutes /> 
                    </MemoryRouter>

               </AuthContext.Provider>
          );

          expect( wrapper ).toMatchSnapshot();
          expect( wrapper.find( '.text-info' ).text().trim() ).toBe( 'Benjamin' );
          expect( wrapper.find( 'h1' ).text().trim() ).toBe( 'Marvel Screen' );
     })
     
     
     test('debe mostrarse correctamente - <DcScreen/>', () => {

          const wrapper = mount( 
               <AuthContext.Provider value={ contextValue }>

                    <MemoryRouter initialEntries={ ['/dc'] }>
                         <DashboardRoutes /> 
                    </MemoryRouter>

               </AuthContext.Provider>
          );

          expect( wrapper ).toMatchSnapshot();
          expect( wrapper.find( '.text-info' ).text().trim() ).toBe( 'Benjamin' );
          expect( wrapper.find( 'h1' ).text().trim() ).toBe( 'DC Screen' );
     })
     
     
})
