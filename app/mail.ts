import client from "@sendgrid/client"

client.setApiKey(process.env.SENDGRID_API_KEY as string)

export async function send(to: string, data: any, templateId: string) {
  return await client.request({
    url: "/v3/mail/send",
    method: "POST",
    body: {
      from: {
        email: "cherta@remote.uy",
      },
      personalizations: [
        {
          to: [
            {
              email: to,
            },
          ],
          dynamic_template_data: data,
        },
      ],
      template_id: templateId,
    },
  })
}
