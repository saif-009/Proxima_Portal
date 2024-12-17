import React, { useState } from 'react'
import { Input } from '../../../../../../../components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../../../../../components/ui/select'
import { Switch } from '../../../../../../../components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../../../../../components/ui/tabs'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../../../../../../../components/ui/accordion'
import { RadioGroup, RadioGroupItem } from '../../../../../../../components/ui/radio-group'
import { Label } from '../../../../../../../components/ui/label'
import { Checkbox } from '../../../../../../../components/ui/checkbox'
import { Button } from '../../../../../../../components/ui/button'
import {
  CalendarIcon,
  ChevronDownIcon,
  TrashIcon,
  UploadIcon,
} from 'lucide-react'

export default function Component() {
  const [
    advantagePlusCampaignBudget,
    setAdvantagePlusCampaignBudget,
  ] = useState(false)
  const [campaignBudgetType, setCampaignBudgetType] = useState('daily')
  const [budgetScheduling, setBudgetScheduling] = useState(false)
  const [budgetSchedulingExpanded, setBudgetSchedulingExpanded] = useState(
    false,
  )
  const [startDate, setStartDate] = useState('Sep 08, 2024')
  const [startTime, setStartTime] = useState('00:00')
  const [endDate, setEndDate] = useState('Sep 09, 2024')
  const [endTime, setEndTime] = useState('00:00')
  const [budgetIncrease, setBudgetIncrease] = useState('200.00')
  const [adFormat, setAdFormat] = useState('')
  const [multiAdvisorAds, setMultiAdvisorAds] = useState<any>(false)
  const [ctaType, setCtaType] = useState('')
  const [userAdAccountSelected, setUserAdAccountSelected] = useState(false)
  const [fbPage, setFbPage] = useState('')
  const [languages, setLanguages] = useState({
    en: false,
    es: false,
    fr: false,
    de: false,
    it: false,
  })
  const [age, setAge] = useState({ min: 18, max: 65 })
  const [adsetSpendingLimit, setAdsetSpendingLimit] = useState(false)
  const [adsetSpendingLimitAmount, setAdsetSpendingLimitAmount] = useState('')
  const [dynamicCreative, setDynamicCreative] = useState(false)
  const [buyingType, setBuyingType] = useState('auction') // Default: 'auction'
  const [objective, setObjective] = useState('leads') // Default: 'leads'

  const handleLanguageChange = (lang:any) => {
    setLanguages((prev:any) => ({ ...prev, [lang]: !prev[lang] }))
  }

  return (
    <Tabs defaultValue="meta">
      <TabsList>
        <TabsTrigger value="meta">Meta</TabsTrigger>
        <TabsTrigger value="google">Google</TabsTrigger>
      </TabsList>
      <TabsContent value="meta">
        <div>
          {/* Buying Type */}
          <div>
            <Label>Buying Type</Label>
            <Select value={buyingType}  onValueChange={setBuyingType}>
              <SelectTrigger disabled>
                <SelectValue placeholder="Select buying type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="auction" disabled>
                  Auction
                </SelectItem>
                <SelectItem value="reservation">Reservation</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Objectives */}
          <div>
            <Label>Objectives</Label>
            <Select value={objective} onValueChange={setObjective}>
              <SelectTrigger disabled>
                <SelectValue placeholder="Select objective" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="leads" disabled>
                  Leads
                </SelectItem>
                <SelectItem value="awareness">Awareness</SelectItem>
                <SelectItem value="traffic">Traffic</SelectItem>
                <SelectItem value="engagement">Engagement</SelectItem>
                <SelectItem value="app-promotion">App Promotion</SelectItem>
                <SelectItem value="sales">Sales</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="campaign-settings">
            <AccordionTrigger>Campaign Settings</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="campaign-spending-limit" />
                    <Label htmlFor="campaign-spending-limit">
                      Add campaign spending limit
                    </Label>
                  </div>
                  <Input placeholder="No Limit Set" />
                  <div className="text-sm text-gray-500">₹0.00 Total Spent</div>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="advantage-plus-campaign-budget"
                    checked={advantagePlusCampaignBudget}
                    onCheckedChange={setAdvantagePlusCampaignBudget}
                  />
                  <Label htmlFor="advantage-plus-campaign-budget">
                    Advantage Plus Campaign Budget
                  </Label>
                </div>
                {advantagePlusCampaignBudget && (
                  <>
                    <div>
                      <Label>Campaign Budget Type</Label>
                      <RadioGroup
                        value={campaignBudgetType}
                        onValueChange={setCampaignBudgetType}
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
                    <div>
                      <Label>Campaign Bid Strategy</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select bid strategy" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="highest-volume">
                            Highest Volume
                          </SelectItem>
                          <SelectItem value="cost-per-result">
                            Cost per Result Goal
                          </SelectItem>
                          <SelectItem value="bid-cap">Bid Cap</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="budget-scheduling"
                          disabled={campaignBudgetType === 'lifetime'}
                          checked={budgetScheduling}
                          onCheckedChange={setBudgetScheduling}
                        />
                        <Label htmlFor="budget-scheduling">
                          Budget Scheduling
                        </Label>
                      </div>
                      {budgetScheduling && (
                        <div className="border rounded-md p-4 space-y-4">
                          <div className="flex items-center space-x-2">
                            <Checkbox id="increase-budget" checked={true} />
                            <Label htmlFor="increase-budget">
                              Increase your budget during specific time periods
                            </Label>
                          </div>
                          <div>
                            <Button
                              variant="outline"
                              onClick={() =>
                                setBudgetSchedulingExpanded(
                                  !budgetSchedulingExpanded,
                                )
                              }
                              className="w-full justify-between"
                            >
                              View
                              <ChevronDownIcon className="h-4 w-4" />
                            </Button>
                          </div>
                          {budgetSchedulingExpanded && (
                            <div className="space-y-4">
                              <h3 className="text-sm font-medium">
                                Tell us the duration of your anticipated
                                high-demand period
                              </h3>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label>Starts on</Label>
                                  <div className="flex space-x-2">
                                    <Input
                                      type="text"
                                      value={startDate}
                                      onChange={(e) =>
                                        setStartDate(e.target.value)
                                      }
                                    />
                                    <Input
                                      type="time"
                                      value={startTime}
                                      onChange={(e) =>
                                        setStartTime(e.target.value)
                                      }
                                    />
                                  </div>
                                </div>
                                <div>
                                  <Label>Ends</Label>
                                  <div className="flex space-x-2">
                                    <Input
                                      type="text"
                                      value={endDate}
                                      onChange={(e) =>
                                        setEndDate(e.target.value)
                                      }
                                    />
                                    <Input
                                      type="time"
                                      value={endTime}
                                      onChange={(e) =>
                                        setEndTime(e.target.value)
                                      }
                                    />
                                  </div>
                                </div>
                              </div>
                              <div>
                                <Label>
                                  Increase daily budget by value amount (₹)
                                </Label>
                                <Input
                                  type="number"
                                  value={budgetIncrease}
                                  onChange={(e) =>
                                    setBudgetIncrease(e.target.value)
                                  }
                                />
                              </div>
                              <p className="text-sm">
                                Meta will aim to spend an average of ₹1,000 a
                                day (a ₹200 increase) from{' '}
                                {startDate.split(',')[0]} to{' '}
                                {endDate.split(',')[0]}.
                              </p>
                              <Button variant="outline" className="w-full">
                                <TrashIcon className="h-4 w-4 mr-2" />
                                Remove this period
                              </Button>
                            </div>
                          )}
                          <Button variant="outline" className="w-full">
                            Add another time period
                          </Button>
                          <p className="text-sm text-right">1/50 entries</p>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="ad-scheduling"
                        disabled={campaignBudgetType === 'daily'}
                        checked={campaignBudgetType === 'lifetime'}
                      />
                      <Label htmlFor="ad-scheduling">Ad Scheduling</Label>
                    </div>
                  </>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="adset-settings">
            <AccordionTrigger>Adset Settings</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <div>
                  <Label>FB Page</Label>
                  <Select value={fbPage} onValueChange={setFbPage}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select FB Page" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="page1">Page 1</SelectItem>
                      <SelectItem value="page2">Page 2</SelectItem>
                      <SelectItem value="page3">Page 3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Conversion Location</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select conversion location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="multiple">
                        Multiple (Calls+Website)
                      </SelectItem>
                      <SelectItem value="website">Website</SelectItem>
                      <SelectItem value="instant-forms">
                        Instant Forms
                      </SelectItem>
                      <SelectItem value="messenger">Messenger</SelectItem>
                      <SelectItem value="instant-forms-messenger">
                        Instant Forms and Messenger
                      </SelectItem>
                      <SelectItem value="instagram">Instagram</SelectItem>
                      <SelectItem value="calls">Calls</SelectItem>
                      <SelectItem value="app">App</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Performance Goal</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select performance goal" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="max-leads">
                        Maximise No. of Leads
                      </SelectItem>
                      <SelectItem value="max-conversion-leads">
                        Max No. of Conversion Leads
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Pixel</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select pixel" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="px1">PX1</SelectItem>
                      <SelectItem value="px2">PX2</SelectItem>
                      <SelectItem value="px3">PX3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Cost per Result Goal (INR)</Label>
                  <Input
                    type="number"
                    placeholder="Enter cost per result goal"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="dynamic-creative"
                    checked={dynamicCreative}
                    onCheckedChange={setDynamicCreative}
                  />
                  <Label htmlFor="dynamic-creative">Dynamic Creative</Label>
                </div>
                {!dynamicCreative && (
                  <div>
                    <Label>Default Catalogue</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select default catalogue" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="c1">C1</SelectItem>
                        <SelectItem value="c2">C2</SelectItem>
                        <SelectItem value="c3">C3</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
                <div>
                  <Label>Product Set</Label>
                  <Input placeholder="Enter product set" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="adset-spending-limit"
                      checked={adsetSpendingLimit}
                      onCheckedChange={setAdsetSpendingLimit}
                    />
                    <Label htmlFor="adset-spending-limit">
                      Adset Spending Limit
                    </Label>
                  </div>
                  {adsetSpendingLimit && (
                    <div>
                      <Label>Spending Limit Amount (INR)</Label>
                      <Input
                        type="number"
                        placeholder="Enter spending limit amount"
                        value={adsetSpendingLimitAmount}
                        onChange={(e) =>
                          setAdsetSpendingLimitAmount(e.target.value)
                        }
                      />
                    </div>
                  )}
                </div>
                <div>
                  <Label>Languages</Label>
                  <div className="space-y-2">
                    {Object.entries(languages).map(([lang, isChecked]) => (
                      <div key={lang} className="flex items-center space-x-2">
                        <Checkbox
                          id={`lang-${lang}`}
                          checked={isChecked}
                          onCheckedChange={() => handleLanguageChange(lang)}
                        />
                        <Label htmlFor={`lang-${lang}`}>
                          {lang.toUpperCase()}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <Label>Age Range</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      type="number"
                      placeholder="Min age"
                      value={age.min}
                      onChange={(e) =>
                        setAge({ ...age, min: parseInt(e.target.value) })
                      }
                      min={13}
                      max={65}
                    />
                    <span>to</span>
                    <Input
                      type="number"
                      placeholder="Max age"
                      value={age.max}
                      onChange={(e) =>
                        setAge({ ...age, max: parseInt(e.target.value) })
                      }
                      min={13}
                      max={65}
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="advantage-plus-audience" />
                  <Label htmlFor="advantage-plus-audience">
                    Advantage Plus Audience
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="advantage-plus-detailed-targeting" />
                  <Label htmlFor="advantage-plus-detailed-targeting">
                    Advantage Plus Detailed Targeting
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="advantage-plus-placements" />
                  <Label htmlFor="advantage-plus-placements">
                    Advantage Plus Placements
                  </Label>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="ad-settings">
            <AccordionTrigger>Ad Settings</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <div>
                  <Label>Ad Format</Label>
                  <Select value={adFormat} onValueChange={setAdFormat}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select ad format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="single">
                        Single image or video
                      </SelectItem>
                      <SelectItem value="carousel">Carousel</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="multi-advisor-ads"
                    checked={multiAdvisorAds}
                    onCheckedChange={setMultiAdvisorAds}
                  />
                  <Label htmlFor="multi-advisor-ads">Multi Advisor Ads</Label>
                </div>
                <div>
                  <Label>Upload Creative (image/video)</Label>
                  <div className="mt-2">
                    <Label htmlFor="file-upload" className="cursor-pointer">
                      <div className="flex items-center justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
                        <span className="flex items-center space-x-2">
                          <UploadIcon className="w-6 h-6 text-gray-600" />
                          <span className="font-medium text-gray-600">
                            Drop files to Attach, or
                            <span className="text-blue-600 underline">
                              {' '}
                              browse
                            </span>
                          </span>
                        </span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                        />
                      </div>
                    </Label>
                  </div>
                </div>
                <div>
                  <Label>CTA Type</Label>
                  <Select value={ctaType} onValueChange={setCtaType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select CTA type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="learn-more">Learn more</SelectItem>
                      <SelectItem value="get-offers">Get offers</SelectItem>
                      <SelectItem value="get-quote">Get quote</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="user-ad-account"
                    checked={userAdAccountSelected}
                    onCheckedChange={setUserAdAccountSelected}
                  />
                  <Label htmlFor="user-ad-account">User Ad Account</Label>
                </div>
                {userAdAccountSelected && (
                  <div>
                    <Label>Pixel</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select pixel" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="px1">PX1</SelectItem>
                        <SelectItem value="px2">PX2</SelectItem>
                        <SelectItem value="px3">PX3</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
                <div className="flex items-center space-x-2">
                  <Switch id="advantage-plus-creative" />
                  <Label htmlFor="advantage-plus-creative">
                    Advantage Plus Creative
                  </Label>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </TabsContent>
      <TabsContent value="google">
        <p>Google ad preferences content goes here.</p>
      </TabsContent>
    </Tabs>
  )
}
