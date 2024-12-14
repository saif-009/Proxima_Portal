'use client'

import { useState } from 'react'
import { Button } from "../../../../../../../components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../../../../../../../components/ui/card"
import { Star } from 'lucide-react'

export default function ReviewCard() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <Button onClick={() => setIsOpen(true)}>Open Review</Button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div 
            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          <Card className="w-full max-w-md z-10 shadow-lg">
            <CardHeader>
              <CardTitle>Leave a Review</CardTitle>
              <CardDescription>We'd love to hear your thoughts!</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center space-x-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star 
                    key={star}
                    className="w-6 h-6 text-yellow-400 cursor-pointer"
                    fill="currentColor"
                  />
                ))}
              </div>
              <textarea 
                className="w-full p-2 border rounded-md" 
                rows={4} 
                placeholder="Write your review here..."
              />
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
              <Button>Submit Review</Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  )
}

