import { authReducer } from "../../auth/authReducer"
import { types } from "../../types/types"

describe('Pruebas en el AuthReducer', () => {

     test('debe retornar un estado por defecto', () => {
          
          const state = authReducer( { logged: false }, {} );

          expect( state ).toEqual( { logged: false } );
     });


     test('debe autenticar y colocar el "name" del usuario', () => {
          
          const action = {
               type: types.login,
               payload: {
                    name: 'Benjamin'
               }
          }

          const state = authReducer( { logged: false } , action );

          expect( state ).toEqual({
               logged: true,
               name: 'Benjamin'
          });
     })


     test('debe borrar el "name" del usuario y el logged en false    ', () => {

          const action = {
               type: types.logout
          }

          const state = authReducer( { logged: true, name: 'Benjamin' } , action );

          expect( state ).toEqual({
               logged: false
          })
          
     })
     
     
     
})
