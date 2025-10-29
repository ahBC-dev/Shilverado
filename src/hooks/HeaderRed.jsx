import { useRef, useEffect } from "react";

export const HeaderRef = () => {
    const headerRef = useRef(null);
    const lastScrollY = useRef(0);
    const ticking = useRef(false);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            
            // Use requestAnimationFrame for performance
            if (!ticking.current) {
                ticking.current = true;
                
                requestAnimationFrame(() => {
                    const headerV1 = headerRef.current;
                    if (!headerV1) return;

                    // Small threshold to prevent jitter
                    if (Math.abs(lastScrollY.current - currentScrollY) < 20) {
                        ticking.current = false;
                        return;
                    }

                    // Scrolling down > hide
                    if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
                        headerV1.style.transform = "translateY(-200px)";
                    }
                    // Scrolling up > show
                    else {
                        headerV1.style.transform = "translateY(0)";
                    }

                    lastScrollY.current = currentScrollY;
                    ticking.current = false;
                });
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return headerRef;
};