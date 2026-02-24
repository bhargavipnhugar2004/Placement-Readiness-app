import { useNavigate } from 'react-router-dom';
import { Code, Video, BarChart3, ChevronRight } from 'lucide-react';

const LandingPage = () => {
    const navigate = useNavigate();

    const features = [
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
        {
            title: "Track Progress",
            description: "Visualize your growth with detailed performance analytics.",
            icon: <BarChart3 className="w-10 h-10 text-primary" />,
        },
    ];

    return (
        <div className="min-h-screen flex flex-col bg-white">
            {/* Navbar */}
            <nav className="border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                                <Code className="text-white w-5 h-5" />
                            </div>
                            <span className="text-xl font-bold text-gray-900 tracking-tight">Placement Prep</span>
                        </div>
                        <div className="hidden md:flex items-center gap-8">
                            <a href="#features" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">Features</a>
                            <a href="#" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">Success Stories</a>
                            <button
                                onClick={() => navigate('/dashboard')}
                                className="bg-primary hover:bg-opacity-90 text-white px-5 py-2 rounded-full text-sm font-semibold transition-all shadow-lg shadow-indigo-100"
                            >
                                Sign In
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative py-20 lg:py-32 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-primary text-xs font-bold uppercase tracking-wider mb-8">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                        </span>
                        New: AI Mock Interviews
                    </div>
                    <h1 className="text-5xl lg:text-7xl font-extrabold text-gray-900 mb-6 tracking-tight leading-tight">
                        Ace Your <span className="text-primary italic">Placement</span>
                    </h1>
                    <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                        Practice, assess, and prepare for your dream job with our comprehensive
                        readiness platform. Built by industry experts.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="group bg-primary hover:bg-opacity-90 text-white px-8 py-4 rounded-xl text-lg font-bold flex items-center justify-center gap-2 transition-all hover:translate-y-[-2px] shadow-xl shadow-indigo-200"
                        >
                            Get Started
                            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                        <button className="bg-white border-2 border-gray-100 hover:border-gray-200 text-gray-600 px-8 py-4 rounded-xl text-lg font-bold transition-all">
                            Watch Demo
                        </button>
                    </div>

                    {/* Decorative elements */}
                    <div className="absolute top-1/2 left-0 -translate-y-1/2 -ml-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-50/50 rounded-full blur-3xl"></div>
                </div>
            </section>

            {/* Features Grid */}
            <section id="features" className="py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-16">Everything you need to succeed</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <div key={index} className="bg-white p-10 rounded-3xl border border-gray-100 hover:border-primary/20 hover:shadow-2xl hover:shadow-indigo-100 transition-all group">
                                <div className="mb-6 inline-block p-4 rounded-2xl bg-indigo-50 group-hover:bg-primary group-hover:text-white transition-colors">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                                <p className="text-gray-500 leading-relaxed">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="mt-auto py-12 border-t border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-2 opacity-50">
                        <Code className="text-primary w-5 h-5" />
                        <span className="font-bold text-gray-900">Placement Prep</span>
                    </div>
                    <p className="text-gray-400 text-sm">
                        © {new Date().getFullYear()} Placement Prep. All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        <a href="#" className="text-gray-400 hover:text-primary transition-colors">Twitter</a>
                        <a href="#" className="text-gray-400 hover:text-primary transition-colors">LinkedIn</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
