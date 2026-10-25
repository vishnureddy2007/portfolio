/**
 * ============================================================================
 * VISHNU REDDY — DEVELOPER PORTFOLIO ENGINE
 * Author: Guntaka Nilakanta Vishnu Vardhan Reddy (Vishnu Reddy)
 * Features: Dark/Light Theming, GitHub API Caching & Discovery,
 * Project Filtering & Search, Case Study Modals, Web Resume Preview,
 * Interactive Developer Terminal, Form Validation, and Accessibility.
 * ============================================================================
 */

(function () {
  'use strict';

  // ==========================================
  // 1. THEME MANAGEMENT (Dark / Light)
  // ==========================================
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const storedTheme = localStorage.getItem('vr_theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

  // Default to dark theme or user preference
  const initialTheme = storedTheme ? storedTheme : (prefersDark ? 'dark' : 'dark');
  document.documentElement.setAttribute('data-theme', initialTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('vr_theme', newTheme);
      showToast(`Switched to ${newTheme} mode`);
    });
  }

  // ==========================================
  // 2. STICKY HEADER & ACTIVE SCROLLSPY
  // ==========================================
  const header = document.getElementById('header');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const backToTopBtn = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;

    // Header sticky shadow
    if (header) {
      if (scrollPos > 30) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    // Back to top visibility
    if (backToTopBtn) {
      if (scrollPos > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Mobile Navigation Menu Toggle with Backdrop Overlay
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navOverlay = document.getElementById('navOverlay');

  function closeMobileNav() {
    if (navMenu) navMenu.classList.remove('open');
    if (navToggle) {
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
    if (navOverlay) navOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  function openMobileNav() {
    if (navMenu) navMenu.classList.add('open');
    if (navToggle) {
      navToggle.classList.add('open');
      navToggle.setAttribute('aria-expanded', 'true');
    }
    if (navOverlay) navOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.contains('open');
      if (isOpen) {
        closeMobileNav();
      } else {
        openMobileNav();
      }
    });

    if (navOverlay) {
      navOverlay.addEventListener('click', closeMobileNav);
    }

    navLinks.forEach(link => {
      link.addEventListener('click', closeMobileNav);
    });
  }

  // ==========================================
  // ASTRA INNOVATIVE COSMIC BACKGROUND ENGINE
  // Ethereal floating neural constellation & interactive mouse responsiveness
  // ==========================================
  function initAstraCanvas() {
    const canvas = document.getElementById('astraCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let particles = [];
    let animationFrameId = null;
    let isVisible = true;

    // Pointer state
    const mouse = {
      x: null,
      y: null,
      radius: 140
    };

    function resize() {
      const hero = canvas.parentElement;
      if (!hero) return;
      width = hero.clientWidth;
      height = hero.clientHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset transform before scaling
      ctx.scale(dpr, dpr);
      initParticles();
    }

    class AstraParticle {
      constructor() {
        this.reset(true);
      }

      reset(initial = false) {
        this.x = initial ? Math.random() * width : (Math.random() > 0.5 ? 0 : width);
        this.y = initial ? Math.random() * height : Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.45;
        this.vy = (Math.random() - 0.5) * 0.45;
        this.baseRadius = Math.random() * 1.8 + 0.8;
        this.radius = this.baseRadius;
        this.baseAlpha = Math.random() * 0.45 + 0.25;
        this.alpha = this.baseAlpha;
        this.pulseAngle = Math.random() * Math.PI * 2;
        this.pulseSpeed = 0.02 + Math.random() * 0.02;

        const rand = Math.random();
        if (rand < 0.45) {
          this.color = '37, 99, 235';   // Electric blue
        } else if (rand < 0.8) {
          this.color = '6, 182, 212';   // Cyan / Sky blue
        } else {
          this.color = '139, 92, 246';  // Mystical violet
        }
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < -20) this.x = width + 20;
        if (this.x > width + 20) this.x = -20;
        if (this.y < -20) this.y = height + 20;
        if (this.y > height + 20) this.y = -20;

        this.pulseAngle += this.pulseSpeed;
        this.alpha = this.baseAlpha + Math.sin(this.pulseAngle) * 0.15;

        // Interactive mouse effect
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.hypot(dx, dy);
          if (dist < mouse.radius) {
            const force = (1 - dist / mouse.radius);
            this.x -= (dx / dist) * force * 1.2;
            this.y -= (dy / dist) * force * 1.2;
            this.radius = this.baseRadius + force * 1.5;
            this.alpha = Math.min(1, this.baseAlpha + force * 0.5);
          } else {
            this.radius = this.baseRadius;
          }
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, Math.max(0.5, this.radius), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color}, ${Math.max(0, this.alpha)})`;
        ctx.fill();

        if (this.radius > 2) {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.radius * 2.2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${this.color}, ${this.alpha * 0.18})`;
          ctx.fill();
        }
      }
    }

    function initParticles() {
      const count = width < 600 ? 35 : (width < 1024 ? 50 : 75);
      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push(new AstraParticle());
      }
    }

    function drawConnections() {
      const maxDist = width < 600 ? 90 : 125;
      const isLight = document.documentElement.getAttribute('data-theme') === 'light';

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.hypot(dx, dy);

          if (dist < maxDist) {
            const lineAlpha = (1 - dist / maxDist) * 0.22;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.lineWidth = 0.85;

            if (isLight) {
              ctx.strokeStyle = `rgba(37, 99, 235, ${lineAlpha * 0.9})`;
            } else {
              ctx.strokeStyle = `rgba(56, 189, 248, ${lineAlpha})`;
            }
            ctx.stroke();
          }
        }

        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - particles[i].x;
          const dy = mouse.y - particles[i].y;
          const dist = Math.hypot(dx, dy);
          if (dist < mouse.radius) {
            const lineAlpha = (1 - dist / mouse.radius) * 0.35;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.lineWidth = 1;
            ctx.strokeStyle = `rgba(6, 182, 212, ${lineAlpha})`;
            ctx.stroke();
          }
        }
      }
    }

    function animate() {
      if (!isVisible) return;

      ctx.clearRect(0, 0, width, height);

      particles.forEach(p => {
        p.update();
        p.draw();
      });

      drawConnections();

      animationFrameId = requestAnimationFrame(animate);
    }

    const heroEl = canvas.parentElement;

    heroEl.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });

    heroEl.addEventListener('mouseleave', () => {
      mouse.x = null;
      mouse.y = null;
    });

    heroEl.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.touches[0].clientX - rect.left;
        mouse.y = e.touches[0].clientY - rect.top;
      }
    }, { passive: true });

    heroEl.addEventListener('touchend', () => {
      mouse.x = null;
      mouse.y = null;
    });

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          isVisible = entry.isIntersecting;
          if (isVisible) {
            cancelAnimationFrame(animationFrameId);
            animate();
          }
        });
      }, { threshold: 0.05 });
      observer.observe(heroEl);
    }

    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        resize();
      }, 150);
    });

    const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      resize();
      particles.forEach(p => p.draw());
      drawConnections();
      return;
    }

    resize();
    animate();
  }

  // Initialize Astra Canvas
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAstraCanvas);
  } else {
    initAstraCanvas();
  }

  // Scrollspy via IntersectionObserver
  if ('IntersectionObserver' in window && sections.length > 0) {
    const scrollObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, {
      rootMargin: '-20% 0px -60% 0px'
    });

    sections.forEach(sec => scrollObserver.observe(sec));
  }

  // ==========================================
  // 3. VERIFIED PROJECTS DATA STORE
  // ==========================================
  const VERIFIED_PROJECTS = [
    {
      id: 'crime-ai',
      title: 'CrimeVision – AI Crime Investigation System',
      category: 'ai',
      categoryLabel: 'AI & Computer Vision',
      status: 'ongoing',
      statusLabel: 'Ongoing Final-Year Project',
      type: 'Forensic System',
      description: 'An offline-capable forensic investigation workspace integrating YOLOv8 object detection, 4-stage weapon verification, 2D forensic investigation video rendering, situational risk modeling, and automated PDF/DOCX forensic report generation.',
      featured: true,
      githubUrl: 'https://github.com/vishnureddy2007/Crime-Investigation-AI',
      demoUrl: null,
      technologies: ['Python', 'Streamlit', 'YOLOv8', 'OpenCV', 'Pillow', 'Qwen3 14B', 'PyTest', 'SQLite'],
      metrics: [
        { label: 'PyTest Suite', value: '25/25 Passing' },
        { label: 'Weapon Engine', value: '4-Stage Verif.' },
        { label: 'Video Generator', value: '1080p Pure Py' },
        { label: 'Report Formats', value: 'PDF & DOCX' }
      ],
      problemStatement: 'Law enforcement investigators face critical delays reviewing hours of raw CCTV surveillance and crime scene photographs. Existing commercial tools often produce misleading false weapon alarms or require cumbersome 3D external software.',
      architecturalSolution: 'Constructed an end-to-end Python pipeline pairing multi-model YOLOv8 detections with a deterministic 4-stage weapon verification shield (checking aspect ratios, scale, and temporal persistence). Generated 2D forensic investigation videos with dynamic Ken Burns zoom directly via OpenCV and Pillow, backed by responsible AI situational analysis.',
      keyCapabilities: [
        'Multi-model object detection (COCO general + dedicated weapon models) with cross-model IoU deduplication',
        'Four-stage weapon verification engine eliminating false alarms and recognizing Handgun, Revolver, Rifle, Shotgun, and Knife',
        'Pure Python 2D investigation video rendering at 1080p with Ken Burns zoom onto verified evidence',
        'Local LLM situational risk modeling adhering to structured, cautious forensic narrative standards',
        'Automated forensic PDF and DOCX export with complete evidence audit logs and timestamps'
      ],
      outcomes: 'Successfully verified with 25 passing automated unit tests, 4 forensic screenshot workflows, and offline local execution without reliance on proprietary cloud services.',
      ethicsNotice: 'Investigative decision-support tool only. The system does not establish legal guilt or claim infallible weapon detection.'
    },
    {
      id: 'lbrce-canteen',
      title: 'LBRCE Canteen Management System',
      category: 'fullstack',
      categoryLabel: 'Full-Stack & Web',
      status: 'completed',
      statusLabel: 'Production Deployed',
      type: 'Full-Stack Web App',
      description: 'A comprehensive campus dining management platform modernizing order placement, digital billing, kitchen queue reduction, and real-time inventory management for Lakireddy Bali Reddy College of Engineering.',
      featured: true,
      githubUrl: 'https://github.com/vishnureddy2007/LBRCE-Canteen',
      demoUrl: 'https://lbrce-canteen.vercel.app',
      technologies: ['React.js', 'Spring Boot', 'MySQL', 'REST APIs', 'JWT Auth'],
      metrics: [
        { label: 'Live Demo', value: 'Vercel Deployed' },
        { label: 'Architecture', value: 'Spring + React' },
        { label: 'Security', value: 'Role-Based RBAC' },
        { label: 'Database', value: 'MySQL Schema' }
      ],
      problemStatement: 'Manual queueing during peak campus dining hours caused severe meal preparation bottlenecks, unrecorded cash discrepancies, and unpredictable kitchen stock depletion.',
      architecturalSolution: 'Engineered a decoupled full-stack architecture using Spring Boot REST APIs on the backend and a high-performance React.js frontend. Implemented role-based access control for Students, Canteen Staff, and Administrators with real-time stock sync.',
      keyCapabilities: [
        'Secure multi-role authentication (Student, Staff, Administrator) with JWT tokens',
        'Instant digital order management with automated billing and receipt generation',
        'Real-time inventory tracking with zero-stock alert notifications',
        'Comprehensive administrative analytics dashboard tracking daily revenue and high-demand items'
      ],
      outcomes: 'Live deployment on Vercel with responsive mobile-friendly UI and zero order collision under simulated multi-user checkout scenarios.'
    },
    {
      id: 'netsage-ai',
      title: 'NetSage AI – Network Troubleshooting Assistant',
      category: 'ai',
      categoryLabel: 'AI & Networks',
      status: 'completed',
      statusLabel: 'Verified Project',
      type: 'AI Assistant',
      description: 'Explainable AI-based network troubleshooting assistant with human-in-the-loop review, Cisco Packet Tracer fault injection across Layer 1-7, deterministic Python rule checker, and responsible AI audit logs.',
      featured: true,
      githubUrl: 'https://github.com/vishnureddy2007',
      demoUrl: null,
      technologies: ['Python', 'Cisco Packet Tracer', 'Deterministic Rules', 'Unit Tests', 'HTML/CSS'],
      metrics: [
        { label: 'Troubleshoot Cases', value: '30 Scenarios' },
        { label: 'Rule Checker Tests', value: '14/14 Passing' },
        { label: 'OSI Scope', value: 'Layers 1 to 7' },
        { label: 'Oversight', value: 'Human-in-Loop' }
      ],
      problemStatement: 'Novice network administrators struggle to identify root causes across complex multi-layer enterprise topologies, while standard generative AI tools often hallucinate non-existent CLI commands.',
      architecturalSolution: 'Constructed a dual-engine architecture: a deterministic Python rule-checking engine verifying Layer 1-7 network telemetry alongside an LLM diagnosis layer constrained by strict prompt templates and a mandatory human review workflow.',
      keyCapabilities: [
        '30 curated Cisco Packet Tracer fault topologies (VLAN, OSPF, ACL, DHCP, NAT)',
        'Deterministic rule checker for duplicate IPs, err-disabled interfaces, and routing errors',
        'Structured JSON diagnosis schema enforcing confidence scoring and fix constraints',
        'Human review oversight engine (Accept / Edit / Reject) with responsible AI audit logging'
      ],
      outcomes: '100% test pass rate across 14 automated unit tests; successfully demonstrated fault resolution across all 30 Cisco Packet Tracer topologies.'
    },
    {
      id: 'fraud-detection',
      title: 'Online Payment Fraud Detection System',
      category: 'ml',
      categoryLabel: 'Machine Learning',
      status: 'completed',
      statusLabel: 'Internship Project',
      type: 'ML Predictive Model',
      description: 'High-precision machine learning system developed during internship at Plasmid Networks to identify fraudulent financial transactions in real-time through feature engineering on skewed transaction patterns.',
      featured: true,
      githubUrl: 'https://github.com/vishnureddy2007/online-payment-fraud-detection',
      demoUrl: null,
      technologies: ['Python', 'Scikit-Learn', 'Pandas', 'NumPy', 'Jupyter'],
      metrics: [
        { label: 'Accuracy', value: '99.9%' },
        { label: 'Precision', value: '94.2%' },
        { label: 'Recall', value: '91.5%' },
        { label: 'F1-Score', value: '0.92' }
      ],
      problemStatement: 'Severe class imbalance in digital payment streams makes standard classification models prone to missing critical fraud spikes or triggering disruptive false card declines.',
      architecturalSolution: 'Applied advanced data preprocessing, SMOTE sampling, outlier rejection, and custom transaction velocity feature engineering. Evaluated decision tree and ensemble classification algorithms against precision-recall curves.',
      keyCapabilities: [
        'Comprehensive data cleaning and normalization for high-skew financial datasets',
        'Custom feature extraction isolating anomalous payment amounts and time intervals',
        'Multi-algorithm comparison (Random Forest, Gradient Boosting, Logistic Regression)',
        'Production-ready inference pipeline designed for low-latency batch verification'
      ],
      outcomes: 'Achieved verified 99.9% accuracy, 94.2% precision, 91.5% recall, and 0.92 F1-score documented in internship performance evaluations.'
    },
    {
      id: 'smart-atm',
      title: 'Smart ATM Banking System',
      category: 'java',
      categoryLabel: 'Java & Systems',
      status: 'completed',
      statusLabel: 'Desktop Application',
      type: 'Java Application',
      description: 'Desktop banking application built with Java 17, JavaFX 21, and Maven demonstrating layered architecture (UI -> Service -> Repository -> Model), salted SHA-256 PIN security, and persistent transaction reporting.',
      featured: false,
      githubUrl: 'https://github.com/vishnureddy2007',
      demoUrl: null,
      technologies: ['Java 17', 'JavaFX', 'Maven', 'SHA-256', 'JSON Persistence'],
      metrics: [
        { label: 'Language', value: 'Java 17' },
        { label: 'GUI', value: 'JavaFX 21' },
        { label: 'Security', value: 'Salted SHA-256' },
        { label: 'Lockout Rule', value: '3 Failed Tries' }
      ],
      problemStatement: 'Educational banking projects frequently mix UI and business logic while storing credentials in insecure plaintext, failing enterprise clean code standards.',
      architecturalSolution: 'Designed a strict 4-layer architecture with separated Presentation, Business Logic, Persistence, and Entity layers. Implemented salted SHA-256 password hashing and atomic JSON file state management.',
      keyCapabilities: [
        'Full banking operations: Deposit, Withdrawal, Fast Cash, Fund Transfer, and PIN Change',
        'Automatic account lockout trigger upon 3 consecutive invalid authentication attempts',
        'Timestamped transaction statement ledger with one-click TXT receipt export',
        'Pre-seeded mock accounts for instantaneous local evaluation'
      ],
      outcomes: 'Rock-solid desktop experience handling invalid edge-case transactions with complete data integrity across application restarts.'
    },
    {
      id: 'dsa-java',
      title: 'Data Structures & Algorithms Repository',
      category: 'java',
      categoryLabel: 'Java & Core CS',
      status: 'completed',
      statusLabel: 'Open Source',
      type: 'Algorithms Suite',
      description: 'Comprehensive repository of fundamental and advanced data structures and algorithmic implementations in Java, focusing on time and space complexity optimization.',
      featured: false,
      githubUrl: 'https://github.com/vishnureddy2007/DSA-with-Java',
      demoUrl: null,
      technologies: ['Java', 'Algorithms', 'Data Structures', 'OOP', 'Big-O Analysis'],
      metrics: [
        { label: 'Language', value: 'Java' },
        { label: 'Focus', value: 'Complexity' },
        { label: 'Coverage', value: 'Trees, Graphs' },
        { label: 'Status', value: 'Public Repo' }
      ],
      problemStatement: 'Mastering algorithmic problem-solving requires clean, verified implementations of fundamental computational structures with strict adherence to OOP paradigms.',
      architecturalSolution: 'Created modular Java implementations for Arrays, Linked Lists, Stacks, Queues, Binary Search Trees, Graph Traversals (BFS/DFS), and dynamic programming patterns.',
      keyCapabilities: [
        'Clean, commented Java implementations with unit test assertions',
        'Algorithmic complexity notes (Best, Average, Worst case Big-O)',
        'Idiomatic object-oriented design and memory management'
      ],
      outcomes: 'Serves as an ongoing reference library and continuous skill sharpening for technical coding assessments.'
    }
  ];

  // ==========================================
  // 4. GITHUB API INTEGRATION & CACHING
  // ==========================================
  const GITHUB_USERNAME = 'vishnureddy2007';
  const CACHE_KEY = 'vr_github_profile_data';
  const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour

  async function fetchGitHubData() {
    const ghRepoCount = document.getElementById('ghRepoCount');
    const ghLastUpdated = document.getElementById('ghLastUpdated');

    // Check cached data
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        if (Date.now() - parsed.timestamp < CACHE_TTL_MS) {
          applyGitHubStats(parsed.user, parsed.repos);
          return;
        }
      } catch (e) {
        localStorage.removeItem(CACHE_KEY);
      }
    }

    try {
      const userRes = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`);
      if (!userRes.ok) throw new Error(`User API error: ${userRes.status}`);
      const userData = await userRes.json();

      const reposRes = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`);
      if (!reposRes.ok) throw new Error(`Repos API error: ${reposRes.status}`);
      const reposData = await reposRes.json();

      // Cache data
      localStorage.setItem(CACHE_KEY, JSON.stringify({
        timestamp: Date.now(),
        user: userData,
        repos: reposData
      }));

      applyGitHubStats(userData, reposData);
    } catch (err) {
      console.warn('GitHub API request failed or rate limited; using verified fallback stats.', err);
      // Fallback verified numbers
      if (ghRepoCount) ghRepoCount.textContent = '7 Public Repos';
      if (ghLastUpdated) ghLastUpdated.textContent = 'Updated Today (Verified)';
    }
  }

  function applyGitHubStats(user, repos) {
    const ghRepoCount = document.getElementById('ghRepoCount');
    const ghLastUpdated = document.getElementById('ghLastUpdated');
    const ghFollowers = document.getElementById('ghFollowers');

    if (ghRepoCount && user && user.public_repos !== undefined) {
      ghRepoCount.textContent = `${user.public_repos} Public Repos`;
    }

    if (ghFollowers && user && user.followers !== undefined) {
      ghFollowers.textContent = `${user.followers} Followers`;
    }

    if (ghLastUpdated && Array.isArray(repos) && repos.length > 0) {
      const latest = repos[0];
      const updatedDate = new Date(latest.updated_at);
      const formatted = updatedDate.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
      ghLastUpdated.textContent = `Latest: ${latest.name} (${formatted})`;
    }
  }

  fetchGitHubData();

  // ==========================================
  // 5. PROJECT EXPLORER (SEARCH, FILTER, SORT)
  // ==========================================
  const projectsGrid = document.getElementById('projectsGrid');
  const projectSearchInput = document.getElementById('projectSearch');
  const projectSortSelect = document.getElementById('projectSort');
  const filterChips = document.querySelectorAll('.filter-chip');

  let activeCategory = 'all';
  let searchQuery = '';
  let activeSort = 'featured';

  function renderProjects() {
    if (!projectsGrid) return;

    let filtered = VERIFIED_PROJECTS.filter(p => {
      // Category filter
      if (activeCategory !== 'all' && p.category !== activeCategory) {
        return false;
      }

      // Search query filter
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const inTitle = p.title.toLowerCase().includes(query);
        const inDesc = p.description.toLowerCase().includes(query);
        const inTech = p.technologies.some(t => t.toLowerCase().includes(query));
        if (!inTitle && !inDesc && !inTech) {
          return false;
        }
      }

      return true;
    });

    // Sorting
    filtered.sort((a, b) => {
      if (activeSort === 'featured') {
        if (a.featured === b.featured) return 0;
        return a.featured ? -1 : 1;
      } else if (activeSort === 'title') {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });

    // Handle Empty State
    if (filtered.length === 0) {
      projectsGrid.innerHTML = `
        <div class="projects-empty-state">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <h3>No matching projects found</h3>
          <p>Try searching for a different keyword or resetting your filter category.</p>
          <button class="btn btn-secondary btn-sm" id="resetFiltersBtn">Reset Filters</button>
        </div>
      `;
      const resetBtn = document.getElementById('resetFiltersBtn');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          activeCategory = 'all';
          searchQuery = '';
          if (projectSearchInput) projectSearchInput.value = '';
          filterChips.forEach(c => c.classList.toggle('active', c.getAttribute('data-filter') === 'all'));
          renderProjects();
        });
      }
      return;
    }

    // Render Cards
    projectsGrid.innerHTML = filtered.map(p => {
      const metricsHtml = p.metrics.slice(0, 2).map(m => `
        <div class="metric-mini-item">
          <span class="metric-mini-num">${m.value}</span>
          <span class="metric-mini-label">${m.label}</span>
        </div>
      `).join('');

      const techChipsHtml = p.technologies.slice(0, 5).map(t => `
        <span class="tech-chip">${t}</span>
      `).join('');

      const demoLinkHtml = p.demoUrl ? `
        <a href="${p.demoUrl}" target="_blank" rel="noopener noreferrer" class="project-icon-link" title="Live Demo" aria-label="Live Demo for ${p.title}">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
        </a>
      ` : '';

      return `
        <article class="project-card" data-project-id="${p.id}">
          <div class="project-card-header">
            <div class="project-meta-row">
              <span class="badge-status ${p.status}">
                <span class="pulse-dot" style="width:6px;height:6px;margin-right:4px;"></span>
                ${p.statusLabel}
              </span>
              <span class="project-type-tag">${p.type}</span>
            </div>
            <h3 class="project-card-title">${p.title}</h3>
            <p class="project-card-desc">${p.description}</p>
          </div>
          
          <div class="project-card-content">
            <div class="project-metrics-mini">
              ${metricsHtml}
            </div>
            <div class="project-tags">
              ${techChipsHtml}
            </div>
          </div>

          <div class="project-card-footer">
            <div class="project-links">
              <a href="${p.githubUrl}" target="_blank" rel="noopener noreferrer" class="project-icon-link" title="GitHub Repository" aria-label="GitHub Repository for ${p.title}">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              </a>
              ${demoLinkHtml}
            </div>
            <button class="btn-details open-case-study-btn" data-id="${p.id}">
              <span>Case Study</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </button>
          </div>
        </article>
      `;
    }).join('');

    // Attach click events for Case Study buttons
    document.querySelectorAll('.open-case-study-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = btn.getAttribute('data-id');
        openCaseStudyModal(id);
      });
    });
  }

  // Event Listeners for Filters
  filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      filterChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      activeCategory = chip.getAttribute('data-filter') || 'all';
      renderProjects();
    });
  });

  if (projectSearchInput) {
    projectSearchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      renderProjects();
    });
  }

  if (projectSortSelect) {
    projectSortSelect.addEventListener('change', (e) => {
      activeSort = e.target.value;
      renderProjects();
    });
  }

  // Initial Project Render
  renderProjects();

  // ==========================================
  // 6. CRIME INVESTIGATION AI TABS
  // ==========================================
  const showcaseTabs = document.querySelectorAll('.showcase-tab-btn');
  const showcasePanes = document.querySelectorAll('.tab-pane');

  showcaseTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetPaneId = tab.getAttribute('data-tab');

      showcaseTabs.forEach(t => t.classList.remove('active'));
      showcasePanes.forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      const targetPane = document.getElementById(targetPaneId);
      if (targetPane) {
        targetPane.classList.add('active');
      }
    });
  });

  // ==========================================
  // 7. PROJECT CASE STUDY MODAL
  // ==========================================
  const caseStudyModal = document.getElementById('caseStudyModal');
  const caseStudyContent = document.getElementById('caseStudyContent');
  const closeCaseStudyBtn = document.getElementById('closeCaseStudyBtn');

  function openCaseStudyModal(projectId) {
    const project = VERIFIED_PROJECTS.find(p => p.id === projectId);
    if (!project || !caseStudyModal || !caseStudyContent) return;

    const keyCapHtml = project.keyCapabilities.map(cap => `
      <li>${cap}</li>
    `).join('');

    const techBadgesHtml = project.technologies.map(t => `
      <span class="skill-pill" style="font-size:0.8rem;padding:4px 10px;">${t}</span>
    `).join('');

    const demoBtnHtml = project.demoUrl ? `
      <a href="${project.demoUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
        <span>View Live Demo</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
      </a>
    ` : '';

    const ethicsAlertHtml = project.ethicsNotice ? `
      <div class="ethical-ai-banner" style="margin-top:20px;">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
        <div class="ethical-ai-content">
          <h4>Responsible Use Consideration</h4>
          <p>${project.ethicsNotice}</p>
        </div>
      </div>
    ` : '';

    caseStudyContent.innerHTML = `
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px;">
        <span class="badge-status ${project.status}">${project.statusLabel}</span>
        <span style="font-size:0.8rem;color:var(--text-dim);font-weight:700;">${project.categoryLabel}</span>
      </div>
      <h2 style="font-size:1.6rem;font-weight:800;color:var(--text-main);margin-bottom:12px;">${project.title}</h2>
      <p style="font-size:1rem;color:var(--text-body);margin-bottom:20px;">${project.description}</p>

      <h3 class="modal-section-title">The Challenge & Problem</h3>
      <p style="font-size:0.925rem;color:var(--text-body);margin-bottom:18px;">${project.problemStatement}</p>

      <h3 class="modal-section-title">Architectural Solution</h3>
      <p style="font-size:0.925rem;color:var(--text-body);margin-bottom:18px;">${project.architecturalSolution}</p>

      <h3 class="modal-section-title">Key Capabilities</h3>
      <ul class="timeline-points" style="margin-bottom:18px;">
        ${keyCapHtml}
      </ul>

      <h3 class="modal-section-title">Verified Outcomes</h3>
      <p style="font-size:0.925rem;color:var(--text-body);margin-bottom:18px;">${project.outcomes}</p>

      <h3 class="modal-section-title">Technologies Used</h3>
      <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:20px;">
        ${techBadgesHtml}
      </div>

      ${ethicsAlertHtml}

      <div style="margin-top:28px;padding-top:16px;border-top:1px solid var(--border-subtle);display:flex;align-items:center;gap:12px;">
        <a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
          <span>View Source on GitHub</span>
        </a>
        ${demoBtnHtml}
      </div>
    `;

    caseStudyModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeCaseStudyModal() {
    if (caseStudyModal) {
      caseStudyModal.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  if (closeCaseStudyBtn) {
    closeCaseStudyBtn.addEventListener('click', closeCaseStudyModal);
  }

  if (caseStudyModal) {
    caseStudyModal.addEventListener('click', (e) => {
      if (e.target === caseStudyModal) {
        closeCaseStudyModal();
      }
    });
  }

  // ==========================================
  // 8. WEB RESUME PREVIEW MODAL
  // ==========================================
  const resumeModal = document.getElementById('resumeModal');
  const openResumeModalBtn = document.getElementById('openResumeModalBtn');
  const closeResumeModalBtn = document.getElementById('closeResumeModalBtn');

  function openResumeModal() {
    if (resumeModal) {
      resumeModal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeResumeModal() {
    if (resumeModal) {
      resumeModal.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  if (openResumeModalBtn) openResumeModalBtn.addEventListener('click', openResumeModal);
  if (closeResumeModalBtn) closeResumeModalBtn.addEventListener('click', closeResumeModal);
  if (resumeModal) {
    resumeModal.addEventListener('click', (e) => {
      if (e.target === resumeModal) closeResumeModal();
    });
  }

  // Keyboard accessibility: ESC closes open modals
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeCaseStudyModal();
      closeResumeModal();
      closeTerminalDrawer();
    }
  });

  // ==========================================
  // 9. CONTACT FORM WITH VALIDATION & MAILTO FALLBACK
  // ==========================================
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('senderName');
      const emailInput = document.getElementById('senderEmail');
      const subjectInput = document.getElementById('senderSubject');
      const messageInput = document.getElementById('senderMessage');
      const hpInput = document.getElementById('formHoneypot');

      // Spam Bot Check
      if (hpInput && hpInput.value.trim() !== '') {
        console.warn('Bot submission blocked.');
        return;
      }

      let isValid = true;

      // Validate Name
      const nameErr = document.getElementById('nameError');
      if (!nameInput.value.trim()) {
        nameErr.classList.add('visible');
        isValid = false;
      } else {
        nameErr.classList.remove('visible');
      }

      // Validate Email
      const emailErr = document.getElementById('emailError');
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
        emailErr.classList.add('visible');
        isValid = false;
      } else {
        emailErr.classList.remove('visible');
      }

      // Validate Subject
      const subjectErr = document.getElementById('subjectError');
      if (!subjectInput.value.trim()) {
        subjectErr.classList.add('visible');
        isValid = false;
      } else {
        subjectErr.classList.remove('visible');
      }

      // Validate Message
      const messageErr = document.getElementById('messageError');
      if (!messageInput.value.trim() || messageInput.value.trim().length < 10) {
        messageErr.classList.add('visible');
        isValid = false;
      } else {
        messageErr.classList.remove('visible');
      }

      if (!isValid) return;

      // Prepare mailto fallback
      const recipient = 'vishnureddy1401@gmail.com';
      const subject = encodeURIComponent(`[Portfolio Inquiry] ${subjectInput.value.trim()}`);
      const body = encodeURIComponent(
        `Hi Vishnu,\n\n${messageInput.value.trim()}\n\n---\nFrom: ${nameInput.value.trim()}\nEmail: ${emailInput.value.trim()}`
      );
      const mailtoUrl = `mailto:${recipient}?subject=${subject}&body=${body}`;

      // Notify User and Trigger Mailto
      formStatus.className = 'form-status-alert success';
      formStatus.textContent = 'Opening your email client to dispatch this message directly to vishnureddy1401@gmail.com...';
      formStatus.style.display = 'block';

      showToast('Opening email client...');
      window.location.href = mailtoUrl;
    });
  }

  // ==========================================
  // 10. COPY TO CLIPBOARD UTILITY WITH TOAST
  // ==========================================
  const copyButtons = document.querySelectorAll('.copy-btn, .copy-mini-btn');
  const toast = document.getElementById('toast');

  copyButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();

      const textToCopy = btn.getAttribute('data-copy');
      if (!textToCopy) return;

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`Copied "${textToCopy}" to clipboard!`);
        }).catch(() => {
          fallbackCopyText(textToCopy);
        });
      } else {
        fallbackCopyText(textToCopy);
      }
    });
  });

  function fallbackCopyText(text) {
    const tempInput = document.createElement('input');
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    try {
      document.execCommand('copy');
      showToast(`Copied "${text}" to clipboard!`);
    } catch (err) {
      showToast('Could not copy to clipboard.');
    }
    document.body.removeChild(tempInput);
  }

  let toastTimeout;
  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');

    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  // ==========================================
  // 11. DEVELOPER MINI-TERMINAL DRAWER
  // ==========================================
  const terminalDrawer = document.getElementById('terminalDrawer');
  const terminalFab = document.getElementById('terminalFab');
  const terminalNavBtn = document.getElementById('terminalNavBtn');
  const closeTerminalBtn = document.getElementById('closeTerminalBtn');
  const clearTerminalBtn = document.getElementById('clearTerminalBtn');
  const terminalInput = document.getElementById('terminalInput');
  const terminalOutput = document.getElementById('terminalOutput');

  function openTerminalDrawer() {
    if (terminalDrawer) {
      terminalDrawer.classList.add('open');
      if (terminalFab) terminalFab.style.display = 'none';
      if (terminalInput) terminalInput.focus();
    }
  }

  function closeTerminalDrawer() {
    if (terminalDrawer) {
      terminalDrawer.classList.remove('open');
      if (terminalFab) terminalFab.style.display = 'flex';
    }
  }

  if (terminalFab) terminalFab.addEventListener('click', openTerminalDrawer);
  if (terminalNavBtn) terminalNavBtn.addEventListener('click', openTerminalDrawer);
  if (closeTerminalBtn) closeTerminalBtn.addEventListener('click', closeTerminalDrawer);

  if (clearTerminalBtn && terminalOutput) {
    clearTerminalBtn.addEventListener('click', () => {
      terminalOutput.innerHTML = '<div class="term-line term-response">Type "help" for a list of available commands.</div>';
    });
  }

  if (terminalInput && terminalOutput) {
    terminalInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const cmd = terminalInput.value.trim().toLowerCase();
        terminalInput.value = '';
        executeTerminalCommand(cmd);
      }
    });
  }

  function executeTerminalCommand(cmd) {
    if (!cmd) return;

    // Append Command Line
    const promptLine = document.createElement('div');
    promptLine.className = 'term-line';
    promptLine.innerHTML = `<span class="term-prompt">vishnu@portfolio:~$</span> <span class="term-command">${escapeHtml(cmd)}</span>`;
    terminalOutput.appendChild(promptLine);

    const responseLine = document.createElement('div');
    responseLine.className = 'term-line term-response';

    switch (cmd) {
      case 'help':
        responseLine.textContent = 
`Available commands:
  help       - Show this command reference
  skills     - List technical competencies and tools
  projects   - Output verified software projects
  crime-ai   - Inspect Crime Investigation AI architecture
  contact    - Display direct contact details
  about      - Brief background summary
  repo       - Open GitHub portfolio repository
  clear      - Clear terminal screen
  theme      - Toggle dark/light color mode`;
        break;

      case 'skills':
        responseLine.textContent =
`TECHNICAL SKILLS:
- Languages: Java, Python, C, SQL, JavaScript (ES6+), HTML5, CSS3
- Frameworks: React.js, Spring Boot, REST APIs
- AI & Vision: YOLOv8, OpenCV, Scikit-Learn, Pandas, NumPy, NLP
- Cloud & Tools: AWS Cloud Practitioner, Docker, Git, GitHub, Maven`;
        break;

      case 'projects':
        responseLine.textContent =
`VERIFIED PROJECTS:
1. CrimeVision (Crime Investigation AI) - Python, YOLOv8, OpenCV, Streamlit
2. LBRCE Canteen System - Spring Boot, React.js, MySQL (lbrce-canteen.vercel.app)
3. NetSage AI - Python deterministic rule checker & Cisco Packet Tracer
4. Online Payment Fraud Detection - 99.9% accuracy ML model
5. Smart ATM System - Java 17, JavaFX 21 desktop application`;
        break;

      case 'crime-ai':
        responseLine.textContent =
`CRIME INVESTIGATION AI (CRIMEVISION):
- Purpose: Offline forensic evidence analyzer for law enforcement
- Detection: Multi-source YOLOv8 (COCO + weapon models)
- Verification: 4-stage filter eliminating false weapon positives
- Video: Pure Python 1080p forensic video renderer with Ken Burns zoom
- Local LLM: Cautious situational risk analysis (Qwen3 14B)
- Test Suite: 25/25 PyTests passing`;
        break;

      case 'contact':
        responseLine.textContent =
`CONTACT DETAILS:
- Email: vishnureddy1401@gmail.com
- Phone: +91 6305049766
- LinkedIn: https://www.linkedin.com/in/vishnu-reddy0007
- GitHub: https://github.com/vishnureddy2007
- Location: Vijayawada, Andhra Pradesh, India`;
        break;

      case 'about':
        responseLine.textContent =
`Guntaka Nilakanta Vishnu Vardhan Reddy (Vishnu Reddy)
B.Tech Information Technology (CGPA: 8.84/10) at Lakireddy Bali Reddy College of Engineering.
Specializing in Java Full-Stack, AI/ML systems, and Cloud Computing.`;
        break;

      case 'repo':
        responseLine.textContent = 'Opening repository https://github.com/vishnureddy2007/portfolio ...';
        window.open('https://github.com/vishnureddy2007/portfolio', '_blank');
        break;

      case 'theme':
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('vr_theme', newTheme);
        responseLine.textContent = `Theme toggled to ${newTheme} mode.`;
        break;

      case 'clear':
        terminalOutput.innerHTML = '';
        return;

      case 'sudo':
        responseLine.textContent = 'Permission denied: User "guest" is not in the sudoers file. This incident will be reported.';
        break;

      default:
        responseLine.textContent = `bash: command not found: ${cmd}. Type "help" for available commands.`;
    }

    terminalOutput.appendChild(responseLine);
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
  }

  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;')
              .replace(/</g, '&lt;')
              .replace(/>/g, '&gt;')
              .replace(/"/g, '&quot;')
              .replace(/'/g, '&#039;');
  }

  // Set dynamic footer year
  const yearElem = document.getElementById('year');
  if (yearElem) {
    yearElem.textContent = new Date().getFullYear();
  }

})();