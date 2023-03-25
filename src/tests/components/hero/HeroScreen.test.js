import { mount } from 'enzyme'
import { MemoryRouter, Routes,Route } from 'react-router-dom'
import { HeroScreen } from '../../../components/hero/HeroScreen'

const mockNavigate = jest.fn();

jest.mock( 'react-router-dom' , () => ({
     ...jest.requireActual('react-router-dom'),
     useNavigate: () => mockNavigate
}))


describe('Pruebas en <HeroScreen />', () => {

     test('no debe mostrar el <HeroScreen /> si no hay un heroe en el url', () => {

          const wrapper = mount(
               <MemoryRouter initialEntries={ [ '/hero' ] }>
                    <Routes>
                         <Route path='/hero' element={ <HeroScreen /> } />
                         <Route path='/' element={ <h1>No Hero Page Found</h1> } />
                    </Routes>
               </MemoryRouter>
          )

          expect( wrapper.find( 'h1' ).text().trim() ).toBe( 'No Hero Page Found' );
     })


     test('debe mostrar un heroe si el parametro existe y se encuentra', () => {

          const wrapper = mount(
               <MemoryRouter initialEntries={ [ '/hero/marvel-spider' ] }>
                    <Routes>
                         <Route path='/hero/:heroId' element={ <HeroScreen /> } />
                         <Route path='/' element={ <h1>No Hero Page Found</h1> } />
                    </Routes>
               </MemoryRouter>
          )

          expect( wrapper.find( '.row' ).exists() ).toBe( true );
     })


     test('debe regresar a la pantalla anterior', () => {

          const wrapper = mount(
               <MemoryRouter initialEntries={ [ '/hero/marvel-spider' ] }>
                    <Routes>
                         <Route path='/hero/:heroId' element={ <HeroScreen /> } />
                         <Route path='/' element={ <h1>No Hero Page Found</h1> } />
                    </Routes>
               </MemoryRouter>
          )

          wrapper.find( 'button' ).prop( 'onClick' )();

          expect( mockNavigate ).toHaveBeenCalledWith( -1 );
          
     })
     

     test('debe mostrar el "No Hero Page Found" si no se encuentra el heroe ', () => {

          const wrapper = mount(
               <MemoryRouter initialEntries={ [ '/hero/marvel-spider736274946' ] }>
                    <Routes>
                         <Route path='/hero/:heroId' element={ <HeroScreen /> } />
                         <Route path='/' element={ <h1>No Hero Page Found</h1> } />
                    </Routes>
               </MemoryRouter>
          )

          expect( wrapper.text() ).toBe( 'No Hero Page Found' );
     })

     
})
