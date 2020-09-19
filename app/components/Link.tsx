import { Link as BlitzLink } from "blitz"
import { LinkProps } from "next/dist/client/link"

export const Link = ({
  children,
  type = "regular",
  target,
  className = "",
  onClick,
  ...rest
}: React.PropsWithChildren<
  LinkProps & {
    type?: "regular" | "custom"
    target?: string
    className?: string
    onClick?: (event: React.MouseEvent<Element, MouseEvent>) => void
  }
>) => {
  /* eslint-disable jsx-a11y/click-events-have-key-events */
  return (
    <BlitzLink {...rest}>
      {type === "regular" ? (
        <a
          className={`hover:underline hover:bg-gray-800 hover:text-white ${className}`}
          target={target}
          onClick={onClick}
          role="link"
          tabIndex={0}
        >
          {children}
        </a>
      ) : (
        children
      )}
    </BlitzLink>
  )
  /* eslint-enable jsx-a11y/click-events-have-key-events */
}

export default Link
