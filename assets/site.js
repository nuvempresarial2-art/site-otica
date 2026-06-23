/* ============================================================
   Ótica Lebre — site shell
   Injects header, footer, sidebar, whatsapp into every page
   ============================================================ */

(function() {
  // 7 main tabs (matches original site structure)
  const PAGES = [
    { href: 'index.html',           label: 'Principal' },
    { href: 'produtos.html',        label: 'Produtos' },
    { href: 'servicos.html',        label: 'Serviços' },
    { href: 'contato.html',         label: 'Contato' },
    { href: 'curiosidades.html',    label: 'Curiosidades' },
    { href: 'protese-ocular.html',  label: 'Prótese Ocular' },
    { href: 'dicas.html',           label: 'Dicas e Cuidados' },
  ];

  // Contextual sidebars — same logic as the legacy site
  // Group 1: Produtos & Dicas e Cuidados (cross-nav between product categories)
  // Group 2: Prótese, A Clínica, Como Chegar, Contato (clinic group)
  const SIDEBARS = {
    'armacao.html':       { title: 'Produtos', items: ['lentes.html', 'acessorios.html', 'dicas.html'] },
    'lentes.html':        { title: 'Produtos', items: ['armacao.html', 'acessorios.html', 'dicas.html'] },
    'acessorios.html':    { title: 'Produtos', items: ['armacao.html', 'lentes.html', 'dicas.html'] },
    'dicas.html':         { title: 'Produtos', items: ['armacao.html', 'lentes.html', 'acessorios.html'] },
    'protese-ocular.html':{ title: 'Clínica de Prótese', items: ['clinica.html', 'como-chegar.html', 'contato.html'] },
    'clinica.html':       { title: 'Clínica de Prótese', items: ['protese-ocular.html', 'como-chegar.html', 'contato.html'] },
    'como-chegar.html':   { title: 'Clínica de Prótese', items: ['protese-ocular.html', 'clinica.html', 'contato.html'] },
    'contato.html':       { title: 'Clínica de Prótese', items: ['protese-ocular.html', 'clinica.html', 'como-chegar.html'] },
  };

  const LABELS = {
    'index.html':          'Principal',
    'produtos.html':       'Produtos',
    'armacao.html':        'Armações',
    'lentes.html':         'Lentes',
    'acessorios.html':     'Acessórios',
    'servicos.html':       'Serviços',
    'contato.html':        'Contato',
    'curiosidades.html':   'Curiosidades',
    'protese-ocular.html': 'Prótese Ocular',
    'clinica.html':        'A Clínica',
    'como-chegar.html':    'Como Chegar',
    'dicas.html':          'Dicas e Cuidados',
    'quem-somos.html':     'Quem Somos',
  };

  // Which top-tab does each page belong to (used for nav highlighting)
  const PARENT_TAB = {
    'index.html': 'index.html',
    'quem-somos.html': 'index.html',
    'produtos.html': 'produtos.html',
    'armacao.html': 'produtos.html',
    'lentes.html': 'produtos.html',
    'acessorios.html': 'produtos.html',
    'servicos.html': 'servicos.html',
    'contato.html': 'contato.html',
    'curiosidades.html': 'curiosidades.html',
    'protese-ocular.html': 'protese-ocular.html',
    'clinica.html': 'protese-ocular.html',
    'como-chegar.html': 'protese-ocular.html',
    'dicas.html': 'dicas.html',
  };

  const WHATSAPP_URL = 'https://api.whatsapp.com/send/?phone=551935248410&text=Ol%C3%A1%21+Vim+pelo+site+e+gostaria+de+mais+informa%C3%A7%C3%B5es.&type=phone_number&app_absent=0';
  const PHONE = '(19) 3524-8410';
  const PHONE_TEL = 'tel:+551935248410';
  const INSTAGRAM = 'https://www.instagram.com/oticalebre/';
  const LOGO_URL = (typeof window !== 'undefined' && window.__resources && window.__resources.lebreLogo) || 'assets/logo-lebre.jpg';

  window.LEBRE = { PAGES, WHATSAPP_URL, PHONE, PHONE_TEL, INSTAGRAM, LABELS, SIDEBARS };

  function currentPage() {
    const path = window.location.pathname.split('/').pop() || 'index.html';
    return path;
  }

  function buildHeader() {
    const here = currentPage();
    const activeTab = PARENT_TAB[here] || here;
    const nav = PAGES.map(p =>
      `<a href="${p.href}"${p.href === activeTab ? ' class="active"' : ''}>${p.label}</a>`
    ).join('');

    return `
    <header class="site-header">
      <div class="header-bar">
        <a class="brand" href="index.html" aria-label="Ótica Lebre — início">
          <span class="brand-mark"><img src="${LOGO_URL}" alt="Logo Ótica Lebre"/></span>
          <span class="brand-name">
            <span class="name">Ótica Lebre</span>
            <span class="tag">Tradição em saúde visual</span>
          </span>
        </a>
        <nav class="nav" id="primaryNav">${nav}</nav>
        <div class="header-cta">
          <button class="menu-toggle" aria-label="Abrir menu" aria-expanded="false">
            Menu
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
          </button>
        </div>
      </div>
    </header>`;
  }

  function buildSidebar() {
    const here = currentPage();
    const cfg = SIDEBARS[here];
    if (!cfg) return '';

    const items = cfg.items.map(href => {
      const label = LABELS[href] || href;
      return `<li><a href="${href}"><span class="arrow">→</span>${label}</a></li>`;
    }).join('');

    return `
    <aside class="page-sidebar">
      <div class="sidebar-inner">
        <span class="sidebar-eyebrow">${cfg.title}</span>
        <div class="sidebar-current">${LABELS[here] || ''}</div>
        <ul class="sidebar-list">${items}</ul>
        <div class="sidebar-cta">
          <p>Dúvidas?</p>
          <a class="btn btn-primary" href="${WHATSAPP_URL}" target="_blank" rel="noopener" style="width:100%; justify-content:center;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.6 6.32A7.86 7.86 0 0 0 12.06 4 7.94 7.94 0 0 0 4.13 11.93a7.86 7.86 0 0 0 1.06 3.96L4.05 20l4.21-1.1a7.93 7.93 0 0 0 3.79.97h.01a7.94 7.94 0 0 0 7.93-7.92 7.86 7.86 0 0 0-2.39-5.63Z"/></svg>
            WhatsApp
          </a>
        </div>
      </div>
    </aside>`;
  }

  function buildFooter() {
    const navLinks = PAGES.map(p => `<li><a href="${p.href}">${p.label}</a></li>`).join('');
    return `
    <footer class="site-footer">
      <div class="container">
        <div class="footer-brand" style="text-align:center; max-width:560px; margin:0 auto;">
          <a class="brand" href="index.html" style="justify-content:center;">
            <span class="brand-mark"><img src="${LOGO_URL}" alt=""/></span>
            <span class="brand-name">
              <span class="name">Ótica Lebre</span>
              <span class="tag">Tradição em saúde visual</span>
            </span>
          </a>
          <p>Há mais de 50 anos cuidando da saúde visual de Rio Claro e região. Tradição, especialização técnica e atendimento humano.</p>
        </div>
        <div class="footer-bottom" style="flex-direction:column; justify-content:center; align-items:center; gap:16px; text-align:center;">
          <span>© ${new Date().getFullYear()} Ótica Lebre · Todos os direitos reservados</span>
          <div class="socials">
            <a href="${INSTAGRAM}" target="_blank" rel="noopener" aria-label="Instagram">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>
            </a>
            <a href="${WHATSAPP_URL}" target="_blank" rel="noopener" aria-label="WhatsApp">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.6 6.32A7.86 7.86 0 0 0 12.06 4 7.94 7.94 0 0 0 4.13 11.93a7.86 7.86 0 0 0 1.06 3.96L4.05 20l4.21-1.1a7.93 7.93 0 0 0 3.79.97h.01a7.94 7.94 0 0 0 7.93-7.92 7.86 7.86 0 0 0-2.39-5.63Z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>`;
  }

  function buildWhatsappFloat() {
    return `
    <a class="wa-float" href="${WHATSAPP_URL}" target="_blank" rel="noopener" aria-label="Falar no WhatsApp">
      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.6 6.32A7.86 7.86 0 0 0 12.06 4 7.94 7.94 0 0 0 4.13 11.93a7.86 7.86 0 0 0 1.06 3.96L4.05 20l4.21-1.1a7.93 7.93 0 0 0 3.79.97h.01a7.94 7.94 0 0 0 7.93-7.92 7.86 7.86 0 0 0-2.39-5.63Z"/></svg>
      <span class="wa-label">Atendimento por WhatsApp</span>
    </a>`;
  }

  function init() {
    const headerSlot = document.querySelector('[data-slot="header"]');
    const footerSlot = document.querySelector('[data-slot="footer"]');
    const waSlot     = document.querySelector('[data-slot="wa"]');
    const sideSlot   = document.querySelector('[data-slot="sidebar"]');

    if (headerSlot) headerSlot.outerHTML = buildHeader();
    if (footerSlot) footerSlot.outerHTML = buildFooter();
    if (waSlot)     waSlot.outerHTML     = buildWhatsappFloat();
    if (sideSlot)   sideSlot.outerHTML   = buildSidebar();

    const toggle = document.querySelector('.menu-toggle');
    const nav = document.getElementById('primaryNav');
    if (toggle && nav) {
      toggle.addEventListener('click', () => {
        const open = nav.classList.toggle('open');
        toggle.setAttribute('aria-expanded', String(open));
      });
    }

    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('[data-reveal]').forEach(el => io.observe(el));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
