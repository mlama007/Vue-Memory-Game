# Accessibility

Vue Memory Game participates in the [Open Source Accessibility Framework](https://github.com/open-source-accessibility/Open-Source-Accessibility-Framework) to make accessibility improvements visible, trackable, and ongoing.

Our progress, goals, and remaining work are tracked in our [framework tracking issue](https://github.com/open-source-accessibility/Open-Source-Accessibility-Framework/issues/8). _(Note: as of this writing, the Open Source Accessibility Framework repository is configured as an internal-visibility repository, so this issue may not be reachable by everyone outside the hosting organization. Maintainer input needed: confirm the intended visibility of the framework tracking issue.)_

Participating in the framework is a commitment to continuous improvement. **It is not a certification, a claim of WCAG conformance, or a guarantee that the game is fully accessible.** We welcome accessibility bug reports from anyone who runs into a barrier.

## Goals

The project's current accessibility focus areas, based on the accessibility work already in the codebase, are:

- **Keyboard access**: every interactive element (navigation links, cards, restart controls) should be reachable and operable using only a keyboard, with a visible focus indicator.
- **Screen reader support**: route changes, gameplay updates (cards flipped, matches found, stars remaining), and the win state should be announced using the existing ARIA live regions (`role="status"`), semantic HTML, and accessible names.
- **Focus management**: focus should move to the new page's main content on route change and to the win dialog when the game is completed, instead of getting lost or reset to the top of the page.

A formal conformance target (for example, a specific WCAG level) has not been set for this project. _(Maintainer input needed: confirm whether the project should adopt a specific WCAG conformance target, e.g. WCAG 2.1/2.2 Level A or AA.)_

## Contributor requirements

If you contribute code or content to this project, please help us avoid accessibility regressions:

- Use semantic HTML elements (`main`, `nav`, `ul`/`li`, `button`, headings in order) instead of generic `div`/`span` with click handlers.
- Keep existing ARIA attributes (`role="status"`, `aria-label`, `aria-current`, `aria-labelledby`, `aria-describedby`) intact when editing the components that use them (`App.vue`, `Home.vue`, `Winning.vue`, `Instructions.vue`), and add equivalent labeling to any new interactive component.
- Preserve keyboard operability: do not remove `tabindex`, focus handling (`v-focus`, `this.$refs[...].focus()`), or the skip link in `App.vue`.
- Before submitting a pull request that changes the UI, do a quick keyboard-only pass (Tab/Shift+Tab/Enter/Space) of the flow you changed, and confirm focus is visible and moves in a logical order.
- Run `npm run lint` before submitting a pull request.

_(Maintainer input needed: decide whether to adopt an automated accessibility check, such as axe-core or the GitHub Accessibility Scanner, as part of contributor requirements. No automated accessibility tooling is configured in this repository yet.)_

## Supported environments

- **Browsers**: the project's build targets follow the `browserslist` configuration in this repository (`> 1%`, `last 2 versions`). No specific list of manually verified browsers is currently documented.
- **Assistive technology**: no specific assistive technology and version combinations have been formally tested against this project yet. _(Maintainer input needed: list the screen readers/browsers combinations, if any, that have actually been tested, e.g. VoiceOver + Safari, NVDA + Firefox.)_
- **Input methods**: the game is intended to be usable with a keyboard alone, in addition to mouse/touch input.

## Reporting accessibility issues

If you find an accessibility barrier, please let us know:

1. Open a new accessibility issue using the [accessibility bug report template](https://github.com/mlama007/Vue-Memory-Game/issues/new?template=accessibility_bug_report.yml) (template file: [`.github/ISSUE_TEMPLATE/accessibility_bug_report.yml`](.github/ISSUE_TEMPLATE/accessibility_bug_report.yml)).
2. If you prefer not to disclose details of your disability or assistive technology, enter "Prefer not to say" or "Not applicable"; that information is optional.
3. Include as much of the following as you can: what you expected to happen, what actually happened, steps to reproduce, your environment, and how the issue affects you (severity).

You do not need to disclose any personal or medical information to file a report.

GitHub issues are currently the only published reporting channel. _(Maintainer input needed: provide a public, role-based contact channel for people who cannot use GitHub. Do not publish a private personal address.)_

## How we respond

- We will read and acknowledge accessibility reports respectfully, treating them as valuable feedback rather than a complaint.
- The accessibility bug report template applies the `accessibility` label so reports stay visible and trackable.
- _(Maintainer input needed: document expected response times or severity-based resolution targets once the project has enough history to commit to them.)_

## Feedback

Accessibility is an ongoing practice. If you have suggestions for improving this statement or the project's accessibility, please open an issue or a pull request.
