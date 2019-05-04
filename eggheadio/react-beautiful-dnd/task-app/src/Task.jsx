import React from 'react'
import styled from 'styled-components/macro'
import { Draggable } from 'react-beautiful-dnd'

const Container = styled.div`
  background-color: white;
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
`

const Task = ({ index, task }) => (
  <Draggable draggableId={task.id} index={index}>
    {provided => (
      <Container ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
        {task.content}
      </Container>
    )}
  </Draggable>
)

export default Task
