import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Code, Video, BarChart3, ChevronRight, Zap, AlertTriangle, Building2, UserCircle2 } from 'lucide-react';
import { analyzeJD, saveToHistory } from '../utils/analyzer';

const LandingPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ company: '', role: '', jd: '' });
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    const handleAnalyze = () => {
        if (!formData.jd || formData.jd.length < 5) return;
        setIsAnalyzing(true);

        setTimeout(() => {
            const result = analyzeJD(formData.company, formData.role, formData.jd);
            saveToHistory(result);
            localStorage.setItem('last_result', JSON.stringify(result));
            setIsAnalyzing(false);
            navigate('/dashboard/resources?view=results');
        }, 1500);
    };

    const isJdShort = formData.jd.length > 0 && formData.jd.length < 200;

    const features = [
        {
            title: "Smart JD Analysis",
            description: "Extract skills, rounds, and 7-day plans instantly from any job description.",
            icon: <Zap className="w-10 h-10 text-primary" />,
        },
        {
            title: "Practice Problems",
            description: "Solved 1000+ coding challenges from top tech companies.",
            icon: <Code className="w-10 h-10 text-primary" />,
        },
        {
            title: "Mock Interviews",
            description: "Real-time interview simulation with AI-powered feedback.",
            icon: <Video className="w-10 h-10 text-primary" />,
        },
    ];

    return (
        <div className="min-h-screen flex flex-col bg-white">
            {/* Navbar */}
            <nav className="border-b border-gray-100 sticky top-0 bg-white/80 backdrop-blur-md z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-indigo-100">
                                <Zap className="text-white w-6 h-6 fill-white" />
                            </div>
                            <span className="text-2xl font-black text-gray-900 tracking-tighter">Placement Prep</span>
                        </div>
                        <div className="hidden md:flex items-center gap-10">
                            <a href="#analyze" className="text-sm font-black text-gray-400 hover:text-primary transition-colors uppercase tracking-widest">Analyze JD</a>
                            <a href="#features" className="text-sm font-black text-gray-400 hover:text-primary transition-colors uppercase tracking-widest">Features</a>
                            <button
                                onClick={() => navigate('/dashboard')}
                                className="bg-gray-900 hover:bg-black text-white px-8 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-xl shadow-gray-200"
                            >
                                Get Started
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section with Integrated Analysis Form */}
            <section id="analyze" className="relative py-20 lg:py-24 overflow-hidden border-b border-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div className="text-left space-y-8">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-indigo-50 text-primary text-[10px] font-black uppercase tracking-widest">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                                </span>
                                AI-Powered Readiness Analysis
                            </div>
                            <h1 className="text-6xl lg:text-7xl font-black text-gray-900 tracking-tighter leading-[0.9]">
                                Optimize your <span className="text-primary italic">Preparation</span> Journey.
                            </h1>
                            <p className="text-lg text-gray-500 max-w-xl leading-relaxed font-medium">
                                Paste any job description and let our heuristic engine build your personalized
                                interview roadmap, 7-day plan, and readiness score instantly.
                            </p>
                            <div className="flex items-center gap-8 pt-4">
                                <div className="space-y-1">
                                    <p className="text-3xl font-black text-gray-900 italic">25k+</p>
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Active Users</p>
                                </div>
                                <div className="w-px h-10 bg-gray-100"></div>
                                <div className="space-y-1">
                                    <p className="text-3xl font-black text-gray-900 italic">98%</p>
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Success Rate</p>
                                </div>
                            </div>
                        </div>

                        {/* Analysis Card */}
                        <div className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-2xl shadow-indigo-100 relative z-10 space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Company</label>
                                    <div className="relative">
                                        <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 w-4 h-4" />
                                        <input
                                            type="text"
                                            placeholder="Google"
                                            className="w-full pl-11 pr-4 py-4 bg-gray-50 border-none rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary/10 transition-all"
                                            value={formData.company}
                                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Role</label>
                                    <div className="relative">
                                        <UserCircle2 className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 w-4 h-4" />
                                        <input
                                            type="text"
                                            placeholder="Engineer"
                                            className="w-full pl-11 pr-4 py-4 bg-gray-50 border-none rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary/10 transition-all"
                                            value={formData.role}
                                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Job Description (Required)</label>
                                <textarea
                                    placeholder="Paste job description here..."
                                    rows={6}
                                    className="w-full px-6 py-5 bg-gray-50 border-none rounded-[32px] text-sm font-bold focus:ring-4 focus:ring-primary/10 transition-all resize-none"
                                    value={formData.jd}
                                    onChange={(e) => setFormData({ ...formData, jd: e.target.value })}
                                ></textarea>
                                {isJdShort && (
                                    <div className="flex items-center gap-2 p-3 bg-amber-50 text-amber-700 rounded-2xl border border-amber-100 mt-2 animate-in fade-in slide-in-from-top-2">
                                        <AlertTriangle className="w-4 h-4" />
                                        <p className="text-[10px] font-black italic">This JD is too short to analyze deeply. Paste full JD for better results.</p>
                                    </div>
                                )}
                            </div>

                            <button
                                onClick={handleAnalyze}
                                disabled={!formData.jd || isAnalyzing}
                                className="w-full py-5 bg-primary text-white rounded-[24px] font-black text-sm uppercase tracking-widest shadow-xl shadow-indigo-100 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:grayscale"
                            >
                                {isAnalyzing ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                ) : (
                                    <>Analyze Readiness <ChevronRight className="w-5 h-5" /></>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="absolute top-1/2 left-0 -translate-y-1/2 -ml-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-50/30 rounded-full blur-3xl"></div>
            </section>

            {/* Features Grid */}
            <section id="features" className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <p className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-4">Core Platform</p>
                    <h2 className="text-4xl font-black text-gray-900 mb-20 tracking-tight">Everything you need to succeed.</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {features.map((feature, index) => (
                            <div key={index} className="bg-white p-12 rounded-[48px] border border-gray-100 hover:border-primary/20 hover:shadow-2xl hover:shadow-indigo-100 transition-all group text-left relative overflow-hidden">
                                <div className="mb-8 inline-block p-5 rounded-3xl bg-indigo-50 group-hover:bg-primary group-hover:text-white transition-all shadow-lg shadow-indigo-50">
                                    {feature.icon}
                                </div>
                                <h3 className="text-2xl font-black text-gray-900 mb-4 tracking-tight">{feature.title}</h3>
                                <p className="text-gray-500 leading-relaxed font-semibold text-sm">{feature.description}</p>
                                <div className="absolute bottom-12 right-12 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <ChevronRight className="w-8 h-8 text-indigo-100" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="mt-auto py-16 border-t border-gray-50 bg-gray-50/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-10">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                            <Zap className="text-primary w-4 h-4 fill-primary" />
                        </div>
                        <span className="font-black text-gray-900 tracking-tight uppercase text-sm">Placement Prep</span>
                    </div>
                    <p className="text-gray-400 text-xs font-black uppercase tracking-widest">
                        © {new Date().getFullYear()} Precision Engineering for Careers.
                    </p>
                    <div className="flex gap-8">
                        <a href="#" className="text-xs font-black text-gray-400 hover:text-primary transition-colors uppercase tracking-widest">Docs</a>
                        <a href="#" className="text-xs font-black text-gray-400 hover:text-primary transition-colors uppercase tracking-widest">Privacy</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
