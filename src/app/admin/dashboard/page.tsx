'use client'

import React, { useEffect, useState } from 'react';
import StatCard from '@/components/StatCard';
import { FaUsers, FaDollarSign, FaRobot, FaGlobe, FaHandHoldingUsd } from 'react-icons/fa';
import { axiosService } from '@/services/axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

// Dashboard analytics interfaces
interface DashboardAnalytics {
  totalCustomers: number;
  totalBidAmount: number;
  totalReleaseAmount: number;
  botAccounts: number;
  uniqueVisitors: number;
}

interface ChartData {
  userRegistrations: {
    labels: string[];
    data: number[];
  };
  revenue: {
    labels: string[];
    bids: number[];
    releases: number[];
  };
  visitorDemographics: {
    labels: string[];
    data: number[];
  };
}

const DashboardPage = () => {
  const [analytics, setAnalytics] = useState<DashboardAnalytics>({
    totalCustomers: 0,
    totalBidAmount: 0,
    totalReleaseAmount: 0,
    botAccounts: 0,
    uniqueVisitors: 0
  });
  const [chartData, setChartData] = useState<ChartData>({
    userRegistrations: { labels: [], data: [] },
    revenue: { labels: [], bids: [], releases: [] },
    visitorDemographics: { labels: [], data: [] }
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [dateRange, setDateRange] = useState<string>('7days');

  const fetchAnalyticsData = async (range: string) => {
    setIsLoading(true);
    try {
      const [analyticsRes, chartDataRes] = await Promise.all([
        axiosService.get(`/admin/analytics?range=${range}`),
        axiosService.get(`/admin/chart-data?range=${range}`)
      ]);
      
      setAnalytics({
        totalCustomers: analyticsRes.data.totalCustomers || 0,
        totalBidAmount: analyticsRes.data.totalBidAmount || 0,
        totalReleaseAmount: analyticsRes.data.totalReleaseAmount || 0,
        botAccounts: analyticsRes.data.botAccounts || 0,
        uniqueVisitors: analyticsRes.data.uniqueVisitors || 0
      });

      setChartData(chartDataRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalyticsData(dateRange);
  }, [dateRange]);

  const handleFilterChange = (range: string) => {
    setDateRange(range);
  };

  const userRegistrationChartConfig = {
    data: {
      labels: chartData.userRegistrations.labels,
      datasets: [
        {
          label: 'New Users',
          data: chartData.userRegistrations.data,
          borderColor: 'rgba(139, 69, 19, 1)',
          backgroundColor: 'rgba(139, 69, 19, 0.1)',
          tension: 0.4,
          borderWidth: 3,
          pointBackgroundColor: 'rgba(139, 69, 19, 1)',
          pointBorderColor: '#ffffff',
          pointBorderWidth: 2,
          pointRadius: 6,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { 
          position: 'top' as const,
          labels: {
            color: '#17121c',
            font: { size: 14, weight: 'bold' as const }
          }
        },
        title: { 
          display: true, 
          text: 'User Registrations Trend',
          color: '#17121c',
          font: { size: 16, weight: 'bold' as const }
        }
      },
      scales: {
        y: {
          grid: { color: 'rgba(139, 69, 19, 0.1)' },
          ticks: { color: '#17121c' }
        },
        x: {
          grid: { color: 'rgba(139, 69, 19, 0.1)' },
          ticks: { color: '#17121c' }
        }
      }
    }
  };

  const revenueChartConfig = {
    data: {
      labels: chartData.revenue.labels,
      datasets: [
        {
          label: 'Bids',
          data: chartData.revenue.bids,
          backgroundColor: 'rgba(139, 69, 19, 0.7)',
          borderColor: 'rgba(139, 69, 19, 1)',
          borderWidth: 2,
        },
        {
          label: 'Releases',
          data: chartData.revenue.releases,
          backgroundColor: 'rgba(186, 158, 214, 0.7)',
          borderColor: 'rgba(186, 158, 214, 1)',
          borderWidth: 2,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { 
          position: 'top' as const,
          labels: {
            color: '#17121c',
            font: { size: 14, weight: 'bold' as const }
          }
        },
        title: { 
          display: true, 
          text: 'Revenue Analysis',
          color: '#17121c',
          font: { size: 16, weight: 'bold' as const }
        }
      },
      scales: {
        y: {
          grid: { color: 'rgba(139, 69, 19, 0.1)' },
          ticks: { color: '#17121c' }
        },
        x: {
          grid: { color: 'rgba(139, 69, 19, 0.1)' },
          ticks: { color: '#17121c' }
        }
      }
    }
  };

  const demographicsChartConfig = {
    data: {
      labels: chartData.visitorDemographics.labels,
      datasets: [
        {
          data: chartData.visitorDemographics.data,
          backgroundColor: [
            'rgba(139, 69, 19, 0.8)',
            'rgba(186, 158, 214, 0.8)',
            'rgba(255, 107, 157, 0.8)',
            'rgba(235, 228, 241, 0.8)',
          ],
          borderColor: [
            'rgba(139, 69, 19, 1)',
            'rgba(186, 158, 214, 1)',
            'rgba(255, 107, 157, 1)',
            'rgba(235, 228, 241, 1)',
          ],
          borderWidth: 2,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      aspectRatio: 1.5,
      layout: {
        padding: {
          left: 10,
          right: 10,
          top: 0,
          bottom: 0
        }
      },
      plugins: {
        legend: { 
          position: 'right' as const,
          labels: {
            boxWidth: 16,
            color: '#17121c',
            font: { size: 14 }
          }
        },
        title: { 
          display: false 
        }
      }
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-serif text-transparent bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text mb-2">
          🎪 Admin Dashboard
        </h1>
        <p className="text-foreground/70 font-sans">Monitor your event management platform analytics and performance</p>
      </div>

      {/* Filters Section */}
      <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-white/30">
        <div className="flex flex-wrap gap-4">
          <h3 className="text-lg font-semibold text-foreground font-sans mr-4 flex items-center">📊 Time Range:</h3>
          <button 
            className={`px-6 py-2 rounded-xl font-sans font-medium transition-all duration-300 ${
              dateRange === '7days' 
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg' 
                : 'bg-gradient-to-r from-purple-50 to-pink-50 text-purple-600 border border-purple-200 hover:from-purple-100 hover:to-pink-100'
            }`}
            onClick={() => handleFilterChange('7days')}
          >
            Last 7 days
          </button>
          <button 
            className={`px-6 py-2 rounded-xl font-sans font-medium transition-all duration-300 ${
              dateRange === '30days' 
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg' 
                : 'bg-gradient-to-r from-purple-50 to-pink-50 text-purple-600 border border-purple-200 hover:from-purple-100 hover:to-pink-100'
            }`}
            onClick={() => handleFilterChange('30days')}
          >
            Last 30 days
          </button>
          <button 
            className={`px-6 py-2 rounded-xl font-sans font-medium transition-all duration-300 ${
              dateRange === '90days' 
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg' 
                : 'bg-gradient-to-r from-purple-50 to-pink-50 text-purple-600 border border-purple-200 hover:from-purple-100 hover:to-pink-100'
            }`}
            onClick={() => handleFilterChange('90days')}
          >
            Last 90 days
          </button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        <StatCard 
          title="Total Customers" 
          value={isLoading ? "Loading..." : analytics.totalCustomers.toLocaleString()} 
          label="Users" 
          icon={<FaUsers />} 
          trend={`${dateRange === '7days' ? 'Past week' : dateRange === '30days' ? 'Past month' : 'Past 3 months'}`} 
        />
        <StatCard 
          title="Total Bid Amount" 
          value={isLoading ? "Loading..." : `$${analytics.totalBidAmount.toLocaleString()}`} 
          label="Bids" 
          icon={<FaDollarSign />} 
          trend={`${dateRange === '7days' ? 'Past week' : dateRange === '30days' ? 'Past month' : 'Past 3 months'}`} 
        />
        <StatCard 
          title="Total Release Amount" 
          value={isLoading ? "Loading..." : `$${analytics.totalReleaseAmount.toLocaleString()}`} 
          label="Paid" 
          icon={<FaHandHoldingUsd />} 
          trend={`${dateRange === '7days' ? 'Past week' : dateRange === '30days' ? 'Past month' : 'Past 3 months'}`} 
        />
        <StatCard 
          title="Bot Accounts" 
          value={isLoading ? "Loading..." : analytics.botAccounts.toLocaleString()} 
          label="Bots" 
          icon={<FaRobot />} 
          trend={`${dateRange === '7days' ? 'Past week' : dateRange === '30days' ? 'Past month' : 'Past 3 months'}`} 
        />
        <StatCard 
          title="Unique Visitors" 
          value={isLoading ? "Loading..." : analytics.uniqueVisitors.toLocaleString()} 
          label="Visitors" 
          icon={<FaGlobe />} 
          trend={`${dateRange === '7days' ? 'Past week' : dateRange === '30days' ? 'Past month' : 'Past 3 months'}`} 
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-white/30 hover:shadow-purple-300/50 transition-all duration-300">
          <h3 className="font-bold text-lg text-foreground font-serif mb-4 flex items-center">
            📈 User Registrations Over Time
          </h3>
          <div className="h-64">
            {isLoading ? (
              <div className="h-full flex items-center justify-center">
                <div className="flex flex-col items-center gap-y-3">
                  <div className="animate-spin rounded-full h-8 w-8 border-4 border-gradient-to-r from-purple-600 to-pink-600 border-t-transparent"></div>
                  <span className="text-foreground/70 font-sans">Loading chart data...</span>
                </div>
              </div>
            ) : (
              <Line {...userRegistrationChartConfig} />
            )}
          </div>
        </div>
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-white/30 hover:shadow-purple-300/50 transition-all duration-300">
          <h3 className="font-bold text-lg text-foreground font-serif mb-4 flex items-center">
            💰 Revenue Analysis
          </h3>
          <div className="h-64">
            {isLoading ? (
              <div className="h-full flex items-center justify-center">
                <div className="flex flex-col items-center gap-y-3">
                  <div className="animate-spin rounded-full h-8 w-8 border-4 border-gradient-to-r from-purple-600 to-pink-600 border-t-transparent"></div>
                  <span className="text-foreground/70 font-sans">Loading chart data...</span>
                </div>
              </div>
            ) : (
              <Bar {...revenueChartConfig} />
            )}
          </div>
        </div>
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-white/30 hover:shadow-purple-300/50 transition-all duration-300">
          <h3 className="font-bold text-lg text-foreground font-serif mb-4 flex items-center">
            📊 Bid vs Release Amount
          </h3>
          <div className="h-64">
            {isLoading ? (
              <div className="h-full flex items-center justify-center">
                <div className="flex flex-col items-center gap-y-3">
                  <div className="animate-spin rounded-full h-8 w-8 border-4 border-gradient-to-r from-purple-600 to-pink-600 border-t-transparent"></div>
                  <span className="text-foreground/70 font-sans">Loading chart data...</span>
                </div>
              </div>
            ) : (
              <Bar {...revenueChartConfig} />
            )}
          </div>
        </div>
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-white/30 hover:shadow-purple-300/50 transition-all duration-300">
          <h3 className="font-bold text-lg text-foreground font-serif mb-4 flex items-center">
            🌍 Visitor Demographics
          </h3>
          <div className="h-64 max-h-64 w-full flex justify-center items-center">
            {isLoading ? (
              <div className="h-full flex items-center justify-center">
                <div className="flex flex-col items-center gap-y-3">
                  <div className="animate-spin rounded-full h-8 w-8 border-4 border-gradient-to-r from-purple-600 to-pink-600 border-t-transparent"></div>
                  <span className="text-foreground/70 font-sans">Loading chart data...</span>
                </div>
              </div>
            ) : (
              <div className="w-4/5 h-auto max-w-[280px]">
                <Doughnut {...demographicsChartConfig} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;