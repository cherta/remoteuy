import React, { useState } from "react"
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
import updateClaim from "app/claims/mutations/updateClaim"
import getCurrentUser from "app/users/queries/getCurrentUser"

const Claims: BlitzPage = () => {
  const [user, { refetch: refetchUser }] = useQuery(getCurrentUser, null)
  const [companies] = useQuery(getCompanies, {})
  const [claims, { refetch: refetchClaims }] = useQuery(getClaims, {
    where: { status: { not: "APPROVED" } },
  })

  const [info, setInfo] = useState<string>()
  const [startInfo] = useTimeoutCallback(() => setInfo(undefined), 2000)

  const handleDelete = (claimId: number) => async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault()
    e.stopPropagation()

    await deleteClaim({ claimId })
    refetchClaims()
    setInfo("La solicitud fue borrada")
    startInfo()
  }

  const handleApprove = (claimId: number) => async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault()
    e.stopPropagation()

    await updateClaim({ id: claimId, status: "APPROVED" })

    refetchClaims()
    refetchUser()
    setInfo("La solicitud fue aprobada")
    startInfo()
  }
  return (
    <div>
      <Title>Solicitar manejo de empresa</Title>
      <Paragraph className="mb-4">
        Solicitar el manejo de una empresa es hacerte dueño de la misma en el sitio. Esto sirve para
        poder postear trabajos en su nombre y cambiar los datos de la misma.
      </Paragraph>
      <Form<CreateClaimInputType>
        submitText="Solicitar manejo"
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
      <Title className="mt-12">Solicitudes previas</Title>
      {info && <div className="bg-yellow-500 p-2">{info}</div>}
      {claims.length === 0 ? (
        <p>No hay solicitudes aún</p>
      ) : (
        <table className="w-full text-left mt-4">
          <thead>
            <tr className="border-b border-gray-300">
              <th className="p-2 border-r border-gray-300">#</th>
              <th className="p-2 border-r border-gray-300 w-56">Empresa</th>
              <th className="p-2 border-r border-gray-300">Información</th>
              <th className="p-2 w-32 border-r border-gray-300">Estatus</th>
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
                      <span className="mr-2" role="img" aria-label="minus sign">
                        ➖
                      </span>
                      Quitar
                    </button>
                    {user?.role === "admin" && (
                      <>
                        <span className="mx-2">|</span>
                        <button onClick={handleApprove(claim.id)}>
                          <span className="mr-2" role="img" aria-label="check sign">
                            ✅
                          </span>
                          Aprobar
                        </button>
                      </>
                    )}
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

Claims.getLayout = (page) => (
  <Layout title="Empresas uruguayas que promueven el trabajo remoto | Reclamar empresa">
    {page}
  </Layout>
)

export default Claims
