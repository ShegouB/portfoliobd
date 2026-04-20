const {
  Document, Packer, Paragraph, TextRun, HeadingLevel,
  AlignmentType, BorderStyle, ShadingType, Table, TableRow,
  TableCell, WidthType, LevelFormat
} = require('docx');
const fs = require('fs');

const CYAN = '00B0D8';
const GREEN = '00C060';
const DARK = '0D1117';
const LIGHT_BG = 'EEF6FA';
const BORDER_COLOR = '30363D';

function h1(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 400, after: 160 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: CYAN, space: 6 } },
    children: [new TextRun({ text, font: 'Arial', size: 36, bold: true, color: DARK })]
  });
}

function h2(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 320, after: 120 },
    children: [new TextRun({ text, font: 'Arial', size: 28, bold: true, color: '0070A0' })]
  });
}

function h3(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_3,
    spacing: { before: 240, after: 80 },
    children: [new TextRun({ text, font: 'Arial', size: 24, bold: true, color: '004070' })]
  });
}

function para(text, opts = {}) {
  return new Paragraph({
    spacing: { before: 80, after: 80 },
    children: [new TextRun({ text, font: 'Arial', size: 20, color: '1A1A2E', ...opts })]
  });
}

function code(text) {
  return new Paragraph({
    spacing: { before: 60, after: 60 },
    indent: { left: 480 },
    shading: { fill: '1E2A30', type: ShadingType.CLEAR },
    border: { left: { style: BorderStyle.SINGLE, size: 6, color: CYAN } },
    children: [new TextRun({ text, font: 'Courier New', size: 18, color: '00E5FF' })]
  });
}

function tip(text) {
  return new Paragraph({
    spacing: { before: 100, after: 100 },
    indent: { left: 360 },
    shading: { fill: 'E8F8F0', type: ShadingType.CLEAR },
    border: { left: { style: BorderStyle.SINGLE, size: 6, color: GREEN } },
    children: [new TextRun({ text: '💡 ' + text, font: 'Arial', size: 19, color: '1A1A2E', italics: true })]
  });
}

function warn(text) {
  return new Paragraph({
    spacing: { before: 100, after: 100 },
    indent: { left: 360 },
    shading: { fill: 'FFF3CD', type: ShadingType.CLEAR },
    border: { left: { style: BorderStyle.SINGLE, size: 6, color: 'E0A000' } },
    children: [new TextRun({ text: '⚠️ ' + text, font: 'Arial', size: 19, color: '1A1A2E', bold: true })]
  });
}

function bullet(text, bold_part = '') {
  return new Paragraph({
    numbering: { reference: 'bullets', level: 0 },
    spacing: { before: 50, after: 50 },
    children: bold_part
      ? [
          new TextRun({ text: bold_part, font: 'Arial', size: 19, bold: true, color: '1A1A2E' }),
          new TextRun({ text: ' ' + text, font: 'Arial', size: 19, color: '1A1A2E' }),
        ]
      : [new TextRun({ text, font: 'Arial', size: 19, color: '1A1A2E' })]
  });
}

function step(n, text) {
  return new Paragraph({
    numbering: { reference: 'steps', level: 0 },
    spacing: { before: 60, after: 60 },
    children: [new TextRun({ text, font: 'Arial', size: 20, color: '1A1A2E' })]
  });
}

function spacer() {
  return new Paragraph({ spacing: { before: 60, after: 60 }, children: [new TextRun('')] });
}

