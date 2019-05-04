import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import '@atlaskit/css-reset'
import { DragDropContext } from 'react-beautiful-dnd'
import Column from './Column'
import initialData from './initialData'

const App = () => {
  const [state, setState] = useState(initialData)

  const onDragEnd = ({ destination, source, draggableId }) => {
    console.log('source 🛫: ', source)
    console.log('destination: 🛬', destination)
    console.log('draggableId: ', draggableId)
    // Early exit if destination object is null, ex. the user dropped outside of context
    if (!destination) return

    // Also check if the location didn't change at all
    if (destination.droppableId === source.droppableId && destination.index === source.index) return

    const column = state.columns[source.droppableId]
    const newTaskIds = [...column.taskIds]
    newTaskIds.splice(source.index, 1) // remove the task id from its previous index
    newTaskIds.splice(destination.index, 0, draggableId) // insert the task id at its new index

    setState(s => ({
      ...s,
      columns: {
        ...s.columns,
        [column.id]: {
          ...column,
          taskIds: newTaskIds,
        },
      },
    }))
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {state.columnOrder.map(columnId => {
        const column = state.columns[columnId]
        const tasks = column.taskIds.map(taskId => state.tasks[taskId])

        return <Column key={column.id} column={column} tasks={tasks} />
      })}
    </DragDropContext>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
