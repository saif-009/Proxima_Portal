// @ts-nocheck
'use client'

import React, { useState, useEffect , useContext} from 'react'
import { Button } from '../../../../../../../components/ui/button'
import { Card, CardContent } from '../../../../../../../components/ui/card'
import { Checkbox } from '../../../../../../../components/ui/checkbox'
import { Input } from '../../../../../../../components/ui/input'
import { Label } from '../../../../../../../components/ui/label'
import { RadioGroup, RadioGroupItem } from '../../../../../../../components/ui/radio-group'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../../../../../components/ui/select'
import { Switch } from '../../../../../../../components/ui/switch'
import { Separator } from '../../../../../../../components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../../../../../components/ui/tabs'
import { useToast } from '../../../../../../../components/ui/toaster'
import GoogleAdsSchedular from './googleAdSchedular'
// import googleIcon from '../../../../../../../../public/google icon.svg'
// import metaIcon from '../../../../../../../../public/meta icon.svg'
import Image from 'next/image'
import {  
  AdPreferencesFormData,
  getDefaultPreferences,
  saveAdPreferences,
  getAdPreferences,
  INSTANT_FORM_OPTIONS,
  WEBSITE_OPTIONS,
  AWARENESS_OPTIONS,
} from './services/adPreferencesService'
import { settingsContext } from '../../../../../../../context/settingContext'

