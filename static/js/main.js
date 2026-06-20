// Theme toggle
(function () {
  var toggle = document.getElementById('theme-toggle');
  if (!toggle) return;

  toggle.addEventListener('click', function () {
    var current = document.documentElement.getAttribute('data-theme');
    var next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });
})();

// Mobile nav toggle
(function () {
  var navToggle = document.getElementById('nav-toggle');
  var nav = document.querySelector('.main-nav');
  if (!navToggle || !nav) return;

  navToggle.addEventListener('click', function () {
    nav.classList.toggle('open');
  });
})();

// "Pages" dropdown toggle
(function () {
  var dropdownParent = document.querySelector('.has-dropdown');
  var dropdownToggle = document.querySelector('.dropdown-toggle');
  if (!dropdownParent || !dropdownToggle) return;

  dropdownToggle.addEventListener('click', function (e) {
    e.stopPropagation();
    var isOpen = dropdownParent.classList.toggle('open');
    dropdownToggle.setAttribute('aria-expanded', isOpen);
  });

  document.addEventListener('click', function (e) {
    if (!dropdownParent.contains(e.target)) {
      dropdownParent.classList.remove('open');
      dropdownToggle.setAttribute('aria-expanded', 'false');
    }
  });
})();

// Dynamic thumbnail panel color: sample the average color of each
// [data-color-sample] image and apply it (softened) as the background
// of its enclosing .thumb-panel.
(function () {
  var images = document.querySelectorAll('[data-color-sample]');
  if (!images.length) return;

  function applyAverageColor(img) {
    var panel = img.closest('.thumb-panel');
    if (!panel) return;

    try {
      var canvas = document.createElement('canvas');
      var sampleSize = 24;
      canvas.width = sampleSize;
      canvas.height = sampleSize;
      var ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, sampleSize, sampleSize);

      var data = ctx.getImageData(0, 0, sampleSize, sampleSize).data;
      var r = 0, g = 0, b = 0, count = 0;

      for (var i = 0; i < data.length; i += 4) {
        r += data[i];
        g += data[i + 1];
        b += data[i + 2];
        count++;
      }
      r = Math.round(r / count);
      g = Math.round(g / count);
      b = Math.round(b / count);

      // Soften: blend toward a light/dark neutral depending on theme
      // so the panel reads as a tint, not the raw saturated color.
      var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      var blendTarget = isDark ? 30 : 245;
      var blendAmount = 0.78;

      var br = Math.round(r + (blendTarget - r) * blendAmount);
      var bg = Math.round(g + (blendTarget - g) * blendAmount);
      var bb = Math.round(b + (blendTarget - b) * blendAmount);

      panel.style.setProperty('--panel-color', 'rgb(' + br + ', ' + bg + ', ' + bb + ')');
    } catch (e) {
      // Canvas may throw for cross-origin images without CORS headers;
      // fall back silently to the default panel color.
    }
  }

  images.forEach(function (img) {
    if (img.complete && img.naturalWidth) {
      applyAverageColor(img);
    } else {
      img.addEventListener('load', function () {
        applyAverageColor(img);
      });
    }
  });
})();
