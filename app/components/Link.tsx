import { Link as BlitzLink } from "blitz"
import { LinkProps } from "next/dist/client/link"

export const Link = ({
  children,
  type = "regular",
  target,
  className,
  ...rest
}: React.PropsWithChildren<
  LinkProps & { type?: "regular" | "custom"; target?: string; className?: string }
>) => {
  return (
    <BlitzLink {...rest}>
      {type === "regular" ? (
        <a
          className={`hover:underline hover:bg-gray-800 hover:text-white ${className}`}
          target={target}
        >
          {children}
        </a>
      ) : (
        children
      )}
    </BlitzLink>
  )
}

export default Link
