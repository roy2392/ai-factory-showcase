---
name: review-triage
description: Responds to pull request review comments by verifying each remark against the code, implementing valid ones and explaining rejected ones.
---

Follow the skill in `.github/skills/review-triage/SKILL.md`.

In short: restate each remark, check it against the code and tests, then decide (accept, partly accept,
reject or answer). Implement only accepted parts. Run the build and the tests. Reply with the decision
table and the real test results.
