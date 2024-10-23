module.exports = async(page, scenario, vp, ir, Engine, config) => {
  console.log('SCENARIO > ' + scenario.label);
  await require(config.backstopjsAddons.path + '/loginAndNavigation')(page, scenario, config);
  await require('./customScenarioActions')(page, scenario, vp);
  await require(config.backstopjsAddons.path + '/setup')(page, scenario, config);
  await require(config.backstopjsAddons.path + '/clickAndHoverHelper')(page, scenario);
};
