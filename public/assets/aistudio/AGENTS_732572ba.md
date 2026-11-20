# GUÍA DE ESTÁNDARES, DESARROLLO Y CONVENCIONES PARA AGENTES DE IA
## Sistema Integral de Gestión Empresarial — CEA GROUP (`AGENTS.md`)

---

> **PROPÓSITO DE ESTE DOCUMENTO:**  
> Este archivo sirve como la **constitución técnica y manual de instrucciones obligatorio** para cualquier agente de Inteligencia Artificial o desarrollador que genere, modifique o audite código en este repositorio. Todo el código producido debe adherirse estrictamente a estas directrices.

---

## 1. NOMBRE OFICIAL DEL ARCHIVO

* **Nombre Estándar:** `AGENTS.md` *(o `.agentrules`)*
* **Justificación Técnica:** Es el estándar de la industria reconocido automáticamente por los entornos de desarrollo con IA (Antigravity, Cursor, Copilot Workspace, Windsurf). Permite que cualquier agente cargue estas reglas en su contexto antes de escribir o modificar código.

---

## 2. CONVENCIONES DE NOMENCLATURA Y ESTILO DE CÓDIGO

Todo el código, comentarios, funciones, variables, clases y pruebas unitarias deben escribirse en **ESPAÑOL DESCRIPTIVO Y AUTODOCUMENTADO**, eliminando nombres crípticos, abreviaciones ambiguas o términos en inglés mezclados innecesariamente.

### 2.1 Reglas por Tipo de Elemento

| Elemento | Formato / Convención | Regla de Oro | Ejemplo Correcto ✅ | Ejemplo Incorrecto ❌ |
| :--- | :--- | :--- | :--- | :--- |
| **Clases / Modelos** | `Pascal_Snake_Case` o `PascalCase` | Nombre descriptivo del objeto de negocio con sustantivos claros. | `Expediente_Digital_Modelo`<br>`Servicio_Autenticacion_Usuario`<br>`Proyecto_Academico_Esquema` | `ExpModel`<br>`UserAuth`<br>`Data1` |
| **Funciones / Métodos** | `snake_case` con verbos de acción | Verbo en infinitivo + objeto directo + contexto de negocio. | `calcular_saldo_pendiente_de_contrato()`<br>`validar_limite_de_tesis_activas_por_asesor()`<br>`aprovisionar_cuenta_de_usuario_cliente()` | `calc_saldo()`<br>`valAssesor()`<br>`do_user()` |
| **Variables / Parámetros** | `snake_case` ultra descriptivo | Debe explicar exactamente qué dato almacena sin necesidad de comentarios. | `monto_total_cuota_inicial_pagada`<br>`lista_de_proyectos_academicos_activos`<br>`porcentaje_de_similitud_reporte_turnitin` | `monto`<br>`list_proj`<br>`turn_pct` |
| **Constantes / ENUMs** | `UPPER_SNAKE_CASE` | Prefijo del módulo + estado o tipo formal. | `ESTADO_PROYECTO_EN_EJECUCION`<br>`ROL_USUARIO_COORDINADOR_ACADEMICO`<br>`FORMATO_OBSERVACION_AUDIO_WHATSAPP` | `STATUS_EXEC`<br>`COORD_ROL`<br>`AUDIO` |
| **Archivos / Módulos** | `snake_case` descriptivo | Nombre del componente o responsabilidad. | `servicio_gestion_expedientes.py`<br>`controlador_pagos_y_cobranzas.py`<br>`repositorio_asesores_academicos.py` | `service.py`<br>`pay.py`<br>`repo_ass.py` |

### 2.2 Descargas: conflictos y reemplazo

Cuando se pida **descargar** un archivo, recurso, imagen, dependencia u otro artefacto:

1. **Corroborar conflictos:** verificar si ya existe un archivo con el mismo nombre (o un equivalente) en la ruta de destino.
2. **Si no existe:** descargarlo normalmente.
3. **Si existe:** evaluar cuál es **el más relevante** (versión más reciente, fuente oficial, mejor calidad/resolución, el que coincida con lo pedido).
4. **Si la relevancia no es obvia** o hay duda entre dos candidatos, **preguntar al usuario** antes de sobrescribir o reemplazar.
5. **Nunca** sobrescribir un archivo existente sin haber hecho el paso de corroboración.

---

### 3.1 Backend en Python (FastAPI — 5 Capas Limpias)

El backend en Python (FastAPI) debe mantener una separación estricta en 5 capas:

