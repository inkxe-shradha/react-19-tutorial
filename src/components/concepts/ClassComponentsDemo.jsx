import React, { Component } from 'react';

/**
 * ============================================================================
 * 1. BASIC CLASS COMPONENT EXAMPLE: CounterClassComponent
 * ============================================================================
 * Key Concepts for Students:
 * - Extends React.Component
 * - State initialized in constructor using `this.state = { ... }`
 * - `this.setState()` is used to update state (triggers re-render)
 * - Lifecycle methods: componentDidMount, componentDidUpdate, componentWillUnmount
 */
class CounterClassComponent extends Component {
  constructor(props) {
    super(props); // Required: passes props to React.Component base class
    // Initializing local state
    this.state = {
      count: 0,
      lastUpdated: 'Not updated yet',
      logHistory: [],
    };

    // Binding 'this' if traditional methods are used (or use arrow function methods)
    this.handleReset = this.handleReset.bind(this);
  }

  /**
   * Lifecycle Method: componentDidMount
   * Runs ONCE after the component is mounted to the DOM.
   * Equivalent to: useEffect(() => { ... }, []) in Functional Components
   */
  componentDidMount() {
    console.log('[Lifecycle] CounterClassComponent Mounted into DOM');
    this.addLog('Component Mounted (componentDidMount)');
  }

  /**
   * Lifecycle Method: componentDidUpdate
   * Runs after every state or prop change.
   * Equivalent to: useEffect(() => { ... }, [dependencies])
   */
  componentDidUpdate(prevProps, prevState) {
    if (prevState.count !== this.state.count) {
      console.log(`[Lifecycle] Count changed from ${prevState.count} to ${this.state.count}`);
      // Note: Be careful not to call this.setState() unconditionally here to avoid infinite loops!
    }
  }

  /**
   * Lifecycle Method: componentWillUnmount
   * Runs right before component is removed from DOM (cleanup).
   * Equivalent to: return () => { ... } cleanup in useEffect
   */
  componentWillUnmount() {
    console.log('[Lifecycle] CounterClassComponent Unmounting...');
  }

  // Arrow function automatically binds 'this'
  handleIncrement = () => {
    // Correct way to update state based on previous state:
    this.setState((prevState) => ({
      count: prevState.count + 1,
      lastUpdated: new Date().toLocaleTimeString(),
    }));
  };

  handleDecrement = () => {
    this.setState((prevState) => ({
      count: prevState.count - 1,
      lastUpdated: new Date().toLocaleTimeString(),
    }));
  };

  // Traditional function (bound in constructor)
  handleReset() {
    this.setState({
      count: 0,
      lastUpdated: new Date().toLocaleTimeString(),
    });
  }

  addLog = (msg) => {
    this.setState((prev) => ({
      logHistory: [...prev.logHistory.slice(-4), `${new Date().toLocaleTimeString()} - ${msg}`],
    }));
  };

