import { Outlet, Link, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    Code2,
    ClipboardCheck,
    BookOpen,
    UserCircle,
    Menu,
    Bell,
    Search,
    ChevronDown
} from 'lucide-react';
import { useState } from 'react';

const DashboardLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const location = useLocation();

    const navItems = [
        { name: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" />, path: '/dashboard' },
        { name: 'Practice', icon: <Code2 className="w-5 h-5" />, path: '/dashboard/practice' },
        { name: 'Assessments', icon: <ClipboardCheck className="w-5 h-5" />, path: '/dashboard/assessments' },
        { name: 'Resources', icon: <BookOpen className="w-5 h-5" />, path: '/dashboard/resources' },
        { name: 'Profile', icon: <UserCircle className="w-5 h-5" />, path: '/dashboard/profile' },
    ];

    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden">
            {/* Sidebar */}
            <aside className={`bg-white border-r border-gray-200 transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-20'}`}>
                <div className="flex flex-col h-full">
                    {/* Sidebar Header */}
                    <div className="h-16 flex items-center px-6 border-b border-gray-100">
                        <Link to="/" className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                                <Code2 className="text-white w-5 h-5" />
                            </div>
                            {isSidebarOpen && <span className="font-bold text-xl text-gray-900 tracking-tight">Prep</span>}
                        </Link>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                to={item.path}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${location.pathname === item.path
                                        ? 'bg-primary text-white shadow-lg shadow-indigo-100'
                                        : 'text-gray-500 hover:bg-indigo-50 hover:text-primary'
                                    }`}
                            >
                                <div className={`${location.pathname === item.path ? 'text-white' : 'group-hover:text-primary'}`}>
                                    {item.icon}
                                </div>
                                {isSidebarOpen && (
                                    <span className="font-semibold text-sm">{item.name}</span>
                                )}
                            </Link>
                        ))}
                    </nav>

                    {/* Sidebar Footer */}
                    <div className="p-4 border-t border-gray-100">
                        {isSidebarOpen && (
                            <div className="bg-indigo-50 p-4 rounded-2xl">
                                <p className="text-xs font-bold text-primary uppercase mb-1">Pro Plan</p>
                                <p className="text-xs text-gray-600 mb-3">Unlock unlimited mock interviews</p>
                                <button className="w-full bg-primary text-white text-xs py-2 rounded-lg font-bold hover:bg-opacity-90 transition-all">
                                    Upgrade Now
                                </button>
                            </div>
                        )}
                        <button
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="mt-4 w-full flex items-center justify-center p-2 text-gray-400 hover:text-primary hover:bg-gray-50 rounded-lg transition-all"
                        >
                            <Menu className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Header */}
                <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 z-10">
                    <div className="flex items-center gap-4">
                        <h2 className="text-lg font-bold text-gray-900">Placement Prep</h2>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="relative hidden md:block">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Search resources..."
                                className="pl-10 pr-4 py-2 bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-primary/20 rounded-xl text-sm transition-all w-64"
                            />
                        </div>
                        <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-xl transition-all">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                        </button>
                        <div className="h-8 w-[1px] bg-gray-200 mx-2"></div>
                        <button className="flex items-center gap-3 p-1 hover:bg-gray-50 rounded-xl transition-all group">
                            <div className="w-9 h-9 bg-indigo-100 rounded-lg flex items-center justify-center text-primary font-bold">
                                JD
                            </div>
                            <div className="hidden lg:block text-left">
                                <p className="text-sm font-bold text-gray-900 leading-none">Jane Doe</p>
                                <p className="text-[10px] text-gray-500 font-medium">Student</p>
                            </div>
                            <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors" />
                        </button>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto p-8">
                    <div className="max-w-6xl mx-auto">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
