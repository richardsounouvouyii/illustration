import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  message: string;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, message: '' };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, message: error.message || 'Erreur inattendue' };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Studio Illustrations crashed:', error, info.componentStack);
  }

  private handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            background: '#f8fafc',
            fontFamily: 'Plus Jakarta Sans, system-ui, sans-serif'
          }}
        >
          <div
            style={{
              maxWidth: 420,
              background: '#fff',
              border: '1px solid #e2e8f0',
              borderRadius: 12,
              padding: '1.5rem',
              boxShadow: '0 10px 30px rgba(15,23,42,0.08)'
            }}
          >
            <h1 style={{ fontSize: '1.15rem', marginBottom: '0.5rem' }}>Une erreur est survenue</h1>
            <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.5, marginBottom: '1rem' }}>
              L’éditeur a rencontré un problème. Rechargez la page pour continuer. Vos projets enregistrés restent
              en général dans le navigateur.
            </p>
            <p style={{ color: '#94a3b8', fontSize: '0.75rem', marginBottom: '1rem' }}>{this.state.message}</p>
            <button
              type="button"
              onClick={this.handleReload}
              style={{
                background: '#4f46e5',
                color: '#fff',
                border: 'none',
                borderRadius: 8,
                padding: '0.55rem 1rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Recharger
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
