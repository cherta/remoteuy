export type Error = {
  result: "error"
  message: string
}
export type Success<T> = {
  result: "success"
  data: T
}
export type Result<T> = Error | Success<T>
