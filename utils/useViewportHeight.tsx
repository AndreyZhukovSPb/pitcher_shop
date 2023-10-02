import { useEffect, useState } from 'react';

export default function useViewportHeight() {
    const [vh, setVh] = useState(window.innerHeight);

    useEffect(() => {
        function handleResize() {
            setVh(window.innerHeight);
        }

        // Initial setup
        handleResize();

        // Event listener for window resize
        window.addEventListener('resize', handleResize);

        // Cleanup on unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return { vh };
}
