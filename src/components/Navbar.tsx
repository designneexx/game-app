import themes from 'public/themes.json'
import React, { useState } from 'react'

export default function Navbar() {
  const [selected, setSelected] = useState<string>('dark')

  function onChangeTheme({
    target: { value },
  }: React.ChangeEvent<HTMLSelectElement>) {
    setSelected(value)
  }

  return (
    <div className="navbar bg-base-200">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">игра.designexx</a>
      </div>
      <div className="flex-none">
        <select
          className="select select-bordered select-lg w-full max-w-xs"
          onChange={onChangeTheme}
          value={selected}
          data-choose-theme
        >
          {themes.map((theme: string) => (
            <option
              key={theme}
              disabled={selected === theme}
              value={theme}
            >{`Тема: ${theme}`}</option>
          ))}
        </select>
      </div>
    </div>
  )
}
