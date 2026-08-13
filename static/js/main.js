// Theme toggle
(function () {
  var toggle = document.getElementById('theme-toggle');
  if (!toggle) return;

  toggle.addEventListener('click', function () {
    var current = document.documentElement.getAttribute('data-theme');
    var next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
	document.dispatchEvent(new Event('theme-changed')); //added 8/13
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
      //var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      //var blendTarget = isDark ? 30 : 245;
      //var blendAmount = 0.78;

      //var br = Math.round(r + (blendTarget - r) * blendAmount);
      //var bg = Math.round(g + (blendTarget - g) * blendAmount);
      //var bb = Math.round(b + (blendTarget - b) * blendAmount);

      //panel.style.setProperty('--panel-color', 'rgb(' + br + ', ' + bg + ', ' + bb + ')');
	  
	  // NEW LOGIC (8/13/2026): Convert average RGB to HSL, then normalize lightness and boost
      // saturation so every panel reads as a clear, "dominant" tint —
      // regardless of whether the source image itself was dark or light.
      var isDark = document.documentElement.getAttribute('data-theme') === 'dark';

      var mx = Math.max(r, g, b) / 255, mn = Math.min(r, g, b) / 255;
      var l = (mx + mn) / 2;
      var d = mx - mn;
      var h = 0, s = 0;
      if (d !== 0) {
        s = d / (1 - Math.abs(2 * l - 1));
        if (mx === r / 255) h = ((g / 255 - b / 255) / d) % 6;
        else if (mx === g / 255) h = (b / 255 - r / 255) / d + 2;
        else h = (r / 255 - g / 255) / d + 4;
        h *= 60;
        if (h < 0) h += 360;
      }

      var targetS = Math.min(s * 1.6 + 0.15, 0.65);
      var targetL = isDark ? 0.25 : 0.85;

      var c = (1 - Math.abs(2 * targetL - 1)) * targetS;
      var x = c * (1 - Math.abs((h / 60) % 2 - 1));
      var m = targetL - c / 2;
      var rp, gp, bp;
      if (h < 60) { rp = c; gp = x; bp = 0; }
      else if (h < 120) { rp = x; gp = c; bp = 0; }
      else if (h < 180) { rp = 0; gp = c; bp = x; }
      else if (h < 240) { rp = 0; gp = x; bp = c; }
      else if (h < 300) { rp = x; gp = 0; bp = c; }
      else { rp = c; gp = 0; bp = x; }

      var br = Math.round((rp + m) * 255);
      var bg = Math.round((gp + m) * 255);
      var bb = Math.round((bp + m) * 255);

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

  //Added 8/13
  document.addEventListener('theme-changed', function () {
    images.forEach(function (img) {
      if (img.complete && img.naturalWidth) {
        applyAverageColor(img);
      }
    });
  });
})();

