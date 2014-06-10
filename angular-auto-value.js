(function (ng) {
  function AutoInputValueCtrl($scope, $attrs, $parse) {
    this.$scope = $scope;
    this.$attrs = $attrs;
    if ($attrs.ngModel && $attrs.value) {
      this.val = $attrs.value;
      this.getter = $parse($attrs.ngModel);
      this.setter = this.getter.assign;
      this.update();
    }
  }

  AutoInputValueCtrl.prototype.set = function (value) {
    this.setter(this.$scope, value);
  };
  
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
      case "number":
      case "range":
        this.updateNumber();
        break;
      case "radio":
        this.updateRadio();
        break;
      case "date":
      case "datetime":
      case "datetime-local":
      case "month":
        this.updateDate();
        break;
      case "time":
        this.updateTime();
        break;
      case "week":
        this.updateWeek();
        break;
      default:
        this.updateText();
    }
  };
  
  AutoInputValueCtrl.prototype.updateText = function () {
    this.set(this.val);
  };
  
  AutoInputValueCtrl.prototype.updateRadio = function () {
    if (this.$attrs.selected) {
      this.set(this.val);
    }
  };
  
  AutoInputValueCtrl.prototype.updateCheckbox = function () {
    this.set(this.$attrs.selected);
  };
  
  AutoInputValueCtrl.prototype.updateNumber = function () {
    this.set(parseInt(this.val));
  };

  AutoInputValueCtrl.prototype.updateDate = function () {
    this.set(new Date(this.val));
  };

  AutoInputValueCtrl.prototype.updateTime = function () {
    var date = new Date(),
        time = this.val.split(':');
    date.setHours.apply(date, time);
    this.set(date);
  };

  /**
   * @todo
   */
  AutoInputValueCtrl.prototype.updateWeek = function () {
    // var val = this.val.split('-W'),
    //     year = val[0],
    //     week = val[1],
    //     DAYS_IN_A_WEEK = 7,
    //     day = week * DAYS_IN_A_WEEK;
    //     date;
    // if (!week) {
    //   throw new Error("Incorrect week format '" + val + "'");
    // }
  };

  function autoInputValueDirective() {
    return {
      restrict: "E",
      controller: ["$scope", "$attrs", "$parse", AutoInputValueCtrl]
    };
  }

  function textareaCtrlFactory($scope, $element, $attrs, $parse) {
    if (!$attrs.ngModel) {
      var val = $element.text(),
          getter = $parse($attrs.ngModel),
          setter = getter.assign;
      return setter($scope, val);
    }
  }
  
  function autoTextareaValueDirective() {
    return {
      restrict: "E",
      controller: ["$scope", "$element", "$attrs", "$parse", textareaCtrlFactory]
    };
  }
  
  ng
    .module('auto-value', [])
    .directive('input', autoInputValueDirective)
    .directive('textarea', autoTextareaValueDirective);
}(angular));

