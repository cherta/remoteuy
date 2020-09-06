import { Head } from "blitz"
import { Link } from "app/components/Link"
import { useCurrentUser, CurrentUser } from "app/hooks/useCurrentUser"
import { Suspense, useCallback } from "react"
import logout from "app/auth/mutations/logout"

type UserBadgeProps = JSX.IntrinsicElements["span"] & {
  user: CurrentUser
  className?: string
}
const UserBadge = ({ user, ...rest }: UserBadgeProps) => {
  const logoutHandler = useCallback(async function (e) {
    e.preventDefault()
    await logout()
  }, [])
  return (
    <span {...rest}>
      {`Hola ${user.name ?? user.email}`},{" "}
      <Link href="#" onClick={logoutHandler}>
        no eres esta persona?
      </Link>
    </span>
  )
}

type VerificationMessageProps = {
  user?: CurrentUser
}
const VerificationMessage = ({ user }: VerificationMessageProps) => {
  if (!user || user.verified) return null
  return (
    <div className="bg-yellow-500 p-2">
      Por favor chequee su correo electrónico y verifique su cuenta
    </div>
  )
}

const Menu = ({ children }) => {
  return (
    <ul role="menu">
      {children.map((child, index) => {
        return (
          <li className="inline" key={index}>
            {child}
          </li>
        )
      })}
    </ul>
  )
}

const MenuItem = ({ children, className = "", ...rest }: JSX.IntrinsicElements["span"]) => {
  return (
    <span className={`mr-2 ${className}`} {...rest}>
      {children}
    </span>
  )
}

const Header = () => {
  const user = useCurrentUser()
  return (
    <>
      <div className="m-2 flex justify-end">
        <Menu>
          <MenuItem>
            <Link href="/">Home</Link>
          </MenuItem>
          {!user && (
            <MenuItem>
              <Link href="/signup">Registrarse</Link>
            </MenuItem>
          )}
          {!user && (
            <MenuItem>
              <Link href="/login">Login</Link>
            </MenuItem>
          )}
          <MenuItem>
            <Link href="/resources">Recursos</Link>
          </MenuItem>
          {user && <MenuItem>|</MenuItem>}
          {user && (
            <MenuItem>
              <UserBadge user={user} />
            </MenuItem>
          )}
        </Menu>
      </div>
      <VerificationMessage user={user} />
    </>
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
      <Suspense fallback={null}>
        <Header />
      </Suspense>
      {children}
      <Footer />
    </div>
  </>
)

export default Layout
