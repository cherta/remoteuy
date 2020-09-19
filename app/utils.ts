/** Mostly using to simulate slow queries */
export async function delay(interval = 3000) {
  return new Promise((resolve) => setTimeout(resolve, interval))
}
