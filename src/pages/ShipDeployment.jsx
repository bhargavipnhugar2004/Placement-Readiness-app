import { useNavigate } from 'react-router-dom';
import {
    Lock,
    Unlock,
    Rocket,
    ArrowLeft,
    ShieldCheck,
    CheckCircle2,
    AlertTriangle
} from 'lucide-react';

const ShipDeployment = () => {
    const navigate = useNavigate();

    const getTestStatus = () => {
        try {
            const saved = localStorage.getItem('prp_test_checklist');
            if (!saved) return false;
            const checked = JSON.parse(saved);
            const passedCount = Object.values(checked).filter(Boolean).length;
            return passedCount === 10;
        } catch {
            return false;
        }
    };

    const isReadyData = getTestStatus();

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 font-sans">
            <div className="max-w-xl w-full text-center space-y-8 animate-in zoom-in duration-500">

                {/* Status Illustration */}
                <div className="relative inline-block">
                    <div className={`w-32 h-32 rounded-[40px] flex items-center justify-center transition-all duration-700 ${isReadyData ? 'bg-green-500 shadow-2xl shadow-indigo-100 rotate-0' : 'bg-gray-900 shadow-2xl shadow-gray-200 rotate-12'}`}>
                        {isReadyData ? <Rocket className="w-16 h-16 text-white animate-bounce" /> : <Lock className="w-16 h-16 text-white" />}
                    </div>
                    {isReadyData && (
                        <div className="absolute -top-4 -right-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-green-500 animate-in zoom-in duration-1000">
                            <CheckCircle2 className="w-8 h-8 fill-green-50" />
                        </div>
                    )}
                </div>

                <div className="space-y-4">
                    <h1 className="text-4xl font-black text-gray-900 tracking-tight uppercase">
                        {isReadyData ? 'System Ready to Ship' : 'Deployment Locked'}
                    </h1>
                    <p className="text-gray-500 font-bold max-w-sm mx-auto leading-relaxed uppercase text-[10px] tracking-[0.2em]">
                        {isReadyData
                            ? 'All 10 security and integrity tests have passed. Safe to deploy to production.'
                            : 'Critical QA checklist is incomplete. Access to deployment protocols is restricted.'}
                    </p>
                </div>

                <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-xl space-y-6">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                        <div className="flex items-center gap-3">
                            <ShieldCheck className={`w-5 h-5 ${isReadyData ? 'text-green-500' : 'text-gray-400'}`} />
                            <span className="text-xs font-black uppercase tracking-widest text-gray-600">QA Integrity Status</span>
                        </div>
                        <span className={`text-[10px] font-black px-3 py-1 rounded-lg uppercase ${isReadyData ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                            }`}>
                            {isReadyData ? 'VERIFIED' : 'PENDING'}
                        </span>
                    </div>

                    {isReadyData ? (
                        <div className="space-y-4">
                            <div className="text-left p-5 bg-green-50/50 rounded-2xl border border-green-200/50 flex gap-4">
                                <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                                <p className="text-xs font-bold text-green-800 tracking-tight leading-relaxed">
                                    Deployment window is active. All heuristic engines and validation layers are hardened.
                                </p>
                            </div>
                            <button
                                onClick={() => window.alert("Shipping Engine Activated! Deployment to main branch initialized...")}
                                className="w-full py-5 bg-primary text-white rounded-3xl font-black text-sm uppercase tracking-widest shadow-2xl shadow-indigo-100 transition-all hover:scale-[1.02] active:scale-[0.98]"
                            >
                                Confirm Final Ship
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div className="text-left p-4 bg-amber-50 rounded-2xl border border-amber-100 flex gap-3">
                                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
                                <p className="text-xs font-bold text-amber-800 tracking-tight leading-relaxed">
                                    Bypassing QA protocols is strictly prohibited. Complete the checklist to unlock.
                                </p>
                            </div>
                            <button
                                onClick={() => navigate('/prp/07-test')}
                                className="w-full py-5 bg-gray-900 text-white rounded-3xl font-black text-sm uppercase tracking-widest transition-all flex items-center justify-center gap-2 group"
                            >
                                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Return to Checklist
                            </button>
                        </div>
                    )}
                </div>

                <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest italic">
                    Placement Prep Security Layer v1.0.4
                </p>
            </div>
        </div>
    );
};

export default ShipDeployment;
