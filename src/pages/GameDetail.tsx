import GameCard from 'components/GameCard'
import useFetchData from 'hooks/useFetchData'
import React, { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { GameList } from 'types/api'

type Game = {
  title: string
  id: string
}

export default function GameDetail() {
  const [searchParams] = useSearchParams()
  const gameId = searchParams.get('id')
  const navigate = useNavigate()

  const [{ title, id }] = useFetchData<Game, GameList>('api:fake', {
    key: 'detail',
    initial: () => ({
      title: '',
      id: gameId || '',
    }),
    next(response) {
      if (!gameId) return Promise.reject()

      const item = response[gameId]

      return {
        title: item.title,
        id: gameId,
      }
    },
  })

  function onGoToHome() {
    navigate('')
  }

  useEffect(() => {
    if (!gameId) {
      navigate('/')
    }
  }, [gameId])

  return (
    <div className="grid-paddings">
      <button className="btn" onClick={onGoToHome}>
        На главную
      </button>

      <div className="grid-paddings px-0">
        <GameCard title={title} id={id} onClick={onGoToHome} />
      </div>
    </div>
  )
}
