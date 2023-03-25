import { types } from "../types/types";



/*es una simple funcion que recibe el state y un action que es el que va a modificar el state*/
export const authReducer = (state = {}, action) => {

     switch (action.type) {
          case types.login:

               return {
                    ...action.payload,
                    logged: true
               }
          
          case types.logout:
               
               return {
                    logged: false
               }
               
          default:
               return state;
     }


}