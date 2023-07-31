import NavbarRes from './navbarRes'
import Footer from './footer'

export default function Layout(children) {
  return (
    <>
      <NavbarRes />
      <main>{children}</main>
      <Footer />
    </>
  )
}
