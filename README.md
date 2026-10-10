# UI/UX 设计师 · 个人简历作品集模版

一个为 UI/UX 设计师准备的**单页作品集 / 简历模版**，使用原生 HTML / CSS / JavaScript 编写，
**零依赖、零构建**，下载即可用，改改文字就能上线。

## ✨ 功能特性

- 💧 苹果风「液态玻璃」按钮与毛玻璃材质（顶部高光、扫光、按下回弹）
- 🌗 深色 / 浅色双主题，自动记忆偏好
- 📱 全响应式布局（桌面 / 平板 / 手机）
- 🗂 作品分类筛选 + 项目详情弹窗
- 📊 技能条、时间轴、数据速览等简历模块
- 🎬 滚动入场动画、悬浮卡片等微交互（尊重系统「减少动效」设置）
- ♿ 语义化标签、键盘可操作、聚焦样式等无障碍细节
- 🧩 纯静态、无构建步骤，可直接部署到 GitHub Pages / Vercel / 任意静态托管

## 📁 目录结构

```
uiux-portfolio/
├── index.html        # 唯一的页面：所有文案都在这里
├── css/
│   └── style.css     # 样式：顶部有 CSS 变量，换色改这里
├── js/
│   └── main.js       # 交互逻辑：项目详情文案在其中的 PROJECTS 对象
├── assets/           # （可选）放你的头像、简历 PDF、作品图
└── README.md         # 本文件
```

## 🚀 快速开始

1. 双击 `index.html` 即可在浏览器中打开；
2. 或用任意静态服务器启动，例如：

```bash
cd uiux-portfolio
python3 -m http.server 8090
# 打开 http://localhost:8090
```

3. 部署：把整个文件夹推到 GitHub 仓库，在 Settings → Pages 里开启，
   或直接拖进 Vercel / Netlify，即可获得在线链接。

## 🌍 在线地址与更新

- 在线地址：**https://jiangyuxuan765-sudo.github.io/uiux-portfolio/**
- 源码仓库：https://github.com/jiangyuxuan765-sudo/uiux-portfolio

更新方式：在本目录修改文件后提交并推送，GitHub 会在几分钟内自动重新发布：

```bash
git add -A && git commit -m "更新内容" && git push
```

## ✏️ 如何换成你自己的内容

### 1. 基本信息（index.html）
- **标题 / SEO**：`<title>` 与 `<meta name="description">`
- **导航 Logo**：`.brand-mark` 里的「LM」与 `.brand-text` 文字
- **Hero 区**：姓名、职位、简介、CTA 文案
- **关于区**：照片（详见下一条）、介绍段落、`.facts` 里的四项信息
- **经历区**：`.timeline` 中每条 `.tl-item` 的公司、时间与要点
- **联系区**：邮箱、微信、社交链接

### 2. 头像与简历文件
在 `index.html` 关于区，把示例 SVG 插画替换为你自己的照片：

```html
<img src="assets/portrait.jpg" alt="你的头像">
```

简历下载按钮目前是演示状态，把 `#resume-btn` 和「查看完整简历」的 `href="#"` 改成
`href="assets/resume.pdf"` 即可。

### 3. 作品项目
- **卡片**：在 `#portfolio-grid` 里复制一份 `.portfolio-card`，
  修改标题、简介、标签，并把 `data-project` 改成唯一的新 key（如 `myapp`），
  `data-category` 填写分类（多个用空格分隔，如 `移动端 品牌`）。
- **详情弹窗**：在 `js/main.js` 的 `PROJECTS` 对象里添加同名的 key，
  照抄其他项目的字段填写即可（职责、成果、工具等）。
- **封面**：`.card-cover` 自带的渐变色类为 `c-1` ～ `c-6`；
  想用真实作品图，直接把 `<span class="cover-glyph">` 替换为
  `<img src="assets/xxx.png" alt="" style="width:100%;height:100%;object-fit:cover">`。

### 4. 配色与玻璃材质（css/style.css）
文件顶部有全部 CSS 变量，换主题色只需改这几个：

```css
[data-theme="light"] {
  --accent: #5e5ce6;   /* 主色 */
  --accent-2: #bf5af2; /* 渐变辅色 */
  --glass-hi / --glass-lo / --glass-border: …   /* 玻璃高光 / 底色 / 描边 */
  --glass2-hi / --glass2-lo / --glass2-border: … /* 浅色玻璃（次级按钮、胶囊） */
  ...
}
```

### 5. 作品分类筛选
在 `#portfolio-filters` 里增删 `.pill` 按钮，`data-filter` 的值
与卡片 `data-category` 中的词对应即可。

## ⚠️ 小提醒

- 联系表单是**前端演示**，未接入后端。真实使用请对接 Formspree、
  Getform 等表单服务，或在 `js/main.js` 的表单提交处接入你的接口。
- 页面中的姓名、邮箱、项目均为虚构示例数据，上线前请逐一替换。

## 📄 许可

本模版可自由用于个人作品集、求职简历等用途，欢迎修改与再分发。