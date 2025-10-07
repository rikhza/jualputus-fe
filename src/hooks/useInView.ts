import { useEffect, useRef, useState } from "react";

interface UseInViewOptions {
	threshold?: number;
	rootMargin?: string;
	triggerOnce?: boolean;
}

export function useInView(options: UseInViewOptions = {}) {
	const {
		threshold = 0.1,
		rootMargin = "0px",
		triggerOnce = false,
	} = options;
	const [inView, setInView] = useState(false);
	const ref = useRef<HTMLElement>(null);
	const hasTriggered = useRef(false);

	useEffect(() => {
		const element = ref.current;
		if (!element) return;

		// If already triggered and triggerOnce is true, don't observe
		if (triggerOnce && hasTriggered.current) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				const isIntersecting = entry.isIntersecting;

				if (isIntersecting) {
					setInView(true);
					if (triggerOnce) {
						hasTriggered.current = true;
					}
				} else if (!triggerOnce) {
					setInView(false);
				}
			},
			{
				threshold,
				rootMargin,
			}
		);

		observer.observe(element);

		return () => {
			observer.disconnect();
		};
	}, [threshold, rootMargin, triggerOnce]);

	return { ref, inView };
}
