import { useState, useEffect } from 'react';
import { queryGemini } from '../services/gemini';
import { speakText } from '../services/elevenLabs';
import './InterviewPrep.css';

export default function InterviewPrep() {
    const [isActive, setIsActive] = useState(false);
    const [conversation, setConversation] = useState([]);
    const [currentTranscript, setCurrentTranscript] = useState('');
    const [feedback, setFeedback] = useState(null);
    const [loading, setLoading] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date());

    // Update time every second
    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const formatDateTime = (date) => {
        const year = date.getUTCFullYear();
        const month = String(date.getUTCMonth() + 1).padStart(2, '0');
        const day = String(date.getUTCDate()).padStart(2, '0');
        const hours = String(date.getUTCHours()).padStart(2, '0');
        const minutes = String(date.getUTCMinutes()).padStart(2, '0');
        const seconds = String(date.getUTCSeconds()).padStart(2, '0');
        
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };

    const startInterview = async () => {
        setIsActive(true);
        setConversation([]);
        setFeedback(null);
        setLoading(true);

        try {
            const question = await queryGemini(
                "You are interviewing a student for a research assistant position. Ask one warm opening question about their background. Keep it to 2 sentences. Provide the response in plain text without any markdown formatting."
            );

            setConversation([{ role: 'Interviewer', content: question }]);
            await speakText(question);
        } catch (error) {
            console.error(error);
            alert('Failed to start interview. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmitAnswer = async () => {
        if (!currentTranscript.trim()) return;

        const answer = currentTranscript.trim();
        const updatedConv = [...conversation, { role: 'You', content: answer }];
        setConversation(updatedConv);
        setCurrentTranscript('');
        setLoading(true);

        try {
            const context = updatedConv.map(m => `${m.role}: ${m.content}`).join('\n');
            const nextQ = await queryGemini(
                `Interview conversation:\n${context}\n\nAsk a brief follow-up question (2 sentences max). Provide the response in plain text without any markdown formatting.`
            );

            setConversation([...updatedConv, { role: 'Interviewer', content: nextQ }]);
            await speakText(nextQ);
        } catch (error) {
            console.error(error);
            alert('Failed to get response. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const endInterview = async () => {
        setLoading(true);
        try {
            const context = conversation.map(m => `${m.role}: ${m.content}`).join('\n');
            const fb = await queryGemini(
                `Interview:\n${context}\n\nProvide brief feedback:\n1. Overall impression\n2. Strengths (2 points)\n3. Improvements (2 points)\n\nProvide the response in plain text without any markdown formatting.`
            );

            setFeedback(fb);
            setIsActive(false);
        } catch (error) {
            console.error(error);
            alert('Failed to generate feedback.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* Control Panel Card */}
<div className="interview-card control-card fade-in">
    <div className="card-shine"></div>
    <div className="interview-card-body">
        <div className="control-header">
            <div className="control-title-section">
                <div className="control-title-icon">
                    <i className="fa-solid fa-microphone-lines"></i>
                </div>
                <div className="control-title-text">
                    <h3 className="control-title">Interview Practice</h3>
                    <p className="control-subtitle">Practice your interview skills with AI</p>
                </div>
            </div>
            <div className="control-buttons">
                {!isActive && !feedback && (
                    <>
                        <button
                            className="btn-interview-test"
                            onClick={() => speakText("Hello, this is a voice test.")}
                            disabled={loading}
                        >
                            <i className="fa-solid fa-volume-high me-2"></i>
                            Test Voice
                        </button>
                        <button
                            className="btn-interview-start"
                            onClick={startInterview}
                            disabled={loading}
                        >
                            {loading ? (
                                <span className="spinner-interview me-2"></span>
                            ) : (
                                <i className="fa-solid fa-play me-2"></i>
                            )}
                            Start Interview
                        </button>
                    </>
                )}
                {isActive && (
                    <button
                        className="btn-interview-end"
                        onClick={endInterview}
                        disabled={loading}
                    >
                        {loading ? (
                            <span className="spinner-interview me-2"></span>
                        ) : (
                            <i className="fa-solid fa-stop me-2"></i>
                        )}
                        End & Get Feedback
                    </button>
                )}
                {feedback && (
                    <button 
                        className="btn-interview-new" 
                        onClick={() => { setFeedback(null); setConversation([]); }}
                    >
                        <i className="fa-solid fa-rotate-right me-2"></i>
                        New Interview
                    </button>
                )}
            </div>
        </div>
    </div>
</div>
        </>
    );
}