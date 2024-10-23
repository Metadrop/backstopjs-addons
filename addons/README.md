# BackstopJS Addons
A library that extends and improves the default options provided by [BackstopJS](https://github.com/garris/BackstopJS).

## Options and features

### Scenario setup
By default, the library applies the following optimisations to the scenarios to avoid common loading issues:
  - Avoid lazy CSS loading
  - Remove lazy loading and force eager on all images and iframes
  - Avoid asynchronous image decoding
  - Force Drupal.blazy to load all images
  - Pause the Slick slider autoplay
  - Wait for fonts to load
  - Wait for the page to load completely
  - Allow setting the `cookiePath` for the cookies.json globally to apply to all scenarios. If set in the scenario configuration, it will override the global configuration.

### Stop animations
Allow stopping the CSS animations on the provided CSS selectors, can be set on each scenario using the `stopAnimationsSelectors` property.

```json
  "scenarios": [
    {
      "label": "Stop animations example",
      "stopAnimationsSelectors": ".selector, .selector-2"
```

### Disable filters
CSS filters can be disabled on the provided CSS selectors, can be set on each scenario using the `disableFiltersSelectors` property.

```json
  "scenarios": [
    {
      "label": "Disable filters example",
      "disableFiltersSelectors": ".selector, .selector-2"
```

### Log in and navigate to a specific page
Allow users to log in and navigate to a specific page before taking a screenshot. To use this feature you need to set at least the following options
  - `loginWrapperSelector` - The selector of the element that wraps the login form.
  - `loginUser` - The username to login with
  - `loginPass` - The password to login with

Optionally, `loginRedirectTo` can be set to navigate to a specific page after login.

```json
  "scenarios": [
    {
      "label": "Login and navigate to a specific page",
      "loginWrapperSelector": ".login-form",
      "loginUser": "user",
      "loginPass": "pass",
      "loginRedirectTo": "/admin"
    }
```

`loginUser` and `loginPass` can be set globally in the 'backstopjsAddons' settings or in the scenario configuration. If you set the login in the global configuration, you can override it in the scenario configuration.

```json
    "backstopjsAddons": {
      "loginUser": "global username",
      "loginPass": "global pass"
  }
```

The `removeSelectors` option is applied after login and navigation.

### Wait for selector after interaction
This option allows you to wait for a selector to appear after an interaction. This feature is configured within a scenario using the `waitForSelectorAfterInteraction' property, which takes a CSS selector.

```json
  "scenarios": [
    {
      "label": "Click an wait for selector example",
      "waitForSelectorAfterInteraction": ".selector"
```

### Custom user agent by viewport
Allow a user agent to be set on the viewport.

```json
  "viewports": [
    {
      "label": "phone",
      "width": 375,
      "height": 667
      "userAgent": "Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.0 Mobile/14E304 Safari/602.1"
    },
```

### Hide iframe content
This option replaces the specified iframe(s) with a grey background, maintaining the size of the iframe. This feature is configured within a scenario using the `hideIframeContent' property, which takes a comma-separated list of CSS selectors.

```json
  "scenarios": [
    {
      "label": "Hide iframe content example",
      "hideIframeContent": ".iframe-container-selector, .iframe-container-selector-2"
```
