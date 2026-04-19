# PHASE 2B — Seedance 导航与页面文案清理

日期：2026-04-19
负责人：Codex

## 目标
- 把 Seedance 相关新页面清晰放入导航栏。
- 去掉“内部讨论语气/过程说明”的对外文案，避免用户困惑。
- 保持页面风格和现有 GenAnime 视觉系统一致。

## 已完成改动

### 1) 导航结构重排（减少杂乱）
文件：`src/components/layout/Header.tsx`

- 顶部主导航简化为：`Home / Generator / Gallery / Pricing`
- 新增高亮 `Seedance` 下拉分组（集中承载 3 个新页面）：
  - `Seedance Hub` → `/seedance`
  - `Seedance Prompts` → `/seedance-anime-prompts`
  - `Anime Image to Video` → `/anime-image-to-video`
- 移动端同样分组为 `Main` 与 `Seedance`，并统一为更简洁的字体层级与交互样式。

### 2) 页面文案清理（删除内部沟通式内容）
文件：`src/app/[locale]/(home)/seedance/page.tsx`

- 删除不适合对外展示的文案：
  - “Every major feature is labeled as available, beta, or planned ...”
- 删除整块“Capability Status”状态表（偏内部管理叙述，非用户核心价值）。
- 替换为用户价值导向表达：
  - 强调可直接复制使用的 Prompt 结构
  - 保留必要的能力边界说明，但改为任务导向语言

## 当前信息架构（IA）
- Seedance Hub（认知入口）
- Seedance Prompts（模板库）
- Anime Image to Video（执行工具）

三页关系为：入口页 → 模板页 → 执行页，形成闭环。

## 验收标准
- 导航能在桌面端和移动端清晰找到三页入口。
- 页面不再出现内部项目过程描述或“我们讨论过”语气。
- 用户首次访问可在 10 秒内理解：
  1) 这是做什么的
  2) 下一步点击哪里

## 下一步（避免返工）
1. 导航 A/B 微调（只改文案，不改结构）
   - 方案 A：`Seedance`
   - 方案 B：`Video AI`
2. 增加导航点击埋点（`seedance_nav_open` / `seedance_nav_click`）。
3. 做一次移动端首屏可读性快检（iPhone 12/13 视口）。
4. 基于 Search Console 数据再决定是否扩展到更多 Seedance 长尾页面。
