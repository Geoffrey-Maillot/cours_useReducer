import { useReducer } from 'react';

type ActionType = 'increment' | 'decrement' | 'reset';

export function Count() {
  const countReducer = (count: number, action: ActionType) => {
    switch (action) {
      case 'increment':
        return count === 10 ? 0 : count + 1;

      case 'decrement':
        return count === 0 ? 10 : count - 1;

      case 'reset':
        return 0;

      default:
        throw new Error('Use a valid type of action');
    }
  };

  const [count, dispatch] = useReducer(countReducer, 0);

  return (
    <div>
      <h1>Compteur</h1>
      <div>{count}</div>
      <div>
        <button onClick={() => dispatch('increment')}>Increment</button>
        <button onClick={() => dispatch('decrement')}>Decrement</button>
        <button onClick={() => dispatch('reset')}>Reset</button>
      </div>
    </div>
  );
}
