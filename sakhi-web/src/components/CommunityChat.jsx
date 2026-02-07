import React, { useState, useEffect } from 'react';
import { MessageSquare, Send, ThumbsUp, User } from 'lucide-react';
import { getCommunityPosts, createCommunityPost, likeCommunityPost } from '../services/api';
import { initChat, onCommunityPost } from '../utils/chat';
import { getUserData, isAuthenticated } from '../utils/auth';

const CommunityChat = () => {
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState("");
    const [user, setUser] = useState("Sakhi User");

    useEffect(() => {
        // Initialize Socket
        initChat();
        
        // Get current user name
        const userData = getUserData();
        if (userData && userData.name) {
            setUser(userData.name);
        }

        // Initial Load
        fetchPosts();

        // Listen for real-time updates
        onCommunityPost((post) => {
            setPosts(prevPosts => {
                // Prevent duplicates if sender's local update happened fast
                if (prevPosts.some(p => p.id === post.id)) return prevPosts;
                return [post, ...prevPosts];
            });
        });

        // Cleanup not strictly necessary for singleton but good practice to detach listener if we implemented off()
    }, []);

    const fetchPosts = async () => {
        try {
            const data = await getCommunityPosts();
            setPosts(data);
        } catch (error) {
            console.error("Failed to fetch posts", error);
        }
    };

    const handleSend = async () => {
        if (!newPost.trim()) return;
        
        // Use real username if available
        const userData = getUserData();
        const senderName = userData ? userData.name : user;

        try {
            await createCommunityPost({
                user_name: senderName,
                title: "Community Message",
                content: newPost,
                category: "General"
            });
            setNewPost("");
            fetchPosts();
        } catch (error) {
            console.error("Failed to send post", error);
        }
    };

    const handleLike = async (id) => {
        try {
            await likeCommunityPost(id);
            fetchPosts();
        } catch (error) {
            console.error("Failed to like post", error);
        }
    };

    return (
        <section className="bg-white p-8 md:p-10 rounded-[4rem] shadow-xl border border-gray-100 flex flex-col h-[600px]">
            <h3 className="text-3xl font-black text-gray-900 mb-6 flex items-center gap-3">
                <MessageSquare className="text-yellow-600" /> Community Chat
            </h3>
            
            <div className="flex-grow overflow-y-auto space-y-4 mb-6 pr-2 scrollbar-hide">
                {posts.length === 0 ? (
                    <div className="text-center text-gray-400 mt-20">
                        <MessageSquare size={48} className="mx-auto mb-2 opacity-50" />
                        <p>No messages yet. Be the first to say hello!</p>
                    </div>
                ) : (
                    posts.map((post) => (
                        <div key={post.id} className="bg-gray-50 p-6 rounded-[2rem] border border-gray-100">
                            <div className="flex justify-between items-start mb-2">
                                <div className="flex items-center gap-2">
                                    <div className="bg-yellow-100 p-2 rounded-full">
                                        <User size={16} className="text-yellow-600" />
                                    </div>
                                    <span className="font-bold text-gray-800">{post.user_name}</span>
                                </div>
                                <span className="text-xs text-gray-400 font-bold">
                                    {new Date(post.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                </span>
                            </div>
                            <p className="text-gray-600 mb-4 pl-10">{post.content}</p>
                            <div className="flex items-center gap-4 pl-10">
                                <button 
                                    onClick={() => handleLike(post.id)}
                                    className="flex items-center gap-1 text-gray-400 hover:text-yellow-600 transition-colors text-sm font-bold"
                                >
                                    <ThumbsUp size={14} /> {post.likes}
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <div className="relative">
                <input
                    type="text"
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Type your message to the community..."
                    className="w-full bg-gray-100 rounded-2xl px-6 py-4 pr-16 focus:outline-none focus:ring-2 focus:ring-yellow-400 font-medium"
                />
                <button 
                    onClick={handleSend}
                    className="absolute right-2 top-2 bg-yellow-500 text-white p-2 rounded-xl hover:bg-yellow-600 transition-colors"
                >
                    <Send size={20} />
                </button>
            </div>
        </section>
    );
};

export default CommunityChat;
