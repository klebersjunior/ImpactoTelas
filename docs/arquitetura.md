## Documento de Arquitetura

### Visão Geral
- **Sistema**: `Pesquisa Digital`
- **Domínio**: Divulgação científica sobre impacto de telas e redes sociais em crianças e adolescentes.
- **Público-alvo**: Pais, educadores, formuladores de políticas e pesquisadores.
- **Artefatos principais**:
  - `website/`: aplicação web interativa construída em React.
  - `pesquisa/`: documentação científica em Markdown.
  - `apresentacoes/`: materiais de apoio para treinamentos e workshops.

### Objetivos Arquiteturais
- Entregar conteúdo científico de forma acessível e responsiva.
- Permitir evolução incremental do conteúdo sem exigir backend dedicado.
- Facilitar publicação estática (GitHub Pages, Vercel ou similar).
- Promover reuso de conteúdo entre website, relatórios e apresentações.

### Requisitos
- **Funcionais**:
  - Disponibilizar seções temáticas (`hero`, `overview`, `impacts`, `data`, `recommendations`, `sources`) com dados consolidados.
  - Permitir navegação fluida com destaque da seção ativa durante o scroll.
  - Exibir estatísticas chave e recomendações baseadas em evidências.
- **Não Funcionais**:
  - `Responsividade`: layout adaptável a dispositivos móveis e desktop.
  - `Performance`: assets estáticos otimizados via bundler (Vite).
  - `Observabilidade`: simplicidade de troubleshooting, dado que não há backend.
  - `Escalabilidade de conteúdo`: inclusão de novos dados via Markdown e componentes React.

### Stack Tecnológica
- **Frontend**: React 18 (SPA), hooks (`useState`, `useEffect`), ícones `lucide-react`.
- **UI Kit**: componentes reutilizáveis (botões, cards, tabs, alerts, badges) importados de `@/components/ui`.
- **Bundler**: Vite (referenciado por `index.html` via `/src/main.jsx`).
- **Dados**: conteúdo editorial em Markdown (`pesquisa/`) consumido manualmente para o front.
- **Controle de versão**: Git + GitHub.

### Estrutura de Pastas Relevante
- `website/index.html`: ponto de entrada, injeta `App.jsx`.
- `website/App.jsx`: define a SPA, seções e dados exibidos.
- `pesquisa/*.md`: fontes, análises e estudos que alimentam o conteúdo.
- `apresentacoes/google-family-link/*.html`: materiais de apoio.

### C4 - Nível 1 (Contexto)

```mermaid
C4Context
    title Nível 1 - Diagrama de Contexto
    Person(pais, "Pais e Cuidadores", "Buscam recomendações baseadas em evidências.")
    Person(educadores, "Educadores e Gestores", "Planejam políticas e formações.")
    Person(pesquisadores, "Pesquisadores", "Atualizam e validam o conteúdo científico.")

    System_Boundary(sistema, "Pesquisa Digital") {
        System(webapp, "Website Interativo", "SPA React que apresenta os achados e recomendações.")
        System(documentacao, "Documentação de Pesquisa", "Relatórios e fontes em Markdown.")
    }

    System_Ext(hosting, "Plataforma de Hospedagem", "GitHub Pages, Vercel ou serviço estático similar.")
    System_Ext(fontes, "Fontes Científicas Externas", "Relatórios de WHO, UNESCO, UNICEF, estudos acadêmicos.")

    Rel(pais, webapp, "Consomem conteúdo e recomendações.")
    Rel(educadores, webapp, "Planejam ações a partir dos dados apresentados.")
    Rel(pesquisadores, documentacao, "Mantêm e atualizam evidências.")
    Rel(webapp, documentacao, "Utiliza material consolidado como input editorial.")
    Rel(documentacao, fontes, "Cita e referencia os estudos originais.")
    Rel(webapp, hosting, "É publicado como assets estáticos.")
    Rel(hosting, pais, "Distribui conteúdo via navegador.")
```

### C4 - Nível 2 (Containers)

