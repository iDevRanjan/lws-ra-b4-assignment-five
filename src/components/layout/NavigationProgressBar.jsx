import { useRef } from "react";
import { useNavigation } from "react-router";

export default function NavigationProgressBar() {
    const navigation = useNavigation();
    const isLoading = navigation.state === "loading";
    const progressBarRef = useRef({
        width: 20,
        hasStarted: false,
    });

    return (
        <div
            ref={(node) => {
                const state = progressBarRef.current;
                let intervalId;

                if (!node) return;
                if (!state.hasStarted && !isLoading) return;

                if (isLoading) {
                    if (!state.hasStarted) {
                        state.hasStarted = true;
                        node.style.opacity = 1;

                        intervalId = setInterval(() => {
                            state.width =
                                state.width < 90
                                    ? state.width + 5
                                    : state.width;
                            node.style.width = `${state.width}%`;
                            node.style.transition = "width 0.3s ease";
                        }, 200);
                    }
                } else {
                    node.style.width = "100%";
                    node.style.opacity = 0;
                    node.style.transition =
                        "width 0s ease-in-out, opacity 0.3s ease-in-out";
                    const timeoutId = setTimeout(() => {
                        state.width = 20;
                        state.hasStarted = false;
                        node.style.width = "0%";
                        node.style.transition = "";
                    }, 300);

                    return () => clearTimeout(timeoutId);
                }

                return () => clearInterval(intervalId);
            }}
            className="bg-accent-foreground fixed inset-0 z-9999 h-1 w-0 opacity-0"
        />
    );
}
