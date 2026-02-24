import { Code2, ChevronRight, Search, Filter } from 'lucide-react';

const Practice = () => {
    const problems = [
        { title: 'Merge Intervals', difficulty: 'Medium', category: 'Arrays', status: 'Solved' },
        { title: 'Longest Palindromic Substring', difficulty: 'Medium', category: 'Strings', status: 'In Progress' },
        { title: 'Reverse Nodes in k-Group', difficulty: 'Hard', category: 'Linked List', status: 'Todo' },
        { title: 'Binary Tree Level Order Traversal', difficulty: 'Easy', category: 'Trees', status: 'Solved' },
        { title: 'Best Time to Buy and Sell Stock', difficulty: 'Easy', category: 'Arrays', status: 'Solved' },
    ];

    const getDifficultyColor = (diff) => {
        if (diff === 'Easy') return 'text-green-500 bg-green-50';
        if (diff === 'Medium') return 'text-orange-500 bg-orange-50';
        return 'text-red-500 bg-red-50';
    };

    return (
        <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Practice Problems</h1>
                    <p className="text-gray-500">Master data structures and algorithms with curated challenges.</p>
                </div>
                <div className="flex gap-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Filter by name..."
                            className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 transition-all"
                        />
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50">
                        <Filter className="w-4 h-4" /> Filters
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-100">
                            <th className="px-8 py-5 text-sm font-bold text-gray-500">Status</th>
                            <th className="px-8 py-5 text-sm font-bold text-gray-500">Title</th>
                            <th className="px-8 py-5 text-sm font-bold text-gray-500">Difficulty</th>
                            <th className="px-8 py-5 text-sm font-bold text-gray-500">Category</th>
                            <th className="px-8 py-5 text-sm font-bold text-gray-500 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {problems.map((problem, i) => (
                            <tr key={i} className="hover:bg-indigo-50/30 transition-colors group">
                                <td className="px-8 py-5">
                                    <div className={`w-2.5 h-2.5 rounded-full ${problem.status === 'Solved' ? 'bg-green-500' : problem.status === 'In Progress' ? 'bg-orange-500' : 'bg-gray-200'}`}></div>
                                </td>
                                <td className="px-8 py-5 text-sm font-bold text-gray-900 group-hover:text-primary transition-colors">{problem.title}</td>
                                <td className="px-8 py-5">
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${getDifficultyColor(problem.difficulty)}`}>
                                        {problem.difficulty}
                                    </span>
                                </td>
                                <td className="px-8 py-5 text-sm text-gray-500 font-medium">{problem.category}</td>
                                <td className="px-8 py-5 text-right">
                                    <button className="p-2 text-gray-400 hover:text-primary hover:bg-white rounded-lg transition-all">
                                        <ChevronRight className="w-5 h-5" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Practice;
