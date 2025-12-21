// =========================
// Tu Hogar en Puebla (static)
// - Productos con modal + carrusel
// - Comentarios (demo) con localStorage
// =========================

const $ = (sel) => document.querySelector(sel);

const PRODUCTS = [
  {
    id: "colmenarp",
    title: "Casa Colmenar Platino",
    price: "$2,058,000 MXN",
    desc: "Casa amplia y luminosa, ideal para familia. Excelente ubicación y acabados modernos.",
    badges: ["2 recámaras", "3 baños", "2 estacionamientos", "Jardín", "Cisterna", "Vigilancia 24/7", "Alberca", "Parque Pet Friendly"],
    images: [
      "assets/img/colmenarp/cocina%203.jpeg",
      "assets/img/colmenarp/frente.jpeg",
      "assets/img/colmenarp/sala.jpeg",
      "assets/img/colmenarp/comedor.jpeg",
      "assets/img/colmenarp/cocina.jpeg",
      "assets/img/colmenarp/cocina%202.jpeg",
      "assets/img/colmenarp/estudio.jpeg",
      "assets/img/colmenarp/cuarto%20tv.jpeg",
      "assets/img/colmenarp/recamara%201.jpeg",
      "assets/img/colmenarp/ba%C3%B1o.jpeg",
      "assets/img/colmenarp/plantabaja.jpeg",
      "assets/img/colmenarp/plantabaja%202.jpeg",
    ],
  },
  {
    id: "colmenar",
    title: "Casa Colmenar",
    price: "$2,058,000 MXN",
    desc: "Departamento cómodo en zona con gran conectividad. Perfecto para pareja o inversión.",
    badges: ["2 recámaras", "2 baños", "1 estacionamiento", "Amenidades"],
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1400&q=70",
      "https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=1400&q=70",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1400&q=70",
    ],
  },
  {
    id: "santiago",
    title: "Casa Santiago",
    price: "$2,348,000 MXN",
    desc: "Diseño moderno con espacios abiertos. Zona tranquila y con buena plusvalía.",
    badges: ["3 recámaras", "2 baños", "Terraza", "Cocina integral"],
    images: [
      "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&w=1400&q=70",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1400&q=70",
      "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1400&q=70",
    ],
  },
  {
    id: "olmo",
    title: "Depto. Olmo",
    price: "$1,442,000 MXN",
    desc: "Diseño moderno con espacios abiertos. Zona tranquila y con buena plusvalía.",
    badges: ["3 recámaras", "2 baños", "Terraza", "Cocina integral"],
    images: [
      "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&w=1400&q=70",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1400&q=70",
      "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1400&q=70",
    ],
  },
];

// ---------- Render productos ----------
function renderProducts() {
  const grid = $("#productsGrid");
  if (!grid) return;

  grid.innerHTML = PRODUCTS.map(p => `
    <article class="card product" data-product="${p.id}" tabindex="0" role="button" aria-label="Abrir ${p.title}">
      <div class="thumb" style="background-image:url('${p.images[0]}')"></div>
      <div class="body">
        <h3>${p.title}</h3>
        <div class="price">${p.price}</div>
        <p class="muted">${p.desc}</p>
        <div class="meta">
          ${p.badges.slice(0,3).map(b => `<span class="badge">${b}</span>`).join("")}
        </div>
        <div style="margin-top:12px;">
          <span class="link">Ver detalles →</span>
        </div>
      </div>
    </article>
  `).join("");

  grid.querySelectorAll("[data-product]").forEach(card => {
    card.addEventListener("click", () => openProduct(card.getAttribute("data-product")));
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openProduct(card.getAttribute("data-product"));
      }
    });
  });
}

// ---------- Modal + carrusel ----------
let currentProduct = null;
let currentIndex = 0;

function openProduct(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;

  currentProduct = p;
  currentIndex = 0;

  $("#modalTitle").textContent = p.title;
  $("#modalPrice").textContent = p.price;
  $("#modalDesc").textContent = p.desc;
  $("#modalCta").setAttribute("href", "#contacto");

  const features = $("#modalFeatures");
  features.innerHTML = p.badges.map(b => `<span class="badge">${b}</span>`).join("");

  buildDots(p.images.length);
  setImage(0);

  $("#modalBackdrop").classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  $("#modalBackdrop").classList.add("hidden");
  document.body.style.overflow = "";
}

