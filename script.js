document.addEventListener('DOMContentLoaded', () => {
  // --- Mobile Menu Implementation ---
  const header = document.querySelector('header');
  const menuBtn = document.querySelector('button[aria-label="Menu"]');
  const nav = document.querySelector('nav');
  
  if (header && menuBtn && nav) {
    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'hidden lg:hidden border-t border-border bg-background/95 backdrop-blur-xl';
    
    const container = document.createElement('div');
    container.className = 'container py-4 flex flex-col gap-1';
    
    // Clone links from nav
    nav.querySelectorAll('a').forEach(a => {
      const clone = a.cloneNode(true);
      // Change classes for mobile
      clone.className = clone.className.replace('px-3 py-2 text-sm font-medium rounded-lg transition-smooth', 'px-4 py-3 rounded-lg text-sm font-medium transition-smooth');
      if (clone.classList.contains('text-primary')) {
        clone.className = clone.className.replace('text-primary bg-primary/10', 'text-primary bg-primary/10');
      } else {
        clone.className = clone.className.replace('text-foreground/70 hover:text-primary hover:bg-primary/5', 'text-foreground/80 hover:bg-muted');
      }
      container.appendChild(clone);
    });

    // Add Demo button
    const demoBtn = document.createElement('a');
    demoBtn.href = 'demo.html';
    demoBtn.className = 'mt-2 rounded-full gradient-hero text-white border-0 inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium h-10 px-4 py-2';
    demoBtn.textContent = 'Try Demo';
    container.appendChild(demoBtn);

    mobileMenu.appendChild(container);
    header.appendChild(mobileMenu);

    // Toggle menu
    menuBtn.addEventListener('click', () => {
      const isHidden = mobileMenu.classList.contains('hidden');
      if (isHidden) {
        mobileMenu.classList.remove('hidden');
        menuBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>';
      } else {
        mobileMenu.classList.add('hidden');
        menuBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-menu\"><line x1=\"4\" x2=\"20\" y1=\"12\" y2=\"12\"></line><line x1=\"4\" x2=\"20\" y1=\"6\" y2=\"6\"></line><line x1=\"4\" x2=\"20\" y1=\"18\" y2=\"18\"></line></svg>';
      }
    });
  }

  // --- Scroll Header Implementation ---
  window.addEventListener('scroll', () => {
    if (header) {
      if (window.scrollY > 10) {
        header.classList.add('bg-background/80', 'backdrop-blur-xl', 'border-b', 'border-border');
        header.classList.remove('bg-transparent');
      } else {
        header.classList.remove('bg-background/80', 'backdrop-blur-xl', 'border-b', 'border-border');
        header.classList.add('bg-transparent');
      }
    }
  });

  // --- Tabs Implementation ---
  // If there are any Radix UI tabs, we need to handle them.
  const tabLists = document.querySelectorAll('[role="tablist"]');
  tabLists.forEach(tabList => {
    const tabs = tabList.querySelectorAll('[role="tab"]');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        // Deactivate all
        tabs.forEach(t => {
          t.setAttribute('aria-selected', 'false');
          t.setAttribute('data-state', 'inactive');
          const panelId = t.getAttribute('aria-controls');
          if (panelId) {
            const panel = document.getElementById(panelId);
            if (panel) {
              panel.hidden = true;
              panel.setAttribute('data-state', 'inactive');
            }
          }
        });
        
        // Activate clicked
        tab.setAttribute('aria-selected', 'true');
        tab.setAttribute('data-state', 'active');
        const activePanelId = tab.getAttribute('aria-controls');
        if (activePanelId) {
          const activePanel = document.getElementById(activePanelId);
          if (activePanel) {
            activePanel.hidden = false;
            activePanel.setAttribute('data-state', 'active');
          }
        }
      });
    });
  });

  // --- Accordion Implementation ---
  const accordionTriggers = document.querySelectorAll('[data-radix-collection-item]');
  accordionTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
      const contentId = trigger.getAttribute('aria-controls');
      const content = document.getElementById(contentId);
      
      if (isExpanded) {
        trigger.setAttribute('aria-expanded', 'false');
        trigger.setAttribute('data-state', 'closed');
        if (content) {
          content.setAttribute('data-state', 'closed');
          content.hidden = true;
        }
      } else {
        trigger.setAttribute('aria-expanded', 'true');
        trigger.setAttribute('data-state', 'open');
        if (content) {
          content.setAttribute('data-state', 'open');
          content.hidden = false;
        }
      }
    });
  });
});
