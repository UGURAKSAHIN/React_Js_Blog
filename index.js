// REACT
import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";

// STYLES
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "animate.css/animate.min.css";
import "jquery-ui-dist/jquery-ui.min.css";

// ROUTER
import { BrowserRouter } from "react-router-dom";

// TOAST
import ReusabilityToast from "./app/reusability/ReusabilityToast";

// MAIN APP ROUTES
import RouterApp from "./routes/RouterApp";

// UTILS
import reportWebVitals from "./reportWebVitals";

// JS LIBRARIES
import $ from "jquery";
import Swal from "sweetalert2";
import counterUp from "counterup2";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "jquery-ui-dist/jquery-ui.min.js";
import { WOW } from "wowjs";

// ---------------------------------
// GLOBAL INITIALIZATIONS USING HOOK
// ---------------------------------

function GlobalInitializer() {
    useEffect(() => {
        // Theme
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme === "dark") {
            document.body.classList.add("dark-mode");
        } else {
            document.body.classList.remove("dark-mode");
        }

        // Attach globals (if needed)
        window.$ = window.jQuery = $;
        window.Swal = Swal;
        window.counterUp = counterUp;

        // WOW.js init
        const wow = new WOW({
            boxClass: "wow",
            animateClass: "animate__animated",
            offset: 0,
            mobile: true,
            live: true,
        });
        wow.init();
    }, []);

    return null;
}

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <GlobalInitializer />
            <ReusabilityToast />
            <RouterApp />
        </BrowserRouter>
    </React.StrictMode>
);

// Performance
reportWebVitals();
