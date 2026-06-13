/* ===========================================================
   CLEM LTD — site behaviour
   =========================================================== */
(function () {
  "use strict";

  /* ---- year in footer ---- */
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  /* ---- mobile nav ---- */
  var toggle = document.getElementById("navToggle");
  var links = document.getElementById("navLinks");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      links.classList.toggle("open");
    });
    links.addEventListener("click", function (e) {
      if (e.target.tagName === "A") links.classList.remove("open");
    });
  }

  /* ---- swap product placeholders for real photos when present ---- */
  /* Drop files into assets/images/ (steel-sheets.jpg, etc.) and they
     auto-replace the SVG illustration. Missing files just keep the SVG. */
  document.querySelectorAll(".product-media[data-img]").forEach(function (el) {
    var src = el.getAttribute("data-img");
    if (!src) return;
    var probe = new Image();
    probe.onload = function () {
      el.style.backgroundImage = "url('" + src + "')";
      var svg = el.querySelector("svg");
      if (svg) svg.style.display = "none";
    };
    probe.src = src;
  });

  /* ---- "Request Proforma" links pre-select a product ---- */
  function selectProduct(name) {
    document
      .querySelectorAll('#productChips input[type="checkbox"]')
      .forEach(function (cb) {
        if (cb.value === name) cb.checked = true;
      });
  }
  document.querySelectorAll("[data-product]").forEach(function (link) {
    link.addEventListener("click", function () {
      selectProduct(link.getAttribute("data-product"));
    });
  });

  /* ---- reveal on scroll ---- */
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            en.target.classList.add("in");
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal").forEach(function (el) {
      io.observe(el);
    });
  } else {
    document.querySelectorAll(".reveal").forEach(function (el) {
      el.classList.add("in");
    });
  }

  /* ---- proforma form submit (Web3Forms) ---- */
  var form = document.getElementById("proformaForm");
  var statusEl = document.getElementById("formStatus");
  var submitBtn = document.getElementById("submitBtn");

  function showStatus(type, msg) {
    if (!statusEl) return;
    statusEl.className = "form-status " + type;
    statusEl.textContent = msg;
    statusEl.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // require at least one product
      var anyProduct = form.querySelectorAll('input[name="products"]:checked').length > 0;
      if (!anyProduct) {
        showStatus("err", "Please select at least one product of interest.");
        return;
      }

      var accessKey = form.querySelector('input[name="access_key"]').value;
      if (!accessKey || accessKey.indexOf("REPLACE_WITH") === 0) {
        showStatus(
          "err",
          "This form isn't connected yet. Add your Web3Forms access key (see README) to start receiving requests."
        );
        return;
      }

      var btnText = submitBtn ? submitBtn.innerHTML : "";
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Sending…";
      }

      var data = new FormData(form);

      fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data,
      })
        .then(function (r) {
          return r.json();
        })
        .then(function (json) {
          if (json.success) {
            form.reset();
            showStatus(
              "ok",
              "✓ Thank you! Your proforma request has been sent. We'll reply within 24 hours."
            );
          } else {
            showStatus(
              "err",
              "Sorry, something went wrong. Please email us directly at info@clemltd.store."
            );
          }
        })
        .catch(function () {
          showStatus(
            "err",
            "Network error. Please check your connection or email info@clemltd.store."
          );
        })
        .finally(function () {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = btnText;
          }
        });
    });
  }
})();
