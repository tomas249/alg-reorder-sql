export const originalEvents = [
  {
    "id": "111",
    "name": "Event one",
    "order": 10
  },
  {
    "id": "222",
    "name": "Event two",
    "order": 20
  },
  {
    "id": "333",
    "name": "Event three",
    "order": 30
  },
  {
    "id": "444",
    "name": "Event four",
    "order": 40
  },
  {
    "id": "555",
    "name": "Event five",
    "order": 50
  }
]

const test1 = {
  events: [
    {
      "id": "222",
      "name": "Event two",
      "order": 20 // moved
    },
    {
      "id": "111",
      "name": "Event one",
      "order": 10
    },
    {
      "id": "333",
      "name": "Event three",
      "order": 30
    },
    {
      "id": "555",
      "name": "Event five",
      "order": 50 // moved
    },
    {
      "id": "444",
      "name": "Event four",
      "order": 40
    },
  ],
  expected: [
    {
      "id": "222",
      "name": "Event two",
      "order": 5 // moved
    },
    {
      "id": "111",
      "name": "Event one",
      "order": 10
    },
    {
      "id": "333",
      "name": "Event three",
      "order": 30
    },
    {
      "id": "555",
      "name": "Event five",
      "order": 35 // moved
    },
    {
      "id": "444",
      "name": "Event four",
      "order": 40
    },
  ]
}

const test2 = {
  events: [
    {
      "id": "111",
      "name": "Event one",
      "order": 10
    },
    {
      "id": "222",
      "name": "Event two",
      "order": 20
    },
    {
      "id": "333",
      "name": "Event three",
      "order": 30
    },
    {
      "id": "555",
      "name": "Event five",
      "order": 50 // moved
    },
    {
      "id": "444",
      "name": "Event four",
      "order": 40
    },
  ],
  expected: [
    {
      "id": "111",
      "name": "Event one",
      "order": 10
    },
    {
      "id": "222",
      "name": "Event two",
      "order": 20
    },
    {
      "id": "333",
      "name": "Event three",
      "order": 30
    },
    {
      "id": "555",
      "name": "Event five",
      "order": 35 // moved
    },
    {
      "id": "444",
      "name": "Event four",
      "order": 40
    },
  ]
}

const test3 = {
  events: originalEvents,
  expected: originalEvents
}

const test4 = {
  events: [
    {
      "id": "111",
      "name": "Event one",
      "order": 10
    },
    {
      "id": "444",
      "name": "Event four",
      "order": 40 // moved
    },
    {
      "id": "555",
      "name": "Event five",
      "order": 50 // moved
    },
    {
      "id": "222",
      "name": "Event two",
      "order": 20
    },
    {
      "id": "333",
      "name": "Event three",
      "order": 30
    },
  ],
  expected: [
    {
      "id": "111",
      "name": "Event one",
      "order": 10
    },
    {
      "id": "444",
      "name": "Event four",
      "order": 15 // moved
    },
    {
      "id": "555",
      "name": "Event five",
      "order": 17.5 // moved
    },
    {
      "id": "222",
      "name": "Event two",
      "order": 20
    },
    {
      "id": "333",
      "name": "Event three",
      "order": 30
    },
  ]
}

export const tests = [
  test1,
  test2,
  test3,
  test4
]