// 用户行为分析工具

export interface AnalyticsEvent {
    event: string;
    userId?: string;
    properties?: Record<string, any>;
    timestamp?: number;
}

class Analytics {
    private events: AnalyticsEvent[] = [];

    // 记录事件
    track(event: string, properties?: Record<string, any>, userId?: string) {
        const analyticsEvent: AnalyticsEvent = {
            event,
            userId,
            properties,
            timestamp: Date.now()
        };

        this.events.push(analyticsEvent);

        // 在开发环境下打印事件
        if (process.env.NODE_ENV === 'development') {
            console.log('📊 Analytics Event:', analyticsEvent);
        }

        // 发送到后端（可选）
        this.sendToBackend(analyticsEvent);
    }

    // 发送到后端分析服务
    private async sendToBackend(event: AnalyticsEvent) {
        try {
            // 这里可以集成 Google Analytics, Mixpanel 等
            // await fetch('/api/analytics', {
            //   method: 'POST',
            //   headers: { 'Content-Type': 'application/json' },
            //   body: JSON.stringify(event)
            // });
        } catch (error) {
            console.error('Analytics error:', error);
        }
    }

    // 获取本地事件（用于调试）
    getEvents() {
        return this.events;
    }

    // 清除事件
    clearEvents() {
        this.events = [];
    }
}

// 创建全局实例
export const analytics = new Analytics();

// 预定义的事件类型
export const AnalyticsEvents = {
    // 用户行为
    USER_LOGIN: 'user_login',
    USER_REGISTER: 'user_register',
    USER_LOGOUT: 'user_logout',

    // 生成相关
    IMAGE_GENERATION_START: 'image_generation_start',
    IMAGE_GENERATION_SUCCESS: 'image_generation_success',
    IMAGE_GENERATION_FAILED: 'image_generation_failed',

    // 转化相关
    CONVERSION_MODAL_SHOWN: 'conversion_modal_shown',
    CONVERSION_MODAL_DISMISSED: 'conversion_modal_dismissed',
    PRICING_PAGE_VISITED: 'pricing_page_visited',
    PURCHASE_INITIATED: 'purchase_initiated',
    PURCHASE_COMPLETED: 'purchase_completed',

    // 每日奖励
    DAILY_REWARD_MODAL_SHOWN: 'daily_reward_modal_shown',
    DAILY_REWARD_CLAIMED: 'daily_reward_claimed',
    DAILY_REWARD_DISMISSED: 'daily_reward_dismissed',

    // 功能使用
    STYLE_CHANGED: 'style_changed',
    MODEL_CHANGED: 'model_changed',
    RATIO_CHANGED: 'ratio_changed',

    // 页面访问
    GENERATOR_PAGE_VISITED: 'generator_page_visited',
    HISTORY_VIEWED: 'history_viewed',

    // 错误事件
    ERROR_OCCURRED: 'error_occurred'
} as const;

// 便捷方法
export const trackEvent = (event: string, properties?: Record<string, any>, userId?: string) => {
    analytics.track(event, properties, userId);
};

// 转化漏斗分析
export const trackConversionFunnel = {
    // 1. 用户进入生成器
    enterGenerator: (userId?: string) => {
        trackEvent(AnalyticsEvents.GENERATOR_PAGE_VISITED, {
            source: 'direct',
            timestamp: Date.now()
        }, userId);
    },

    // 2. 开始生成
    startGeneration: (userId?: string, properties?: any) => {
        trackEvent(AnalyticsEvents.IMAGE_GENERATION_START, {
            ...properties,
            timestamp: Date.now()
        }, userId);
    },

    // 3. 显示转化弹窗
    showConversionModal: (trigger: string, userId?: string) => {
        trackEvent(AnalyticsEvents.CONVERSION_MODAL_SHOWN, {
            trigger,
            timestamp: Date.now()
        }, userId);
    },

    // 4. 访问定价页面
    visitPricing: (source: string, userId?: string) => {
        trackEvent(AnalyticsEvents.PRICING_PAGE_VISITED, {
            source,
            timestamp: Date.now()
        }, userId);
    },

    // 5. 完成购买
    completePurchase: (amount: number, plan: string, userId?: string) => {
        trackEvent(AnalyticsEvents.PURCHASE_COMPLETED, {
            amount,
            plan,
            timestamp: Date.now()
        }, userId);
    }
};

// 每日奖励分析
export const trackDailyReward = {
    show: (streak: number, userId?: string) => {
        trackEvent(AnalyticsEvents.DAILY_REWARD_MODAL_SHOWN, {
            streak,
            timestamp: Date.now()
        }, userId);
    },

    claim: (streak: number, credits: number, userId?: string) => {
        trackEvent(AnalyticsEvents.DAILY_REWARD_CLAIMED, {
            streak,
            credits,
            timestamp: Date.now()
        }, userId);
    },

    dismiss: (streak: number, userId?: string) => {
        trackEvent(AnalyticsEvents.DAILY_REWARD_DISMISSED, {
            streak,
            timestamp: Date.now()
        }, userId);
    }
};