export type GameList = {
  [key: string]: GameDetail
}

export type GameDetail = {
  collections: {
    all: number
    novelty: number
    popularity: number
    slots: number
    _hd: number
  }
  demo: string
  provider: string
  title: string
  real: {
    [key: string]: {
      id: number
    }
  }
}
