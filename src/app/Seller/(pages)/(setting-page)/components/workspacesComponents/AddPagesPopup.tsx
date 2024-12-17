'use client'

import { useState } from 'react'
import { Button } from '../../../../../../../components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../../../../../../components/ui/dialog'
import { Card, CardContent, CardHeader, CardTitle } from '../../../../../../../components/ui/card'
import { CheckCircle, ChevronDown, ChevronUp, Trash2 } from 'lucide-react'

interface FacebookPage {
  id: string
  name: string
  owner: string
  connected: boolean
}

export default function FacebookIntegration() {
  const [isOpen, setIsOpen] = useState(false)
  const [pages, setPages] = useState<FacebookPage[]>([
    {
      id: '1',
      name: 'Mayank Properties',
      owner: 'Leapx Growth',
      connected: false,
    },
    {
      id: '2',
      name: 'Real Estate Hub',
      owner: 'Leapx Growth',
      connected: false,
    },
    { id: '3', name: 'Home Finder', owner: 'Leapx Growth', connected: false },
  ])
  const [connectedPages, setConnectedPages] = useState<FacebookPage[]>([])
  const [expandedPages, setExpandedPages] = useState<string[]>([])

  const handleConnect = (pageId: string) => {
    setPages(
      pages.map((page) =>
        page.id === pageId ? { ...page, connected: true } : page,
      ),
    )
    const connectedPage = pages.find((page) => page.id === pageId)
    if (connectedPage) {
      setConnectedPages([
        ...connectedPages,
        { ...connectedPage, connected: true },
      ])
    }
  }

  const handleDisconnect = (pageId: string) => {
    setConnectedPages(connectedPages.filter((page) => page.id !== pageId))
    setPages(
      pages.map((page) =>
        page.id === pageId ? { ...page, connected: false } : page,
      ),
    )
    setExpandedPages(expandedPages.filter((id) => id !== pageId))
  }

  const toggleExpand = (pageId: string) => {
    setExpandedPages((prev) =>
      prev.includes(pageId)
        ? prev.filter((id) => id !== pageId)
        : [...prev, pageId],
    )
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Facebook Integration</CardTitle>
      </CardHeader>
      <CardContent>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full h-10">
              Add Pages
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Connect Facebook Pages</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4">
              {pages.map((page) => (
                <div
                  key={page.id}
                  className="flex items-center justify-between h-12"
                >
                  <span className="truncate max-w-[200px]">{page.name}</span>
                  <Button
                    onClick={() => handleConnect(page.id)}
                    disabled={page.connected}
                    className="w-24 h-9"
                  >
                    {page.connected ? 'Connected' : 'Connect'}
                  </Button>
                </div>
              ))}
            </div>
          </DialogContent>
        </Dialog>

        {connectedPages.length > 0 && (
          <div className="mt-4 space-y-2">
            <h3 className="text-lg font-semibold">Connected Pages:</h3>
            {connectedPages.map((page) => (
              <div key={page.id} className="border rounded-md">
                <div
                  className="flex items-center justify-between p-4 cursor-pointer h-14"
                  onClick={() => toggleExpand(page.id)}
                >
                  <div className="flex items-center space-x-2 overflow-hidden">
                    <CheckCircle
                      className="text-green-500 flex-shrink-0"
                      size={20}
                    />
                    <span className="font-medium truncate">{page.name}</span>
                  </div>
                  {expandedPages.includes(page.id) ? (
                    <ChevronUp size={20} className="flex-shrink-0" />
                  ) : (
                    <ChevronDown size={20} className="flex-shrink-0" />
                  )}
                </div>
                {expandedPages.includes(page.id) && (
                  <div className="px-4 pb-4 pt-2 border-t">
                    <div className="flex items-center justify-between h-8">
                      <p className="text-sm text-gray-500 truncate max-w-[80%]">
                        {page.owner} has full access to this page
                      </p>
                      <Trash2
                        className="text-red-500 cursor-pointer flex-shrink-0"
                        size={20}
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDisconnect(page.id)
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
