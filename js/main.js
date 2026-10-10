/* ============================================================
   UI/UX 作品集模版 · main.js
   功能：主题切换 / 移动端菜单 / 导航高亮 / 滚动入场动画
        技能条动画 / 作品筛选 / 项目详情弹窗 / 表单演示提交
   ============================================================ */
'use strict';

(function () {
  const $ = (sel, ctx) => (ctx || document).querySelector(sel);
  const $$ = (sel, ctx) => Array.from((ctx || document).querySelectorAll(sel));

  /* ---------- 主题切换 ---------- */
  const html = document.documentElement;
  const themeToggle = $('#theme-toggle');

  function applyTheme(theme) {
    html.setAttribute('data-theme', theme);
    themeToggle.setAttribute(
      'aria-label',
      theme === 'dark' ? '切换为浅色主题' : '切换为深色主题'
    );
    try { localStorage.setItem('pf-theme', theme); } catch (e) {}
  }

  themeToggle.addEventListener('click', () => {
    applyTheme(html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
  });

  /* ---------- 移动端菜单 ---------- */
  const navToggle = $('#nav-toggle');
  const navLinks = $('#nav-links');

  navToggle.addEventListener('click', () => {
    const open = document.body.classList.toggle('nav-open');
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? '关闭菜单' : '打开菜单');
  });

  $$('.nav-link, .nav-cta a', navLinks).forEach((a) =>
    a.addEventListener('click', () => {
      document.body.classList.remove('nav-open');
      navToggle.setAttribute('aria-expanded', 'false');
    })
  );

  /* ---------- 头部滚动态 & 返回顶部 ---------- */
  const header = $('#site-header');
  const backToTop = $('#back-to-top');

  function onScroll() {
    header.classList.toggle('scrolled', window.scrollY > 8);
    backToTop.classList.toggle('show', window.scrollY > 640);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  backToTop.addEventListener('click', () =>
    window.scrollTo({ top: 0, behavior: 'smooth' })
  );

  /* ---------- 导航高亮（ScrollSpy） ---------- */
  const sections = $$('main section[id]').filter((s) => $('a[href="#' + s.id + '"]'));
  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        $$('.nav-link').forEach((a) =>
          a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id)
        );
      });
    },
    { rootMargin: '-40% 0px -55% 0px' }
  );
  sections.forEach((s) => spy.observe(s));

  /* ---------- 滚动入场动画 ---------- */
  const revealEls = $$('.reveal');
  revealEls.forEach((el) => {
    const delay = Number(el.dataset.delay || 0);
    if (delay) el.style.transitionDelay = delay + 'ms';
  });
  const revealIO = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        revealIO.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );
  revealEls.forEach((el) => revealIO.observe(el));

  /* 技能条：进入视口时开始生长（#skills 本身是 .reveal 目标） */
  const skillsSection = $('#skills');
  if (skillsSection) {
    const skillIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            skillIO.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    skillIO.observe(skillsSection);
  }

  /* ---------- 作品筛选 ---------- */
  const filters = $('#portfolio-filters');
  const cards = $$('.portfolio-card');
  const emptyState = $('#portfolio-empty');

  filters.addEventListener('click', (e) => {
    const btn = e.target.closest('.pill');
    if (!btn) return;
    $$('.pill', filters).forEach((p) => p.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    let visible = 0;
    cards.forEach((card) => {
      const cats = card.dataset.category.split(/\s+/);
      const show = filter === '全部' || cats.includes(filter);
      card.classList.toggle('is-hidden', !show);
      if (show) visible++;
    });
    emptyState.hidden = visible > 0;
  });

  /* ---------- 项目详情弹窗 ---------- */
  /* ✏️ 模版提示：这里的文案与 index.html 里的作品卡片一一对应，
     替换作品时请同步修改。封面样式沿用卡片上的 c-1 ~ c-6 渐变类。 */
  const PROJECTS = {
    qingxing: {
      title: '轻行 · 旅行规划 App',
      sub: '「把一次旅行变得像拼乐高一样简单」',
      tags: ['移动端', 'UX 研究', '动效'],
      cover: 'c-1',
      glyph: '轻行',
      year: '2024', role: '独立产品设计师', duration: '6 个月',
      platform: 'iOS / Android', tools: 'Figma · After Effects',
      desc: '面向年轻自由行人群的旅行规划工具，主打的「地图拖拽 + AI 智能排程」，把传统攻略 App 里繁重的表格填写，变成了直观的拼装式体验。',
      duties: [
        '完成 12 场用户访谈与竞品分析，输出用户旅程地图',
        '搭建信息架构与核心交互流程，低保真验证 3 轮',
        '高保真视觉与动效规范，产出可交付原型',
        '跟进开发走查，保证还原度 95% 以上',
      ],
      results: ['上线首月下载 30w+，App Store 本周推荐', '次日留存 42%，高于同类均值 11%', 'AI 排程功能使用渗透率 61%'],
    },
    xingyun: {
      title: '星云设计系统',
      sub: '「让 40 人的产研团队说同一种设计语言」',
      tags: ['设计系统', '组件库', 'B 端'],
      cover: 'c-2',
      glyph: '星云',
      year: '2023', role: '设计系统负责人', duration: '10 个月',
      platform: 'Web / 多端', tools: 'Figma · Tokens Studio',
      desc: '为公司的 SaaS 产品线搭建统一的设计语言：从 color token、排版层级到 86 个业务组件，配套设计规范文档与走查机制。',
      duties: [
        '梳理存量 30+ 页面，抽象出通用组件与业务组件',
        '制定 Design Token 与主题规则（含暗色模式）',
        '编写组件使用规范与 10 篇最佳实践文档',
        '建立「设计-开发」对齐 review 流程',
      ],
      results: ['研发交付效率提升约 40%', '跨产品体验一致性大幅改善，缺陷减少 62%', '新同学上手周期从 3 周缩短至 1 周'],
    },
    shiguang: {
      title: '拾光 · 智能相册',
      sub: '「把散落的照片，整理成可以翻阅的故事」',
      tags: ['0 到 1', 'AI 产品', '用户体验'],
      cover: 'c-3',
      glyph: '拾光',
      year: '2023', role: '产品设计师（0 到 1）', duration: '8 个月',
      platform: 'iOS / Android', tools: 'Figma · ProtoPie',
      desc: '一款用 AI 自动聚合同一时间、地点照片的相册产品，用「故事流」取代传统九宫格，让回忆以可阅读的方式呈现。',
      duties: [
        '独立完成产品定位、MVP 功能裁剪与用户验证',
        '设计「故事流」信息架构与多模态交互',
        '搭建原型并完成 4 轮可用性测试迭代',
        '与算法团队协作，定义 AI 聚类失败兜底体验',
      ],
      results: ['内测阶段次日留存 39%', 'NPS 评分 71，位于品类前列', '获公司年度产品创新奖'],
    },
    yuncang: {
      title: '云仓物流数据看板',
      sub: '「让 300 万订单的物流状态一眼看懂」',
      tags: ['数据可视化', '体验改版', 'B 端'],
      cover: 'c-4',
      glyph: '云仓',
      year: '2022', role: '主设计师（体验改版）', duration: '5 个月',
      platform: 'Web', tools: 'Figma · Maze',
      desc: '面向物流运营团队的监控大屏与工作台改版，把 40+ 张零散报表重组为「异常优先」的信息架构，让关键决策从 5 分钟缩短到 30 秒。',
      duties: [
        '随岗观察运营团队 2 周，梳理真实使用场景',
        '重构信息架构：从报表堆叠到异常驱动',
        '设计暗色监控大屏与浅色工作台双主题',
        '用 Maze 完成改版前后测，验证核心任务效率',
      ],
      results: ['核心任务完成时间下降 62%', '告警误报投诉减少 48%', '改版方案被选为新人培训教材'],
    },
    chayu: {
      title: '茶语 · 新茶饮品牌官网',
      sub: '「一杯茶的东方美学，也可以很现代」',
      tags: ['品牌网站', '视觉设计', '增长'],
      cover: 'c-5',
      glyph: '茶语',
      year: '2022', role: '主设计师', duration: '3 个月',
      platform: 'Web / 移动端', tools: 'Figma · Illustrator',
      desc: '为新中式茶饮品牌打造官网与季度活动页体系：以「留白、茶色、印章」为视觉语言，兼顾东方质感与现代转化效率。',
      duties: [
        '提炼品牌视觉语言并制定网站设计规范',
        '设计首页叙事结构与会员小程序导流路径',
        '建立季度活动页复用模版，支撑 3 场大促',
      ],
      results: ['官网转化率提升 31%', '活动页平均跳失率下降 24%', '视觉规范推广至全渠道物料'],
    },
    xinqing: {
      title: '心晴 · 心理健康小程序',
      sub: '「让求助的入口，更温柔一点」',
      tags: ['公益设计', '小程序', '可用性测试'],
      cover: 'c-6',
      glyph: '心晴',
      year: '2021', role: '交互设计师', duration: '4 个月',
      platform: '微信小程序', tools: 'Sketch · Maze',
      desc: '与高校心理中心合作的公益项目：为用户提供情绪记录、量表自测与一键求助服务。设计原则只有一个——降低每一次求助的心理门槛。',
      duties: [
        '参与用户访谈，与心理咨询师共同梳理触点',
        '设计情绪记录与危机干预的引导流程',
        '主持 3 轮可用性测试并迭代关键流程',
      ],
      results: ['上线 3 个月用户突破 10 万', '危机求助按钮触达率提升 2.4 倍', '获 2021 校公益创新一等奖'],
    },
  };

  const modal = $('#project-modal');
  const modalCover = $('#modal-cover');

  function openModal(key) {
    const p = PROJECTS[key];
    if (!p) return;

    $('#modal-glyph').textContent = p.glyph;
    modalCover.className = 'modal-cover ' + p.cover;

    $('#modal-title').textContent = p.title;
    $('#modal-sub').textContent = p.sub;

    const tags = $('#modal-tags');
    tags.innerHTML = p.tags.map((t) => '<span>' + t + '</span>').join('');

    const meta = $('#modal-meta');
    meta.innerHTML =
      metaRow('时间', p.year) + metaRow('角色', p.role) +
      metaRow('周期', p.duration) + metaRow('平台', p.platform) + metaRow('工具', p.tools);

    $('#modal-desc').textContent = p.desc;
    $('#modal-duties').innerHTML = p.duties.map((d) => '<li>' + d + '</li>').join('');
    $('#modal-results').innerHTML = p.results.map((r) => '<li>' + r + '</li>').join('');

    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('no-scroll');

    lastFocus = document.activeElement;
    $('.modal-close', modal).focus();
  }

  function metaRow(dt, dd) {
    return '<div><dt>' + dt + '</dt><dd>' + dd + '</dd></div>';
  }

  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('no-scroll');
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  let lastFocus = null;

  /* 打开：卡片按钮 + 坚不可摧的事件委托 */
  document.addEventListener('click', (e) => {
    const opener = e.target.closest('[data-open]');
    if (opener) { openModal(opener.dataset.open); return; }
    if (e.target.closest('[data-close]')) { closeModal(); return; }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
  });

  /* ---------- 表单演示提交 ---------- */
  const form = $('#contact-form');
  const toast = $('#toast');
  let toastTimer = null;

  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 3200);
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = $('#f-name');
    const email = $('#f-email');
    const msg = $('#f-msg');

    if (!name.value.trim() || !msg.value.trim() || !email.validity.valid) {
      showToast('请完整填写称呼、邮箱与留言～');
      return;
    }
    showToast('✨ 收到！这是模版演示，消息未真实发送（请接入表单服务）');
    form.reset();
  });

  /* ---------- 演示下载按钮 ---------- */
  $$('[data-demo-dl], #resume-btn').forEach((btn) =>
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      showToast('📄 模版演示：请把你的简历 PDF 放入 assets 并替换该链接');
    })
  );

  /* ---------- 页脚年份 ---------- */
  $('#year').textContent = new Date().getFullYear();
})();