export async function fetcher(url: string, requestInit?: RequestInit) {
  const response = await fetch(url, {
    ...requestInit,
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    return Promise.reject(response)
  }

  return response.json()
}

export async function getFakeApi() {
  const gamesModule = await import('public/games.json')

  await new Promise((resolve) => setTimeout(resolve, 100))

  return gamesModule.default
}
