import React, { useState, useEffect } from "react"
import { Company as TCompany } from "db"
import { BlitzPage, useParam, useQuery } from "blitz"
import { useTimeoutCallback } from "@react-hook/timeout"
import Layout from "app/layouts/Layout"
import { Title, SubTitle } from "app/components/Typography"
import getCompany from "app/companies/queries/getCompany"
import LabeledTextField from "app/components/LabeledTextField"
import Form from "app/components/Form"
import LabeledTextArea from "app/components/LabeledTextArea"
import { UpdateCompanyInput, UpdateCompanyInputType } from "app/companies/validations"
import updateCompany from "app/companies/mutations/updateCompany"
import getCurrentUser from "app/users/queries/getCurrentUser"
import { Company } from "app/companies/components/Companies"
import { useFormState } from "react-final-form"
import LabeledCheckbox from "app/components/LabeledCheckbox"

const CompanyPage: BlitzPage = () => {
  const id = useParam("id", "number")
  const [, { refetch: refetchUser }] = useQuery(getCurrentUser, null)
  const [company, { refetch: refetchCompany }] = useQuery(getCompany, { where: { id } })
  const [info, setInfo] = useState<string>()
  const [flashInfo] = useTimeoutCallback(() => setInfo(undefined), 2000)

  return (
    <>
      <Title>Editar {company?.name}</Title>
      {info && <div className="bg-yellow-500 p-2">{info}</div>}

      <Form<UpdateCompanyInputType>
        initialValues={{
          name: company?.name,
          description: company?.description,
          hasOffices: company?.hasOffices,
          allowsFullRemote: company?.allowsFullRemote,
        }}
        schema={UpdateCompanyInput}
        submitText="Actualizar"
        onSubmit={async function onSubmit(values) {
          await updateCompany({ data: values, where: { id: company?.id } })
          refetchCompany()
          refetchUser()
          setInfo("Gracias! Los cambios se reflejarán en unas horas en el sitio principal")
          flashInfo()
        }}
      >
        <div className="flex">
          <div className="flex-1">
            <LabeledTextField name="name" label="Nombre"></LabeledTextField>
            <LabeledTextArea name="description" label="Descripción"></LabeledTextArea>
            <LabeledCheckbox name="hasOffices" label="Has an office space"></LabeledCheckbox>
            <LabeledCheckbox
              name="allowsFullRemote"
              label="Allows employees to work fully remote"
            ></LabeledCheckbox>
          </div>
          <div className="flex-1">
            <SubTitle>Preview</SubTitle>
            {company && <PreviewCompany company={company} />}
          </div>
        </div>
      </Form>
    </>
  )
}

const PreviewCompany = ({ company }: { company: TCompany }) => {
  const [preview, setPreview] = useState<TCompany>(company)
  const { values } = useFormState()
  useEffect(() => {
    setPreview((preview) => {
      return { ...preview, ...values }
    })
  }, [values])
  return <Company {...preview} className="border" />
}

CompanyPage.getLayout = (page) => (
  <Layout title="Empresas uruguayas que promueven el trabajo remoto">{page}</Layout>
)

export default CompanyPage
