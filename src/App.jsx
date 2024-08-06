import { Routes, Route } from 'react-router'
import AppHeader from './cmps/app-header'
import HomePage from './pages/home-page'

export default function App() {

    return (
        <>
            <section className="app main-layout">
                <AppHeader />
                <main className="main-container full">
                    <Routes>
                        <Route path='/' element={<HomePage />} />
                    </Routes>
                </main>
            </section>
        </>
    )
}