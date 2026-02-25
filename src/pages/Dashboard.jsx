import React from 'react';
import {
    Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer
} from 'recharts';
import {
    Calendar,
    ChevronRight,
    Play,
    Trophy,
    Activity,
    CheckCircle2,
    Clock,
    ExternalLink
} from 'lucide-react';

// Reusable Card Components (shadcn/ui style)
const Card = ({ children, className = "" }) => (
    <div className={`bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden ${className}`}>
        {children}
    </div>
);

const CardHeader = ({ title, subtitle, icon }) => (
    <div className="p-6 border-b border-gray-50 flex items-center justify-between">
        <div>
            <h3 className="font-bold text-gray-900 leading-none">{title}</h3>
            {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
        </div>
        {icon && <div className="p-2 bg-indigo-50 text-primary rounded-xl">{icon}</div>}
    </div>
);

const CardContent = ({ children, className = "" }) => (
    <div className={`p-6 ${className}`}>{children}</div>
);

// Circular Progress Component
const CircularReadiness = ({ score }) => {
    const size = 180;
    const strokeWidth = 14;
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (score / 100) * circumference;

    return (
        <div className="relative flex items-center justify-center">
            <svg width={size} height={size} className="transform -rotate-90">
                {/* Background Circle */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="currentColor"
                    strokeWidth={strokeWidth}
                    fill="transparent"
                    className="text-gray-100"
                />
                {/* Progress Circle */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="currentColor"
                    strokeWidth={strokeWidth}
                    fill="transparent"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    className="text-primary transition-all duration-1000 ease-out"
                />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-black text-gray-900">{score}<span className="text-lg text-gray-400 font-bold">/100</span></span>
                <span className="text-xs font-bold text-gray-500 uppercase tracking-widest mt-1">Readiness</span>
            </div>
        </div>
    );
};

const Dashboard = () => {
    const radarData = [
        { subject: 'DSA', A: 75, fullMark: 100 },
        { subject: 'System Design', A: 60, fullMark: 100 },
        { subject: 'Comm.', A: 80, fullMark: 100 },
        { subject: 'Resume', A: 85, fullMark: 100 },
        { subject: 'Aptitude', A: 70, fullMark: 100 },
    ];

    const weekDays = [
        { day: 'M', active: true },
        { day: 'T', active: true },
        { day: 'W', active: false },
        { day: 'T', active: true },
        { day: 'F', active: true },
        { day: 'S', active: false },
        { day: 'S', active: false },
    ];

    const assessments = [
        { title: 'DSA Mock Test', time: 'Tomorrow, 10:00 AM', status: 'Upcoming' },
        { title: 'System Design Review', time: 'Wed, 2:00 PM', status: 'Confirmed' },
        { title: 'HR Interview Prep', time: 'Friday, 11:00 AM', status: 'Pending' },
    ];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">Candidate Dashboard</h1>
                    <p className="text-gray-500 font-medium">Tracking your path to your dream job.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="bg-white border border-gray-200 px-4 py-2 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50 transition-all flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-primary" /> Schedule Mock
                    </button>
                    <button className="bg-primary text-white px-5 py-2 rounded-xl text-sm font-bold shadow-lg shadow-indigo-200 hover:bg-opacity-90 transition-all flex items-center gap-2">
                        Resume Builder <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Main Grid: 2 columns on desktop */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* 1. Overall Readiness */}
                <Card className="flex flex-col items-center justify-center py-10">
                    <CardHeader title="Overall Readiness" subtitle="Based on recent assessments" className="w-full" />
                    <CardContent className="flex flex-col items-center pt-8">
                        <CircularReadiness score={72} />
                        <div className="mt-8 grid grid-cols-2 gap-8 text-center w-full max-w-sm">
                            <div>
                                <p className="text-xs font-bold text-gray-400 uppercase">Percentile</p>
                                <p className="text-xl font-black text-gray-900">84th</p>
                            </div>
                            <div>
                                <p className="text-xs font-bold text-gray-400 uppercase">Target Range</p>
                                <p className="text-xl font-black text-green-500">85 - 90</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* 2. Skill Breakdown (Radar Chart) */}
                <Card>
                    <CardHeader title="Skill Breakdown" subtitle="Performance across key areas" icon={<Trophy className="w-5 h-5" />} />
                    <CardContent className="h-[300px] mt-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                                <PolarGrid stroke="#e5e7eb" />
                                <PolarAngleAxis dataKey="subject" tick={{ fill: '#6b7280', fontSize: 12, fontWeight: 600 }} />
                                <Radar
                                    name="Skills"
                                    dataKey="A"
                                    stroke="hsl(245, 58%, 51%)"
                                    fill="hsl(245, 58%, 51%)"
                                    fillOpacity={0.15}
                                />
                            </RadarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Bottom Section Column 1 */}
                <div className="space-y-8">
                    {/* 3. Continue Practice */}
                    <Card className="bg-indigo-900 text-white border-none shadow-xl">
                        <CardContent className="p-8">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <span className="text-[10px] uppercase font-black tracking-widest text-indigo-300 mb-1 block">LAST ACTIVE TOPIC</span>
                                    <h3 className="text-2xl font-black">Dynamic Programming</h3>
                                </div>
                                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                                    <Play className="w-6 h-6 fill-white" />
                                </div>
                            </div>

                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between text-sm font-bold">
                                    <span className="text-indigo-200 uppercase">Overall Progress</span>
                                    <span>3/10 Completed</span>
                                </div>
                                <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                                    <div className="h-full bg-white transition-all duration-1000" style={{ width: '30%' }}></div>
                                </div>
                            </div>

                            <button className="w-full bg-white text-indigo-900 py-4 rounded-2xl font-black hover:bg-indigo-50 transition-all flex items-center justify-center gap-2 group">
                                Continue Learning <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </CardContent>
                    </Card>

                    {/* 4. Weekly Goals */}
                    <Card>
                        <CardHeader title="Weekly Goals" icon={<Activity className="w-5 h-5" />} />
                        <CardContent>
                            <div className="mb-6">
                                <div className="flex justify-between mb-2">
                                    <p className="text-sm font-bold text-gray-700">Problems Solved</p>
                                    <p className="text-sm font-bold text-primary">12/20 this week</p>
                                </div>
                                <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-primary" style={{ width: '60%' }}></div>
                                </div>
                            </div>

                            <div className="flex justify-between items-center bg-gray-50 p-4 rounded-2xl">
                                {weekDays.map((wd, i) => (
                                    <div key={i} className="flex flex-col items-center gap-2">
                                        <span className="text-[10px] font-bold text-gray-400">{wd.day}</span>
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${wd.active ? 'bg-primary text-white shadow-md shadow-indigo-100' : 'bg-gray-100 text-gray-300'
                                            }`}>
                                            {wd.active ? <CheckCircle2 className="w-4 h-4" /> : <div className="w-1.5 h-1.5 rounded-full bg-gray-300" />}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Bottom Section Column 2 */}
                <div className="space-y-8">
                    {/* 5. Upcoming Assessments */}
                    <Card>
                        <CardHeader title="Upcoming Assessments" icon={<Clock className="w-5 h-5" />} />
                        <CardContent className="space-y-4">
                            {assessments.map((a, i) => (
                                <div key={i} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-all border border-transparent hover:border-gray-100 group">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${i === 0 ? 'bg-orange-50 text-orange-500' :
                                            i === 1 ? 'bg-blue-50 text-blue-500' : 'bg-green-50 text-green-500'
                                        }`}>
                                        <Calendar className="w-5 h-5" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-bold text-gray-900">{a.title}</h4>
                                        <p className="text-xs font-medium text-gray-500">{a.time}</p>
                                    </div>
                                    <div className="flex flex-col items-end gap-2">
                                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${i === 0 ? 'bg-orange-100 text-orange-600' :
                                                i === 1 ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'
                                            }`}>
                                            {a.status}
                                        </span>
                                        <ExternalLink className="w-4 h-4 text-gray-300 group-hover:text-primary transition-colors cursor-pointer" />
                                    </div>
                                </div>
                            ))}
                            <button className="w-full mt-4 py-3 text-sm font-bold text-primary hover:bg-indigo-50 rounded-xl transition-all">
                                View All Schedule
                            </button>
                        </CardContent>
                    </Card>

                    {/* Quick Stats Sidebar (Extra) */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white p-4 rounded-3xl border border-gray-100 flex items-center gap-3">
                            <div className="p-2 bg-yellow-50 rounded-lg"><Trophy className="w-4 h-4 text-yellow-600" /></div>
                            <div>
                                <p className="text-[10px] font-bold text-gray-400 uppercase">Streak</p>
                                <p className="text-sm font-black text-gray-900">12 Days</p>
                            </div>
                        </div>
                        <div className="bg-white p-4 rounded-3xl border border-gray-100 flex items-center gap-3">
                            <div className="p-2 bg-pink-50 rounded-lg"><Activity className="w-4 h-4 text-pink-600" /></div>
                            <div>
                                <p className="text-[10px] font-bold text-gray-400 uppercase">Focus</p>
                                <p className="text-sm font-black text-gray-900">4.2h/day</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Dashboard;