```
backend/
├── aplicacion/                    # Lógica de Negocio y Casos de Uso
│   ├── servicios/                 # Clases de servicio con lógica pura
│   │   ├── servicio_autenticacion.py
│   │   ├── servicio_expedientes.py
│   │   ├── servicio_asesoria_empresarial.py
│   │   └── servicio_gestion_legal.py
├── dominio/                       # Reglas y Modelos de Dominio
│   ├── modelos/                   # Modelos ORM (SQLAlchemy / SQLModel)
│   └── esquemas/                  # Validaciones de entrada/salida (Pydantic)
│       ├── esquema_usuario.py
│       └── esquema_expediente.py
├── infraestructura/               # Conexiones Externas y Base de Datos
│   ├── base_de_datos/             # Conexión PostgreSQL y sesiones
│   ├── repositorios/              # Consultas SQL y acceso a datos
│   └── almacenamiento/            # Conexión a Google Cloud Storage
├── interfaces_api/                # Controladores y Endpoints HTTP
│   └── controladores/             # Routers de FastAPI con prefijos en español
│       ├── controlador_crm.py
│       ├── controlador_academicos.py
│       ├── controlador_empresarial.py
│       └── controlador_legal.py
└── pruebas/                       # Pruebas Unitarias y de Integración
    ├── pruebas_unitarias/
    └── pruebas_integracion/
```

### 3.2 Frontend y Sitio Web Corporativo (Estructura Modular Desacoplada)

Todo desarrollo frontend para el sitio web corporativo (`gruposeaperu.com`) debe cumplir estrictamente con los siguientes estándares:

1. **Cero Archivos Monolíticos:** Queda prohibido agrupar todo el sitio en un solo archivo gigante. Cada página de servicio debe ser un archivo HTML independiente:
   * `index.html`: Portada principal y selector de divisiones.
   * `tesis.html`: División Académica e Investigación.
   * `empresarial.html`: División Consultoría y Manuales MOF/MAPRO.
   * `legal.html`: División Jurídica y Servicios Legales.
   * `cursos.html`: Plataforma de Cursos y Diplomados (convenios UNT/UNP).
   * `nosotros.html`: Trayectoria, valores y sede central en Chiclayo.
   * `contacto.html`: Agendamiento de citas presenciales y mapa.
2. **Modularidad en CSS y JS:**
   * Estilos separados en `css/main.css`, `css/components.css` y `css/animations.css`.
   * Lógica separada en `js/main.js`, `js/three-background.js` (efectos 3D por código) y `js/form-handler.js`.
3. **Regla Estricta Visual — Cero Emojis:** En la interfaz corporativa no se utilizan emojis en títulos, botones ni textos. La iconografía debe ser exclusivamente vectorial SVG con **Lucide Icons**.
4. **Diseño 3D Animado por Código:** Los efectos visuales del Hero se programan con **Three.js / WebGL** (mallas poligonales y partículas doradas/azules reactivas al cursor).
5. **Enfoque 100% Público/Cliente:** No exponer rutas internas administrativas (ERP/Backoffice) ni procesos tributarios internos en el frontend público del cliente. El único acceso público de clientes es el **Portal del Cliente** (`portal.gruposeaperu.com`).

---

## 4. ESTRATEGIA OBLIGATORIA DE PRUEBAS UNITARIAS (TESTING)

Ningún módulo o función se considerará completado sin su correspondiente suite de pruebas unitarias ejecutadas con **`pytest`**.

### 4.1 Reglas para Escribir Pruebas:
1. **Nombres de Funciones de Prueba en Español Descriptivo:**
   * El nombre de la prueba debe leerse como una especificación formal del comportamiento esperado.
   * Estructura: `test_debe_[accion_esperada]_cuando_[condicion_o_escenario]()`.
2. **Estructura AAA (Arrange, Act, Assert):**
   * **Preparar (Arrange):** Crear datos de prueba representativos.
   * **Actuar (Act):** Ejecutar la función o método a evaluar.
   * **Verificar (Assert):** Comprobar que el resultado y los efectos secundarios sean exactos.
3. **Casos Límites y Validación de Errores Obligatorios:**
   * Probar el flujo exitoso (*Happy Path*).
   * Probar el caso de error (*Negative Path*): datos nulos, valores negativos, violaciones de límites de negocio.

### 4.2 Ejemplos de Pruebas Unitarias para CEA GROUP:

