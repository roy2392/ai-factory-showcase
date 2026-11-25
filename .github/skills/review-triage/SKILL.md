---
name: review-triage
description: Handle pull request review remarks critically. Verify each remark against the code before changing anything, implement the valid ones, and explain the ones you reject. Use when responding to review comments or @copilot mentions on a pull request.
---

# Review triage

Reviewers can be wrong, and so can automated reviewers. Do not apply remarks blindly.

## For each remark

1. Restate it in one line.
2. Check it against the code, the tests and `AGENTS.md`. Run the relevant tests if that helps decide.
3. Classify it:
   - **Accept**: correct and in scope. Implement it.
   - **Partly accept**: implement the valid part, explain the rest.
   - **Reject**: wrong, out of scope for this PR, or conflicting with `AGENTS.md` or another remark.
   - **Question**: the remark is a question. Answer it and change no code.
4. Two remarks that conflict: follow the human over the bot, and the latest over the earlier. Say so.

## After the changes

Run the build and the tests. Then reply with:

```
### Review follow-up
| # | Remark | Decision | What changed / why not |
|---|--------|----------|------------------------|
Build and tests: <command> → <result, reported honestly>
```

Never claim a test passed if you did not run it. If a remark needs a product decision, ask instead of
guessing.