```mermaid
C4Container
    title Nível 2 - Diagrama de Containers
    Person(pais, "Pais e Cuidadores")
    Person(educadores, "Educadores e Gestores")
    Person(pesquisadores, "Pesquisadores")

    System_Boundary(pd, "Pesquisa Digital") {
        Container(spa, "Aplicação Web", "React + Vite", "Interface responsiva com dados, recomendações e navegação orientada a seções.")
        Container(repositorio, "Repositório de Pesquisa", "Markdown + Git", "Base de conhecimento versionada e editável pelos pesquisadores.")
        Container(build, "Pipeline de Build", "Vite CLI", "Transpila JSX, resolve dependências UI e gera bundle estático.")
    }

    Container_Ext(hosting, "Plataforma de Hospedagem", "Static Hosting", "Entrega HTML, JS e CSS via CDN.")

    Rel(pais, spa, "Navegam usando navegador (HTTP/HTTPS).")
    Rel(educadores, spa, "Exploram indicadores para ações pedagógicas.")
    Rel(pesquisadores, repositorio, "Criam e atualizam conteúdo científico.")
    Rel(spa, repositorio, "Consome conteúdo e estatísticas incorporadas manualmente.")
    Rel(build, spa, "Gera bundle otimizado.")
    Rel(build, hosting, "Publica artefatos estáticos.")
    Rel(hosting, pais, "Serve assets (HTTP/HTTPS).")
    Rel(hosting, educadores, "Serve assets (HTTP/HTTPS).")
```

### C4 - Nível 3 (Componentes da Aplicação Web)

```mermaid
C4Component
    title Nível 3 - Componentes da Aplicação Web
    Container_Boundary(spa, "Aplicação Web - React") {
        Component(app, "App", "React FC", "Componente raiz que orquestra layout, seções e estado global.")
        Component(navbar, "Navigation & Menu", "React Hooks + lucide-react", "Controla menu responsivo, toggles e destaque da seção ativa.")
        Component(sections, "Section Builder", "React JSX", "Renderiza blocos temáticos (Visão Geral, Impactos, Dados, Recomendações, Fontes).")
        Component(impactData, "Data Model", "Objetos JS Imutáveis", "Lista indicadores e estatísticas exibidas nas seções.")
        Component(uiKit, "UI Library Wrapper", "Componentes de UI reutilizáveis", "Botões, cards, badges, tabs, alerts e progress bars.")
        Component(scrollBehavior, "Scroll Sync", "useEffect + DOM APIs", "Observa rolagem e sincroniza `activeSection`.")
    }

    Rel(app, navbar, "Configura e renderiza.")
    Rel(app, sections, "Coordenada renderização das seções.")
    Rel(app, scrollBehavior, "Inicializa efeito de scroll.")
    Rel(navbar, scrollBehavior, "Atualiza estado ao interagir.")
    Rel(sections, uiKit, "Compoem interface com componentes reutilizáveis.")
    Rel(sections, impactData, "Itera sobre dados para cards e estatísticas.")
```

### Decisões Arquiteturais Notáveis (ADR)
- **SPA estática**: elimina necessidade de backend, facilita hospedagem gratuita. Impacto: dependência do conteúdo ser acoplado ao código.
- **Dados embeddings no código**: simplifica build inicial; plano futuro é automatizar ingestão dos arquivos Markdown.
- **UI padronizada**: uso de componentes UI dedicados melhora consistência visual, mas exige importação correta (ausentes no repositório atual).
- **Estratégia de publicação**: build Vite + deploy automático via GitHub Actions (a ser configurado) garante atualização contínua.

### Riscos e Mitigações
- **Dependências UI externas ausentes** (`@/components/ui`): documentar origem e incluir submódulo ou pacote antes do próximo deploy.
- **Fonte de dados manual**: risco de inconsistência entre Markdown e SPA; mitigar com scripts de sincronização.
- **Acessibilidade**: elementos visuais ricos precisam de verificação de contraste e navegação por teclado.
- **Escalabilidade de conteúdo**: seções monolíticas em `App.jsx` podem se tornar difíceis de manter; modularização futura recomendada.

### Próximos Passos Técnicos
- Configurar pipeline de CI/CD com lint, testes básicos de renderização e deploy estático.
- Extrair cada seção de `App.jsx` para componentes dedicados (`HeroSection`, `OverviewSection`, etc.).
- Automatizar ingestão de dados a partir dos arquivos `pesquisa/*.md` (build-time parsing).
- Adicionar testes de interface (Playwright ou Testing Library) para validar navegação e exibição de métricas.
- Incorporar métricas de acessibilidade (Lighthouse, axe-core) e analytics anônimos.
