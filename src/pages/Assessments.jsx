import { ClipboardCheck, Play, Clock, Award } from 'lucide-react';

const Assessments = () => {
    const tests = [
        { title: 'Technical Rounds Simulation', time: '60m', score: 'Previous: 85%', questions: 45, icon: <Award className="text-orange-500" /> },
        { title: 'Aptitude & Logical Reasoning', time: '45m', score: '-', questions: 30, icon: <Clock className="text-blue-500" /> },
        { title: 'Core Subjects (OS/DBMS/CN)', time: '30m', score: 'Previous: 92%', questions: 25, icon: <ClipboardCheck className="text-green-500" /> },
    ];

    return (
        <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Assessments</h1>
                <p className="text-gray-500">Benchmark your skills against industry standards.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {tests.map((test, i) => (
                    <div key={i} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:translate-y-[-4px] transition-all group">
                        <div className="mb-6 w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-xl group-hover:bg-primary/5 transition-colors">
                            {test.icon}
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">{test.title}</h3>
                        <div className="flex items-center gap-4 text-xs font-medium text-gray-500 mb-8">
                            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {test.time}</span>
                            <span className="flex items-center gap-1"><ClipboardCheck className="w-3 h-3" /> {test.questions} Qs</span>
                            <span className="text-primary font-bold">{test.score}</span>
                        </div>
                        <button className="w-full flex items-center justify-center gap-2 py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-primary transition-all group">
                            Start Assessment <Play className="w-4 h-4" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Assessments;
