import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Video, BookOpen, GraduationCap, PlayCircle, Star, Users, X } from 'lucide-react';
import { awardPoints } from '../utils/gamification';
import BadgeNotification from '../components/BadgeNotification';

const VideoModal = ({ isOpen, onClose, title, videoId }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn">
            <div className="bg-white rounded-[3rem] shadow-2xl max-w-4xl w-full overflow-hidden relative border border-white/20">
                <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 z-10 bg-white/50 p-2 rounded-full"><X size={24} /></button>
                <div className="aspect-video bg-black">
                    <iframe
                        className="w-full h-full"
                        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                        title={title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
                <div className="p-8">
                    <h3 className="text-2xl font-black text-gray-900">{title}</h3>
                    <p className="text-gray-500 font-medium">Starting Lesson 1: Introduction to the topic.</p>
                </div>
            </div>
        </div>
    );
};

const Education = () => {
    const { t } = useLanguage();
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [newBadge, setNewBadge] = useState(null);

    const handleVideoOpen = (video) => {
        setSelectedVideo(video);
        // Award points for watching video
        const result = awardPoints('VIDEO_WATCH');
        if (result.newBadges && result.newBadges.length > 0) {
            setNewBadge(result.newBadges[result.newBadges.length - 1]);
        }
    };

    const courses = [
        {
            title: "Digital Banking 101",
            author: "By NGO Sakhis",
            duration: "45 mins",
            lessonsCount: 5,
            level: "Beginner",
            image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&q=80&w=400",
            category: "Digital Literacy",
            videoId: "W1Nne0LhuVw" // Digital Banking / UPI Guide
        },
        {
            title: "Advanced Tailoring",
            author: "Rani Kumari",
            duration: "120 mins",
            lessonsCount: 12,
            level: "Expert",
            image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&q=80&w=400",
            category: "Vocational",
            videoId: "Q0d-4J0rJ9s" // Advanced Stitching
        },
        {
            title: "Safe Internet for Girls",
            author: "Cyber Sakhi Team",
            duration: "30 mins",
            lessonsCount: 3,
            level: "Intermediate",
            image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=400",
            category: "Safety",
            videoId: "M9k7_H7q5t8" // Cyber Safety Awareness
        },
        {
            title: "Basic Tailoring Skills",
            author: "Meera Devi",
            duration: "60 mins",
            lessonsCount: 8,
            level: "Beginner",
            image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=400",
            category: "Vocational",
            videoId: "6X0Z1v_7_yY" // Basic Stitching Class
        },
        {
            title: "Poetry & Creative Writing",
            author: "Kavita Sharma",
            duration: "40 mins",
            lessonsCount: 6,
            level: "Beginner",
            image: "https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?auto=format&fit=crop&q=80&w=400",
            category: "Arts & Expression",
            videoId: "tQo5w9_zP18" // Creative Writing Tips
        },
        {
            title: "Hindi Poetry Recitation",
            author: "Sakhi Arts Group",
            duration: "35 mins",
            lessonsCount: 4,
            level: "Intermediate",
            image: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&q=80&w=400",
            category: "Arts & Expression",
            videoId: "jNFXN2X7wS8" // Hindi Poetry
        }
    ];

    return (
        <div className="container mx-auto px-4 py-12 max-w-7xl animate-fadeIn">

            <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-16 gap-8">
                <div className="text-center md:text-left">
                    <div className="flex items-center gap-2 text-primary font-black text-sm uppercase tracking-widest mb-4 justify-center md:justify-start">
                        <GraduationCap size={18} /> {t.education} Hub
                    </div>
                    <h2 className="text-6xl font-black text-gray-900 tracking-tight lg:leading-tight">Learning Hub</h2>
                    <p className="text-gray-500 text-xl max-w-2xl font-medium leading-relaxed">
                        Acquire new skills from your home. Learn digital banking, advanced stitching, and vocational arts from village experts.
                    </p>
                </div>
                <div className="bg-white px-8 py-6 rounded-[2.5rem] shadow-xl border border-gray-100 flex items-center gap-6">
                    <div className="text-center">
                        <p className="text-3xl font-black text-primary">120+</p>
                        <p className="text-xs font-black text-gray-400 uppercase">Videos</p>
                    </div>
                    <div className="w-px h-10 bg-gray-200"></div>
                    <div className="text-center">
                        <p className="text-3xl font-black text-secondary">5.0k+</p>
                        <p className="text-xs font-black text-gray-400 uppercase">Sakhis</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {courses.map((course, idx) => (
                    <div key={idx} className="group bg-white rounded-[3rem] shadow-xl overflow-hidden hover:shadow-2xl transition-all hover:-translate-y-2 border border-gray-100 flex flex-col">
                        <div className="relative h-64 overflow-hidden">
                            <img
                                src={course.image}
                                alt={course.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                            <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-xl text-xs font-black text-primary shadow-lg">
                                {course.category}
                            </div>
                            <div
                                className="absolute bottom-6 left-6 flex items-center gap-2 text-white cursor-pointer group/play"
                                onClick={() => setSelectedVideo({ title: course.title, videoId: course.videoId })}
                            >
                                <PlayCircle size={40} className="group-hover/play:scale-125 transition-transform" />
                                <span className="font-bold underline">Watch Lesson</span>
                            </div>
                        </div>

                        <div className="p-8 flex-grow">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-2xl font-black text-gray-900 group-hover:text-primary transition-colors leading-tight">{course.title}</h3>
                                <div className="flex items-center gap-1 text-yellow-500 font-black">
                                    <Star size={16} fill="currentColor" /> 4.9
                                </div>
                            </div>

                            <div className="flex items-center gap-2 text-gray-400 font-bold text-sm mb-8">
                                <Users size={16} /> {course.author}
                            </div>

                            <div className="flex justify-between items-center border-t border-gray-100 pt-6">
                                <div className="text-xs font-black text-gray-500 uppercase tracking-widest">
                                    {course.duration} • {course.lessonsCount} Lessons
                                </div>
                                <span className={`px-3 py-1 rounded-lg text-xs font-black uppercase tracking-widest ${course.level === 'Beginner' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                                    {course.level}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-24 p-12 bg-gray-50 rounded-[4rem] border border-gray-200 flex flex-col md:flex-row items-center gap-12">
                <div className="md:w-1/2">
                    <h3 className="text-4xl font-black text-gray-900 mb-6 leading-tight">Can't find what you want to learn?</h3>
                    <p className="text-gray-500 text-lg font-medium mb-8">
                        Request a special skill video from our community of experts. We will record it for free!
                    </p>
                    <button className="bg-gray-900 text-white px-10 py-4 rounded-2xl font-black shadow-xl hover:bg-primary transition-all">
                        Request a Tutorial
                    </button>
                </div>
                <div className="md:w-1/2 grid grid-cols-2 gap-4">
                    <div className="bg-white p-6 rounded-3xl shadow-sm flex flex-col items-center">
                        <Video size={32} className="text-primary mb-3" />
                        <p className="font-black text-gray-800">Video Lessons</p>
                    </div>
                    <div className="bg-white p-6 rounded-3xl shadow-sm flex flex-col items-center">
                        <BookOpen size={32} className="text-secondary mb-3" />
                        <p className="font-black text-gray-800">Audio Guides</p>
                    </div>
                    <div className="bg-white p-6 rounded-3xl shadow-sm flex flex-col items-center">
                        <GraduationCap size={32} className="text-blue-500 mb-3" />
                        <p className="font-black text-gray-800">Quiz Cards</p>
                    </div>
                    <div className="bg-white p-6 rounded-3xl shadow-sm flex flex-col items-center">
                        <Users size={32} className="text-purple-500 mb-3" />
                        <p className="font-black text-gray-800">Group Calls</p>
                    </div>
                </div>
            </div>

            <VideoModal
                isOpen={!!selectedVideo}
                onClose={() => setSelectedVideo(null)}
                title={selectedVideo?.title}
                videoId={selectedVideo?.videoId}
            />

        </div>
    );
};

export default Education;
