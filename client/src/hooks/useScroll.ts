import { useEffect, useRef } from "react";

function useChatScroll<T extends HTMLElement = HTMLDivElement>(dep: unknown) {
	const ref = useRef<T>(null);

	useEffect(() => {
		setTimeout(() => {
			if (ref.current) {
				ref.current.scrollTop = ref.current.scrollHeight;
			}
		}, 100);
	}, [dep]);

	return ref;
}

export default useChatScroll;