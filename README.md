Angular Auto Value
==================

An extension to angular to automatically update models via the `value` attribute.

Example
-------

```html
<body ng-app>
  <div ng-controller="MyCtrl">
    <input type="text" ng-model="text" value="Here's my text"/>
  </div>
</body>
```

Before installing this module, the above will produce an empty input field.

Usually you'd have to set the default value in the controller:

```js
function MyCtrl($scope) {
  $scope.text = "Here's my text";
}
```

... or use the `ng-init` attribute:

```html
<body ng-app>
  <div ng-controller="MyCtrl" ng-init="text = 'Here\'s my text';">
    <input type="text" ng-model="text" value="Here's my text"/>
  </div>
</body>
```

Using this module does away with that. If a model is created on an input or textarea element, with a value set, the model will automatically be updated.

```js
angular.module('myMod', ['auto-value']);
```

```html
<body ng-app="myMod">
  <input type="text" ng-model="text" value="Here's my text"/>
  <textarea ng-model="textarea">Here's a large blob of text</textarea>
</body>
```

This will also work for radios, checkboxes and all other input types.

