import React, { useEffect, useState } from "react";

function DarkMode() {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        const activeDark = savedTheme === "dark";

        setIsDark(activeDark);
        document.body.classList.toggle("dark-mode", activeDark);
    }, []);

    const handleToggle = () => {
        setIsDark((prev) => {
            const next = !prev;
            const nextTheme = next ? "dark" : "light";

            document.body.classList.toggle("dark-mode", next);

            localStorage.setItem("theme", nextTheme);

            return next;
        });
    };

    return (
        <button
            type="button"
            className="btn btn-outline-light btn-sm d-flex align-items-center gap-2"
            onClick={handleToggle}
            title={isDark ? "Light mode" : "Dark mode"}
        >
            {isDark ? (
                <>
                    <i className="fa-regular fa-sun" />
                    <span className="d-none d-md-inline">Light</span>
                </>
            ) : (
                <>
                    <i className="fa-solid fa-moon" />
                    <span className="d-none d-md-inline">Dark</span>
                </>
            )}
        </button>
    );
}

export default DarkMode;