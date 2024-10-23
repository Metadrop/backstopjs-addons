module.exports = async (page, scenario, config) => {
  // Stop animations.
  if (scenario.stopAnimationsSelectors) {
    await page.waitForSelector('head');
    await page.evaluate(async(scenario) => {
      const head = document.head || document.getElementsByTagName('head')[0];
      const style = document.createElement('style');
      const scenarioSelector = scenario.stopAnimationsSelectors ? scenario.stopAnimationsSelectors : '';
      const css = scenarioSelector + '{animation: none !important; transition-duration: 0ms !important; transition: none !important; visibility: visible !important;}';

      head.appendChild(style);
      style.setAttribute('type', 'text/css');
      style.appendChild(document.createTextNode(css));
    }, scenario);
  }

  // Disable filters.
  if (scenario.disableFiltersSelector) {
    await page.waitForSelector('head');
    await page.evaluate(async(scenario) => {
      const head = document.head || document.getElementsByTagName('head')[0];
      const style = document.createElement('style');
      const scenarioSelector = scenario.disableFiltersSelector ? scenario.disableFiltersSelector : '';
      const css = scenarioSelector + '{filter: none !important;}';

      head.appendChild(style);
      style.setAttribute('type', 'text/css');
      style.appendChild(document.createTextNode(css));
    }, scenario);
  }

  // Hide iframe content.
  if (scenario.hideIframeContent) {
    await page.evaluate(async(scenario) => {
      const iframeContainers = document.querySelectorAll(scenario.hideIframeContent);

      iframeContainers.forEach((iframeContainer) => {
        const iframe = iframeContainer.querySelector('iframe');
        if (iframe) {
          iframe.src = '';
          iframe.style.background = "lightgray";
          iframeContainer.style.position = 'relative';
          iframeContainer.innerHTML += '<div style="position: absolute; left: 0; right: 0; top: 50%; width: 100%; text-align: center; font-size: 3rem;">Iframe</div>';
        }
      });
    }, scenario);
  }

  await page.evaluate(async(config) => {
    // Avoid lazy css load.
    document.querySelectorAll('link[rel="stylesheet"][data-onload-media][onload]').forEach((stylelink) => {
      stylelink.onload = null;
      stylelink.media = stylelink.dataset.onloadMedia;
    });

    // Force blazy to load all images when available.
    if (typeof Drupal == 'object' && typeof Drupal.blazy == 'object') {
      Drupal.blazy.init.load(document.getElementsByClassName('b-lazy'), true);
    }
    // Force eager image loading.
    document.querySelectorAll('img').forEach((image) => {
      image.loading = 'eager';
    });
    // Avoid images decoding async.
    document.querySelectorAll('img[decoding=async]').forEach((image) => {
      image.decoding = 'sync';
    });

    // Avoid iframe lazy load.
    document.querySelectorAll('iframe[loading=lazy]').forEach((iframe) => {
      iframe.loading = 'eager';
    });

    if (typeof $ == 'undefined' && typeof jQuery == 'function') {
      window.$ = jQuery;
    }
    const slickCarousels = document.querySelectorAll('.slick-slider');
    slickCarousels.forEach((carousel) => {

      // Avoid autoplay in carousels.
      if ($(carousel).slick('slickGetOption', 'autoplay')) {
        $(carousel).slick('slickSetOption', {
          'speed': 0,
          'fade': false,
          'infinite': false
        }, false);
        $(carousel).on('afterChange', function (event, slick) {
          slick.slickSetOption({
            'autoplay': false,
          }, true);
        });
      }

      $(carousel).slick('slickGoTo', 0, true);
    });
    if (slickCarousels.length > 0) {
      const head = document.head || document.getElementsByTagName('head')[0];
      const style = document.createElement('style');
      const css = '.slick-list * {text-rendering: geometricPrecision;}';

      head.appendChild(style);
      style.setAttribute('type', 'text/css');
      style.appendChild(document.createTextNode(css));
    }
  }, config);

  // Wait for fonts to load.
  await page.waitForFunction(() => {
    return document.fonts.ready.then(() => {
      return true;
    });
  });

  // Wait for assets to load.
  await page.waitForNetworkIdle();
}
