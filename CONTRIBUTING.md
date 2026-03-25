# CONTRIBUTING TO VFUTURE

⚠️ **IMPORTANT: This is a PRIVATE, PROPRIETARY repository.**

---

## Access & Permissions

This repository is **PRIVATE** and exclusive to Veltrix Media Group.

### Who Can Access?

✅ **Authorized Personnel Only:**
- Veltrix Media Group employees
- Authorized contractors (with written agreement)
- Licensed partners (with licensing agreement)

### Who CANNOT Access?

❌ **Strictly Prohibited:**
- External developers
- Unauthorized parties
- Public users
- Competitors or third parties

---

## Repository Guidelines for Authorized Users

### Code of Conduct

When working on this project, you agree to:

1. **Confidentiality**
   - Keep source code confidential
   - Don't discuss code publicly
   - Protect API keys & credentials
   - Don't share access with unauthorized persons

2. **Security**
   - Never commit `.env.local` containing real keys
   - Use `.env.example` for templates only
   - Report security issues to security@veltrixmediagroup.com
   - Rotate API keys monthly

3. **Quality Standards**
   - Follow existing code style
   - Pass all tests: `npm run lint && npm run typecheck && npm run build`
   - Write clear, descriptive commit messages
   - Create feature branches before submitting PRs

4. **Documentation**
   - Update README if changing architecture
   - Comment complex logic
   - Keep edge cases documented

### Commit Message Standards

```
Type: Brief description

[Optional detailed explanation]

Type: feat, fix, docs, style, refactor, test, chore

Example:
feat: Add two-factor authentication support

- Implement TOTP-based 2FA
- Update user settings page
- Add 2FA verification in login flow
```

### Branch Naming

```
feature/description       # New features
bugfix/description        # Bug fixes
hotfix/description        # Production fixes
docs/description          # Documentation
refactor/description      # Code refactoring
```

### Pull Request Process

1. Create feature branch: `git checkout -b feature/your-feature`
2. Make changes and test locally
3. Push to your branch
4. Create Pull Request with:
   - Clear title
   - Description of changes
   - Screenshot (if UI changes)
   - Test results

5. Code review required before merge
6. All tests must pass
7. Merge to main using squash commit

### Testing Requirements

All changes must pass:

```bash
npm run lint        # ESLint check
npm run typecheck   # TypeScript check
npm run build       # Production build
```

Existing tests must not break.

---

## Unauthorized Access

⚠️ **WARNING: Unauthorized access to this repository is prohibited.**

If you have gained unauthorized access:
1. Do not explore the code
2. Do not copy any files
3. Report the access immediately to: security@veltrixmediagroup.com
4. Delete any local copies

**Violation may result in legal action.**

---

## Issues & Security Problems

### Report Security Issues

For security vulnerabilities, DO NOT create public issues.

**Email**: security@veltrixmediagroup.com

Include:
- Description of vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if known)

### Report Bugs

Use GitHub Issues with template:
- Title: Clear, concise description
- Description: What happened, expected behavior
- Steps to reproduce
- Environment (OS, Node version, etc.)

### Report Feature Requests

Use GitHub Discussions or email:
contact@veltrixmediagroup.com

---

## Questions?

For access requests, licensing, or questions:
**Email**: contact@veltrixmediagroup.com

---

**Last Updated**: March 23, 2026
**Status**: PROPRIETARY - PRIVATE REPOSITORY ONLY

🔒 **This project is under copyright protection. All rights reserved.**
