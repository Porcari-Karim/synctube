import { Route, Routes } from "react-router"
import { Layout } from "./Layout"
import { RoomsPage } from "./rooms/RoomsPage"
import { Protected } from "./auth/Protected"
import { Room } from "./rooms/Room"

function App() {

    return (
        <Layout>
            <Routes>
                <Route index element={<RoomsPage/>} />
                <Route path="/room/:id" element={<Protected><Room/></Protected>} />
            </Routes>
        </Layout>
    )
}

export default App
