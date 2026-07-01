# PostHog post-wizard report

The wizard has completed a deep integration of PostHog into the Cher Ami marketing website. Client-side tracking was initialized via `instrumentation-client.ts` (Next.js 15.3+ pattern) with a reverse proxy through `/ingest` rewrites in `next.config.ts`. A shared server-side PostHog client was created at `lib/posthog-server.ts` and wired into three API routes. Seven client-side files were instrumented with `posthog.capture()` calls, and `posthog.identify()` is called whenever an email is captured (both quick sign-up and wizard completion) to link sessions to known users. Error tracking via `posthog.captureException()` was added to the contact form.

| Event Name | Description | File |
|---|---|---|
| `email_sign_up` | User submits the quick email CTA to receive onboarding instructions. | `components/EmailCTA.tsx` |
| `wizard_scenario_selected` | User selects who the magazine is for (grandparent, parent, myself, military, etc.). | `components/StartWizard.tsx` |
| `wizard_photo_added` | User adds their first photo to the onboarding wizard. | `components/StartWizard.tsx` |
| `wizard_completed` | User completes the full onboarding wizard and submits their information. | `components/StartWizard.tsx` |
| `app_download_clicked` | User clicks an App Store or Google Play download button. | `components/CTA.tsx` |
| `contact_form_submitted` | User submits the contact/support form. | `app/(main)/contact/ContactClient.tsx` |
| `header_cta_pressed` | User clicks the Get Started button in the site header. | `components/Header.tsx` |
| `onboarding_submitted` | Server receives and processes the full wizard onboarding form submission. | `app/api/onboarding/route.ts` |
| `welcome_email_submitted` | Server registers a new email lead from the quick email sign-up form. | `app/api/welcome/route.ts` |
| `support_ticket_submitted` | Server receives and dispatches a support ticket from the contact form. | `app/api/support-ticket/route.ts` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- **Dashboard:** [Analytics basics (wizard)](https://us.posthog.com/project/487994/dashboard/1767453)
- [Onboarding Funnel: Scenario → Wizard Completed](https://us.posthog.com/project/487994/insights/2394eRqb)
- [Email Lead Capture Over Time](https://us.posthog.com/project/487994/insights/vCuZOdfw)
- [App Download Clicks Over Time](https://us.posthog.com/project/487994/insights/nwOtRD87)
- [Wizard Scenario Mix](https://us.posthog.com/project/487994/insights/hMXE9SYj)
- [Full Acquisition Funnel: Header CTA → Lead → Wizard → App Download](https://us.posthog.com/project/487994/insights/GZTZs0aS)

## Verify before merging

- [ ] Run a full production build (`npm run build`) and fix any lint or type errors introduced by the generated code.
- [ ] Run the test suite — call sites that were rewritten or instrumented may need updated mocks or fixtures.
- [ ] Add `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` and `NEXT_PUBLIC_POSTHOG_HOST` to `.env.example` and any team onboarding docs so collaborators know what to set.
- [ ] Wire source-map upload (`posthog-cli sourcemap` or your bundler's upload step) into CI so production stack traces de-minify in PostHog Error Tracking.
- [ ] Confirm the returning-visitor path also calls `identify` — currently `identify` is called on wizard completion and email sign-up, but a user who returns to the site after already signing up will be on an anonymous distinct ID until they trigger one of those events again.

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.
