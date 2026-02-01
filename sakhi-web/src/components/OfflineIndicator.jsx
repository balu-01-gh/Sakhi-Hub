import React, { useState, useEffect } from 'react';
import { Wifi, WifiOff, Upload } from 'lucide-react';
import { isOnline, setupOnlineListener, getOfflineQueue } from '../utils/offlineQueue';

const OfflineIndicator = () => {
    const [online, setOnline] = useState(isOnline());
    const [queueSize, setQueueSize] = useState(0);

    useEffect(() => {
        const updateQueueSize = () => {
            setQueueSize(getOfflineQueue().length);
        };

        updateQueueSize();

        const cleanup = setupOnlineListener(
            () => {
                setOnline(true);
                updateQueueSize();
            },
            () => {
                setOnline(false);
                updateQueueSize();
            }
        );

        const interval = setInterval(updateQueueSize, 5000);

        return () => {
            cleanup();
            clearInterval(interval);
        };
    }, []);

    if (online && queueSize === 0) return null;

    return (
        <div className={`fixed bottom-4 right-4 z-50 ${
            online ? 'bg-green-500' : 'bg-orange-500'
        } text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-fadeIn`}>
            {online ? <Wifi size={20} /> : <WifiOff size={20} />}
            <div>
                <p className="font-bold text-sm">
                    {online ? 'Back Online' : 'You are offline'}
                </p>
                {queueSize > 0 && (
                    <p className="text-xs flex items-center gap-1">
                        <Upload size={14} />
                        {queueSize} message{queueSize > 1 ? 's' : ''} pending
                    </p>
                )}
            </div>
        </div>
    );
};

export default OfflineIndicator;
