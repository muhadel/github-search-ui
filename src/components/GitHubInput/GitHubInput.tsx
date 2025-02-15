import React from 'react';
import styled from 'styled-components';

type GitHubInputProps = React.InputHTMLAttributes<HTMLInputElement>;

const StyledGitHubInput = styled('input')<GitHubInputProps>(() => ({
  width: '100%',
  padding: '12px',
  border: '1px solid #b3b3b3',
  borderRadius: '4px',
  fontSize: '14px',
  backgroundColor: '#fff',
  transition: 'border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out',

  '&:focus': {
    borderColor: '#007bff',
    outline: 'none',
    boxShadow: '0 0 3px rgba(0, 123, 255, 0.5)',
  },

  '&:hover': {
    borderColor: '#999',
  },

  '&::placeholder': {
    color: '#aaa',
    fontSize: '13px',
  },
}));

const GitHubInput: React.FC<GitHubInputProps> = ({ ...props }) => {
  return <StyledGitHubInput {...props} aria-label={props['aria-label'] || 'Input field'} />;
};

export default GitHubInput;
