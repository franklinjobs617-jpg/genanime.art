"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

// 配置 NProgress
NProgress.configure({
    showSpinner: false,
    trickleSpeed: 200,
    minimum: 0.08,
    easing: 'ease',
    speed: 500
});

export default function RouteProgress() {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        // 路由完成时结束进度条
        NProgress.done();
    }, [pathname, searchParams]);

    useEffect(() => {
        // 监听所有链接点击事件
        const handleLinkClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const link = target.closest('a');

            if (link && link.href && !link.href.startsWith('#')) {
                const url = new URL(link.href);
                const currentUrl = new URL(window.location.href);

                // 如果是站内链接且不是当前页面，启动进度条
                if (url.origin === currentUrl.origin && url.pathname !== currentUrl.pathname) {
                    NProgress.start();
                }
            }
        };

        // 监听浏览器前进后退按钮
        const handlePopState = () => {
            NProgress.start();
        };

        document.addEventListener('click', handleLinkClick, true);
        window.addEventListener('popstate', handlePopState);

        return () => {
            document.removeEventListener('click', handleLinkClick, true);
            window.removeEventListener('popstate', handlePopState);
        };
    }, []);

    return null;
}
