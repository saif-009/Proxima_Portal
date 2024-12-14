import React from 'react'
import { Card, CardContent } from '../../../../../../components/ui/card'
import { Button } from '../../../../../../components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import metaIcon from '../../../../public/meta-icon.svg'
import googleIcon from '../../../../public/google_icon.svg'
import Image from 'next/image'
import { ChevronDown } from 'lucide-react'

const TopCreatives = () => {
  const creatives = [
    {
      id: 1,
      title: 'Meta Ad:1',
      description:
        'Experience The All-New Model. Discover The Perfect Blend Of Style & Performance. Book A Test Drive Today!',
      spends: '₹1,451',
      leads: '2,953',
      cpl: '₹482',
      platform: 'Meta Ads',
    },
    {
      id: 2,
      title: 'Meta Ad:1',
      description:
        'Experience The All-New Model. Discover The Perfect Blend Of Style & Performance. Book A Test Drive Today!',
      spends: '₹1,451',
      leads: '2,953',
      cpl: '₹482',
      platform: 'Google Ads',
    },
    // Add more creatives as needed
  ]

  return (
    <div className=" bg-black pb-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-white text-lg font-semibold">
            Top performing creatives
          </h2>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              className="bg-zinc-800 border-zinc-700 hover:bg-zinc-700"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="bg-zinc-800 border-zinc-700 hover:bg-zinc-700"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Platform Filter */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="bg-purple-600 text-white border-none hover:bg-purple-700"
          >
            <Image src={metaIcon} alt="Google" className="w-4 h-4 mr-2" />
            Meta Ads
          </Button>
          <Button
            variant="outline"
            className="bg-zinc-800 text-white border-zinc-700 hover:bg-zinc-700"
          >
            <Image src={googleIcon} alt="Google" className="w-4 h-4 mr-2" />
            Google Ads
          </Button>
        </div>

        {/* Creatives Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {creatives.map((creative) => (
            <Card key={creative.id} className="bg-zinc-900 border-zinc-800">
              <CardContent className="p-4 space-y-4">
                {/* Image placeholder */}
                <div className="aspect-video bg-zinc-800 rounded-md" />

                {/* Creative details */}
                <div className="space-y-2">
                  <h3 className="text-white font-medium">{creative.title}</h3>
                  <p className="text-zinc-400 text-sm line-clamp-2">
                    {creative.description}
                  </p>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-6 pt-2">
                  <div className="mx-1 space-y-1">
                    <p className="text-zinc-400 text-xs">Spends</p>
                    <p className="text-white font-medium whitespace-nowrap">
                      {creative.spends}
                    </p>
                  </div>
                  <div className="mx-1 space-y-1">
                    <p className="text-zinc-400 text-xs">Leads</p>
                    <p className="text-white font-medium whitespace-nowrap">
                      {creative.leads}
                    </p>
                  </div>
                  <div className="mx-1 space-y-1">
                    <p className="text-zinc-400 text-xs">CPL</p>
                    <p className="text-white font-medium whitespace-nowrap">
                      {creative.cpl}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View More Button */}
        <Button
          variant="outline"
          className="w-32 bg-zinc-900 border-zinc-800 text-zinc-400 hover:bg-zinc-800"
        >
          View More <ChevronDown className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  )
}

export default TopCreatives
