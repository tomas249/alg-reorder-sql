function arrayGetter(array) {
  let index = 0
  return () => {
    const item = array[index]
    index += 1
    return item
  }
}

function initBlocks() {
  const blocks = []

  function createBlock() {
    blocks.push([])
  }

  function addLast(event) {
    blocks.at(-1).push(event)
  }

  return {
    createBlockWith: (event) => {
      createBlock()
      addLast(event)
    },
    addToLastBlock: (event) => {
      if (blocks.length === 0) {
        createBlock()
      }
      addLast(event)
    },
    getBlocks: () => blocks,
  }
}


  // block = array of events
  // blocks = array of blocks
  // 1. Find blocks
  // 2. Which blocks to move
  // 3. Calculate new order for blocks

export function calculateMoves2(events) {
  const originalEvents = events.oldOrder
  const originalEventsById = originalEvents.reduce((acc, e, index) => ({ ...acc, [e.id]: { ...e, index } }), {})
  const newEvents = events.newOrder

  // 1. Find blocks
  let blocks = initBlocks()
  newEvents.reduce((index, event) => {
    // Follow same block
    if (event.id === originalEvents[index]?.id) {
      blocks.addToLastBlock(event)
      return index + 1
    }
    // Start new block
    blocks.createBlockWith(event)
    return originalEvents.findIndex(e => e.id === event.id) + 1
  }, 0)
  blocks = blocks.getBlocks()
  
  // 2. Which blocks to move
  const updatedEvents = []
  const blocksToEdit = blocks
    .map(block => originalEventsById[block[0].id].index)
    .map((idxBlock, idx, aaa) => {
      const nextIdxBlock = aaa[idx + 1]
      if (typeof nextIdxBlock !== 'undefined' && nextIdxBlock - idxBlock < 0) {
        return idx
      } else {
        return false
      }
    })
    .filter(Number.isInteger)
    .forEach(idx => {
      const nextBlock = blocks[idx + 1] || blocks.at(-1)
      const nextOrder = nextBlock[0].order
      blocks[idx].forEach(event => {
        const eventIdx = newEvents.findIndex(e => e.id === event.id)
        const prevOrder = newEvents[eventIdx - 1]?.order || 0
        const newEvent = {
          ...event,
          order: (prevOrder + nextOrder) / 2
        }
        newEvents.splice(eventIdx, 1, newEvent)
      })
    })

  return newEvents
}