```python
# Archivo: backend/pruebas/pruebas_unitarias/test_servicio_asignacion_asesores.py

import pytest
from aplicacion.servicios.servicio_gestion_academica import Servicio_Gestion_Academica
from dominio.esquemas.esquema_asesor import Esquema_Asesor_Prueba
from dominio.excepciones import Excepcion_Carga_Maxima_Superada, Excepcion_Grado_Incompatible

def test_debe_bloquear_asignacion_cuando_asesor_tiene_cinco_tesis_activas():
    # 1. Preparar (Arrange)
    servicio = Servicio_Gestion_Academica()
    asesor_saturado = Esquema_Asesor_Prueba(
        identificador_asesor="asesor-001",
        tesis_activas_actuales=5,
        grado_maximo="Magíster"
    )
    
    # 2. Actuar y 3. Verificar (Act & Assert)
    with pytest.raises(Excepcion_Carga_Maxima_Superada) as info_error:
        servicio.asignar_asesor_a_expediente(
            identificador_asesor=asesor_saturado.identificador_asesor,
            identificador_expediente="EXP-2026-0001"
        )
    
    assert "El asesor ya cuenta con el límite máximo de 5 tesis activas" in str(info_error.value)


def test_debe_recalcular_saldo_pendiente_al_registrar_abono_parcial():
    # 1. Preparar (Arrange)
    servicio = Servicio_Finanzas_Contratos()
    precio_total_contrato = 3500.00
    monto_abono_inicial = 1000.00
    
    # 2. Actuar (Act)
    saldo_calculado = servicio.calcular_saldo_restante(
        precio_total=precio_total_contrato,
        monto_pagado=monto_abono_inicial
    )
    
    # 3. Verificar (Assert)
    assert saldo_calculado == 2500.00
```

---

## 5. MANEJO DE EXCEPCIONES Y RESPUESTAS HTTP

* **Cero excepciones genéricas:** No usar `except Exception: pass`.
* **Respuestas estandarizadas:** Todas las excepciones de la API deben devolver un esquema JSON uniforme:
```json
{
  "codigo_estado_http": 400,
  "mensaje_error": "El grado académico del asesor (Licenciado) es inferior al grado al que postula el tesista (Maestría).",
  "codigo_interno_error": "ERROR_GRADO_ACADEMICO_INSUFICIENTE",
  "marca_de_tiempo": "2026-08-22T13:30:00Z"
}
```

---

## 6. REGLAS DE NEGOCIO CRÍTICAS QUE EL AGENTE DEBE RESPETAR SIEMPRE

1. **Principio de Expediente Único:** Toda entidad creada (tesis, contrato, cuota, caso legal, consultoría) **debe** tener una clave foránea `expediente_id` vinculada a la tabla `expedientes`.
2. **Prohibición de Autoregistro Público de Clientes:** Ningún endpoint público debe permitir crear usuarios con rol `ROLE_CLIENT` directamente sin que exista previamente un expediente en estado `GANADO` o contrato registrado.
3. **Restricción de Casos Legales:** El módulo legal valida que la rama del caso sea exclusivamente `Civil`, `Familiar`, `Laboral` o `Empresarial`. Cualquier intento de registrar casos `Penales` debe ser rechazado automáticamente por el backend.
4. **Sin RAG de embeddings en el chatbot:** CEITO responde una sola vez con el prompt experto y luego deriva siempre al asesor de ventas; no genera embeddings ni consulta bases vectoriales por mensaje. Hoy el producto **no usa `pgvector` en ninguna tabla**. Si en el futuro se añade búsqueda semántica, el modelo será **Gemini Embedding 2** (`gemini-embedding-2`) con `output_dimensionality=768` y la columna `vector(768)`; queda prohibido mezclar dimensiones o modelos en una misma columna, y ningún vector puede quedar como dato simulado, de relleno o generado por hash.
5. **No Placeholders:** Todo código generado debe ser funcional, completo, tipado con type hints de Python (`typing`) y validado con Pydantic V2.

---

## 7. POLÍTICA DE VERSIONADO OBLIGATORIA (WEB, PORTAL Y BACKOFFICE)

El proyecto tiene **tres productos visibles**, cada uno con su propia versión y su propia **fuente única de verdad**. Los tres comparten el mismo formato: `VX.YY`.

> **Prevalencia:** esta sección sustituye el esquema de versionado antiguo que aún figura en `REGLAS.md` §3 (`VERSION_WEB` semver y `.pie-version` en 7 páginas). Ver Anexo A.

