import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import clsx from "clsx";
import { motion } from "framer-motion";
import { CircleCheck, User, CircleX } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button, Heading, Section, useSettings } from "@lemon-site/shared-ui";
export default function OAuthSuccess() {
    const { isMotionDisabled } = useSettings();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [isDesktop, setIsDesktop] = useState(false);
    const [countdown, setCountdown] = useState(5);
    const [error, setError] = useState(null);
    useEffect(() => {
        const username = searchParams.get("username");
        const userId = searchParams.get("user_id");
        const source = searchParams.get("source");
        const errorParam = searchParams.get("error");
        if (errorParam) {
            setError(errorParam);
            return;
        }
        // Проверяем что все обязательные параметры присутствуют
        if (!username || !userId || !source) {
            setError("Missing authentication data");
            return;
        }
        // Проверяем что source валидный (только desktop разрешен)
        if (source !== 'desktop') {
            setError("Invalid access - please use the official authentication flow");
            return;
        }
        // Проверяем что user_id - валидное число
        if (isNaN(Number(userId)) || Number(userId) <= 0) {
            setError("Invalid user ID");
            return;
        }
        // Проверяем что username не пустой и разумной длины
        if (username.trim().length === 0 || username.length > 50) {
            setError("Invalid username");
            return;
        }
        // Улучшенная XSS защита
        if (username.match(/[<>&"']/)) {
            setError("Invalid username format");
            return;
        }
        // Все проверки пройдены, показываем success
        setUserData({
            username: username.trim(),
            user_id: userId,
            avatar_url: `https://a.ppy.sh/${userId}`,
        });
        setIsDesktop(source === 'desktop');
    }, [searchParams]);
    useEffect(() => {
        if (!isDesktop || error)
            return;
        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    autoClose();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [isDesktop, error]);
    const autoClose = () => {
        if (isDesktop) {
            try {
                window.close();
            }
            catch (e) {
                // No fallback - leave the Close Window button as the user's option
            }
        }
    };
    const handleClose = () => {
        try {
            window.close();
            // Проверяем через небольшую задержку, закрылось ли окно
            setTimeout(() => {
                // Если окно все еще открыто, делаем редирект
                if (!window.closed) {
                    navigate("/");
                }
            }, 100);
        }
        catch (e) {
            // Если window.close() вызвал исключение, делаем редирект сразу
            navigate("/");
        }
    };
    if (error) {
        return (_jsx(Section, { className: "h-screen flex flex-col items-center justify-center text-center p-4 overflow-hidden", children: _jsxs(motion.div, { initial: isMotionDisabled ? false : { opacity: 0, scale: 0.95 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 0.3 }, className: "flex flex-col items-center gap-y-6 sm:gap-y-8 p-8 sm:p-10 max-w-2xl", children: [_jsx("div", { className: "flex justify-center mb-2", children: _jsx(CircleX, { className: "w-20 h-20 text-red-500", strokeWidth: 2 }) }), _jsx("div", { className: "flex justify-center", children: _jsx(Heading, { size: "xxl", as: "h2", className: "font-losttitle text-white whitespace-nowrap", children: "Authentication Failed" }) }), _jsx("div", { className: "w-full max-w-md text-center", children: _jsx("p", { className: "font-lostdescription text-base text-lavender-200", children: error === "invalid_callback"
                                ? "Invalid authentication callback. Please try to log in again."
                                : `Authentication error: ${error}. Please try to log in again.` }) }), _jsx("div", { className: "w-full max-w-md", children: _jsx(Button, { variant: "transparentNeutral", onClick: handleClose, className: clsx("w-full font-lostbody font-semibold", "border-transparent text-white hover:text-white"), children: "Close Window" }) })] }) }));
    }
    if (!userData) {
        return (_jsx(Section, { className: "h-screen flex flex-col items-center justify-center text-center p-4 overflow-hidden", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-lemon-400 mx-auto mb-4" }), _jsx("p", { className: "font-lostdescription text-lavender-200", children: "Loading authentication data..." })] }) }));
    }
    return (_jsx(Section, { className: "h-screen flex flex-col items-center justify-center text-center p-4 overflow-hidden", children: _jsxs(motion.div, { initial: isMotionDisabled ? false : { opacity: 0, scale: 0.95 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 0.3 }, className: "flex flex-col items-center gap-y-6 sm:gap-y-8 p-8 sm:p-10 max-w-2xl", children: [_jsx("div", { className: "flex justify-center mb-2", children: _jsx(CircleCheck, { className: "w-20 h-20 text-green-500", strokeWidth: 2 }) }), _jsx("div", { className: "flex justify-center", children: _jsx(Heading, { size: "xxl", as: "h2", className: "font-losttitle text-white whitespace-nowrap", children: "Authorization Successful!" }) }), _jsxs("div", { className: "flex flex-col items-center gap-4", children: [_jsxs("div", { className: "flex items-center gap-3", children: [userData.avatar_url ? (_jsx("img", { src: userData.avatar_url, alt: `${userData.username}'s avatar`, className: "w-12 h-12 rounded-full border-2 border-lavender-300" })) : (_jsx("div", { className: "w-12 h-12 rounded-full flex items-center justify-center bg-lavender-500/20 border-2 border-lavender-300", children: _jsx(User, { className: "w-6 h-6 text-lavender-300" }) })), _jsxs("div", { className: "text-left", children: [_jsxs("p", { className: "font-lostbody text-lg font-semibold text-white", children: ["Welcome, ", userData.username, "!"] }), _jsxs("p", { className: "font-lostdescription text-sm text-lavender-200", children: ["ID: ", userData.user_id] })] })] }), _jsxs("div", { className: "text-center", children: [_jsx("p", { className: "font-lostdescription text-base max-w-md text-lavender-200", children: "You have successfully authenticated with osu!" }), _jsx("p", { className: "font-lostdescription text-sm mt-2 text-lavender-300", children: "You can now close this window and return to the application." })] })] }), _jsx("div", { className: "w-full max-w-md", children: _jsx(Button, { variant: "transparentNeutral", onClick: handleClose, className: clsx("w-full font-lostbody font-semibold", "border-transparent text-white hover:text-white"), children: countdown > 0
                            ? `Close Window (${countdown})`
                            : "Close Window" }) })] }) }));
}
