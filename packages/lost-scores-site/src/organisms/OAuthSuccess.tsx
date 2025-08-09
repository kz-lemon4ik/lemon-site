import clsx from "clsx";
import { motion } from "framer-motion";
import { CircleCheck, User, CircleX } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button, Heading, Section, useSettings } from "@lemon-site/shared-ui";
import { useAuth } from "@/contexts/AuthContext";

interface UserData {
  username: string;
  user_id: string;
  avatar_url?: string;
}

export default function OAuthSuccess() {
  const { isMotionDisabled } = useSettings();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { checkAuth } = useAuth();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const source = searchParams.get("source");
    const errorParam = searchParams.get("error");

    if (errorParam) {
      setError(errorParam);
      return;
    }

    const username = searchParams.get("username");
    const userId = searchParams.get("user_id");
    const jwtToken = searchParams.get("jwt_token");

    if (jwtToken && username && userId) {
      if (isNaN(Number(userId)) || Number(userId) <= 0) {
        setError("Invalid user ID");
        return;
      }

      if (username.trim().length === 0 || username.length > 50) {
        setError("Invalid username");
        return;
      }

      if (username.match(/[<>&"']/)) {
        setError("Invalid username format");
        return;
      }

      const isProduction = window.location.hostname.includes('lemon4ik.kz');
      if (isProduction) {
        document.cookie = `lost_scores_session=${jwtToken}; path=/; max-age=86400; domain=.lemon4ik.kz; Secure; SameSite=None`;
      } else {
        document.cookie = `lost_scores_session=${jwtToken}; path=/; max-age=86400; SameSite=Lax`;
      }

      setUserData({
        username: username.trim(),
        user_id: userId,
        avatar_url: `https://a.ppy.sh/${userId}`,
      });

      setIsDesktop(source === "desktop");

      if (source !== "desktop") {
        checkAuth().then(() => {
          setTimeout(() => {
            navigate(`/profile/${username.trim()}`);
          }, 2000);
        });
      }
    } else if (!jwtToken) {
      setError("Missing authentication token");
    } else if (!username || !userId) {
      setError("Missing authentication data");
    }
  }, [searchParams, checkAuth, navigate]);

  const autoClose = useCallback(() => {
    if (isDesktop) {
      try {
        window.close();
      } catch {
        return;
      }
    }
  }, [isDesktop]);

  useEffect(() => {
    if (!isDesktop || error) return;

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
  }, [isDesktop, error, autoClose]);

  const handleClose = () => {
    if (isDesktop) {
      try {
        window.close();
        setTimeout(() => {
          if (!window.closed) {
            navigate("/");
          }
        }, 100);
      } catch {
        navigate("/");
      }
    } else {
      if (userData?.username) {
        navigate(`/profile/${userData.username}`);
      } else {
        navigate("/");
      }
    }
  };


  if (error) {
    return (
      <Section className="h-screen flex flex-col items-center justify-center text-center p-4 overflow-hidden">
        <motion.div
          initial={isMotionDisabled ? false : { opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col items-center gap-y-6 sm:gap-y-8 p-8 sm:p-10 max-w-2xl"
        >
          <div className="flex justify-center mb-2">
            <CircleX className="w-20 h-20 text-red-500" strokeWidth={2} />
          </div>

          <div className="flex justify-center">
            <Heading
              size="xxl"
              as="h2"
              className="font-losttitle text-white whitespace-nowrap"
            >
              Authentication Failed
            </Heading>
          </div>

          <div className="w-full max-w-md text-center">
            <p className="font-lostdescription text-base text-lavender-200">
              {error === "invalid_callback"
                ? "Invalid authentication callback. Please try to log in again."
                : `Authentication error: ${error}. Please try to log in again.`}
            </p>
          </div>

          <div className="w-full max-w-md">
            <Button
              variant="transparentNeutral"
              onClick={handleClose}
              className={clsx(
                "w-full font-lostbody font-semibold",
                "border-transparent text-white hover:text-white"
              )}
            >
              Close Window
            </Button>
          </div>
        </motion.div>
      </Section>
    );
  }

  if (!userData) {
    return (
      <Section className="h-screen flex flex-col items-center justify-center text-center p-4 overflow-hidden">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-lemon-400 mx-auto mb-4"></div>
          <p className="font-lostdescription text-lavender-200">
            Loading authentication data...
          </p>
        </div>
      </Section>
    );
  }

  return (
    <Section className="h-screen flex flex-col items-center justify-center text-center p-4 overflow-hidden">
      <motion.div
        initial={isMotionDisabled ? false : { opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col items-center gap-y-6 sm:gap-y-8 p-8 sm:p-10 max-w-2xl"
      >
        <div className="flex justify-center mb-2">
          <CircleCheck className="w-20 h-20 text-green-500" strokeWidth={2} />
        </div>

        <div className="flex justify-center">
          <Heading
            size="xxl"
            as="h2"
            className="font-losttitle text-white whitespace-nowrap"
          >
            Authorization Successful!
          </Heading>
        </div>

        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-3">
            {userData.avatar_url ? (
              <img
                src={userData.avatar_url}
                alt={`${userData.username}'s avatar`}
                className="w-12 h-12 rounded-full border-2 border-lavender-300"
              />
            ) : (
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-lavender-500/20 border-2 border-lavender-300">
                <User className="w-6 h-6 text-lavender-300" />
              </div>
            )}
            <div className="text-left">
              <p className="font-lostbody text-lg font-semibold text-white">
                Welcome, {userData.username}!
              </p>
              <p className="font-lostdescription text-sm text-lavender-200">
                ID: {userData.user_id}
              </p>
            </div>
          </div>

          <div className="text-center">
            <p className="font-lostdescription text-base max-w-md text-lavender-200">
              You have successfully authenticated with osu!
            </p>
            <p className="font-lostdescription text-sm mt-2 text-lavender-300">
              {isDesktop
                ? "You can now close this window and return to the application."
                : "You can now access your profile and start using the platform."}
            </p>
          </div>
        </div>

        <div className="w-full max-w-md">
          <Button
            variant="transparentNeutral"
            onClick={handleClose}
            className={clsx(
              "w-full font-lostbody font-semibold",
              "border-transparent text-white hover:text-white"
            )}
          >
            {isDesktop
              ? countdown > 0
                ? `Close Window (${countdown})`
                : "Close Window"
              : "Continue to Profile"}
          </Button>
        </div>
      </motion.div>
    </Section>
  );
}