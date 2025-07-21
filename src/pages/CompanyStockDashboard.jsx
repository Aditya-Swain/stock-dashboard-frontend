import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { TrendingUp, TrendingDown, BarChart3, Search, RefreshCw, Menu, X } from 'lucide-react';

// Companies and thier symbols
const companies = [
  { name: 'Reliance Industries', symbol: 'RELIANCE.NS' },
  { name: 'Tata Consultancy Services', symbol: 'TCS.NS' },
  { name: 'Infosys', symbol: 'INFY.NS' },
  { name: 'State Bank of India', symbol: 'SBIN.NS' },
  { name: 'HDFC Bank', symbol: 'HDFCBANK.NS' },
  { name: 'Hindustan Unilever', symbol: 'HINDUNILVR.NS' },
  { name: 'Kotak Mahindra Bank', symbol: 'KOTAKBANK.NS' },
  { name: 'ICICI Bank', symbol: 'ICICIBANK.NS' },
  { name: 'Bharti Airtel', symbol: 'BHARTIARTL.NS' },
  { name: 'Adani Ports', symbol: 'ADANIPORTS.NS' },
  { name: 'Wipro', symbol: 'WIPRO.NS' },
  { name: 'HCL Technologies', symbol: 'HCLTECH.NS' },
  { name: 'Tech Mahindra', symbol: 'TECHM.NS' },
  { name: 'Axis Bank', symbol: 'AXISBANK.NS' },
  { name: 'Tata Motors', symbol: 'TATAMOTORS.NS' },
  { name: 'Maruti Suzuki', symbol: 'MARUTI.NS' },
  { name: 'Mahindra & Mahindra', symbol: 'M&M.NS' },
  { name: 'Bajaj Finance', symbol: 'BAJFINANCE.NS' },
  { name: 'Bajaj Finserv', symbol: 'BAJAJFINSV.NS' },
  { name: 'Tata Steel', symbol: 'TATASTEEL.NS' },
  { name: 'JSW Steel', symbol: 'JSWSTEEL.NS' },
  { name: 'Power Grid Corp', symbol: 'POWERGRID.NS' },
  { name: 'NTPC', symbol: 'NTPC.NS' },
  { name: 'Larsen & Toubro', symbol: 'LT.NS' },
  { name: 'UltraTech Cement', symbol: 'ULTRACEMCO.NS' },
  { name: 'Asian Paints', symbol: 'ASIANPAINT.NS' },
  { name: 'Nestle India', symbol: 'NESTLEIND.NS' },
  { name: 'Sun Pharma', symbol: 'SUNPHARMA.NS' },
  { name: 'Dr. Reddy\'s Labs', symbol: 'DRREDDY.NS' },
  { name: 'Cipla', symbol: 'CIPLA.NS' },
  { name: 'Divi\'s Labs', symbol: 'DIVISLAB.NS' },
  { name: 'Bajaj Auto', symbol: 'BAJAJ-AUTO.NS' },
  { name: 'Hero MotoCorp', symbol: 'HEROMOTOCO.NS' },
  { name: 'Eicher Motors', symbol: 'EICHERMOT.NS' },
  { name: 'Grasim Industries', symbol: 'GRASIM.NS' },
  { name: 'HDFC Life', symbol: 'HDFCLIFE.NS' },
  { name: 'SBI Life', symbol: 'SBILIFE.NS' },
  { name: 'ICICI Prudential Life', symbol: 'ICICIPRULI.NS' },
  { name: 'Coal India', symbol: 'COALINDIA.NS' },
  { name: 'Oil and Natural Gas Corp', symbol: 'ONGC.NS' },
  { name: 'Britannia Industries', symbol: 'BRITANNIA.NS' },
  { name: 'Tata Power', symbol: 'TATAPOWER.NS' },
  { name: 'IndusInd Bank', symbol: 'INDUSINDBK.NS' },
  { name: 'Shree Cement', symbol: 'SHREECEM.NS' },
  { name: 'Adani Enterprises', symbol: 'ADANIENT.NS' },
  { name: 'Ambuja Cements', symbol: 'AMBUJACEM.NS' },
  { name: 'Dabur India', symbol: 'DABUR.NS' },
  { name: 'Godrej Consumer', symbol: 'GODREJCP.NS' },
  { name: 'Pidilite Industries', symbol: 'PIDILITIND.NS' }
];

