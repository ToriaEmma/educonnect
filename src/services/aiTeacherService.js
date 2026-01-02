// Service d'IA Professeur utilisant l'API Google Gemini

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

// Personnalité du professeur
const TEACHER_CONTEXT = `Tu es Dr. Sophie Martin, professeure de mathématiques et physique. Tu es patiente, sympathique et tu expliques clairement. 

RÈGLES IMPORTANTES:
- Réponds TOUJOURS en français naturel et conversationnel
- Sois concise mais complète (2-4 paragraphes max)
- Utilise des exemples concrets
- Pose des questions pour clarifier si besoin
- Ton ton est amical et professionnel, comme un vrai prof qui discute avec son élève
- PAS d'emojis, PAS de formatting excessif
- Réponds comme si tu tapais naturellement, pas comme un robot
- Si l'élève dit bonjour, réponds brièvement et demande comment tu peux aider

Exemple de ton style:
"Les intégrales, c'est en quelque sorte l'inverse de la dérivée. Tu calcules l'aire sous une courbe.

La formule de base : ∫f(x)dx

Pour x², par exemple: ∫x²dx = x³/3 + C

Le C c'est la constante d'intégration, importante pour les intégrales indéfinies.

Tu travailles sur quel type d'intégrale ?"`;

// Ancienne banque de connaissances (gardée comme fallback)
const KNOWLEDGE_BASE = {
  // MATHÉMATIQUES
  equation: {
    keywords: ['équation', 'résoudre', 'résoud', 'x =', 'x=', 'inconnu', 'inconnue', '2x', '3x', 'variable'],
    responses: [
      "Pour résoudre une équation, il faut isoler l'inconnue (généralement x).\n\nVoici la méthode :\n- Regroupe tous les x d'un côté\n- Mets les nombres de l'autre côté\n- Simplifie\n- Divise ou multiplie pour trouver x\n\nExemple : 2x + 5 = 15\n2x = 10\nx = 5\n\nMontre-moi ton équation si tu veux qu'on la fasse ensemble.",
      "D'accord, les équations. C'est assez simple une fois qu'on a la méthode.\n\nTu dois faire passer tous les termes avec x d'un côté, et les chiffres de l'autre. Après tu simplifies.\n\nSi tu me donnes ton équation précise, je peux te guider étape par étape.",
    ]
  },
  fraction: {
    keywords: ['fraction', 'dénominateur', 'numérateur', 'simplifier', 'simplification', '1/2', '1/3', '2/3', 'diviser'],
    responses: [
      "Les fractions, oui. Qu'est-ce qui te pose problème exactement ?\n\nPour additionner : il faut le même dénominateur\nPour multiplier : tu multiplies directement\nPour simplifier : tu divises par le même nombre en haut et en bas\n\nDis-moi quelle opération tu dois faire.",
      "Alors pour les fractions, ça dépend de ce que tu veux faire.\n\nAddition/soustraction : cherche un dénominateur commun\nMultiplication : multiplie numérateur avec numérateur, dénominateur avec dénominateur\nDivision : multiplie par l'inverse\n\nTu as un exercice précis ?",
    ]
  },
  pythagore: {
    keywords: ['pythagore', 'triangle rectangle', 'hypoténuse', 'triangle', 'a² + b²', 'carré'],
    responses: [
      "Le théorème de Pythagore : a² + b² = c²\n\nc est toujours l'hypoténuse (le côté le plus long, celui en face de l'angle droit).\n\nSi tu connais deux côtés, tu peux calculer le troisième.\n\nExemple : triangle avec 3 et 4\nc² = 9 + 16 = 25\nc = 5\n\nTu as quel triangle à calculer ?",
      "Pythagore c'est assez direct. Dans un triangle rectangle, le carré de l'hypoténuse égale la somme des carrés des deux autres côtés.\n\nDonc si tu as les mesures de deux côtés, tu peux trouver le troisième avec cette formule.\n\nQuelles sont tes mesures ?",
    ]
  },
  pourcentage: {
    keywords: ['pourcentage', '%', 'pour cent', 'pourcent', 'réduction', 'augmentation', 'promo', 'solde', 'remise'],
    responses: [
      "Les pourcentages, c'est juste une division par 100.\n\nPour calculer X% de Y : (X/100) × Y\n\nExemple : 20% de 50 = 0.20 × 50 = 10\n\nPour une réduction : prix × (1 - pourcentage/100)\nRéduction de 30% sur 100€ = 100 × 0.70 = 70€\n\nC'est quel type de calcul que tu dois faire ?",
      "Ok les pourcentages. La formule de base c'est pourcentage/100 multiplié par le nombre.\n\nSi c'est une réduction, tu multiplies par (1 - le pourcentage en décimal)\nSi c'est une augmentation, tu multiplies par (1 + le pourcentage en décimal)\n\nQu'est-ce que tu cherches exactement ?",
    ]
  },
  calcul: {
    keywords: ['calculer', 'calcul', 'calculé', 'combien', 'résultat', 'additionner', 'soustraire', 'multiplier', '+', '-', '×', '='],
    responses: [
      "Tu veux faire quel calcul exactement ? Donne-moi les nombres et l'opération, je t'aide.",
      "D'accord, donne-moi les détails du calcul que tu dois faire.",
    ]
  },
  
  // PHYSIQUE
  force: {
    keywords: ['force', 'newton', 'poids', 'masse', 'kg', 'gravité', 'pesanteur'],
    responses: [
      "La force, c'est F = m × a\n\nF en Newtons, m en kg, a en m/s²\n\nLe poids c'est une force particulière : P = m × g (g = 9.8 sur Terre)\n\nExemple : 60 kg → poids = 60 × 9.8 = 588 N\n\nTu travailles sur quel type d'exercice ?",
      "Pour les forces, retiens F = m × a. C'est la base.\n\nLe poids est une force spéciale où l'accélération est celle de la gravité (9.8 m/s²).\n\nMontre-moi ton exercice si tu veux qu'on le détaille.",
    ]
  },
  energie: {
    keywords: ['énergie', 'cinétique', 'potentielle', 'joule', 'mouvement', 'vitesse'],
    responses: [
      "L'énergie, il y a deux types principaux :\n\nCinétique (mouvement) : Ec = ½mv²\nPotentielle (hauteur) : Ep = mgh\n\nL'énergie totale se conserve : si un objet tombe, son Ep diminue et son Ec augmente.\n\nC'est quoi ton exercice ?",
      "Énergie cinétique : ½ fois masse fois vitesse au carré\nÉnergie potentielle : masse fois g fois hauteur\n\nLa somme des deux reste constante dans un système isolé.\n\nQu'est-ce que tu dois calculer exactement ?",
    ]
  },
  
  // MATIÈRES
  math: {
    keywords: ['math', 'maths', 'mathématique', 'mathématiques', 'algèbre', 'géométrie', 'arithmétique'],
    responses: [
      "Ok pour les maths. C'est sur quel chapitre exactement ? Équations, fractions, géométrie, pourcentages... ?",
      "En maths, c'est quoi ton sujet précis ? Donne-moi plus de détails sur ce que tu dois faire.",
    ]
  },
  physique: {
    keywords: ['physique', 'mécanique', 'électricité', 'optique', 'chimie'],
    responses: [
      "Physique ok. Tu travailles sur quoi ? Forces, énergie, électricité... ? Donne-moi des détails.",
      "Pour la physique, il me faut plus d'infos. C'est quel chapitre ? Quel type d'exercice ?",
    ]
  },
  
  // AIDE GÉNÉRALE
  aide: {
    keywords: ['aide', 'aider', 'aidez', 'comprends pas', 'comprend pas', 'difficile', 'dur', 'bloque', 'expliquer', 'explique', 'comment'],
    responses: [
      "D'accord, dis-moi plus précisément où tu bloques.\n\nQuelle matière ? Quel chapitre ? Quel exercice ?\n\nPlus tu es précis, mieux je peux t'aider.",
      "Pas de problème. Pour que je puisse t'expliquer clairement, il me faut plus de détails.\n\nC'est sur quelle matière ? Tu as l'énoncé de l'exercice ?",
      "Je vois. Pour mieux t'aider, donne-moi des précisions :\n- La matière\n- Le sujet exact\n- Ce que tu as déjà essayé\n\nComme ça je pourrai être plus utile.",
    ]
  },
  devoir: {
    keywords: ['devoir', 'dm', 'exercice', 'problème', 'exo'],
    responses: [
      "Ok pour les devoirs. De quelle matière on parle ?\n\nSi tu me montres l'énoncé ou me dis sur quoi tu bloques, je peux t'expliquer la méthode.",
      "Les devoirs, oui. C'est sur quel sujet exactement ?\n\nEnvoie-moi l'énoncé ou explique-moi ce que tu ne comprends pas, je vais t'aider à avancer.",
    ]
  },
  examen: {
    keywords: ['exam', 'contrôle', 'révision', 'réviser', 'test', 'interro', 'ds', 'devoir surveillé'],
    responses: [
      "Pour bien réviser, voilà ce que je conseille :\n\n1. Liste les chapitres importants\n2. Identifie tes points faibles\n3. Travaille par sessions de 45 min avec pauses\n4. Refais les exercices types\n5. Dors bien la veille\n\nC'est pour quelle matière ton exam ?",
      "Alors pour les révisions, l'important c'est d'être organisé.\n\nFais des fiches, refais les exercices, identifie ce que tu ne maîtrises pas encore.\n\nTravaille régulièrement plutôt qu'en bourrage de crâne la veille.\n\nTu prépares quel exam ?",
    ]
  },
  
  // SALUTATIONS
  bonjour: {
    keywords: ['bonjour', 'salut', 'hello', 'hey', 'coucou', 'bonsoir', 'yo'],
    responses: [
      "Salut ! Comment je peux t'aider aujourd'hui ?",
      "Bonjour. Tu as des questions ?",
      "Hello. Sur quoi tu travailles ?",
    ]
  },
  
  // MATHÉMATIQUES AVANCÉES
  derivee: {
    keywords: ['dérivée', 'dériver', 'dérivé', 'tangente', 'dérivation'],
    responses: [
      "Pour les dérivées, les formules de base :\n\n(x^n)' = nx^(n-1)\n(ax+b)' = a\n(sin x)' = cos x\n(cos x)' = -sin x\n(e^x)' = e^x\n\nQuelle fonction tu dois dériver ?",
      "Dérivées ok. Rappel des règles principales :\n\nPuissance : tu multiplies par l'exposant et tu diminues l'exposant de 1\nConstante : dérivée = 0\nSomme : tu dérives terme par terme\n\nMontre-moi ta fonction.",
    ]
  },
};

