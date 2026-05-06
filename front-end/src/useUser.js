// useState stores data, useEffect run code when component loads
import { useState, useEffect } from 'react';

// Firebase listener for login / logout
import { getAuth, onAuthStateChanged } from 'firebase/auth';

/* This is a custom React hook that keeps track of whether a user is logged in with Firebase—and gives 
your components access to that info in a clean way. */

// Custom hooks MUST start with 'use'
const useUser = () => {
    // Waiting for Firebase response
    const [isLoading, setIsLoading] = useState(true);

    // No user yet
    const [user, setUser] = useState(null);

    // Runs when component loads, [] at the end means only once
    useEffect(() => {
        // Firebase watches auth state: User logs in, user logs out, page refresh
        const unsubscribe = onAuthStateChanged(getAuth(), function(user) {
            setUser(user); // Firebase user obj
            setIsLoading(false);
        });

        return unsubscribe; // cleanup function, stops listening when component unmounts and prevents memory leaks
    }, []);

    return { isLoading, user };
}

export default useUser;