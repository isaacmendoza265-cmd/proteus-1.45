import React from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  /** Al cambiar (por ejemplo, al abrir otro módulo) se limpia el error. */
  resetKey?: string;
}

interface ErrorBoundaryState {
  error: Error | null;
}

/**
 * Evita que el error de un módulo deje toda la app en blanco:
 * muestra un aviso en el lugar del módulo y el resto de Proteus sigue funcionando.
 */
export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('[Proteus] Error en un módulo:', error, info.componentStack);
  }

  componentDidUpdate(prevProps: ErrorBoundaryProps) {
    if (prevProps.resetKey !== this.props.resetKey && this.state.error) {
      this.setState({ error: null });
    }
  }

  render() {
    if (this.state.error) {
      return (
        <div className="m-6 rounded-2xl border border-rose-400/40 bg-rose-950/40 p-6 text-sm text-rose-100">
          <p className="font-bold">Este módulo tuvo un error y no se pudo mostrar.</p>
          <p className="mt-1 text-rose-200/80">
            El resto de Proteus sigue funcionando. Detalle técnico: {this.state.error.message}
          </p>
          <button
            onClick={() => this.setState({ error: null })}
            className="mt-3 rounded-lg bg-rose-500/30 px-3 py-1.5 font-semibold hover:bg-rose-500/50"
          >
            Reintentar
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
