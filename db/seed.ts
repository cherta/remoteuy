import db from "./index"
import seedCompanies from "./seed/lib/companies"

type GHCompany = {
  picture: string
  url: string
  name: string
  description: string
  meta: GHMeta
}

type GHMeta = {
  allowFullRemote: boolean
  hasPhysicalOffices: boolean
}

const seed = async () => {
  try {
    await db.company.deleteMany({})
    console.log("Deleted all companies")
    const companies = seedCompanies as GHCompany[]
    console.log(`Loaded ${companies.length} companie(s)`)
    for (let company of companies) {
      await db.company.create({
        data: {
          name: company.name,
          description: company.description,
          logo: company.picture,
          url: company.url,
          allowsFullRemote: company.meta.allowFullRemote,
          hasOffices: company.meta.hasPhysicalOffices,
        },
      })
      console.log(`Created ${company.name}`)
    }
    const count = await db.company.count()
    console.log(`Created ${count} companie(s)`)
  } catch (e) {
    console.error(e)
  }
}

export default seed
