import "./main";
import "bootstrap/js/dist/tab";
import "bootstrap/js/dist/modal";
import "bootstrap/js/dist/collapse";
import { ezQuery, ezAlert } from "core/ezq";
import { htmlEntities } from "core/utils";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import $ from "jquery";
import CTFd from "core/CTFd";
import config from "core/config";
import hljs from "highlight.js";

dayjs.extend(relativeTime);

CTFd._internal.challenge = {};
let challenges = [];
let user_solves = [];

const loadChal = id => {
  const chal = $.grep(challenges, chal => chal.id == id)[0];

  if (chal.type === "hidden") {
    ezAlert({
      title: "Challenge Hidden!",
      body: "You haven't unlocked this challenge yet!",
      button: "Got it!"
    });
    return;
  }

  displayChal(chal);
};

const loadChalByName = name => {
  const chal = $.grep(challenges, chal => chal.name == name)[0];

  displayChal(chal);
};

const displayChal = chal => {
  return Promise.all([
    CTFd.api.get_challenge({ challengeId: chal.id }),
    $.getScript(config.urlRoot + chal.script),
    $.get(config.urlRoot + chal.template)
  ]).then(responses => {
    const challenge = CTFd._internal.challenge;

    // $("#challenge-window").empty();

    // Inject challenge data into the plugin
    challenge.data = responses[0].data;

    challenge.preRender();

    $("#challenge-modal").html(responses[0].data.view);

    $("#challenge-modal #challenge-input").addClass("form-control");
    $("#challenge-modal #challenge-submit").addClass(
      "btn btn-md btn-outline-secondary float-right"
    );

    $(".challenge-solves").click(function(e) {
      getSolves($("#challenge-id").val());
    });

    $(".nav-tabs a").click(function(e) {
      e.preventDefault();
      $(this).tab("show");
    });

    $("#challenge-modal > div > div > div > button").click(function() {
      $("#challenge-modal")
        .find("div:first-child")
        .fadeOut(300, function() {
          console.log("faded");
          $(this).empty();
        });
      $("#challenges-pre").removeClass("low-res-hide");
      history.replaceState("", document.title, window.location.pathname);
    });

    $(".load-hint").on("click", function(event) {
      loadHint($(this).data("hint-id"));
    });

    $("#challenge-modal #challenge-submit").click(function(event) {
      event.preventDefault();
      $("#challenge-modal #challenge-submit").addClass("disabled-button");
      $("#challenge-modal #challenge-submit").prop("disabled", true);
      CTFd._internal.challenge
        .submit()
        .then(renderSubmissionResponse)
        .then(loadChals)
        .then(markSolves);
    });

    $("#challenge-modal #challenge-input").keyup(event => {
      if (event.keyCode == 13) {
        $("#challenge-modal #challenge-submit").click();
      }
    });

    $(".input-field").bind({
      focus: function() {
        $(this)
          .parent()
          .addClass("input--filled");
      },
      blur: function() {
        const $this = $(this);
        if ($this.val() === "") {
          $this.parent().removeClass("input--filled");
          const $label = $this.siblings(".input-label");
          $label.removeClass("input--hide");
        }
      }
    });

    challenge.postRender();

    $("#challenge-modal")
      .find("pre code")
      .each(function(_idx) {
        hljs.highlightBlock(this);
      });

    window.location.replace(
      window.location.href.split("#")[0] + "#" + chal.name
    );
  });
};

function renderSubmissionResponse(response) {
  const result = response.data;

  const result_message = $("#result-message");
  const result_notification = $("#result-notification");
  const answer_input = $("#submission-input");
  result_notification.removeClass();
  result_message.text(result.message);

  if (result.status === "authentication_required") {
    window.location =
      CTFd.config.urlRoot +
      "/login?next=" +
      CTFd.config.urlRoot +
      window.location.pathname +
      window.location.hash;
    return;
  } else if (result.status === "incorrect") {
    // Incorrect key
    result_notification.addClass(
      "alert alert-danger alert-dismissable text-center"
    );
    result_notification.slideDown();

    answer_input.removeClass("correct");
    answer_input.addClass("wrong");
    setTimeout(function() {
      answer_input.removeClass("wrong");
    }, 3000);
  } else if (result.status === "correct") {
    // Challenge Solved
    result_notification.addClass(
      "alert alert-success alert-dismissable text-center"
    );
    result_notification.slideDown();

    if (
      $(".challenge-solves")
        .text()
        .trim()
    ) {
      // Only try to increment solves if the text isn't hidden
      $(".challenge-solves").text(
        parseInt(
          $(".challenge-solves")
            .text()
            .split(" ")[0]
        ) +
          1 +
          " Solves"
      );
    }

    answer_input.val("");
    answer_input.removeClass("wrong");
    answer_input.addClass("correct");
  } else if (result.status === "already_solved") {
    // Challenge already solved
    result_notification.addClass(
      "alert alert-info alert-dismissable text-center"
    );
    result_notification.slideDown();

    answer_input.addClass("correct");
  } else if (result.status === "paused") {
    // CTF is paused
    result_notification.addClass(
      "alert alert-warning alert-dismissable text-center"
    );
    result_notification.slideDown();
  } else if (result.status === "ratelimited") {
    // Keys per minute too high
    result_notification.addClass(
      "alert alert-warning alert-dismissable text-center"
    );
    result_notification.slideDown();

    answer_input.addClass("too-fast");
    setTimeout(function() {
      answer_input.removeClass("too-fast");
    }, 3000);
  }
  setTimeout(function() {
    $(".alert").slideUp();
    $("#challenge-modal #challenge-submit").removeClass("disabled-button");
    $("#challenge-modal #challenge-submit").prop("disabled", false);
  }, 3000);
}