// Réponses par défaut plus naturelles et utiles
const DEFAULT_RESPONSES = [
  "Ok, je peux t'aider. Par contre il me faudrait plus de détails.\n\nC'est pour quelle matière ? Sur quel sujet ? Tu as un exercice précis ?",
  "D'accord. Pour que je puisse bien t'expliquer, précise-moi :\n- La matière (maths, physique...)\n- Le chapitre ou le sujet\n- Ce que tu cherches exactement",
  "Je vois. Donne-moi un peu plus d'informations pour que je puisse t'aider correctement.\n\nQuelle est la matière et qu'est-ce que tu dois faire ?",
  "Ok, je suis là pour t'aider. Mais il me faut plus de contexte.\n\nExplique-moi ta question ou montre-moi l'exercice.",
];

// Fonction pour analyser le message de façon plus flexible
function findBestContext(message) {
  const lowerMessage = message.toLowerCase();
  
  // Chercher avec une correspondance partielle plus flexible
  for (const [context, data] of Object.entries(KNOWLEDGE_BASE)) {
    for (const keyword of data.keywords) {
      if (lowerMessage.includes(keyword.toLowerCase())) {
        return context;
      }
    }
  }
  
  return null;
}

// Fonction pour appeler l'API Gemini
async function callGeminiAPI(userMessage, conversationHistory = []) {
  if (!GEMINI_API_KEY) {
    console.error('Clé API Gemini manquante');
    return null;
  }

  try {
    // Construire l'historique de conversation pour le contexte
    let conversationContext = TEACHER_CONTEXT + "\n\nHistorique récent:\n";
    
    const recentMessages = conversationHistory.slice(-4); // Derniers 4 messages
    recentMessages.forEach(msg => {
      conversationContext += `${msg.sender === 'student' ? 'Élève' : 'Toi'}: ${msg.text}\n`;
    });
    
    conversationContext += `\nÉlève: ${userMessage}\nToi:`;

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: conversationContext
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 500,
        }
      })
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    const aiText = data.candidates[0].content.parts[0].text;
    
    return aiText.trim();
  } catch (error) {
    console.error('Erreur API Gemini:', error);
    return null;
  }
}

