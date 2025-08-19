import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Play, Copy, RotateCcw, Save, Download, Sparkles, Users, BookOpen, MessageSquare, Palette, Zap } from 'lucide-react';

const WritingWorkspace = () => {
  const { user } = useAuth();
  const [selectedRole, setSelectedRole] = useState('professor');
  const [selectedTask, setSelectedTask] = useState('academic');
  const [prompt, setPrompt] = useState('');
  const [generatedText, setGeneratedText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [documentTitle, setDocumentTitle] = useState('Untitled Document');

  const roles = [
    { id: 'professor', name: 'Professor', icon: <BookOpen size={16} />, accent: 'accent-blue' },
    { id: 'scientist', name: 'Scientist', icon: <Zap size={16} />, accent: 'accent-purple' },
    { id: 'poet', name: 'Poet', icon: <Palette size={16} />, accent: 'accent-pink' },
    { id: 'philosopher', name: 'Philosopher', icon: <Users size={16} />, accent: 'accent-orange' },
    { id: 'student', name: 'Student', icon: <BookOpen size={16} />, accent: 'accent-green' },
    { id: 'gamer', name: 'Gamer', icon: <Zap size={16} />, accent: 'accent-grey' }
  ];

  const tasks = [
    { id: 'academic', name: 'Academic Essay' },
    { id: 'blog', name: 'Blog Post' },
    { id: 'email', name: 'Professional Email' },
    { id: 'creative', name: 'Creative Writing' },
    { id: 'social', name: 'Social Media' },
    { id: 'marketing', name: 'Marketing Copy' }
  ];

  const sampleOutputs = {
    professor: {
      academic: "The paradigm shift in artificial intelligence research has fundamentally altered our understanding of machine learning capabilities. Contemporary studies indicate that neural networks exhibit emergent properties previously considered exclusive to biological systems. This comprehensive analysis examines the theoretical frameworks underlying these developments and their implications for future research trajectories.\n\nThe methodology employed in recent breakthroughs demonstrates a convergence of computational linguistics and cognitive science. Researchers have observed that large language models display unexpected reasoning capabilities when trained on diverse datasets. These findings challenge traditional assumptions about the relationship between statistical pattern recognition and genuine understanding.\n\nFurthermore, the interdisciplinary nature of current AI research necessitates collaboration between computer scientists, neuroscientists, and philosophers. The ethical considerations surrounding artificial general intelligence require careful examination of both technical and societal implications.",
      blog: "The world of artificial intelligence is evolving at breakneck speed, and staying informed has never been more crucial. As an educator who has witnessed the transformation of academic research over the past decades, I'm excited to share insights into the latest developments that are reshaping our understanding of machine intelligence.\n\nIn today's post, we'll explore three groundbreaking studies that have emerged from leading research institutions. These findings not only advance our theoretical knowledge but also have practical implications for industries ranging from healthcare to education.\n\nFirst, let's examine the recent work on emergent capabilities in large language models..."
    },
    scientist: {
      academic: "Our empirical analysis demonstrates a statistically significant correlation (p < 0.001, n = 2,847) between neural network architecture complexity and performance metrics across multiple benchmark datasets. The methodology employed rigorous experimental controls, including randomized weight initialization and cross-validation procedures to ensure reproducibility.\n\nThe experimental design incorporated three distinct model architectures: transformer-based attention mechanisms, convolutional neural networks with residual connections, and hybrid approaches combining both paradigms. Performance was evaluated using standardized metrics including BLEU scores, perplexity measures, and task-specific accuracy assessments.\n\nResults indicate that architectural complexity alone does not guarantee improved performance. Instead, the optimal configuration depends on the specific characteristics of the training data and the target application domain. These findings have significant implications for model selection in practical deployment scenarios.",
      blog: "Breaking down the latest AI research findings: What do the numbers really tell us? Our team has been analyzing breakthrough studies from the world's leading AI labs, and the results might surprise you.\n\nLet me walk you through our systematic review of 15 major papers published in the last quarter. We've identified three key trends that every tech professional should understand:\n\n1. Efficiency is overtaking raw performance\n2. Multimodal models are becoming the new standard\n3. Interpretability is finally getting the attention it deserves\n\nLet's dive into the data..."
    }
  };

  const generateContent = async () => {
    if (!prompt.trim()) {
      alert('Please enter a prompt to generate content');
      return;
    }

    if (user?.wordsUsed >= user?.wordsLimit && user?.wordsLimit !== -1) {
      alert('You have reached your word limit. Please upgrade your plan to continue.');
      return;
    }

    setIsGenerating(true);
    setGeneratedText('');
    
    // Simulate AI generation with typing effect
    const baseContent = sampleOutputs[selectedRole]?.[selectedTask] || sampleOutputs.professor.academic;
    const content = `Based on your prompt: "${prompt}"\n\n${baseContent}`;
    
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
          // Update user's word count (mock)
          // In real app, this would be handled by backend
        }
      }, 20);
    }, 1000);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedText);
    alert('Content copied to clipboard!');
  };

  const saveDocument = () => {
    // Mock save functionality
    alert(`Document "${documentTitle}" saved successfully!`);
  };

  const downloadDocument = () => {
    const element = document.createElement('a');
    const file = new Blob([generatedText], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${documentTitle}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Workspace Header */}
      <div style={{ 
        padding: '1.5rem 2rem', 
        borderBottom: '1px solid var(--border-light)',
        background: 'var(--bg-card)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <input
            type="text"
            value={documentTitle}
            onChange={(e) => setDocumentTitle(e.target.value)}
            style={{
              fontSize: '1.25rem',
              fontWeight: 600,
              border: 'none',
              background: 'transparent',
              color: 'var(--text-primary)',
              outline: 'none',
              minWidth: '200px'
            }}
            placeholder="Document Title"
          />
          
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button 
              onClick={saveDocument}
              className="btn-secondary" 
              style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
            >
              <Save size={16} style={{ marginRight: '0.5rem' }} />
              Save
            </button>
            {generatedText && (
              <button 
                onClick={downloadDocument}
                className="btn-secondary" 
                style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
              >
                <Download size={16} style={{ marginRight: '0.5rem' }} />
                Export
              </button>
            )}
          </div>
        </div>

        {/* Character Role Selection */}
        <div style={{ marginBottom: '1rem' }}>
          <h3 className="heading-3" style={{ marginBottom: '0.75rem' }}>AI Character Role:</h3>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {roles.map((role) => (
              <button
                key={role.id}
                className={`voice-card ${role.accent} ${selectedRole === role.id ? 'selected' : ''}`}
                style={{ 
                  padding: '0.5rem 1rem', 
                  minWidth: 'auto',
                  border: selectedRole === role.id ? '2px solid var(--text-primary)' : 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
                onClick={() => setSelectedRole(role.id)}
              >
                {role.icon}
                <span className="body-small">{role.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Writing Task Selection */}
        <div>
          <h3 className="heading-3" style={{ marginBottom: '0.75rem' }}>Writing Task:</h3>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {tasks.map((task) => (
              <button
                key={task.id}
                className={`btn-secondary ${selectedTask === task.id ? 'active' : ''}`}
                style={{ 
                  background: selectedTask === task.id ? 'var(--text-primary)' : 'var(--glass-bg)',
                  color: selectedTask === task.id ? 'white' : 'var(--text-primary)',
                  padding: '0.5rem 1rem',
                  fontSize: '0.875rem'
                }}
                onClick={() => setSelectedTask(task.id)}
              >
                {task.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Workspace */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* Input Section */}
        <div style={{ 
          width: '400px', 
          borderRight: '1px solid var(--border-light)',
          display: 'flex',
          flexDirection: 'column',
          background: 'var(--bg-card)'
        }}>
          <div style={{ padding: '1.5rem' }}>
            <h3 className="heading-3" style={{ marginBottom: '1rem' }}>Your Prompt</h3>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe what you want to write about... Be specific about your requirements, tone, and target audience."
              style={{
                width: '100%',
                minHeight: '200px',
                padding: '1rem',
                border: '1px solid var(--border-input)',
                borderRadius: '0.5rem',
                fontSize: '0.875rem',
                lineHeight: 1.6,
                resize: 'vertical',
                fontFamily: 'inherit',
                background: 'var(--bg-page)'
              }}
            />
            
            <button 
              className="btn-primary" 
              onClick={generateContent}
              disabled={isGenerating || !prompt.trim()}
              style={{ 
                width: '100%',
                marginTop: '1rem',
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                gap: '0.5rem',
                opacity: (isGenerating || !prompt.trim()) ? 0.7 : 1
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

            {user?.wordsLimit !== -1 && (
              <div style={{ marginTop: '1rem', padding: '0.75rem', background: 'var(--accent-blue-200)', borderRadius: '0.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span className="body-small">Words Remaining</span>
                  <span className="body-small" style={{ fontWeight: 600 }}>
                    {user?.wordsLimit - user?.wordsUsed}
                  </span>
                </div>
                <div style={{ 
                  height: '4px', 
                  background: 'var(--border-light)', 
                  borderRadius: '2px',
                  overflow: 'hidden'
                }}>
                  <div style={{ 
                    height: '100%', 
                    background: user?.wordsUsed / user?.wordsLimit > 0.8 ? '#EF4444' : 'var(--accent-blue-400)', 
                    borderRadius: '2px',
                    width: `${(user?.wordsUsed / user?.wordsLimit) * 100}%`,
                    transition: 'width 0.3s ease'
                  }}></div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Output Section */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: 'var(--bg-page)' }}>
          <div style={{ 
            padding: '1.5rem', 
            borderBottom: '1px solid var(--border-light)',
            background: 'var(--bg-card)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <h3 className="heading-3">Generated Content</h3>
            {generatedText && (
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button 
                  className="btn-secondary" 
                  onClick={copyToClipboard}
                  style={{ padding: '0.5rem', minHeight: 'auto' }}
                  title="Copy to clipboard"
                >
                  <Copy size={16} />
                </button>
                <button 
                  className="btn-secondary" 
                  onClick={() => setGeneratedText('')}
                  style={{ padding: '0.5rem', minHeight: 'auto' }}
                  title="Clear content"
                >
                  <RotateCcw size={16} />
                </button>
              </div>
            )}
          </div>
          
          <div style={{ flex: 1, padding: '1.5rem', overflow: 'auto' }}>
            <div 
              style={{ 
                minHeight: '300px', 
                padding: generatedText ? '1.5rem' : '3rem', 
                background: 'var(--bg-card)', 
                borderRadius: '0.75rem',
                border: '1px solid var(--border-light)',
                fontFamily: 'serif',
                fontSize: '1rem',
                lineHeight: 1.8,
                color: 'var(--text-primary)',
                whiteSpace: 'pre-wrap'
              }}
            >
              {generatedText || (
                <div style={{ 
                  textAlign: 'center', 
                  color: 'var(--text-muted)',
                  fontFamily: 'inherit'
                }}>
                  <Sparkles size={48} style={{ marginBottom: '1rem', opacity: 0.3 }} />
                  <p className="body-large">Your AI-generated content will appear here</p>
                  <p className="body-small">Enter a prompt and click "Generate Content" to get started</p>
                </div>
              )}
              {isGenerating && <span style={{ color: 'var(--accent-purple-400)', animation: 'pulse 1s infinite' }}>|</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WritingWorkspace;