import GameCard from 'components/GameCard'
import useFetchData from 'hooks/useFetchData'
import React, { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { GameDetail, GameList } from 'types/api'

interface GameItem extends GameDetail {
  id: string
}

type GamesInfo = {
  providers: string[]
  list: GameItem[]
  reals: string[]
}

const MAX_PER_PAGE = 12

export default function HomePage() {
  const navigate = useNavigate()

  const [pageCount, setPageCount] = useState(MAX_PER_PAGE)

  const [provider, setProvider] = useState<string>('')
  const [real, setReal] = useState<string>('')

  const [{ providers, reals, list }] = useFetchData<GamesInfo, GameList>(
    'api:fake',
    {
      key: 'list',
      initial: () => ({
        providers: [],
        list: [],
        reals: [],
      }),
      next(response) {
        const entries = Object.entries(response)
        const providersCollection = Array.from(new Set(entries.map(([, item]) => item.provider)))

        return {
          providers: ['', ...providersCollection],
          list: entries.map(([id, value]) => ({ id, ...value })),
          reals: ['', 'BTC', 'ETH', 'LTC', 'DOG', 'XRP'],
        }
      },
    }
  )

  const filteredList = useMemo(() => {
    return list.filter((item) => {
      const isProvider = !provider || item.provider === provider
      const isReal = !real || item.real[real]

      return isProvider && isReal
    })
  }, [list, provider, real])

  function onChangeProvider({
    target: { value },
  }: React.ChangeEvent<HTMLSelectElement>) {
    setProvider(value)
  }

  function onChangeReal({
    target: { value },
  }: React.ChangeEvent<HTMLSelectElement>) {
    setReal(value)
  }

  function onLoadMore() {
    setPageCount((prevState) => prevState + MAX_PER_PAGE)
  }

  function onGoToGame(id: string) {
    navigate({
      pathname: '/game-detail',
      search: `?id=${id}`
    })
  }

  function onClearFilter() {
    setProvider('')
    setReal('')
  }

  return (
    <div>
      <div className="awesome-grid">
        <select
          value={provider}
          className="select select-bordered w-full"
          placeholder="Провайдер"
          onChange={onChangeProvider}
        >
          {providers.map((item) => (
            <option key={item} disabled={provider === item} value={item}>
              {item || 'Не выбрано'}
            </option>
          ))}
        </select>
        <select
          onChange={onChangeReal}
          value={real}
          className="select select-bordered w-full"
        >
          {reals.map((item) => (
            <option key={item} disabled={provider === item} value={item}>
              {item || 'Не выбрано'}
            </option>
          ))}
        </select>
        <button
          className="btn md:col-span-2 lg:col-span-1"
          onClick={onClearFilter}
        >
          Очистить фильтр
        </button>
      </div>
      <div className="awesome-grid">
        {filteredList.slice(0, pageCount).map((item) => (
          <GameCard
            key={item.id}
            id={item.id}
            title={item.title}
            onClick={onGoToGame}
          />
        ))}
      </div>
      <div className="flex justify-center w-full grid-paddings">
        <button disabled={pageCount >= filteredList.length} className="btn btn-lg btn-primary" onClick={onLoadMore}>
          Показать еще
        </button>
      </div>
    </div>
  )
}
