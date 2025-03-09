export interface Todo {
  id: string;
  title: string;
}

export interface TodoClient {
  retrieve: () => Todo[];
}

export class InMemoryTodoClient implements TodoClient {
  retrieve = (): Todo[] => {
    return [
      { title: 'Read the article about Testing Library', id: 'i234234' },
      { title: 'UI Benchmark', id: '3w4hkljsd' },
      { title: 'Split the tasks into small slices', id: '3549349348' },
      { title: 'Understand container queries', id: 'i2¡3453244234' },
      { title: 'Understand mix-max widht', id: '30909w4hkljsd' },
      { title: `Don't forget to do a proper slicing`, id: '35493493432238' },
    ];
  };
}
