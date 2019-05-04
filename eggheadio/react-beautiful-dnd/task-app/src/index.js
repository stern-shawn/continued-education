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
  const [taskState, setTaskState] = useState(initialData)
  const [homeIndex, setHomeIndex] = useState(0)

  const onDragStart = ({ source }) => {
    const index = taskState.columnOrder.indexOf(source.droppableId)
    setHomeIndex(index)
  }

  const onDragEnd = ({ destination, source, draggableId }) => {
    setHomeIndex(0)
    console.log('source 🛫: ', source)
    console.log('destination 🛬: ', destination)
    console.log('draggableId: ', draggableId)
    // Early exit if destination object is null, ex. the user dropped outside of context
    if (!destination) return

    // Also check if the location didn't change at all
    if (destination.droppableId === source.droppableId && destination.index === source.index) return

    const start = taskState.columns[source.droppableId]
    const finish = taskState.columns[destination.droppableId]

    // Updating the same column
    if (start === finish) {
      const newTaskIds = [...start.taskIds]
      newTaskIds.splice(source.index, 1) // remove the task id from its previous index
      newTaskIds.splice(destination.index, 0, draggableId) // insert the task id at its new index

      setTaskState(s => ({
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

    setTaskState(s => ({
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
    <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
      <Container>
        {taskState.columnOrder.map((columnId, index) => {
          const column = taskState.columns[columnId]
          const tasks = column.taskIds.map(taskId => taskState.tasks[taskId])

          const isDropDisabled = index < homeIndex

          return <Column key={column.id} column={column} tasks={tasks} isDropDisabled={isDropDisabled} />
        })}
      </Container>
    </DragDropContext>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
