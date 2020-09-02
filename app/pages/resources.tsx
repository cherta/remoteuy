import { BlitzPage } from "blitz"
import Layout from "app/layouts/Layout"
import Link from "app/components/Link"

const Resources: BlitzPage = () => {
  return (
    <main className="flex flex-col mx-2">
      <h1 className="font-bold text-4xl mb-8">Recursos</h1>
      <p className="text-lg">Listado de recursos para gente que quiere mudarse a Uruguay.</p>
      <ul className="text-lg list-disc list-inside mt-4">
        <li>
          <Link
            href="https://www.uruguayxxi.gub.uy/es/quiero-invertir/guias-inversor/establecer-una-empresa/"
            target="_blank"
          >
            Querés abrir una empresa en Uruguay?
          </Link>{" "}
          - Esto te permite facturar a empresas de Uruguay y el exterior
        </li>
        <li>
          <Link href="Querés trabajar en Uruguay?" target="_blank">
            Querés trabajar en Uruguay?
          </Link>{" "}
          - Esto te permite trabajar en Uruguay como dependiente
        </li>
      </ul>
    </main>
  )
}

Resources.getLayout = (page) => (
  <Layout title="Empresas uruguayas que promueven el trabajo remoto">{page}</Layout>
)

export default Resources