// Fonction pour générer une réponse (avec vraie IA)
export async function generateAIResponse(userMessage, conversationHistory = []) {
  // Délai variable pour simuler un humain qui tape (2-4 secondes)
  await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 2000));
  
  // Essayer d'abord avec l'API Gemini
  let responseText = await callGeminiAPI(userMessage, conversationHistory);
  
  // Fallback sur les réponses prédéfinies si l'API échoue
  if (!responseText) {
    const context = findBestContext(userMessage);
    
    if (context) {
      const contextData = KNOWLEDGE_BASE[context];
      responseText = contextData.responses[Math.floor(Math.random() * contextData.responses.length)];
    } else {
      responseText = DEFAULT_RESPONSES[Math.floor(Math.random() * DEFAULT_RESPONSES.length)];
    }
  }
  
  return {
    text: responseText,
    sender: "Dr. Sophie Martin",
    timestamp: new Date(),
    isAI: true
  };
}

// Fonction pour générer une réponse détaillée sur un sujet spécifique
export async function getDetailedExplanation(topic) {
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  const explanations = {
    'pythagore': "Le théorème de Pythagore énonce que dans un triangle rectangle, le carré de l'hypoténuse est égal à la somme des carrés des deux autres côtés : a² + b² = c².\n\nExemple : Si un triangle a des côtés de 3 cm et 4 cm, alors l'hypoténuse mesure √(3² + 4²) = √(9 + 16) = √25 = 5 cm.",
    'equation': "Pour résoudre une équation, l'objectif est d'isoler l'inconnue (généralement x) d'un côté de l'égalité.\n\nÉtapes :\n1. Regrouper les termes en x d'un côté\n2. Regrouper les constantes de l'autre\n3. Simplifier\n4. Diviser pour trouver x",
    'force': "En physique, une force est une action capable de modifier la vitesse ou la trajectoire d'un objet. Elle se mesure en Newtons (N).\n\nFormule : F = m × a (Force = masse × accélération)",
  };
  
  return explanations[topic.toLowerCase()] || "Je n'ai pas d'explication détaillée pour ce sujet pour l'instant. Peux-tu préciser ce que tu souhaites savoir ?";
}

