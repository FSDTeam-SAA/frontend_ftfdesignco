import ChangingSwageGame from '@/components/swagpacks/ChangingSwageGame'
import SwagPacksHero from '@/components/swagpacks/SwagPacksHero'
import SwagPacksHero1 from '@/components/swagpacks/SwagPacksHero1'
import { CreateStore } from '@/components/swagstore/CreateStore'
import SwageFaQ from '@/components/swagstore/SwageFaQ'
import React from 'react'

const page = () => {
  return (
    <div>
        <SwagPacksHero />
        <SwagPacksHero1 />
        <CreateStore />
        <ChangingSwageGame />
        <SwageFaQ />
    </div>
  )
}

export default page