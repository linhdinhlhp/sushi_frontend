// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components Imports
import CardStatisticsVerticalComponent from 'src/@core/components/card-statistics/card-stats-vertical'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Demo Components Imports
import EcommerceTable from 'src/views/dashboards/analytics/EcommerceTable'
import EcommerceTotalProfit from 'src/views/dashboards/analytics/EcommerceTotalProfit'
import EcommerceNewVisitors from 'src/views/dashboards/analytics/EcommerceNewVisitors'
import EcommerceTotalRevenue from 'src/views/dashboards/analytics/EcommerceTotalRevenue'
import EcommerceTransactions from 'src/views/dashboards/analytics/EcommerceTransactions'
import EcommerceCongratulations from 'src/views/dashboards/analytics/EcommerceCongratulations'
import EcommerceTotalSalesDonut from 'src/views/dashboards/analytics/EcommerceTotalSalesDonut'
import EcommerceMeetingSchedule from 'src/views/dashboards/analytics/EcommerceMeetingSchedule'
import EcommerceTotalSalesRadial from 'src/views/dashboards/analytics/EcommerceTotalSalesRadial'
import EcommerceWebsiteStatistics from 'src/views/dashboards/analytics/EcommerceWebsiteStatistics'

const EcommerceDashboard = () => {
  return (
    <h1>Dashboard</h1>  )
}

EcommerceDashboard.acl = {
  action: 'read',
  subject: 'dashboard'
}

export default EcommerceDashboard
