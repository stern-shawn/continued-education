import React from 'react'
import styled from 'styled-components/macro'
import { Draggable } from 'react-beautiful-dnd'

const Container = styled.div`
  background-color: ${props => (props.isDragging ? 'lightgreen' : 'white')};
  border: 1px solid lightgrey;
  border-radius: 2px;
  margin-bottom: 8px;
  padding: 8px;
`

const Task = ({ index, task }) => (
  <Draggable draggableId={task.id} index={index}>
    {(provided, snapshot) => (
      <Container
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        isDragging={snapshot.isDragging}
      >
        {task.content}
      </Container>
    )}
  </Draggable>
)

export default Task
