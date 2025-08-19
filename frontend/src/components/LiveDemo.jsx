import React, { useState } from 'react';
import { Play, Copy, RotateCcw, Sparkles } from 'lucide-react';

const LiveDemo = () => {
  const [selectedRole, setSelectedRole] = useState('professor');
  const [selectedTask, setSelectedTask] = useState('academic');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedText, setGeneratedText] = useState('');

  const roles = [
    { id: 'professor', name: 'Professor', accent: 'accent-blue' },
    { id: 'scientist', name: 'Scientist', accent: 'accent-purple' },
    { id: 'poet', name: 'Poet', accent: 'accent-pink' },
    { id: 'philosopher', name: 'Philosopher', accent: 'accent-orange' },
    { id: 'student', name: 'Student', accent: 'accent-green' },
    { id: 'gamer', name: 'Gamer', accent: 'accent-grey' }
  ];

  const tasks = [
    { id: 'academic', name: 'Academic Essay' },
    { id: 'blog', name: 'Blog Post' },
    { id: 'email', name: 'Professional Email' },
    { id: 'creative', name: 'Creative Writing' }
  ];

  const sampleOutputs = {
    professor: {
      academic: "The paradigm shift in artificial intelligence research has fundamentally altered our understanding of machine learning capabilities. Contemporary studies indicate that neural networks exhibit emergent properties previously considered exclusive to biological systems...",
      blog: "In today's rapidly evolving technological landscape, understanding artificial intelligence has become crucial for professionals across all industries. This comprehensive analysis explores the key developments...",
      email: "Dear Colleagues, I hope this message finds you well. I am writing to share some exciting developments in our recent AI research that may be of significant interest to your work...",
      creative: "In the hallowed halls of academia, where knowledge whispers its ancient secrets, a new form of intelligence began to stir. The algorithms, like eager students, absorbed centuries of human wisdom..."
    },
    scientist: {
      academic: "Our empirical analysis demonstrates a statistically significant correlation (p < 0.001) between neural network architecture complexity and performance metrics. The methodology employed rigorous experimental controls...",
      blog: "Breaking down the latest AI research findings: What do the numbers really tell us? Our team has been analyzing breakthrough studies, and the results might surprise you...",
      email: "Subject: Research Collaboration Opportunity - AI Applications in Neuroscience. Dear Dr. Johnson, Following our conversation at the conference, I wanted to share preliminary findings from our lab...",
      creative: "The data points danced across the screen like stars in a digital constellation. Each algorithm told a story of pattern recognition, of artificial neurons firing in sequences that mimicked the very essence of thought..."
    }
  };

  const generateContent = async () => {
    setIsGenerating(true);
    setGeneratedText('');
    
    // Simulate AI generation with typing effect
    const content = sampleOutputs[selectedRole]?.[selectedTask] || sampleOutputs.professor.academic;
    
    setTimeout(() => {
      let currentText = '';
      let index = 0;
      
      const typeInterval = setInterval(() => {
        if (index < content.length) {
          currentText += content[index];
          setGeneratedText(currentText);
          index++;
        } else {
          clearInterval(typeInterval);
          setIsGenerating(false);
        }
      }, 30);
    }, 500);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedText);
  };

  return (
    <section id="demo" style={{ padding: '5rem 0', background: 'var(--bg-page)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 className="heading-1" style={{ marginBottom: '1rem' }}>
            Try Our AI Writing Assistant
          </h2>
          <p className="body-large">
            Select a character role and writing task to see the magic happen
          </p>
        </div>

        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          {/* Role Selection */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 className="heading-3" style={{ marginBottom: '1rem' }}>Choose Character Role:</h3>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {roles.map((role) => (
                <button
                  key={role.id}
                  className={`voice-card ${role.accent} ${selectedRole === role.id ? 'selected' : ''}`}
                  style={{ 
                    padding: '0.5rem 1rem', 
                    minWidth: 'auto',
                    border: selectedRole === role.id ? '2px solid var(--text-primary)' : 'none'
                  }}
                  onClick={() => setSelectedRole(role.id)}
                >
                  <span className="body-small">{role.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Task Selection */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 className="heading-3" style={{ marginBottom: '1rem' }}>Writing Task:</h3>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {tasks.map((task) => (
                <button
                  key={task.id}
                  className={`btn-secondary ${selectedTask === task.id ? 'active' : ''}`}
                  style={{ 
                    background: selectedTask === task.id ? 'var(--text-primary)' : 'var(--glass-bg)',
                    color: selectedTask === task.id ? 'white' : 'var(--text-primary)'
                  }}
                  onClick={() => setSelectedTask(task.id)}
                >
                  {task.name}
                </button>
              ))}
            </div>
          </div>

          {/* Generate Button */}
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <button 
              className="btn-primary" 
              onClick={generateContent}
              disabled={isGenerating}
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.5rem', 
                margin: '0 auto',
                opacity: isGenerating ? 0.7 : 1
              }}
            >
              {isGenerating ? (
                <>
                  <Sparkles size={16} className="animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Play size={16} />
                  Generate Content
                </>
              )}
            </button>
          </div>

          {/* Output Area */}
          {(generatedText || isGenerating) && (
            <div className="voice-card" style={{ position: 'relative' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h4 className="heading-3">Generated Content</h4>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button 
                    className="btn-secondary" 
                    onClick={copyToClipboard}
                    style={{ padding: '0.5rem', minHeight: 'auto' }}
                  >
                    <Copy size={16} />
                  </button>
                  <button 
                    className="btn-secondary" 
                    onClick={() => setGeneratedText('')}
                    style={{ padding: '0.5rem', minHeight: 'auto' }}
                  >
                    <RotateCcw size={16} />
                  </button>
                </div>
              </div>
              <div 
                className="body-medium" 
                style={{ 
                  minHeight: '100px', 
                  padding: '1rem', 
                  background: 'var(--bg-section)', 
                  borderRadius: '0.5rem',
                  fontFamily: 'serif',
                  lineHeight: 1.6
                }}
              >
                {generatedText || (isGenerating && 'Generating content...')}
                {isGenerating && <span className="animate-pulse">|</span>}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default LiveDemo;