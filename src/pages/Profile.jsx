import { UserCircle, Mail, MapPin, Briefcase, Camera, Github, Linkedin, Globe } from 'lucide-react';

const Profile = () => {
    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden text-center p-12 relative">
                <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-indigo-500 to-purple-600"></div>
                <div className="relative z-10">
                    <div className="relative inline-block mb-6">
                        <div className="w-32 h-32 rounded-3xl bg-white p-1 shadow-xl">
                            <div className="w-full h-full rounded-2xl bg-indigo-100 flex items-center justify-center text-4xl font-bold text-primary border-4 border-indigo-50">
                                JD
                            </div>
                        </div>
                        <button className="absolute -bottom-2 -right-2 p-3 bg-white border border-gray-100 rounded-2xl shadow-lg text-primary hover:bg-gray-50 transition-all">
                            <Camera className="w-5 h-5" />
                        </button>
                    </div>
                    <h1 className="text-3xl font-extrabold text-gray-900">Jane Doe</h1>
                    <p className="text-gray-500 font-medium mb-6">Computer Science Student at MIT</p>

                    <div className="flex justify-center gap-4">
                        <button className="bg-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-opacity-90 transition-all">
                            Edit Profile
                        </button>
                        <div className="flex gap-2">
                            <button className="p-3 bg-gray-50 text-gray-400 hover:text-gray-900 rounded-xl transition-all"><Github className="w-5 h-5" /></button>
                            <button className="p-3 bg-gray-50 text-gray-400 hover:text-gray-900 rounded-xl transition-all"><Linkedin className="w-5 h-5" /></button>
                            <button className="p-3 bg-gray-50 text-gray-400 hover:text-gray-900 rounded-xl transition-all"><Globe className="w-5 h-5" /></button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                    <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                        <UserCircle className="text-primary w-5 h-5" /> About Me
                    </h3>
                    <div className="space-y-4">
                        <div className="flex items-center gap-4 text-gray-600">
                            <Mail className="w-4 h-4" /> <span>jane.doe@university.edu</span>
                        </div>
                        <div className="flex items-center gap-4 text-gray-600">
                            <MapPin className="w-4 h-4" /> <span>Cambridge, MA</span>
                        </div>
                        <div className="flex items-center gap-4 text-gray-600">
                            <Briefcase className="w-4 h-4" /> <span>Seeking 2026 Grad Roles</span>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                    <h3 className="text-lg font-bold mb-6">Skills & Tags</h3>
                    <div className="flex flex-wrap gap-2">
                        {['React', 'Node.js', 'Python', 'Algorithms', 'System Design', 'UI/UX'].map((skill) => (
                            <span key={skill} className="px-4 py-2 bg-indigo-50 text-primary text-xs font-bold rounded-lg border border-indigo-100">
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
