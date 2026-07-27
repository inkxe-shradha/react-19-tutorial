import React, {
  use,
  useActionState,
  useOptimistic,
  useState,
  Suspense,
  Activity,
} from 'react';

// Simulated Promise for use() Hook Demo
const fetchMessagePromise = new Promise((resolve) => {
  setTimeout(() => {
    resolve('✨ Data successfully unwrapped using React 19 use() API!');
  }, 1200);
});

// Component consuming Promise using use()
function PromiseMessageConsumer({ messagePromise }) {
  // React 19 use() hook unwraps promise values inside render!
  const message = use(messagePromise);
  return (
    <div
      style={{
        background: '#090d16',
        padding: '1rem',
        borderRadius: '8px',
        border: '1px solid #4ade80',
        color: '#4ade80',
        fontFamily: 'monospace',
      }}
    >
      {message}
    </div>
  );
}

// Action for useActionState
async function submitFeedbackAction(previousState, formData) {
  const comment = formData.get('comment');
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API delay

  if (!comment || comment.trim().length < 5) {
    return {
      status: 'error',
      message: 'Comment must be at least 5 characters long.',
    };
  }
  return { status: 'success', message: `Submitted: "${comment}"` };
}

const React19HooksDemo = () => {
  // 1. useActionState
  const initialFormState = {
    status: 'idle',
    message: '',
  };
  const [actionState, formAction, isPending] = useActionState(
    submitFeedbackAction,
    initialFormState,
  );

  // 2. useOptimistic Demo State
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React 19 Core' },
    { id: 2, text: 'Master useOptimistic()' },
  ]);

  const callBackTodoList = (currentTodos, newTodoText) => [
    ...currentTodos,
    {
      id: Date.now(),
      text: `${newTodoText} (Sending... Please waiting)`,
      sending: true,
    },
  ];

  // React 19 useOptimistic hook
  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    todos,
    callBackTodoList,
  );

  const handleAddTodo = async (formData) => {
    const todoText = formData.get('todoText');
    if (!todoText) return;

    // 1. Instantly update UI optimistically!
    addOptimisticTodo(todoText);

    // 2. Perform actual server request delay mock
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // 3. Update actual state when server confirms
    setTodos((prev) => [...prev, { id: Date.now(), text: todoText }]);
  };

  // 3. Tab switching demo for Activity / Suspense
  const [activeTab, setActiveTab] = useState('tab1');

  return (
    <div className="concept-container">
      <div className="concept-header">
        <div className="concept-header-top">
          <span style={{ fontSize: '1.75rem' }}>🚀</span>
          <h1 className="concept-title">React 19 New Hooks & APIs</h1>
          <span className="nav-badge badge-cyan">React 19 Core</span>
        </div>
        <p className="concept-description">
          Detailed student guide to React 19 flagship hooks:
          <code>use()</code>, <code>useActionState()</code>,{' '}
          <code>useOptimistic()</code>, and Activity state preservation.
        </p>
      </div>

      {/* 1. use() Hook */}
      <div className="concept-card">
        <h3 className="concept-card-title">
          1️⃣ The use() Hook (Promise & Context Unwrapping)
        </h3>
        <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
          In React 19, <code>use(promise)</code> unwraps promises inside render
          components when paired with <code>&lt;Suspense&gt;</code>. Unlike{' '}
          <code>useEffect</code>, <code>use()</code> can be called conditionally
          or inside loops!
        </p>

        <div className="demo-box">
          <Suspense
            fallback={
              <div style={{ color: '#fbbf24', fontSize: '0.9rem' }}>
                ⏳ Suspense Loading: Resolving promise using React 19 use()...
              </div>
            }
          >
            <PromiseMessageConsumer messagePromise={fetchMessagePromise} />
          </Suspense>
        </div>
      </div>

      {/* 2. useOptimistic() Hook */}
      <div className="concept-card">
        <h3 className="concept-card-title">
          2️⃣ useOptimistic() (Instant UI Feedback)
        </h3>
        <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
          <code>useOptimistic</code> lets you show a temporary optimistic state
          while an asynchronous action is underway. If the server request
          succeeds, actual state updates; if it fails, it rolls back gracefully.
        </p>

        <div className="demo-box">
          <form
            action={handleAddTodo}
            style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem' }}
          >
            <input
              type="text"
              name="todoText"
              placeholder="Add new task..."
              style={{
                padding: '0.6rem 1rem',
                borderRadius: '8px',
                border: '1px solid #334155',
                background: '#0f172a',
                color: '#fff',
                flex: 1,
              }}
            />
            <button type="submit">➕ Add Optimistically</button>
          </form>

          <div
            style={{
              background: '#1e293b',
              padding: '1rem',
              borderRadius: '10px',
              border: '1px solid #334155',
            }}
          >
            <h4 style={{ margin: '0 0 0.5rem 0', color: '#38bdf8' }}>
              Task List:
            </h4>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
              }}
            >
              {optimisticTodos.map((todo) => (
                <div
                  key={todo.id}
                  style={{
                    background: todo.sending ? '#334155' : '#0f172a',
                    padding: '0.5rem 0.85rem',
                    borderRadius: '6px',
                    fontSize: '0.9rem',
                    color: todo.sending ? '#fbbf24' : '#4ade80',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    border: todo.sending
                      ? '1px dashed #fbbf24'
                      : '1px solid #334155',
                  }}
                >
                  <span>{todo.text}</span>
                  {todo.sending && (
                    <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>
                      ⏳ Server Pending...
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 3. useActionState() Hook */}
      <div className="concept-card">
        <h3 className="concept-card-title">
          3️⃣ useActionState() (Form Action Handlers)
        </h3>
        <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
          <code>useActionState</code> integrates with standard HTML forms to
          manage pending states, responses, and errors natively without writing
          manual <code>setIsLoading(true)</code> handlers.
        </p>

        <div className="demo-box">
          <form
            action={formAction}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
              maxWidth: '450px',
            }}
          >
            <input
              type="text"
              name="comment"
              placeholder="Enter feedback comment..."
              style={{
                padding: '0.6rem 1rem',
                borderRadius: '8px',
                border: '1px solid #334155',
                background: '#0f172a',
                color: '#fff',
              }}
            />
            <button type="submit" disabled={isPending}>
              {isPending ? '⏳ Submitting Form Action...' : 'Submit Feedback'}
            </button>
          </form>

          {actionState.status === 'error' && (
            <p
              style={{
                color: '#f87171',
                margin: '0.75rem 0 0 0',
                fontSize: '0.85rem',
              }}
            >
              ❌ {actionState.message}
            </p>
          )}
          {actionState.status === 'success' && (
            <p
              style={{
                color: '#4ade80',
                margin: '0.75rem 0 0 0',
                fontSize: '0.85rem',
              }}
            >
              ✅ {actionState.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default React19HooksDemo;
