import { Company as TCompany } from "@prisma/client"
import { Link } from "app/components/Link"

export type CompaniesProps = {
  list: TCompany[]
}

export const Companies = ({ list }: CompaniesProps) => {
  return (
    <>
      <h1 className="font-bold text-4xl mb-8">Empresas</h1>
      <div className="companies grid xl:grid-cols-3 lg:grid-cols-2 gap-px self-center xl:w-1200 -mx-2">
        {list.map((company) => {
          return <Company key={company.id} {...company} />
        })}
      </div>
    </>
  )
}

export const Company = ({
  name,
  description,
  logo,
  allowsFullRemote,
  hasOffices,
  url,
}: TCompany) => {
  return (
    <div className="company flex flex-col relative justify-center py-10 px-6 border-b border-r border-grey-600 relative">
      <div className="flex items-center">
        <img src={logo} alt={`${name}'s logo`} className="w-12 h-12 object-contain mr-2" />
        <h2 className="text-2xl font-bold">
          <Link type="custom" href={url}>
            <a className="hover:underline" target="_blank">
              {name}
            </a>
          </Link>
        </h2>
      </div>

      <p
        className="my-2 leading-tight overflow-hidden"
        style={{
          lineClamp: 2,
          WebkitLineClamp: 2,
          display: "-webkit-box",
          WebkitBoxOrient: "vertical",
        }}
      >
        {description}
      </p>
      <div className="absolute bottom-4 right-4 flex mt-1">
        <svg
          width="1em"
          height="1em"
          viewBox="0 0 16 16"
          className="mr-2 cursor-help"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>
            {allowsFullRemote ? "Allows you to work full remote" : "Some remote work is allowed"}
          </title>
          <path
            fillRule="evenodd"
            d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm8-7A8 8 0 1 1 0 8a8 8 0 0 1 16 0z"
            opacity={allowsFullRemote ? 1 : 0.3}
          />
          <path
            fillRule="evenodd"
            d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5z"
            opacity={allowsFullRemote ? 1 : 0.3}
          />
        </svg>
        <svg
          width="1em"
          height="1em"
          viewBox="0 0 16 16"
          className="cursor-help"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>{hasOffices ? "Has an office" : "Doesn't have an office"}</title>
          <path
            fillRule="evenodd"
            d="M14.763.075A.5.5 0 0 1 15 .5v15a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5V14h-1v1.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V10a.5.5 0 0 1 .342-.474L6 7.64V4.5a.5.5 0 0 1 .276-.447l8-4a.5.5 0 0 1 .487.022zM6 8.694L1 10.36V15h5V8.694zM7 15h2v-1.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5V15h2V1.309l-7 3.5V15z"
            opacity={hasOffices ? 1 : 0.3}
          />
          <path
            d="M2 11h1v1H2v-1zm2 0h1v1H4v-1zm-2 2h1v1H2v-1zm2 0h1v1H4v-1zm4-4h1v1H8V9zm2 0h1v1h-1V9zm-2 2h1v1H8v-1zm2 0h1v1h-1v-1zm2-2h1v1h-1V9zm0 2h1v1h-1v-1zM8 7h1v1H8V7zm2 0h1v1h-1V7zm2 0h1v1h-1V7zM8 5h1v1H8V5zm2 0h1v1h-1V5zm2 0h1v1h-1V5zm0-2h1v1h-1V3z"
            opacity={hasOffices ? 1 : 0.3}
          />
        </svg>
      </div>
    </div>
  )
}

export default Companies
