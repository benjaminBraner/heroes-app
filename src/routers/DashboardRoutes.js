import { Routes, Route } from "react-router-dom";

import { DcScreen } from "../components/dc/DcScreen"
import { HeroScreen } from "../components/hero/HeroScreen";
import { MarvelScreen } from "../components/marvel/MarvelScreen"
import { SearchScreen } from "../components/search/SearchScreen"
import { Navbar } from "../components/ui/Navbar"


export const DashboardRoutes = () => {
     return (
          <>
               <Navbar />

               <Routes>
                    {/*si yo estoy en la url del path, muestra el componente que esta dentro del element */}
                    <Route path="marvel" element={<MarvelScreen />} />
                    <Route path="dc" element={<DcScreen />} />

                    <Route path="search" element={<SearchScreen />} />
                    
                    {/*ese ":heroeId" en la ruta se especifica asi porque ahi voy a recibir un argumento por el url (cabe recalcar que es un
                    argumento obligatorio, si no lo mando, no voy a poder acceder al "hero/" ) y ese ":heroId" es como
                    un parametro que lo voy a definir en el  <HeroCard /> y asi se especifica,
                    osea le estoy diciendo que no importa que siga despues del "hero/", lo que venga despues del "hero/" sera el
                    id del heroe que voy a especificar en el HeroCard al hacer click en el Link*/}
                    <Route path="hero/:heroId" element={<HeroScreen />} />

                    <Route path="/*" element={<MarvelScreen />} />
               </Routes>
          </>
     )
}