export default function AdPreferences2({activeWorkspace}) {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [formData, setFormData] = useState<AdPreferencesFormData>(
    getDefaultPreferences(),
  )
  const { userDetails } = useContext(settingsContext)
  const [renderNumber, setRenderNumber] = useState(0);
  console.log('active workspace from ad preferences', activeWorkspace)

  useEffect(() => {
    setRenderNumber((prev)=> prev+1); // Triggering the effect every time renderNumber changes, which will re-fetch the preferences
  }, [])
  
  console.log('render number', renderNumber)

  // Fetch saved preferences when component mounts
// Add activeWorkspaceId to dependency array to trigger re-fetch when it changes
  useEffect(() => {
    const fetchPreferences = async () => {
      setIsLoading(true)
      try {
        const data = await getAdPreferences()
        setFormData(data)
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load saved preferences. Using default values.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    // Only fetch if we have an active workspace
    if (userDetails?.activeWorkspaceId) {
      fetchPreferences()
    }
  }, [userDetails?.activeWorkspaceId, toast]) // Re-run when activeWorkspaceId changes

  const handleSavePreferences = async () => {
    setIsLoading(true)
    try {
      await saveAdPreferences(formData)
      toast({
        title: "Success",
        description: "Ad preferences have been saved successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save ad preferences. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }
  const updateFormData = (key: keyof AdPreferencesFormData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const handleCheckboxChange = (
    platform: keyof typeof formData.selectedPlatforms,
  ) => {
    updateFormData('selectedPlatforms', {
      ...formData.selectedPlatforms,
      [platform]: !formData.selectedPlatforms[platform],
    })
  }

  // const handleSavePreferences = async () => {
  //   setIsLoading(true)
  //   try {
  //     await saveAdPreferences(formData)
  //     toast({
  //       title: 'Success',
  //       description: 'Ad preferences have been saved successfully.',
  //     })
  //   } catch (error) {
  //     toast({
  //       title: 'Error',
  //       description: 'Failed to save ad preferences. Please try again.',
  //       variant: 'destructive',
  //     })
  //   } finally {
  //     setIsLoading(false)
  //   }
  // }

  const handleScheduleChange = (schedule: TimeBlock[]) => {
    // Only update if the schedule has actually changed
    if (JSON.stringify(schedule) !== JSON.stringify(formData.adSchedule)) {
      setFormData((prev) => ({
        ...prev,
        adSchedule: schedule,
      }))
    }
  }

  const handleSubmit = async () => {
    try {
      await saveAdPreferences(formData)
      // Handle success
    } catch (error) {
      // Handle error
    }
  }



  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <Tabs defaultValue="meta">
      <TabsList className="mb-4">
        <TabsTrigger value="meta">
          {/* <Image src={metaIcon} alt="" height={20} width={20} /> */}
          <span className="ml-2">Meta</span>
        </TabsTrigger>
        <TabsTrigger value="google">
          {/* <Image src={googleIcon} alt="" height={20} width={20} /> */}
          <span className="ml-2">Google</span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="meta">
        <Card className="w-full max-w-7xl mx-auto">
          <CardContent className="space-y-8 pt-6">
            {/* Campaign Settings */}
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold">Campaign Settings</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Special Ad Category</Label>
                  <Select
                    onValueChange={(value) =>
                      updateFormData('specialAdCat', value)
                    }
                    value={formData.specialAdCat}
                  >
                    <SelectTrigger className="w-full dark:bg-[#262626]">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="credit">Credit</SelectItem>
                      <SelectItem value="employment">Employment</SelectItem>
                      <SelectItem value="housing">Housing</SelectItem>
                      <SelectItem value="social">
                        Social Issues - Election or Politics
                      </SelectItem>
                      <SelectItem value="NONE">NONE</SelectItem>

                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="businessLocation">
                    Local Business Location (If applicable)
                  </Label>
                  <Input
                    id="businessLocation"
                    value={formData.bussinessLocation}
                    onChange={(e) =>
                      updateFormData('bussinessLocation', e.target.value)
                    }
                    placeholder="Search for your business location"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="advantageCampaign"
                    checked={formData.advantageCampaignStatus}
                    onCheckedChange={(checked) =>
                      updateFormData('advantageCampaignStatus', checked)
                    }
                  />
                  <Label htmlFor="advantageCampaign">
                    Advantage Campaign Budget
                  </Label>
                </div>

                <div className="space-y-2">
                  <Label>Budget Usage Preference</Label>
                  <RadioGroup
                    value={formData.budgetPreference}
                    onValueChange={(value) =>
                      updateFormData('budgetPreference', value)
                    }
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="daily" id="daily" />
                      <Label htmlFor="daily">Daily</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="lifetime" id="lifetime" />
                      <Label htmlFor="lifetime">Lifetime</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label>Preferred Page</Label>
                  <Select
                    onValueChange={(value) =>
                      updateFormData('PreferredPage', value)
                    }
                    value={formData.PreferredPage}
                  >
                    <SelectTrigger className="w-full dark:bg-[#262626]">
                      <SelectValue placeholder="Select a page" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="page1">Page 1</SelectItem>
                      <SelectItem value="page2">Page 2</SelectItem>
                      <SelectItem value="page3">Page 3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <Separator />

            {/* Performance Goals */}
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold">Performance Goals</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label>Instant Forms</Label>
                  <RadioGroup
                    value={formData.instantForms}
                    onValueChange={(value) =>
                      updateFormData('instantForms', value)
                    }
                  >
                    {INSTANT_FORM_OPTIONS?.map((option) => (
                      <div
                        key={option.key}
                        className="flex items-center space-x-2"
                      >
                        <RadioGroupItem value={option.value} id={option.key} />
                        <Label htmlFor={option.key}>{option.value}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label>Website</Label>
                  <Select
                    value={formData.websiteType}
                    onValueChange={(value) =>
                      updateFormData('websiteType', value)
                    }
                  >
                    <SelectTrigger className="w-full dark:bg-[#262626]">
                      <SelectValue placeholder="Select a goal" />
                    </SelectTrigger>
                    <SelectContent>
                      {WEBSITE_OPTIONS?.map((option) => (
                        <SelectItem key={option.key} value={option.value}>
                          {option.value}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Awareness</Label>
                  <Select
                    value={formData.awarenessType}
                    onValueChange={(value) =>
                      updateFormData('awarenessType', value)
                    }
                  >
                    <SelectTrigger className="w-full dark:bg-[#262626]">
                      <SelectValue placeholder="Select a goal" />
                    </SelectTrigger>
                    <SelectContent>
                      {AWARENESS_OPTIONS?.map((option) => (
                        <SelectItem key={option.key} value={option.value}>
                          {option.value}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <Separator />

            {/* Ads Schedule */}
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold">Ads Schedule</h2>
              <GoogleAdsSchedular
                adSchedule={formData.adSchedule}
                setAdSchedule={handleScheduleChange}
              />
            </div>

            <Separator />

            {/* Audience and Placement */}
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold">Audience and Placement</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="advantageAudience"
                    checked={formData.advantageAudience}
                    onCheckedChange={(checked) =>
                      updateFormData('advantageAudience', checked)
                    }
                  />
                  <Label htmlFor="advantageAudience">Advantage+ Audience</Label>
                </div>

                <div className="space-y-2">
                  <Label>Type of Inventory</Label>
                  <RadioGroup
                    value={formData.TypesOfInventory}
                    onValueChange={(value) =>
                      updateFormData('TypesOfInventory', value)
                    }
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="expanded" id="expanded" />
                      <Label htmlFor="expanded">Expanded</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="moderate" id="moderate" />
                      <Label htmlFor="moderate">Moderate</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="limited" id="limited" />
                      <Label htmlFor="limited">Limited</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="advantagePlacements"
                    checked={formData.advantagePlacements}
                    onCheckedChange={(checked) =>
                      updateFormData('advantagePlacements', checked)
                    }
                  />
                  <Label htmlFor="advantagePlacements">
                    Advantage+ Placements
                  </Label>
                </div>
              </div>

              {!formData.advantagePlacements && (
                <div className="space-y-2">
                  <Label>Manual Placement - Platforms</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="facebook"
                        checked={formData.selectedPlatforms.facebook}
                        onCheckedChange={() => handleCheckboxChange('facebook')}
                      />
                      <Label htmlFor="facebook">Facebook</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="instagram"
                        checked={formData.selectedPlatforms.instagram}
                        onCheckedChange={() =>
                          handleCheckboxChange('instagram')
                        }
                      />
                      <Label htmlFor="instagram">Instagram</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="audienceNetwork"
                        checked={formData.selectedPlatforms.audienceNetwork}
                        onCheckedChange={() =>
                          handleCheckboxChange('audienceNetwork')
                        }
                      />
                      <Label htmlFor="audienceNetwork">Audience Network</Label>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Separator />

            {/* Additional Settings */}
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold">Additional Settings</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="siteLinks"
                    checked={formData.siteLink}
                    onCheckedChange={(checked) =>
                      updateFormData('siteLink', checked)
                    }
                  />
                  <Label htmlFor="siteLinks">Site Links</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="dynamicCreative"
                    checked={formData.isDynamicCreativeOn}
                    onCheckedChange={(checked) =>
                      updateFormData('isDynamicCreativeOn', checked)
                    }
                  />
                  <Label htmlFor="dynamicCreative">Dynamic Creative</Label>
                </div>
              </div>
            </div>

            <Button
              className="w-full dark:bg-[#383838] dark:text-white"
              onClick={handleSavePreferences}
              disabled={isLoading}
            >
              {isLoading ? 'Saving...' : 'Save Preferences'}
            </Button>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="google">
        <p>Google ad preferences content goes here.</p>
      </TabsContent>
    </Tabs>
  )
}
