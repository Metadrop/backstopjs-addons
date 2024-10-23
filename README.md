# BackstopJS Addons
A library that extends and improves the default options provided by [BackstopJS](https://github.com/garris/BackstopJS).

### Composer

``composer require --dev metadrop/backstopjs-addons``

You can override the default destination of the library ("tests/backstopjs/common/libraries/backstopjs-addons") by adding the following parameter to the extra section 
of your project's composer.json file:

```json
"extra": {
        "backstopjs-addons": {
          "path": "custom/destination"  
        }
``` 
    