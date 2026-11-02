# Pousada Cachoeira do Sol | Site completo

Site institucional com várias páginas, refeito a partir do site atual pousadacachoeiradosol.com.br.
Desenvolvido por **Malta Business** (https://maltabusiness.vercel.app/). HTML, CSS e JS puros, sem build, pronto para a Vercel.

## Estrutura

```
pousada-site/
├── index.html          Início (hero com fotos em arco, consulta rápida, destaques, lazer, faixa de fotos)
├── acomodacoes.html    8 suítes com carrossel de fotos + outras suítes + comodidades
├── day-use.html        Horário, o que inclui, atividades, como agendar e FAQ
├── cachoeira.html      A Cachoeira do Sol (hero com parallax, trilha de 400 m, galeria)
├── gastronomia.html    Cozinha, horários, regras de pedido e cardápio ampliável
├── galeria.html        32 fotos com filtro por ambiente e lightbox
├── como-chegar.html    Distâncias, passo a passo da rota, Google Maps e Waze
├── normas.html         Todas as normas da pousada, com índice lateral
├── reservas.html       Formulário que monta a mensagem e envia pelo WhatsApp
├── obrigado.html       Página após o envio do formulário (noindex)
├── 404.html            Página de erro personalizada (noindex)
├── favicon.svg / favicon.png
├── robots.txt / sitemap.xml / site.webmanifest
├── vercel.json         Redirects 301 das URLs antigas + headers
├── README.md
└── assets/
    ├── css/site.css
    ├── js/site.js
    └── img/            Fotos reais da pousada, logo, ícones e og-image
```

## Diferenças em relação à LP (pousada-cachoeira-do-sol)

A LP é uma página única escura e rápida, feita para conversão. O site é institucional e navegável:
visual claro (verde de mata e azul do poço), fotos em formato de arco lembrando o sol do logo,
uma página para cada assunto (melhor para SEO local), consulta rápida na home e transição suave entre páginas.

## Como publicar na Vercel

1. Suba a pasta em um repositório no GitHub ou arraste a pasta em vercel.com/new.
2. Framework Preset: **Other**. Sem build command; output directory = raiz.
3. Em Settings > Domains, aponte `www.pousadacachoeiradosol.com.br`.
4. As URLs antigas (`/quartos-pousada-cachoeira-do-sol.html`, `/day-use-pousada-cachoeira-do-sol-jaboticatubas.html` etc.) já redirecionam para as páginas novas pelo `vercel.json`.

## Pendências antes de publicar

- [ ] **GTM**: trocar `GTM-XXXXXXX` em todas as páginas (localizar e substituir na pasta). Enquanto estiver com X, o GTM não carrega.
- [ ] **Domínio**: canonical, Open Graph e sitemap usam `https://www.pousadacachoeiradosol.com.br/`. Se o domínio final mudar, substituir.
- [ ] **WhatsApp**: principal `(31) 97267-1559` (constante `WA` no topo do `site.js` e links do HTML). Segundo número `(31) 97167-1559`.
- [ ] **Confirmar com o cliente**: endereço "Faz das Lages" (usei "Fazenda das Lages"); se os números (31) 97219-2950 e (31) 99550-6514, citados só na página de normas antiga, ainda valem; e se o cardápio de 2020 continua atual (`assets/img/cardapio-1.jpg` e `cardapio-2.jpg`).

## Fonte do conteúdo

Todos os textos, normas, horários, suítes e itens vieram do site atual (home, acomodações, day use, cachoeira,
cardápio, localização e normas). Nada foi inventado: sem preços, depoimentos ou anos de mercado.
Fotos: as originais do site atual. A foto da academia do site antigo era de banco de imagens, então a academia aparece só em texto.

## Formulário

Sem Google Apps Script: monta a mensagem com todos os campos e abre o WhatsApp em nova aba; a aba atual vai para `obrigado.html`
(se o navegador bloquear a nova aba, a própria aba abre o WhatsApp). O botão nasce desabilitado e só libera com todos os
campos obrigatórios válidos. Os botões "Reservar esta suíte" e "Agendar Day Use" abrem o formulário já preenchido
(`reservas.html?suite=...` e `reservas.html?tipo=dayuse`).

## Eventos de rastreamento (dataLayer)

Todos levam o parâmetro `pagina`.

| Evento | Quando |
|---|---|
| `whatsapp_hero` | Botão de WhatsApp da home |
| `consulta_rapida` | Barra de consulta da home (param. `tipo_reserva`) |
| `whatsapp_suite` / `reservar_suite` | Botões de cada suíte |
| `whatsapp_dayuse` / `reservar_dayuse` | Botões do Day Use |
| `whatsapp_chamada` | Bloco de chamada no fim das páginas |
| `whatsapp_contato` / `whatsapp_contato_2` | Números na página de reservas |
| `whatsapp_flutuante` | Botão flutuante |
| `whatsapp_obrigado` | Botão da página de obrigado |
| `abrir_maps` / `abrir_waze` | Como chegar |
| `abrir_foto` | Lightbox (param. `grupo`) |
| `filtro_galeria` | Filtro da galeria (param. `categoria`) |
| `form_submit` | Envio do formulário (param. `tipo_reserva`) |
| `pagina_obrigado` | Carregou a página de obrigado |

## Checklist de SEO

- [x] Title e meta description únicos por página, com cidade e nicho
- [x] Canonical por página
- [x] Open Graph e Twitter Card em todas as páginas
- [x] JSON-LD: `LodgingBusiness` (início e como chegar), `FAQPage` (Day Use e normas), `BreadcrumbList` (páginas internas)
- [x] sitemap.xml com as 9 páginas indexáveis, robots.txt
- [x] site.webmanifest e ícones
- [x] width/height em todas as imagens e preload da foto principal
- [x] Um H1 por página, trilha de navegação, links internos entre as páginas
- [x] Redirects 301 das URLs antigas
- [x] 404 personalizada e página de obrigado (noindex)
- [x] `prefers-reduced-motion` respeitado, foco visível, conteúdo visível mesmo sem JavaScript