| Producto | Dónde se ve la insignia | Fuente única de verdad | Versión inicial |
| :--- | :--- | :--- | :--- |
| **Sitio web corporativo** (`Web_GRUPO_CEA`) | Pie de página de todas las secciones | `js/version.js` → `VERSION_SITIO` | `V1.01` |
| **Portal del Cliente** (`portal.gruposeaperu.com`) | Pie del portal | `portal_front/src/version.js` → `VERSION_PORTAL` | `V0.01` |
| **Backoffice** (ERP interno) | Pie del sidebar | `frontend/src/version.js` → `VERSION_BACKOFFICE` | `V0.01` |

### 7.1 Formato e incremento

1. **Formato único:** `VX.YY`, siempre con letra `V` delante y segundo componente de **dos dígitos**: `V0.01`, `V0.02`, `V1.09`, `V1.10`. Nunca `V1.1` ni `V01.1`.
2. **Incremento de 0.01:** cada despliegue o cambio funcional suma **0.01** en el segundo componente: `V0.01` → `V0.02` → `V0.03`.
3. **El número mayor solo cambia** cuando el usuario lo indique de forma explícita.
4. **Solo se incrementa el producto afectado.** Un cambio del backoffice no obliga a subir la web, ni al revés.
5. **El versionado sigue a la capa de DISEÑO, no a la de contenido.** `VERSION_SITIO` cuenta los despliegues del diseño del sitio (páginas, CSS, JS, plantillas). **Publicar o despublicar una noticia desde el módulo Contenido web NO incrementa `VERSION_SITIO`**: esa publicación no crea commit, no toca `js/version.js` y no es un cambio de diseño. Su trazabilidad es la fecha de la noticia y el registro de publicaciones en la base de datos. Esta regla existe para que el versionado siga significando "cómo se ve el sitio", y no "cuántas noticias se han publicado".

### 7.2 Fuente única de verdad (prohibido duplicar el número)

- **Prohibido** escribir el número de versión a mano en cualquier otro archivo: HTML, JS, JSX, JSON o Markdown.
- **Web:** todas las páginas llevan el span **vacío** `<span class="pie-version"></span>` y cargan `js/version.js` con `defer`; el script rellena la insignia. Toda página nueva debe copiar ese patrón. Desde `noticias/` y `plantillas/` la ruta del script lleva el prefijo `../` (`../js/version.js`). **Nunca** escribir `V1.01` dentro de un HTML.
- **Portal:** la insignia la pinta `componentes/diseno/CascaronPortal.jsx` importando `VERSION_PORTAL`.
- **Backoffice:** la insignia la pinta `components/layout/BackofficeLayout.jsx` importando `VERSION_BACKOFFICE`.
- **`package.json`:** al ser paquetes privados, su campo `version` solo replica los mismos números en semver: `V0.01` → `0.1.0`, `V1.01` → `1.1.0`.

### 7.3 Trazabilidad en el commit

Todo commit que despliegue un cambio funcional debe **incrementar la versión** del producto afectado y **mencionarla en el mensaje**:

```
feat(compras): nuevo cuadro de compromisos — VERSION_BACKOFFICE 0.02
feat(portada): carrusel de convenios — VERSION_SITIO 1.02
fix(mensajes): adjuntos de imagen en el chat — VERSION_PORTAL 0.02
```

Si el commit toca **varios productos**, se incrementa cada uno y se mencionan todos en el mensaje.

**Excepción — publicaciones del módulo Contenido web.** El commit automático que publica una noticia (`feat(web): publica la noticia «…»`) es la única excepción: **no incrementa `VERSION_SITIO` ni la menciona en el mensaje**, porque la noticia es contenido, no diseño (ver §7.1.5). Ese camino no usa git en producción: publica directamente en el Worker de Cloudflare.

### 7.4 Historial anterior

Antes de este esquema unificado, el backoffice seguía una numeración semántica de tres segmentos (`1.6.0` … `1.10.1`) y el portal otra (`1.1.0`, `1.2.0`). Ese historial queda archivado en el historial de Git; no se reutilizan esos números.

---

## 8. POLÍTICA DE GIT Y DESPLIEGUE