function setImage(idx) {
  if (!currentProduct) return;
  const max = currentProduct.images.length;
  currentIndex = (idx + max) % max;

  const img = $("#carouselImg");
  img.src = currentProduct.images[currentIndex];

  // dots active
  document.querySelectorAll(".dot").forEach((d, i) => {
    d.classList.toggle("active", i === currentIndex);
  });
}

function buildDots(n) {
  const dots = $("#dots");
  dots.innerHTML = "";
  for (let i = 0; i < n; i++) {
    const b = document.createElement("button");
    b.className = "dot" + (i === 0 ? " active" : "");
    b.type = "button";
    b.setAttribute("aria-label", `Ir a imagen ${i + 1}`);
    b.addEventListener("click", () => setImage(i));
    dots.appendChild(b);
  }
}

function initModal() {
  const backdrop = $("#modalBackdrop");
  if (!backdrop) return;

  $("#modalClose").addEventListener("click", closeModal);
  $("#prevBtn").addEventListener("click", () => setImage(currentIndex - 1));
  $("#nextBtn").addEventListener("click", () => setImage(currentIndex + 1));

  // click fuera del modal
  backdrop.addEventListener("click", (e) => {
    if (e.target === backdrop) closeModal();
  });

  // teclado
  document.addEventListener("keydown", (e) => {
    if (backdrop.classList.contains("hidden")) return;
    if (e.key === "Escape") closeModal();
    if (e.key === "ArrowLeft") setImage(currentIndex - 1);
    if (e.key === "ArrowRight") setImage(currentIndex + 1);
  });

  // copiar nombre de propiedad
  $("#copyProduct").addEventListener("click", async () => {
    if (!currentProduct) return;
    try {
      await navigator.clipboard.writeText(currentProduct.title);
      $("#copyProduct").textContent = "✅ Copiado";
      setTimeout(() => ($("#copyProduct").textContent = "Copiar nombre de propiedad"), 1200);
    } catch {
      alert("No se pudo copiar. Intenta manualmente.");
    }
  });
}

// ---------- Comentarios (demo localStorage) ----------
const COMMENTS_KEY = "thp_comments_v1";

const seedComments = [
  { name: "Luis", rating: 5, text: "Excelente atención, clara y rápida. Me acompañó en todo el proceso." },
  { name: "Sofía", rating: 5, text: "Muy profesional. Encontramos una opción perfecta en menos de 2 semanas." },
  { name: "Carlos", rating: 4, text: "Buena experiencia, siempre resolvió dudas y dio seguimiento." },
];

