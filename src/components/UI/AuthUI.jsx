import React, { useState, useId, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import "./AuthUI.css";
import { SmoothInput } from "./SmoothInput";

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
  ]);

  return (
    <span className={className}>
      {displayText}
      <span className="animate-pulse">{cursor}</span>
    </span>
  );
}

const PasswordInput = React.forwardRef(({ className = "", label, ...props }, ref) => {
  const id = useId();
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  return (
    <div className="auth-field">
      {label && (
        <label htmlFor={id} className="auth-label">
          {label}
        </label>
      )}
      <div className="auth-password-wrapper">
        <SmoothInput
          id={id}
          type={showPassword ? "text" : "password"}
          className={`auth-input auth-password-input ${className}`}
          ref={ref}
          {...props}
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="auth-password-toggle"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? <EyeOff size={16} aria-hidden="true" /> : <Eye size={16} aria-hidden="true" />}
        </button>
      </div>
    </div>
  );
});
PasswordInput.displayName = "PasswordInput";

function SignInForm() {
  const handleSignIn = (event) => {
    event.preventDefault();
    console.log("UI: Sign In form submitted");
  };
  return (
    <form onSubmit={handleSignIn} autoComplete="on" className="auth-form">
      <div className="auth-form-header">
        <h1 className="auth-title">Sign in to your account</h1>
        <p className="auth-subtitle">Enter your email below to sign in</p>
      </div>
      <div className="auth-field">
        <label htmlFor="email" className="auth-label">
          Email
        </label>
        <SmoothInput
          id="email"
          name="email"
          type="email"
          placeholder="m@example.com"
          required
          autoComplete="email"
          className="auth-input"
        />
      </div>
      <PasswordInput
        name="password"
        label="Password"
        required
        autoComplete="current-password"
        placeholder="Password"
      />
      <button type="submit" className="auth-button-primary">
        Sign In
      </button>
    </form>
  );
}

function SignUpForm() {
  const handleSignUp = (event) => {
    event.preventDefault();
    console.log("UI: Sign Up form submitted");
  };
  return (
    <form onSubmit={handleSignUp} autoComplete="on" className="auth-form">
      <div className="auth-form-header">
        <h1 className="auth-title">Create an account</h1>
        <p className="auth-subtitle">Enter your details below to sign up</p>
      </div>
      <div className="auth-field">
        <label htmlFor="name" className="auth-label">
          Full Name
        </label>
        <SmoothInput
          id="name"
          name="name"
          type="text"
          placeholder="John Doe"
          required
          autoComplete="name"
          className="auth-input"
        />
      </div>
      <div className="auth-field">
        <label htmlFor="email" className="auth-label">
          Email
        </label>
        <SmoothInput
          id="email"
          name="email"
          type="email"
          placeholder="m@example.com"
          required
          autoComplete="email"
          className="auth-input"
        />
      </div>
      <PasswordInput
        name="password"
        label="Password"
        required
        autoComplete="new-password"
        placeholder="Password"
      />
      <button type="submit" className="auth-button-primary">
        Sign Up
      </button>
    </form>
  );
}

function AuthFormContainer({ isSignIn, onToggle }) {
  return (
    <div className="auth-form-container">
      {isSignIn ? <SignInForm /> : <SignUpForm />}
      <div style={{ textAlign: "center", fontSize: "0.875rem", marginTop: "1rem" }}>
        {isSignIn ? "Don't have an account?" : "Already have an account?"}{" "}
        <button type="button" className="auth-button-link" onClick={onToggle}>
          {isSignIn ? "Sign up" : "Sign in"}
        </button>
      </div>
      <div className="auth-divider">
        <span className="auth-divider-text">Or continue with</span>
      </div>
      <button
        type="button"
        className="auth-button-outline"
        onClick={() => console.log("UI: Google button clicked")}
      >
        <img
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          alt="Google icon"
          style={{ width: "16px", height: "16px" }}
        />
        Continue with Google
      </button>
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

const defaultSignUpContent = {
  image: {
    src: "https://i.ibb.co/HTZ6DPsS/original-33b8479c324a5448d6145b3cad7c51e7-removebg-preview.png",
    alt: "A vibrant, modern space for new beginnings",
  },
  quote: {
    text: "Create an account. A new chapter awaits.",
    author: "E-Cell UCEOU",
  },
};

export function AuthUI({ signInContent = {}, signUpContent = {} }) {
  const [isSignIn, setIsSignIn] = useState(true);
  const toggleForm = () => setIsSignIn((prev) => !prev);

  const finalSignInContent = {
    image: { ...defaultSignInContent.image, ...signInContent.image },
    quote: { ...defaultSignInContent.quote, ...signInContent.quote },
  };
  const finalSignUpContent = {
    image: { ...defaultSignUpContent.image, ...signUpContent.image },
    quote: { ...defaultSignUpContent.quote, ...signUpContent.quote },
  };

  const currentContent = isSignIn ? finalSignInContent : finalSignUpContent;

  return (
    <div className="auth-wrapper">
      <style>{`
        input[type="password"]::-ms-reveal,
        input[type="password"]::-ms-clear {
          display: none;
        }
      `}</style>
      <div className="auth-form-section">
        <AuthFormContainer isSignIn={isSignIn} onToggle={toggleForm} />
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
