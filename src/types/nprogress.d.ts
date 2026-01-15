declare module 'nprogress' {
    interface NProgress {
        start(): NProgress;
        done(force?: boolean): NProgress;
        inc(amount?: number): NProgress;
        configure(options: NProgressOptions): NProgress;
        status: number | null;
        isStarted(): boolean;
        set(n: number): NProgress;
    }

    interface NProgressOptions {
        minimum?: number;
        template?: string;
        easing?: string;
        speed?: number;
        trickle?: boolean;
        trickleSpeed?: number;
        showSpinner?: boolean;
        parent?: string;
        positionUsing?: string;
        barSelector?: string;
        spinnerSelector?: string;
    }

    const nprogress: NProgress;
    export default nprogress;
}
