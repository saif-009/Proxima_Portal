'use client'

import { useState } from 'react'
import { Button } from "../../../../../components/ui/button"
import PlanSelection from './component/plan-selection'
import BrandSelection from './component/brand-selection'
import ProductSelection from './component/product-selection'
import LocationSelection from './component/location-selection'
import { ReviewCard } from './component/review-card'

export default function CampaignCreation() {
  const [step, setStep] = useState(1)
  const [selectedPlan, setSelectedPlan] = useState('')
  const [selectedBrand, setSelectedBrand] = useState('')
  const [selectedProducts, setSelectedProducts] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedLocation, setSelectedLocation] = useState('')
  const [referenceNumber, setReferenceNumber] = useState('')
  const [isReviewOpen, setIsReviewOpen] = useState(false)

  const handleNext = () => {
    if (step < 4) setStep(step + 1)
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleReview = () => {
    setIsReviewOpen(true)
  }

  const closeReview = () => {
    setIsReviewOpen(false)
  }

  // This is a placeholder for your existing component
  const ExistingComponent = () => (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-2">Your Existing Component</h3>
      <p>Place your existing component content here.</p>
    </div>
  )

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      <h1 className="md:text-3xl text-xl font-bold mb-6">Launch Ad</h1>
      <div className="mb-6 flex justify-between items-center">
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
      {step === 1 && <PlanSelection selectedPlan={selectedPlan} setSelectedPlan={setSelectedPlan} />}
      {step === 2 && <BrandSelection selectedBrand={selectedBrand} setSelectedBrand={setSelectedBrand} />}
      {step === 3 && (
        <ProductSelection
          selectedBrand={selectedBrand}
          selectedProducts={selectedProducts}
          setSelectedProducts={setSelectedProducts}
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
        />
      )}
      {step === 4 && <LocationSelection setReferenceNumber={setReferenceNumber} selectedLocation={selectedLocation} referenceNumber={referenceNumber} setSelectedLocation={setSelectedLocation} />}
      <div className="mt-6 flex flex-col sm:flex-row justify-between space-y-4 sm:space-y-0">
        <Button onClick={handleBack} disabled={step === 1}>Back</Button>
        {step < 4 ? (
          <Button onClick={handleNext}>Next</Button>
        ) : (
          <Button onClick={handleReview}>Review</Button>
        )}
      </div>
      <div className=''>
      <ReviewCard
        isOpen={isReviewOpen}
        onClose={closeReview}
        campaignData={{
          plan: selectedPlan,
          brand: selectedBrand,
          products: selectedProducts,
          categories: selectedCategories,
          location: selectedLocation,
          referenceNumber
        }}
        ExistingComponent={ExistingComponent}
      />
      </div>
      
    </div>
  )
}