1. **Prohibido subir sin permiso explícito.** No ejecutar `git add`, `git commit`, `git push`, `git merge` ni `git rebase` hasta que el usuario lo pida de forma expresa. Sí se permite inspección (`git status`, `git diff`, `git log`, `git branch`).
2. **Rama de trabajo:** el nombre de la rama es el **resumen del cambio que lleva**, no la fecha ni el responsable. Formato `tipo/resumen-corto`, creada desde `main` **antes** de tocar código:
   * `tipo` ∈ `feat` (funcionalidad), `fix` (corrección), `chore` (mantenimiento), `docs` (documentación), `refactor`.
   * `resumen-corto`: 2 a 5 palabras en kebab-case, en español, sin acentos ni ñ.
   * Ejemplos correctos: `feat/licencias-gestion-empresarial`, `fix/chat-adjuntos-r2`, `docs/regla-nombres-de-rama`. Ejemplos incorrectos: `2026-09-26-Christian-Mora`, `cambios`, `prueba1`.
3. **Ciclo de vida de la rama:** una vez fusionada en `main`, la rama se elimina —local y remota— para que el repositorio quede únicamente con `main`.
4. **Orden obligatorio al desplegar:** incrementar la versión del producto afectado → verificar que la insignia se ve en la interfaz → revisar `git status` / `git diff` → commit con la versión en el mensaje → push solo si el usuario lo pidió.

---

## 9. POLÍTICA DE RETENCIÓN Y CONTROL DE COSTOS EN GOOGLE CLOUD RUN (MÁXIMO 2 REVISIONES)

Para garantizar la optimización presupuestaria y evitar cobros por almacenamiento excesivo de contenedores en Google Cloud (Artifact Registry / Container Registry):

1. **Límite Estricto de 2 Revisiones:** En Google Cloud Run solo deben existir **como máximo 2 revisiones/imágenes activas** (la actual en producción y la inmediata anterior de respaldo ante un rollback).
2. **Eliminación Automática Post-Deploy:** Todo script o pipeline de despliegue (`APP_BACKOFFICE/Cea_proyecto/desplegar_backend.ps1`) debe:
   * Desplegar el servicio (`cea-crm-backend`, región `southamerica-east1`, proyecto `cea-group-sistema`).
   * Listar las revisiones ordenadas por fecha de creación (`--sort-by="~creationTimestamp"`).
   * Eliminar de forma automática cualquier revisión sobrante que exceda las 2 más recientes (`Select-Object -Skip 2 | gcloud run revisions delete`).
3. **Límites de Recursos y Costo Cero en Reposo:** Configurar las instancias con `--min-instances 0` (0 instancias activas cuando nadie habla, eliminando costos fijos 24/7 y garantizando costo S/ 0.00 en reposo), `--max-instances 5` (escalando dinámicamente hasta 5 instancias en paralelo cuando sea necesario), `--concurrency 10`, `--cpu-throttling`, `--memory 1Gi`, `--cpu 1`. Con `--set-env-vars "BD_POOL_TAMANO=1,BD_POOL_EXCESO=0"` (1 conexión por instancia, 5 en total) se respeta holgadamente el tope de 15 del pooler Supabase en modo sesión.

---

## 10. POLÍTICA DE PUBLICACIÓN DEL APK DEL PORTAL (distribución directa fuera del Play Store)

La APK `pe.grupocea.portal` se distribuye directamente a los clientes (sin Google Play por ahora). El flujo completo para publicar una versión nueva es:

1. **Generar el APK en el proyecto Android** (`APP_BACKOFFICE/app_portal_android`):
   ```powershell
   cd APP_BACKOFFICE\app_portal_android
   .\gradlew.bat assembleRelease
   ```
   Copiar `app\build\outputs\apk\release\app-release.apk` con el nombre de distribución (`GROUP-CEA-Portal-v<MAJOR>.<MINOR>-release.apk`, p. ej. `GROUP-CEA-Portal-v1.3-release.apk`) junto a la raíz del proyecto (ignorado por git).

2. **Subir la clave {MAJOR}[.<MINOR>] es parte de la versión del APK, NO del portal.** La APK lleva su propia numeración (`versionName` / `versionCode` monotonico creciente: 1.1 → 2, 1.2 → 3, 1.3 → 4...). Nunca se reutiliza un `versionCode`: Android rechaza instalar APKs con código igual o menor.

3. **Alojar el APK en el bucket público R2** para descarga directa. Prefijo `apk/` en el bucket público (`cea-media-publica`), servido vía `media.grupoceaperu.com/apk/…`.
   ```powershell
   py <script_subida> <archivo-apk>
   ```
   Verificar que responda HTTP 200 con `Content-Type: application/vnd.android.package-archive` (p. ej. con `Invoke-WebRequest -Method Head`).

