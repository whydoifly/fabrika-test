import styled from 'styled-components';
import { Task } from '../types';

interface TaskListProps {
  tasks: Task[];
  onToggleComplete: (taskId: string, completed: boolean) => void;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Section = styled.div`
  margin-bottom: 1rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const TasksContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const TaskItem = styled.div<{ completed?: boolean }>`
  display: flex;
  align-items: center;
  padding: 0.75rem;
  background-color: ${props => props.completed ? '#f8fafc' : 'white'};
  border: 1px solid #e2e8f0;
  border-radius: 0.375rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
`;

const Checkbox = styled.input`
  margin-right: 0.75rem;
  width: 1.25rem;
  height: 1.25rem;
  cursor: pointer;
`;

const TaskTitle = styled.span<{ completed?: boolean }>`
  text-decoration: ${props => props.completed ? 'line-through' : 'none'};
  color: ${props => props.completed ? '#64748b' : 'inherit'};
`;

export const TaskList = ({ tasks, onToggleComplete }: TaskListProps) => {
  const incompleteTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  return (
    <Container>
      <Section>
        <SectionTitle>Предстоящие задачи ({incompleteTasks.length})</SectionTitle>
        <TasksContainer>
          {incompleteTasks.map(task => (
            <TaskItem key={task.id}>
              <Checkbox
                type="checkbox"
                checked={task.completed}
                onChange={(e) => onToggleComplete(task.id, e.target.checked)}
              />
              <TaskTitle>{task.title}</TaskTitle>
            </TaskItem>
          ))}
        </TasksContainer>
      </Section>

      {completedTasks.length > 0 && (
        <Section>
          <SectionTitle>Выполненные задачи ({completedTasks.length})</SectionTitle>
          <TasksContainer>
            {completedTasks.map(task => (
              <TaskItem key={task.id} completed>
                <Checkbox
                  type="checkbox"
                  checked={task.completed}
                  onChange={(e) => onToggleComplete(task.id, e.target.checked)}
                />
                <TaskTitle completed>{task.title}</TaskTitle>
              </TaskItem>
            ))}
          </TasksContainer>
        </Section>
      )}
    </Container>
  );
}; 