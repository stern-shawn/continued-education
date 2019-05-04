import React from 'react'
import styled from 'styled-components/macro'
import { Draggable } from 'react-beautiful-dnd'

const Container = styled.div`
  background-color: ${props => (props.isDragging ? 'lightgreen' : 'white')};
  border: 1px solid lightgrey;
  border-radius: 2px;
  margin-bottom: 8px;
  padding: 8px;
  display: flex;
`

const Handle = styled.div`
  width: 10px;
  height: 20px;
  background-color: darkgrey;
  border-radius: 4px;
  margin-right: 8px;
`

const Task = ({ index, task }) => (
  <Draggable draggableId={task.id} index={index}>
    {(provided, snapshot) => (
      <Container ref={provided.innerRef} {...provided.draggableProps} isDragging={snapshot.isDragging}>
        <Handle {...provided.dragHandleProps} />
        {task.content}
      </Container>
    )}
  </Draggable>
)

export default Task
