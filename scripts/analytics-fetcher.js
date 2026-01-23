// Google Analytics 4 数据获取脚本
// 需要先设置 Google Analytics Reporting API

const { BetaAnalyticsDataClient } = require('@google-analytics/data');

class GADataFetcher {
    constructor(propertyId, credentialsPath) {
        this.propertyId = propertyId;
        this.analyticsDataClient = new BetaAnalyticsDataClient({
            keyFilename: credentialsPath,
        });
    }

    // 获取用户行为路径
    async getUserJourney(startDate = '7daysAgo', endDate = 'today') {
        try {
            const [response] = await this.analyticsDataClient.runReport({
                property: `properties/${this.propertyId}`,
                dateRanges: [{ startDate, endDate }],
                dimensions: [
                    { name: 'pagePath' },
                    { name: 'eventName' },
                    { name: 'sessionSource' }
                ],
                metrics: [
                    { name: 'sessions' },
                    { name: 'bounceRate' },
                    { name: 'averageSessionDuration' }
                ],
                orderBys: [{ metric: { metricName: 'sessions' }, desc: true }]
            });

            return this.formatResponse(response);
        } catch (error) {
            console.error('获取用户路径数据失败:', error);
            return null;
        }
    }

    // 获取转化漏斗数据
    async getConversionFunnel(startDate = '7daysAgo', endDate = 'today') {
        try {
            const [response] = await this.analyticsDataClient.runReport({
                property: `properties/${this.propertyId}`,
                dateRanges: [{ startDate, endDate }],
                dimensions: [{ name: 'eventName' }],
                metrics: [{ name: 'eventCount' }],
                dimensionFilter: {
                    filter: {
                        fieldName: 'eventName',
                        inListFilter: {
                            values: [
                                'generator_page_visited',
                                'image_generation_start',
                                'conversion_modal_shown',
                                'pricing_page_visited',
                                'purchase_completed'
                            ]
                        }
                    }
                }
            });

            return this.formatFunnelData(response);
        } catch (error) {
            console.error('获取转化漏斗数据失败:', error);
            return null;
        }
    }

    // 获取页面性能数据
    async getPagePerformance(startDate = '7daysAgo', endDate = 'today') {
        try {
            const [response] = await this.analyticsDataClient.runReport({
                property: `properties/${this.propertyId}`,
                dateRanges: [{ startDate, endDate }],
                dimensions: [{ name: 'pagePath' }],
                metrics: [
                    { name: 'screenPageViews' },
                    { name: 'bounceRate' },
                    { name: 'averageSessionDuration' },
                    { name: 'conversions' }
                ],
                orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }]
            });

            return this.formatResponse(response);
        } catch (error) {
            console.error('获取页面性能数据失败:', error);
            return null;
        }
    }

    formatResponse(response) {
        const data = [];
        response.rows?.forEach(row => {
            const rowData = {};
            row.dimensionValues?.forEach((dimension, index) => {
                const dimensionName = response.dimensionHeaders[index].name;
                rowData[dimensionName] = dimension.value;
            });
            row.metricValues?.forEach((metric, index) => {
                const metricName = response.metricHeaders[index].name;
                rowData[metricName] = parseFloat(metric.value);
            });
            data.push(rowData);
        });
        return data;
    }

    formatFunnelData(response) {
        const funnelSteps = {};
        response.rows?.forEach(row => {
            const eventName = row.dimensionValues[0].value;
            const eventCount = parseInt(row.metricValues[0].value);
            funnelSteps[eventName] = eventCount;
        });

        // 计算转化率
        const steps = [
            'generator_page_visited',
            'image_generation_start', 
            'conversion_modal_shown',
            'pricing_page_visited',
            'purchase_completed'
        ];

        const funnel = [];
        let previousCount = null;

        steps.forEach(step => {
            const count = funnelSteps[step] || 0;
            const conversionRate = previousCount ? (count / previousCount * 100).toFixed(2) : 100;
            
            funnel.push({
                step,
                count,
                conversionRate: `${conversionRate}%`
            });
            
            previousCount = count;
        });

        return funnel;
    }
}

// 使用示例
async function analyzeWebsite() {
    // 替换为你的 GA4 Property ID
    const propertyId = 'YOUR_GA4_PROPERTY_ID';
    const credentialsPath = './google-analytics-credentials.json';
    
    const fetcher = new GADataFetcher(propertyId, credentialsPath);
    
    console.log('🔍 获取用户行为数据...');
    const userJourney = await fetcher.getUserJourney();
    
    console.log('📊 获取转化漏斗数据...');
    const conversionFunnel = await fetcher.getConversionFunnel();
    
    console.log('⚡ 获取页面性能数据...');
    const pagePerformance = await fetcher.getPagePerformance();
    
    // 生成分析报告
    generateOptimizationReport({
        userJourney,
        conversionFunnel,
        pagePerformance
    });
}

function generateOptimizationReport(data) {
    console.log('\n📈 网站优化建议报告');
    console.log('========================');
    
    // 分析转化漏斗
    if (data.conversionFunnel) {
        console.log('\n🎯 转化漏斗分析:');
        data.conversionFunnel.forEach(step => {
            console.log(`${step.step}: ${step.count} 用户 (转化率: ${step.conversionRate})`);
        });
        
        // 找出转化率最低的环节
        const lowestConversion = data.conversionFunnel
            .slice(1) // 跳过第一步
            .reduce((min, step) => 
                parseFloat(step.conversionRate) < parseFloat(min.conversionRate) ? step : min
            );
        
        console.log(`\n⚠️  最需要优化的环节: ${lowestConversion.step} (${lowestConversion.conversionRate})`);
    }
    
    // 分析页面性能
    if (data.pagePerformance) {
        console.log('\n📄 页面性能分析:');
        const highBouncePage = data.pagePerformance
            .filter(page => page.bounceRate > 70)
            .sort((a, b) => b.bounceRate - a.bounceRate)[0];
            
        if (highBouncePage) {
            console.log(`⚠️  跳出率最高页面: ${highBouncePage.pagePath} (${highBouncePage.bounceRate}%)`);
        }
    }
}

module.exports = { GADataFetcher, analyzeWebsite };

// 如果直接运行此脚本
if (require.main === module) {
    analyzeWebsite().catch(console.error);
}