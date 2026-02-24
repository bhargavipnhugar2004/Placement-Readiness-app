import { BookOpen, Download, ExternalLink, FileText } from 'lucide-react';

const Resources = () => {
    const categories = [
        { title: 'Company Guides', documents: 12, items: ['Google Interview Handbook', 'Amazon Leadership Principles', 'Meta System Design Guide'] },
        { title: 'Resume Templates', documents: 5, items: ['Software Engineer (New Grad)', 'Senior Developer Role', 'Product Manager (Intern)'] },
        { title: 'DSA Sheets', documents: 8, items: ['Love Babbar 450 DSA', 'Striver A-Z Roadmap', 'LeetCode Top 75'] },
    ];

    return (
        <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
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
                                        <FileText className="w-4 h-4 text-gray-400" />
                                        <span className="text-sm font-medium text-gray-700 group-hover:text-primary transition-colors cursor-pointer">{item}</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <Download className="w-4 h-4 text-gray-300 hover:text-primary transition-colors cursor-pointer" />
                                        <ExternalLink className="w-4 h-4 text-gray-300 hover:text-primary transition-colors cursor-pointer" />
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
