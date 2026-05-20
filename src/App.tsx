import React, { useState } from 'react';
import { 
  BookOpen, 
  Award, 
  CheckCircle, 
  XCircle, 
  ChevronRight, 
  RefreshCw, 
  Layers, 
  Zap, 
  Droplet, 
  Info, 
  Heart,
  Beaker,
  BookOpenCheck
} from 'lucide-react';

// --- BANQUE DE 120 QUESTIONS DU QCM (40 par chapitre) ---
const QUESTIONS_DATA = [
  // =========================================================================
  // --- CHAPITRE 1: PRÉCIPITATIONS (QUESTIONS 1 À 40) ---
  // =========================================================================
  {
    id: 1,
    category: "Précipitation",
    question: "❤️ Qu'est-ce qu'un précipité d'après la définition de ton cours ?",
    options: [
      { text: "Un gaz incolore qui se dégage lors du mélange de deux acides.", isCorrect: false, rationale: "Un dégagement gazeux n'est pas un précipité." },
      { text: "Un composé solide peu soluble qui se forme lors du mélange de deux solutions d'électrolytes solubles.", isCorrect: true, rationale: "C'est la définition exacte du cours : un solide amorphe peu soluble." },
      { text: "Une solution limpide obtenue après filtration d'un mélange hétérogène.", isCorrect: false, rationale: "La solution limpide après filtration est appelée le filtrat, pas le précipité." },
      { text: "Un ion spectateur qui reste dissous sous forme hydratée dans l'eau.", isCorrect: false, rationale: "Un ion spectateur reste en solution aqueuse et ne précipite pas." }
    ],
    theoryExplanation: "❤️ Un précipité est un composé solide très peu soluble qui apparaît lors du mélange de deux solutions d'électrolytes."
  },
  {
    id: 2,
    category: "Précipitation",
    question: "Lorsqu'on mélange du sulfate de sodium (Na₂SO₄) et du chlorure de baryum (BaCl₂), quelle est l'équation moléculaire globale équilibrée de cette précipitation ?",
    options: [
      { text: "Na₂SO₄ (aq) + BaCl₂ (aq) → BaSO₄ (s) + 2 NaCl (aq)", isCorrect: true, rationale: "Le baryum s'associe au sulfate pour former le précipité BaSO₄ (s). L'équation est équilibrée avec 2 NaCl." },
      { text: "Ba²⁺ (aq) + SO₄²⁻ (aq) → BaSO₄ (s)", isCorrect: false, rationale: "C'est l'équation ionique simplifiée, or on demande de travailler directement sur l'équation moléculaire globale." },
      { text: "Na⁺ (aq) + Cl⁻ (aq) → NaCl (s)", isCorrect: false, rationale: "Le chlorure de sodium (NaCl) est hautement soluble dans l'eau et reste sous forme d'ions libres." },
      { text: "Na₂SO₄ (aq) + BaCl₂ (aq) → BaSO₄ (s) + NaCl (aq)", isCorrect: false, rationale: "Cette équation moléculaire n'est pas équilibrée au niveau des atomes de sodium et de chlore." }
    ],
    theoryExplanation: "❤️ Méthode : On écrit l'équation moléculaire globale directement en associant les cations et les anions pour former les deux nouveaux composés, puis on l'équilibre."
  },
  {
    id: 3,
    category: "Précipitation",
    question: "Lorsqu'on mélange du chlorure de sodium (NaCl) et du nitrate d'argent (AgNO₃), quel composé solide insoluble (précipité) se forme ?",
    options: [
      { text: "Le nitrate de sodium (NaNO₃)", isCorrect: false, rationale: "Tous les nitrates sont extrêmement solubles dans l'eau, NaNO₃ reste donc sous forme aqueuse." },
      { text: "Le chlorure d'argent (AgCl)", isCorrect: true, rationale: "Le chlorure d'argent est insoluble dans l'eau et précipite immédiatement sous forme d'un solide blanc qui noircit à la lumière." },
      { text: "L'hydroxyde de sodium (NaOH)", isCorrect: false, rationale: "Il n'y a pas d'ions hydroxydes (OH⁻) dans ce mélange pour former un hydroxyde." },
      { text: "Le sulfate de baryum (BaSO₄)", isCorrect: false, rationale: "Ces ions ne sont pas du tout présents dans le mélange NaCl + AgNO₃." }
    ],
    theoryExplanation: "❤️ Selon le tableau de solubilité : les chlorures sont solubles, SAUF ceux d'argent (Ag⁺), de plomb (Pb²⁺) et de mercure (Hg₂²⁺). AgCl est donc insoluble."
  },
  {
    id: 4,
    category: "Précipitation",
    question: "❤️ Quelle est la définition correcte d'un ion acteur dans une réaction de précipitation ?",
    options: [
      { text: "Un ion qui change d'état physique pour former le précipité solide.", isCorrect: true, rationale: "L'ion acteur participe directement à la réaction chimique en passant de l'état dissous (aq) à l'état solide (s)." },
      { text: "Un ion qui colore la solution en bleu ou en vert.", isCorrect: false, rationale: "La coloration dépend de la nature de l'élément, pas de son rôle d'ion acteur." },
      { text: "Un ion qui reste inchangé et spectateur sous forme aqueuse.", isCorrect: false, rationale: "C'est la définition d'un ion spectateur, pas d'un ion acteur." },
      { text: "Un ion métallique qui s'oxyde en perdant des électrons.", isCorrect: false, rationale: "C'est un de concepts d'oxydoréduction, absent dans les réactions de précipitation." }
    ],
    theoryExplanation: "❤️ Ions acteurs : Ce sont les ions qui s'associent directement pour former le précipité solide insoluble."
  },
  {
    id: 5,
    category: "Précipitation",
    question: "❤️ Quelle est la définition d'un ion spectateur dans une réaction de précipitation ?",
    options: [
      { text: "Un ion qui réagit pour libérer des protons H⁺.", isCorrect: false, rationale: "Libérer des protons est une propriété des acides selon Brönsted." },
      { text: "Un ion qui reste dissous sous forme aqueuse (aq) et ne participe pas à la formation du solide.", isCorrect: true, rationale: "L'ion spectateur est présent dans le milieu mais reste libre et inchangé avant et après la réaction." },
      { text: "Un ion qui s'accumule au fond du récipient sous forme de solide.", isCorrect: false, rationale: "Le solide au fond est le précipité, constitué d'ions acteurs." },
      { text: "Un ion qui s'oxyde à la cathode d'une pile.", isCorrect: false, rationale: "C'est une notion d'oxydoréduction." }
    ],
    theoryExplanation: "❤️ Ions spectateurs : Ce sont les ions qui restent dissous et libres sous forme aqueuse (aq) tout au long de la transformation."
  },
  {
    id: 6,
    category: "Précipitation",
    question: "D'après ton tableau de solubilité, qu'observe-t-on si on mélange une solution de nitrate de potassium (KNO₃) et de chlorure de sodium (NaCl) ?",
    options: [
      { text: "La formation d'un précipité blanc de NaCl.", isCorrect: false, rationale: "Le chlorure de sodium est extrêmement soluble dans l'eau." },
      { text: "La formation d'un précipité blanc de KCl.", isCorrect: false, rationale: "Le chlorure de potassium est soluble." },
      { text: "Aucune réaction chimique visible, tous les ions restent spectateurs.", isCorrect: true, rationale: "Tous les sels d'alcalins (K⁺, Na⁺) et tous les nitrates (NO₃⁻) sont solubles. Aucun précipité ne se forme." },
      { text: "La formation d'un précipité de nitrate de sodium.", isCorrect: false, rationale: "Les nitrates de sodium sont solubles." }
    ],
    theoryExplanation: "❤️ Si toutes les combinaisons possibles d'ions donnent des composés solubles, les ions restent spectateurs et aucune réaction de précipitation n'a lieu."
  },
  {
    id: 7,
    category: "Précipitation",
    question: "Quelle est l'équation moléculaire globale équilibrée de la précipitation obtenue en mélangeant de l'hydroxyde de sodium (NaOH) et du sulfate de cuivre (CuSO₄) ?",
    options: [
      { text: "2 NaOH (aq) + CuSO₄ (aq) → Cu(OH)₂ (s) + Na₂SO₄ (aq)", isCorrect: true, rationale: "Le cuivre(II) s'associe aux hydroxydes pour former un précipité gélatineux bleu de Cu(OH)₂. L'équation est équilibrée avec 2 NaOH." },
      { text: "NaOH (aq) + CuSO₄ (aq) → CuOH (s) + NaSO₄ (aq)", isCorrect: false, rationale: "La valence des ions Cu²⁺ et SO₄²⁻ n'est pas respectée dans cette équation." },
      { text: "NaOH (aq) + CuSO₄ (aq) → Cu(OH)₂ (s) + Na₂SO₄ (aq)", isCorrect: false, rationale: "Cette équation n'est pas équilibrée au niveau des atomes de sodium et des groupements hydroxyde." },
      { text: "Cu²⁺ (aq) + 2 OH⁻ (aq) → Cu(OH)₂ (s)", isCorrect: false, rationale: "On demande l'équation moléculaire globale." }
    ],
    theoryExplanation: "❤️ Selon ton tableau de solubilité, la plupart des hydroxydes (OH⁻) sont insolubles, sauf ceux d'alcalins (Na⁺, K⁺...). Cu(OH)₂ est donc insoluble (s) et forme un précipité bleu."
  },
  {
    id: 8,
    category: "Précipitation",
    question: "Si on mélange du carbonate de sodium (Na₂CO₃) et du chlorure de calcium (CaCl₂), quel composé solide insoluble se forme ?",
    options: [
      { text: "Le chlorure de sodium (NaCl)", isCorrect: false, rationale: "Le chlorure de sodium reste sous forme dissoute (aq)." },
      { text: "Le carbonate de calcium (CaCO₃)", isCorrect: true, rationale: "La plupart des carbonates (CO₃²⁻) sont insolubles dans l'eau, à l'exception de ceux de métaux alcalins et d'ammonium." },
      { text: "Le carbonate de sodium (Na₂CO₃)", isCorrect: false, rationale: "C'est le réactif de départ soluble." },
      { text: "Le calcium de sodium", isCorrect: false, rationale: "Cette espèce chimique n'existe pas." }
    ],
    theoryExplanation: "❤️ Selon ton tableau de solubilité, CaCO₃ est insoluble et précipite sous la forme d'un solide blanc."
  },
  {
    id: 9,
    category: "Précipitation",
    question: "Pourquoi est-il crucial d'indiquer l'état physique (aq) ou (s) dans les équations chimiques de précipitation ?",
    options: [
      { text: "Pour indiquer si la solution est acide ou basique.", isCorrect: false, rationale: "Le pH n'est pas indiqué par les indices d'état physique." },
      { text: "Pour distinguer clairement les espèces qui restent dissoutes (aq) de celle qui forme le précipité solide (s).", isCorrect: true, rationale: "L'indice (aq) signifie aqueux (dissous dans l'eau) et (s) solide (le précipité formé)." },
      { text: "Pour indiquer la vitesse de la réaction chimique.", isCorrect: false, rationale: "Les indices d'état physique n'indiquent aucun paramètre de vitesse." },
      { text: "Pour respecter le principe de conservation de l'énergie de Brönsted.", isCorrect: false, rationale: "Brönsted concerne les acides et les bases." }
    ],
    theoryExplanation: "❤️ L'écriture correcte d'une équation moléculaire de précipitation impose de noter (aq) pour les substances dissoutes et (s) pour le précipité solide."
  },
  {
    id: 10,
    category: "Précipitation",
    question: "Comment appelle-t-on le liquide limpide qui surnage au-dessus du précipité après une réaction de précipitation et une décantation ?",
    options: [
      { text: "Le précipitant.", isCorrect: false, rationale: "Ce terme n'est pas utilisé pour désigner la phase liquide surnageante." },
      { text: "Le surnageant ou filtrat.", isCorrect: true, rationale: "Le surnageant est la phase liquide limpide qui contient encore les ions spectateurs après la précipitation." },
      { text: "L'électrolyte précipité.", isCorrect: false, rationale: "Un électrolyte précipité désigne la partie solide, pas le liquide." },
      { text: "L'acide conjugué de neutralisation.", isCorrect: false, rationale: "C'est un concept de la théorie des acides et des bases." }
    ],
    theoryExplanation: "❤️ Après précipitation et décantation (ou filtration), le solide est séparé de la phase liquide limpide appelée surnageant ou filtrat."
  },
  {
    id: 11,
    category: "Précipitation",
    question: "D'après les règles générales de ton tableau de solubilité, quelle est la propriété universelle des nitrates (NO₃⁻) ?",
    options: [
      { text: "Ils sont tous hautement solubles dans l'eau.", isCorrect: true, rationale: "Tous les nitrates sans exception sont solubles, ils ne forment jamais de précipité." },
      { text: "Ils précipitent uniquement avec les ions sodium.", isCorrect: false, rationale: "Les nitrates de sodium sont solubles." },
      { text: "Ils forment toujours des précipités de couleur rouge.", isCorrect: false, rationale: "Les nitrates restent dissous en solution et n'ont pas de couleur rouge caractéristique." },
      { text: "Ils sont insolubles sauf en milieu acide fort.", isCorrect: false, rationale: "Ils sont solubles dans toutes les conditions normales." }
    ],
    theoryExplanation: "❤️ Règle de solubilité : Tous les nitrates (NO₃⁻) sont solubles dans l'eau sans aucune exception."
  },
  {
    id: 12,
    category: "Précipitation",
    question: "Quelle est la solubilité des sels contenant des métaux alcalins (Li⁺, Na⁺, K⁺) d'après ton cours ?",
    options: [
      { text: "Ils précipitent avec la plupart des anions.", isCorrect: false, rationale: "C'est l'inverse, ils sont presque toujours solubles." },
      { text: "Ils sont tous solubles dans l'eau.", isCorrect: true, rationale: "Les cations alcalins ne forment jamais de précipité avec les anions courants de ton cours." },
      { text: "Ils ne se dissolvent que dans les acides forts.", isCorrect: false, rationale: "Ils se dissolvent parfaitement dans l'eau pure." },
      { text: "Ils forment des solides bleus insolubles.", isCorrect: false, rationale: "Ils restent incolores et solubles en solution aqueuse." }
    ],
    theoryExplanation: "❤️ Règle de solubilité : Tous les sels contenant des cations alcalins ou d'ammonium (NH₄⁺) sont hautement solubles dans l'eau."
  },
  {
    id: 13,
    category: "Précipitation",
    question: "Si on mélange du nitrate de plomb Pb(NO₃)₂ et du chlorure de sodium NaCl, qu'indique le tableau de solubilité concernant le chlorure de plomb (PbCl₂) ?",
    options: [
      { text: "Il reste soluble (aq).", isCorrect: false, rationale: "Le plomb fait exception à la solubilité générale des chlorures." },
      { text: "Il est insoluble et précipite sous forme solide (s).", isCorrect: true, rationale: "Les chlorures sont solubles, SAUF ceux de plomb (Pb²⁺), d'argent (Ag⁺) et de mercure (Hg₂²⁺)." },
      { text: "Il libère un gaz chloré toxique.", isCorrect: false, rationale: "Il s'agit d'une réaction de précipitation, aucun gaz ne se dégage." },
      { text: "Il forme un complexe bleu soluble.", isCorrect: false, rationale: "Le précipité de PbCl₂ est solide et blanc." }
    ],
    theoryExplanation: "❤️ Les chlorures sont généralement solubles, mais l'ion plomb (Pb²⁺) est l'une des trois exceptions majeures qui provoquent la précipitation du chlorure."
  },
  {
    id: 14,
    category: "Précipitation",
    question: "Mélange de sulfate de magnésium (MgSO₄) et de nitrate de baryum Ba(NO₃)₂. Quel solide blanc insoluble se forme ?",
    options: [
      { text: "Le nitrate de magnésium Mg(NO₃)₂.", isCorrect: false, rationale: "Tous les nitrates sont solubles." },
      { text: "Le sulfate de baryum BaSO₄.", isCorrect: true, rationale: "Les sulfates sont solubles sauf ceux de calcium, strontium, plomb et baryum." },
      { text: "Le chlorure de baryum BaCl₂.", isCorrect: false, rationale: "Il n'y a pas d'ions chlorure dans le mélange d'origine." },
      { text: "Aucun précipité ne peut se former.", isCorrect: false, rationale: "BaSO₄ est insoluble et précipite." }
    ],
    theoryExplanation: "❤️ Les ions baryum Ba²⁺ et sulfate SO₄²⁻ s'associent pour former le sulfate de baryum BaSO₄, un solide blanc hautement insoluble."
  },
  {
    id: 15,
    category: "Précipitation",
    question: "Pourquoi l'équation ionique complète est-elle utile avant de barrer les spectateurs ?",
    options: [
      { text: "Elle permet de voir tous les ions sous leur forme réellement dissociée en solution aqueuse.", isCorrect: true, rationale: "Elle traduit fidèlement l'état physique réel des sels dissous sous forme d'ions séparés." },
      { text: "Elle montre l'échange d'électrons entre les ions.", isCorrect: false, rationale: "Il n'y a pas de transfert d'électrons dans une précipitation." },
      { text: "Elle sert à calculer directement la valeur du pH de la solution.", isCorrect: false, rationale: "Le pH concerne les concentrations en ions hydronium." },
      { text: "Elle remplace le tableau de solubilité.", isCorrect: false, rationale: "Le tableau de solubilité reste indispensable pour identifier le solide." }
    ],
    theoryExplanation: "❤️ L'équation ionique complète représente l'état réel des substances en solution : les électrolytes solubles sont écrits dissociés en ions."
  },
  {
    id: 16,
    category: "Précipitation",
    question: "Dans le mélange CuSO₄ (aq) + 2 KOH (aq) → Cu(OH)₂ (s) + K₂SO₄ (aq), quels sont les ions spectateurs ?",
    options: [
      { text: "Cu²⁺ et OH⁻", isCorrect: false, rationale: "Ces ions forment le précipité solide, ce sont des ions acteurs." },
      { text: "K⁺ et SO₄²⁻", isCorrect: true, rationale: "Ils restent dissous sous forme aqueuse de chaque côté de la réaction." },
      { text: "uniquement l'ion K⁺", isCorrect: false, rationale: "L'ion sulfate SO₄²⁻ reste également spectateur." },
      { text: "Il n'y a aucun ion spectateur dans cette réaction.", isCorrect: false, rationale: "Les ions potassium et sulfate ne participent pas à la formation du solide." }
    ],
    theoryExplanation: "❤️ Les ions K⁺ et SO₄²⁻ n'interviennent pas dans la formation du précipité Cu(OH)₂, ils restent donc spectateurs."
  },
  {
    id: 17,
    category: "Précipitation",
    question: "❤️ Quel symbole utilise-t-on pour désigner une phase qui reste parfaitement dissoute dans l'eau ?",
    options: [
      { text: "(s) pour solide.", isCorrect: false, rationale: "(s) désigne la phase solide condensée, comme un précipité." },
      { text: "(aq) pour aqueux.", isCorrect: true, rationale: "(aq) indique que l'espèce chimique est hydratée et dissoute dans le solvant eau." },
      { text: "(g) pour gaz.", isCorrect: false, rationale: "(g) désigne l'état gazeux." },
      { text: "(l) pour liquide pur.", isCorrect: false, rationale: "(l) est réservé aux solvants liquides purs comme l'eau H₂O." }
    ],
    theoryExplanation: "❤️ L'indice (aq) après la formule d'un ion ou d'une molecule indique qu'elle est entourée de molécules d'eau en solution."
  },
  {
    id: 18,
    category: "Précipitation",
    question: "Si on mélange une solution de phosphate de potassium (K₃PO₄) et de nitrate de sodium (NaNO₃), qu'observe-t-on d'après ton tableau de solubilité ?",
    options: [
      { text: "La formation d'un précipité de phosphate de sodium.", isCorrect: false, rationale: "Les sels de sodium sont solubles." },
      { text: "Aucun précipité ne se forme car tous les produits potentiels sont solubles.", isCorrect: true, rationale: "Le nitrate de potassium et le phosphate de sodium sont tous deux extrêmement solubles." },
      { text: "Le potassium solide s'accumule au fond.", isCorrect: false, rationale: "Les ions potassium K⁺ restent spectateurs." },
      { text: "Une neutralisation totale avec dégagement de chaleur.", isCorrect: false, rationale: "Il s'agit d'un simple mélange de sels solubles neutres." }
    ],
    theoryExplanation: "❤️ Sans ion capable de s'associer pour former un sel insoluble d'après ton tableau, le mélange ne produit aucune réaction chimique."
  },
  {
    id: 19,
    category: "Précipitation",
    question: "Quel est l'état de solubilité des carbonates (CO₃²⁻) dans l'eau selon ton tableau de solubilité ?",
    options: [
      { text: "Ils sont tous solubles sans exception.", isCorrect: false, rationale: "C'est l'inverse, ils sont généralement insolubles." },
      { text: "Ils sont majoritairement insolubles, sauf ceux d'alcalins et d'ammonium.", isCorrect: true, rationale: "Les carbonates de calcium, de baryum ou de fer précipitent, tandis que Na₂CO₃ reste soluble." },
      { text: "Ils ne se dissolvent que si la solution est bleue.", isCorrect: false, rationale: "La couleur n'a aucune influence sur la solubilité." },
      { text: "Ils sont solubles uniquement en présence de nitrates.", isCorrect: false, rationale: "La présence d'autres ions ne change pas leur produit de solubilité." }
    ],
    theoryExplanation: "❤️ Règle de solubilité : La plupart des carbonates (CO₃²⁻) et des phosphates (PO₄³⁻) sont insolubles, sauf ceux de métaux alcalins et d'ammonium."
  },
  {
    id: 20,
    category: "Précipitation",
    question: "Dans le mélange CaCl₂ (aq) + Na₂CO₃ (aq) → CaCO₃ (s) + 2 NaCl (aq), quels sont les ions acteurs ?",
    options: [
      { text: "Na⁺ et Cl⁻", isCorrect: false, rationale: "Ces ions restent dissous (aq), ce sont des ions spectateurs." },
      { text: "Ca²⁺ et CO₃²⁻", isCorrect: true, rationale: "Ces deux ions s'associent pour former le carbonate de calcium solide (s)." },
      { text: "Uniquement l'ion calcium Ca²⁺", isCorrect: false, rationale: "L'ion carbonate CO₃²⁻ participe également à la formation du solide." },
      { text: "Tous les ions sont acteurs dans ce mélange.", isCorrect: false, rationale: "Na⁺ et Cl⁻ ne participent pas à la formation du solide." }
    ],
    theoryExplanation: "❤️ Les ions acteurs Ca²⁺ (aq) et CO₃²⁻ (aq) sont les seuls qui réagissent chimiquement pour donner CaCO₃ (s)."
  },
  {
    id: 21,
    category: "Précipitation",
    question: "D'après ton tableau de solubilité, quelle est la règle de solubilité concernant les halogénures (Cl⁻, Br⁻, I⁻) ?",
    options: [
      { text: "Ils sont presque tous insolubles.", isCorrect: false, rationale: "La plupart des chlorures sont très solubles." },
      { text: "Ils sont généralement solubles, sauf en présence d'ions Ag⁺, Pb²⁺ et Hg₂²⁺.", isCorrect: true, rationale: "Ces trois cations forment des précipités très solides avec les halogénures." },
      { text: "Ils ne se dissolvent que dans les solutions acides.", isCorrect: false, rationale: "Leur solubilité est indépendante du pH pour ces anions simples." },
      { text: "Ils sont solubles uniquement avec l'ammonium.", isCorrect: false, rationale: "Ils sont également solubles avec la majorité des métaux alcalins et de transition." }
    ],
    theoryExplanation: "❤️ Règle générale : Les chlorures, bromures et iodures sont solubles, à l'exception notable des métaux Ag⁺, Pb²⁺ et Hg₂²⁺."
  },
  {
    id: 22,
    category: "Précipitation",
    question: "Si on mélange une solution d'hydroxyde de potassium (KOH) et de nitrate de cuivre Cu(NO₃)₂, quel précipité obtient-on ?",
    options: [
      { text: "Le nitrate de potassium KNO₃.", isCorrect: false, rationale: "Tous les nitrates sont solubles." },
      { text: "L'hydroxyde de cuivre Cu(OH)₂.", isCorrect: true, rationale: "La plupart des hydroxydes sont insolubles, sauf ceux d'alcalins." },
      { text: "Le sulfate de cuivre CuSO₄.", isCorrect: false, rationale: "Il n'y a pas d'ions sulfate dans le mélange de départ." },
      { text: "Aucun solide ne se forme.", isCorrect: false, rationale: "Cu(OH)₂ est insoluble et forme un précipité bleu." }
    ],
    theoryExplanation: "❤️ Les ions cuivre Cu²⁺ s'associent aux hydroxydes OH⁻ pour former un précipité solide d'hydroxyde de cuivre Cu(OH)₂."
  },
  {
    id: 23,
    category: "Précipitation",
    question: "Quel terme du cours désigne la séparation physique d'un précipité solide de sa phase liquide surnageante à l'aide d'un filtre ?",
    options: [
      { text: "La décantation.", isCorrect: false, rationale: "La décantation utilise la gravité sans filtre physique." },
      { text: "La filtration.", isCorrect: true, rationale: "La filtration permet de retenir le précipité sur le papier filtre et de laisser passer le filtrat limpide." },
      { text: "La neutralisation.", isCorrect: false, rationale: "C'est une réaction acide-base." },
      { text: "L'oxydation.", isCorrect: false, rationale: "C'est un phénomène d'oxydoréduction." }
    ],
    theoryExplanation: "❤️ La filtration est une technique classique de laboratoire pour isoler un précipité solide de la solution aqueuse."
  },
  {
    id: 24,
    category: "Précipitation",
    question: "D'après ton tableau de solubilité, quelle est la règle concernant la solubilité des hydroxydes (OH⁻) ?",
    options: [
      { text: "Ils sont solubles avec la plupart des métaux lourds.", isCorrect: false, rationale: "Ils sont au contraire insolubles avec eux." },
      { text: "Ils sont insolubles, sauf ceux de métaux alcalins et de baryum Ba²⁺.", isCorrect: true, rationale: "NaOH, KOH, LiOH sont solubles, Ba(OH)₂ est soluble, mais Cu(OH)₂ ou Fe(OH)₃ précipitent." },
      { text: "Ils précipitent systématiquement avec le sodium.", isCorrect: false, rationale: "NaOH est une base forte très soluble." },
      { text: "Ils ne précipitent jamais.", isCorrect: false, rationale: "La plupart des hydroxydes de métaux de transition précipitent." }
    ],
    theoryExplanation: "❤️ Règle de solubilité : La plupart des hydroxydes (OH⁻) sont insolubles, sauf ceux d'alcalins (Na⁺, K⁺) et de baryum (Ba²⁺)."
  },
  {
    id: 25,
    category: "Précipitation",
    question: "Lorsqu'on balance l'équation moléculaire globale de la précipitation de AgCl : NaCl (aq) + AgNO₃ (aq) → AgCl (s) + NaNO₃ (aq), quels coefficients stœchiométriques faut-il ?",
    options: [
      { text: "Il faut doubler tous les réactifs.", isCorrect: false, rationale: "C'est inutile et cela fausserait la stœchiométrie simplifiée." },
      { text: "L'équation est déjà équilibrée avec des coefficients de 1 partout.", isCorrect: true, rationale: "Tous les ions ont la même charge en valeur absolue, l'équation s'équilibre à 1:1." },
      { text: "Il faut ajouter un coefficient 2 devant AgCl.", isCorrect: false, rationale: "Cela déséquilibrerait le chlore et l'argent." },
      { text: "L'équation ne peut pas être équilibrée sous forme moléculaire.", isCorrect: false, rationale: "Toute équation moléculaire globale peut et doit être équilibrée." }
    ],
    theoryExplanation: "❤️ L'équation moléculaire globale de formation de AgCl s'équilibre naturellement avec des coefficients de 1."
  },
  {
    id: 26,
    category: "Précipitation",
    question: "Que se passe-t-il au niveau des charges électriques lors de la formation d'un précipité solide ?",
    options: [
      { text: "Le solide formé acquiert une charge positive forte.", isCorrect: false, rationale: "Un précipité est neutre." },
      { text: "Les cations et les anions s'associent pour former un composé solide globalement neutre.", isCorrect: true, rationale: "La somme des charges positives des cations égale la somme des charges négatives des anions." },
      { text: "Les électrons sautent d'un atome à l'autre.", isCorrect: false, rationale: "C'est un transfert d'électrons d'oxydoréduction, absent ici." },
      { text: "Les ions spectateurs perdent leurs charges.", isCorrect: false, rationale: "Les ions spectateurs conservent intacte leur charge en solution." }
    ],
    theoryExplanation: "❤️ Tout composé ionique solide formé par précipitation est électriquement neutre."
  },
  {
    id: 27,
    category: "Précipitation",
    question: "On mélange du chlorure de fer(II) FeCl₂ et de l'hydroxyde de sodium NaOH. Quel précipité de couleur verte observe-t-on d'après ton cours ?",
    options: [
      { text: "L'hydroxyde de sodium NaOH.", isCorrect: false, rationale: "C'est le réactif soluble." },
      { text: "L'hydroxyde de fer(II) Fe(OH)₂.", isCorrect: true, rationale: "Le précipité d'hydroxyde de fer(II) présente une couleur verte caractéristique." },
      { text: "Le chlorure de sodium NaCl.", isCorrect: false, rationale: "NaCl est un sel blanc soluble." },
      { text: "Le sulfate de fer.", isCorrect: false, rationale: "Il n'y a pas d'ions sulfate." }
    ],
    theoryExplanation: "❤️ Les ions fer(II) Fe²⁺ s'associent aux hydroxydes OH⁻ pour former l'hydroxyde de fer(II) Fe(OH)₂, un solide vert insoluble."
  },
  {
    id: 28,
    category: "Précipitation",
    question: "Si on mélange du chlorure de fer(III) FeCl₃ et de l'hydroxyde de sodium NaOH, de quelle couleur est le précipité de Fe(OH)₃ obtenu ?",
    options: [
      { text: "Vert.", isCorrect: false, rationale: "Le vert est caractéristique du fer(II)." },
      { text: "Rouille / Brun-orange.", isCorrect: true, rationale: "L'hydroxyde de fer(III) forme un précipité de couleur rouille très typique." },
      { text: "Bleu gélatineux.", isCorrect: false, rationale: "Le bleu est caractéristique du cuivre(II)." },
      { text: "Blanc laiteux.", isCorrect: false, rationale: "Le blanc caractérise des sels comme CaCO₃ ou BaSO₄." }
    ],
    theoryExplanation: "❤️ L'hydroxyde de fer(III) Fe(OH)₃ est un solide insoluble de couleur rouille."
  },
  {
    id: 29,
    category: "Précipitation",
    question: "Mélange de chlorure de calcium CaCl₂ et de carbonate de potassium K₂CO₃. Quelle est l'équation moléculaire globale équilibrée ?",
    options: [
      { text: "CaCl₂ (aq) + K₂CO₃ (aq) → CaCO₃ (s) + 2 KCl (aq)", isCorrect: true, rationale: "Les ions calcium et carbonate s'associent pour donner CaCO₃ (s), tandis que KCl reste soluble." },
      { text: "CaCl₂ + K₂CO₃ → CaCO₃ + KCl", isCorrect: false, rationale: "Le chlore et le potassium ne sont pas équilibrés à droite." },
      { text: "Ca²⁺ + CO₃²⁻ → CaCO₃", isCorrect: false, rationale: "C'est l'équation ionique simplifiée." },
      { text: "CaCl₂ (aq) + K₂CO₃ (aq) → CaCO₃ (aq) + 2 KCl (s)", isCorrect: false, rationale: "Les indices physiques (aq) et (s) sont inversés." }
    ],
    theoryExplanation: "❤️ Le carbonate de calcium CaCO₃ est insoluble d'après ton tableau de solubilité, d'où l'indice (s)."
  },
  {
    id: 30,
    category: "Précipitation",
    question: "Dans le mélange Ba(NO₃)₂ (aq) + Na₂SO₄ (aq) → BaSO₄ (s) + 2 NaNO₃ (aq), que deviennent les ions spectateurs ?",
    options: [
      { text: "Ils s'évaporent de la solution.", isCorrect: false, rationale: "Les ions ne peuvent pas s'évaporer." },
      { text: "Ils restent dissous sous forme hydratée dans la phase liquide surnageante.", isCorrect: true, rationale: "Les ions spectateurs Na⁺ et NO₃⁻ restent intacts et libres dans l'eau." },
      { text: "Ils précipitent après quelques minutes.", isCorrect: false, rationale: "Ils sont extrêmement solubles et ne précipiteront pas." },
      { text: "Ils réagissent avec l'eau pour acidifier la solution.", isCorrect: false, rationale: "Ce sont des ions spectateurs neutres." }
    ],
    theoryExplanation: "❤️ Les ions spectateurs ne participent pas au solide et restent en solution aqueuse après la réaction."
  },
  {
    id: 31,
    category: "Précipitation",
    question: "D'après ton tableau de solubilité, quelle est la règle concernant les sulfates (SO₄²⁻) ?",
    options: [
      { text: "Ils sont insolubles avec tous les métaux.", isCorrect: false, rationale: "Ils sont majoritairement solubles." },
      { text: "Ils sont solubles dans l'eau, à l'exception de Ca²⁺, Sr²⁺, Ba²⁺, et Pb²⁺.", isCorrect: true, rationale: "Le sulfate de magnésium ou de sodium sont solubles, mais BaSO₄ précipite." },
      { text: "Ils ne se dissolvent que dans les solutions d'ammoniaque.", isCorrect: false, rationale: "Leur solubilité est excellente dans l'eau pure." },
      { text: "Ils sont tous solubles sans aucune exception.", isCorrect: false, rationale: "Le baryum et le plomb sont des exceptions majeures." }
    ],
    theoryExplanation: "❤️ Règle de solubilité : Les sulfates sont généralement solubles, sauf avec Ca²⁺, Sr²⁺, Ba²⁺ et Pb²⁺."
  },
  {
    id: 32,
    category: "Précipitation",
    question: "Lorsqu'on filtre un mélange contenant un précipité de AgCl dans du NaNO₃, qu'est-ce qui traverse le papier filtre et se retrouve dans le bécher inférieur ?",
    options: [
      { text: "Le solide AgCl.", isCorrect: false, rationale: "Le solide est retenu par les pores du papier filtre." },
      { text: "Le filtrat limpide contenant les ions spectateurs Na⁺ et NO₃⁻ en solution.", isCorrect: true, rationale: "Seule la phase aqueuse contenant les ions dissous traverse le filtre." },
      { text: "De l'eau parfaitement pure sans aucun ion.", isCorrect: false, rationale: "Les ions spectateurs traversent le filtre avec l'eau." },
      { text: "Rien, tout est retenu sur le filtre.", isCorrect: false, rationale: "Le liquide passe à travers le filtre." }
    ],
    theoryExplanation: "❤️ La filtration sépare le précipité solide (résidu) de la phase liquide contenant les ions spectateurs dissous (filtrat)."
  },
  {
    id: 33,
    category: "Précipitation",
    question: "Que se passe-t-il si tu mélanges deux solutions aqueuses et qu'aucun ion ne s'associe de manière insoluble ?",
    options: [
      { text: "La solution explose sous l'effet de l'énergie.", isCorrect: false, rationale: "Il n'y a pas de réaction violente." },
      { text: "Il n'y a aucune réaction de précipitation, on obtient un simple mélange homogène d'ions spectateurs.", isCorrect: true, rationale: "Tous les ions restent sous forme (aq) et aucun précipité n'est visible." },
      { text: "Un gaz se dégage lentement.", isCorrect: false, rationale: "Pas de précipitation ne signifie pas de production gazeuse." },
      { text: "Le pH devient instantanément égal à 0.", isCorrect: false, rationale: "La concentration en protons n'est pas affectée." }
    ],
    theoryExplanation: "❤️ S'il n'y a pas d'association insoluble d'après ton tableau de solubilité, la précipitation n'a pas lieu."
  },
  {
    id: 34,
    category: "Précipitation",
    question: "On mélange du nitrate d'argent (AgNO₃) et de l'iodure de potassium (KI). Quel précipité jaune caractéristique se forme ?",
    options: [
      { text: "Le nitrate de potassium (KNO₃).", isCorrect: false, rationale: "KNO₃ est extrêmement soluble." },
      { text: "L'iodure d'argent (AgI).", isCorrect: true, rationale: "L'iodure d'argent est insoluble et forme un solide jaune très reconnaissable." },
      { text: "Le chlorure d'argent.", isCorrect: false, rationale: "Il n'y a pas d'ions chlorure." },
      { text: "L'hydroxyde d'argent.", isCorrect: false, rationale: "Il n'y a pas d'ions hydroxydes." }
    ],
    theoryExplanation: "❤️ Les iodures d'argent (AgI) sont insolubles et précipitent sous la forme d'un solide de couleur jaune."
  },
  {
    id: 35,
    category: "Précipitation",
    question: "Pourquoi les sels d'ammonium (NH₄⁺) ne forment-ils jamais de précipité dans ton cours ?",
    options: [
      { text: "Parce qu'ils s'évaporent instantanément.", isCorrect: false, rationale: "L'ion ammonium reste stable en solution aqueuse froide." },
      { text: "Parce qu'ils sont extrêmement solubles dans l'eau avec tous les anions courants.", isCorrect: true, rationale: "Les sels d'ammonium font partie des électrolytes toujours solubles." },
      { text: "Parce qu'ils sont acides.", isCorrect: false, rationale: "La solubilité est une propriété de dissociation ionique." },
      { text: "Parce qu'ils réagissent avec le verre des béchers.", isCorrect: false, rationale: "Ils sont inoffensifs pour la verrerie de laboratoire." }
    ],
    theoryExplanation: "❤️ Les sels d'ammonium (NH₄⁺), tout comme les métaux alcalins, sont toujours solubles dans l'eau."
  },
  {
    id: 36,
    category: "Précipitation",
    question: "Si on mélange une solution de chlorure de calcium CaCl₂ et de nitrate de sodium NaNO₃, qu'indique ton tableau de solubilité ?",
    options: [
      { text: "La formation d'un précipité de NaCl.", isCorrect: false, rationale: "NaCl est très soluble." },
      { text: "La formation d'un précipité de Ca(NO₃)₂.", isCorrect: false, rationale: "Tous les nitrates sont solubles." },
      { text: "Aucun précipité ne se forme, car tous les produits potentiels sont solubles.", isCorrect: true, rationale: "Les combinaisons possibles (NaCl et Ca(NO₃)₂) sont toutes deux hautement solubles dans l'eau." },
      { text: "La formation d'un précipité de chlore gazeux.", isCorrect: false, rationale: "Le chlore ne précipite pas sous forme gazeuse." }
    ],
    theoryExplanation: "❤️ Si les deux produits potentiels d'un échange d'ions sont solubles, aucune précipitation n'a lieu."
  },
  {
    id: 37,
    category: "Précipitation",
    question: "❤️ Quel terme désigne l'état solide amorphe qui apparaît en suspension lors de la réaction de précipitation ?",
    options: [
      { text: "Le précipité.", isCorrect: true, rationale: "C'est le solide de faible solubilité qui s'est formé lors de la rencontre des ions." },
      { text: "Le distillat.", isCorrect: false, rationale: "Le distillat est le produit d'une distillation." },
      { text: "Le solvant.", isCorrect: false, rationale: "Le solvant est le liquide majoritaire (l'eau)." },
      { text: "L'ampholyte.", isCorrect: false, rationale: "Un ampholyte est lié aux acides et bases." }
    ],
    theoryExplanation: "❤️ Le précipité solide est la phase condensée insoluble qui s'accumule ou reste en suspension dans la solution."
  },
  {
    id: 38,
    category: "Précipitation",
    question: "On mélange du nitrate de plomb Pb(NO₃)₂ et de l'iodure de potassium KI. Quel solide jaune vif se forme ?",
    options: [
      { text: "Le nitrate de potassium (KNO₃).", isCorrect: false, rationale: "KNO₃ est très soluble." },
      { text: "L'iodure de plomb (PbI₂).", isCorrect: true, rationale: "L'iodure de plomb est insoluble et précipite sous forme d'un solide jaune doré magnifique." },
      { text: "Le chlorure de plomb.", isCorrect: false, rationale: "Il n'y a pas de chlore." },
      { text: "Le plomb métallique.", isCorrect: false, rationale: "Le plomb métallique ne se forme que par réaction redox." }
    ],
    theoryExplanation: "❤️ Les iodures de plomb (PbI₂) sont insolubles d'après ton tableau de solubilité et précipitent en jaune vif."
  },
  {
    id: 39,
    category: "Précipitation",
    question: "Si tu mélanges de l'hydroxyde de potassium KOH et du nitrate de zinc Zn(NO₃)₂, quel précipité se forme ?",
    options: [
      { text: "Le nitrate de potassium KNO₃.", isCorrect: false, rationale: "Les nitrates sont toujours solubles." },
      { text: "L'hydroxyde de zinc Zn(OH)₂.", isCorrect: true, rationale: "La plupart des hydroxydes de métaux de transition sont insolubles." },
      { text: "L'oxyde de zinc.", isCorrect: false, rationale: "L'hydroxyde se forme en premier lieu." },
      { text: "Aucun précipité.", isCorrect: false, rationale: "Zn(OH)₂ précipite." }
    ],
    theoryExplanation: "❤️ Le cation zinc Zn²⁺ s'associe aux hydroxydes OH⁻ pour former un précipité d'hydroxyde de zinc Zn(OH)₂."
  },
  {
    id: 40,
    category: "Précipitation",
    question: "Dans une solution de NaCl dissoute dans l'eau, sous quelle forme se trouvent le sodium et le chlore ?",
    options: [
      { text: "Sous forme d'atomes de sodium métallique et de molécules de dichlore gazeux.", isCorrect: false, rationale: "Le sodium métallique réagirait violemment avec l'eau." },
      { text: "Sous forme d'ions Na⁺ (aq) et Cl⁻ (aq) entièrement dissociés et hydratés.", isCorrect: true, rationale: "Un électrolyte soluble se dissocie complètement en ions libres entourés de molécules d'eau." },
      { text: "Sous forme de cristaux microscopiques de NaCl solide en suspension.", isCorrect: false, rationale: "La solution est limpide, ce qui prouve la dissolution complète." },
      { text: "Sous forme de protons H⁺ et d'ions OH⁻.", isCorrect: false, rationale: "NaCl ne se dissocie pas en protons." }
    ],
    theoryExplanation: "❤️ Un sel soluble se dissocie complètement en solution pour donner des ions libres hydratés, notés (aq)."
  },

  // =========================================================================
  // --- CHAPITRE 2: ACIDES & BASES (QUESTIONS 41 À 80) ---
  // =========================================================================
  {
    id: 41,
    category: "Acides-Bases",
    question: "❤️ Quelle est la définition exacte d'un Acide selon Brönsted ?",
    options: [
      { text: "Une espèce capable de donner un proton H⁺.", isCorrect: true, rationale: "C'est la définition fondamentale de Brönsted : un donneur de proton." },
      { text: "Une espèce capable de capter un proton H⁺.", isCorrect: false, rationale: "C'est la définition d'une base." },
      { text: "Une espèce qui libère uniquement des ions OH⁻.", isCorrect: false, rationale: "C'est une base selon Arrhenius." },
      { text: "Une espèce qui gagne des électrons.", isCorrect: false, rationale: "C'est un oxydant." }
    ],
    theoryExplanation: "❤️ Un acide selon Brönsted est un donneur de proton H⁺."
  },
  {
    id: 42,
    category: "Acides-Bases",
    question: "❤️ Quelle est la définition exacte d'une Base selon Brönsted ?",
    options: [
      { text: "Une espèce capable de donner un proton H⁺.", isCorrect: false, rationale: "C'est un acide." },
      { text: "Une espèce capable de capter un proton H⁺.", isCorrect: true, rationale: "C'est la définition fondamentale de Brönsted : un accepteur de proton." },
      { text: "Une espèce qui gagne des électrons.", isCorrect: false, rationale: "C'est un oxydant." },
      { text: "Une espèce de base neutre insoluble.", isCorrect: false, rationale: "La basicité est liée au transfert de proton, pas à la solubilité." }
    ],
    theoryExplanation: "❤️ Une base selon Brönsted est un accepteur de proton H⁺."
  },
  {
    id: 43,
    category: "Acides-Bases",
    question: "❤️ Qu'est-ce qu'un ampholyte (ou espèce amphotère) ?",
    options: [
      { text: "Une espèce qui ne réagit ni avec les acides, ni avec les bases.", isCorrect: false, rationale: "C'est une espèce inerte." },
      { text: "Une espèce capable de se comporter soit comme un acide, soit comme une base selon le milieu.", isCorrect: true, rationale: "Elle possède un H acide libérable et la capacité de capter un proton." },
      { text: "Un indicateur coloré qui change de teinte.", isCorrect: false, rationale: "Les indicateurs colorés changent de couleur mais ne sont pas nécessairement des amphotères types." },
      { text: "Une espèce qui précipite en solution basique.", isCorrect: false, rationale: "Cela concerne la solubilité des hydroxydes." }
    ],
    theoryExplanation: "❤️ Un ampholyte est une espèce qui possède à la fois un caractère acide et basique selon le partenaire en présence."
  },
  {
    id: 44,
    category: "Acides-Bases",
    question: "❤️ Comment se définit le pH d'une solution aqueuse d'après ton cours ?",
    options: [
      { text: "pH = log[H₃O⁺]", isCorrect: false, rationale: "Le pH est l'opposé du logarithme, il faut un signe moins." },
      { text: "pH = -log[H₃O⁺]", isCorrect: true, rationale: "C'est la relation mathématique fondamentale qui relie le pH à l'activité des ions hydronium." },
      { text: "pH = 10^-Concentration", isCorrect: false, rationale: "C'est la formule réciproque pour la concentration, pas pour le pH." },
      { text: "pH = -log[OH⁻]", isCorrect: false, rationale: "C'est la définition du pOH." }
    ],
    theoryExplanation: "❤️ Le pH est défini par la relation mathématique : pH = -log[H₃O⁺]."
  },
  {
    id: 45,
    category: "Acides-Bases",
    question: "On te demande de compléter la réaction : NH₃ + H₂SO₄ ⇌ ... en supposant le transfert d'un seul proton H⁺. Quel est le résultat ?",
    options: [
      { text: "NH₃ + H₂SO₄ ⇌ NH₄⁺ + HSO₄⁻", isCorrect: true, rationale: "H₂SO₄ cède un proton à NH₃, formant l'ion ammonium NH₄⁺ et l'ion hydrogénosulfate HSO₄⁻." },
      { text: "NH₃ + H₂SO₄ ⇌ NH₄⁺ + SO₄²⁻", isCorrect: false, rationale: "Ceci correspondrait au transfert de deux protons." },
      { text: "NH₃ + H₂SO₄ ⇌ NH₂⁻ + H₃SO₄⁺", isCorrect: false, rationale: "L'acide sulfurique doit donner un proton, pas en capter." },
      { text: "NH₃ + H₂SO₄ ⇌ NH₄SO₄", isCorrect: false, rationale: "Les ions se séparent en solution aqueuse." }
    ],
    theoryExplanation: "❤️ Le transfert d'un seul proton H⁺ de l'acide fort H₂SO₄ vers la base NH₃ donne NH₄⁺ et HSO₄⁻."
  },
  {
    id: 46,
    category: "Acides-Bases",
    question: "Pourquoi la théorie d'Arrhenius a-t-elle été abandonnée au profit de celle de Brönsted ?",
    options: [
      { text: "Parce qu'elle était trop complexe mathématiquement.", isCorrect: false, rationale: "Elle était au contraire très simple, mais limitée." },
      { text: "Parce qu'elle se limitait au solvant eau et n'expliquait pas la basicité d'espèces sans groupement OH (comme NH₃).", isCorrect: true, rationale: "La théorie de Brönsted unifie le concept autour du transfert de proton H⁺ dans tous les solvants." },
      { text: "Parce que le pH n'existait pas à l'époque d'Arrhenius.", isCorrect: false, rationale: "Le pH a été introduit plus tard, mais cela n'a pas invalidé Brönsted." },
      { text: "Parce qu'elle confondait les acides avec les oxydants.", isCorrect: false, rationale: "Ce sont deux domaines bien distincts." }
    ],
    theoryExplanation: "❤️ Arrhenius limitait les bases aux libérateurs d'ions OH⁻, ce qui excluait de nombreuses bases comme l'ammoniac NH₃."
  },
  {
    id: 47,
    category: "Acides-Bases",
    question: "❤️ Qu'est-ce qu'un couple Acide/Base conjugué ?",
    options: [
      { text: "Deux acides qui réagissent ensemble.", isCorrect: false, rationale: "Un couple contient un acide et sa base." },
      { text: "Deux espèces chimiques qui diffèrent par un seul proton H⁺.", isCorrect: true, rationale: "L'acide possède un proton H⁺ de plus que sa base conjuguée." },
      { text: "Un mélange tampon de pH.", isCorrect: false, rationale: "Une solution tampon utilise un couple, mais n'est pas sa définition." },
      { text: "Une base forte et un ion spectateur.", isCorrect: false, rationale: "Les ions spectateurs ne participent pas au transfert." }
    ],
    theoryExplanation: "❤️ Deux espèces forment un couple conjugué si on peut passer de l'une à l'autre par gain ou perte d'un unique proton H⁺."
  },
  {
    id: 48,
    category: "Acides-Bases",
    question: "Quelle est la formule de l'acide conjugué de l'eau (H₂O) ?",
    options: [
      { text: "OH⁻", isCorrect: false, rationale: "OH⁻ est la base conjuguée de l'eau." },
      { text: "H₃O⁺", isCorrect: true, rationale: "En captant un proton H⁺, l'eau devient l'ion hydronium H₃O⁺." },
      { text: "H⁺", isCorrect: false, rationale: "H⁺ est le proton libre, pas l'acide conjugué de la molécule d'eau." },
      { text: "H₂O₂", isCorrect: false, rationale: "C'est l'eau oxygénée." }
    ],
    theoryExplanation: "❤️ L'eau se comporte comme une base en captant un proton pour donner son acide conjugué H₃O⁺."
  },
  {
    id: 49,
    category: "Acides-Bases",
    question: "Quelle est la formule de la base conjuguée de l'eau (H₂O) ?",
    options: [
      { text: "H₃O⁺", isCorrect: false, rationale: "H₃O⁺ est l'acide conjugué." },
      { text: "OH⁻", isCorrect: true, rationale: "En perdant un proton H⁺, l'eau devient l'ion hydroxyde OH⁻." },
      { text: "O²⁻", isCorrect: false, rationale: "L'ion oxyde n'est pas la base conjuguée de l'eau." },
      { text: "H₂", isCorrect: false, rationale: "C'est le dihydrogène." }
    ],
    theoryExplanation: "❤️ L'eau se comporte comme un acide en cédant un proton pour donner sa base conjuguée OH⁻."
  },
  {
    id: 50,
    category: "Acides-Bases",
    question: "Complète l'équation de neutralisation complète suivante : Ca(OH)₂ + H₂SO₄ ⇌ ... ?",
    options: [
      { text: "Ca(OH)₂ + H₂SO₄ ⇌ CaSO₄ + 2 H₂O", isCorrect: true, rationale: "Le diacide H₂SO₄ libère 2 H⁺ neutralisés par les 2 OH⁻ de la dibase Ca(OH)₂, formant le sel CaSO₄ et 2 H₂O." },
      { text: "Ca(OH)₂ + H₂SO₄ ⇌ CaSO₄ + H₂O", isCorrect: false, rationale: "Le nombre de molécules d'eau n'est pas équilibré." },
      { text: "Ca(OH)₂ + H₂SO₄ ⇌ Ca(SO₄)₂ + 2 H₂O", isCorrect: false, rationale: "La formule du sulfate de calcium est CaSO₄ car Ca²⁺ et SO₄²⁻ s'associent à 1:1." },
      { text: "Ca²⁺ + SO₄²⁻ ⇌ CaSO₄", isCorrect: false, rationale: "C'est une précipitation, pas l'équation moléculaire de neutralisation." }
    ],
    theoryExplanation: "❤️ La neutralisation complète d'un diacide par une dibase produit du sel et de l'eau dans un rapport stœchiométrique simple."
  },
  {
    id: 51,
    category: "Acides-Bases",
    question: "Quelle est l'équation de neutralisation complète de l'acide nitrique (HNO₃) par l'hydroxyde de baryum Ba(OH)₂ ?",
    options: [
      { text: "2 HNO₃ + Ba(OH)₂ ⇌ Ba(NO₃)₂ + 2 H₂O", isCorrect: true, rationale: "L'acide nitrique est un monoacide. Il faut 2 HNO₃ pour neutraliser les 2 groupements OH⁻ de Ba(OH)₂." },
      { text: "HNO₃ + Ba(OH)₂ ⇌ BaNO₃ + H₂O", isCorrect: false, rationale: "Le nitrate de baryum s'écrit Ba(NO₃)₂ car l'ion baryum porte deux charges positives (Ba²⁺)." },
      { text: "2 HNO₃ + Ba(OH)₂ ⇌ Ba(NO₃)₂ + H₂O", isCorrect: false, rationale: "L'équation n'est pas équilibrée au niveau de l'eau." },
      { text: "HNO₃ + Ba(OH)₂ ⇌ Ba(NO₃)₂ + 2 H₂O", isCorrect: false, rationale: "L'azote et l'hydrogène ne sont pas équilibrés à gauche." }
    ],
    theoryExplanation: "❤️ Neutralisation : Les ions baryum Ba²⁺ et nitrates NO₃⁻ forment le sel soluble Ba(NO₃)₂, accompagnés d'eau."
  },
  {
    id: 52,
    category: "Acides-Bases",
    question: "❤️ Quelle est la relation mathématique exacte reliant [H₃O⁺] et [OH⁻] à 25°C dans toute solution aqueuse ?",
    options: [
      { text: "[H₃O⁺] + [OH⁻] = 14", isCorrect: false, rationale: "C'est la relation des pH et pOH, pas des concentrations." },
      { text: "[H₃O⁺] × [OH⁻] = 10⁻¹⁴", isCorrect: true, rationale: "C'est le produit ionique de l'eau (Ke), constant à 25°C." },
      { text: "[H₃O⁺] / [OH⁻] = 10⁷", isCorrect: false, rationale: "Le rapport varie selon l'acidité, seul leur produit est constant." },
      { text: "[H₃O⁺] × [OH⁻] = 7", isCorrect: false, rationale: "La valeur constante est 10⁻¹⁴." }
    ],
    theoryExplanation: "❤️ L'autoprotolyse de l'eau impose que le produit des concentrations en ions hydronium et hydroxyde vaille toujours 10⁻¹⁴ à 25°C."
  },
  {
    id: 53,
    category: "Acides-Bases",
    question: "Si une solution a un pH égal à 7,00 à 25°C, que vaut la concentration en ions hydronium [H₃O⁺] ?",
    options: [
      { text: "1,00 × 10⁻⁷ mol/L", isCorrect: true, rationale: "[H₃O⁺] = 10^-pH = 10^-7 = 1,00 × 10⁻⁷ mol/L." },
      { text: "7,00 mol/L", isCorrect: false, rationale: "La valeur du pH ne correspond pas directement à la concentration brute." },
      { text: "1,00 × 10⁻¹⁴ mol/L", isCorrect: false, rationale: "C'est la valeur du produit ionique de l'eau, pas de [H₃O⁺]." },
      { text: "1,00 × 10⁷ mol/L", isCorrect: false, rationale: "La puissance doit être négative pour un pH acide/neutre." }
    ],
    theoryExplanation: "❤️ Une solution neutre présente une concentration en ions hydronium égale à 10⁻⁷ mol/L à 25°C."
  },
  {
    id: 54,
    category: "Acides-Bases",
    question: "Si une solution aqueuse présente une concentration [H₃O⁺] = 1,00 × 10⁻² mol/L, quel est son pH ?",
    options: [
      { text: "2,00", isCorrect: true, rationale: "pH = -log(10⁻²) = 2. C'est une solution acide." },
      { text: "-2,00", isCorrect: false, rationale: "Le pH est l'opposé du logarithme, la valeur est donc positive." },
      { text: "12,00", isCorrect: false, rationale: "C'est la valeur du pOH de cette solution." },
      { text: "10,00", isCorrect: false, rationale: "La concentration correspond à un exposant de -2, donc pH = 2." }
    ],
    theoryExplanation: "❤️ Relation du pH : pH = -log[H₃O⁺]. Pour [H₃O⁺] = 10⁻² mol/L, le pH vaut 2."
  },
  {
    id: 55,
    category: "Acides-Bases",
    question: "Pourquoi l'acide chlorhydrique (HCl) est-il qualifié d'acide fort dans l'eau ?",
    options: [
      { text: "Parce qu'il ne se dissout pas dans l'eau.", isCorrect: false, rationale: "Il est extrêmement soluble." },
      { text: "Parce qu'il se dissocie totalement et de manière irréversible dans l'eau pour libérer tous ses protons.", isCorrect: true, rationale: "Un acide fort s'ionise à 100 % en solution aqueuse." },
      { text: "Parce que son pH est toujours négatif.", isCorrect: false, rationale: "Le pH dépend de sa concentration, pas seulement de sa force." },
      { text: "Parce qu'il capte les électrons du solvant.", isCorrect: false, rationale: "Les acides libèrent des protons, ils ne captent pas d'électrons." }
    ],
    theoryExplanation: "❤️ Un acide fort est un électrolyte qui subit une ionisation totale et complète dans l'eau."
  },
  {
    id: 56,
    category: "Acides-Bases",
    question: "Si tu mélanges de l'acide nitrique (HNO₃) et de l'hydroxyde de sodium (NaOH), quel sel soluble de neutralisation se forme ?",
    options: [
      { text: "Le chlorure de sodium (NaCl).", isCorrect: false, rationale: "Il n'y a pas d'ions chlorure." },
      { text: "Le nitrate de sodium (NaNO₃).", isCorrect: true, rationale: "Le cation Na⁺ de la base s'associe à l'anion NO₃⁻ de l'acide pour former NaNO₃." },
      { text: "L'hydroxyde de sodium.", isCorrect: false, rationale: "C'est le réactif de départ." },
      { text: "L'acide nitreux.", isCorrect: false, rationale: "L'acide nitreux est HNO₂." }
    ],
    theoryExplanation: "❤️ Neutralisation : HNO₃ + NaOH → NaNO₃ + H₂O. Le sel de neutralisation formé est le nitrate de sodium."
  },
  {
    id: 57,
    category: "Acides-Bases",
    question: "Quelle est la base conjuguée de l'acide carbonique H₂CO₃ ?",
    options: [
      { text: "CO₃²⁻", isCorrect: false, rationale: "CO₃²⁻ est la base conjuguée de HCO₃⁻." },
      { text: "HCO₃⁻", isCorrect: true, rationale: "En cédant un proton H⁺, H₂CO₃ se transforme en sa base conjuguée, l'ion hydrogénocarbonate HCO₃⁻." },
      { text: "H₃O⁺", isCorrect: false, rationale: "H₃O⁺ est l'acide conjugué de l'eau." },
      { text: "OH⁻", isCorrect: false, rationale: "OH⁻ est la base conjuguée de l'eau." }
    ],
    theoryExplanation: "❤️ Couple conjugué : H₂CO₃ / HCO₃⁻. L'acide cède un proton pour donner sa base conjuguée."
  },
  {
    id: 58,
    category: "Acides-Bases",
    question: "Quelle est la formule de l'acide conjugué de l'ion carbonate CO₃²⁻ ?",
    options: [
      { text: "H₂CO₃", isCorrect: false, rationale: "H₂CO₃ est l'acide conjugué de HCO₃⁻." },
      { text: "HCO₃⁻", isCorrect: true, rationale: "En captant un proton H⁺, CO₃²⁻ se transforme en son acide conjugué, l'ion hydrogénocarbonate HCO₃⁻." },
      { text: "CO₂", isCorrect: false, rationale: "Le dioxyde de carbone n'est pas un acide conjugué direct de l'ion carbonate." },
      { text: "H₃O⁺", isCorrect: false, rationale: "C'est l'acide conjugué de l'eau." }
    ],
    theoryExplanation: "❤️ Couple conjugué : HCO₃⁻ / CO₃²⁻. La base capte un proton pour donner son acide conjugué."
  },
  {
    id: 59,
    category: "Acides-Bases",
    question: "❤️ Comment se comporte l'ion hydrogénophosphate (HPO₄²⁻) lorsqu'il agit en tant qu'acide dans l'eau ?",
    options: [
      { text: "Il capte un proton pour donner H₂PO₄⁻.", isCorrect: false, rationale: "C'est son comportement de base." },
      { text: "Il cède son proton pour donner l'ion phosphate PO₄³⁻.", isCorrect: true, rationale: "En donnant H⁺, il montre sa nature acide." },
      { text: "Il se décompose en phosphore solide.", isCorrect: false, rationale: "Il s'agit d'un équilibre de transfert de proton." },
      { text: "Il neutralise l'eau pour donner du pH 14.", isCorrect: false, rationale: "Le pH dépend de la concentration et de l'équilibre." }
    ],
    theoryExplanation: "❤️ En tant qu'acide de Brönsted, HPO₄²⁻ cède son proton H⁺ : HPO₄²⁻ + H₂O ⇌ PO₄³⁻ + H₃O⁺."
  },
  {
    id: 60,
    category: "Acides-Bases",
    question: "❤️ Comment se comporte l'ion hydrogénophosphate (HPO₄²⁻) lorsqu'il agit en tant que base dans l'eau ?",
    options: [
      { text: "Il cède un proton pour donner PO₄³⁻.", isCorrect: false, rationale: "C'est son comportement d'acide." },
      { text: "Il capte un proton de l'eau pour former l'ion dihydrogénophosphate H₂PO₄⁻.", isCorrect: true, rationale: "En acceptant H⁺, il montre sa nature basique." },
      { text: "Il libère des ions hydroxydes solides.", isCorrect: false, rationale: "Les hydroxydes restent dissous." },
      { text: "Il s'associe au sodium pour précipiter.", isCorrect: false, rationale: "Les phosphates de sodium sont solubles." }
    ],
    theoryExplanation: "❤️ En tant que base de Brönsted, HPO₄²⁻ capte un proton H⁺ : HPO₄²⁻ + H₂O ⇌ H₂PO₄⁻ + OH⁻."
  },
  {
    id: 61,
    category: "Acides-Bases",
    question: "Quel est le pH d'une solution aqueuse dont la concentration en ions hydronium est [H₃O⁺] = 1,00 × 10⁻⁷ mol/L à 25°C ?",
    options: [
      { text: "pH = 1,00", isCorrect: false, rationale: "Le pH est égal à la valeur positive de l'exposant de 10." },
      { text: "pH = 7,00", isCorrect: true, rationale: "pH = -log(10⁻⁷) = 7. La solution est parfaitement neutre." },
      { text: "pH = 14,00", isCorrect: false, rationale: "14 est la somme du pH et du pOH." },
      { text: "pH = 0,00", isCorrect: false, rationale: "pH = 0 correspondrait à [H₃O⁺] = 1 M." }
    ],
    theoryExplanation: "❤️ Une concentration [H₃O⁺] de 10⁻⁷ mol/L correspond à la neutralité exacte à 25°C, soit pH = 7."
  },
  {
    id: 62,
    category: "Acides-Bases",
    question: "Si on dissout un acide fort dans l'eau pure, comment évoluent la concentration [H₃O⁺] et le pH ?",
    options: [
      { text: "[H₃O⁺] diminue et le pH augmente.", isCorrect: false, rationale: "Un acide augmente la concentration en protons." },
      { text: "[H₃O⁺] augmente et le pH diminue.", isCorrect: true, rationale: "Plus il y a de protons, plus la solution est acide, donc plus le pH baisse." },
      { text: "[H₃O⁺] et le pH augmentent tous les deux.", isCorrect: false, rationale: "Le pH et la concentration varient en sens inverse à cause du signe négatif du logarithme." },
      { text: "Ils restent parfaitement constants.", isCorrect: false, rationale: "L'apport d'acide modifie l'équilibre de l'eau." }
    ],
    theoryExplanation: "❤️ L'ajout d'un acide augmente [H₃O⁺]. Comme pH = -log[H₃O⁺], le pH diminue lorsque [H₃O⁺] augmente."
  },
  {
    id: 63,
    category: "Acides-Bases",
    question: "Si on dissout une base forte dans l'eau pure, comment évoluent la concentration [H₃O⁺] et le pH ?",
    options: [
      { text: "[H₃O⁺] augmente et le pH diminue.", isCorrect: false, rationale: "C'est l'effet d'un acide." },
      { text: "[H₃O⁺] diminue et le pH augmente.", isCorrect: true, rationale: "La base consomme des protons H₃O⁺, ce qui fait monter le pH au-dessus de 7." },
      { text: "[H₃O⁺] et le pH diminuent tous les deux.", isCorrect: false, rationale: "Le pH augmente en milieu basique." },
      { text: "Le pH reste fixé à 7.", isCorrect: false, rationale: "La solution devient basique." }
    ],
    theoryExplanation: "❤️ L'apport de base diminue [H₃O⁺] par réaction avec OH⁻, ce qui fait augmenter la valeur du pH."
  },
  {
    id: 64,
    category: "Acides-Bases",
    question: "D'après les relations constantes du produit de l'eau, si la concentration [H₃O⁺] vaut 1,00 × 10⁻⁴ mol/L, que vaut la concentration [OH⁻] ?",
    options: [
      { text: "1,00 × 10⁻¹⁰ mol/L", isCorrect: true, rationale: "[OH⁻] = 10⁻¹⁴ / [H₃O⁺] = 10⁻¹⁴ / 10⁻⁴ = 10⁻¹⁰ mol/L." },
      { text: "1,00 × 10⁻⁴ mol/L", isCorrect: false, rationale: "Les concentrations ne sont égales qu'à la neutralité." },
      { text: "1,00 × 10⁻¹⁴ mol/L", isCorrect: false, rationale: "C'est la valeur du produit Ke." },
      { text: "1,00 × 10⁴ mol/L", isCorrect: false, rationale: "La concentration doit être extrêmement petite." }
    ],
    theoryExplanation: "❤️ À 25°C, la relation [H₃O⁺] × [OH⁻] = 10⁻¹⁴ is toujours vérifiée."
  },
  {
    id: 65,
    category: "Acides-Bases",
    question: "Complète la réaction de transfert de proton : H₂CO₃ + OH⁻ ⇌ ... ?",
    options: [
      { text: "H₂CO₃ + OH⁻ ⇌ HCO₃⁻ + H₂O", isCorrect: true, rationale: "L'acide H₂CO₃ cède un proton à la base forte OH⁻ pour donner HCO₃⁻ et de l'eau." },
      { text: "H₂CO₃ + OH⁻ ⇌ CO₃²⁻ + H₃O⁺", isCorrect: false, rationale: "Le transfert d'un seul proton avec OH⁻ donne H₂O, pas H₃O⁺." },
      { text: "H₂CO₃ + OH⁻ ⇌ HCO₃⁻ + H₃O⁺", isCorrect: false, rationale: "L'ion hydroxyde OH⁻ devient de l'eau H₂O en captant H⁺." },
      { text: "H₂CO₃ + OH⁻ ⇌ CO₂ + H₂O", isCorrect: false, rationale: "Cette décomposition n'est pas le transfert de proton direct." }
    ],
    theoryExplanation: "❤️ Le transfert d'un proton H⁺ de l'acide carbonique H₂CO₃ à la base hydroxyde OH⁻ donne l'ion hydrogénocarbonate et de l'eau."
  },
  {
    id: 66,
    category: "Acides-Bases",
    question: "Quel terme désigne une substance chimique dont la couleur change en fonction du pH de la solution ?",
    options: [
      { text: "Un indicateur coloré.", isCorrect: true, rationale: "Les indicateurs colorés possèdent une zone de virage de couleur spécifique à un domaine de pH." },
      { text: "Un précipité coloré.", isCorrect: false, rationale: "Un précipité est un solide, il ne change pas de couleur selon le pH de manière réversible." },
      { text: "Un solvant amphotère.", isCorrect: false, rationale: "Le solvant ne change pas de couleur." },
      { text: "Un réducteur métallique.", isCorrect: false, rationale: "C'est un concept d'oxydoréduction." }
    ],
    theoryExplanation: "❤️ Un indicateur coloré est un couple acide/base faible dont les deux formes conjuguées présentent des teintes différentes."
  },
  {
    id: 67,
    category: "Acides-Bases",
    question: "❤️ Qu'est-ce qu'un triacide d'après les exemples étudiés dans ton cours ?",
    options: [
      { text: "Un acide qui possède trois atomes d'oxygène.", isCorrect: false, rationale: "La force ou le nombre de protons ne dépend pas directement des oxygènes." },
      { text: "Un acide capable de libérer trois protons H⁺ par molécule.", isCorrect: true, rationale: "L'acide phosphorique H₃PO₄ est le triacide de référence de ton cours." },
      { text: "Un acide qui réagit trois fois plus vite.", isCorrect: false, rationale: "La vitesse n'est pas liée à cette définition." },
      { text: "Un mélange de trois acides forts différents.", isCorrect: false, rationale: "C'est un mélange d'acides." }
    ],
    theoryExplanation: "❤️ Un polyacide capable de libérer exactement trois protons H⁺ est appelé un triacide."
  },
  {
    id: 68,
    category: "Acides-Bases",
    question: "Comment se comporte l'eau pure d'un point de vue acide-base à 25°C ?",
    options: [
      { text: "Elle est légèrement acide.", isCorrect: false, rationale: "Le pH de l'eau pure est de 7,00." },
      { text: "Elle est parfaitement neutre.", isCorrect: true, rationale: "Les concentrations en ions hydronium [H₃O⁺] et hydroxyde [OH⁻] sont égales à 10⁻⁷ mol/L." },
      { text: "Elle est fortement basique.", isCorrect: false, rationale: "Le pH n'est pas supérieur à 7." },
      { text: "Elle ne contient aucun ion.", isCorrect: false, rationale: "Elle contient de très faibles concentrations d'ions issus de son autoprotolyse." }
    ],
    theoryExplanation: "❤️ L'eau pure est neutre car l'autoprotolyse produit autant d'ions hydronium que d'ions hydroxyde."
  },
  {
    id: 69,
    category: "Acides-Bases",
    question: "Si tu dilues une solution acide en y ajoutant de l'eau pure, comment varie son pH ?",
    options: [
      { text: "Le pH diminue pour devenir négatif.", isCorrect: false, rationale: "La dilution diminue l'acidité." },
      { text: "Le pH augmente et se rapproche de 7.", isCorrect: true, rationale: "La concentration en ions H₃O⁺ diminue, donc le pH augmente vers la neutralité." },
      { text: "Le pH reste strictement inchangé.", isCorrect: false, rationale: "La concentration en ions H₃O⁺ est modifiée par l'ajout de volume." },
      { text: "Le pH monte instantanément à 14.", isCorrect: false, rationale: "La solution ne devient pas une base forte." }
    ],
    theoryExplanation: "❤️ Diluer un acide diminue la concentration [H₃O⁺], ce qui fait monter le pH en direction de la neutralité (7)."
  },
  {
    id: 70,
    category: "Acides-Bases",
    question: "Si tu dilues une solution basique en y ajoutant de l'eau pure, comment varie son pH ?",
    options: [
      { text: "Le pH augmente vers 14.", isCorrect: false, rationale: "La dilution diminue la basicité." },
      { text: "Le pH diminue et se rapproche de 7.", isCorrect: true, rationale: "La concentration en ions OH⁻ diminue, ce qui rapproche la solution de la neutralité." },
      { text: "Le pH reste identique.", isCorrect: false, rationale: "Le volume modifie les concentrations." },
      { text: "Le pH baisse jusqu'à 0.", isCorrect: false, rationale: "La solution ne devient pas un acide fort." }
    ],
    theoryExplanation: "❤️ Diluer une base diminue sa basicité, ce qui fait baisser la valeur de son pH en direction de la neutralité (7)."
  },
  {
    id: 71,
    category: "Acides-Bases",
    question: "Quelle est la base conjuguée de l'ion ammonium NH₄⁺ ?",
    options: [
      { text: "NH₃", isCorrect: true, rationale: "En cédant son proton H⁺, l'ion ammonium NH₄⁺ devient de l'ammoniac NH₃." },
      { text: "NH₂⁻", isCorrect: false, rationale: "NH₂⁻ est l'amidure, base conjuguée de l'ammoniac, mais pas de l'ammonium." },
      { text: "HNO₃", isCorrect: false, rationale: "HNO₃ est l'acide nitrique." },
      { text: "NH₄OH", isCorrect: false, rationale: "C'est l'hydroxyde d'ammonium." }
    ],
    theoryExplanation: "❤️ Le couple conjugué de référence est NH₄⁺ / NH₃. L'ammonium est l'acide et l'ammoniac est la base."
  },
  {
    id: 72,
    category: "Acides-Bases",
    question: "Quelle est la formule de l'acide conjugué de l'ammoniac NH₃ ?",
    options: [
      { text: "NH₄⁺", isCorrect: true, rationale: "En captant un proton H⁺, l'ammoniac NH₃ devient son acide conjugué, l'ion ammonium NH₄⁺." },
      { text: "NH₂⁻", isCorrect: false, rationale: "NH₂⁻ est la base conjuguée de l'ammoniac." },
      { text: "HNO₃", isCorrect: false, rationale: "L'acide nitrique n'est pas conjugué à l'ammoniac." },
      { text: "H₃O⁺", isCorrect: false, rationale: "C'est l'acide conjugué de l'eau." }
    ],
    theoryExplanation: "❤️ L'ammoniac NH₃ se comporte comme une base de Brönsted en fixant un proton pour donner l'ion ammonium NH₄⁺."
  },
  {
    id: 73,
    category: "Acides-Bases",
    question: "Dans la réaction de neutralisation complète de l'acide bromhydrique HBr par l'hydroxyde de lithium LiOH, quel sel se forme ?",
    options: [
      { text: "Le bromure de lithium (LiBr).", isCorrect: true, rationale: "Le cation Li⁺ s'associe à l'anion Br⁻ pour former le sel soluble LiBr." },
      { text: "Le chlorure de lithium.", isCorrect: false, rationale: "Il n'y a pas de chlore." },
      { text: "Le sulfate de lithium.", isCorrect: false, rationale: "Il n'y a pas de soufre." },
      { text: "L'hydroxyde de lithium.", isCorrect: false, rationale: "C'est la base de départ." }
    ],
    theoryExplanation: "❤️ Neutralisation : LiOH + HBr → LiBr + H₂O. Le sel de neutralisation est le bromure de lithium."
  },
  {
    id: 74,
    category: "Acides-Bases",
    question: "Qu'est-ce qu'un diacide d'après les notions de ton cours ?",
    options: [
      { text: "Un acide qui possède deux molécules d'eau.", isCorrect: false, rationale: "L'eau est le solvant." },
      { text: "Un acide capable de libérer deux protons H⁺ par molécule.", isCorrect: true, rationale: "L'acide sulfurique H₂SO₄ ou l'acide sulfureux H₂SO₃ sont des diacides de ton cours." },
      { text: "Un acide deux fois moins fort qu'un autre.", isCorrect: false, rationale: "Le terme diacide désigne le nombre de protons libérables, pas la force." },
      { text: "Une base deux fois plus forte.", isCorrect: false, rationale: "Un diacide est une espèce acide, pas basique." }
    ],
    theoryExplanation: "❤️ Un polyacide capable d'abandonner deux protons H⁺ est appelé un diacide."
  },
  {
    id: 75,
    category: "Acides-Bases",
    question: "Quelle est l'équation de neutralisation complète de l'acide sulfurique (H₂SO₄) par l'hydroxyde de calcium Ca(OH)₂ ?",
    options: [
      { text: "Ca(OH)₂ + H₂SO₄ ⇌ CaSO₄ + 2 H₂O", isCorrect: true, rationale: "C'est l'équation moléculaire globale équilibrée. Les deux protons neutralisent les deux hydroxydes." },
      { text: "Ca(OH)₂ + H₂SO₄ ⇌ CaSO₄ + H₂O", isCorrect: false, rationale: "L'hydrogène et l'oxygène ne sont pas équilibrés pour l'eau." },
      { text: "Ca²⁺ + SO₄²⁻ ⇌ CaSO₄", isCorrect: false, rationale: "C'est l'équation de précipitation du sel formé." },
      { text: "Ca(OH)₂ + H₂SO₄ ⇌ Ca(SO₄)₂ + 2 H₂O", isCorrect: false, rationale: "La formule de CaSO₄ est neutre à 1:1." }
    ],
    theoryExplanation: "❤️ La neutralisation complète d'un diacide par une dibase produit du sel et de l'eau."
  },
  {
    id: 76,
    category: "Acides-Bases",
    question: "❤️ Comment varie le pH d'une solution si la concentration en ions [H₃O⁺] est multipliée par 10 ?",
    options: [
      { text: "Le pH augmente de 1 unité.", isCorrect: false, rationale: "Si la concentration augmente, le pH doit diminuer." },
      { text: "Le pH diminue de 1 unité.", isCorrect: true, rationale: "Comme le pH est une échelle logarithmique négative, multiplier par 10 la concentration fait baisser le pH de 1." },
      { text: "Le pH est multiplié par 10.", isCorrect: false, rationale: "L'échelle n'est pas linéaire mais logarithmique." },
      { text: "Le pH reste parfaitement identique.", isCorrect: false, rationale: "La valeur du pH est sensible aux variations de concentration." }
    ],
    theoryExplanation: "❤️ Une variation d'une unité sur l'échelle de pH correspond à une variation d'un facteur 10 de la concentration en ions hydronium."
  },
  {
    id: 77,
    category: "Acides-Bases",
    question: "❤️ Comment varie la concentration en ions [H₃O⁺] si le pH d'une solution augmente de 2 unités (par exemple de 3 à 5) ?",
    options: [
      { text: "Elle est multipliée par 100.", isCorrect: false, rationale: "Le pH augmente, donc la concentration doit diminuer." },
      { text: "Elle est divisée par 100.", isCorrect: true, rationale: "Une augmentation de 2 unités de pH correspond à une diminution de la concentration en ions hydronium d'un facteur 10² = 100." },
      { text: "Elle diminue de 2 mol/L.", isCorrect: false, rationale: "La variation est géométrique (facteur 10) et non arithmétique." },
      { text: "Elle reste inchangée.", isCorrect: false, rationale: "Le pH dépend directement de cette concentration." }
    ],
    theoryExplanation: "❤️ Chaque augmentation d'une unité de pH divise par 10 la concentration en ions hydronium. Pour 2 unités, elle est divisée par 100."
  },
  {
    id: 78,
    category: "Acides-Bases",
    question: "Quel est l'acide conjugué de l'ion acétate CH₃-COO⁻ ?",
    options: [
      { text: "CH₃-COOH", isCorrect: true, rationale: "En captant un proton H⁺, l'ion acétate devient de l'acide acétique CH₃-COOH." },
      { text: "H₂CO₃", isCorrect: false, rationale: "C'est l'acide carbonique, indépendant de l'acétate." },
      { text: "CH₃-COO²⁻", isCorrect: false, rationale: "L'ion acétate ne perd pas de proton pour devenir plus négatif." },
      { text: "H₃O⁺", isCorrect: false, rationale: "C'est l'acide conjugué de l'eau." }
    ],
    theoryExplanation: "❤️ Le couple conjugué est CH₃-COOH / CH₃-COO⁻. L'acide acétique est l'acide, l'acétate est sa base conjuguée."
  },
  {
    id: 79,
    category: "Acides-Bases",
    question: "Quelle est la base conjuguée de l'acide nitreux HNO₂ ?",
    options: [
      { text: "NO₂⁻", isCorrect: true, rationale: "En perdant son proton H⁺, l'acide nitreux HNO₂ se transforme en ion nitrite NO₂⁻." },
      { text: "NO₃⁻", isCorrect: false, rationale: "NO₃⁻ est l'ion nitrate, base conjuguée de l'acide nitrique HNO₃." },
      { text: "HNO₃", isCorrect: false, rationale: "HNO₃ est l'acide nitrique." },
      { text: "NH₄⁺", isCorrect: false, rationale: "C'est l'ion ammonium." }
    ],
    theoryExplanation: "❤️ Le couple conjugué est HNO₂ / NO₂⁻. L'acide nitreux cède un proton pour donner le nitrite."
  },
  {
    id: 80,
    category: "Acides-Bases",
    question: "Si une solution présente un pH égal à 7,00 à 25°C, quel adjectif qualifie la nature de cette solution ?",
    options: [
      { text: "Acide.", isCorrect: false, rationale: "Une solution acide a un pH strictement inférieur à 7." },
      { text: "Neutre.", isCorrect: true, rationale: "À pH = 7, les concentrations en ions hydronium et hydroxyde sont équilibrées." },
      { text: "Basique.", isCorrect: false, rationale: "Une solution basique a un pH strictement supérieur à 7." },
      { text: "Insoluble.", isCorrect: false, rationale: "C'est une propriété de précipitation, pas de pH." }
    ],
    theoryExplanation: "❤️ Échelle de pH à 25°C : pH = 7 désigne la neutralité chimique exacte."
  },

  // =========================================================================
  // --- CHAPITRE 3: OXYDORÉDUCTIONS (QUESTIONS 81 À 120) ---
  // =========================================================================
  {
    id: 81,
    category: "Oxydoréduction",
    question: "❤️ Quelles sont les définitions exactes d'un Oxydant et d'un Réducteur ?",
    options: [
      { text: "Oxydant = donneur d'électrons | Réducteur = accepteur d'électrons", isCorrect: false, rationale: "C'est l'inverse ! Ne confonds pas les donneurs et les receveurs." },
      { text: "Oxydant = accepteur d'électrons | Réducteur = donneur d'électrons", isCorrect: true, rationale: "L'oxydant capte les électrons (se réduit) et le réducteur cède les électrons (s'oxyde)." },
      { text: "Oxydant = donneur de protons H⁺ | Réducteur = accepteur de protons H⁺", isCorrect: false, rationale: "Ce sont les définitions acide-base de Brönsted." },
      { text: "Oxydant = espèce qui s'oxyde | Réducteur = espèce qui se réduit", isCorrect: false, rationale: "C'est l'inverse : le réducteur subit l'oxydation et l'oxydant subit la réduction." }
    ],
    theoryExplanation: "❤️ Un oxydant est une espèce chimique capable de capter un ou plusieurs électrons. Un réducteur est une espèce chimique capable de donner un ou plusieurs électrons."
  },
  {
    id: 82,
    category: "Oxydoréduction",
    question: "On plonge de l'aluminium (Al) dans une solution contenant des ions Ni²⁺. Combien d'électrons sont transférés au total dans l'équation globale équilibrée (recherche du P.C.M.) ?",
    options: [
      { text: "2 électrons.", isCorrect: false, rationale: "L'aluminium libère 3 électrons, on ne peut pas en échanger seulement 2." },
      { text: "3 électrons.", isCorrect: false, rationale: "L'ion nickel n'en capte que 2, l'échange ne serait pas équilibré." },
      { text: "6 électrons.", isCorrect: true, rationale: "Le P.C.M. entre 3e⁻ (perdus par Al) et 2e⁻ (gagnés par Ni²⁺) est de 6. Les coefficients sont donc de 2 pour Al et 3 pour Ni." },
      { text: "5 électrons.", isCorrect: false, rationale: "On ne fait pas la somme des électrons, on cherche leur multiple commun." }
    ],
    theoryExplanation: "❤️ Dans une réaction d'oxydoréduction, tous les électrons perdus lors de l'oxydation doivent être captés lors de la réduction. On utilise le P.C.M. des électrons pour équilibrer la réaction globale."
  },
  {
    id: 83,
    category: "Oxydoréduction",
    question: "Quelle est l'équation globale d'oxydoréduction équilibrée lorsque le zinc réagit avec le diiode (I₂) ?",
    options: [
      { text: "Zn + I₂ → Zn²⁺ + 2 I⁻", isCorrect: true, rationale: "Le zinc s'oxyde en perdant 2e⁻ et le diiode se réduit en captant ces 2e⁻. L'équation s'équilibre naturellement à 1 pour 1." },
      { text: "2 Zn + I₂ → 2 Zn²⁺ + I⁻", isCorrect: false, rationale: "Les charges et la stœchiométrie de l'iode ne sont pas équilibrées." },
      { text: "Zn + 2 I⁻ → Zn²⁺ + I₂", isCorrect: false, rationale: "C'est l'équation de la réaction inverse, qui n'est pas spontanée ici." },
      { text: "Zn + I → Zn²⁺ + I⁻", isCorrect: false, rationale: "Le diiode moléculaire est I₂ et forme deux ions iodures (2 I⁻) lors de sa réduction." }
    ],
    theoryExplanation: "Les électrons perdus par le zinc métallique (2e⁻) sont directement captés par le diiode (I₂), ce qui équilibre l'équation globale."
  },
  {
    id: 84,
    category: "Oxydoréduction",
    question: "On fait réagir le couple Zn²⁺/Zn et Li⁺/Li (l'oxydant Zn²⁺ avec le réducteur Li). Dans quel sens s'effectue le transfert d'électrons ?",
    options: [
      { text: "Les électrons quittent le réducteur Li pour être captés par l'oxydant Zn²⁺.", isCorrect: true, rationale: "Les électrons migrent toujours du donneur (le réducteur Li) vers l'accepteur (l'oxydant Zn²⁺)." },
      { text: "Les électrons quittent l'oxydant Zn²⁺ pour aller vers le réducteur Li.", isCorrect: false, rationale: "Un oxydant capte les électrons, il ne peut pas les donner." },
      { text: "Les électrons restent liés à leurs atomes respectifs, il n'y a pas de transfert réel.", isCorrect: false, rationale: "Une réaction d'oxydoréduction implique obligatoirement un transfert réel d'électrons." },
      { text: "Le transfert d'électrons s'effectue des ions Li⁺ vers le zinc métallique.", isCorrect: false, rationale: "Les ions Li⁺ sont des oxydants très faibles et ne peuvent pas réagir de cette façon dans ces conditions." }
    ],
    theoryExplanation: "❤️ Dans une réaction d'oxydoréduction, le transfert d'électrons est représenté par des flèches tracées toujours du réducteur (donneur) vers l'oxydant (receveur)."
  },
  {
    id: 85,
    category: "Oxydoréduction",
    question: "❤️ Comment définit-on une réaction d'oxydation ?",
    options: [
      { text: "Une réaction caractérisée par une perte d'un ou de plusieurs électrons.", isCorrect: true, rationale: "L'oxydation est la demi-équation au cours de laquelle le réducteur s'appauvrit en électrons." },
      { text: "Une réaction caractérisée par un gain d'un ou de plusieurs électrons.", isCorrect: false, rationale: "C'est la définition d'une réduction." },
      { text: "Une réaction caractérisée par la formation d'un solide de sel de baryum.", isCorrect: false, rationale: "C'est un phénomène de précipitation." },
      { text: "Un transfert de protons H⁺ de Brönsted.", isCorrect: false, rationale: "C'est une réaction acide-base." }
    ],
    theoryExplanation: "❤️ Oxydation : Perte d'électrons (notée du côté des produits de la demi-équation)."
  },
  {
    id: 86,
    category: "Oxydoréduction",
    question: "❤️ Comment définit-on une réaction de réduction ?",
    options: [
      { text: "Une réaction caractérisée par une perte d'électrons.", isCorrect: false, rationale: "C'est la définition d'une oxydation." },
      { text: "Une réaction caractérisée par un gain d'un ou de plusieurs électrons.", isCorrect: true, rationale: "La réduction est la demi-équation au cours de laquelle l'oxydant capte des électrons." },
      { text: "Une neutralisation totale des ions hydroxydes.", isCorrect: false, rationale: "C'est une réaction acide-base." },
      { text: "Le passage d'un ion spectateur à l'état solide amorphe.", isCorrect: false, rationale: "C'est une précipitation." }
    ],
    theoryExplanation: "❤️ Réduction : Gain d'électrons (notés du côté des réactifs de la demi-équation)."
  },
  {
    id: 87,
    category: "Oxydoréduction",
    question: "❤️ Qu'est-ce qu'un couple d'oxydoréduction Ox/Red d'après ton cours ?",
    options: [
      { text: "Un mélange de deux métaux solides pour fabriquer de l'acier.", isCorrect: false, rationale: "C'est un alliage métallique, pas un couple redox." },
      { text: "Un ensemble formé par un oxydant et son réducteur conjugué reliés par un échange d'électrons.", isCorrect: true, rationale: "L'oxydant et le réducteur conjugué s'écrivent Ox / Red (ex: Zn²⁺ / Zn)." },
      { text: "Deux solutions d'acides forts mélangées ensemble.", isCorrect: false, rationale: "C'est un mélange acide, sans transfert d'électrons." },
      { text: "Deux ions spectateurs qui stabilisent la rouille métallique.", isCorrect: false, rationale: "Les ions spectateurs ne participent pas à l'échange d'électrons." }
    ],
    theoryExplanation: "❤️ Couple redox : Couple de deux espèces chimiques Ox/Red liées par la demi-équation électronique : Ox + n e⁻ ⇌ Red."
  },
  {
    id: 88,
    category: "Oxydoréduction",
    question: "Dans l'exercice de ton correctif, on fait passer du dichlore (Cl₂) dans une solution contenant des ions iodures (I⁻). Quelle est l'équation globale équilibrée de cette réaction ?",
    options: [
      { text: "Cl₂ + 2 I⁻ → 2 Cl⁻ + I₂", isCorrect: true, rationale: "Le dichlore Cl₂ capte 2e⁻ (Cl₂ + 2e⁻ → 2 Cl⁻) et deux ions I⁻ libèrent ces 2e⁻ (2 I⁻ → I₂ + 2e⁻). L'échange est équilibré." },
      { text: "Cl₂ + I⁻ → Cl⁻ + I₂", isCorrect: false, rationale: "Les charges et le nombre d'atomes d'iode et de chlore ne sont pas équilibrés." },
      { text: "2 Cl⁻ + I₂ → Cl₂ + 2 I⁻", isCorrect: false, rationale: "C'est la réaction inverse, non spontanée dans ces conditions." },
      { text: "Cl₂ + 2 I⁻ → Cl₂ + I₂", isCorrect: false, rationale: "Le dichlore Cl₂ doit être réduit en ions chlorure Cl⁻." }
    ],
    theoryExplanation: "❤️ Équation équilibrée : Cl₂ + 2 I⁻ → 2 Cl⁻ + I₂. Le nombre d'électrons gagnés par le dichlore est égal à celui perdu par les ions iodure."
  },
  {
    id: 89,
    category: "Oxydoréduction",
    question: "Dans la demi-équation électronique du nickel de ton correctif : Ni²⁺ + 2e⁻ → Ni, de quel type de réaction s'agit-il ?",
    options: [
      { text: "Une oxydation.", isCorrect: false, rationale: "L'oxydation implique une perte d'électrons, pas un gain." },
      { text: "Une réduction.", isCorrect: true, rationale: "L'ion Ni²⁺ gagne 2 électrons pour devenir du nickel métallique solide Ni⁰. C'est une réduction." },
      { text: "Une neutralisation acide-base.", isCorrect: false, rationale: "Il n'y a pas de proton H⁺ impliqué ici." },
      { text: "Une précipitation insoluble.", isCorrect: false, rationale: "La précipitation n'implique pas de transfert d'électrons." }
    ],
    theoryExplanation: "❤️ Le gain d'électrons par un cation métallique pour devenir un métal solide neutre est une réduction."
  },
  {
    id: 90,
    category: "Oxydoréduction",
    question: "Si on fait réagir une tige de zinc (Zn) avec des ions cuivre (Cu²⁺), quel est le réactif réducteur de départ qui subit l'oxydation ?",
    options: [
      { text: "L'ion cuivre Cu²⁺.", isCorrect: false, rationale: "L'ion Cu²⁺ est l'oxydant, il capte les électrons et subit la réduction." },
      { text: "Le zinc métallique solide Zn.", isCorrect: true, rationale: "Le zinc solide est le réducteur de départ. Il cède des électrons pour s'oxyder en ions Zn²⁺." },
      { text: "L'ion zinc Zn²⁺.", isCorrect: false, rationale: "L'ion zinc Zn²⁺ est le produit de l'oxydation, pas le réactif de départ." },
      { text: "Le cuivre solide Cu.", isCorrect: false, rationale: "Le cuivre solide est le produit de la réduction." }
    ],
    theoryExplanation: "❤️ Le réducteur (Zn) subit l'oxydation en donnant des électrons pour se transformer en son oxydant conjugué (Zn²⁺)."
  },
  {
    id: 91,
    category: "Oxydoréduction",
    question: "Pourquoi les électrons libres n'apparaissent-ils JAMAIS dans l'équation globale finale d'oxydoréduction ?",
    options: [
      { text: "Parce qu'ils s'évaporent sous forme de gaz hydrogène.", isCorrect: false, rationale: "L'évaporation gazeuse n'a aucun rapport avec les électrons." },
      { text: "Parce que les électrons libres ne peuvent pas exister à l'état isolé en solution aqueuse et doivent être entièrement captés.", isCorrect: true, rationale: "Chaque électron libéré par l'oxydation du réducteur est immédiatement consommé par la réduction de l'oxydant." },
      { text: "Parce qu'ils sont détruits par les ions spectateurs.", isCorrect: false, rationale: "Les électrons ne sont pas détruits, ils sont transférés d'une espèce à l'autre." },
      { text: "Parce qu'ils se lient à l'eau pour former des ions OH⁻.", isCorrect: false, rationale: "Le transfert d'électrons s'effectue directement entre l'oxydant et le réducteur." }
    ],
    theoryExplanation: "❤️ Équation globale équilibrée : Elle doit refléter un bilan neutre sans électrons libres, montrant uniquement le transfert direct d'une espèce à l'autre."
  },
  {
    id: 92,
    category: "Oxydoréduction",
    question: "Dans le couple redox Zn²⁺ / Zn, quel est l'oxydant conjugué et quel est le réducteur conjugué ?",
    options: [
      { text: "Oxydant = Zn | Réducteur = Zn²⁺", isCorrect: false, rationale: "Les rôles sont inversés : l'ion Zn²⁺ est l'oxydant capable de capter des électrons." },
      { text: "Oxydant = Zn²⁺ | Réducteur = Zn", isCorrect: true, rationale: "L'ion Zn²⁺ capte des électrons (oxydant) et le métal Zn céde des électrons (réducteur)." },
      { text: "Tous les deux sont des oxydants forts.", isCorrect: false, rationale: "Dans un couple conjugué, il y a obligatoirement un oxydant et un réducteur." },
      { text: "Tous les deux sont des réducteurs spectateurs.", isCorrect: false, rationale: "Ce couple participe activement aux réactions d'oxydoréduction." }
    ],
    theoryExplanation: "❤️ Dans l'écriture conventionnelle Ox/Red, l'oxydant (Zn²⁺) est noté à gauche et le réducteur (Zn) à droite."
  },
  {
    id: 93,
    category: "Oxydoréduction",
    question: "On fait réagir Zn²⁺ et le lithium solide Li. Quelle est l'équation globale équilibrée de cette réaction ?",
    options: [
      { text: "Zn²⁺ + 2 Li → Zn + 2 Li⁺", isCorrect: true, rationale: "Le lithium perd 1e⁻ (multiplié par 2) et le zinc capte 2e⁻. Les coefficients stœchiométriques sont équilibrés." },
      { text: "Zn²⁺ + Li → Zn + Li⁺", isCorrect: false, rationale: "Cette équation n'est pas équilibrée au niveau des charges électriques (+2 à gauche vs +1 à droite)." },
      { text: "Zn + 2 Li⁺ → Zn²⁺ + 2 Li", isCorrect: false, rationale: "C'est l'équation de la réaction inverse, non spontanée dans ces conditions." },
      { text: "Zn²⁺ + 2 Li → Zn + Li⁺", isCorrect: false, rationale: "Cette équation ne respecte pas la conservation de l'élément lithium ni des charges." }
    ],
    theoryExplanation: "❤️ L'équation globale équilibrée doit respecter à la fois la conservation des éléments chimiques et celle des charges électriques globales."
  },
  {
    id: 94,
    category: "Oxydoréduction",
    question: "Quelle est la demi-équation électronique représentant l'oxydation du sodium métallique (Na) en solution aqueuse ?",
    options: [
      { text: "Na → Na⁺ + e⁻", isCorrect: true, rationale: "Le sodium métallique solide cède un électron pour devenir l'ion sodium Na⁺ soluble." },
      { text: "Na⁺ + e⁻ → Na", isCorrect: false, rationale: "C'est la réduction de l'ion sodium, pas son oxydation." },
      { text: "Na → Na²⁺ + 2e⁻", isCorrect: false, rationale: "L'ion sodium stable porte une seule charge positive (Na⁺)." },
      { text: "Na⁺ → Na + e⁻", isCorrect: false, rationale: "Les électrons libérés doivent s'écrire du côté droit des produits." }
    ],
    theoryExplanation: "❤️ L'oxydation correspond à une perte d'électrons. Le réducteur Na cède un électron pour donner Na⁺."
  },
  {
    id: 95,
    category: "Oxydoréduction",
    question: "Quelle est la demi-équation électronique représentant la réduction des ions argent (Ag⁺) ?",
    options: [
      { text: "Ag⁺ + e⁻ → Ag", isCorrect: true, rationale: "L'ion argent dissous capte un électron pour former de l'argent métallique solide." },
      { text: "Ag → Ag⁺ + e⁻", isCorrect: false, rationale: "C'est l'oxydation de l'argent métallique, pas sa réduction." },
      { text: "Ag⁺ → Ag + e⁻", isCorrect: false, rationale: "La réduction est un gain d'électrons, ils s'écrivent à gauche de la flèche." },
      { text: "Ag²⁺ + 2e⁻ → Ag", isCorrect: false, rationale: "L'ion argent le plus stable et courant en cours est Ag⁺." }
    ],
    theoryExplanation: "❤️ La réduction correspond à un gain d'électrons. L'oxydant Ag⁺ capte un électron pour donner Ag."
  },
  {
    id: 96,
    category: "Oxydoréduction",
    question: "Que se passe-t-il pour un métal lors de son oxydation d'après ton cours ?",
    options: [
      { text: "Il gagne des protons pour s'alourdir.", isCorrect: false, rationale: "Les protons concernent la théorie des acides et des bases." },
      { text: "Il perd des électrons et se dissout généralement sous forme d'ions aqueux solubles.", isCorrect: true, rationale: "Le métal neutre (solide) devient un cation hydraté (soluble), ce qui explique la corrosion lente du matériau." },
      { text: "Il précipite au fond sous forme de précipité blanc.", isCorrect: false, rationale: "La précipitation est une recombinaison d'ions, pas un transfert d'électrons." },
      { text: "Il reste totalement neutre et inchangé.", isCorrect: false, rationale: "L'oxydation modifie profondément la structure chimique du métal." }
    ],
    theoryExplanation: "❤️ La corrosion des métaux est un phénomène d'oxydation spontanée par lequel le métal solide se transforme en ions."
  },
  {
    id: 97,
    category: "Oxydoréduction",
    question: "Quel est le rôle du Plus Petit Commun Multiple (P.C.M.) lors de la résolution d'une équation globale d'oxydoréduction ?",
    options: [
      { text: "Il permet de calculer la tension théorique de la pile.", isCorrect: false, rationale: "La tension dépend des potentiels standards, pas du P.C.M." },
      { text: "Il sert à équilibrer le nombre d'électrons échangés afin qu'aucun électron libre ne reste dans le bilan global.", isCorrect: true, rationale: "C'est la règle d'or : le nombre d'électrons perdus par le réducteur doit être égal à celui capté par l'oxydant." },
      { text: "Il indique la vitesse de la réaction d'oxydation.", isCorrect: false, rationale: "Le P.C.M. est un outil stœchiométrique, pas cinétique." },
      { text: "Il sert à éliminer les ions spectateurs.", isCorrect: false, rationale: "L'élimination des spectateurs se fait dans les équations ioniques." }
    ],
    theoryExplanation: "❤️ Le P.C.M. permet de trouver les coefficients multiplicateurs à appliquer aux demi-équations pour équilibrer le transfert d'électrons."
  },
  {
    id: 98,
    category: "Oxydoréduction",
    question: "Si on fait réagir les couples Cu²⁺/Cu et Ag⁺/Ag (l'oxydant Ag⁺ avec le réducteur Cu), quel est le P.C.M. d'électrons échangés ?",
    options: [
      { text: "1 électron.", isCorrect: false, rationale: "Le cuivre libère 2 électrons, l'argent doit donc en capter 2 au total." },
      { text: "2 électrons.", isCorrect: true, rationale: "L'oxydation du cuivre libère 2e⁻ (Cu → Cu²⁺ + 2e⁻) et la réduction de l'argent en capte 1e⁻ (Ag⁺ + e⁻ → Ag). Le P.C.M. est 2." },
      { text: "3 électrons.", isCorrect: false, rationale: "Le multiple commun de 2 et 1 est 2, pas 3." },
      { text: "4 électrons.", isCorrect: false, rationale: "2 électrons suffisent à équilibrer l'échange." }
    ],
    theoryExplanation: "❤️ Pour équilibrer, on multiplie la demi-équation de réduction de l'argent par 2, et celle d'oxydation du cuivre par 1."
  },
  {
    id: 99,
    category: "Oxydoréduction",
    question: "Quelle est l'équation globale équilibrée de la réaction entre les ions Ag⁺ et le cuivre métallique Cu ?",
    options: [
      { text: "2 Ag⁺ + Cu → 2 Ag + Cu²⁺", isCorrect: true, rationale: "C'est l'équation globale correcte : les 2 électrons cédés par l'atome de cuivre sont captés par 2 ions argent." },
      { text: "Ag⁺ + Cu → Ag + Cu²⁺", isCorrect: false, rationale: "Cette équation n'est pas équilibrée au niveau des charges (+1 à gauche vs +2 à droite)." },
      { text: "2 Ag + Cu²⁺ → 2 Ag⁺ + Cu", isCorrect: false, rationale: "C'est la réaction inverse, non favorisée spontanément." },
      { text: "Ag⁺ + Cu → Ag + Cu⁺", isCorrect: false, rationale: "L'ion cuivre stable formé is Cu²⁺, pas Cu⁺." }
    ],
    theoryExplanation: "❤️ Équation globale équilibrée : 2 Ag⁺ + Cu → 2 Ag + Cu²⁺. Les charges et les éléments sont parfaitement conservés."
  },
  {
    id: 100,
    category: "Oxydoréduction",
    question: "Dans le couple d'oxydoréduction Fe²⁺ / Fe, quelle espèce est le réducteur conjugué ?",
    options: [
      { text: "L'ion fer Fe²⁺.", isCorrect: false, rationale: "L'ion Fe²⁺ est l'oxydant conjugué capable de capter des électrons." },
      { text: "Le fer métallique Fe.", isCorrect: true, rationale: "Le fer métallique solide Fe est le réducteur, capable de céder des électrons." },
      { text: "L'électron e⁻.", isCorrect: false, rationale: "L'électron est la particule transférée." },
      { text: "Le dioxygène O₂.", isCorrect: false, rationale: "C'est un réactif d'un autre couple." }
    ],
    theoryExplanation: "❤️ Dans un couple Ox/Red, le réducteur (Fe) est toujours l'espèce capable de s'oxyder en perdant des électrons."
  },
  {
    id: 101,
    category: "Oxydoréduction",
    question: "Dans la réaction spontanée d'oxydoréduction, quel est le rôle fondamental joué par l'oxydant ?",
    options: [
      { text: "Il cède des protons H⁺.", isCorrect: false, rationale: "C'est le rôle d'un acide." },
      { text: "Il capte des électrons fournis par le réducteur.", isCorrect: true, rationale: "L'oxydant possède un pouvoir attracteur qui lui permet de s'emparer des électrons libres." },
      { text: "Il dissout le précipité de baryum.", isCorrect: false, rationale: "La solubilité n'a aucun lien." },
      { text: "Il bloque la circulation du courant.", isCorrect: false, rationale: "Il permet au contraire le transfert de charge." }
    ],
    theoryExplanation: "❤️ L'oxydant est l'espèce gourmande en électrons de la réaction, elle se réduit en captant les électrons libérés par le réducteur."
  },
  {
    id: 102,
    category: "Oxydoréduction",
    question: "Dans la réaction spontanée d'oxydoréduction, quel est le rôle fondamental joué par le réducteur ?",
    options: [
      { text: "Il capte des protons H⁺.", isCorrect: false, rationale: "C'est le rôle d'une base." },
      { text: "Il cède un ou plusieurs électrons à l'oxydant.", isCorrect: true, rationale: "Le réducteur est le donneur d'électrons de la réaction, il subit l'oxydation." },
      { text: "Il précipite sous forme de sel neutre.", isCorrect: false, rationale: "C'est une propriété de solubilité." },
      { text: "Il neutralise la solution aqueuse.", isCorrect: false, rationale: "C'est une propriété acide-base." }
    ],
    theoryExplanation: "❤️ Le réducteur est l'espèce généreuse en électrons de la réaction, elle s'oxyde en cédant ses électrons."
  },
  {
    id: 103,
    category: "Oxydoréduction",
    question: "On fait réagir du zinc Zn et de l'acide chlorhydrique (protons H⁺). Quelle est l'équation globale équilibrée de cette réaction ?",
    options: [
      { text: "Zn + 2 H⁺ → Zn²⁺ + H₂", isCorrect: true, rationale: "Le zinc cède 2e⁻ (Zn → Zn²⁺ + 2e⁻) et 2 protons H⁺ captent ces 2e⁻ (2 H⁺ + 2e⁻ → H₂). L'équation est équilibrée." },
      { text: "Zn + H⁺ → Zn²⁺ + H₂", isCorrect: false, rationale: "Les charges et les atomes d'hydrogène ne sont pas équilibrés." },
      { text: "Zn + H⁺ → Zn⁺ + H", isCorrect: false, rationale: "L'ion zinc stable est Zn²⁺ et le dihydrogène s'écrit H₂." },
      { text: "Zn²⁺ + H₂ → Zn + 2 H⁺", isCorrect: false, rationale: "C'est la réaction inverse, non spontanée spontanément." }
    ],
    theoryExplanation: "❤️ Le zinc solide est oxydé par les ions H⁺ acides de la solution, provoquant un dégagement de dihydrogène H₂ gazeux."
  },
  {
    id: 104,
    category: "Oxydoréduction",
    question: "Dans l'écriture d'un couple d'oxydoréduction tel que Fe³⁺ / Fe²⁺, pourquoi l'ion Fe³⁺ est-il écrit à gauche ?",
    options: [
      { text: "Parce qu'il est plus lourd.", isCorrect: false, rationale: "La masse atomique est quasiment identique." },
      { text: "Parce que l'oxydant (ici Fe³⁺) est toujours écrit à gauche dans la notation conventionnelle Ox/Red.", isCorrect: true, rationale: "C'est la règle stricte de l'IUPAC pour tous les couples d'oxydoréduction." },
      { text: "Parce qu'il est apparu en premier historiquement.", isCorrect: false, rationale: "Il s'agit d'une convention moderne." },
      { text: "Parce qu'il est sous forme solide.", isCorrect: false, rationale: "Les deux ions sont sous forme aqueuse dissociée (aq)." }
    ],
    theoryExplanation: "❤️ Convention d'écriture : Un couple d'oxydoréduction s'écrit toujours sous la forme Ox / Red."
  },
  {
    id: 105,
    category: "Oxydoréduction",
    question: "Que se passe-t-il lors du phénomène de corrosion du fer (formation de rouille) à l'échelle électronique ?",
    options: [
      { text: "Le fer solide capte les protons de l'humidité de l'air.", isCorrect: false, rationale: "Il s'agit d'un transfert d'électrons avec le dioxygène de l'air." },
      { text: "Le fer solide cède des électrons au dioxygène en présence d'eau pour s'oxyder lentement.", isCorrect: true, rationale: "C'est une oxydation lente spontanée du métal Fe (réducteur) par le gaz O₂ (oxydant)." },
      { text: "Le fer précipite avec les ions sulfate de l'air.", isCorrect: false, rationale: "La corrosion n'est pas une simple précipitation." },
      { text: "Les ions ferreux absorbent la lumière du jour.", isCorrect: false, rationale: "La lumière peut accélérer mais n'est pas le réactif chimique principal." }
    ],
    theoryExplanation: "❤️ La corrosion est une réaction d'oxydoréduction naturelle où le métal solide (Fe) est détruit en s'oxydant au contact de l'oxygène."
  },
  {
    id: 106,
    category: "Oxydoréduction",
    question: "Si on compare les couples Li⁺/Li (E° très bas) et Au³⁺/Au (E° très élevé), quel métal solide est le réducteur le plus fort et le plus réactif ?",
    options: [
      { text: "L'or solide Au.", isCorrect: false, rationale: "L'or est un métal noble extrêmement stable qui ne s'oxyde presque jamais." },
      { text: "Le lithium solide Li.", isCorrect: true, rationale: "Un potentiel standard très bas indique un réducteur extrêmement fort qui cède ses électrons avec une extrême facilité." },
      { text: "L'ion lithium Li⁺.", isCorrect: false, rationale: "L'ion Li⁺ est un oxydant, il ne peut pas céder d'électrons." },
      { text: "L'ion or Au³⁺.", isCorrect: false, rationale: "C'est un oxydant puissant, pas un réducteur." }
    ],
    theoryExplanation: "❤️ Plus le potentiel standard E° d'un couple est bas, plus le réducteur conjugué (à droite) est fort et réactif."
  },
  {
    id: 107,
    category: "Oxydoréduction",
    question: "❤️ Quel est le terme qui désigne l'équation chimique traduisant uniquement la perte d'électrons par un réducteur ?",
    options: [
      { text: "La demi-équation d'oxydation.", isCorrect: true, rationale: "Elle s'écrit sous la forme Red → Ox + n e⁻." },
      { text: "La demi-équation de réduction.", isCorrect: false, rationale: "La réduction traduit un gain d'électrons." },
      { text: "L'équation moléculaire de neutralisation.", isCorrect: false, rationale: "La neutralisation implique des transferts de protons H⁺." },
      { text: "L'équation globale simplifiée.", isCorrect: false, rationale: "L'équation globale ne contient plus d'électrons libres." }
    ],
    theoryExplanation: "❤️ Une demi-équation électronique d'oxydation montre la libération d'électrons du côté droit (produits)."
  },
  {
    id: 108,
    category: "Oxydoréduction",
    question: "❤️ Quel est le terme qui désigne l'équation chimique traduisant uniquement le gain d'électrons par un oxydant ?",
    options: [
      { text: "La demi-équation d'oxydation.", isCorrect: false, rationale: "L'oxydation traduit une perte d'électrons." },
      { text: "La demi-équation de réduction.", isCorrect: true, rationale: "Elle s'écrit sous la forme Ox + n e⁻ → Red." },
      { text: "L'équation moléculaire globale.", isCorrect: false, rationale: "Elle contient à la fois l'oxydation et la réduction sans faire apparaître d'électrons." },
      { text: "La dissociation ionique aqueuse.", isCorrect: false, rationale: "C'est un phénomène de dissolution de sel." }
    ],
    theoryExplanation: "❤️ Une demi-équation électronique de réduction montre la consommation d'électrons du côté gauche (réactifs)."
  },
  {
    id: 109,
    category: "Oxydoréduction",
    question: "Équilibre la réaction globale d'oxydoréduction entre le magnésium solide (Mg) et les ions argent (Ag⁺) : Mg + Ag⁺ → Mg²⁺ + Ag.",
    options: [
      { text: "Mg + 2 Ag⁺ → Mg²⁺ + 2 Ag", isCorrect: true, rationale: "L'oxydation de Mg libère 2e⁻ (Mg → Mg²⁺ + 2e⁻). Il faut donc faire réagir 2 ions Ag⁺ pour capter ces 2e⁻." },
      { text: "Mg + Ag⁺ → Mg²⁺ + Ag", isCorrect: false, rationale: "Les charges ne sont pas équilibrées (+1 à gauche vs +2 à droite)." },
      { text: "2 Mg + Ag⁺ → 2 Mg²⁺ + Ag", isCorrect: false, rationale: "C'est l'inverse, il faut multiplier l'argent pour équilibrer les charges." },
      { text: "Mg + 2 Ag⁺ → Mg²⁺ + Ag", isCorrect: false, rationale: "L'élément argent n'est pas équilibré à droite." }
    ],
    theoryExplanation: "❤️ Le P.C.M. entre 2e⁻ (Mg) et 1e⁻ (Ag⁺) est 2. On multiplie la demi-équation de l'argent par 2."
  },
  {
    id: 110,
    category: "Oxydoréduction",
    question: "Dans le couple redox Cu²⁺ / Cu, de quelle nature physique est l'oxydant conjugué et le réducteur conjugué dans les conditions normales ?",
    options: [
      { text: "Oxydant = solide métallique | Réducteur = ion aqueux bleu", isCorrect: false, rationale: "Les rôles sont inversés." },
      { text: "Oxydant = ion aqueux bleu (Cu²⁺) | Réducteur = solide métallique rouge-orangé (Cu)", isCorrect: true, rationale: "L'ion Cu²⁺ est dissous et colore la solution en bleu, tandis que le cuivre métal solide présente une couleur rouge brique." },
      { text: "Tous les deux sont des gaz incolores.", isCorrect: false, rationale: "Le cuivre est un métal de transition lourd." },
      { text: "Tous les deux sont des acides forts.", isCorrect: false, rationale: "Ils appartiennent à la famille de l'oxydoréduction, pas des acides." }
    ],
    theoryExplanation: "❤️ L'ion Cu²⁺ hydraté est responsable de la magnifique couleur bleue des solutions de cuivre."
  },
  {
    id: 111,
    category: "Oxydoréduction",
    question: "Quelle est la demi-équation électronique représentant la réduction du diiode (I₂) moléculaire en solution aqueuse ?",
    options: [
      { text: "I₂ + 2e⁻ → 2 I⁻", isCorrect: true, rationale: "La molécule neutre de diiode I₂ capte deux électrons pour donner deux ions iodures monochargés négativement." },
      { text: "2 I⁻ → I₂ + 2e⁻", isCorrect: false, rationale: "C'est l'oxydation des ions iodures, pas la réduction du diiode." },
      { text: "I₂ + e⁻ → I⁻", isCorrect: false, rationale: "Le nombre d'éléments et les charges ne sont pas équilibrés." },
      { text: "I⁻ + e⁻ → I₂", isCorrect: false, rationale: "L'écriture et les charges sont incorrectes." }
    ],
    theoryExplanation: "❤️ La réduction du diiode (I₂) nécessite le gain de deux électrons pour former deux ions iodure (I⁻)."
  },
  {
    id: 112,
    category: "Oxydoréduction",
    question: "Quelle est la demi-équation électronique représentant l'oxydation des ions iodures (I⁻) ?",
    options: [
      { text: "2 I⁻ → I₂ + 2e⁻", isCorrect: true, rationale: "Deux ions iodures perdent chacun un électron (soit 2e⁻ au total) pour s'oxyder en diiode moléculaire neutre." },
      { text: "I₂ + 2e⁻ → 2 I⁻", isCorrect: false, rationale: "C'est la réduction de la molécule de diiode." },
      { text: "I⁻ → I + e⁻", isCorrect: false, rationale: "L'iode atomique isolé n'est pas stable en solution aqueuse, il s'écrit sous forme de molécule diatomique I₂." },
      { text: "2 I⁻ + 2e⁻ → I₂", isCorrect: false, rationale: "L'oxydation est une perte d'électrons, ils s'écrivent à droite des produits." }
    ],
    theoryExplanation: "❤️ L'oxydation d'un anion comme l'iodure I⁻ libère des électrons pour donner le corps pur moléculaire neutre diiode."
  },
  {
    id: 113,
    category: "Oxydoréduction",
    question: "Pourquoi l'acier galvanisé (acier recouvert d'une fine couche de zinc) résiste-t-il extrêmement bien à la corrosion ?",
    options: [
      { text: "Parce que le zinc empêche la lumière d'atteindre le fer.", isCorrect: false, rationale: "La corrosion n'est pas une réaction photochimique directe." },
      { text: "Parce que le zinc, réducteur plus fort que le fer, s'oxyde préférentiellement en protégeant le fer sous-jacent.", isCorrect: true, rationale: "C'est le principe de l'anode sacrificielle : le zinc se sacrifie en s'oxydant à la place du fer." },
      { text: "Parce que le zinc est un métal précieux totalement noble.", isCorrect: false, rationale: "Le zinc est au contraire un métal très réactif (réducteur fort)." },
      { text: "Parce que le zinc capte les protons de l'acide de l'air.", isCorrect: false, rationale: "C'est l'échange d'électrons avec l'oxygène qui est bloqué." }
    ],
    theoryExplanation: "❤️ Le zinc (E° = -0,76 V) étant un réducteur plus fort que le fer (E° = -0,44 V), il s'oxyde en premier et protège le fer."
  },
  {
    id: 114,
    category: "Oxydoréduction",
    question: "Si on fait réagir une tige de cuivre Cu solide avec des ions nickel Ni²⁺, qu'observe-t-on d'après les potentiels standards (Cu²⁺/Cu = +0,34 V et Ni²⁺/Ni = -0,25 V) ?",
    options: [
      { text: "Une réaction violente avec dépôt de nickel solide sur le cuivre.", isCorrect: false, rationale: "Pour réagir, il faudrait un oxydant plus fort que le réducteur conjugué." },
      { text: "Aucune réaction spontanée ne se produit.", isCorrect: true, rationale: "Le cuivre (+0,34 V) est un réducteur plus faible que le nickel (-0,25 V). Le transfert spontané d'électrons ne peut pas se faire dans ce sens." },
      { text: "Le cuivre se dissout instantanément en dégeant du gaz.", isCorrect: false, rationale: "Il n'y a pas de réaction possible." },
      { text: "Le nickel s'oxyde et le cuivre se réduit.", isCorrect: false, rationale: "Le cuivre solide est déjà sous sa forme la plus réduite." }
    ],
    theoryExplanation: "❤️ La réaction ne peut se faire spontanément que si l'oxydant possède un potentiel E° supérieur à celui du couple du réducteur."
  },
  {
    id: 115,
    category: "Oxydoréduction",
    question: "Dans la réaction d'oxydoréduction équilibrée : Fe + 2 Ag⁺ → Fe²⁺ + 2 Ag, quelle espèce est le réactif oxydant de départ qui subit la réduction ?",
    options: [
      { text: "Le fer solide Fe.", isCorrect: false, rationale: "Le fer solide est le réducteur, il s'oxyde." },
      { text: "L'ion argent Ag⁺.", isCorrect: true, rationale: "L'ion Ag⁺ est l'oxydant de départ, il capte les électrons et se réduit en argent métallique solide." },
      { text: "L'ion fer Fe²⁺.", isCorrect: false, rationale: "L'ion Fe²⁺ est le produit de l'oxydation." },
      { text: "L'argent solide Ag.", isCorrect: false, rationale: "L'argent solide est le produit de la réduction." }
    ],
    theoryExplanation: "❤️ L'oxydant (Ag⁺) subit la réduction en captant les électrons cédés par le réducteur."
  },
  {
    id: 116,
    category: "Oxydoréduction",
    question: "Quelle est la demi-équation d'oxydation du magnésium métallique Mg ?",
    options: [
      { text: "Mg → Mg²⁺ + 2e⁻", isCorrect: true, rationale: "Le magnésium solide perd deux électrons pour devenir l'ion magnésium Mg²⁺." },
      { text: "Mg²⁺ + 2e⁻ → Mg", isCorrect: false, rationale: "C'est la réduction du cation magnésium." },
      { text: "Mg → Mg⁺ + e⁻", isCorrect: false, rationale: "L'ion magnésium le plus stable est Mg²⁺ d'après le tableau périodique." },
      { text: "Mg²⁺ → Mg + 2e⁻", isCorrect: false, rationale: "Les charges et le sens de l'écriture sont incorrects." }
    ],
    theoryExplanation: "❤️ L'oxydation du métal Mg (groupe alcalino-terreux) libère deux électrons du côté des produits."
  },
  {
    id: 117,
    category: "Oxydoréduction",
    question: "Quelle est la demi-équation de réduction du plomb (Pb²⁺) en plomb métallique solide ?",
    options: [
      { text: "Pb²⁺ + 2e⁻ → Pb", isCorrect: true, rationale: "L'ion plomb Pb²⁺ capte deux électrons pour se réduire en plomb solide métallique Pb⁰." },
      { text: "Pb → Pb²⁺ + 2e⁻", isCorrect: false, rationale: "C'est l'oxydation du plomb solide." },
      { text: "Pb²⁺ → Pb + 2e⁻", isCorrect: false, rationale: "Les électrons de la réduction s'écrivent à gauche." },
      { text: "Pb⁺ + e⁻ → Pb", isCorrect: false, rationale: "L'ion plomb stable de ton cours est Pb²⁺." }
    ],
    theoryExplanation: "❤️ La réduction du plomb Pb²⁺ nécessite un gain de deux électrons du côté des réactifs."
  },
  {
    id: 118,
    category: "Oxydoréduction",
    question: "Si on fait réagir une solution de chlorure de nickel NiCl₂ avec une tige de zinc Zn, quelle est l'équation globale équilibrée de la réaction spontanée ?",
    options: [
      { text: "Zn + Ni²⁺ → Zn²⁺ + Ni", isCorrect: true, rationale: "Le zinc s'oxyde en perdant 2e⁻, et l'ion nickel se réduit en captant ces 2e⁻. Les coefficients sont de 1 pour 1." },
      { text: "Zn + Ni → Zn²⁺ + Ni²⁺", isCorrect: false, rationale: "Cette équation ne respecte pas l'échange d'ions et de métaux." },
      { text: "Zn²⁺ + Ni → Zn + Ni²⁺", isCorrect: false, rationale: "C'est l'équation de la réaction inverse, non spontanée spontanément." },
      { text: "2 Zn + Ni²⁺ → 2 Zn²⁺ + Ni", isCorrect: false, rationale: "Les coefficients ne sont pas équilibrés au niveau des charges." }
    ],
    theoryExplanation: "❤️ Le zinc solide réagit spontanément avec les ions nickel Ni²⁺ car le zinc est un réducteur plus fort d'après l'échelle des couples."
  },
  {
    id: 119,
    category: "Oxydoréduction",
    question: "Dans le couple d'oxydoréduction H⁺ / H₂, quel est l'oxydant conjugué de référence ?",
    options: [
      { text: "L'ion H⁺ (aqueux).", isCorrect: true, rationale: "L'ion hydrogène H⁺ (proton) est l'oxydant capable de capter un électron pour se réduire." },
      { text: "Le gaz dihydrogène H₂.", isCorrect: false, rationale: "Le dihydrogène H₂ est le réducteur conjugué de ce couple." },
      { text: "L'ion hydronium H₃O⁺.", isCorrect: false, rationale: "H₃O⁺ est l'acide de Brönsted, mais le couple redox simplifié s'écrit généralement H⁺/H₂." },
      { text: "L'ion hydroxyde OH⁻.", isCorrect: false, rationale: "OH⁻ n'intervient pas dans ce couple redox simple." }
    ],
    theoryExplanation: "❤️ Le couple standard H⁺ / H₂ est à la base de l'échelle des potentiels d'oxydoréduction (E° = 0,00 V)."
  },
  {
    id: 120,
    category: "Oxydoréduction",
    question: "❤️ Quel outil de ton cours te permet de prédire si une réaction d'oxydoréduction entre deux couples sera spontanée ou non ?",
    options: [
      { text: "La charte de solubilité des hydroxydes.", isCorrect: false, rationale: "Elle sert à prévoir les précipitations, pas les réactions redox." },
      { text: "L'échelle des potentiels standards d'oxydoréduction (E°).", isCorrect: true, rationale: "Cette échelle permet de classer les couples et d'appliquer la règle du gamma pour savoir si la réaction a lieu spontanément." },
      { text: "L'échelle de pH logarithmique.", isCorrect: false, rationale: "Elle mesure l'acidité, pas le pouvoir oxydant/réducteur des métaux." },
      { text: "Le tableau périodique des éléments.", isCorrect: false, rationale: "Il classe les éléments mais ne donne pas directement les potentiels redox de manière détaillée." }
    ],
    theoryExplanation: "❤️ L'échelle des couples d'oxydoréduction (classée selon les E°) permet de déterminer le sens spontané des transferts d'électrons."
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('theory'); // 'theory' ou 'qcm'
  const [activeTheoryTab, setActiveTheoryTab] = useState('precip'); // 'precip', 'acidbase', 'redox'
  const [activeQcmCategory, setActiveQcmCategory] = useState('Tous'); // 'Tous', 'Précipitation', 'Acides-Bases', 'Oxydoréduction'
  
  // State pour le QCM
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [qcmFinished, setQcmFinished] = useState(false);

  // Outils interactifs intégrés à la théorie
  const [selectedAmpho, setSelectedAmpho] = useState('HCO3-');
  const [phInput, setPhInput] = useState('3.54');
  const [phResults, setPhResults] = useState({
    h3o: '2.88e-4',
    oh: '3.47e-11',
    nature: 'Acide'
  });

  // Déclaration du tableau de solubilité interne au composant
  const solubilityRulesList = {
    soluble: [
      "Tous les nitrates (NO₃⁻) et acétates (CH₃COO⁻)",
      "Tous les sels de métaux alcalins (Li⁺, Na⁺, K⁺, etc.) et d'ammonium (NH₄⁺)",
      "La plupart des chlorures (Cl⁻), bromures (Br⁻) et iodures (I⁻) sauf Ag⁺, Pb²⁺, Hg₂²⁺",
      "La plupart des sulfates (SO₄²⁻) sauf Ca²⁺, Sr²⁺, Ba²⁺, Pb²⁺"
    ],
    insoluble: [
      "La plupart des hydroxydes (OH⁻) sauf alcalins and Ba²⁺",
      "La plupart des carbonates (CO₃²⁻), phosphates (PO₄³⁻) et sulfures (S²⁻) sauf alcalins et ammonium"
    ]
  };

  const amphoData = {
    'HCO3-': {
      name: "Ion hydrogénocarbonate (HCO₃⁻)",
      isAmpho: true,
      acidEq: "HCO₃⁻ + H₂O ⇌ CO₃²⁻ + H₃O⁺",
      baseEq: "HCO₃⁻ + H₃O⁺ ⇌ H₂CO₃ + H₂O",
      explanation: "Il possède un proton acide libérable (devient carbonate CO₃²⁻) et une charge négative lui permettant de capter un proton (devient acide carbonique H₂CO₃)."
    },
    'H2O': {
      name: "Eau (H₂O)",
      isAmpho: true,
      acidEq: "H₂O + H₂O ⇌ OH⁻ + H₃O⁺",
      baseEq: "H₂O + H⁺ ⇌ H₃O⁺",
      explanation: "L'eau est l'ampholyte par excellence. Elle se dissocie en OH⁻ (comportement d'acide) ou capte un proton pour former H₃O⁺ (comportement de base)."
    },
    'HPO42-': {
      name: "Ion hydrogénophosphate (HPO₄²⁻)",
      isAmpho: true,
      acidEq: "HPO₄²⁻ + H₂O ⇌ PO₄³⁻ + H₃O⁺",
      baseEq: "HPO₄²⁻ + H₃O⁺ ⇌ H₂PO₄⁻ + H₂O",
      explanation: "Issu de la dissociation de H₃PO₄, il peut encore perdre son dernier proton ou en regagner un."
    },
    'HNO2': {
      name: "Acide nitreux (HNO₂)",
      isAmpho: false,
      explanation: "C'est un acide faible. Il peut donner un proton (HNO₂ → NO₂⁻ + H⁺), mais ne possède pas de site accepteur pour capter un autre H⁺ en solution standard."
    },
    'OH-': {
      name: "Ion hydroxyde (OH⁻)",
      isAmpho: false,
      explanation: "C'est la base conjuguée forte de l'eau. Il capte un proton pour donner de l'eau, mais ne peut plus donner de proton H⁺."
    }
  };

  const handlePhCalc = (val) => {
    setPhInput(val);
    const num = parseFloat(val);
    if (isNaN(num) || num < 0 || num > 14) return;
    const h3o = Math.pow(10, -num);
    const oh = Math.pow(10, -(14 - num));
    let nature = 'Neutre';
    if (num < 7) nature = 'Acide';
    if (num > 7) nature = 'Basique';

    setPhResults({
      h3o: h3o.toExponential(2),
      oh: oh.toExponential(2),
      nature: nature
    });
  };

  // Filtrage des questions du QCM en fonction de la catégorie choisie
  const filteredQuestions = activeQcmCategory === 'Tous' 
    ? QUESTIONS_DATA 
    : QUESTIONS_DATA.filter(q => q.category === activeQcmCategory);

  const currentQuestion = filteredQuestions[currentQuestionIndex];

  const handleOptionSelect = (optionIndex) => {
    if (isAnswered) return;
    setSelectedOption(optionIndex);
  };

  const handleValidateAnswer = () => {
    if (selectedOption === null || isAnswered) return;
    setIsAnswered(true);
    if (currentQuestion.options[selectedOption].isCorrect) {
      setScore(score + 1);
    } else {
      setScore(score - 1);
    }
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setIsAnswered(false);
    if (currentQuestionIndex + 1 < filteredQuestions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQcmFinished(true);
    }
  };

  const handleSkipQuestion = () => {
    setSelectedOption(null);
    setIsAnswered(false);
    if (currentQuestionIndex + 1 < filteredQuestions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQcmFinished(true);
    }
  };

  const resetQcm = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setQcmFinished(false);
  };

  const handleCategoryChange = (cat) => {
    setActiveQcmCategory(cat);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setQcmFinished(false);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans">
      
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 bg-slate-950 border-b border-slate-800 px-4 py-3 flex flex-wrap justify-between items-center shadow-lg">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-tr from-rose-500 to-amber-500 rounded-lg text-slate-950 font-bold flex items-center shadow-md">
            <Heart className="w-5 h-5 text-white animate-pulse" />
            <span className="text-white text-xs ml-1 font-black">UAA8</span>
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
              La chimie expliquée aux Loulous
            </h1>
          </div>
        </div>

        {/* Onglets principaux : Théorie vs QCM */}
        <div className="flex space-x-2 mt-2 sm:mt-0">
          <button 
            onClick={() => setActiveTab('theory')}
            className={`px-4 py-2 rounded-lg text-xs font-black uppercase tracking-wider transition-all flex items-center space-x-1.5 ${activeTab === 'theory' ? 'bg-emerald-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-slate-100 hover:bg-slate-850'}`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Partie 1: Théorie Officielle</span>
          </button>
          <button 
            onClick={() => { setActiveTab('qcm'); resetQcm(); }}
            className={`px-4 py-2 rounded-lg text-xs font-black uppercase tracking-wider transition-all flex items-center space-x-1.5 ${activeTab === 'qcm' ? 'bg-emerald-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-slate-100 hover:bg-slate-850'}`}
          >
            <Award className="w-4 h-4" />
            <span>Partie 2: QCM d'Entraînement</span>
          </button>
        </div>
      </header>

      {/* Main Body */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        
        {/* ========================================================= */}
        {/* --- PARTIE 1: CONCEPTS THÉORIQUES (LES COEURS DU COURS) --- */}
        {/* ========================================================= */}
        {activeTab === 'theory' && (
          <div className="space-y-8 animate-fadeIn">
            
            <div className="bg-gradient-to-r from-slate-950 to-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl -z-10 animate-pulse"></div>
              <span className="bg-rose-500/10 text-rose-400 border border-rose-500/20 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase inline-flex items-center">
                <Heart className="w-3.5 h-3.5 mr-1 text-rose-400 fill-rose-400" />
                Savoirs
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold mt-4 mb-2">
                Les concepts de ton cours résumés ❤️
              </h2>
              <p className="text-slate-300 max-w-2xl text-base sm:text-lg leading-relaxed">
                Révise les définitions indispensables et les méthodes de résolution d'exercices.
              </p>

              {/* Sous-tabs de la thórie */}
              <div className="flex flex-wrap gap-2 mt-6">
                <button
                  onClick={() => setActiveTheoryTab('precip')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all border ${activeTheoryTab === 'precip' ? 'bg-blue-500/20 border-blue-500 text-blue-300' : 'bg-slate-900 border-slate-850 text-slate-400'}`}
                >
                  Chapitre 1 : Précipitations
                </button>
                <button
                  onClick={() => setActiveTheoryTab('acidbase')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all border ${activeTheoryTab === 'acidbase' ? 'bg-pink-500/20 border-pink-500 text-pink-300' : 'bg-slate-900 border-slate-850 text-slate-400'}`}
                >
                  Chapitre 2 : Acides & Bases
                </button>
                <button
                  onClick={() => setActiveTheoryTab('redox')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all border ${activeTheoryTab === 'redox' ? 'bg-amber-500/20 border-amber-500 text-amber-300' : 'bg-slate-900 border-slate-850 text-slate-400'}`}
                >
                  Chapitre 3 : Oxydoréductions
                </button>
              </div>
            </div>

            {/* THÉORIE 1 : PRÉCIPITATIONS */}
            {activeTheoryTab === 'precip' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fadeIn">
                <div className="lg:col-span-2 bg-slate-950 border border-slate-850 rounded-xl p-6 space-y-6">
                  
                  {/* Cœur 1: Définition de Précipitation */}
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 text-rose-500">
                      <Heart className="w-5 h-5 fill-rose-500" />
                      <span className="text-xs font-black uppercase tracking-wider">Notion clé du cours</span>
                    </div>
                    <h3 className="text-xl font-bold text-blue-400">Le Phénomène de Précipitation</h3>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      Une <strong>réaction de précipitation</strong> est un phénomène chimique au cours duquel deux électrolytes solubles mélangés en solution aqueuse réagissent pour former un solide amorphe très peu soluble dans l'eau. Ce solide est appelé le <strong>précipité</strong>.
                    </p>
                  </div>

                  {/* Cœur 2: Ions Acteurs vs Ions Spectateurs */}
                  <div className="border-t border-slate-800 pt-4 space-y-3">
                    <div className="flex items-center space-x-2 text-rose-500">
                      <Heart className="w-5 h-5 fill-rose-500" />
                      <span className="text-xs font-black uppercase tracking-wider">Acteurs vs Spectateurs</span>
                    </div>
                    <h4 className="font-bold text-slate-200 text-sm">Le rôle des ions en solution :</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg space-y-2">
                        <span className="font-bold text-emerald-400 block text-sm">Ions Acteurs</span>
                        <p className="text-slate-300 leading-relaxed">
                          Ce sont les ions qui s'associent et se lient directement pour former la structure du précipité solide. Ils subissent une transformation de l'état dissous (aq) à l'état solide (s).
                        </p>
                      </div>
                      <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg space-y-2">
                        <span className="font-bold text-slate-400 block text-sm">Ions Spectateurs</span>
                        <p className="text-slate-300 leading-relaxed">
                          Ce sont les ions qui restent dissous et libres sous forme aqueuse (aq) tout au long de la transformation. Ils n'interviennent pas dans la formation du précipité solide.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Cœur 3: Méthode de Résolution de l'Équation Moléculaire Globale */}
                  <div className="border-t border-slate-800 pt-4 space-y-3">
                    <div className="flex items-center space-x-2 text-rose-500">
                      <Heart className="w-5 h-5 fill-rose-500" />
                      <span className="text-xs font-black uppercase tracking-wider">Résolution : L'Équation Moléculaire Globale</span>
                    </div>
                    <h4 className="font-bold text-slate-200 text-sm">Méthode de résolution pas-à-pas :</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Dans les exercices de ton cours, l'analyse se concentre sur l'écriture de l'équation moléculaire globale de la réaction. Voici les étapes méthodologiques à suivre :
                    </p>
                    
                    <div className="bg-slate-900 border border-slate-850 p-4 rounded-xl space-y-4 text-xs">
                      <div className="space-y-1">
                        <span className="font-bold text-blue-400 block">Étape 1 : Écrire les formules des réactifs aqueux</span>
                        <p className="text-slate-300">
                          Noter les formules moléculaires neutres des deux composés de départ dissous dans l'eau, suivies de l'indice (aq).
                        </p>
                      </div>
                      <div className="space-y-1 pt-3 border-t border-slate-800">
                        <span className="font-bold text-blue-400 block">Étape 2 : Échanger les partenaires d'association</span>
                        <p className="text-slate-300">
                          Associer le cation du premier réactif avec l'anion du second réactif, et inversement, pour déterminer les formules des deux produits potentiels formés.
                        </p>
                      </div>
                      <div className="space-y-1 pt-3 border-t border-slate-800">
                        <span className="font-bold text-blue-400 block">Étape 3 : Identifier le précipité à l'aide de ton tableau de solubilité</span>
                        <p className="text-slate-300">
                          Consulter le **tableau de solubilité** fourni pour identifier lequel des deux nouveaux produits est insoluble. Ce produit insoluble est le précipité solide, noté (s). L'autre produit soluble reste sous forme aqueuse, noté (aq).
                        </p>
                      </div>
                      <div className="space-y-1 pt-3 border-t border-slate-800">
                        <span className="font-bold text-emerald-400 block">Étape 4 : Équilibrer l'équation moléculaire globale</span>
                        <p className="text-slate-300">
                          Ajouter les coefficients stœchiométriques nécessaires devant les molécules pour que le nombre d'atomes de chaque élément soit rigoureusement identique du côté des réactifs et du côté des produits.
                        </p>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Règles générales de solubilité */}
                <div className="bg-slate-950 border border-slate-850 rounded-xl p-6 space-y-4">
                  <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">Règles générales de solubilité</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Voici un rappel des grandes règles issues de ton tableau de solubilité :
                  </p>
                  <div className="space-y-3">
                    <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                      <span className="text-xs font-bold text-emerald-400 block mb-1">Généralement solubles :</span>
                      <ul className="list-disc list-inside text-[11px] text-slate-300 space-y-1">
                        {solubilityRulesList.soluble.map((rule, idx) => (
                          <li key={idx}>{rule}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-lg">
                      <span className="text-xs font-bold text-rose-400 block mb-1">Généralement insolubles :</span>
                      <ul className="list-disc list-inside text-[11px] text-slate-300 space-y-1">
                        {solubilityRulesList.insoluble.map((rule, idx) => (
                          <li key={idx}>{rule}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* THÉORIE 2 : ACIDES & BASES */}
            {activeTheoryTab === 'acidbase' && (
              <div className="space-y-8 animate-fadeIn">
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  
                  {/* Coeur Brönsted */}
                  <div className="bg-slate-950 border border-slate-850 rounded-2xl p-6 space-y-6">
                    
                    {/* Cadre : Théorie d'Arrhenius vs Brönsted */}
                    <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl space-y-3">
                      <span className="text-xs font-black text-amber-400 uppercase tracking-wider flex items-center">
                        <Info className="w-4 h-4 mr-1.5" />
                        Repère historique : La théorie d'Arrhenius
                      </span>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        La <strong>teinte historique d'Arrhenius</strong> définit un acide comme une substance qui libère des protons H⁺ dans l'eau, et une base comme une substance qui libère des ions hydroxydes OH⁻ dans l'eau.
                      </p>
                      <p className="text-xs text-rose-400 font-semibold leading-relaxed">
                        ⚠️ **Attention !** Cette théorie historique n'est pas celle que nous utilisons actuellement dans ce cours (elle est restreinte aux milieux aqueux et n'explique pas le comportement de certaines bases comme l'ammoniac NH₃). Nous appliquons uniquement la théorie de Brönsted.
                      </p>
                    </div>

                    {/* Cœur 1 : Définitions Brönsted */}
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2 text-rose-500">
                        <Heart className="w-5 h-5 fill-rose-500" />
                        <span className="text-xs font-black uppercase tracking-wider">Notion clé : Brönsted</span>
                      </div>
                      <h3 className="text-xl font-bold text-pink-400">La théorie d'Acides & Bases selon Brönsted</h3>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg space-y-1.5">
                          <span className="font-extrabold text-pink-400 block text-sm">L'Acide</span>
                          <p className="text-slate-300 leading-relaxed">
                            Toute espèce chimique (molécule ou ion) capable de **céder / donner** un ou plusieurs protons H⁺.
                          </p>
                        </div>
                        <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg space-y-1.5">
                          <span className="font-extrabold text-pink-400 block text-sm">La Base</span>
                          <p className="text-slate-300 leading-relaxed">
                            Toute espèce chimique (molécule ou ion) capable de **capter / accepter** un ou plusieurs protons H⁺.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Nouveau cadre : Les couples Acide/Base */}
                    <div className="border-t border-slate-800 pt-4 space-y-3">
                      <div className="flex items-center space-x-2 text-rose-500">
                        <Heart className="w-5 h-5 fill-rose-500" />
                        <span className="text-xs font-black uppercase tracking-wider">Les Couples Acide/Base conjugués</span>
                      </div>
                      <h4 className="font-bold text-slate-200 text-sm">Notion de conjugaison :</h4>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Lorsqu'un acide perd son proton H⁺, il se transforme en une espèce capable à son tour de recapter un proton. Cette espèce est sa **base conjuguée**. Réciproquement, lorsqu'une base capte un proton H⁺, elle devient son **acide conjugué**. Ils forment ensemble un couple Acide/Base noté sous la forme générale : <span className="font-bold text-pink-400">Acide / Base</span>.
                      </p>
                    </div>

                    {/* Cœur 2 : Ampholytes */}
                    <div className="border-t border-slate-800 pt-4 space-y-3">
                      <div className="flex items-center space-x-2 text-rose-500">
                        <Heart className="w-5 h-5 fill-rose-500" />
                        <span className="text-xs font-black uppercase tracking-wider">Les Ampholytes (Amphotères)</span>
                      </div>
                      <h4 className="font-bold text-slate-200 text-sm">Définition et comportement :</h4>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Un <strong>ampholyte</strong> (ou amphotère) est un composé qui possède à la fois un caractère acide et basique selon Brönsted. Il se comporte comme un acide (donne H⁺) ou comme une base (capte H⁺) en s'adaptant à l'espèce chimique partenaire mise en sa présence.
                      </p>

                      <div className="bg-slate-900 border border-slate-850 p-4 rounded-lg space-y-2">
                        <span className="text-xs font-bold text-slate-200">Justification générale :</span>
                        <p className="text-xs text-slate-300">
                          Pour démontrer qu'une espèce est un ampholyte, tu devez écrire ses deux comportements :
                          <br />1. Son comportement d'acide (libération d'un H⁺).
                          <br />2. Son comportement de base (fixation d'un H⁺).
                        </p>
                      </div>
                    </div>

                    {/* Cœur 3 : Méthode de Résolution d'une Équation Acide-Base */}
                    <div className="border-t border-slate-800 pt-4 space-y-3">
                      <div className="flex items-center space-x-2 text-rose-500">
                        <Heart className="w-5 h-5 fill-rose-500" />
                        <span className="text-xs font-black uppercase tracking-wider">Résolution d'une Équation Acide-Base</span>
                      </div>
                      <h4 className="font-bold text-slate-200 text-sm">Méthode de résolution pas-à-pas :</h4>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        Pour compléter une équation d'échange de proton entre un acide et une base (transfert d'un seul proton H⁺), suis ces étapes :
                      </p>
                      
                      <div className="bg-slate-900 p-3.5 rounded-lg border border-slate-850 text-xs text-slate-300 space-y-2">
                        <span className="font-bold text-slate-200 block uppercase tracking-wider text-[10px]">Les étapes méthodologiques :</span>
                        <ol className="list-decimal list-inside space-y-2 leading-relaxed">
                          <li>
                            <strong className="text-pink-400">Identifier les réactifs :</strong> Déterminer quel réactif is l'acide (donneur de proton H⁺) et lequel est la base (accepteur de proton H⁺).
                          </li>
                          <li>
                            <strong className="text-pink-400">Transférer le proton H⁺ :</strong> Retirer un H⁺ de l'acide de départ et l'ajouter à la base de départ.
                          </li>
                          <li>
                            <strong className="text-pink-400">Écrire les produits conjugués :</strong>
                            <ul className="list-disc list-inside pl-4 mt-1 space-y-1 text-slate-400">
                              <li>L'acide, ayant perdu un proton, devient sa **base conjuguée** (sa charge diminue de 1 unité positive).</li>
                              <li>La base, ayant capté un proton, devient son **acide conjugué** (sa charge augmente de 1 unité positive).</li>
                            </ul>
                          </li>
                          <li>
                            <strong className="text-pink-400">Finaliser l'équation :</strong> Écrire l'équilibre complet en reliant les réactifs et les produits à l'aide de la double flèche (⇌).
                          </li>
                        </ol>
                      </div>
                    </div>

                    {/* Cœur 4 : Neutralisation */}
                    <div className="border-t border-slate-800 pt-4 space-y-3">
                      <div className="flex items-center space-x-2 text-rose-500">
                        <Heart className="w-5 h-5 fill-rose-500" />
                        <span className="text-xs font-black uppercase tracking-wider">La Neutralisation Chimique</span>
                      </div>
                      <h4 className="font-bold text-slate-200 text-sm">Définition et méthode d'équilibrage :</h4>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Une réaction de <strong>neutralisation</strong> est une transformation chimique complète entre un acide et une base conduisant à la formation d'un sel ionique neutre et de molécules d'eau (H₂O). Les propriétés initiales acides et basiques se compensent et disparaissent mutuellement.
                      </p>
                      
                      <div className="bg-slate-900 p-3.5 rounded-lg border border-slate-850 text-xs text-slate-300 space-y-2">
                        <span className="font-bold text-slate-200 block uppercase tracking-wider text-[10px]">Méthode d'équilibrage :</span>
                        <ol className="list-decimal list-inside space-y-1.5 leading-relaxed">
                          <li>Identifier le nombre de protons acides H⁺ susceptibles d'être libérés par l'acide.</li>
                          <li>Identifier le nombre d'ions hydroxydes OH⁻ apportés par la base.</li>
                          <li>Assurer une stricte égalité entre le nombre total de protons libérés et le nombre total d'hydroxydes consommés. Chaque proton s'associe à un hydroxyde pour former une molécule d'eau (H₂O).</li>
                          <li>Écrire la formule du sel neutre formé en associant les cations de la base et les anions de l'acide de façon électriquement neutre.</li>
                        </ol>
                      </div>
                    </div>

                  </div>

                  {/* Échelle de pH & Calculateur */}
                  <div className="bg-slate-950 border border-slate-850 rounded-2xl p-6 space-y-4">
                    <div className="flex items-center space-x-2 text-rose-500">
                      <Heart className="w-5 h-5 fill-rose-500" />
                      <span className="text-xs font-black uppercase tracking-wider">Notion clé : Échelle de pH</span>
                    </div>

                    <h3 className="text-xl font-bold text-pink-400">Échelle & Formules de pH</h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Le pH mesure l'acidité d'un milieu aqueux. Il est directement lié à la concentration en ions hydronium [H₃O⁺].
                    </p>

                    <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl space-y-2 text-xs">
                      <span className="font-bold text-slate-200 block">Lien avec les ions hydroxyde [OH⁻] :</span>
                      <p className="text-slate-300 leading-relaxed">
                        L'autoprotolyse de l'eau s'établit par l'équilibre : 2 H₂O ⇌ H₃O⁺ + OH⁻. À 25°C, cet équilibre maintient une relation constante et indispensable entre les concentrations de ces deux ions :
                      </p>
                      <div className="p-2.5 bg-slate-950 rounded border border-slate-800 text-center font-mono text-pink-300 font-bold">
                        {"[H₃O⁺] × [OH⁻] = 10⁻¹⁴"}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs font-mono text-pink-300">
                      <div className="p-2 bg-slate-900 rounded border border-slate-800 text-center font-bold">pH = -log[H₃O⁺]</div>
                      <div className="p-2 bg-slate-900 rounded border border-slate-800 text-center font-bold">[H₃O⁺] = 10^-pH</div>
                    </div>

                    <div className="border-t border-slate-800 pt-4 space-y-3">
                      <span className="text-xs font-bold text-slate-200 block">Calculateur interactif de pH :</span>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center text-xs">
                          <label className="text-slate-400">Valeur de pH saisie :</label>
                          <input 
                            type="number" 
                            step="0.01"
                            min="0"
                            max="14"
                            value={phInput}
                            onChange={(e) => handlePhCalc(e.target.value)}
                            className="w-24 bg-slate-900 border border-slate-800 rounded p-1.5 text-center font-bold font-mono text-slate-100 text-xs focus:outline-none focus:border-pink-500"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="bg-slate-900 border border-slate-850 p-2.5 rounded">
                            <span className="text-[10px] text-slate-500 block uppercase font-bold">Concentration [H₃O⁺]</span>
                            <span className="font-mono text-slate-200">{phResults.h3o} mol/L</span>
                          </div>
                          <div className="bg-slate-900 border border-slate-850 p-2.5 rounded">
                            <span className="text-[10px] text-slate-500 block uppercase font-bold">Concentration [OH⁻]</span>
                            <span className="font-mono text-slate-200">{phResults.oh} mol/L</span>
                          </div>
                          <div className="bg-slate-900 border border-slate-850 p-2.5 rounded">
                            <span className="text-[10px] text-slate-500 block uppercase font-bold">Valeur du pH</span>
                            <span className="font-mono text-pink-300 font-bold">{parseFloat(phInput).toFixed(2)}</span>
                          </div>
                          <div className="bg-slate-900 border border-slate-850 p-2.5 rounded flex flex-col justify-center">
                            <span className="text-[10px] text-slate-500 block uppercase font-bold">Nature de la solution</span>
                            <span className={`font-bold ${phResults.nature === 'Acide' ? 'text-red-400' : phResults.nature === 'Basique' ? 'text-blue-400' : 'text-emerald-400'}`}>{phResults.nature}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Justification d'espèces */}
                <div className="bg-slate-950 border border-slate-850 rounded-2xl p-6 space-y-4">
                  <h3 className="text-lg font-bold text-pink-400">Exemples de comportement d'ampholytes</h3>
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-1.5">
                      {Object.keys(amphoData).map((key) => (
                        <button
                          key={key}
                          onClick={() => setSelectedAmpho(key)}
                          className={`px-3 py-1 rounded text-xs transition-all border ${selectedAmpho === key ? 'bg-pink-500/20 border-pink-500 text-slate-100' : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'}`}
                        >
                          {key}
                        </button>
                      ))}
                    </div>

                    <div className="bg-slate-900 border border-slate-800 p-4 rounded-lg space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-slate-200">{amphoData[selectedAmpho].name}</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${amphoData[selectedAmpho].isAmpho ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                          {amphoData[selectedAmpho].isAmpho ? 'Amphotère' : 'Non Amphotère'}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">{amphoData[selectedAmpho].explanation}</p>
                      {amphoData[selectedAmpho].isAmpho && (
                        <div className="pt-2 border-t border-slate-800 space-y-1 font-mono text-[11px] text-pink-300">
                          <p><span className="text-slate-500">Acide :</span> {amphoData[selectedAmpho].acidEq}</p>
                          <p><span className="text-slate-500">Base :</span> {amphoData[selectedAmpho].baseEq}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* THÉORIE 3 : OXYDORÉDUCTIONS */}
            {activeTheoryTab === 'redox' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  
                  {/* Coeur de la leçon de Redox */}
                  <div className="lg:col-span-2 bg-slate-950 border border-slate-850 rounded-2xl p-6 space-y-6">
                    
                    {/* Cœur 1 : Définitions */}
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2 text-rose-500">
                        <Heart className="w-5 h-5 fill-rose-500" />
                        <span className="text-xs font-black uppercase tracking-wider">Notion clé du cours</span>
                      </div>
                      <h3 className="text-xl font-bold text-amber-400">Le Phénomène d'Oxydoréduction</h3>
                      <p className="text-sm text-slate-300 leading-relaxed">
                        Une réaction d'<strong>oxydoréduction</strong> est une transformation caractérisée par un **transfert réel d'électrons** d'un réactif donneur vers un réactif accepteur.
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-sans">
                        {/* OXDYANT et REDUCTION en vert */}
                        <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg space-y-1.5 text-emerald-300">
                          <span className="font-black block text-sm uppercase tracking-wide text-emerald-400">L'Oxydant (Ox)</span>
                          <p className="leading-relaxed text-slate-300">Espèce chimique capable de <strong>capter / accepter</strong> un ou plusieurs électrons.</p>
                        </div>
                        <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg space-y-1.5 text-emerald-300">
                          <span className="font-black block text-sm uppercase tracking-wide text-emerald-400">La Réduction</span>
                          <p className="leading-relaxed text-slate-300">Réaction au cours de laquelle un oxydant <strong>gagne</strong> un ou plusieurs électrons (il se réduit).</p>
                        </div>
                        
                        {/* REDUCTEUR et OXYDATION en rouge */}
                        <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-lg space-y-1.5 text-rose-300">
                          <span className="font-black block text-sm uppercase tracking-wide text-rose-400">Le Réducteur (Red)</span>
                          <p className="leading-relaxed text-slate-300">Espèce chimique capable de <strong>céder / donner</strong> un ou plusieurs électrons.</p>
                        </div>
                        <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-lg space-y-1.5 text-rose-300">
                          <span className="font-black block text-sm uppercase tracking-wide text-rose-400">L'Oxydation</span>
                          <p className="leading-relaxed text-slate-300">Réaction au cours de laquelle un réducteur <strong>perd</strong> un ou plusieurs électrons (il s'oxyde).</p>
                        </div>
                      </div>
                    </div>

                    {/* Nouveau cadre : Les couples Ox/Red */}
                    <div className="border-t border-slate-800 pt-4 space-y-3">
                      <div className="flex items-center space-x-2 text-rose-500">
                        <Heart className="w-5 h-5 fill-rose-500" />
                        <span className="text-xs font-black uppercase tracking-wider">Les Couples d'Oxydoréduction</span>
                      </div>
                      <h4 className="font-bold text-slate-200 text-sm">Définition des couples Ox/Red :</h4>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Un oxydant et son réducteur conjugué forment un **couple d'oxydoréduction**, noté conventionnellement sous la forme <span className="font-bold text-amber-400">Ox / Red</span> (l'oxydant est toujours écrit à gauche, et le réducteur à droite). Ils sont reliés par une demi-équation électronique traduisant le gain ou la perte d'électrons :
                      </p>
                      <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg text-center font-mono text-xs text-amber-300">
                        {"Ox + n e⁻ ⇌ Red"}
                      </div>
                    </div>

                    {/* Cœur 2 : Sens du transfert d'électrons */}
                    <div className="border-t border-slate-800 pt-4 space-y-3">
                      <div className="flex items-center space-x-2 text-rose-500">
                        <Heart className="w-5 h-5 fill-rose-500" />
                        <span className="text-xs font-black uppercase tracking-wider">Sens de transfert d'électrons</span>
                      </div>
                      <h4 className="font-bold text-slate-200 text-sm">Principe de migration des charges :</h4>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Lors d'une réaction redox, le transfert s'effectue obligatoirement de manière unidirectionnelle : 
                        les électrons quittent le <strong>réducteur</strong> (le donneur) et sont captés par l'<strong>oxydant</strong> (l'accepteur). Dans les schémas de cours, ce transfert est matérialisé par des flèches dirigées du réducteur vers l'oxydant.
                      </p>
                    </div>

                  </div>

                  {/* Équilibrage par P.C.M. */}
                  <div className="bg-slate-950 border border-slate-850 rounded-2xl p-6 space-y-4">
                    <div className="flex items-center space-x-2 text-rose-500">
                      <Heart className="w-5 h-5 fill-rose-500" />
                      <span className="text-xs font-black uppercase tracking-wider">Équilibrage Redox</span>
                    </div>
                    <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">Équilibrer une réaction globale</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Comme les électrons à l'état de liberté n'existent pas en solution, les électrons perdus lors de l'oxydation doivent être entièrement consommés par la réduction. Aucun électron libre ne doit figurer dans le bilan d'une équation globale !
                    </p>
                    
                    <div className="bg-slate-900 p-4 rounded-xl border border-slate-850 text-xs text-slate-300 space-y-3">
                      <span className="font-bold text-slate-200 block uppercase text-[10px] tracking-wider">Méthode systématique du P.C.M. (Plus Petit Commun Multiple) :</span>
                      <ol className="list-decimal list-inside space-y-2 leading-relaxed">
                        <li>Établir et équilibrer séparément la demi-équation d'oxydation du réducteur. Les électrons libérés s'écrivent du côté droit (produits).</li>
                        <li>Établir et équilibrer séparément la demi-équation de réduction de l'oxydant. Les électrons captés s'écrivent du côté gauche (réactifs).</li>
                        <li>Déterminer le nombre d'électrons échangés par chacun des deux partenaires et rechercher leur Plus Petit Commun Multiple (P.C.M.).</li>
                        <li>Multiplier chaque demi-équation par le coefficient approprié pour que le nombre d'électrons libérés par l'oxydation soit égal au nombre d'électrons captés par la réduction.</li>
                        <li>Additionner membre à membre les réactifs et les produits. Les électrons s'annulent de part et d'autre, fournissant l'équation globale équilibrée.</li>
                      </ol>
                    </div>
                  </div>

                </div>
              </div>
            )}

          </div>
        )}

        {/* ========================================================= */}
        {/* --- PARTIE 2: QCM INTERACTIF DE REVISION (THEORIE + EX) -- */}
        {/* ========================================================= */}
        {activeTab === 'qcm' && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* Header du QCM */}
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <h2 className="text-3xl font-extrabold text-slate-100">Zone d'Entraînement QCM</h2>
              <p className="text-sm text-slate-400 leading-relaxed">
                Révise les définitions indispensables et les méthodes de résolution d'exercices.
              </p>
            </div>

            {/* Filtres de catégories du QCM */}
            <div className="flex flex-wrap justify-center gap-2">
              {['Tous', 'Précipitation', 'Acides-Bases', 'Oxydoréduction'].map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all ${activeQcmCategory === category ? 'bg-emerald-500 border-emerald-500 text-slate-950 shadow-md' : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-100'}`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Bloc de la question courante */}
            <div className="max-w-3xl mx-auto">
              {qcmFinished ? (
                <div className="bg-slate-950 border border-slate-850 rounded-2xl p-8 text-center space-y-6 shadow-2xl animate-scaleUp">
                  <div className="w-16 h-16 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/20">
                    <Award className="w-8 h-8" />
                  </div>
                  
                  <div>
                    <h3 className="text-2xl font-bold text-slate-100">Session de révision terminée !</h3>
                    <p className="text-sm text-slate-400 mt-1">
                      Tu as répondu à toutes les questions de la section <span className="text-emerald-400 font-semibold">"{activeQcmCategory}"</span>.
                    </p>
                  </div>

                  <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl max-w-xs mx-auto">
                    <span className="text-xs text-slate-400 block uppercase font-bold tracking-wider">Ton score final</span>
                    <span className="text-4xl font-black text-emerald-400">{score} Points</span>
                    <p className="text-xs text-slate-400 mt-2">
                      Sur un total de {filteredQuestions.length} questions.
                    </p>
                  </div>

                  <button 
                    onClick={resetQcm}
                    className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-lg transition-all text-xs uppercase tracking-wider"
                  >
                    Recommencer la série
                  </button>
                </div>
              ) : filteredQuestions.length > 0 ? (
                <div className="bg-slate-950 border border-slate-850 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
                  
                  {/* Indicateur de progression et Compteur de points en direct */}
                  <div className="flex justify-between items-center border-b border-slate-850 pb-4">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300">
                      Question {currentQuestionIndex + 1} sur {filteredQuestions.length}
                    </span>
                    <span className="text-xs font-bold px-3 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      Points : <span className="font-black text-sm">{score}</span>
                    </span>
                  </div>

                  {/* Libellé de la question */}
                  <div className="space-y-4">
                    <p className="text-base sm:text-lg font-bold text-slate-100 leading-snug">
                      {currentQuestion.question}
                    </p>
                  </div>

                  {/* Propositions de réponses */}
                  <div className="grid grid-cols-1 gap-3">
                    {currentQuestion.options.map((option, index) => {
                      let btnStyle = "bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-850";
                      
                      if (selectedOption === index) {
                        btnStyle = "bg-emerald-500/10 border-emerald-500 text-slate-100";
                      }

                      if (isAnswered) {
                        if (option.isCorrect) {
                          btnStyle = "bg-emerald-500/20 border-emerald-500 text-emerald-300";
                        } else if (selectedOption === index) {
                          btnStyle = "bg-rose-500/20 border-rose-500 text-rose-300";
                        } else {
                          btnStyle = "bg-slate-900 border-slate-850 text-slate-500 cursor-not-allowed";
                        }
                      }

                      return (
                        <button
                          key={index}
                          disabled={isAnswered}
                          onClick={() => handleOptionSelect(index)}
                          className={`p-4 rounded-xl text-left text-sm transition-all border flex justify-between items-center ${btnStyle}`}
                        >
                          <span className="leading-relaxed">{option.text}</span>
                          <div className="ml-3 flex-shrink-0">
                            {isAnswered && option.isCorrect && <CheckCircle className="w-5 h-5 text-emerald-400" />}
                            {isAnswered && selectedOption === index && !option.isCorrect && <XCircle className="w-5 h-5 text-rose-400" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Message de Correction */}
                  {isAnswered && (
                    <div className={`p-4 rounded-xl border flex flex-col space-y-2 animate-fadeIn ${
                      currentQuestion.options[selectedOption].isCorrect 
                        ? "bg-emerald-950/30 border-emerald-500/30 text-emerald-400" 
                        : "bg-rose-950/30 border-rose-500/30 text-rose-400"
                    }`}>
                      <div className="flex items-center space-x-2">
                        {currentQuestion.options[selectedOption].isCorrect ? (
                          <>
                            <CheckCircle className="w-5 h-5 text-emerald-400" />
                            <span className="font-extrabold text-sm">🎉 Bonne réponse ! (+1 point)</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-5 h-5 text-rose-400" />
                            <span className="font-extrabold text-sm">❌ Mauvaise réponse !</span>
                          </>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Boutons d'actions */}
                  <div className="flex justify-end items-center gap-4 border-t border-slate-850 pt-6">
                    <div className="flex space-x-2">
                      {!isAnswered ? (
                        <>
                          <button
                            onClick={handleSkipQuestion}
                            className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-lg transition-all text-xs uppercase tracking-wider"
                          >
                            Passer la question
                          </button>
                          <button
                            disabled={selectedOption === null}
                            onClick={handleValidateAnswer}
                            className={`px-5 py-2.5 rounded-lg font-black text-xs uppercase tracking-wider transition-all ${selectedOption !== null ? 'bg-emerald-500 text-slate-950 hover:bg-emerald-400' : 'bg-slate-800 text-slate-500 cursor-not-allowed'}`}
                          >
                            Valider la réponse
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={handleNextQuestion}
                          className="px-5 py-2.5 bg-slate-850 hover:bg-slate-800 text-slate-100 font-bold rounded-lg transition-all text-xs"
                        >
                          {currentQuestionIndex + 1 < filteredQuestions.length ? "Question suivante" : "Voir les résultats"}
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Explications détaillées après validation */}
                  {isAnswered && (
                    <div className="bg-slate-900/50 border border-slate-850 p-4 rounded-xl text-xs space-y-2.5 animate-fadeIn">
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-slate-300">Justification du cours :</span>
                      </div>
                      <p className="text-slate-300 leading-relaxed">
                        {currentQuestion.options[selectedOption]?.rationale}
                      </p>
                      <p className="text-slate-400 italic leading-relaxed pt-2.5 border-t border-slate-800/60">
                        {currentQuestion.theoryExplanation}
                      </p>
                    </div>
                  )}

                </div>
              ) : (
                <div className="bg-slate-950 border border-slate-850 rounded-2xl p-8 text-center text-slate-400">
                  Aucune question de révision n'est disponible pour cette catégorie.
                </div>
              )}
            </div>
          </div>
        )}

      </main>

      <footer className="bg-slate-950 border-t border-slate-850 py-8 text-center text-xs text-slate-500 mt-20">
        <div className="max-w-6xl mx-auto px-4 space-y-2">
          <p>© 2026 - Plateforme d'accompagnement de chimie UAA8 - Conçue pour les Loulous.</p>
          <p className="text-slate-600">Basé sur le programme officiel d'enseignement secondaire supérieur de la Fédération Wallonie-Bruxelles.</p>
        </div>
      </footer>
    </div>
  );
}