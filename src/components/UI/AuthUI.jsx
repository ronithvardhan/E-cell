import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import "./AuthUI.css";

export function Typewriter({
  text,
  speed = 100,
  cursor = "|",
  loop = false,
  deleteSpeed = 50,
  delay = 1500,
  className = "",
}) {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [textArrayIndex, setTextArrayIndex] = useState(0);

  const textArray = Array.isArray(text) ? text : [text];
  const currentText = textArray[textArrayIndex] || "";

  useEffect(() => {
    if (!currentText) return;

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (currentIndex < currentText.length) {
            setDisplayText((prev) => prev + currentText[currentIndex]);
            setCurrentIndex((prev) => prev + 1);
          } else if (loop) {
            setTimeout(() => setIsDeleting(true), delay);
          }
        } else {
          if (displayText.length > 0) {
            setDisplayText((prev) => prev.slice(0, -1));
          } else {
            setIsDeleting(false);
            setCurrentIndex(0);
            setTextArrayIndex((prev) => (prev + 1) % textArray.length);
          }
        }
      },
      isDeleting ? deleteSpeed : speed
    );

    return () => clearTimeout(timeout);
  }, [
    currentIndex,
    isDeleting,
    currentText,
    loop,
    speed,
    deleteSpeed,
    delay,
    displayText,
    text,
    textArray.length,
  ]);

  return (
    <span className={className}>
      {displayText}
      <span className="animate-pulse">{cursor}</span>
    </span>
  );
}



function AuthFormContainer() {
  const { signInWithGoogle, user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Redirect if already signed in
  useEffect(() => {
    if (user) navigate('/');
  }, [user, navigate]);

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      setError(null);
      await signInWithGoogle();
      // Supabase will redirect the browser to Google — no further action needed here
    } catch (err) {
      setError(err.message || 'Failed to sign in with Google. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="auth-form-container">
      <div className="auth-form-header">
        <h1 className="auth-title">Welcome to E-Cell UCEOU</h1>
        <p className="auth-subtitle">Sign in or create an account to continue</p>
      </div>

      {error && (
        <div className="auth-error">
          {error}
        </div>
      )}

      <button
        type="button"
        className="auth-button-google"
        onClick={handleGoogleSignIn}
        disabled={loading}
      >
        {loading ? (
          <span className="auth-spinner" />
        ) : (
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google icon"
            style={{ width: "20px", height: "20px", flexShrink: 0 }}
          />
        )}
        {loading ? 'Redirecting to Google...' : 'Continue with Google'}
      </button>

      <p className="auth-google-note">
        We use Google Sign-In to keep your account secure.<br />
        No passwords needed.
      </p>
    </div>
  );
}

const defaultSignInContent = {
  image: {
    src: "https://i.ibb.co/XrkdGrrv/original-ccdd6d6195fff2386a31b684b7abdd2e-removebg-preview.png",
    alt: "A beautiful interior design for sign-in",
  },
  quote: {
    text: "Welcome Back! The journey continues.",
    author: "E-Cell UCEOU",
  },
};


export function AuthUI({ signInContent = {} }) {
  const currentContent = {
    image: { ...defaultSignInContent.image, ...signInContent.image },
    quote: { ...defaultSignInContent.quote, ...signInContent.quote },
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-form-section">
        <AuthFormContainer />
      </div>

      <div
        className="auth-image-section"
        style={{ backgroundImage: `url(${currentContent.image.src})` }}
        key={currentContent.image.src}
      >
        <div className="auth-image-gradient" />

        <div className="auth-quote-container">
          <blockquote className="auth-quote">
            <p className="auth-quote-text">
              “
              <Typewriter
                key={currentContent.quote.text}
                text={currentContent.quote.text}
                speed={60}
              />
              ”
            </p>
            <cite className="auth-quote-author">— {currentContent.quote.author}</cite>
          </blockquote>
        </div>
      </div>
    </div>
  );
}
