import {Outlet} from 'react-router-dom'

export default function RootLayout(){
    return (
        <>
        <h1>ROOT</h1>
        <main>
            <Outlet></Outlet>
        </main>
        </>
    )
}