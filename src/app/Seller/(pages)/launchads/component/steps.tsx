import React from 'react'


interface stepsProps{
    step:number
}
function Steps({step}:stepsProps) {
  return (
    <div className=" flex  flex-row-reverse justify-start gap-5 items-center">
            <div className="flex space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full ${
                    step >= i ? 'bg-[rgb(123,87,224)]' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">Step {step} of 4</span>
          </div>
  )
}

export default Steps