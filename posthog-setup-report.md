# PostHog post-wizard report

The wizard added client-side PostHog initialization for this Next.js App Router project, enabled exception autocapture, configured the required public environment variables, and instrumented the two meaningful homepage interactions available in the current application. Autocapture and session recording remain at their SDK defaults. No authentication or instrumentable server-side routes exist in the current project, so user identification and server capture were not added.

| Event | Description | File |
| --- | --- | --- |
| `events_explored` | A visitor clicked the primary control to explore the featured events list. | `components/ExploreBtn.tsx` |
| `event_selected` | A visitor selected a featured event to open its detail page. | `components/EventCard.tsx` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- [Analytics basics dashboard](https://us.posthog.com/project/521984/dashboard/1881419)
- [Explore to event selection funnel](https://us.posthog.com/project/521984/insights/4hF2BGvI)
- [Featured event selections](https://us.posthog.com/project/521984/insights/F8USi8IV)
- [Explore interactions](https://us.posthog.com/project/521984/insights/9V7BNOng)

## Verify before merging

- [ ] Run a full production build (the wizard only verified the files it touched) and fix any lint or type errors introduced by the generated code.
- [ ] Run the test suite — call sites that were rewritten or instrumented may need updated mocks or fixtures.
- [ ] Add the exact PostHog env var names you added to `.env.example` and any monorepo/bootstrap scripts so collaborators know what to set.
- [ ] Wire source-map upload (`posthog-cli sourcemap` or your bundler's upload step) into CI so production stack traces de-minify.

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.
