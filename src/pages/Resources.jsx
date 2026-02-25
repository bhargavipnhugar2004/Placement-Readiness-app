import { useSearchParams, useNavigate } from 'react-router-dom';
import {
    Zap,
    CheckCircle2,
    Calendar,
    MessageSquare,
    ArrowLeft,
    Trophy,
    LayoutDashboard,
    Clock,
    BookOpen,
    Download
} from 'lucide-react';
import { useEffect, useState } from 'react';

const Resources = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const showResults = searchParams.get('view') === 'results';
    const [result, setResult] = useState(null);

    useEffect(() => {
        if (showResults) {
            const lastResult = localStorage.getItem('last_result');
            if (lastResult) setResult(JSON.parse(lastResult));
        }
    }, [showResults]);

    const categories = [
        { title: 'Company Guides', documents: 12, items: ['Google Interview Handbook', 'Amazon Leadership Principles', 'Meta System Design Guide'] },
        { title: 'Resume Templates', documents: 5, items: ['Software Engineer (New Grad)', 'Senior Developer Role', 'Product Manager (Intern)'] },
        { title: 'DSA Sheets', documents: 8, items: ['Love Babbar 450 DSA', 'Striver A-Z Roadmap', 'LeetCode Top 75'] },
    ];

    if (showResults && result) {
        return (
            <div className="space-y-8 animate-in fade-in duration-700">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate('/dashboard/assessments')}
                            className="p-3 bg-white border border-gray-100 rounded-2xl hover:bg-gray-50 transition-all group"
                        >
                            <ArrowLeft className="w-5 h-5 text-gray-500 group-hover:text-primary transition-colors" />
                        </button>
                        <div>
                            <h1 className="text-3xl font-black text-gray-900 tracking-tight">Analysis Results</h1>
                            <p className="text-gray-500 font-medium">{result.company} — {result.role}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 bg-white p-3 rounded-2xl border border-gray-100 shadow-sm">
                        <div className="text-right">
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Readiness Score</p>
                            <p className="text-2xl font-black text-primary leading-none">{result.readinessScore}%</p>
                        </div>
                        <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-primary">
                            <Trophy className="w-6 h-6" />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        {/* Extracted Skills */}
                        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                                <Zap className="w-5 h-5 text-primary fill-primary" /> Extracted Intelligence
                            </h3>
                            <div className="flex flex-wrap gap-3">
                                {Object.entries(result.extractedSkills).map(([cat, skills]) => (
                                    <div key={cat} className="space-y-2">
                                        <p className="text-[10px] font-bold text-gray-400 uppercase ml-1">{cat}</p>
                                        <div className="flex flex-wrap gap-2">
                                            {skills.map((s, i) => (
                                                <span key={i} className="px-3 py-1.5 bg-indigo-50 text-primary rounded-xl text-xs font-bold border border-indigo-100">
                                                    {s}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Preparation Checklist */}
                        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                            <h3 className="text-lg font-bold mb-6">Round-wise Preparation Checklist</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {Object.entries(result.checklist).map(([round, items], idx) => (
                                    <div key={round} className="space-y-4">
                                        <h4 className="font-bold text-gray-900 flex items-center gap-3">
                                            <span className="w-6 h-6 rounded-lg bg-gray-100 flex items-center justify-center text-[10px]">{idx + 1}</span>
                                            {round}
                                        </h4>
                                        <ul className="space-y-3">
                                            {items.map((item, i) => (
                                                <li key={i} className="flex items-start gap-3 text-sm text-gray-600 group">
                                                    <CheckCircle2 className="w-4 h-4 text-gray-200 mt-0.5 group-hover:text-primary transition-colors cursor-pointer" />
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Likely Questions */}
                        <div className="bg-gray-900 p-8 rounded-3xl text-white shadow-xl shadow-indigo-100">
                            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                                <MessageSquare className="w-5 h-5 text-indigo-400" /> Key Interview Questions
                            </h3>
                            <div className="space-y-4">
                                {result.questions.map((q, i) => (
                                    <div key={i} className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all cursor-default group">
                                        <span className="text-indigo-400 font-bold">Q{i + 1}:</span>
                                        <p className="text-sm font-medium leading-relaxed">{q}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-8">
                        {/* 7-Day Plan */}
                        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                                <Calendar className="w-5 h-5 text-primary" /> Personalized 7-Day Plan
                            </h3>
                            <div className="space-y-6">
                                {Object.entries(result.plan).map(([day, focus], idx) => (
                                    <div key={day} className="flex gap-4 relative group">
                                        <div className="flex flex-col items-center flex-shrink-0">
                                            <div className="w-2.5 h-2.5 rounded-full bg-primary ring-4 ring-indigo-50 z-10"></div>
                                            {idx !== Object.entries(result.plan).length - 1 && <div className="w-0.5 h-full bg-gray-100 absolute top-2.5"></div>}
                                        </div>
                                        <div className="pb-6">
                                            <p className="text-[10px] font-bold text-primary uppercase tracking-widest leading-none mb-1">{day}</p>
                                            <p className="text-sm text-gray-600 leading-relaxed font-medium">{focus}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button className="w-full mt-4 py-4 bg-primary text-white rounded-2xl font-black shadow-lg shadow-indigo-100 hover:bg-opacity-90 transition-all flex items-center justify-center gap-2">
                                Save to Calendar <Calendar className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="bg-indigo-50 p-6 rounded-3xl border border-indigo-100 space-y-4">
                            <h4 className="font-bold text-primary flex items-center gap-2">
                                <LayoutDashboard className="w-4 h-4" /> Prep Tip
                            </h4>
                            <p className="text-xs text-indigo-900 leading-relaxed italic">
                                "Technical rounds for {result.company} often focus on {result.extractedSkills["Core CS"]?.[0] || "core problem solving"}. Make sure you can explain your most complex project in 2 minutes."
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Resources</h1>
                <p className="text-gray-500">Curated materials to boost your preparation.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {categories.map((cat, i) => (
                    <div key={i} className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                        <div className="p-6 bg-indigo-50/50 border-b border-gray-100 flex justify-between items-center">
                            <h3 className="font-bold text-primary flex items-center gap-2">
                                <BookOpen className="w-4 h-4" /> {cat.title}
                            </h3>
                            <span className="text-xs font-bold text-indigo-400">{cat.documents} files</span>
                        </div>
                        <div className="p-6 space-y-4">
                            {cat.items.map((item, j) => (
                                <div key={j} className="flex items-center justify-between group">
                                    <div className="flex items-center gap-3">
                                        <Clock className="w-4 h-4 text-gray-400" />
                                        <span className="text-sm font-medium text-gray-700 group-hover:text-primary transition-colors cursor-pointer">{item}</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <Download className="w-4 h-4 text-gray-300 hover:text-primary transition-colors cursor-pointer" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Resources;
