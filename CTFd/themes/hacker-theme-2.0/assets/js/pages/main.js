import CTFd from "core/CTFd";
import $ from "jquery";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import nunjucks from "nunjucks";
import { Howl } from "howler";
import events from "core/events";
import config from "core/config";
import styles from "core/styles";
import times from "core/times";
import { default as helpers } from "core/helpers";

dayjs.extend(advancedFormat);

CTFd.init(window.init);
window.CTFd = CTFd;
window.helpers = helpers;
window.$ = $;
window.dayjs = dayjs;
window.nunjucks = nunjucks;
window.Howl = Howl;

$(() => {
  styles();
  times();
  events(config.urlRoot);
});
