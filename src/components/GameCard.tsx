import React from 'react'

export type GameCardProps = {
  title: string
  id: string
  onClick?(id: string): void
}

export default function GameCard({ title, id, onClick }: GameCardProps) {
  return (
    <div
      className="card bg-base-100 shadow-xl image-full cursor-pointer"
      onClick={() => onClick?.(id)}
    >
      <figure>
        <img
          src={`https://cdn2.softswiss.net/i/s2/${id}.png`}
          loading="lazy"
          alt="Shoes"
        />
      </figure>
      <div className="card-body flex items-center justify-center">
        <h2 className="card-title">{title}</h2>
      </div>
    </div>
  )
}