  render() {
    return (
      <div style={{ background: '#0f172a', padding: '1.25rem', borderRadius: '12px', border: '1px solid #334155' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h4 style={{ margin: 0, color: '#fbbf24', fontSize: '1.1rem' }}>
            🧮 Class-Based Counter Component
          </h4>
          <span style={{ fontSize: '0.8rem', background: 'rgba(251, 191, 36, 0.15)', color: '#fbbf24', padding: '0.2rem 0.6rem', borderRadius: '999px', fontWeight: 600 }}>
            this.state & this.setState
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '1rem' }}>
          <div style={{ background: '#1e293b', padding: '1rem 1.5rem', borderRadius: '10px', textAlign: 'center', border: '1px solid #334155' }}>
            <span style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Current Count</span>
            <div style={{ fontSize: '2.25rem', fontWeight: 800, color: '#38bdf8' }}>{this.state.count}</div>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button onClick={this.handleIncrement} style={{ background: '#0284c7', color: '#fff', border: 'none' }}>
              ➕ Increment
            </button>
            <button onClick={this.handleDecrement} style={{ background: '#475569', color: '#fff', border: 'none' }}>
              ➖ Decrement
            </button>
            <button onClick={this.handleReset} style={{ background: '#dc2626', color: '#fff', border: 'none' }}>
              🔄 Reset
            </button>
          </div>
        </div>

        <p style={{ fontSize: '0.85rem', color: '#94a3b8', margin: '0 0 0.5rem 0' }}>
          <strong>Last Updated:</strong> {this.state.lastUpdated}
        </p>

        {/* Lifecycle Log Window */}
        <div style={{ background: '#090d16', padding: '0.75rem', borderRadius: '8px', border: '1px solid #1e293b' }}>
          <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>LIFECYCLE EVENTS LOG:</span>
          <div style={{ fontFamily: 'monospace', fontSize: '0.8rem', color: '#4ade80', marginTop: '0.25rem' }}>
            {this.state.logHistory.map((log, idx) => (
              <div key={idx}>&gt; {log}</div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

/**
 * ============================================================================
 * 2. DATA FETCHING CLASS COMPONENT EXAMPLE: UserFetcherClassComponent
 * ============================================================================
 * Demonstrates fetching data in componentDidMount and updating state.
 */
class UserFetcherClassComponent extends Component {
  state = {
    userId: 1,
    userData: null,
    loading: false,
    error: null,
  };

  componentDidMount() {
    this.fetchUser(this.state.userId);
  }

  componentDidUpdate(prevProps, prevState) {
    // If userId changed, fetch new user data!
    if (prevState.userId !== this.state.userId) {
      console.log(
        `[Lifecycle] componentDidUpdate: prevUserId=${prevState.userId}, currentUserId=${this.state.userId}`,
      );
      this.fetchUser(this.state.userId);
    }
  }

  fetchUser = (id) => {
    this.setState({ loading: true, error: null });
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch user data');
        return res.json();
      })
      .then((data) => {
        this.setState({ userData: data, loading: false });
      })
      .catch((err) => {
        this.setState({ error: err.message, loading: false });
      });
  };

  handleNextUser = () => {
    this.setState((prev) => ({
      userId: prev.userId >= 10 ? 1 : prev.userId + 1,
    }));
  };

  render() {
    const { userId, userData, loading, error } = this.state;

    return (
      <div style={{ background: '#0f172a', padding: '1.25rem', borderRadius: '12px', border: '1px solid #334155', marginTop: '1.25rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h4 style={{ margin: 0, color: '#38bdf8', fontSize: '1.1rem' }}>
            📡 Class Component Async Data Fetcher
          </h4>
          <span style={{ fontSize: '0.8rem', background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', padding: '0.2rem 0.6rem', borderRadius: '999px', fontWeight: 600 }}>
            componentDidMount & componentDidUpdate
          </span>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginBottom: '1rem' }}>
          <button onClick={this.handleNextUser} disabled={loading}>
            {loading ? 'Fetching...' : `Load Next User (User ID: ${userId})`}
          </button>
        </div>

        {loading && <p style={{ color: '#fbbf24', fontSize: '0.9rem' }}>⏳ Fetching user info from API...</p>}
        {error && <p style={{ color: '#f87171', fontSize: '0.9rem' }}>❌ Error: {error}</p>}

        {userData && !loading && (
          <div style={{ background: '#1e293b', padding: '1rem', borderRadius: '8px', border: '1px solid #334155' }}>
            <p style={{ margin: '0 0 0.35rem 0', fontWeight: 600, color: '#f8fafc' }}>
              👤 {userData.name} (@{userData.username})
            </p>
            <p style={{ margin: '0 0 0.35rem 0', fontSize: '0.85rem', color: '#94a3b8' }}>
              📧 {userData.email} | 🌐 {userData.website}
            </p>
            <p style={{ margin: 0, fontSize: '0.85rem', color: '#94a3b8' }}>
              🏢 Company: {userData.company?.name}
            </p>
          </div>
        )}
      </div>
    );
  }
}

/**
 * MAIN PAGE COMPONENT FOR STUDENTS
 */
const ClassComponentsDemo = () => {
  return (
    <div className="concept-container">
      <div className="concept-header">
        <div className="concept-header-top">
          <span style={{ fontSize: '1.75rem' }}>📜</span>
          <h1 className="concept-title">React Legacy Class Components</h1>
          <span className="nav-badge badge-amber">Legacy Guide</span>
        </div>
        <p className="concept-description">
          Before React 16.8 introduced Hooks (like <code>useState</code> and{' '}
          <code>useEffect</code>), state and lifecycle methods were managed
          exclusively inside <strong>ES6 Class Components</strong> using{' '}
          <code>this.state</code>, <code>this.setState()</code>, and lifecycle
          methods like <code>componentDidMount</code>.
        </p>
      </div>

      {/* Concept Card 1: Interactive Demos */}
      <div className="concept-card">
        <h3 className="concept-card-title">
          🖥️ Interactive Class Component Demos
        </h3>
        <CounterClassComponent />
        <UserFetcherClassComponent />
      </div>

      {/* Concept Card 2: Educational Comparison Table & Comment Explanation */}
      <div className="concept-card">
        <h3 className="concept-card-title">
          📚 Cheat Sheet: Class Components vs Functional Hooks
        </h3>

        <div style={{ overflowX: 'auto', margin: '1rem 0' }}>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              textAlign: 'left',
              fontSize: '0.85rem',
            }}
          >
            <thead>
              <tr
                style={{
                  background: '#0f172a',
                  borderBottom: '2px solid #334155',
                }}
              >
                <th style={{ padding: '0.75rem', color: '#38bdf8' }}>
                  Feature
                </th>
                <th style={{ padding: '0.75rem', color: '#fbbf24' }}>
                  Class Component (Legacy)
                </th>
                <th style={{ padding: '0.75rem', color: '#4ade80' }}>
                  Functional Component (Modern)
                </th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #1e293b' }}>
                <td style={{ padding: '0.75rem', fontWeight: 600 }}>
                  State Declaration
                </td>
                <td
                  style={{
                    padding: '0.75rem',
                    fontFamily: 'monospace',
                    color: '#fef08a',
                  }}
                >
                  this.state = &#123; count: 0 &#125;
                </td>
                <td
                  style={{
                    padding: '0.75rem',
                    fontFamily: 'monospace',
                    color: '#bbf7d0',
                  }}
                >
                  const [count, setCount] = useState(0)
                </td>
              </tr>
              <tr style={{ borderBottom: '1px solid #1e293b' }}>
                <td style={{ padding: '0.75rem', fontWeight: 600 }}>
                  State Updates
                </td>
                <td
                  style={{
                    padding: '0.75rem',
                    fontFamily: 'monospace',
                    color: '#fef08a',
                  }}
                >
                  this.setState(&#123; count: 1 &#125;)
                </td>
                <td
                  style={{
                    padding: '0.75rem',
                    fontFamily: 'monospace',
                    color: '#bbf7d0',
                  }}
                >
                  setCount(1)
                </td>
              </tr>
              <tr style={{ borderBottom: '1px solid #1e293b' }}>
                <td style={{ padding: '0.75rem', fontWeight: 600 }}>
                  Component Mount
                </td>
                <td
                  style={{
                    padding: '0.75rem',
                    fontFamily: 'monospace',
                    color: '#fef08a',
                  }}
                >
                  componentDidMount() &#123; ... &#125;
                </td>
                <td
                  style={{
                    padding: '0.75rem',
                    fontFamily: 'monospace',
                    color: '#bbf7d0',
                  }}
                >
                  useEffect(() =&gt; &#123; ... &#125;, [])
                </td>
              </tr>
              <tr style={{ borderBottom: '1px solid #1e293b' }}>
                <td style={{ padding: '0.75rem', fontWeight: 600 }}>
                  Component Update
                </td>
                <td
                  style={{
                    padding: '0.75rem',
                    fontFamily: 'monospace',
                    color: '#fef08a',
                  }}
                >
                  componentDidUpdate(prevProps, prevState)
                </td>
                <td
                  style={{
                    padding: '0.75rem',
                    fontFamily: 'monospace',
                    color: '#bbf7d0',
                  }}
                >
                  useEffect(() =&gt; &#123; ... &#125;, [deps])
                </td>
              </tr>
              <tr>
                <td style={{ padding: '0.75rem', fontWeight: 600 }}>
                  Cleanup / Unmount
                </td>
                <td
                  style={{
                    padding: '0.75rem',
                    fontFamily: 'monospace',
                    color: '#fef08a',
                  }}
                >
                  componentWillUnmount()
                </td>
                <td
                  style={{
                    padding: '0.75rem',
                    fontFamily: 'monospace',
                    color: '#bbf7d0',
                  }}
                >
                  useEffect(() =&gt; () =&gt; cleanup, [])
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="code-snippet-box">
          {`/**
 * 💡 KEY TAKEAWAYS FOR STUDENTS:
 * 
 * 1. ALWAYS extend React.Component when writing class components.
 * 2. In class components, state is ALWAYS an object. You cannot store primitive values directly in state.
 * 3. Never mutate this.state directly! Always use this.setState({ key: newValue }).
 * 4. this.setState is ASYNCHRONOUS. If your new state depends on previous state, pass a function:
 *    this.setState((prevState) => ({ count: prevState.count + 1 }));
 * 5. Arrow functions inside class components automatically bind 'this', avoiding 'undefined' errors in event handlers.
 */`}
        </div>
      </div>
    </div>
  );
};

export default ClassComponentsDemo;
