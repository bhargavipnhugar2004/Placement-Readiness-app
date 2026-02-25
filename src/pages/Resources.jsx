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
    ChevronRight,
    FileText,
    AlertCircle,
    Building,
    Target,
    Layers,
    Info
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
            const lastResult = localStorage.getItem('last_result');
            if (lastResult) {
                const parsed = JSON.parse(lastResult);
                // Ensure map exists for older entries
                if (!parsed.skillConfidenceMap) parsed.skillConfidenceMap = {};
                // eslint-disable-next-line react-hooks/set-state-in-effect
                setResult(parsed);
            }
        }
    }, [showResults]);

    const toggleSkill = (skill) => {
        if (!result) return;

        const currentStatus = result.skillConfidenceMap?.[skill] || 'practice';
        const newStatus = currentStatus === 'know' ? 'practice' : 'know';

        const updatedMap = {
            ...(result.skillConfidenceMap || {}),
            [skill]: newStatus
        };

        // Calculate changes for score
        // Skill known: +2, Skill practice: -2 (relative to base)
        // Actually simpler: Start from baseReadinessScore, and for each entry in map:
        // if 'know' +2, if 'practice' -2
        const skillsList = Object.values(result.extractedSkills).flat();
        let scoreAdjustment = 0;
        skillsList.forEach(s => {
            if (updatedMap[s] === 'know') scoreAdjustment += 2;
            else scoreAdjustment -= 2;
        });

        const newScore = Math.min(100, Math.max(0, (result.baseReadinessScore || result.readinessScore) + scoreAdjustment));

        const updatedResult = {
            ...result,
            skillConfidenceMap: updatedMap,
            readinessScore: newScore
        };

        setResult(updatedResult);
        updateHistoryEntry(result.id, {
            skillConfidenceMap: updatedMap,
            readinessScore: newScore
        });
    };

    const copyToClipboard = (text, label) => {
        navigator.clipboard.writeText(text);
        setCopyStatus(label);
        setTimeout(() => setCopyStatus(''), 2000);
    };

    const downloadTxt = () => {
        if (!result) return;

        let content = `Placement Readiness Analysis: ${result.company} - ${result.role}\n`;
        content += `Date: ${new Date(result.createdAt).toLocaleString()}\n`;
        content += `Overall Readiness Score: ${result.readinessScore}%\n\n`;

        content += `--- EXTRACTED SKILLS ---\n`;
        Object.entries(result.extractedSkills).forEach(([cat, skills]) => {
            content += `${cat}: ${skills.join(', ')}\n`;
        });

        content += `\n--- 7-DAY PREPARATION PLAN ---\n`;
        Object.entries(result.plan).forEach(([day, focus]) => {
            content += `${day}: ${focus}\n`;
        });

        content += `\n--- ROUND-WISE CHECKLIST ---\n`;
        Object.entries(result.checklist).forEach(([round, items]) => {
            content += `[${round}]\n`;
            items.forEach(item => content += `- ${item}\n`);
        });

        content += `\n--- TOP 10 INTERVIEW QUESTIONS ---\n`;
        result.questions.forEach((q, i) => {
            content += `${i + 1}. ${q}\n`;
        });

        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `PrepPlan_${result.company}_${result.role.replace(/\s+/g, '_')}.txt`;
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
        const weakSkills = Object.values(result.extractedSkills).flat()
            .filter(s => result.skillConfidenceMap[s] !== 'know')
            .slice(0, 3);

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
                            <p className="text-gray-500 font-medium">{result.company} — {result.role}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <button
                                onClick={downloadTxt}
                                className="p-3 bg-white border border-gray-100 rounded-xl hover:bg-gray-50 text-gray-600 hover:text-primary transition-all shadow-sm flex items-center gap-2 text-xs font-bold"
                            >
                                <Download className="w-4 h-4" /> Export TXT
                            </button>
                        </div>
                        <div className="flex items-center gap-4 bg-white px-5 py-3 rounded-2xl border border-gray-100 shadow-sm ring-4 ring-indigo-50/50">
                            <div className="text-right">
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">Live Score</p>
                                <p className="text-2xl font-black text-primary leading-none">{result.readinessScore}%</p>
                            </div>
                            <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-primary">
                                <Trophy className="w-6 h-6" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        {/* Company Intel Section */}
                        {result.companyIntel && (
                            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden group">
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <h3 className="text-lg font-bold flex items-center gap-2">
                                            <Building className="w-5 h-5 text-primary" /> Company Intelligence
                                        </h3>
                                        <p className="text-xs text-gray-500 font-medium">Heuristically inferred profiling</p>
                                    </div>
                                    <div className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${result.companyIntel.isEnterprise ? 'bg-indigo-100 text-indigo-700' : 'bg-orange-100 text-orange-700'
                                        }`}>
                                        {result.companyIntel.sizeCategory}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-4">
                                        <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Hiring Philosophy</p>
                                            <p className="text-sm font-bold text-gray-900 mb-1">{result.companyIntel.hiringFocus}</p>
                                            <p className="text-xs text-gray-500 leading-relaxed italic">
                                                "{result.companyIntel.isEnterprise
                                                    ? "Expect standardized evaluation with heavy weightage on foundational accuracy."
                                                    : "Focus on demonstrating ability to deliver working code and adapt to their specific stack."}"
                                            </p>
                                        </div>
                                        <div className="flex gap-4">
                                            <div className="flex-1 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                                <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Industry</p>
                                                <p className="text-sm font-bold text-gray-900">{result.companyIntel.industry}</p>
                                            </div>
                                            <div className="flex-1 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                                <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Prep Style</p>
                                                <p className="text-sm font-bold text-gray-900">{result.companyIntel.isEnterprise ? "Academic" : "Practical"}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                                            <Layers className="w-4 h-4 text-primary" /> Typical Interview Flow
                                        </h4>
                                        <div className="space-y-4 ml-2">
                                            {result.roundFlow?.map((round, i) => (
                                                <div key={i} className="relative pl-6 pb-2 group/round">
                                                    <div className={`absolute left-0 top-1 w-2.5 h-2.5 rounded-full z-10 ${i === 0 ? 'bg-primary animate-pulse' : 'bg-gray-300'
                                                        }`}></div>
                                                    {i !== result.roundFlow.length - 1 && (
                                                        <div className="absolute left-[4px] top-4 w-0.5 h-full bg-gray-100"></div>
                                                    )}
                                                    <div className="space-y-1">
                                                        <p className="text-sm font-bold text-gray-900 group-hover/round:text-primary transition-colors">
                                                            {round.title}: <span className="font-medium text-gray-600">{round.focus}</span>
                                                        </p>
                                                        <p className="text-[11px] text-gray-400 leading-tight italic">"{round.why}"</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8 pt-4 border-t border-gray-50 flex items-center gap-2 text-gray-400">
                                    <Info className="w-3.5 h-3.5" />
                                    <span className="text-[10px] font-bold uppercase tracking-widest">Demo Mode: Company intel generated heuristically.</span>
                                </div>
                            </div>
                        )}

                        {/* Extracted Skills with Toggles */}
                        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-bold flex items-center gap-2">
                                    <Zap className="w-5 h-5 text-primary fill-primary" /> Extracted Intelligence
                                </h3>
                                <span className="text-[10px] font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded-md">CLICK TAGS TO TOGGLE CONFIDENCE</span>
                            </div>
                            <div className="flex flex-wrap gap-6">
                                {Object.entries(result.extractedSkills).map(([cat, skills]) => (
                                    <div key={cat} className="space-y-3 min-w-[150px]">
                                        <p className="text-[10px] font-bold text-gray-400 uppercase ml-1 tracking-wider">{cat}</p>
                                        <div className="flex flex-wrap gap-2">
                                            {skills.map((s, i) => {
                                                const isKnown = result.skillConfidenceMap?.[s] === 'know';
                                                return (
                                                    <button
                                                        key={i}
                                                        onClick={() => toggleSkill(s)}
                                                        className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 ${isKnown
                                                            ? 'bg-green-50 text-green-700 border-green-200 shadow-sm'
                                                            : 'bg-gray-50 text-gray-500 border-gray-100 hover:border-indigo-200'
                                                            }`}
                                                    >
                                                        {isKnown ? <CheckCircle2 className="w-3 h-3" /> : <div className="w-3 h-3 rounded-full border border-gray-300" />}
                                                        {s}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50/50 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
                        </div>

                        {/* Preparation Checklist */}
                        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-bold">Round-wise Preparation Checklist</h3>
                                <button
                                    onClick={() => copyToClipboard(JSON.stringify(result.checklist, null, 2), 'Checklist')}
                                    className="text-xs font-bold text-primary flex items-center gap-1.5 hover:underline"
                                >
                                    {copyStatus === 'Checklist' ? 'Copied!' : <><Copy className="w-3 h-3" /> Copy Info</>}
                                </button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {Object.entries(result.checklist).map(([round, items], idx) => (
                                    <div key={round} className="space-y-4">
                                        <h4 className="font-bold text-gray-900 flex items-center gap-3">
                                            <span className="w-6 h-6 rounded-lg bg-indigo-50 text-primary flex items-center justify-center text-[10px]">{idx + 1}</span>
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
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-bold flex items-center gap-2">
                                    <MessageSquare className="w-5 h-5 text-indigo-400" /> Key Interview Questions
                                </h3>
                                <button
                                    onClick={() => copyToClipboard(result.questions.join('\n'), 'Questions')}
                                    className="text-xs font-bold text-indigo-400 flex items-center gap-1.5 hover:text-white transition-colors"
                                >
                                    {copyStatus === 'Questions' ? 'Copied!' : <><Copy className="w-3 h-3" /> Copy List</>}
                                </button>
                            </div>
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
                        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm relative">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-bold flex items-center gap-2 text-primary">
                                    <Calendar className="w-5 h-5" /> 7-Day Plan
                                </h3>
                                <button
                                    onClick={() => copyToClipboard(Object.entries(result.plan).map(([d, f]) => `${d}: ${f}`).join('\n'), 'Plan')}
                                    className="text-primary"
                                >
                                    {copyStatus === 'Plan' ? <span className="text-[10px] font-bold">COPIED</span> : <Copy className="w-4 h-4" />}
                                </button>
                            </div>
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
                        </div>

                        {/* Action Next Box */}
                        <div className="bg-indigo-900 p-8 rounded-3xl text-white shadow-xl shadow-indigo-100 overflow-hidden relative">
                            <div className="relative z-10">
                                <h4 className="font-bold flex items-center gap-2 mb-4 text-indigo-300">
                                    <AlertCircle className="w-4 h-4" /> Action Next
                                </h4>
                                {weakSkills.length > 0 ? (
                                    <div className="space-y-4">
                                        <p className="text-xs text-indigo-100 leading-relaxed font-medium">
                                            Focused prep needed for: <span className="text-white font-bold">{weakSkills.join(', ')}</span>.
                                        </p>
                                        <button
                                            onClick={() => navigate('/dashboard/practice')}
                                            className="w-full bg-white text-indigo-900 py-3 rounded-xl font-bold hover:bg-indigo-50 transition-all flex items-center justify-center gap-2 text-sm"
                                        >
                                            Start Day 1 Plan now <ArrowLeft className="w-4 h-4 rotate-180" />
                                        </button>
                                    </div>
                                ) : (
                                    <p className="text-xs text-indigo-100 italic">You've mastered all detected skills! Perfect time for a final mock interview.</p>
                                )}
                            </div>
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -mr-16 -mt-16"></div>
                        </div>

                        {/* Prep Tip */}
                        <div className="bg-white p-6 rounded-3xl border border-gray-100 space-y-4">
                            <h4 className="font-bold text-primary flex items-center gap-2">
                                <LayoutDashboard className="w-4 h-4" /> Strategy Tip
                            </h4>
                            <p className="text-xs text-gray-600 leading-relaxed italic">
                                "{result.company} candidates who marked 5+ skills as 'Known' had a 40% higher chance of passing Round 2."
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Same resources list as before
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Resources</h1>
                    <p className="text-gray-500 font-medium">Curated materials to boost your preparation.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {categories.map((cat, i) => (
                    <div key={i} className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
                        <div className="p-6 bg-indigo-50/50 border-b border-gray-100 flex justify-between items-center">
                            <h3 className="font-bold text-primary flex items-center gap-2">
                                <BookOpen className="w-4 h-4" /> {cat.title}
                            </h3>
                            <span className="text-[10px] font-black text-indigo-400 bg-white px-2 py-1 rounded-md border border-indigo-100">
                                {cat.documents} FILES
                            </span>
                        </div>
                        <div className="p-6 space-y-4">
                            {cat.items.map((item, j) => (
                                <div key={j} className="flex items-center justify-between group">
                                    <div className="flex items-center gap-3">
                                        <FileText className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors" />
                                        <span className="text-sm font-semibold text-gray-700 group-hover:text-primary transition-colors cursor-pointer">{item}</span>
                                    </div>
                                    <button className="p-2 bg-gray-50 rounded-lg group-hover:bg-primary group-hover:text-white transition-all">
                                        <Download className="w-3.5 h-3.5" />
                                    </button>
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
