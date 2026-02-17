import React, { useState, useRef } from 'react';

const Registration = () => {
    const [status, setStatus] = useState("not valid");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [retypePassword, setRetypePassword] = useState("");
    const [matchStatus, setMatchStatus] = useState("");
    const [dob, setDob] = useState("");

    const submitBtnRef = useRef(null);
    const resetBtnRef = useRef(null);

    const btnSubmitclick = () => {
        if (password === retypePassword && password !== "" && status === "valid") {
            alert("Registration Form Submitted Successfully! 🎉");
        } else {
            alert("Please fix errors: Username ≥8 chars, passwords must match.");
        }
    };

    const btnResetclick = () => {
        setUsername("");
        setPassword("");
        setRetypePassword("");
        setDob("");
        setStatus("not valid");
        setMatchStatus("");
    };

    const validateUsername = (value) => {
        setStatus(value.length >= 8 ? "valid" : "not valid");
    };

    const checkMatch = (pass, rePass) => {
        setMatchStatus((pass === rePass && pass !== "") ? "matched" : "not matched");
    };

    const handleInputFocus = (e) => {
        e.target.style.transform = "scale(1.02)";
        e.target.style.boxShadow = "0 0 0 4px rgba(102,126,234,0.2)";
    };

    const handleInputBlur = (e) => {
        e.target.style.transform = "scale(1)";
        e.target.style.boxShadow = "none";
    };

    const handleButtonHover = (e, isEnter) => {
        if (isEnter) {
            e.target.style.transform = "translateY(-3px)";
            e.target.style.boxShadow = e.target.className.includes('primary') 
                ? "0 10px 30px rgba(102,126,234,0.6)" 
                : "0 10px 30px rgba(0,0,0,0.15)";
        } else {
            e.target.style.transform = "translateY(0)";
            e.target.style.boxShadow = e.target.className.includes('primary')
                ? "0 4px 15px rgba(102,126,234,0.4)"
                : "0 2px 10px rgba(0,0,0,0.1)";
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <div style={styles.header}>
                    <h2 style={styles.title}>Registration Form</h2>
                    <p style={styles.subtitle}>Join us today! It's quick and easy.</p>
                </div>

                {/* Username Field */}
                <div style={styles.inputGroup}>
                    <label style={styles.label}>Username</label>
                    <div style={styles.inputWrapper}>
                        <span style={styles.inputIcon}>👤</span>
                        <input
                            type="text"
                            placeholder="Enter username (min 8 chars)"
                            value={username}
                            style={{
                                ...styles.input,
                                borderColor: status === "valid" ? "#4caf50" : 
                                           (status === "not valid" && username) ? "#f44336" : "#e0e0e0",
                                boxShadow: status === "valid" ? "0 0 0 3px rgba(76,175,80,0.25)" : 
                                         (status === "not valid" && username) ? "0 0 0 3px rgba(244,67,54,0.25)" : "none"
                            }}
                            onChange={(e) => {
                                setUsername(e.target.value);
                                validateUsername(e.target.value);
                            }}
                            onFocus={handleInputFocus}
                            onBlur={handleInputBlur}
                        />
                    </div>
                    <small style={styles.validationText(status === "valid", username)}>
                        {status === "valid" ? "✓ Username is valid!" : 
                         (username && status === "not valid" ? "❌ Minimum 8 characters required" : "")}
                    </small>
                </div>

                {/* Password Field */}
                <div style={styles.inputGroup}>
                    <label style={styles.label}>Password</label>
                    <div style={styles.inputWrapper}>
                        <span style={styles.inputIcon}>🔒</span>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            style={styles.input}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                checkMatch(e.target.value, retypePassword);
                            }}
                            onFocus={handleInputFocus}
                            onBlur={handleInputBlur}
                        />
                    </div>
                </div>

                {/* Retype Password Field */}
                <div style={styles.inputGroup}>
                    <label style={styles.label}>Retype Password</label>
                    <div style={styles.inputWrapper}>
                        <span style={styles.inputIcon}>🔐</span>
                        <input
                            type="password"
                            placeholder="Confirm your password"
                            value={retypePassword}
                            style={styles.input}
                            onChange={(e) => {
                                setRetypePassword(e.target.value);
                                checkMatch(password, e.target.value);
                            }}
                            onFocus={handleInputFocus}
                            onBlur={handleInputBlur}
                        />
                    </div>
                    <small style={styles.validationText(matchStatus === "matched", password || retypePassword)}>
                        {matchStatus === "matched" ? "✓ Passwords match perfectly!" : 
                         (password || retypePassword ? "❌ Passwords do not match" : "")}
                    </small>
                </div>

                {/* Date of Birth Field */}
                <div style={styles.inputGroup}>
                    <label style={styles.label}>Date of Birth</label>
                    <div style={styles.inputWrapper}>
                        <span style={styles.inputIcon}>📅</span>
                        <input
                            type="date"
                            style={styles.input}
                            value={dob}
                            onChange={(e) => setDob(e.target.value)}
                            onFocus={handleInputFocus}
                            onBlur={handleInputBlur}
                        />
                    </div>
                </div>

                {/* Buttons */}
                <div style={styles.buttonRow}>
                    <button 
                        ref={submitBtnRef}
                        className="primary"
                        style={styles.primaryBtn}
                        onClick={btnSubmitclick}
                        onMouseEnter={(e) => handleButtonHover(e, true)}
                        onMouseLeave={(e) => handleButtonHover(e, false)}
                    >
                        Register Now
                    </button>
                    <button 
                        ref={resetBtnRef}
                        className="secondary"
                        style={styles.secondaryBtn}
                        onClick={btnResetclick}
                        onMouseEnter={(e) => handleButtonHover(e, true)}
                        onMouseLeave={(e) => handleButtonHover(e, false)}
                    >
                        Reset Form
                    </button>
                </div>

                <div style={styles.footer}>
                    <small style={styles.footerText}>Already have an account? <span style={styles.link}>Login</span></small>
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        padding: "20px",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    },
    card: {
        background: "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255, 255, 255, 0.3)",
        padding: "45px 35px",
        width: "100%",
        maxWidth: "440px",
        borderRadius: "24px",
        boxShadow: "0 25px 50px rgba(0,0,0,0.15)",
        display: "flex",
        flexDirection: "column",
        gap: "24px"
    },
    header: {
        textAlign: "center"
    },
    title: {
        margin: "0 0 8px 0",
        fontSize: "32px",
        fontWeight: "800",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        letterSpacing: "-0.5px"
    },
    subtitle: {
        margin: 0,
        color: "#666",
        fontSize: "15px",
        fontWeight: "400"
    },
    inputGroup: {
        display: "flex",
        flexDirection: "column",
        gap: "8px"
    },
    label: {
        fontSize: "14px",
        fontWeight: "600",
        color: "#333",
        letterSpacing: "0.3px"
    },
    inputWrapper: {
        position: "relative",
        display: "flex"
    },
    inputIcon: {
        position: "absolute",
        left: "18px",
        top: "50%",
        transform: "translateY(-50%)",
        fontSize: "20px",
        color: "#999",
        zIndex: 2,
        pointerEvents: "none"
    },
    input: {
        width: "100%",
        padding: "16px 18px 16px 55px",
        borderRadius: "14px",
        border: "2px solid #e0e0e0",
        fontSize: "16px",
        outline: "none",
        background: "rgba(255,255,255,0.85)",
        transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
        backdropFilter: "blur(12px)",
        boxShadow: "0 4px 15px rgba(0,0,0,0.08)"
    },
    validationText: (isValid, hasValue) => ({
        fontSize: "13px",
        opacity: hasValue ? 1 : 0,
        color: isValid ? "#4caf50" : "#f44336",
        transition: "opacity 0.2s ease",
        fontWeight: "500"
    }),
    buttonRow: {
        display: "flex",
        gap: "16px",
        marginTop: "8px"
    },
    primaryBtn: {
        flex: 1,
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        color: "#fff",
        border: "none",
        padding: "16px 24px",
        borderRadius: "14px",
        cursor: "pointer",
        fontSize: "16px",
        fontWeight: "600",
        transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
        boxShadow: "0 6px 20px rgba(102,126,234,0.4)"
    },
    secondaryBtn: {
        flex: 1,
        background: "rgba(255,255,255,0.25)",
        color: "#333",
        border: "2px solid rgba(255,255,255,0.4)",
        padding: "16px 24px",
        borderRadius: "14px",
        cursor: "pointer",
        fontSize: "16px",
        fontWeight: "600",
        transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
        backdropFilter: "blur(12px)",
        boxShadow: "0 4px 15px rgba(0,0,0,0.1)"
    },
    footer: {
        textAlign: "center",
        paddingTop: "20px",
        borderTop: "1px solid rgba(0,0,0,0.1)"
    },
    footerText: {
        color: "#666",
        fontSize: "14px"
    },
    link: {
        color: "#667eea",
        fontWeight: "600",
        cursor: "pointer",
        textDecoration: "none"
    }
};

export default Registration;
