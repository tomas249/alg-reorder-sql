function arrayGetter(array) {
  let index = 0
  return () => {
    const item = array[index]
    index += 1
    return item
  }
}

export function calculateMoves(events) {
  const order = events.oldOrder.map(e => e.id)
  const orderMap = order.reduce((acc, e, i) => ({ ...acc, [e]: i + 1 }), {})
  const eventsById = events.oldOrder.reduce((acc, e) => ({ ...acc, [e.id]: e }), {})
  const newOrder = events.newOrder.map(e => e.id)

  let blocks = -1
  const blocksAcc = []
  newOrder.reduce((index, event) => {
    // Follow same block
    if (event === order[index]) {
      if (blocksAcc[blocks]) {
        blocksAcc[blocks].push(event)
      } else {
        blocksAcc[blocks] = [event]
      }
      return index + 1
    }

    // Start new block
    blocks += 1
    blocksAcc[blocks] = [event]

    return order.indexOf(event) + 1
  }, 0)

  const points = blocksAcc.reduce((acc, block) => {
    const idxPerBlock = orderMap[block[0]]
    return [...acc, idxPerBlock]
  }, [])
  console.log(points)

  const eventsWithoutBlocks = []
  const indexBlocks = []
  points.forEach((point, idx, array) => {
    const nextPoint = array[idx + 1]
    if (nextPoint) {
      const isPrev = nextPoint - point < 0
      if (isPrev) {
        console.log(`Block: ${blocksAcc[idx]} | idx: ${idx}`)
        indexBlocks.push(idx)
      } else {
        eventsWithoutBlocks.push(blocksAcc[idx])
      }
    } else {
      eventsWithoutBlocks.push(blocksAcc[idx])
    }
  })

  const eventsAA = eventsWithoutBlocks.map(id => eventsById[id])
  indexBlocks.forEach((idx) => {
    const prevOrder = eventsAA[idx - 1] ? eventsAA[idx - 1].order : 0
    const nextOrder = eventsAA[idx] ? eventsAA[idx].order : eventsAA.at(-1).order + 10

    const newEvent = {
      ...eventsById[blocksAcc[idx]],
      order: (prevOrder + nextOrder) / 2
    }
    eventsAA.splice(idx, 0, newEvent)
  })

  console.dir({ events, eventsAA }, { depth: null })
  return eventsAA
}