// Fonction pour évaluer la compréhension de l'étudiant
export function generateQuizQuestion(subject) {
  const quizzes = {
    mathematiques: [
      { question: "Combien fait 15% de 200 ?", answer: "30", hint: "Multiplie 200 par 0.15" },
      { question: "Résous : 2x + 5 = 15", answer: "x = 5", hint: "Soustrais 5 des deux côtés, puis divise par 2" },
    ],
    physique: [
      { question: "Quelle est l'unité de la force ?", answer: "Newton (N)", hint: "C'est le nom d'un célèbre scientifique" },
    ]
  };
  
  const subjectQuizzes = quizzes[subject] || quizzes.mathematiques;
  return subjectQuizzes[Math.floor(Math.random() * subjectQuizzes.length)];
}

// Fonction pour suggérer des ressources d'apprentissage
export function suggestResources(topic) {
  return {
    videos: [
      "🎥 Cours vidéo recommandé : Explication détaillée sur " + topic,
      "🎥 Exercices corrigés en vidéo"
    ],
    exercises: [
      "📝 Fiche d'exercices niveau 1",
      "📝 Fiche d'exercices niveau 2 (avec corrections)"
    ],
    tips: [
      "💡 Astuce : Pratique 15 minutes par jour pour de meilleurs résultats",
      "💡 Crée des fiches de révision visuelles"
    ]
  };
}
