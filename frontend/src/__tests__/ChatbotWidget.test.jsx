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

test('two messages sent before the bot replies keep unique React keys', () => {
  const errors = jest.spyOn(console, 'error').mockImplementation(() => {});
  render(<ChatbotWidget isOpen onToggle={() => {}} />);
  const input = screen.getByPlaceholderText('Ask me anything...');
  const send = (text) => {
    fireEvent.change(input, { target: { value: text } });
    fireEvent.keyPress(input, { key: 'Enter', code: 'Enter', charCode: 13 });
  };
  send('hi');
  act(() => { jest.advanceTimersByTime(300); });
  send('price');
  act(() => { jest.advanceTimersByTime(2000); });
  expect(screen.getByText(chatbotResponses.pricing)).toBeTruthy();
  const dupKey = errors.mock.calls.some((c) => c.join(' ').includes('same key'));
  errors.mockRestore();
  expect(dupKey).toBe(false);
});
