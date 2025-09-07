'use client';

import { useState } from 'react';

export default function FloatingActionButton() {
  const [isExpanded, setIsExpanded] = useState(false);

  const quickActions = [
    { icon: '📞', label: 'Call Now', action: 'tel:+251913161841' },
    { icon: '📧', label: 'Email', action: 'mailto:drabdu@nurbros.com' },
    { icon: '📅', label: 'Book Online', action: '#contact' }
  ];

  return (
    <div className="fixed bottom-8 right-8 z-40">
      {/* Quick Actions */}
      {isExpanded && (
        <div className="mb-4 space-y-3">
          {quickActions.map((action, index) => (
            <div
              key={index}
              className={`glass glass-hover rounded-full p-3 transition-all duration-300 ${
                isExpanded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <a
                href={action.action}
                className="flex items-center space-x-3 text-gray-800 hover:text-blue-600 transition-colors"
              >
                <span className="text-2xl">{action.icon}</span>
                <span className="font-medium whitespace-nowrap">{action.label}</span>
              </a>
            </div>
          ))}
        </div>
      )}

      {/* Main FAB */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="glass glass-hover w-16 h-16 rounded-full flex items-center justify-center text-2xl glow-hover transition-all duration-300"
        aria-label="Quick actions"
      >
        <span className={`transition-transform duration-300 ${isExpanded ? 'rotate-45' : ''}`}>
          {isExpanded ? '✕' : '💬'}
        </span>
      </button>
    </div>
  );
}
