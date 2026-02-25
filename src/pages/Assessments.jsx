import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Plus,
    History as HistoryIcon,
    Zap,
    Building2,
    UserCircle2,
    ArrowRight,
    TrendingUp,
    Target,
    Search,
    AlertTriangle
} from 'lucide-react';
import { analyzeJD, saveToHistory, getHistory } from '../utils/analyzer';

const Assessments = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('new');
    const [formData, setFormData] = useState({ company: '', role: '', jd: '' });
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [history, setHistory] = useState(getHistory());

    const handleAnalyze = () => {
        if (!formData.jd) return;
        setIsAnalyzing(true);

        setTimeout(() => {
            const result = analyzeJD(formData.company, formData.role, formData.jd);
            saveToHistory(result);
            // Ensure we fetch the updated history after saving
            setHistory(getHistory());
            localStorage.setItem('last_result', JSON.stringify(result));
            setIsAnalyzing(false);
            navigate('/dashboard/resources?view=results');
        }, 1500);
    };

    const openHistoryItem = (item) => {
        localStorage.setItem('last_result', JSON.stringify(item));
        navigate('/dashboard/resources?view=results');
    };

    const isJdShort = formData.jd.length > 0 && formData.jd.length < 200;

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">Smart Analysis</h1>
                    <p className="text-gray-500 font-medium tracking-tight">Extract actionable preparation plans from Job Descriptions.</p>
                </div>
            </div>

            <div className="flex gap-1 bg-gray-100 p-1.5 rounded-2xl w-fit">
                <button
                    onClick={() => setActiveTab('new')}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold transition-all ${activeTab === 'new' ? 'bg-white shadow-sm text-primary' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    <Plus className="w-4 h-4" /> New Analysis
                </button>
                <button
                    onClick={() => {
                        setActiveTab('history');
                        setHistory(getHistory());
                    }}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold transition-all ${activeTab === 'history' ? 'bg-white shadow-sm text-primary' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    <HistoryIcon className="w-4 h-4" /> History
                </button>
            </div>

            {activeTab === 'new' ? (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="text-sm font-bold text-gray-700 mb-2 block">Company Name (Optional)</label>
                                    <div className="relative">
                                        <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                                        <input
                                            type="text"
                                            placeholder="e.g. Google"
                                            className="w-full pl-11 pr-4 py-3 bg-gray-50 border-transparent rounded-2xl text-sm focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                                            value={formData.company}
                                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-sm font-bold text-gray-700 mb-2 block">Job Role (Optional)</label>
                                    <div className="relative">
                                        <UserCircle2 className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                                        <input
                                            type="text"
                                            placeholder="e.g. Software Engineer"
                                            className="w-full pl-11 pr-4 py-3 bg-gray-50 border-transparent rounded-2xl text-sm focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                                            value={formData.role}
                                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="text-sm font-bold text-gray-700 mb-2 block">Job Description (Required)</label>
                                <textarea
                                    placeholder="Paste the job description here..."
                                    rows={10}
                                    className="w-full px-6 py-4 bg-gray-50 border-transparent rounded-3xl text-sm focus:ring-2 focus:ring-primary/20 transition-all resize-none font-medium"
                                    value={formData.jd}
                                    onChange={(e) => setFormData({ ...formData, jd: e.target.value })}
                                ></textarea>
                                {isJdShort && (
                                    <div className="mt-4 flex items-center gap-3 p-4 bg-amber-50 text-amber-700 rounded-2xl border border-amber-100 animate-in slide-in-from-top-2">
                                        <AlertTriangle className="w-5 h-5 flex-shrink-0" />
                                        <p className="text-xs font-bold leading-relaxed">
                                            This JD is too short to analyze deeply. Paste full JD for better output. ({formData.jd.length}/200 chars)
                                        </p>
                                    </div>
                                )}
                            </div>

                            <button
                                onClick={handleAnalyze}
                                disabled={!formData.jd || isAnalyzing}
                                className="w-full bg-primary text-white py-4 rounded-2xl font-black shadow-xl shadow-indigo-100 hover:bg-opacity-90 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:grayscale"
                            >
                                {isAnalyzing ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        Extracting Intelligence...
                                    </>
                                ) : (
                                    <>
                                        <Zap className="w-5 h-5 fill-white" /> Start Smart Analysis
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-primary p-8 rounded-3xl text-white shadow-xl shadow-indigo-100 relative overflow-hidden">
                            <div className="relative z-10">
                                <h3 className="text-xl font-bold mb-4">How it works</h3>
                                <div className="space-y-6">
                                    {[
                                        { icon: <Search />, text: "Extracts technical keywords" },
                                        { icon: <Target />, text: "Builds tailored 7-day plan" },
                                        { icon: <TrendingUp />, text: "Calculates readiness score" }
                                    ].map((item, i) => (
                                        <div key={i} className="flex gap-4 items-center">
                                            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-xs">
                                                {item.icon}
                                            </div>
                                            <span className="text-sm font-bold text-indigo-50 leading-tight">{item.text}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-white/5 rounded-full blur-3xl"></div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                    {history.length > 0 ? (
                        <div className="divide-y divide-gray-50">
                            {history.map((item) => {
                                const skills = Object.values(item.extractedSkills || {}).flat().slice(0, 3);
                                return (
                                    <div
                                        key={item.id}
                                        onClick={() => openHistoryItem(item)}
                                        className="p-6 hover:bg-gray-50 cursor-pointer transition-all flex items-center justify-between group"
                                    >
                                        <div className="flex items-center gap-6">
                                            <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex flex-col items-center justify-center text-primary font-bold">
                                                <span className="text-lg leading-none mb-0.5">{item.finalScore || item.readinessScore}</span>
                                                <span className="text-[9px] uppercase tracking-tighter font-black">Score</span>
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-gray-900 group-hover:text-primary transition-colors flex items-center gap-2">
                                                    {item.company || "General Analysis"} — {item.role || "Potential Candidate"}
                                                </h4>
                                                <p className="text-xs font-bold text-gray-400 mt-1 uppercase tracking-wider">
                                                    {new Date(item.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-6">
                                            <div className="hidden md:flex gap-1.5">
                                                {skills.map((s, i) => (
                                                    <span key={i} className="px-2.5 py-1 bg-gray-50 rounded-lg text-[10px] font-black text-gray-400 border border-gray-100">{s}</span>
                                                ))}
                                            </div>
                                            <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="p-24 text-center space-y-6">
                            <div className="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center mx-auto text-gray-300 border border-gray-100 rotate-6 group hover:rotate-0 transition-transform">
                                <HistoryIcon className="w-10 h-10" />
                            </div>
                            <div className="max-w-xs mx-auto">
                                <h3 className="font-bold text-gray-900 text-lg">No history detected</h3>
                                <p className="text-gray-400 text-sm font-medium mt-1">Start your career journey by analyzing your first job description.</p>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Assessments;
