module.exports = async (page, scenario, vp, ir, Engine, config) => {
  await require(config.backstopjsAddons.path + '/loadCookies')(page, scenario);
  await require(config.backstopjsAddons.path + '/userAgentByViewport')(page, scenario, vp);
};
