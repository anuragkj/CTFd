/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"pages/challenges": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/static/js";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./assets/js/pages/challenges.js","helpers","vendor","default~pages/challenges~pages/main~pages/notifications~pages/scoreboard~pages/settings~pages/setup~~6822bf1f"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./assets/js/pages/challenges.js":
/*!***************************************!*\
  !*** ./assets/js/pages/challenges.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

;
eval("\n\n__webpack_require__(/*! ./main */ \"./assets/js/pages/main.js\");\n\n__webpack_require__(/*! bootstrap/js/dist/tab */ \"./node_modules/bootstrap/js/dist/tab.js\");\n\n__webpack_require__(/*! bootstrap/js/dist/modal */ \"./node_modules/bootstrap/js/dist/modal.js\");\n\n__webpack_require__(/*! bootstrap/js/dist/collapse */ \"./node_modules/bootstrap/js/dist/collapse.js\");\n\nvar _ezq = __webpack_require__(/*! core/ezq */ \"../CTFd/CTFd/themes/core/assets/js/ezq.js\");\n\nvar _utils = __webpack_require__(/*! core/utils */ \"../CTFd/CTFd/themes/core/assets/js/utils.js\");\n\nvar _dayjs = _interopRequireDefault(__webpack_require__(/*! dayjs */ \"./node_modules/dayjs/dayjs.min.js\"));\n\nvar _relativeTime = _interopRequireDefault(__webpack_require__(/*! dayjs/plugin/relativeTime */ \"./node_modules/dayjs/plugin/relativeTime.js\"));\n\nvar _jquery = _interopRequireDefault(__webpack_require__(/*! jquery */ \"./node_modules/jquery/dist/jquery.js\"));\n\nvar _CTFd = _interopRequireDefault(__webpack_require__(/*! core/CTFd */ \"../CTFd/CTFd/themes/core/assets/js/CTFd.js\"));\n\nvar _config = _interopRequireDefault(__webpack_require__(/*! core/config */ \"../CTFd/CTFd/themes/core/assets/js/config.js\"));\n\nvar _highlight = _interopRequireDefault(__webpack_require__(/*! highlight.js */ \"./node_modules/highlight.js/lib/index.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { \"default\": obj }; }\n\n_dayjs[\"default\"].extend(_relativeTime[\"default\"]);\n\nvar api_func = {\n  teams: function teams(x) {\n    return _CTFd[\"default\"].api.get_team_solves({\n      teamId: x\n    });\n  },\n  users: function users(x) {\n    return _CTFd[\"default\"].api.get_user_solves({\n      userId: x\n    });\n  }\n};\n_CTFd[\"default\"]._internal.challenge = {};\nvar challenges = [];\nvar user_solves = [];\n\nvar loadChal = function loadChal(id) {\n  var chal = _jquery[\"default\"].grep(challenges, function (chal) {\n    return chal.id == id;\n  })[0];\n\n  if (chal.type === \"hidden\") {\n    (0, _ezq.ezAlert)({\n      title: \"Challenge Hidden!\",\n      body: \"You haven't unlocked this challenge yet!\",\n      button: \"Got it!\"\n    });\n    return;\n  }\n\n  displayChal(chal);\n};\n\nvar loadChalByName = function loadChalByName(name) {\n  var chal = _jquery[\"default\"].grep(challenges, function (chal) {\n    return chal.name == name;\n  })[0];\n\n  displayChal(chal);\n};\n\nvar displayChal = function displayChal(chal) {\n  return Promise.all([_CTFd[\"default\"].api.get_challenge({\n    challengeId: chal.id\n  }), _jquery[\"default\"].getScript(_config[\"default\"].urlRoot + chal.script), _jquery[\"default\"].get(_config[\"default\"].urlRoot + chal.template)]).then(function (responses) {\n    var challenge = _CTFd[\"default\"]._internal.challenge; // $(\"#challenge-window\").empty();\n    // Inject challenge data into the plugin\n\n    challenge.data = responses[0].data;\n    challenge.preRender();\n    (0, _jquery[\"default\"])(\"#challenge-modal\").html(responses[0].data.view);\n    (0, _jquery[\"default\"])(\"#challenge-modal #challenge-input\").addClass(\"form-control\");\n    (0, _jquery[\"default\"])(\"#challenge-modal #challenge-submit\").addClass(\"btn btn-md btn-outline-secondary float-right\");\n    (0, _jquery[\"default\"])(\".challenge-solves\").click(function (e) {\n      getSolves((0, _jquery[\"default\"])(\"#challenge-id\").val());\n    });\n    (0, _jquery[\"default\"])(\".nav-tabs a\").click(function (e) {\n      e.preventDefault();\n      (0, _jquery[\"default\"])(this).tab(\"show\");\n    });\n    (0, _jquery[\"default\"])(\"#challenge-modal > div > div > div > button\").click(function () {\n      (0, _jquery[\"default\"])(\"#challenge-modal\").find(\"div:first-child\").fadeOut(300, function () {\n        console.log(\"faded\");\n        (0, _jquery[\"default\"])(this).empty();\n      });\n      (0, _jquery[\"default\"])(\"#challenges-pre\").removeClass(\"low-res-hide\");\n      history.replaceState(\"\", document.title, window.location.pathname);\n    });\n    (0, _jquery[\"default\"])(\".load-hint\").on(\"click\", function (event) {\n      loadHint((0, _jquery[\"default\"])(this).data(\"hint-id\"));\n    });\n    (0, _jquery[\"default\"])(\"#challenge-modal #challenge-submit\").click(function (event) {\n      event.preventDefault();\n      (0, _jquery[\"default\"])(\"#challenge-modal #challenge-submit\").addClass(\"disabled-button\");\n      (0, _jquery[\"default\"])(\"#challenge-modal #challenge-submit\").prop(\"disabled\", true);\n\n      _CTFd[\"default\"]._internal.challenge.submit().then(renderSubmissionResponse).then(loadChals).then(markSolves);\n    });\n    (0, _jquery[\"default\"])(\"#challenge-modal #challenge-input\").keyup(function (event) {\n      if (event.keyCode == 13) {\n        (0, _jquery[\"default\"])(\"#challenge-modal #challenge-submit\").click();\n      }\n    });\n    (0, _jquery[\"default\"])(\".input-field\").bind({\n      focus: function focus() {\n        (0, _jquery[\"default\"])(this).parent().addClass(\"input--filled\");\n      },\n      blur: function blur() {\n        var $this = (0, _jquery[\"default\"])(this);\n\n        if ($this.val() === \"\") {\n          $this.parent().removeClass(\"input--filled\");\n          var $label = $this.siblings(\".input-label\");\n          $label.removeClass(\"input--hide\");\n        }\n      }\n    });\n    challenge.postRender();\n    (0, _jquery[\"default\"])(\"#challenge-modal\").find(\"pre code\").each(function (_idx) {\n      _highlight[\"default\"].highlightBlock(this);\n    });\n    window.location.replace(window.location.href.split(\"#\")[0] + \"#\" + chal.name);\n  });\n};\n\nfunction renderSubmissionResponse(response) {\n  var result = response.data;\n  var result_message = (0, _jquery[\"default\"])(\"#result-message\");\n  var result_notification = (0, _jquery[\"default\"])(\"#result-notification\");\n  var answer_input = (0, _jquery[\"default\"])(\"#submission-input\");\n  result_notification.removeClass();\n  result_message.text(result.message);\n\n  if (result.status === \"authentication_required\") {\n    window.location = _CTFd[\"default\"].config.urlRoot + \"/login?next=\" + _CTFd[\"default\"].config.urlRoot + window.location.pathname + window.location.hash;\n    return;\n  } else if (result.status === \"incorrect\") {\n    // Incorrect key\n    result_notification.addClass(\"alert alert-danger alert-dismissable text-center\");\n    result_notification.slideDown();\n    answer_input.removeClass(\"correct\");\n    answer_input.addClass(\"wrong\");\n    setTimeout(function () {\n      answer_input.removeClass(\"wrong\");\n    }, 3000);\n  } else if (result.status === \"correct\") {\n    // Challenge Solved\n    result_notification.addClass(\"alert alert-success alert-dismissable text-center\");\n    result_notification.slideDown();\n\n    if ((0, _jquery[\"default\"])(\".challenge-solves\").text().trim()) {\n      // Only try to increment solves if the text isn't hidden\n      (0, _jquery[\"default\"])(\".challenge-solves\").text(parseInt((0, _jquery[\"default\"])(\".challenge-solves\").text().split(\" \")[0]) + 1 + \" Solves\");\n    }\n\n    answer_input.val(\"\");\n    answer_input.removeClass(\"wrong\");\n    answer_input.addClass(\"correct\");\n  } else if (result.status === \"already_solved\") {\n    // Challenge already solved\n    result_notification.addClass(\"alert alert-info alert-dismissable text-center\");\n    result_notification.slideDown();\n    answer_input.addClass(\"correct\");\n  } else if (result.status === \"paused\") {\n    // CTF is paused\n    result_notification.addClass(\"alert alert-warning alert-dismissable text-center\");\n    result_notification.slideDown();\n  } else if (result.status === \"ratelimited\") {\n    // Keys per minute too high\n    result_notification.addClass(\"alert alert-warning alert-dismissable text-center\");\n    result_notification.slideDown();\n    answer_input.addClass(\"too-fast\");\n    setTimeout(function () {\n      answer_input.removeClass(\"too-fast\");\n    }, 3000);\n  }\n\n  setTimeout(function () {\n    (0, _jquery[\"default\"])(\".alert\").slideUp();\n    (0, _jquery[\"default\"])(\"#challenge-modal #challenge-submit\").removeClass(\"disabled-button\");\n    (0, _jquery[\"default\"])(\"#challenge-modal #challenge-submit\").prop(\"disabled\", false);\n  }, 3000);\n}\n\nfunction markSolves() {\n  return api_func[_CTFd[\"default\"].config.userMode](\"me\").then(function (response) {\n    var solves = response.data;\n\n    for (var i = solves.length - 1; i >= 0; i--) {\n      var btn = (0, _jquery[\"default\"])(\"a[value=\".concat(solves[i].challenge_id, \"]\"));\n\n      if (!btn.hasClass(\"solved-challenge\")) {\n        btn.addClass(\"solved-challenge\");\n        btn.append(\"<i class='fas fa-check corner-button-check'></i>\");\n      }\n    }\n  });\n}\n\nfunction loadUserSolves() {\n  if (_CTFd[\"default\"].user.id == 0) {\n    return Promise.resolve();\n  }\n\n  return api_func[_CTFd[\"default\"].config.userMode](\"me\").then(function (response) {\n    var solves = response.data;\n\n    for (var i = solves.length - 1; i >= 0; i--) {\n      var chal_id = solves[i].challenge_id;\n      user_solves.push(chal_id);\n    }\n  });\n}\n\nfunction getSolves(id) {\n  return _CTFd[\"default\"].api.get_challenge_solves({\n    challengeId: id\n  }).then(function (response) {\n    var data = response.data;\n    (0, _jquery[\"default\"])(\".challenge-solves\").text(parseInt(data.length) + \" Solves\");\n    var box = (0, _jquery[\"default\"])(\"#challenge-solves-names\");\n    box.empty();\n\n    for (var i = 0; i < data.length; i++) {\n      var _id = data[i].account_id;\n      var name = data[i].name;\n      var date = (0, _dayjs[\"default\"])(data[i].date).fromNow();\n      var account_url = data[i].account_url;\n      box.append('<tr><td><a href=\"{0}\">{2}</td><td>{3}</td></tr>'.format(account_url, _id, (0, _utils.htmlEntities)(name), date));\n    }\n  });\n}\n\nfunction natural_sort(a, b) {\n  var ax = [],\n      bx = [];\n  a.replace(/(\\d+)|(\\D+)/g, function (_, $1, $2) {\n    ax.push([$1 || Infinity, $2 || \"\"]);\n  });\n  b.replace(/(\\d+)|(\\D+)/g, function (_, $1, $2) {\n    bx.push([$1 || Infinity, $2 || \"\"]);\n  });\n\n  while (ax.length && bx.length) {\n    var an = ax.shift();\n    var bn = bx.shift();\n    var nn = an[0] - bn[0] || an[1].localeCompare(bn[1]);\n    if (nn) return nn;\n  }\n\n  return ax.length - bx.length;\n}\n\nfunction generate_tree(challenges) {\n  var tree = \"\";\n  var final_count = Object.keys(challenges).length - 1;\n  Object.keys(challenges).sort(natural_sort).forEach(function (category, i) {\n    var token = \"<span class='token text-muted'>├── </span>\";\n\n    if (i == final_count) {\n      token = \"<span class='token text-muted'>└── </span>\";\n    }\n\n    tree += token + category + \"\\n\";\n    var chal_count = challenges[category].length - 1;\n\n    for (var c = 0; c < challenges[category].length; c++) {\n      var chal = challenges[category][c];\n      var token = \"<span class='token text-muted'>│   ├── </span>\";\n\n      if (i == final_count) {\n        token = \"<span class='token text-muted'>    ├── </span>\";\n      }\n\n      if (c == chal_count) {\n        if (i == final_count) {\n          var start_char = \"<span class='token text-muted'> \";\n        } else {\n          var start_char = \"<span class='token text-muted'>|\";\n        }\n\n        token = start_char + \"   └── </span>\";\n      }\n\n      tree += '{1}<a class=\"challenge-button cursor-pointer\" challenge-id=\"{0}\" value=\"{0}\">{2} ({3})</a>\\n'.format(chal.id, token, chal.name, chal.value);\n    }\n  });\n  return tree;\n}\n\nfunction loadChals() {\n  return _CTFd[\"default\"].api.get_challenge_list().then(function (response) {\n    var categories = {};\n    challenges = response.data;\n\n    for (var i = 0; i < challenges.length; i++) {\n      var chal = challenges[i];\n\n      if (categories[chal.category] === undefined) {\n        categories[chal.category] = [chal];\n      } else {\n        categories[chal.category].push(chal);\n      }\n    }\n\n    for (var key in categories) {\n      categories[key].sort(function (a, b) {\n        if (a.value < b.value) return -1;\n        if (a.value > b.value) return 1;\n\n        if (a.value == b.value) {\n          return natural_sort(a.name, b.name);\n        }\n\n        return 0;\n      });\n    }\n\n    var tree = generate_tree(categories);\n    (0, _jquery[\"default\"])(\"#challenges-spinner\").remove();\n    (0, _jquery[\"default\"])(\"#challenges-sidebar\").html(\"<pre class='challenges-pre'>\" + tree + \"</pre>\");\n    markSolves();\n    (0, _jquery[\"default\"])(\".challenge-button\").click(function (e) {\n      (0, _jquery[\"default\"])(\"#challenges-sidebar\").addClass(\"low-res-hide\");\n      loadChal((0, _jquery[\"default\"])(this).attr(\"challenge-id\"));\n    });\n  });\n}\n\nfunction update() {\n  return loadUserSolves() // Load the user's solved challenge ids\n  .then(loadChals) //  Load the full list of challenges\n  .then(markSolves);\n}\n\n(0, _jquery[\"default\"])(function () {\n  update().then(function () {\n    if (window.location.hash.length > 0) {\n      loadChalByName(decodeURIComponent(window.location.hash.substring(1)));\n    }\n  });\n  (0, _jquery[\"default\"])(\"#submission-input\").keyup(function (event) {\n    if (event.keyCode == 13) {\n      (0, _jquery[\"default\"])(\"#submit-key\").click();\n    }\n  });\n  (0, _jquery[\"default\"])(\".nav-tabs a\").click(function (event) {\n    event.preventDefault();\n    (0, _jquery[\"default\"])(this).tab(\"show\");\n  });\n  (0, _jquery[\"default\"])(\"#challenge-window\").on(\"hidden.bs.modal\", function (event) {\n    (0, _jquery[\"default\"])(\".nav-tabs a:first\").tab(\"show\");\n    history.replaceState(\"\", window.document.title, window.location.pathname);\n  });\n  (0, _jquery[\"default\"])(\".challenge-solves\").click(function (event) {\n    getSolves((0, _jquery[\"default\"])(\"#challenge-id\").val());\n  });\n  (0, _jquery[\"default\"])(\"#challenge-window\").on(\"hide.bs.modal\", function (event) {\n    (0, _jquery[\"default\"])(\"#submission-input\").removeClass(\"wrong\");\n    (0, _jquery[\"default\"])(\"#submission-input\").removeClass(\"correct\");\n    (0, _jquery[\"default\"])(\"#incorrect-key\").slideUp();\n    (0, _jquery[\"default\"])(\"#correct-key\").slideUp();\n    (0, _jquery[\"default\"])(\"#already-solved\").slideUp();\n    (0, _jquery[\"default\"])(\"#too-fast\").slideUp();\n  });\n});\nsetInterval(update, 300000); // Update every 5 minutes.\n\nvar displayHint = function displayHint(data) {\n  (0, _ezq.ezAlert)({\n    title: \"Hint\",\n    body: data.html,\n    button: \"Got it!\"\n  });\n};\n\nvar displayUnlock = function displayUnlock(id) {\n  (0, _ezq.ezQuery)({\n    title: \"Unlock Hint?\",\n    body: \"Are you sure you want to open this hint?\",\n    success: function success() {\n      var params = {\n        target: id,\n        type: \"hints\"\n      };\n\n      _CTFd[\"default\"].api.post_unlock_list({}, params).then(function (response) {\n        if (response.success) {\n          _CTFd[\"default\"].api.get_hint({\n            hintId: id\n          }).then(function (response) {\n            displayHint(response.data);\n          });\n\n          return;\n        }\n\n        (0, _ezq.ezAlert)({\n          title: \"Error\",\n          body: response.errors.score,\n          button: \"Got it!\"\n        });\n      });\n    }\n  });\n};\n\nvar loadHint = function loadHint(id) {\n  _CTFd[\"default\"].api.get_hint({\n    hintId: id\n  }).then(function (response) {\n    if (response.data.content) {\n      displayHint(response.data);\n      return;\n    }\n\n    displayUnlock(id);\n  });\n};\n\n//# sourceURL=webpack:///./assets/js/pages/challenges.js?");

