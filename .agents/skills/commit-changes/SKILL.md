---
name: commit-changes
description: Cómo crear commits en este repo — atómicos, en inglés, Conventional Commits, sin push automático. Usar siempre que el usuario pida commitear.
---

# Commit de cambios

## Idioma y formato

- Mensajes **siempre en inglés** (asunto y cuerpo).
- **Conventional Commits**: `type(scope): description`. Tipos: `feat`, `fix`, `refactor`, `chore`, `docs`, `style`, `perf` (+`test` cuando exista tooling). Scope = área (`i18n`, `seo`, `leads`, `projects`, `analytics`, `infra`, `services`, `home`, `about`…).
- Asunto ≤ ~72 caracteres, imperativo; cuerpo descriptivo si el cambio no es trivial.

## Atomicidad (regla del proyecto — rules.md §6)

- **Un commit por unidad lógica.** Nada de commits escoba; si hay varias unidades en el working tree, se stagean y commitean por separado explicando la división.
- Un cambio de copy que toca `en.json` **y** `es.json` es **una** unidad (la paridad va junta); un caso de estudio nuevo en `projects.ts` con sus overrides ES también.

## Trazabilidad

- Si implementa una spec: `Spec: NNN` en el cuerpo.

## Procedimiento

1. `git status` + `git diff`; agrupar en unidades lógicas.
2. Por unidad: stagear solo sus archivos, mensaje según reglas, commit (directo a `main` — no usamos PRs).
3. **Nunca push automático**; el usuario decide (idealmente con `pnpm build` en verde).
4. Mensaje dado en inglés → tal cual; en otro idioma → traducir avisando.
5. **Jamás** stagear `.env`, `.env.*` (salvo `.env.example`), `supabase/.temp/` ni ningún archivo con secretos. Tampoco `docs/pending.md` (local del owner) ni `.vercel/`/`dist/`.

**Bien:** `feat(leads): store utm attribution with each inquiry` · `fix(i18n): add missing es keys for service landings` · **Mal:** `Update submit-clients.ts`, `arreglos varios`, un commit que mezcla i18n con infra.
