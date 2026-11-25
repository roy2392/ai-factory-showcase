# Copilot instructions

Read and follow `AGENTS.md` at the repository root. It holds the build and test commands, conventions
and scope rules.

Pull requests from the AI factory:

- Title: imperative, under 72 characters.
- Description: start with `Fixes #<issue>`. Then **Summary** (3–6 bullets), **Tests** (the commands you
  ran and their real results), **Assumptions**, and **Not done** (anything from the issue you skipped, with
  the reason).
- Keep the diff focused. Several small commits are fine; the PR is squash-merged.

When you work on review comments, use the `review-triage` approach: verify each remark before changing
code, and reply with the decision table.