function markSolves() {
  challenges.map(challenge => {
    if (challenge.solved_by_me) {
      const btn = $(`a[value=${challenge.id}]`);
      btn.addClass("solved-challenge");
      btn.append("<i class='fas fa-check corner-button-check'></i>");
    }
  });
}

function getSolves(id) {
  return CTFd.api.get_challenge_solves({ challengeId: id }).then(response => {
    const data = response.data;
    $(".challenge-solves").text(parseInt(data.length) + " Solves");
    const box = $("#challenge-solves-names");
    box.empty();
    for (let i = 0; i < data.length; i++) {
      const id = data[i].account_id;
      const name = data[i].name;
      const date = dayjs(data[i].date).fromNow();
      const account_url = data[i].account_url;
      box.append(
        '<tr><td><a href="{0}">{2}</td><td>{3}</td></tr>'.format(
          account_url,
          id,
          htmlEntities(name),
          date
        )
      );
    }
  });
}

function natural_sort(a, b) {
  var ax = [],
    bx = [];

  a.replace(/(\d+)|(\D+)/g, function(_, $1, $2) {
    ax.push([$1 || Infinity, $2 || ""]);
  });
  b.replace(/(\d+)|(\D+)/g, function(_, $1, $2) {
    bx.push([$1 || Infinity, $2 || ""]);
  });

  while (ax.length && bx.length) {
    var an = ax.shift();
    var bn = bx.shift();
    var nn = an[0] - bn[0] || an[1].localeCompare(bn[1]);
    if (nn) return nn;
  }

  return ax.length - bx.length;
}

function generate_tree(challenges) {
  var tree = "";

  var final_count = Object.keys(challenges).length - 1;
  Object.keys(challenges)
    .sort(natural_sort)
    .forEach(function(category, i) {
      var token = "<span class='token text-muted'>├── </span>";
      if (i == final_count) {
        token = "<span class='token text-muted'>└── </span>";
      }
      tree += token + category + "\n";

      var chal_count = challenges[category].length - 1;
      for (var c = 0; c < challenges[category].length; c++) {
        var chal = challenges[category][c];
        var token = "<span class='token text-muted'>│   ├── </span>";

        if (i == final_count) {
          token = "<span class='token text-muted'>    ├── </span>";
        }

        if (c == chal_count) {
          if (i == final_count) {
            var start_char = "<span class='token text-muted'> ";
          } else {
            var start_char = "<span class='token text-muted'>|";
          }
          token = start_char + "   └── </span>";
        }

        tree += '{1}<a class="challenge-button cursor-pointer" challenge-id="{0}" value="{0}">{2} ({3})</a>\n'.format(
          chal.id,
          token,
          chal.name,
          chal.value
        );
      }
    });

  return tree;
}

function loadChals() {
  return CTFd.api.get_challenge_list().then(function(response) {
    var categories = {};
    challenges = response.data;

    for (let i = 0; i < challenges.length; i++) {
      let chal = challenges[i];
      if (categories[chal.category] === undefined) {
        categories[chal.category] = [chal];
      } else {
        categories[chal.category].push(chal);
      }
    }

    for (let key in categories) {
      categories[key].sort(function(a, b) {
        if (a.value < b.value) return -1;
        if (a.value > b.value) return 1;
        if (a.value == b.value) {
          return natural_sort(a.name, b.name);
        }
        return 0;
      });
    }

    let tree = generate_tree(categories);

    $("#challenges-spinner").remove();

    $("#challenges-sidebar").html(
      "<pre class='challenges-pre'>" + tree + "</pre>"
    );

    markSolves();

    $(".challenge-button").click(function(e) {
      $("#challenges-sidebar").addClass("low-res-hide");
      loadChal($(this).attr("challenge-id"));
    });
  });
}

function update() {
  return loadChals().then(markSolves);
}

$(() => {
  update().then(() => {
    if (window.location.hash.length > 0) {
      loadChalByName(decodeURIComponent(window.location.hash.substring(1)));
    }
  });

  $("#submission-input").keyup(function(event) {
    if (event.keyCode == 13) {
      $("#submit-key").click();
    }
  });

  $(".nav-tabs a").click(function(event) {
    event.preventDefault();
    $(this).tab("show");
  });

  $("#challenge-window").on("hidden.bs.modal", function(event) {
    $(".nav-tabs a:first").tab("show");
    history.replaceState("", window.document.title, window.location.pathname);
  });

  $(".challenge-solves").click(function(event) {
    getSolves($("#challenge-id").val());
  });

  $("#challenge-window").on("hide.bs.modal", function(event) {
    $("#submission-input").removeClass("wrong");
    $("#submission-input").removeClass("correct");
    $("#incorrect-key").slideUp();
    $("#correct-key").slideUp();
    $("#already-solved").slideUp();
    $("#too-fast").slideUp();
  });
});
setInterval(update, 300000); // Update every 5 minutes.

const displayHint = data => {
  ezAlert({
    title: "Hint",
    body: data.html,
    button: "Got it!"
  });
};

const displayUnlock = id => {
  ezQuery({
    title: "Unlock Hint?",
    body: "Are you sure you want to open this hint?",
    success: () => {
      const params = {
        target: id,
        type: "hints"
      };
      CTFd.api.post_unlock_list({}, params).then(response => {
        if (response.success) {
          CTFd.api.get_hint({ hintId: id }).then(response => {
            displayHint(response.data);
          });

          return;
        }

        ezAlert({
          title: "Error",
          body: response.errors.score,
          button: "Got it!"
        });
      });
    }
  });
};

const loadHint = id => {
  CTFd.api.get_hint({ hintId: id }).then(response => {
    if (response.data.content) {
      displayHint(response.data);
      return;
    }

    displayUnlock(id);
  });
};
