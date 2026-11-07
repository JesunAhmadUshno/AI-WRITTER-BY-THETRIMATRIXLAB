import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import ChatbotWidget from '../components/ChatbotWidget';
import { chatbotResponses } from '../mock';

beforeAll(() => { Element.prototype.scrollIntoView = () => {}; });
beforeEach(() => jest.useFakeTimers());
afterEach(() => jest.useRealTimers());

test('a quick-reply button sends its question and gets the matching reply', () => {
  render(<ChatbotWidget isOpen onToggle={() => {}} />);
  fireEvent.click(screen.getByText('Show Pricing'));
  act(() => { jest.advanceTimersByTime(2000); });
  expect(screen.getByText('What are your pricing plans?')).toBeTruthy();
  expect(screen.getByText(chatbotResponses.pricing)).toBeTruthy();
  expect(screen.getByPlaceholderText('Ask me anything...').value).toBe('');
});
