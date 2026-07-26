# Signal Console Stage 0: GitHub coordination and lock protocol

**State:** `BLOCKED_REPOSITORY_ACCESS`  
**Canonical control-plane artifact:** the pull request introducing this file  
**Temporary host:** `GAIn-Tech/openclaw-mission-control`  
**Migration target:** the canonical Signal Console repository, once identified and verified

No framework choice, application code, dependency change, or deployment may begin until the unlock
criteria pass. GitHub is canonical; Discord is notification-only.

## 1. Authentication and repository gate

- Current secure GitHub authentication was verified as `jackoatmon` through Git Credential Manager.
- The credential pasted into chat is considered exposed. It must be revoked/rotated and must never be
  quoted in GitHub, commits, logs, cron prompts, or agent messages.
- The canonical Signal Console repository is not visible to the current authenticated identity or in
  public repository discovery. This is a hard implementation blocker, not permission to invent a repo.
- Each agent must announce its GitHub login and prove write capability with a non-destructive feature
  branch and pull request in the canonical repo.

## 2. Capability announcement contract

Before claiming work, each agent comments on the canonical coordination PR using this exact shape:

```text
CAPABILITY-ANNOUNCEMENT
agent_id: <stable-runtime-id>
github_login: <verified-login>
model: <model-and-provider>
tools: <git/build/test/design/mobile capabilities>
constraints: <environment/access limitations>
requested_lane: <architecture | design | integration>
proof: <branch-or-PR URL>
```

A Discord display name, bot label, or self-report is not an identity proof. The GitHub login and proof
branch must agree. The final role map is recorded only after all three announcements exist.

## 3. Provisional equal distribution

Each lane owns approximately one third of scoped cards. These are provisional roles, not GitHub
assignments, until identities are verified.

1. **Hermes / architecture lane:** repository audit, framework decision spike, native shell foundation.
2. **VISION / design lane:** avant-garde design system, screen prototypes/assets, accessibility and
   visual QA.
3. **Fang / integration lane:** API/data contracts, release engineering, Byzantine review, and final
   integration.

Fang is the final integrator, not unilateral product owner. Each lane produces independently
reviewable commits and evidence. No lane may silently absorb another lane's scope.

## 4. Card and atomic lock protocol

Every work item is a GitHub issue or sub-issue in the canonical Signal Console repository. A card must
contain acceptance criteria, dependencies, owned paths, verification commands, rollback, and gates.

Claim a card atomically with all three actions in one GitHub update:

1. assign the verified GitHub login;
2. apply `status:claimed`;
3. post:

```text
LOCK <card-id> <agent-id> <path-glob[,path-glob...]> <UTC-expiry>
```

Rules:

- A lock covers explicit paths, never the entire repository unless the integrator records why.
- Default lock TTL is 90 minutes.
- Renew with `HEARTBEAT <card-id> <commit-or-evidence> <new-UTC-expiry>`.
- A lock expires after its TTL without heartbeat; takeover requires a `LOCK-TAKEOVER` comment linking
  the stale lock and current branch state.
- Conflicting path locks block both cards until owners split paths or the integrator records a
  reversible resolution.
- Never edit a shared branch. Never use force-push.

Branch format:

```text
agent/<agent-id>/<card-id>-<slug>
```

One card per branch. Commits reference the card. A branch without a current lock is quarantined from
the merge queue.

## 5. Pull request and handoff contract

Every PR includes:

- linked card and current lock;
- changed paths and explicit non-goals;
- test/build commands with real results;
- screenshots or recordings for visual changes;
- rollback instructions and unresolved risks;
- requested independent reviewers;
- handoff tuple: `issue`, `branch`, `commit SHA`, `evidence paths`, `blockers`, `next owner`.

Cross-lane PRs require two independent reviews; the author cannot supply either approval. Direct
commits to the default branch are forbidden.

## 6. Byzantine review and consensus

Agreement is not evidence. Each consequential claim must link code, tests, screenshots, benchmarks,
or a reproducible inspection command.

A dissent is recorded as:

```text
BLOCKED-BYZANTINE
claim: <falsifiable claim>
evidence: <artifact/command>
expected: <expected observation>
observed: <observed contradiction>
smallest-resolution: <reversible experiment or patch>
```

Resolve disagreements using reproducible evidence, contract conformance, and the smallest reversible
change—not majority imitation, seniority, or repeated assertions. Unresolved high-impact dissent
blocks merge.

## 7. Merge protocol

Merge order follows declared dependencies. The merge commit is the completion event.

Fang performs final integration only when:

- all prerequisite PRs are green and independently reviewed;
- all Byzantine blocks are resolved with evidence;
- lock ownership and changed paths are coherent;
- the full build/test suite is rerun from the integration head;
- mobile visual/accessibility checks are rerun from the wired product;
- rollback points are documented.

## 8. Unlock criteria

Implementation remains locked until all are true:

- [ ] canonical Signal Console repository URL is linked and independently verified;
- [ ] secure write access is proven without an exposed credential;
- [ ] three capability announcements are posted by verified GitHub identities;
- [ ] equal lane cards exist with acceptance, dependencies, paths, verification, and rollback;
- [ ] the lock registry has no overlapping active paths;
- [ ] branch protections/review expectations are known;
- [ ] Fang's final-integrator identity is verified.

When unlocked, copy this protocol and its audit trail into the canonical repository, open the three
lane cards there, and mark this temporary control-plane PR superseded with links. Do not delete the
history.
