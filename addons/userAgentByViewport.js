module.exports = async (page, scenario, viewport) => {

  // Custom User Agent by viewport.
  if (viewport.userAgent) {
    await page.setUserAgent(viewport.userAgent);
  }
}
