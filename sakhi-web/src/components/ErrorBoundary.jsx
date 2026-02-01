import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error('Error caught by boundary:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-soft-pink via-white to-soft-purple p-4">
                    <div className="bg-white/80 backdrop-blur-xl p-10 rounded-[3rem] shadow-2xl max-w-md w-full text-center">
                        <div className="bg-red-100 p-5 rounded-3xl inline-flex mb-6">
                            <span className="text-6xl">😞</span>
                        </div>
                        <h1 className="text-3xl font-black text-gray-900 mb-4">
                            Oops! Something went wrong
                        </h1>
                        <p className="text-gray-600 mb-8">
                            We're sorry for the inconvenience. Please try refreshing the page.
                        </p>
                        <button
                            onClick={() => window.location.href = '/'}
                            className="bg-primary text-white px-8 py-4 rounded-2xl font-bold shadow-xl hover:shadow-2xl transition-all"
                        >
                            Go to Home
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
