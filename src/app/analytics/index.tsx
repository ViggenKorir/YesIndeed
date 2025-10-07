import { Users, DollarSign, TrendingUp, MousePointer, BarChart3 } from "lucide-react";
import { MetricCard } from "./MetricCard";
import { ChartCard } from "./ChartCard";
import { RevenueChart } from "./RevenueChart";
import { TrafficSourceChart } from "./TrafficSourceChart";
import { ConversionChart } from "./ConversionChart";

const Index = () => {
  return (
    <div className="min-h-screen bg-background p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-gradient-primary">
            <BarChart3 className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Analytics Dashboard
          </h1>
        </div>
        <p className="text-muted-foreground">
          Monitor your app's performance and user engagement
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard
          title="Total Users"
          value="24,831"
          change={12.5}
          changeLabel="vs last month"
          icon={<Users className="h-5 w-5" />}
        />
        <MetricCard
          title="Revenue"
          value="$28,450"
          change={8.2}
          changeLabel="vs last month"
          icon={<DollarSign className="h-5 w-5" />}
        />
        <MetricCard
          title="Conversion Rate"
          value="3.24%"
          change={-2.1}
          changeLabel="vs last month"
          icon={<TrendingUp className="h-5 w-5" />}
        />
        <MetricCard
          title="Page Views"
          value="158,943"
          change={15.3}
          changeLabel="vs last month"
          icon={<MousePointer className="h-5 w-5" />}
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <ChartCard 
          title="Revenue & User Growth" 
          description="Monthly revenue and user acquisition trends"
          className="lg:col-span-2"
        >
          <RevenueChart />
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard 
          title="Traffic Sources" 
          description="Where your users are coming from"
        >
          <TrafficSourceChart />
        </ChartCard>
        
        <ChartCard 
          title="Weekly Conversions" 
          description="Conversion performance by day"
        >
          <ConversionChart />
        </ChartCard>
      </div>
    </div>
  );
};

export default Index;