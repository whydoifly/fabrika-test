import { useState, useEffect } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { TaskForm } from './components/TaskForm'
import { TaskList } from './components/TaskList'
import { Task } from './types'

const API_URL = 'http://localhost:3001'

const AppContainer = styled.div`
  min-height: 100vh;
  background-color: #f1f5f9;
`

const ContentContainer = styled.div`
  max-width: 42rem;
  margin: 0 auto;
  padding: 2rem 1rem;
`

const Title = styled.h1`
  font-size: 1.875rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 2rem;
  color: #1e293b;
`

function App() {
  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${API_URL}/tasks`)
      setTasks(response.data)
    } catch (error) {
      console.error('Error fetching tasks:', error)
    }
  }

  const handleAddTask = async (title: string) => {
    try {
      const response = await axios.post(`${API_URL}/tasks`, { title })
      setTasks([...tasks, response.data])
    } catch (error) {
      console.error('Error adding task:', error)
    }
  }

  const handleToggleComplete = async (taskId: string, completed: boolean) => {
    try {
      const response = await axios.patch(`${API_URL}/tasks/${taskId}`, { completed })
      setTasks(tasks.map(task => 
        task.id === taskId ? response.data : task
      ))
    } catch (error) {
      console.error('Error updating task:', error)
    }
  }

  return (
    <AppContainer>
      <ContentContainer>
        <Title>Список задач</Title>
        <TaskForm onAddTask={handleAddTask} />
        <TaskList tasks={tasks} onToggleComplete={handleToggleComplete} />
      </ContentContainer>
    </AppContainer>
  )
}

export default App
