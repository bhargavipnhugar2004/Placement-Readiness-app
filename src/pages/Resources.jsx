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
    Download,
    Copy,
    Building,
    Layers,
    Info,
    AlertCircle,
    FileText
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { updateHistoryEntry } from '../utils/analyzer';

const Resources = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const showResults = searchParams.get('view') === 'results';
    const [result, setResult] = useState(null);
    const [copyStatus, setCopyStatus] = useState('');

    useEffect(() => {
        if (showResults) {
            try {
                const lastResult = localStorage.getItem('last_result');
                if (lastResult) {
                    const parsed = JSON.parse(lastResult);
                    // Schema Migration/Normalization for robust rendering
                    if (!parsed.skillConfidenceMap) parsed.skillConfidenceMap = {};
                    if (!parsed.extractedSkills) parsed.extractedSkills = { other: ["Communication"] };

                    // eslint-disable-next-line react-hooks/set-state-in-effect
                    setResult(parsed);
                }
            } catch {
                console.error("Corrupted view data.");
                navigate('/dashboard/assessments');
            }
        }
    }, [showResults, navigate]);

    const toggleSkill = (skill) => {
        if (!result) return;

        const currentStatus = result.skillConfidenceMap?.[skill] || 'practice';
        const newStatus = currentStatus === 'know' ? 'practice' : 'know';

        const updatedMap = {
            ...(result.skillConfidenceMap || {}),
            [skill]: newStatus
        };

        updateHistoryEntry(result.id, { skillConfidenceMap: updatedMap });

        // Refresh local state from storage to sync calculated score and updatedAt
        const updatedFromStorage = JSON.parse(localStorage.getItem('last_result'));
        setResult(updatedFromStorage);
    };

    const copyToClipboard = (text, label) => {
        navigator.clipboard.writeText(text);
        setCopyStatus(label);
        setTimeout(() => setCopyStatus(''), 2000);
    };

    const downloadTxt = () => {
        if (!result) return;

        let content = `Placement Readiness Analysis: ${result.company || 'N/A'} - ${result.role || 'N/A'}\n`;
        content += `Generated: ${new Date(result.createdAt).toLocaleString()}\n`;
        content += `Final Readiness Score: ${result.finalScore || result.readinessScore || result.baseScore}%\n\n`;

        content += `--- SKILLS ---\n`;
        Object.entries(result.extractedSkills || {}).forEach(([cat, skills]) => {
            content += `${cat}: ${skills.join(', ')}\n`;
        });

        content += `\n--- 7-DAY PLAN ---\n`;
        (result.plan7Days || []).forEach(p => {
            content += `${p.day} [${p.focus}]: ${p.tasks.join(', ')}\n`;
        });

        content += `\n--- ROUNDS ---\n`;
        (result.roundMapping || []).forEach(r => {
            content += `[${r.roundTitle}] Focus: ${r.focusAreas.join(', ')}\n`;
        });

        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `PrepPlan_${result.company || 'Analysis'}.txt`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const categories = [
        { title: 'Company Guides', documents: 12, items: ['Google Interview Handbook', 'Amazon Leadership Principles', 'Meta System Design Guide'] },
        { title: 'Resume Templates', documents: 5, items: ['Software Engineer (New Grad)', 'Senior Developer Role', 'Product Manager (Intern)'] },
        { title: 'DSA Sheets', documents: 8, items: ['Love Babbar 450 DSA', 'Striver A-Z Roadmap', 'LeetCode Top 75'] },
    ];

    if (showResults && result) {
        const skillsList = Object.values(result.extractedSkills || {}).flat();
        const weakSkills = skillsList.filter(s => result.skillConfidenceMap[s] !== 'know').slice(0, 3);

        return (
            <div className="space-y-8 animate-in fade-in duration-700 pb-20">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate('/dashboard/assessments')}
                            className="p-3 bg-white border border-gray-100 rounded-2xl hover:bg-gray-50 transition-all group"
                        >
                            <ArrowLeft className="w-5 h-5 text-gray-500 group-hover:text-primary transition-colors" />
                        </button>
                        <div>
                            <h1 className="text-3xl font-black text-gray-900 tracking-tight">Analysis Results</h1>
                            <p className="text-gray-500 font-medium tracking-tight">
                                {result.company || "General Company"} — {result.role || "Job Role"}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={downloadTxt}
                            className="px-5 py-3 bg-white border border-gray-100 rounded-2xl hover:bg-gray-50 text-gray-600 hover:text-primary transition-all shadow-sm flex items-center gap-2 text-xs font-black uppercase tracking-wider"
                        >
                            <Download className="w-4 h-4" /> Export TXT
                        </button>
                        <div className="flex items-center gap-4 bg-white px-5 py-3 rounded-2xl border border-gray-100 shadow-sm ring-4 ring-indigo-50/50">
                            <div className="text-right">
                                <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest leading-none mb-1">Live Score</p>
                                <p className="text-2xl font-black text-primary leading-none">{result.finalScore || result.readinessScore}%</p>
                            </div>
                            <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-primary">
                                <Trophy className="w-6 h-6" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        {/* Intel Card */}
                        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden group">
                            <div className="flex justify-between items-start mb-8">
                                <div>
                                    <h3 className="text-lg font-bold flex items-center gap-2">
                                        <Building className="w-5 h-5 text-primary" /> Interview Roadmap
                                    </h3>
                                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mt-1">Strategic Round Mapping</p>
                                </div>
                                <div className="flex items-center gap-2 bg-indigo-50 px-3 py-1.5 rounded-xl">
                                    <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                                    <span className="text-[10px] font-black text-primary uppercase tracking-wider">Dynamic Timeline</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <div className="space-y-6">
                                    {result.roundMapping?.map((round, i) => (
                                        <div key={i} className="relative pl-8 pb-6 group/item">
                                            <div className="absolute left-0 top-0.5 w-3.5 h-3.5 rounded-full border-2 border-indigo-100 bg-white group-hover/item:border-primary transition-colors flex items-center justify-center z-10">
                                                <div className="w-1.5 h-1.5 bg-primary rounded-full scale-0 group-hover/item:scale-100 transition-transform"></div>
                                            </div>
                                            {i !== result.roundMapping.length - 1 && (
                                                <div className="absolute left-[6px] top-4 w-0.5 h-full bg-gray-50 group-hover/item:bg-indigo-50 transition-colors"></div>
                                            )}
                                            <div className="space-y-1.5">
                                                <h4 className="text-sm font-black text-gray-900 leading-none">{round.roundTitle}</h4>
                                                <div className="flex flex-wrap gap-1.5">
                                                    {round.focusAreas?.map((f, j) => (
                                                        <span key={j} className="text-[10px] font-bold text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded border border-gray-100">{f}</span>
                                                    ))}
                                                </div>
                                                <p className="text-xs text-gray-500 leading-relaxed font-medium italic">"{round.whyItMatters}"</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="bg-gray-50 rounded-3xl p-6 border border-gray-100 h-fit">
                                    <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                                        <Layers className="w-3.5 h-3.5" /> Prep Strategy
                                    </h4>
                                    <div className="space-y-4">
                                        <p className="text-sm font-bold text-gray-900 leading-tight">Focus on foundational accuracy and behavioral consistency.</p>
                                        <p className="text-xs text-gray-500 leading-relaxed font-bold">Heuristic analysis suggests 65% weightage on Round 1 technical performance.</p>
                                        <div className="mt-4 pt-4 border-t border-gray-200">
                                            <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase">
                                                <Info className="w-3.5 h-3.5" /> Demo Mode Enabled
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Skills with Toggles */}
                        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden">
                            <div className="flex justify-between items-center mb-8">
                                <h3 className="text-lg font-bold flex items-center gap-2">
                                    <Zap className="w-5 h-5 text-primary fill-primary" /> Skill Confidence
                                </h3>
                                <div className="text-[10px] font-black text-gray-400 bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-100">
                                    CLICK TO UPDATE STATUS
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-x-10 gap-y-8">
                                {Object.entries(result.extractedSkills || {}).map(([cat, skills]) => (
                                    <div key={cat} className="space-y-3">
                                        <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest">{cat}</p>
                                        <div className="flex flex-wrap gap-2">
                                            {skills.map((s, i) => {
                                                const isKnown = result.skillConfidenceMap?.[s] === 'know';
                                                return (
                                                    <button
                                                        key={i}
                                                        onClick={() => toggleSkill(s)}
                                                        className={`px-4 py-2 rounded-xl text-xs font-black transition-all border shadow-sm flex items-center gap-2 ${isKnown
                                                            ? 'bg-green-50 text-green-700 border-green-200'
                                                            : 'bg-white text-gray-400 border-gray-100 hover:border-primary'
                                                            }`}
                                                    >
                                                        {isKnown ? <CheckCircle2 className="w-3.5 h-3.5" /> : <div className="w-3 h-3 rounded-full border-2 border-gray-200" />}
                                                        {s}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Questions */}
                        <div className="bg-gray-900 p-8 rounded-3xl text-white shadow-2xl shadow-indigo-200">
                            <div className="flex justify-between items-center mb-8">
                                <h3 className="text-lg font-bold flex items-center gap-2">
                                    <MessageSquare className="w-5 h-5 text-indigo-400" /> Prep Questions
                                </h3>
                                <button onClick={() => copyToClipboard(result.questions.join('\n'), 'Q')} className="text-[10px] font-black text-indigo-400 hover:text-white transition-colors">
                                    {copyStatus === 'Q' ? 'COPIED' : 'COPY ALL'}
                                </button>
                            </div>
                            <div className="grid grid-cols-1 gap-4">
                                {result.questions.map((q, i) => (
                                    <div key={i} className="p-5 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all flex gap-4 group">
                                        <span className="text-indigo-400 font-bold shrink-0">0{i + 1}</span>
                                        <p className="text-sm font-medium leading-relaxed group-hover:text-white transition-colors">{q}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-8">
                        {/* 7 Day Plan */}
                        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden">
                            <div className="flex justify-between items-center mb-8">
                                <h3 className="text-lg font-bold flex items-center gap-2">
                                    <Calendar className="w-5 h-5 text-primary" /> 7-Day Plan
                                </h3>
                            </div>
                            <div className="space-y-8">
                                {result.plan7Days?.map((p, i) => (
                                    <div key={i} className="relative pl-6 group">
                                        <div className="absolute left-0 top-1 w-2 h-2 rounded-full bg-primary/20 group-hover:bg-primary transition-colors"></div>
                                        <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-1.5">{p.day} — {p.focus}</p>
                                        <ul className="space-y-2">
                                            {p.tasks.map((t, j) => (
                                                <li key={j} className="text-xs text-gray-500 font-bold flex items-start gap-2">
                                                    <div className="w-1 h-1 rounded-full bg-gray-200 mt-1.5 shrink-0"></div>
                                                    {t}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Summary Action */}
                        <div className="bg-primary p-8 rounded-3xl text-white shadow-xl shadow-indigo-100 relative overflow-hidden">
                            <div className="relative z-10">
                                <h4 className="font-bold flex items-center gap-2 mb-4">
                                    <AlertCircle className="w-4 h-4" /> Recommended Next
                                </h4>
                                {weakSkills.length > 0 ? (
                                    <div className="space-y-6">
                                        <p className="text-xs text-indigo-100 font-bold leading-relaxed">
                                            Master <span className="text-white underline decoration-wavy">{weakSkills.join(', ')}</span> to reach your target score.
                                        </p>
                                        <button
                                            onClick={() => navigate('/dashboard/practice')}
                                            className="w-full bg-white text-primary py-3.5 rounded-xl font-black text-sm hover:scale-[0.98] transition-all shadow-lg"
                                        >
                                            Start Mastery Path
                                        </button>
                                    </div>
                                ) : (
                                    <p className="text-xs font-bold text-indigo-50 leading-relaxed italic">All skills mastered! Focus on mock sessions now.</p>
                                )}
                            </div>
                            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div>
                <h1 className="text-2xl font-black text-gray-900 tracking-tight">Resources</h1>
                <p className="text-gray-500 font-bold tracking-tight uppercase text-[10px] mt-1">Curated materials to accelerate your career.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {categories.map((cat, i) => (
                    <div key={i} className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col hover:border-primary/20 transition-colors">
                        <div className="p-6 bg-indigo-50/50 border-b border-gray-100 flex justify-between items-center">
                            <h3 className="font-black text-primary flex items-center gap-2 text-sm uppercase tracking-tight">
                                <BookOpen className="w-4 h-4" /> {cat.title}
                            </h3>
                            <span className="text-[10px] font-black text-indigo-300 bg-white px-2 py-1 rounded-lg border border-indigo-50">{cat.documents} FILES</span>
                        </div>
                        <div className="p-6 space-y-4">
                            {cat.items.map((item, j) => (
                                <div key={j} className="flex items-center justify-between group">
                                    <div className="flex items-center gap-3">
                                        <FileText className="w-4 h-4 text-gray-300 group-hover:text-primary transition-colors" />
                                        <span className="text-sm font-bold text-gray-600 group-hover:text-primary transition-colors cursor-pointer">{item}</span>
                                    </div>
                                    <Download className="w-4 h-4 text-gray-200 hover:text-primary transition-all cursor-pointer" />
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
