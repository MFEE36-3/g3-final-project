import Footer from './footer';

export default function LayoutMainPage(children) {
  return (
    <>
      <main>{children}</main>
      <Footer />
    </>
  )
}
