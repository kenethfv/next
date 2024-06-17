// https://tailwindcomponents.com/component/radio-buttons-1
'use client'
import { setCookie } from "cookies-next"
import { useRouter } from "next/navigation"
import { useState } from "react"

interface Props {
  currentTab?: number
  tabOptions?: number[]
}

export const TabBar = ({
  tabOptions = [1, 2, 3, 4],
  currentTab = 1,
}: Props) => {
  const router = useRouter()
    const [selected, setselected] = useState(currentTab)

    const conTabSelected = ( tab: number ) => {
        setselected (tab)
        setCookie('selectedTab', tab.toString())
        router.refresh()
    }
  console.log(tabOptions.length)
  return (
    <div
      className={`
      grid w-full space-x-2 rounded-xl bg-gray-200 p-2
      grid-cols-${tabOptions.length.toString()}
      `}
    >
      {tabOptions.map((tab) => (
        <div key={tab}>
          <input
          checked={ selected === tab }
          onChange={() => {}} 
          type="radio" 
          id={tab.toString()} 
          className="peer hidden" />
          <label 
          onClick={ () => conTabSelected(tab) }
          className="transition-all block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white">
            {tab}
          </label>
        </div>
      ))}
    </div>
  )
}
