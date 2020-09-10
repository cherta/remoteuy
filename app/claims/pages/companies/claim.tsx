import React, { useCallback, useState } from "react"
import { BlitzPage, useQuery } from "blitz"
import { useTimeoutCallback } from "@react-hook/timeout"
import Layout from "app/layouts/Layout"
import { Title, Paragraph } from "app/components/Typography"
import Form from "app/components/Form"
import LabeledTextArea from "app/components/LabeledTextArea"
import LabeledDropDown from "app/components/LabeledDropDown"
import getCompanies from "app/companies/queries/getCompanies"
import { CreateClaimInput, CreateClaimInputType } from "app/claims/validations"
import createClaim from "app/claims/mutations/createClaim"
import getClaims from "app/claims/queries/getClaims"
import { ClaimStatusBadge } from "app/claims/components/ClaimStatusBadge"
import deleteClaim from "app/claims/mutations/deleteClaim"

const Claim: BlitzPage = () => {
  const [companies] = useQuery(getCompanies, {})
  const [claims, { refetch: refetchClaims }] = useQuery(getClaims, {})

  const [error, setError] = useState<string>()
  const [startError] = useTimeoutCallback(() => setError(undefined), 2000)

  const [info, setInfo] = useState<string>()
  const [startInfo] = useTimeoutCallback(() => setInfo(undefined), 2000)

  const handleDelete = useCallback(
    (claimId: number) => async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault()
      e.stopPropagation()

      const response = await deleteClaim({ claimId })
      if (response.result === "success") {
        refetchClaims()
        setInfo("El reclamo fue borrado")
        startInfo()
      } else {
        setError(response.message)
        startError()
      }
    },
    [refetchClaims, startError, startInfo]
  )
  return (
    <div>
      <Title>Reclamar empresa</Title>
      <Paragraph className="mb-4">
        Reclamar una empresa es hacerte dueño de la misma en el sitio. Esto sirve para poder postear
        trabajos en nombre de la empresa y cambiar los datos de la misma.
      </Paragraph>
      <Form<CreateClaimInputType>
        submitText="Reclamar"
        schema={CreateClaimInput}
        onSubmit={async (values, form) => {
          const { companyId, info } = values
          await createClaim({ companyId, info })
          refetchClaims()
          form.change("companyId", undefined)
          form.resetFieldState("companyId")
          form.change("info", undefined)
          form.resetFieldState("info")
        }}
      >
        <LabeledDropDown
          name="companyId"
          label="Empresa"
          options={companies.map((c) => [c.id, c.name])}
        />
        <LabeledTextArea
          name="info"
          label="Información extra"
          placeholder="Información que nos permita validar que estás autorizado a manejar los datos de la empresa en nuestro sitio"
          className="w-full"
        />
      </Form>
      <Title className="mt-12">Reclamos previos</Title>
      {error && <div className="bg-red-500 p-2">{error}</div>}
      {info && <div className="bg-yellow-500 p-2">{info}</div>}
      {claims.length === 0 ? (
        <p>No hay reclamos aún</p>
      ) : (
        <table className="w-full text-left mt-4">
          <thead>
            <tr className="border-b border-gray-300">
              <th className="p-2 border-r border-gray-300">#</th>
              <th className="p-2 border-r border-gray-300 w-56">Company</th>
              <th className="p-2 border-r border-gray-300">Información</th>
              <th className="p-2 w-32 border-r border-gray-300">Status</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {claims.map((claim) => {
              return (
                <tr className="border-b border-gray-300" key={claim.id}>
                  <td className="p-2 border-r border-gray-300">{claim.id}</td>
                  <td className="p-2 border-r border-gray-300">{claim.company?.name}</td>
                  <td className="p-2 border-r border-gray-300">{claim.info}</td>
                  <td className="p-2 border-r border-gray-300">
                    <ClaimStatusBadge status={claim.status} />
                  </td>
                  <td className="p-2">
                    <button onClick={handleDelete(claim.id)}>
                      <span role="img" aria-label="minus sign">
                        ➖
                      </span>{" "}
                      Quitar
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      )}
    </div>
  )
}

Claim.getLayout = (page) => (
  <Layout title="Empresas uruguayas que promueven el trabajo remoto | Reclamar empresa">
    {page}
  </Layout>
)

export default Claim
