# Agent Workflow Protocol

## Hierarchy
```
devop (manager)
  ↓ assigns task
coder (lead)
  ↓ delegates implementation
juniorCoder (worker)
  ↑ returns code
coder (review)
  ↑ reports completion
devop (tracker)
```

## Communication Rules

### devop → coder
- Assign ONE task at a time
- Include: task number, files to create/modify, requirements
- Wait for completion report before next task

### coder → juniorCoder
- Provide exact function signatures
- Specify input/output formats
- Include endpoint details if applicable
- List constraints (fetch not axios, CommonJS, etc.)

### juniorCoder → coder
- Return completed implementation
- No direct communication with devop

### coder → devop
- Report task completion
- Request next task
- Flag any blockers or issues

## Task Format
```
TASK: [Task Number] - [Description]
FILES: [File paths]
REQUIREMENTS:
- [Requirement 1]
- [Requirement 2]
- [Constraint 1]
```

## Review Checklist (coder)
- [ ] Naming conventions match project
- [ ] All imports correct
- [ ] Exports match expected interface
- [ ] Error handling consistent
- [ ] No duplicate code
- [ ] Follows project patterns
- [ ] Linting passes
- [ ] Type checking passes (if applicable)

## Retry Policy
- juniorCoder gets max 2 retries with coder feedback
- After 2 failed retries, coder fixes the issues directly
- coder runs lint/tests automatically before reporting completion to devop

## Task Granularity
- One file per task (or one coherent feature if multiple files are tightly coupled)
- Each task should be completable in a single delegation cycle

## Status Updates
- devop maintains: .opencode/devop-plan.md
- Tasks marked: [ ] pending, [x] complete, [~] in progress
- Current phase and next task clearly indicated
