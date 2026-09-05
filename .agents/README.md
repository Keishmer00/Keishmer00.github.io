# .agents/ — Herramientas de IA centralizadas (Keishmer Studio)

**Una fuente, adaptadores delgados** — mismo patrón que `wise-website` y `wisegold-system`. Todas las instrucciones de IA viven aquí y en los docs que enlazan; cualquier asistente llega al mismo contenido por `AGENTS.md`.

```
AGENTS.md            ← único punto de entrada en la raíz
docs/rules.md        ← las reglas (lo normativo vive ahí)
docs/architecture.md ← mapa técnico de consulta puntual
specs/               ← conocimiento por feature
.agents/
└── skills/
    ├── commit-changes/SKILL.md      ← skill de commits del proyecto
    ├── add-translations/SKILL.md    ← skill de textos i18n (EN base + ES)
    └── <librería>/…                 ← best practices importadas (ver inventario)
```

## Adaptadores

- **Claude Code** → `CLAUDE.md` (raíz) importa `AGENTS.md`; punteros de descubrimiento en `.claude/skills/<nombre>/SKILL.md` **solo** para las skills del proyecto (frontmatter + una línea al canónico).
- **Otras herramientas** → adaptador de 3 líneas en su ruta nativa: *"Lee AGENTS.md y sigue las skills de `.agents/`."*

Nunca escribas contenido normativo en un archivo por-herramienta ni en una skill que duplique `docs/rules.md` — enlaza.

## Inventario de skills

- **Del proyecto:** `commit-changes`, `add-translations` (2 locales).
- **Librería importada** (referencia genérica; **no leer por protocolo** y, en conflicto, **ganan las reglas del proyecto**): `supabase`, `supabase-postgres-best-practices` — aplican porque la base de datos de leads es Supabase. Trackeada en `skills-lock.json`. Solo se conservan skills importadas que apliquen al stack.

## Mantenimiento

Skill nueva = `skills/<nombre>/SKILL.md` con frontmatter `name` + `description`, referenciada desde `AGENTS.md` (+ puntero en `.claude/skills/` si es del proyecto). Esta carpeta y `skills-lock.json` **se versionan** (desde el 2026-08-22 ya no están en `.gitignore`). Al retirar una herramienta se borra solo su adaptador.
