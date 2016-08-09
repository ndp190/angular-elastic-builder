(function(angular) {"use strict"; angular.module("angular-elastic-builder").run(["$templateCache", function($templateCache) {$templateCache.put("angular-elastic-builder/BuilderDirective.html","<div class=\"elastic-builder\">\n  <div class=\"filter-panels\">\n    <div class=\"list-group form-inline\">\n      <div\n        data-ng-repeat=\"filter in filters\"\n        data-elastic-builder-chooser=\"filter\"\n        data-elastic-fields=\"data.fields\"\n        data-on-remove=\"removeChild($index)\"\n        data-depth=\"0\"></div>\n      <div class=\"list-group-item actions\">\n        <a class=\"btn btn-xs btn-primary\" title=\"Add Rule\" data-ng-click=\"addRule()\">\n          <i class=\"fa fa-plus\"></i>\n        </a>\n        <a class=\"btn btn-xs btn-primary\" title=\"Add Group\" data-ng-click=\"addGroup()\">\n          <i class=\"fa fa-list\"></i>\n        </a>\n      </div>\n    </div>\n  </div>\n</div>\n");
$templateCache.put("angular-elastic-builder/ChooserDirective.html","<div\n  class=\"list-group-item elastic-builder-chooser\"\n  data-ng-class=\"getGroupClassName()\">\n\n  <div data-ng-if=\"item.type === \'group\'\"\n    data-elastic-builder-group=\"item\"\n    data-depth=\"{{ depth }}\"\n    data-elastic-fields=\"elasticFields\"\n    data-on-remove=\"onRemove()\"></div>\n\n  <div data-ng-if=\"item.type !== \'group\'\"\n    data-elastic-builder-rule=\"item\"\n    data-elastic-fields=\"elasticFields\"\n    data-on-remove=\"onRemove()\"></div>\n\n</div>\n");
$templateCache.put("angular-elastic-builder/GroupDirective.html","<div class=\"elastic-builder-group\">\n  <h5>If\n    <select data-ng-model=\"group.subType\" class=\"form-control\">\n      <option value=\"and\">all</option>\n      <option value=\"or\">any</option>\n    </select>\n    of these conditions are met\n  </h5>\n  <div\n    data-ng-repeat=\"rule in group.rules\"\n    data-elastic-builder-chooser=\"rule\"\n    data-elastic-fields=\"elasticFields\"\n    data-depth=\"{{ +depth + 1 }}\"\n    data-on-remove=\"removeChild($index)\"></div>\n\n  <div class=\"list-group-item actions\" data-ng-class=\"getGroupClassName()\">\n    <a class=\"btn btn-xs btn-primary\" title=\"Add Sub-Rule\" data-ng-click=\"addRule()\">\n      <i class=\"fa fa-plus\"></i>\n    </a>\n    <a class=\"btn btn-xs btn-primary\" title=\"Add Sub-Group\" data-ng-click=\"addGroup()\">\n      <i class=\"fa fa-list\"></i>\n    </a>\n  </div>\n\n  <a class=\"btn btn-xs btn-danger remover\" data-ng-click=\"onRemove()\">\n    <i class=\"fa fa-minus\"></i>\n  </a>\n</div>\n");
$templateCache.put("angular-elastic-builder/RuleDirective.html","<div class=\"elastic-builder-rule\">\n  <select class=\"form-control\" data-ng-model=\"rule.field\" data-ng-options=\"key as value.title for (key, value) in elasticFields\" ng-change=\"resetRule(rule)\"></select>\n\n  <span data-elastic-type=\"getType()\" data-rule=\"rule\" data-guide=\"elasticFields[rule.field]\"></span>\n\n  <a class=\"btn btn-xs btn-danger remover\" data-ng-click=\"onRemove()\">\n    <i class=\"fa fa-minus\"></i>\n  </a>\n\n</div>\n");
$templateCache.put("angular-elastic-builder/types/boolean.html","<span class=\"boolean-rule\">\n  Equals\n\n  <!-- This is a weird hack to make sure these are numbers -->\n  <select\n    data-ng-model=\"rule.value\"\n    class=\"form-control\"\n    data-ng-options=\"booleans.indexOf(choice) as choice for choice in booleansOrder\">\n  </select>\n</span>\n");
$templateCache.put("angular-elastic-builder/types/date.html","<span class=\"date-rule form-inline\">\n  <select data-ng-model=\"rule.subType\" class=\"form-control\">\n    <optgroup label=\"Exact\">\n      <option value=\"equals\">Equals</option>\n      <option value=\"notEquals\">Not Equals</option>\n    </optgroup>\n    <optgroup label=\"Unbounded-range\">\n      <option value=\"lt\">&lt;</option>\n      <option value=\"lte\">&le;</option>\n      <option value=\"gt\">&gt;</option>\n      <option value=\"gte\">&ge;</option>\n    </optgroup>\n    <optgroup label=\"Bounded-range\">\n      <option value=\"last\">In the last</option>\n      <option value=\"next\">In the next</option>\n    </optgroup>\n    <optgroup label=\"Generic\">\n      <option value=\"exists\">Exists</option>\n      <option value=\"notExists\">Not Exists</option>\n    </optgroup>\n  </select>\n\n  <div class=\"form-group\" data-ng-if=\"inputNeeded()\">\n    <div class=\"input-group\">\n      <input type=\"text\" class=\"form-control\" data-ng-model=\"rule.date\" data-date-time-input=\"YYYY-MM-DDTHH:mm:ssZ\" size=25>\n      <div class=\"input-group-btn\">\n        <button type=\"button\" class=\"btn btn-default dropdown-toggle\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">\n          <span><i class=\"fa fa-calendar\"></i></span>\n        </button>\n        <ul class=\"dropdown-menu dropdown-menu-right\" role=\"menu\" aria-labelledby=\"dLabel\">\n          <datetimepicker data-ng-model=\"rule.date\" data-datetimepicker-config=\"{ dropdownSelector: \'.dropdown-toggle\' }\"/>\n        </ul>\n      </div>\n    </div>\n  </div>\n\n  <span data-ng-if=\"numberNeeded()\">\n    <input type=\"number\" class=\"form-control\" data-ng-model=\"rule.value\" min=0> days\n  </span>\n\n</span>\n");
$templateCache.put("angular-elastic-builder/types/match.html","<span class=\"elastic-term\">\n  <select data-ng-model=\"rule.subType\" class=\"form-control\">\n    <!-- Term Options -->\n    <option value=\"matchAll\">Match All</option>\n    <option value=\"matchAny\">Match Any</option>\n    <option value=\"matchPhrase\">Match Phrase</option>\n\n  </select>\n  <input\n    class=\"form-control\"\n    data-ng-model=\"rule.value\"\n    type=\"text\">\n</span>\n");
$templateCache.put("angular-elastic-builder/types/multi.html","<span class=\"multi-rule\">\n  <span data-ng-repeat=\"choice in guide.choices\">\n    <label class=\"checkbox\">\n      <input type=\"checkbox\" data-ng-model=\"rule.values[choice]\">\n      {{ choice }}\n    </label>\n  </span>\n</span>\n");
$templateCache.put("angular-elastic-builder/types/number.html","<span class=\"number-rule\">\n  <select data-ng-model=\"rule.subType\" class=\"form-control\">\n    <optgroup label=\"Exact\">\n      <option value=\"equals\">Equals</option>\n      <option value=\"notEquals\">Not Equals</option>\n    </optgroup>\n    <optgroup label=\"Range\">\n      <option value=\"gt\">&gt;</option>\n      <option value=\"gte\">&ge;</option>\n      <option value=\"lt\">&lt;</option>\n      <option value=\"lte\">&le;</option>\n    </optgroup>\n\n    <optgroup label=\"Generic\">\n      <option value=\"exists\">Exists</option>\n      <option value=\"notExists\">Not Exists</option>\n    </optgroup>\n  </select>\n\n  <!-- Range Fields -->\n  <input data-ng-if=\"inputNeeded()\"\n    class=\"form-control\"\n    data-ng-model=\"rule.value\"\n    type=\"number\"\n    min=\"{{ guide.minimum }}\"\n    max=\"{{ guide.maximum }}\">\n</span>\n");
$templateCache.put("angular-elastic-builder/types/select.html","<span class=\"select-rule\">\n  Equals\n\n  <select\n    data-ng-model=\"rule.value\"\n    class=\"form-control\"\n    data-ng-options=\"choice for choice in guide.choices\">\n  </select>\n</span>\n");
$templateCache.put("angular-elastic-builder/types/term.html","<span class=\"elastic-term\">\n  <select data-ng-model=\"rule.subType\" class=\"form-control\">\n    <!-- Term Options -->\n    <optgroup label=\"Exact\">\n      <option value=\"equals\">Equals</option>\n      <option value=\"notEquals\">Not Equals</option>\n    </optgroup>\n\n    <!-- Generic Options -->\n    <optgroup label=\"Generic\">\n      <option value=\"exists\">Exists</option>\n      <option value=\"notExists\">Not Exists</option>\n    </optgroup>\n\n  </select>\n  <input\n    data-ng-if=\"inputNeeded()\"\n    class=\"form-control\"\n    data-ng-model=\"rule.value\"\n    type=\"text\">\n</span>\n");}]);})(window.angular);