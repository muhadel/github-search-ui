import React from 'react';
import styled from 'styled-components';

interface GitHubDropdownProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: { label: string; value: string }[];
}

const StyledGitHubDropdown = styled('select')(() => ({
  width: '100%',
  padding: '10px 14px',
  border: '1px solid #ccc',
  borderRadius: '4px',
  fontSize: '16px',
  backgroundColor: '#fff',
  appearance: 'none',
  cursor: 'pointer',
  transition: 'border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out',

  '&:focus': {
    borderColor: '#007bff',
    outline: 'none',
    boxShadow: '0 0 3px rgba(0, 123, 255, 0.5)',
  },

  '&:hover': {
    borderColor: '#999',
  },

  backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='18' height='18' fill='%23666'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E")`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right 10px center',
  backgroundSize: '18px',
}));

const GitHubDropdown: React.FC<GitHubDropdownProps> = ({ options, ...props }) => {
  return (
    <StyledGitHubDropdown {...props}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </StyledGitHubDropdown>
  );
};

export default GitHubDropdown;
