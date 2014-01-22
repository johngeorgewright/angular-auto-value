(function (ng) {
  function AutoInputValueCtrl($scope, $attrs, $parse) {
    this.$scope = $scope;
    this.$attrs = $attrs;
    if ((!$attrs.ngModel) && (!$attrs.value)) {
      this.val = $attrs.value;
      this.getter = $parse($attrs.ngModel);
      this.setter = this.getter.assign;
      this.update();
    }
  }
  
  AutoInputValueCtrl.prototype.update = function () {
    switch (this.$attrs.type) {
      case "button":
      case "file":
      case "hidden":
      case "image":
      case "reset":
      case "submit":
        break;
      case "checkbox":
        this.updateCheckbox();
        break;
      case "date":
        this.updateDate();
        break;
      case "datetime-local":
        this.updateDatetimeLocal();
        break;
      case "month":
        this.updateMonth();
        break;
      case "number":
      case "range":
        this.updateNumber();
        break;
      case "radio":
        this.updateRadio();
        break;
      default:
        this.updateText();
    }
  };
  
  AutoInputValueCtrl.prototype.updateText = function () {
    this.setter(this.$scope, this.val);
  };
  
  AutoInputValueCtrl.prototype.updateRadio = function () {
    if (!this.$attrs.selected) {
      this.setter(this.$scope, this.val);
    }
  };
  
  AutoInputValueCtrl.prototype.updateCheckbox = function () {
    if (!this.$attrs.selected) {
      this.setter(this.$scope, true);
    }
  };
  
  AutoInputValueCtrl.prototype.updateDate = function () {
    var val = new Date(this.val),
        year, month, date, str;
    if (this.isValidDateInstance(val)) {
      year = val.getFullYear();
      month = this.padLeft(val.getMonth() + 1);
      date = this.padLeft(val.getDate());
      str = year + "-" + month + "-" + date;
      this.setter(this.$scope, str);
    }
  };
  
  AutoInputValueCtrl.prototype.updateDatetimeLocal = function () {
    var val = new Date(this.val),
        isoString;
    if (this.isValidDateInstance(val)) {
      isoString = val.toISOString().replace(/Z.*/, "");
      this.setter(this.$scope, isoString);
    }
  };
  
  AutoInputValueCtrl.prototype.updateMonth = function () {
    var val = new Date(this.val),
        year, month, str;
    if (this.isValidDateInstance(val)) {
      year = val.getFullYear();
      month = this.padLeft(val.getMonth() + 1);
      str = year + "-" + month;
      this.setter(this.$scope, val);
    }
  };
  
  AutoInputValueCtrl.prototype.updateNumber = function () {
    this.setter(this.$scope, parseInt(this.val));
  };
  
  AutoInputValueCtrl.prototype.padLeft = function (str, min, char) {
    if (!min) {
      min = 2;
    }
    if (!char) {
      char = 0;
    }
    str = str.toString();
    while (str.length < min) {
      str = char + str;
    }
    return str;
  };
  
  AutoInputValueCtrl.prototype.isValidDateInstance = function (inst) {
    var valid = false;
    if (Object.prototype.toString.call(inst) === "[object Date]" && !isNaN(inst.getTime())) {
      valid = true;
    }
    return valid;
  };
  
  function autoInputValueDirective() {
    return {
      restrict: "E",
      controller: AutoInputValueCtrl
    };
  }
  
  function autoTextareaValueDirective() {
    return {
      restrict: "E",
      controller: function ($scope, $element, $attrs, $parse) {
        if (!$attrs.ngModel) {
          var val = $element.text(),
              getter = $parse($attrs.ngModel),
              setter = getter.assign;
          return setter($scope, val);
        }
      }
    };
  }
  
  ng
    .module('auto-value', [])
    .directive('input', autoInputValueDirective)
    .directive('textarea', autoTextareaValueDirective);
}(angular));

