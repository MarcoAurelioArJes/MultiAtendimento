import Navbar from './navBar/navBar'

export default function Layout({ children }) {
    return (
        <>
            <header>
                <Navbar />
            </header>
            <main>
                {children}
            </main>
        </>
    );
}