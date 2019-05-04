import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import '@atlaskit/css-reset'
import { DragDropContext } from 'react-beautiful-dnd'
import styled from 'styled-components'

import initialData from './initialData'

import Column from './Column'

const Container = styled.div`
  display: flex;
`

const App = () => {
  const [state, setState] = useState(initialData)

  const onDragEnd = ({ destination, source, draggableId }) => {
    console.log('source 🛫: ', source)
    console.log('destination 🛬: ', destination)
    console.log('draggableId: ', draggableId)
    // Early exit if destination object is null, ex. the user dropped outside of context
    if (!destination) return

    // Also check if the location didn't change at all
    if (destination.droppableId === source.droppableId && destination.index === source.index) return

    const start = state.columns[source.droppableId]
    const finish = state.columns[destination.droppableId]

    // Updating the same column
    if (start === finish) {
      const newTaskIds = [...start.taskIds]
      newTaskIds.splice(source.index, 1) // remove the task id from its previous index
      newTaskIds.splice(destination.index, 0, draggableId) // insert the task id at its new index

      setState(s => ({
        ...s,
        columns: {
          ...s.columns,
          [start.id]: {
            ...start,
            taskIds: newTaskIds,
          },
        },
      }))
      return
    }

    // Moving between columns (remove from start, add to finish)
    const newStartTaskIds = [...start.taskIds]
    newStartTaskIds.splice(source.index, 1)

    const newFinishTaskIds = [...finish.taskIds]
    newFinishTaskIds.splice(destination.index, 0, draggableId)

    setState(s => ({
      ...s,
      columns: {
        ...s.columns,
        [start.id]: {
          ...start,
          taskIds: newStartTaskIds,
        },
        [finish.id]: {
          ...finish,
          taskIds: newFinishTaskIds,
        },
      },
    }))
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Container>
        {state.columnOrder.map(columnId => {
          const column = state.columns[columnId]
          const tasks = column.taskIds.map(taskId => state.tasks[taskId])

          return <Column key={column.id} column={column} tasks={tasks} />
        })}
      </Container>
    </DragDropContext>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
