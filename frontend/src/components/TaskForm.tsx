import { useState, FormEvent } from 'react';
import styled from 'styled-components';

interface TaskFormProps {
  onAddTask: (title: string) => void;
}

const Form = styled.form`
  margin-bottom: 1rem;
`;

const FormContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const Input = styled.input`
  flex: 1;
  padding: 0.5rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.375rem;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: #3b82f6;
  }
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 0.375rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #2563eb;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
  }
`;

export const TaskForm = ({ onAddTask }: TaskFormProps) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAddTask(title.trim());
      setTitle('');
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormContainer>
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter new task..."
        />
        <Button type="submit">
          Add Task
        </Button>
      </FormContainer>
    </Form>
  );
}; 