4. **Actualizar `/app-update.json`** en el portal (`portal_front/public/app-update.json`) con `latest` (versión mostrada), `url` (enlace directo al APK en R2) y `notas` (cambios relevantes). Ese archivo lo sirve Pages como archivo estático y la APK lo consulta **solo dentro de la app nativa** para avisar de una actualización disponible con un botón "Actualizar" y un "Recordar más tarde" (el aviso se puede silenciar hasta la siguiente versión publicada; NO bloquea el uso). El navegador no ve este aviso: solo el puente `window.PortalNativo` lo activa.

5. **Publicar el portal** (incrementar `VERSION_PORTAL` 0.01 y empujar a `main`; Cloudflare Pages despliega automáticamente).

6. **Commit + push + verificación** tal como en §8: versión mencionada en el mensaje, `main` como única rama, deploy backend (`desplegar_backend.ps1`) si toca, y confirmar que `app-update.json` y el APK responden correctamente.

7. **Reinstalación del APK en los dispositivos** queda fuera del ciclo automatizado: Android reconoce el APK nuevo como actualización (misma firma, mismo paquete) y conserva la sesión y los datos locales. Basta tocar `Actualizar` desde el banner o reabrir el enlace de descarga.

**Reglas duras**

* La APK y el portal son productos distintos: cambios solo en el portal **no** obligan a publicar APK nuevo; cambios nativos (icono, permisos, WebView config, puente `PortalNativo`) **sí** obligan.
* Nunca se eliminan APK de descargas ni se mueven de ubicación: el enlace vive en `media.grupoceaperu.com/apk/` y debe mantenerse estable.
* El bucket público de APK solo contiene el APK y sus notas — ningún dato de clientes ni credenciales.

---

## ANEXO A — NOTAS DE UNIFICACIÓN (informativo, no normativo)

Este `AGENTS.md` unifica los cuatro documentos de reglas que existían dispersos:

| Documento original | Qué se incorporó |
|---|---|
| `Web_GRUPO_CEA/AGENTS.md` | Base comparativa; se conservaron sus reglas que no contradecían a la versión del backoffice. |
| `CEA-GROUP-SISTEMA-INTEGRAL/AGENTS.md` | **Fuente base** (versión más reciente y completa). |
| `Web_GRUPO_CEA/REGLAS.md` | §2 "Descargas: conflictos y reemplazo" (ahora §2.2) y el prefijo `../` de `js/version.js` (ahora §7.2). |
| `CEA-GROUP-SISTEMA-INTEGRAL/REGLAS.md` | §2 "Descargas: conflictos y reemplazo" (ahora §2.2). |

### Reglas descartadas al resolver contradicciones

| Tema | Regla descartada | Procedencia | Regla vigente |
|---|---|---|---|
| Nombres de rama | `AAAA-MM-DD-<RESPONSABLE>` (p. ej. `2026-09-26-Christian-Mora`) | `Web_GRUPO_CEA/AGENTS.md` §8.2 | §8.2: `tipo/resumen-corto` en kebab-case, español, sin acentos ni ñ. |
| Recursos de Cloud Run | `--max-instances 2`, `--memory 512Mi` | `Web_GRUPO_CEA/AGENTS.md` §9.3 | §9.3: `--max-instances 5`, `--memory 1Gi`, `--concurrency 10`, `--cpu-throttling`. |
| Embeddings / RAG | `pgvector` activo en `rag_embeddings`, `vector(768)` con **Gemma Embedding 2** | `Web_GRUPO_CEA/AGENTS.md` §6.4 | §6.4: el producto **no usa pgvector**; si se añade búsqueda semántica, **Gemini Embedding 2** con `output_dimensionality=768`. |
| Esquema de versionado antiguo | `VERSION_WEB` semver en `frontend/src/version.js` y `.pie-version` en 7 páginas HTML (`V1.4` → `V1.5`) | `CEA-GROUP-SISTEMA-INTEGRAL/REGLAS.md` §3 | §7: `VERSION_SITIO` / `VERSION_PORTAL` / `VERSION_BACKOFFICE` con formato `VX.YY` y fuente única de verdad. |

Los archivos `REGLAS.md` se conservan sin modificar, pero donde contradigan a este documento prevalece `AGENTS.md`. En particular, el §3 de `CEA-GROUP-SISTEMA-INTEGRAL/REGLAS.md` describe un esquema de versionado obsoleto y debe considerarse sustituido por la sección 7 de este archivo.
