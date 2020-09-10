import { ClaimStatus } from "@prisma/client"

export const ClaimStatusBadge = ({ status }: { status: ClaimStatus }) => {
  return (
    <a
      role="status"
      className="cursor-help"
      title={
        status === "APPROVED"
          ? "Tu reclamo está aprobado"
          : status === "CREATED"
          ? "Tu reclamo fue ingresado"
          : "Tu reclamo fue rechazado"
      }
    >
      <span className="mr-4">
        {status === "APPROVED" ? "✅" : status === "CREATED" ? "⏰" : "👎"}
      </span>
      <span>
        {status === "APPROVED" ? "Aprobado" : status === "CREATED" ? "Creado" : "Rechazado"}
      </span>
    </a>
  )
}