const CompanyStockDashboard = () => {
    const [selected, setSelected] = useState(companies[0]);
    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Filter companies based on search term
    const filteredCompanies = companies.filter(company =>
        company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                const url = `https://stock-history-i9qf.onrender.com/stock/${selected.symbol}`;
                const res = await fetch(url);
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const data = await res.json();

                if (data.error) throw new Error(data.error);

                const labels = data.dates;
                const prices = data.prices;

                // Calculate price trend
                const isPositive = prices[prices.length - 1] > prices[0];

                setChartData({
                    labels,
                    datasets: [
                        {
                            label: `${selected.name} (${selected.symbol})`,
                            data: prices,
                            borderWidth: 3,
                            borderColor: isPositive ? '#10b981' : '#ef4444',
                            backgroundColor: isPositive 
                                ? 'linear-gradient(180deg, rgba(16,185,129,0.1) 0%, rgba(16,185,129,0.01) 100%)'
                                : 'linear-gradient(180deg, rgba(239,68,68,0.1) 0%, rgba(239,68,68,0.01) 100%)',
                            fill: true,
                            tension: 0.4,
                            pointBackgroundColor: isPositive ? '#10b981' : '#ef4444',
                            pointBorderColor: '#ffffff',
                            pointBorderWidth: 2,
                            pointRadius: 0,
                            pointHoverRadius: 6,
                        }
                    ]
                });
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [selected]);

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                titleColor: '#ffffff',
                bodyColor: '#ffffff',
                borderColor: 'rgba(255, 255, 255, 0.2)',
                borderWidth: 1,
                cornerRadius: 8,
                displayColors: false,
            }
        },
        scales: {
            x: {
                grid: {
                    color: 'rgba(156, 163, 175, 0.1)',
                },
                ticks: {
                    color: '#6b7280',
                    font: {
                        size: window.innerWidth < 768 ? 10 : 12,
                    },
                    maxTicksLimit: window.innerWidth < 768 ? 4 : 8,
                },
            },
            y: {
                grid: {
                    color: 'rgba(156, 163, 175, 0.1)',
                },
                ticks: {
                    color: '#6b7280',
                    font: {
                        size: window.innerWidth < 768 ? 10 : 12,
                    },
                },
            },
        },
        interaction: {
            intersect: false,
            mode: 'index',
        },
    };

    const handleCompanySelect = (company) => {
        setSelected(company);
        setSidebarOpen(false); // Close sidebar on mobile after selection
    };

    return (
        <div className="flex h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative">
            {/* Mobile Overlay */}
            {sidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed lg:static inset-y-0 left-0 z-50 w-80 bg-white/5 backdrop-blur-xl border-r border-white/10 flex flex-col
                transform transition-transform duration-300 ease-in-out lg:translate-x-0
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                {/* Header */}
                <div className="p-4 lg:p-6 border-b border-white/10">
                    <div className="flex items-center justify-between lg:justify-start gap-3 mb-4">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                                <BarChart3 className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
                            </div>
                            <div>
                                <h1 className="text-lg lg:text-xl font-bold text-white">Stock Dashboard</h1>
                                <p className="text-xs lg:text-sm text-slate-400">Indian Markets</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="lg:hidden p-2 text-slate-400 hover:text-white transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                    
                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search companies..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 lg:py-3 text-sm lg:text-base bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                    </div>
                </div>

                {/* Company List */}
                <div className="flex-1 overflow-y-auto p-2">
                    {filteredCompanies.map(company => {
                        const isSelected = company.symbol === selected.symbol;
                        return (
                            <button
                                key={company.symbol}
                                onClick={() => handleCompanySelect(company)}
                                className={`w-full p-3 lg:p-4 mb-2 rounded-xl text-left transition-all duration-200 group ${
                                    isSelected 
                                        ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 text-white' 
                                        : 'hover:bg-white/5 text-slate-300 hover:text-white'
                                }`}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="min-w-0 flex-1">
                                        <h3 className="font-medium text-xs lg:text-sm leading-tight truncate">{company.name}</h3>
                                        <p className="text-xs text-slate-400 mt-1">{company.symbol}</p>
                                    </div>
                                    {isSelected && (
                                        <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 ml-2"></div>
                                    )}
                                </div>
                            </button>
                        );
                    })}
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0">
                {/* Header */}
                <header className="p-4 lg:p-6 bg-white/5 backdrop-blur-xl border-b border-white/10">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 lg:gap-4 min-w-0 flex-1">
                            <button
                                onClick={() => setSidebarOpen(true)}
                                className="lg:hidden p-2 text-slate-400 hover:text-white transition-colors flex-shrink-0"
                            >
                                <Menu className="w-5 h-5" />
                            </button>
                            <div className="min-w-0 flex-1">
                                <h1 className="text-lg lg:text-2xl font-bold text-white truncate">{selected.name}</h1>
                                <p className="text-sm lg:text-base text-slate-400">{selected.symbol}</p>
                            </div>
                            {chartData && !loading && (
                                <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm flex-shrink-0">
                                    <TrendingUp className="w-4 h-4" />
                                    Live Data
                                </div>
                            )}
                        </div>
                        
                        <button
                            onClick={() => setSelected({...selected})}
                            className="flex items-center gap-2 px-3 lg:px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-white transition-all text-sm lg:text-base flex-shrink-0"
                        >
                            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                            <span className="hidden sm:inline">Refresh</span>
                        </button>
                    </div>
                    
                    {/* Mobile Live Data Indicator */}
                    {chartData && !loading && (
                        <div className="sm:hidden flex items-center gap-2 px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm w-fit mt-3">
                            <TrendingUp className="w-4 h-4" />
                            Live Data
                        </div>
                    )}
                </header>

                {/* Chart Content */}
                <div className="flex-1 p-4 lg:p-6 min-h-0">
                    <div className="h-full bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-4 lg:p-6">
                        {loading && (
                            <div className="h-full flex items-center justify-center">
                                <div className="text-center">
                                    <div className="w-8 h-8 lg:w-12 lg:h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                                    <p className="text-sm lg:text-base text-slate-400">Loading stock data...</p>
                                </div>
                            </div>
                        )}
                        
                        {error && (
                            <div className="h-full flex items-center justify-center">
                                <div className="text-center p-4 lg:p-8 bg-red-500/10 border border-red-500/20 rounded-2xl max-w-sm mx-auto">
                                    <div className="w-8 h-8 lg:w-12 lg:h-12 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <TrendingDown className="w-4 h-4 lg:w-6 lg:h-6 text-red-400" />
                                    </div>
                                    <h3 className="text-base lg:text-lg font-semibold text-red-400 mb-2">Error Loading Data</h3>
                                    <p className="text-sm lg:text-base text-slate-400 break-words">{error}</p>
                                </div>
                            </div>
                        )}
                        
                        {chartData && !loading && !error && (
                            <div className="h-full flex flex-col">
                                <div className="mb-3 lg:mb-4 flex-shrink-0">
                                    <h3 className="text-base lg:text-lg font-semibold text-white mb-1">Price Chart</h3>
                                    <p className="text-sm text-slate-400">1-month price history</p>
                                </div>
                                <div className="flex-1 min-h-0">
                                    <Line data={chartData} options={chartOptions} />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default CompanyStockDashboard;