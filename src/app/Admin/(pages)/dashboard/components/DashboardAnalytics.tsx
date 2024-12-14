import { Card } from '../../../../../../components/ui/card'
import CarLeadsTreemap from './treeMap'
import ContributionAnalysis from './contributionCharts'
import CostPerLeadsTrends from './costPerLeadsTrends'
import TopPartners from './topPartners'
import TopPerformingCreative from './topPerformingCreatives'
import StatCards from './statsCard'
import HorizontalCards from './horizontalCards'
export default function AnalyticsDashboard() {
  return (
    <div className="pr-3 pt-0 pb-4 space-y-6 bg-black min-h-screen">
      <StatCards />
      <HorizontalCards />

      <CarLeadsTreemap />
      <ContributionAnalysis />
      <CostPerLeadsTrends />
      <TopPartners />
      {/* <TopPerformingCreative/> */}
    </div>
  )
}
