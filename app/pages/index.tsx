import { Suspense } from "react"
import { BlitzPage } from "blitz"
import { Company } from "@prisma/client"
import superjson from "superjson"
import Layout from "app/layouts/Layout"
import Companies from "app/companies/components/Companies"
import getCompanies from "app/companies/queries/getCompanies"

type HomeProps = { companies: Company[] }

const Home: BlitzPage<HomeProps> = ({ companies }) => {
  return (
    <main className="flex flex-col mx-2">
      <Suspense fallback="Loading...">
        <h1 className="font-bold text-4xl mb-8">Remote Uruguay</h1>
        <p className="text-lg">
          Remote.uy es un listado de empresas uruguayas que promueven el trabajo remoto o
          distribuído. Si querés agregar una empresa podés ayudarnos mandando un PR a nuestro
          repositorio de GH.
        </p>
        <div className="flex flex-col self-center my-12 xl:w-1200 -mx-2">
          <img
            src="https://remote.uy/images/arseniy-kapran-hkjUkfqaVpU-unsplash.jpg"
            className="object-cover h-600 w-full"
            alt="A big mate"
          />
          <p className="text-xs text-right mt-1 leading-tight">
            Photo by{" "}
            <a
              href="https://unsplash.com/@whatam1?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
              target="_blank"
              rel="noreferrer"
            >
              Arseniy Kapran
            </a>{" "}
            on{" "}
            <a
              href="https://unsplash.com/s/photos/mate-computadora?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
              target="_blank"
              rel="noreferrer"
            >
              Unsplash
            </a>
          </p>
        </div>
        <Companies list={companies} />
      </Suspense>
    </main>
  )
}

export async function getStaticProps(_ctx) {
  const companies = await getCompanies({})
  return {
    props: {
      companies: superjson.serialize(companies).json,
    },
  }
}

Home.getLayout = (page) => (
  <Layout title="Empresas uruguayas que promueven el trabajo remoto">{page}</Layout>
)

export default Home