/***/ }),

/***/ "./assets/js/pages/main.js":
/*!*********************************!*\
  !*** ./assets/js/pages/main.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

;
eval("\n\nvar _CTFd = _interopRequireDefault(__webpack_require__(/*! core/CTFd */ \"../CTFd/CTFd/themes/core/assets/js/CTFd.js\"));\n\nvar _jquery = _interopRequireDefault(__webpack_require__(/*! jquery */ \"./node_modules/jquery/dist/jquery.js\"));\n\nvar _dayjs = _interopRequireDefault(__webpack_require__(/*! dayjs */ \"./node_modules/dayjs/dayjs.min.js\"));\n\nvar _advancedFormat = _interopRequireDefault(__webpack_require__(/*! dayjs/plugin/advancedFormat */ \"./node_modules/dayjs/plugin/advancedFormat.js\"));\n\nvar _nunjucks = _interopRequireDefault(__webpack_require__(/*! nunjucks */ \"./node_modules/nunjucks/browser/nunjucks.js\"));\n\nvar _howler = __webpack_require__(/*! howler */ \"./node_modules/howler/dist/howler.js\");\n\nvar _events = _interopRequireDefault(__webpack_require__(/*! core/events */ \"../CTFd/CTFd/themes/core/assets/js/events.js\"));\n\nvar _config = _interopRequireDefault(__webpack_require__(/*! core/config */ \"../CTFd/CTFd/themes/core/assets/js/config.js\"));\n\nvar _styles = _interopRequireDefault(__webpack_require__(/*! core/styles */ \"../CTFd/CTFd/themes/core/assets/js/styles.js\"));\n\nvar _times = _interopRequireDefault(__webpack_require__(/*! core/times */ \"../CTFd/CTFd/themes/core/assets/js/times.js\"));\n\nvar _helpers = _interopRequireDefault(__webpack_require__(/*! core/helpers */ \"../CTFd/CTFd/themes/core/assets/js/helpers.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { \"default\": obj }; }\n\n_dayjs[\"default\"].extend(_advancedFormat[\"default\"]);\n\n_CTFd[\"default\"].init(window.init);\n\nwindow.CTFd = _CTFd[\"default\"];\nwindow.helpers = _helpers[\"default\"];\nwindow.$ = _jquery[\"default\"];\nwindow.dayjs = _dayjs[\"default\"];\nwindow.nunjucks = _nunjucks[\"default\"];\nwindow.Howl = _howler.Howl;\n(0, _jquery[\"default\"])(function () {\n  (0, _styles[\"default\"])();\n  (0, _times[\"default\"])();\n  (0, _events[\"default\"])(_config[\"default\"].urlRoot);\n});\n\n//# sourceURL=webpack:///./assets/js/pages/main.js?");

/***/ })

/******/ });