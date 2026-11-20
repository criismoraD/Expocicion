# REGLAS DE GIT Y VERSIONADO — Backoffice CEA GROUP

> Reglas obligatorias para agentes de IA y desarrolladores. Aplican a todo el contenido de `CEA-GROUP-SISTEMA-INTEGRAL/`.

---

## 1. NO SUBIR A GIT SIN PEDIRLO

- **Prohibido** ejecutar `git add`, `git commit`, `git push`, `git merge`, `git rebase` o cualquier operación que modifique el historial de Git **a menos que el usuario lo pida explícitamente**.
- Solo se permite inspección de estado (`git status`, `git diff`, `git log`) cuando sea necesario para entender el contexto.
- Si el usuario pide "subir", "commit" o "push", asumir que también debe actualizarse el versionado (ver regla 3) **antes** del commit.

## 2. DESCARGAS: CONFLICTOS Y REPLAZO

Cuando se pida **descargar** un archivo, recurso, imagen, dependencia u otro artefacto:

1. **Corroborar conflictos:** verificar si ya existe un archivo con el mismo nombre (o un equivalente) en la ruta de destino.
2. **Si no existe:** descargarlo normalmente.
3. **Si existe:** evaluar cuál es **el más relevante** (versión más reciente, fuente oficial, mejor calidad/resolución, el que coincida con lo pedido).
4. **Si la relevancia no es obvia** o hay duda entre dos candidatos, **preguntar al usuario** antes de sobrescribir o reemplazar.
5. **Nunca** sobrescribir un archivo existente sin haber hecho el paso de corroboración.

## 3. VERSIONADO EN CADA SUBIDA A GIT

Cada vez que se haga un **commit/push** (siempre que el usuario lo pida), **debe incrementarse el versionado en AMBOS proyectos**:

| Proyecto | Dónde está la versión | Cómo se incrementa |
| :--- | :--- | :--- |
| **Backoffice** (`CEA-GROUP-SISTEMA-INTEGRAL/`) | `APP_BACKOFFICE/Cea_proyecto/frontend/src/version.js` → `VERSION_WEB` | Subir semánticamente, p. ej. `"1.1.0"` → `"1.1.1"` o `"1.2.0"` |
| **Sitio web** (`../sistema-gestion-cea-group/`) | Clase `.pie-version` en el footer de **todas** las páginas HTML (`index.html`, `tesis.html`, `empresarial.html`, `legal.html`, `cursos.html`, `nosotros.html`, `contacto.html`) | Subir el valor, p. ej. `V1.4` → `V1.5` (mismo número en las 7 páginas) |

**Orden recomendado al subir:**

1. Incrementar `VERSION_WEB` en `version.js` del backoffice.
2. Incrementar `.pie-version` en las 7 páginas del sitio web.
3. Verificar que no queden cambios sin revisar (`git status` / `git diff`).
4. Solo entonces, si el usuario lo pidió, `git add` + `git commit` + `git push`.

---

*Documento de reglas — no modificar sin acuerdo del equipo.*
