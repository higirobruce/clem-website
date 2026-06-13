/* ===========================================================
   CLEM LTD — site behaviour
   Content is loaded from content.json (editable via Pages CMS).
   The HTML ships with the same text baked in as a no-JS / SEO
   fallback; this script overrides it from content.json.
   =========================================================== */
(function () {
  "use strict";

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  function esc(v) {
    return String(v == null ? "" : v)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }
  function get(obj, path) {
    return path.split(".").reduce(function (o, k) {
      return o && o[k] != null ? o[k] : undefined;
    }, obj);
  }

  /* generic icon used for products that have no photo yet */
  var GENERIC_ICON =
    '<svg viewBox="0 0 64 64" fill="none"><path d="M8 22l24-10 24 10-24 10L8 22z" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round"/><path d="M8 32l24 10 24-10M8 42l24 10 24-10" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round"/></svg>';
  var ARROW =
    '<svg viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  function productCard(p) {
    var media = p.image
      ? '<div class="product-media" style="background-image:url(\'' + esc(p.image) + '\')"><span class="tag">' + esc(p.tag || p.name) + "</span></div>"
      : '<div class="product-media"><span class="tag">' + esc(p.tag || p.name) + "</span>" + GENERIC_ICON + "</div>";
    return (
      '<article class="product-card reveal">' + media +
      '<div class="product-body"><h3>' + esc(p.name) + "</h3><p>" + esc(p.description) + "</p>" +
      '<a href="#proforma" class="req" data-product="' + esc(p.name) + '">Request Proforma ' + ARROW + "</a></div></article>"
    );
  }

  var MORE_CARD =
    '<article class="product-card reveal" style="background:var(--steel-700);border-color:var(--steel-700);justify-content:center;align-items:center;text-align:center;padding:30px;color:#fff">' +
    '<svg viewBox="0 0 24 24" fill="none" style="width:46px;height:46px;color:var(--amber);margin-bottom:14px"><path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg>' +
    '<h3 style="color:#fff;margin-bottom:8px">Looking for something else?</h3>' +
    '<p style="color:#bcd0e6;margin-bottom:18px">We source a wide range of steel products on request.</p>' +
    '<a href="#proforma" class="btn btn-primary btn-sm" data-product="Other / custom enquiry">Make an Enquiry</a></article>';

  function applyContent(c) {
    if (!c) return;

    /* simple text bindings */
    $$("[data-bind]").forEach(function (el) {
      var v = get(c, el.getAttribute("data-bind"));
      if (v !== undefined) el.textContent = v;
    });
    /* html bindings (fields that contain markup like <strong>) */
    $$("[data-html]").forEach(function (el) {
      var v = get(c, el.getAttribute("data-html"));
      if (v !== undefined) el.innerHTML = v;
    });

    /* document title + meta description */
    if (c.site) {
      if (c.site.metaTitle) document.title = c.site.metaTitle;
      var md = document.querySelector('meta[name="description"]');
      if (md && c.site.metaDescription) md.setAttribute("content", c.site.metaDescription);
    }

    /* hero badges */
    if (c.hero && c.hero.badges && $("#heroBadges")) {
      $("#heroBadges").innerHTML = c.hero.badges.map(function (b) {
        return '<div class="b"><span class="n">' + esc(b.number) + '</span><span class="l">' + esc(b.label) + "</span></div>";
      }).join("");
    }

    /* about paragraphs (allow inline HTML) + stats */
    if (c.about) {
      if (c.about.paragraphs && $("#aboutParas")) {
        $("#aboutParas").innerHTML = c.about.paragraphs.map(function (p) { return "<p>" + p + "</p>"; }).join("");
      }
      if (c.about.stats && $("#aboutStats")) {
        $("#aboutStats").innerHTML = c.about.stats.map(function (s) {
          return '<div class="stat-card' + (s.accent ? " accent" : "") + '"><div class="n">' + esc(s.number) + '</div><div class="l">' + esc(s.label) + "</div></div>";
        }).join("");
      }
    }

    /* hero mini-list mirrors product names */
    if (c.products && c.products.items && $("#heroMini")) {
      var mini = c.products.items.map(function (p) { return '<div class="mini">' + esc(p.tag || p.name) + "</div>"; });
      mini.push('<div class="mini" style="color:var(--amber);font-weight:600">+ More on request</div>');
      $("#heroMini").innerHTML = mini.join("");
    }

    /* products grid */
    if (c.products && c.products.items && $("#productGrid")) {
      $("#productGrid").innerHTML = c.products.items.map(productCard).join("") + MORE_CARD;
    }

    /* product chips (kept in sync with the catalogue) */
    if (c.products && c.products.items && $("#productChips")) {
      var chips = c.products.items.map(function (p) {
        return '<label class="chip"><input type="checkbox" name="products" value="' + esc(p.name) + '"><span>' + esc(p.tag || p.name) + "</span></label>";
      });
      chips.push('<label class="chip"><input type="checkbox" name="products" value="Other / custom enquiry"><span>Other</span></label>');
      $("#productChips").innerHTML = chips.join("");
    }

    /* sourcing grid */
    if (c.sourcing && c.sourcing.items && $("#sourceGrid")) {
      $("#sourceGrid").innerHTML = c.sourcing.items.map(function (s) {
        return '<div class="source"><div class="flag">' + esc(s.flag) + '</div><h4>' + esc(s.name) + '</h4><p>' + esc(s.note) + "</p></div>";
      }).join("");
    }

    /* contact links + map */
    if (c.contact) {
      if (c.contact.email) {
        var em = $("#emailLink");
        if (em) em.setAttribute("href", "mailto:" + c.contact.email);
      }
      if (c.contact.phoneTel) {
        var ph = $("#phoneLink");
        if (ph) ph.setAttribute("href", "tel:" + c.contact.phoneTel);
      }
      if (c.contact.whatsapp) {
        var wa = $("#waLink");
        if (wa) wa.setAttribute("href", "https://wa.me/" + c.contact.whatsapp);
      }
      if (c.contact.mapQuery) {
        var mf = $("#mapFrame");
        if (mf) mf.setAttribute("src", "https://www.google.com/maps?q=" + encodeURIComponent(c.contact.mapQuery) + "&output=embed");
      }
    }
  }

  /* ---- behaviours that run regardless of content load ---- */
  function initBehaviours() {
    /* year in footer */
    var y = $("#year");
    if (y) y.textContent = new Date().getFullYear();

    /* mobile nav */
    var toggle = $("#navToggle"), links = $("#navLinks");
    if (toggle && links) {
      toggle.addEventListener("click", function () { links.classList.toggle("open"); });
      links.addEventListener("click", function (e) {
        if (e.target.tagName === "A") links.classList.remove("open");
      });
    }

    /* "Request Proforma" links pre-select a product */
    function selectProduct(name) {
      $$('#productChips input[type="checkbox"]').forEach(function (cb) {
        if (cb.value === name) cb.checked = true;
      });
    }
    $$("[data-product]").forEach(function (link) {
      link.addEventListener("click", function () {
        selectProduct(link.getAttribute("data-product"));
      });
    });

    /* reveal on scroll */
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
        });
      }, { threshold: 0.12 });
      $$(".reveal").forEach(function (el) { io.observe(el); });
    } else {
      $$(".reveal").forEach(function (el) { el.classList.add("in"); });
    }

    /* proforma form submit (Web3Forms) */
    var form = $("#proformaForm"), statusEl = $("#formStatus"), submitBtn = $("#submitBtn");
    function showStatus(type, msg) {
      if (!statusEl) return;
      statusEl.className = "form-status " + type;
      statusEl.textContent = msg;
      statusEl.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    if (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        if (form.querySelectorAll('input[name="products"]:checked').length === 0) {
          showStatus("err", "Please select at least one product of interest.");
          return;
        }
        var accessKey = form.querySelector('input[name="access_key"]').value;
        if (!accessKey || accessKey.indexOf("REPLACE_WITH") === 0) {
          showStatus("err", "This form isn't connected yet. Add your Web3Forms access key (see README).");
          return;
        }
        var btnHtml = submitBtn ? submitBtn.innerHTML : "";
        if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = "Sending…"; }
        fetch("https://api.web3forms.com/submit", { method: "POST", body: new FormData(form) })
          .then(function (r) { return r.json(); })
          .then(function (json) {
            if (json.success) {
              form.reset();
              showStatus("ok", "✓ Thank you! Your proforma request has been sent. We'll reply within 24 hours.");
            } else {
              showStatus("err", "Sorry, something went wrong. Please email us directly at info@clemltd.store.");
            }
          })
          .catch(function () {
            showStatus("err", "Network error. Please check your connection or email info@clemltd.store.");
          })
          .finally(function () {
            if (submitBtn) { submitBtn.disabled = false; submitBtn.innerHTML = btnHtml; }
          });
      });
    }
  }

  /* ---- boot: load content, then wire behaviours ---- */
  function boot() {
    fetch("content.json", { cache: "no-cache" })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (c) { try { applyContent(c); } catch (e) { /* keep static fallback */ } })
      .catch(function () { /* offline / missing file → static fallback stays */ })
      .finally(initBehaviours);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
