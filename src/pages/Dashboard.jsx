import { TrendingUp, Users, Target, Clock, Star, ArrowUpRight } from 'lucide-react';

const Dashboard = () => {
    const stats = [
        { label: 'Overall Readiness', value: '78%', icon: <Target className="w-5 h-5" />, trend: '+5%' },
        { label: 'Problems Solved', value: '142', icon: <TrendingUp className="w-5 h-5" />, trend: '+12' },
        { label: 'Mock Interviews', value: '12', icon: <Users className="w-5 h-5" />, trend: '+2' },
        { label: 'Avg. Score', value: '8.4', icon: <Star className="w-5 h-5" />, trend: '+0.5' },
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Welcome back, Jane! 👋</h1>
                <p className="text-gray-500">You are in the top 15% of candidates this week. Keep it up!</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-2 bg-indigo-50 text-primary rounded-lg">
                                {stat.icon}
                            </div>
                            <span className="text-xs font-bold text-green-500 bg-green-50 px-2 py-1 rounded-full flex items-center gap-1">
                                {stat.trend} <ArrowUpRight className="w-3 h-3" />
                            </span>
                        </div>
                        <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
                        <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-bold">Recent Activity</h3>
                        <button className="text-primary text-sm font-bold hover:underline">View All</button>
                    </div>
                    <div className="space-y-6">
                        {[1, 2, 3].map((_, i) => (
                            <div key={i} className="flex gap-4 items-center">
                                <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-primary border border-indigo-100 flex-shrink-0">
                                    <TrendingUp className="w-5 h-5" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-bold text-gray-900">Solved "Merge K Sorted Lists"</p>
                                    <p className="text-xs text-gray-500">3 hours ago • Hard level • Data Structures</p>
                                </div>
                                <div className="text-xs font-bold text-gray-400 flex items-center gap-1">
                                    <Clock className="w-3 h-3" /> 15m
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-primary p-8 rounded-3xl shadow-xl shadow-indigo-100 text-white relative overflow-hidden">
                    <div className="relative z-10">
                        <h3 className="text-xl font-bold mb-2">Next Mock Interview</h3>
                        <p className="text-indigo-100 mb-6 font-medium">Scheduled for Tomorrow at 10:00 AM</p>
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 rounded-full border-2 border-white/20 p-1">
                                <div className="w-full h-full rounded-full bg-white/10 flex items-center justify-center">RD</div>
                            </div>
                            <div>
                                <p className="text-sm font-bold">Robert Downey</p>
                                <p className="text-xs text-indigo-200">Tech Lead at Google</p>
                            </div>
                        </div>
                        <button className="bg-white text-primary px-6 py-3 rounded-xl font-bold hover:bg-opacity-90 transition-all">
                            Prepare Now
                        </button>
                    </div>
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20"></div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
