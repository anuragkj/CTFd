# 2.1.2 / 2021-08-12

- Update with template changes from CTFd v3.4.0

# 2.1.1 / 2021-03-26

- Update with minor features from CTFd v3.3.0

# 2.1.0 / 2021-01-06

- Add slash prefixes to more headers in the theme
- Move challenge submission response notification around to better display on smaller devices

- Add Team Invite icon and Disband Team icon to `teams/private.html`
- Add teams/invite.html file to handle team joining with invites
- Added syntax highlighting to challenge descriptions, pages, hints, notifications, comments, and markdown editors
  - This is done with `highlight.js` which has been added to `package.json`
- Fix notifications to properly fix/support Markdown and HTML notifications
- Removed MomentJS (see https://momentjs.com/docs/#/-project-status/) in favor of dayjs
  - dayjs is mostly API compatible with MomentJS. The only major changes were:
    - dayjs always uses browser local time so you don't need to call `.local()`
    - dayjs segments out some MomentJS functionality into plugins which need to be imported in before using those features
- Fixed issue in `challenge.html` where the current attempt count would have a typo
- Fixed issue in `challenge.html` where the max attempts for a challenge would not show if it was set to 1
- Edit donut charts to have easier to read legends and labels
- Make data zoom bars thinner and more transparent
- Add logo, banner, and favicon settings to `setup.html`

# 2.0.3 / 2020-09-21

- Update dependencies that were updated in CTFd v3.1.1
  - Updated `@babel/core`, `@babel/preset-env`, `@fortawesome/fontawesome-free`, `babel-loader`, `@babel/polyfill`
- Add fix for trying to increment solves when solves are hidden
- Fix issue where challenge plugins were not passed the appropriate data from the API

# 2.0.2 / 2020-09-10

- Add rel="noopener" to external links to prevent tab napping attacks
- Add support for the custom fields feature of CTFd v3.1.0

# 2.0.1 / 2020-08-12

- Use shared components for errors in team pages

# 2.0.0 / 2020-07-22

- Update theme to work with CTFd v3

# 1.0.5 / 2020-05-21

- Update jQuery dependency to 3.5.1

# 1.0.4 / 2020-05-04

- Update theme for CTFd v2.4.0
- Update jQuery dependency to 3.5.0

# 1.0.3 / 2020-03-15

- Rebuild theme against CTFd v2.3.2

# 1.0.2 / 2020-02-17

- Add theme_header and theme_footer to base.html to support CTFd v2.3.0

# 1.0.1 / 2020-01-09

- Add jQuery, Moment, nunjucks, and Howl to window globals to make it easier for plugins to access JS modules
- Add `howler` to package.json

# 1.0.0 / 2020-01-04

- Update theme to support CTFd v2.2.0
- Begin tracking changes in `CHANGELOG.md`