function loadComments() {
  try {
    const raw = localStorage.getItem(COMMENTS_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

function saveComments(list) {
  localStorage.setItem(COMMENTS_KEY, JSON.stringify(list));
}

function stars(n) {
  const full = "★".repeat(n);
  const empty = "☆".repeat(5 - n);
  return full + empty;
}

function renderComments() {
  const wrap = $("#commentsList");
  if (!wrap) return;

  let list = loadComments();
  if (!list) {
    list = seedComments;
    saveComments(list);
  }

  wrap.innerHTML = list.map(c => `
    <div class="card comment">
      <div class="avatar">${(c.name || "?").slice(0,1).toUpperCase()}</div>
      <div>
        <div style="display:flex; gap:10px; align-items:center; flex-wrap:wrap;">
          <strong>${escapeHtml(c.name)}</strong>
          <span class="badge">${stars(Number(c.rating) || 5)}</span>
        </div>
        <p class="muted" style="margin:8px 0 0;">${escapeHtml(c.text)}</p>
      </div>
    </div>
  `).join("");
}

function initCommentForm() {
  const form = $("#commentForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = $("#cName").value.trim();
    const rating = Number($("#cRating").value);
    const text = $("#cText").value.trim();

    if (!name || !text || !rating) return;

    const list = loadComments() || [];
    list.unshift({ name, rating, text });
    saveComments(list);

    $("#cName").value = "";
    $("#cRating").value = "5";
    $("#cText").value = "";

    renderComments();
  });

  $("#btnClearComments").addEventListener("click", () => {
    const ok = confirm("Esto borrará los comentarios guardados en este navegador (demo). ¿Seguro?");
    if (!ok) return;
    localStorage.removeItem(COMMENTS_KEY);
    renderComments();
  });
}

function escapeHtml(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

// ---------- Boot ----------
function boot() {
  const year = $("#year");
  if (year) year.textContent = new Date().getFullYear();

  renderProducts();
  initModal();
  renderComments();
  initCommentForm();
}

boot();


(() => {
  const wrap = document.getElementById("welcomeVideoWrap");
  const video = document.getElementById("welcomeVideo");
  const overlay = wrap?.querySelector(".video-play-overlay");

  if (!wrap || !video || !overlay) return;

  const hideOverlay = () => overlay.classList.add("is-hidden");
  const showOverlay = () => overlay.classList.remove("is-hidden");

  overlay.addEventListener("click", () => {
    // si está en pausa, play; si está reproduciendo, pause
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  });

  video.addEventListener("play", hideOverlay);
  video.addEventListener("playing", hideOverlay);
  video.addEventListener("pause", showOverlay);
  video.addEventListener("ended", showOverlay);

  // estado inicial (si el navegador auto-inicia por alguna razón)
  if (!video.paused) hideOverlay();
})();

// =========================
// UI/UX: reveal on scroll (discreto)
// (append only, no toca lógica existente)
// =========================
(() => {
  const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const targets = [
    ...document.querySelectorAll("main.hero .hero-copy"),
    ...document.querySelectorAll("main.hero .hero-card"),
    ...document.querySelectorAll("section.section > .container"),
    ...document.querySelectorAll("footer .container"),
  ];

  targets.forEach(el => el.classList.add("reveal"));

  if (reduce){
    targets.forEach(el => el.classList.add("is-in"));
    return;
  }

  if (!("IntersectionObserver" in window)){
    targets.forEach(el => el.classList.add("is-in"));
    return;
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting){
        e.target.classList.add("is-in");
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -10% 0px" });

  targets.forEach(el => io.observe(el));
})();

(async () => {
  const el = document.getElementById("news-list");
  if (!el) return;

  try {
    const res = await fetch("assets/data/news.json", { cache: "no-store" });
    if (!res.ok) throw new Error("news.json not found");

    const data = await res.json();
    const items = Array.isArray(data.items) ? data.items.slice(0, 3) : [];

    if (!items.length) {
      el.innerHTML = `
        <article class="card">
          <div class="card-top">
            <span class="tag">Noticias</span>
            <span class="muted tiny">Hoy</span>
          </div>
          <h3>Sin novedades por ahora</h3>
          <p class="muted">Vuelve más tarde para ver oportunidades y noticias positivas.</p>
          <a class="link" href="#contacto">Contactar</a>
        </article>
      `;
      return;
    }

    const niceDate = (iso) => {
      if (!iso) return "Hoy";
      // si viene YYYY-MM-DD o ISO, mostramos YYYY-MM-DD (simple y seguro)
      return String(iso).slice(0, 10);
    };

    el.innerHTML = items.map(n => {
      const title = n.title || "Noticia";
      const url = n.url || "#";
      const source = n.source || "Fuente";
      const publishedAt = niceDate(n.publishedAt);
      const summary = n.summary || "";

      return `
        <article class="card">
          <div class="card-top">
            <span class="tag">${source}</span>
            <span class="muted tiny">${publishedAt}</span>
          </div>
          <h3>${title}</h3>
          <p class="muted">${summary}</p>
          <a class="link" href="${url}" target="_blank" rel="noopener noreferrer">Leer más</a>
        </article>
      `;
    }).join("");
  } catch (e) {
    // si falla el fetch, dejamos lo que ya está (placeholder)
    // opcional: console.log(e);
  }
})();
