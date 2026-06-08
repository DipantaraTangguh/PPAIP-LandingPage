import { Component } from 'react';

export class ErrorBoundary extends Component {
    constructor(props) {
        super(props);

        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        this.props.onError?.(error, info);
    }

    handleRetry = () => {
        this.setState({ hasError: false });
    };

    handleReload = () => {
        window.location.reload();
    };

    render() {
        if (!this.state.hasError) {
            return this.props.children;
        }

        return (
            <main className="min-h-screen bg-surface-muted px-4 py-16 text-gray-900">
                <div className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center text-center">
                    <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-dark/10 text-3xl font-black text-brand-dark">
                        !
                    </div>
                    <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-brand-dark">
                        Ada yang error
                    </p>
                    <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
                        Halaman gagal dimuat
                    </h1>
                    <p className="mt-4 text-sm leading-6 text-gray-600 sm:text-base">
                        Maaf, ada bagian halaman yang lagi bermasalah. Coba muat ulang,
                        atau kembali ke beranda kalau error-nya masih muncul.
                    </p>

                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                        <button
                            type="button"
                            onClick={this.handleRetry}
                            className="rounded-full bg-brand-dark px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-brand-deep focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-dark focus-visible:ring-offset-2"
                        >
                            Coba lagi
                        </button>
                        <button
                            type="button"
                            onClick={this.handleReload}
                            className="rounded-full border border-gray-300 bg-white px-6 py-3 text-sm font-bold text-gray-800 shadow-sm transition hover:border-brand-dark hover:text-brand-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-dark focus-visible:ring-offset-2"
                        >
                            Muat ulang halaman
                        </button>
                        <a
                            href="/"
                            className="rounded-full border border-transparent px-6 py-3 text-sm font-bold text-brand-dark transition hover:bg-brand-dark/8 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-dark focus-visible:ring-offset-2"
                        >
                            Ke beranda
                        </a>
                    </div>
                </div>
            </main>
        );
    }
}
