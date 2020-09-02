import { Head, useRouter } from "blitz"
import { Link } from "app/components/Link"

const Header = () => {
  const router = useRouter()
  return (
    <div className="m-2 flex justify-end">
      {router.pathname !== "/" && (
        <Link href="/" className="mr-2">
          Home
        </Link>
      )}
      {router.pathname !== "/resources" && <Link href="/resources">Resources</Link>}
    </div>
  )
}

const Footer = () => {
  return (
    <footer className="text-xs text-center mt-16 mb-2">
      <Link href="https://github.com/cherta/remoteuy" target="_blank">
        GitHub
      </Link>{" "}
      |{" "}
      <Link href="https://github.com/cherta/remoteuy/graphs/contributors" target="_blank">
        Autores: Gabriel Chertok &amp; una larga lista de personas
      </Link>{" "}
      |{" "}
      <Link href="http://owu.herokuapp.com/" target="_blank">
        Open Web Uruguay
      </Link>
    </footer>
  )
}

const Layout = ({
  title,
  description = "Remote.uy es un listado de empresas uruguayas que promueven el trabajo remoto o distribuído. Si querés agregar una empresa podés ayudarnos mandando un PR a nuestro repositorio de GitHub",
  children,
}) => (
  <>
    <Head>
      <title>{title}</title>
      <link rel="icon" href="/favicon.ico" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://remote.uy" />
      <meta
        property="og:image"
        content="https://remote.uy/images/arseniy-kapran-hkjUkfqaVpU-unsplash.jpg"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap"
        rel="stylesheet"
      />
    </Head>
    <div className="max-w-6xl xl:mt-48 lg:mt-4 mx-auto">
      <Header />
      {children}
      <Footer />
    </div>
  </>
)

export default Layout
