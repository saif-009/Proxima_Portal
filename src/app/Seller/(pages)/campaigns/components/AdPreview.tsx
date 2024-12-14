import {Image as ImageIcon, CloudFog} from 'lucide-react'


export default function AdPreview({ platform, fbPreview }: any) {
  return (
    <div className="border rounded-md mt-2 mb-4 bg-gray-100">
      {/* <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-semibold">
          {platform === 'meta' ? 'Meta' : 'Google'}
        </span>
        <Toggle
          aria-label="Toggle Ad Platform"
          pressed={platform === 'google'}
          onPressedChange={() => {}}
          className="h-5 w-8"
        >
          <div className="h-4 w-4" />
        </Toggle>
      </div> */}
      <div className="bg-white rounded-md flex items-center justify-center">
        {fbPreview?.length > 0 ? <div className="ad-preview-container">
          {fbPreview?.slice(0, 1)?.map((val: any, index: number) => (
            <div key={index} className="ad-preview-content-wrapper flex justify-center">
              <div
                className="ad-preview-content"
                dangerouslySetInnerHTML={{ __html: val?.data[0]?.body }}
              />
            </div>
          ))}
        </div> : <div className="text-center">
          <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-2" />
          <p className="text-sm font-medium">Try Our SaaS Solution Free</p>
          <p className="text-xs text-gray-500">
            Start your 30-day free trial now! No credit card required.
          </p>
        </div>}
      </div>
    </div>
  )
}