import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    CheckSquare,
    AlertCircle,
    RotateCcw,
    ChevronRight,
    Zap,
    Info
} from 'lucide-react';

const TEST_ITEMS = [
    { id: 'jd-req', title: 'JD required validation works', hint: 'Try submitting the form on Home or Assessments with an empty JD box.' },
    { id: 'short-jd', title: 'Short JD warning shows for <200 chars', hint: 'Paste a small sentence and verify the amber Alert appears.' },
    { id: 'skills-group', title: 'Skills extraction groups correctly', hint: 'Paste a JD with "React" and "DSA" and check if they appear in Web and Core CS respectively.' },
    { id: 'round-map', title: 'Round mapping changes based on company + skills', hint: 'Test "Amazon" vs an unknown startup name.' },
    { id: 'score-det', title: 'Score calculation is deterministic', hint: 'Same JD should yield the same base score every time.' },
    { id: 'live-score', title: 'Skill toggles update score live', hint: 'Click a skill tag in Results and verify the top-right score moves ±2%.' },
    { id: 'persistence', title: 'Changes persist after refresh', hint: 'Refresh the browser after toggling skills; they should stay green.' },
    { id: 'history-sync', title: 'History saves and loads correctly', hint: 'Check the "History" tab in Assessments for your previous runs.' },
    { id: 'export-copy', title: 'Export buttons copy the correct content', hint: 'Download the TXT and click "Copy Plan" to verify content.' },
    { id: 'no-errors', title: 'No console errors on core pages', hint: 'Open Chrome DevTools (F12) and browse results without red errors.' }
];

const TestChecklist = () => {
    const navigate = useNavigate();
    const [checked, setChecked] = useState(() => {
        const saved = localStorage.getItem('prp_test_checklist');
        return saved ? JSON.parse(saved) : {};
    });

    useEffect(() => {
        localStorage.setItem('prp_test_checklist', JSON.stringify(checked));
    }, [checked]);

    const toggle = (id) => {
        setChecked(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const reset = () => {
        if (window.confirm("Reseting will lock shipping again. Continue?")) {
            setChecked({});
        }
    };

    const passedCount = Object.values(checked).filter(Boolean).length;
    const isAllPassed = passedCount === TEST_ITEMS.length;

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-20 px-4 font-sans">
            <div className="max-w-2xl w-full space-y-8 animate-in fade-in duration-500">

                {/* Header Card */}
                <div className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-2xl shadow-indigo-100/50 relative overflow-hidden">
                    <div className="flex justify-between items-start mb-10">
                        <div className="space-y-2">
                            <h1 className="text-3xl font-black text-gray-900 tracking-tighter uppercase">QA Checklist</h1>
                            <div className="flex gap-2 items-center">
                                <div className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${isAllPassed ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                                    Tests Passed: {passedCount} / {TEST_ITEMS.length}
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={reset}
                            className="p-3 bg-gray-50 text-gray-400 hover:text-primary rounded-2xl transition-colors"
                            title="Reset Checklist"
                        >
                            <RotateCcw className="w-5 h-5" />
                        </button>
                    </div>

                    {!isAllPassed && (
                        <div className="mb-10 flex items-center gap-4 p-5 bg-amber-50 rounded-3xl border border-amber-100/50 text-amber-700">
                            <AlertCircle className="w-6 h-6 shrink-0" />
                            <p className="text-sm font-black uppercase tracking-tight">Fix all issues before shipping.</p>
                        </div>
                    )}

                    <div className="space-y-4">
                        {TEST_ITEMS.map((item) => (
                            <div
                                key={item.id}
                                onClick={() => toggle(item.id)}
                                className={`p-5 rounded-3xl border transition-all cursor-pointer group flex items-start gap-4 ${checked[item.id]
                                        ? 'bg-green-50/30 border-green-100'
                                        : 'bg-white border-gray-100 hover:border-primary/20'
                                    }`}
                            >
                                <div className={`mt-1 shrink-0 w-6 h-6 rounded-lg flex items-center justify-center transition-all ${checked[item.id] ? 'bg-green-500 text-white' : 'bg-gray-50 border border-gray-100 text-transparent group-hover:bg-gray-100'
                                    }`}>
                                    <CheckSquare className="w-4 h-4" />
                                </div>
                                <div className="space-y-1">
                                    <p className={`text-sm font-black transition-colors ${checked[item.id] ? 'text-green-700' : 'text-gray-900'}`}>
                                        {item.title}
                                    </p>
                                    <p className="text-[10px] font-bold text-gray-400 leading-relaxed uppercase tracking-wider flex items-center gap-1">
                                        <Info className="w-3 h-3" /> {item.hint}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={() => navigate('/prp/08-ship')}
                        className={`w-full mt-10 py-5 rounded-[24px] font-black text-sm uppercase tracking-widest transition-all shadow-xl flex items-center justify-center gap-3 ${isAllPassed
                                ? 'bg-primary text-white shadow-indigo-100 hover:translate-y-[-2px] active:scale-[0.98]'
                                : 'bg-gray-100 text-gray-400 cursor-not-allowed opacity-50 grayscale'
                            }`}
                    >
                        Go to Shipping <ChevronRight className="w-5 h-5" />
                    </button>
                </div>

                <div className="text-center">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em] flex items-center justify-center gap-2">
                        <Zap className="w-3 h-3 fill-primary text-primary" /> PRP QA Protocol 1.0
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TestChecklist;