// ─── Tableau Notion colonnes ───────────────────────────────────
function notionTable() {
  const border = { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' };
  const borders = { top: border, bottom: border, left: border, right: border };
  const header = (t) => new TableCell({
    borders, width: { size: 2200, type: WidthType.DXA },
    shading: { fill: '1A3A4A', type: ShadingType.CLEAR },
    margins: { top: 80, bottom: 80, left: 120, right: 120 },
    children: [new Paragraph({ children: [new TextRun({ text: t, font: 'Arial', size: 18, bold: true, color: 'FFFFFF' })] })]
  });
  const cell = (t, color = '1A1A2E') => new TableCell({
    borders, width: { size: 2200, type: WidthType.DXA },
    margins: { top: 80, bottom: 80, left: 120, right: 120 },
    children: [new Paragraph({ children: [new TextRun({ text: t, font: 'Arial', size: 18, color })] })]
  });

  const rows = [
    ['Name', 'title', 'Titre du projet', 'Obligatoire'],
    ['Description', 'rich_text', 'Description courte', 'Obligatoire'],
    ['Category', 'select', 'IA / Bio / IoT / Web', 'Obligatoire'],
    ['Tags', 'multi_select', 'Python, TensorFlow...', 'Recommandé'],
    ['Metric', 'rich_text', '"94.74% précision"', 'Optionnel'],
    ['GitHub', 'url', 'URL du dépôt GitHub', 'Recommandé'],
    ['Demo', 'url', 'URL de la démo live', 'Optionnel'],
    ['Image', 'files', 'Image d\'illustration', 'Optionnel'],
    ['Featured', 'checkbox', 'Projet mis en avant', 'Optionnel'],
    ['Date', 'date', 'Date du projet', 'Recommandé'],
    ['Status', 'select', '"Published" pour publier', 'Obligatoire'],
  ];

  return new Table({
    width: { size: 8800, type: WidthType.DXA },
    columnWidths: [2200, 2200, 2200, 2200],
    rows: [
      new TableRow({ children: [header('Colonne Notion'), header('Type'), header('Exemple'), header('Requis')] }),
      ...rows.map(([col, type, ex, req]) => new TableRow({
        children: [cell(col, '0070A0'), cell(type, '555555'), cell(ex), cell(req, req === 'Obligatoire' ? 'C00000' : req === 'Recommandé' ? '007000' : '888888')]
      }))
    ]
  });
}

const doc = new Document({
  numbering: {
    config: [
      { reference: 'bullets', levels: [{ level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 480, hanging: 240 } } } }] },
      { reference: 'steps', levels: [{ level: 0, format: LevelFormat.DECIMAL, text: '%1.', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 480, hanging: 240 } } } }] },
    ]
  },
  styles: {
    default: { document: { run: { font: 'Arial', size: 20 } } },
    paragraphStyles: [
      { id: 'Heading1', name: 'Heading 1', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { size: 36, bold: true, font: 'Arial', color: DARK }, paragraph: { spacing: { before: 400, after: 160 }, outlineLevel: 0 } },
      { id: 'Heading2', name: 'Heading 2', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { size: 28, bold: true, font: 'Arial', color: '0070A0' }, paragraph: { spacing: { before: 320, after: 120 }, outlineLevel: 1 } },
      { id: 'Heading3', name: 'Heading 3', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { size: 24, bold: true, font: 'Arial', color: '004070' }, paragraph: { spacing: { before: 240, after: 80 }, outlineLevel: 2 } },
    ]
  },
  sections: [{
    properties: { page: { size: { width: 11906, height: 16838 }, margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } } },
    children: [

      // ── TITRE ──────────────────────────────────────────────
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 200, after: 80 },
        shading: { fill: '0D1117', type: ShadingType.CLEAR },
        children: [new TextRun({ text: 'PORTFOLIO BORIS DJAGOU', font: 'Arial', size: 44, bold: true, color: '00E5FF' })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 0, after: 80 },
        children: [new TextRun({ text: 'Guide Complet de Déploiement — Next.js + Notion + EmailJS + Vercel', font: 'Arial', size: 22, color: '8B949E', italics: true })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 0, after: 400 },
        children: [new TextRun({ text: 'Avril 2026  ·  @ShegouB', font: 'Arial', size: 18, color: 'AAAAAA' })]
      }),

      // ── PHASE 1 : CONFIGURATION ────────────────────────────
      h1('Phase 1 — Configuration du projet (Jour 1)'),

      h2('1.1  Prérequis à installer'),
      para('Avant de commencer, assure-toi d\'avoir installé ces outils sur ton PC :'),
      bullet('Node.js v18 ou plus récent', 'Node.js :'), para('  → Télécharge sur https://nodejs.org (prends la version LTS)'),
      bullet('Git', 'Git :'), para('  → Télécharge sur https://git-scm.com'),
      bullet('VS Code (éditeur recommandé)', 'VS Code :'), para('  → Télécharge sur https://code.visualstudio.com'),
      spacer(),
      para('Vérifie l\'installation en ouvrant un terminal et en tapant :'),
      code('node --version   # Doit afficher v18.x.x ou plus'),
      code('npm --version    # Doit afficher 9.x.x ou plus'),
      code('git --version    # Doit afficher git version 2.x.x'),

      h2('1.2  Créer le dépôt GitHub'),
      step(1, 'Va sur https://github.com et connecte-toi à ton compte (@ShegouB)'),
      step(2, 'Clique sur "New repository"'),
      step(3, 'Nomme le dépôt : portfolio (ou boris-djagou-portfolio)'),
      step(4, 'Laisse-le en "Public" et clique "Create repository"'),
      step(5, 'Note l\'URL du dépôt, par exemple : https://github.com/ShegouB/portfolio'),

      h2('1.3  Copier et initialiser le code'),
      para('Ouvre un terminal dans le dossier où tu veux travailler, puis :'),
      code('# Copie le dossier du projet dans ton répertoire de travail'),
      code('# (le code complet t\'a été fourni dans le fichier ZIP)'),
      code(''),
      code('# Entre dans le dossier'),
      code('cd portfolio-boris'),
      code(''),
      code('# Installe toutes les dépendances'),
      code('npm install'),
      code(''),
      code('# Initialise Git et pousse le code sur GitHub'),
      code('git init'),
      code('git add .'),
      code('git commit -m "Initial commit — Portfolio Boris Djagou"'),
      code('git branch -M main'),
      code('git remote add origin https://github.com/ShegouB/portfolio.git'),
      code('git push -u origin main'),
      tip('Si git push demande un login, utilise ton nom d\'utilisateur GitHub et un "Personal Access Token" (pas ton mot de passe). Crée-le sur github.com/settings/tokens.'),

      // ── PHASE 2 : NOTION ──────────────────────────────────
      h1('Phase 2 — Configuration de Notion (1h)'),

      h2('2.1  Créer la base de données "Portfolio_Projets"'),
      step(1, 'Ouvre Notion et crée une nouvelle page. Nomme-la "Portfolio_Projets".'),
      step(2, 'Clique sur "/" et choisis "Database — Full page" pour créer une base de données.'),
      step(3, 'Ajoute les colonnes suivantes (types précis à respecter) :'),
      spacer(),
      notionTable(),
      spacer(),
      tip('Pour la colonne "Category", les valeurs du select DOIVENT être exactement : "Intelligence Artificielle", "Bio-informatique", "IoT / Embarqué", "Web Full-Stack"'),
      spacer(),
      step(4, 'Ajoute tes 8 projets dans la base avec le Status = "Published" pour les afficher.'),

      h2('2.2  Créer une intégration Notion'),
      step(1, 'Va sur https://www.notion.so/my-integrations'),
      step(2, 'Clique "New integration"'),
      step(3, 'Nomme-la "Portfolio Website" et sélectionne ton workspace'),
      step(4, 'Dans les permissions, coche : "Read content" (pas besoin de write)'),
      step(5, 'Clique "Submit" puis copie le "Internal Integration Token"'),
      warn('Ce token est une clé secrète ! Ne le partage JAMAIS, ne le mets JAMAIS dans un fichier commité sur GitHub.'),

      h2('2.3  Connecter la base de données à l\'intégration'),
      step(1, 'Ouvre ta base de données "Portfolio_Projets" dans Notion'),
      step(2, 'Clique sur "..." (les 3 points) en haut à droite'),
      step(3, 'Clique "Add connections" et sélectionne "Portfolio Website"'),
      step(4, 'Copie l\'ID de la base depuis l\'URL : notion.so/{workspace}/{DATABASE_ID}?v=...'),
      tip('L\'ID de la base est la partie de 32 caractères (lettres et chiffres) dans l\'URL, avant le "?v=".'),

      h2('2.4  Créer le fichier .env.local'),
      para('Dans le dossier de ton projet, crée un fichier nommé ".env.local" et remplis-le :'),
      code('# Copie le fichier .env.example et renomme-le .env.local'),
      code('cp .env.example .env.local'),
      spacer(),
      para('Puis ouvre .env.local et remplace les valeurs :'),
      code('NOTION_API_KEY=secret_XXXX...  # Ton token Notion'),
      code('NOTION_PROJECTS_DB_ID=XXXX...  # L\'ID de ta base projets'),
      code('NOTION_BLOG_DB_ID=XXXX...      # L\'ID de ta base blog (optionnel)'),

      // ── PHASE 3 : EMAILJS ─────────────────────────────────
      h1('Phase 3 — Configuration d\'EmailJS (30 min)'),

      h2('3.1  Créer un compte EmailJS'),
      step(1, 'Va sur https://www.emailjs.com et crée un compte gratuit'),
      step(2, 'Le plan gratuit permet 200 emails/mois — suffisant pour commencer'),

      h2('3.2  Configurer le service email'),
      step(1, 'Dans le dashboard EmailJS, va dans "Email Services"'),
      step(2, 'Clique "Add New Service" et choisis "Gmail"'),
      step(3, 'Connecte ton compte djagouboris@gmail.com'),
      step(4, 'Note le "Service ID" (format : service_xxxxxxx)'),

      h2('3.3  Créer le template d\'email'),
      step(1, 'Va dans "Email Templates" et clique "Create New Template"'),
      step(2, 'Configure le template ainsi :'),
      code('Subject : [Portfolio] {{subject}}'),
      code(''),
      code('From    : {{from_name}} <{{from_email}}>'),
      code('To      : djagouboris@gmail.com'),
      code(''),
      code('Body    :'),
      code('Nouveau message depuis ton portfolio !'),
      code(''),
      code('Nom    : {{from_name}}'),
      code('Email  : {{from_email}}'),
      code('Sujet  : {{subject}}'),
      code(''),
      code('Message :'),
      code('{{message}}'),
      step(3, 'Clique "Save" et note le "Template ID" (format : template_xxxxxxx)'),

      h2('3.4  Récupérer la clé publique'),
      step(1, 'Va dans "Account" > "API Keys"'),
      step(2, 'Copie la "Public Key"'),
      step(3, 'Ajoute ces 3 valeurs dans ton .env.local :'),
      code('NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_xxxxxxx'),
      code('NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xxxxxxx'),
      code('NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=XXXXXXXXXXXXXXXXXXXXXXX'),

      // ── PHASE 4 : TEST LOCAL ──────────────────────────────
      h1('Phase 4 — Test en local (Jour 2)'),

      h2('4.1  Lancer le serveur de développement'),
      code('# Dans le terminal, dans le dossier du projet'),
      code('npm run dev'),
      spacer(),
      para('Ouvre ton navigateur sur : http://localhost:3000'),
      para('Tu dois voir ton portfolio avec les projets chargés depuis Notion !'),
      tip('Si les projets n\'apparaissent pas, vérifie que .env.local est bien configuré et que ta base Notion est bien connectée à l\'intégration.'),

      h2('4.2  Vérifications à faire'),
      bullet('Le réseau de particules s\'anime en arrière-plan'),
      bullet('Le texte "Je suis..." change automatiquement (typewriter)'),
      bullet('Les 3 statistiques (94.74%, 803e, 30+) s\'affichent'),
      bullet('Les filtres de projets fonctionnent (Tous / IA / Bio / IoT / Web)'),
      bullet('Les projets correspondent à ceux dans Notion'),
      bullet('Le formulaire de contact envoie un email (test avec ta propre adresse)'),
      bullet('Le site est responsive sur mobile (F12 > mode mobile dans Chrome)'),

      // ── PHASE 5 : DÉPLOIEMENT VERCEL ──────────────────────
      h1('Phase 5 — Déploiement sur Vercel (Jour 3)'),

      h2('5.1  Créer un compte Vercel'),
      step(1, 'Va sur https://vercel.com et clique "Sign Up"'),
      step(2, 'Choisis "Continue with GitHub" — Vercel se connecte directement à GitHub'),
      tip('Le plan gratuit de Vercel (Hobby) est parfait pour un portfolio personnel. Aucune carte bancaire requise.'),

      h2('5.2  Importer le projet'),
      step(1, 'Dans le dashboard Vercel, clique "Add New > Project"'),
      step(2, 'Sélectionne ton dépôt "portfolio" depuis GitHub'),
      step(3, 'Vercel détecte automatiquement que c\'est un projet Next.js'),
      step(4, 'NE PAS encore cliquer "Deploy" — il faut d\'abord configurer les variables d\'environnement'),

      h2('5.3  Configurer les variables d\'environnement sur Vercel'),
      para('C\'est l\'étape la plus importante ! Dans la page de configuration du projet sur Vercel :'),
      step(1, 'Clique sur "Environment Variables"'),
      step(2, 'Ajoute CHAQUE variable de ton .env.local, une par une :'),
      spacer(),
      bullet('NOTION_API_KEY', ''), bullet('NOTION_PROJECTS_DB_ID', ''), bullet('NOTION_BLOG_DB_ID', ''),
      bullet('NEXT_PUBLIC_EMAILJS_SERVICE_ID', ''), bullet('NEXT_PUBLIC_EMAILJS_TEMPLATE_ID', ''), bullet('NEXT_PUBLIC_EMAILJS_PUBLIC_KEY', ''),
      bullet('NEXT_PUBLIC_SITE_URL (ex: https://borisdjagou.vercel.app)', ''),
      spacer(),
      warn('Ces variables ne doivent JAMAIS être dans ton code GitHub. Vercel les injecte de façon sécurisée au moment du build.'),
      step(3, 'Clique "Deploy" — Vercel va construire et déployer ton site en 2-3 minutes'),

      h2('5.4  Vérifier le déploiement'),
      para('Après le déploiement, Vercel te donne une URL du type : https://portfolio-shegouB.vercel.app'),
      para('Teste toutes les fonctionnalités sur cette URL comme tu l\'as fait en local.'),

      // ── PHASE 6 : NOM DE DOMAINE ──────────────────────────
      h1('Phase 6 — Nom de domaine personnalisé (Optionnel)'),

      h2('6.1  Acheter un nom de domaine'),
      para('Quelques options pour acheter un domaine :'),
      bullet('Namecheap.com — environ 10-15$/an pour .dev ou .com'),
      bullet('Cloudflare Registrar — prix coûtant, très recommandé'),
      bullet('Google Domains — simple mais légèrement plus cher'),
      tip('Choisis borisdjagou.dev ou borisdjagou.com — ces extensions sont parfaites pour un portfolio tech.'),

      h2('6.2  Connecter le domaine à Vercel'),
      step(1, 'Dans le dashboard Vercel, va dans Settings > Domains'),
      step(2, 'Clique "Add" et entre ton domaine (ex: borisdjagou.dev)'),
      step(3, 'Vercel t\'affiche 2 enregistrements DNS à configurer'),
      step(4, 'Va sur ton registrar (Namecheap, etc.) > DNS settings'),
      step(5, 'Ajoute les enregistrements DNS indiqués par Vercel'),
      step(6, 'Attends 5-30 minutes pour la propagation DNS'),
      tip('Vercel configure automatiquement le certificat SSL (HTTPS) gratuit via Let\'s Encrypt.'),

      // ── WORKFLOW NOTION ────────────────────────────────────
      h1('Workflow quotidien — Ajouter un projet depuis Notion'),

      h2('Comment ajouter un nouveau projet au portfolio'),
      para('C\'est la magie du système Headless CMS ! Voici comment ajouter un hackathon ou une nouvelle certification :'),
      spacer(),
      step(1, 'Ouvre l\'application Notion sur ton téléphone ou PC'),
      step(2, 'Va dans la base de données "Portfolio_Projets"'),
      step(3, 'Clique "New" pour créer une nouvelle ligne'),
      step(4, 'Remplis le titre, la description, la catégorie, les tags et la métrique'),
      step(5, 'Mets le Status à "Published"'),
      step(6, 'C\'est tout ! Le site se met à jour automatiquement dans les 60 secondes'),
      spacer(),
      tip('Le site utilise l\'ISR (Incremental Static Regeneration) de Next.js — il se régénère toutes les 60 secondes automatiquement, ou tu peux forcer une mise à jour via l\'endpoint /api/revalidate.'),
      warn('Si tu veux une mise à jour instantanée, tu peux appeler l\'API de revalidation : POST https://tonsite.vercel.app/api/revalidate avec le header Authorization: Bearer <REVALIDATE_SECRET>'),

      // ── TROUBLESHOOTING ────────────────────────────────────
      h1('Résolution de problèmes fréquents'),

      h2('Problème : Les projets n\'apparaissent pas'),
      bullet('Vérifie que NOTION_API_KEY est correctement définie dans .env.local'),
      bullet('Vérifie que la base de données est bien partagée avec l\'intégration Notion'),
      bullet('Vérifie que les projets ont bien Status = "Published"'),
      bullet('Vérifie que les noms de colonnes dans Notion correspondent exactement au code'),

      h2('Problème : Le formulaire de contact ne fonctionne pas'),
      bullet('Vérifie les 3 variables EMAILJS dans .env.local'),
      bullet('Vérifie que le Service Email est bien connecté dans EmailJS'),
      bullet('Test en mode développement — les emails doivent arriver dans djagouboris@gmail.com'),

      h2('Problème : Erreur de build sur Vercel'),
      bullet('Vérifie que toutes les variables d\'environnement sont configurées sur Vercel'),
      bullet('Lance npm run build en local pour reproduire l\'erreur'),
      bullet('Consulte les logs de build dans le dashboard Vercel'),

      h2('Problème : Le site est lent'),
      bullet('Normal au premier chargement (cold start serverless)'),
      bullet('L\'ISR met en cache les pages statiquement après le premier appel'),
      bullet('Considère upgrader Vercel Pro pour les Edge Functions si nécessaire'),

      // ── RÉCAP ─────────────────────────────────────────────
      h1('Récapitulatif — Checklist finale'),
      spacer(),
      bullet('[ ] Code téléchargé et npm install exécuté'),
      bullet('[ ] Dépôt GitHub créé et code poussé'),
      bullet('[ ] Base de données Notion "Portfolio_Projets" créée avec les bonnes colonnes'),
      bullet('[ ] Intégration Notion créée et connectée à la base'),
      bullet('[ ] Compte EmailJS créé avec Service + Template configurés'),
      bullet('[ ] Fichier .env.local rempli avec toutes les clés'),
      bullet('[ ] Test local réussi (npm run dev)'),
      bullet('[ ] Projet importé sur Vercel'),
      bullet('[ ] Variables d\'environnement configurées sur Vercel'),
      bullet('[ ] Déploiement réussi et site accessible en ligne'),
      bullet('[ ] (Optionnel) Nom de domaine personnalisé connecté'),
      spacer(), spacer(),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 200, after: 0 },
        children: [new TextRun({ text: '🚀 Bonne chance Boris ! — ShegouB Portfolio 2026', font: 'Arial', size: 22, bold: true, color: '0070A0', italics: true })]
      }),
    ]
  }]
});

Packer.toBuffer(doc).then(buf => {
  fs.writeFileSync('/home/claude/portfolio-boris/GUIDE_DEPLOIEMENT_PORTFOLIO.docx', buf);
  console.log('✅ Guide généré');
});
