// RFC2 §9: Objection authoring
// 12 seed objections provided in spec, ~13 more to be authored by Tyler

export type FrameworkType = 'liquid' | '3m' | '5c';

export type ObjectionComponent =
  | 'direct' | 'experiential' | 'perceptual'                       // Liquid
  | 'motivations' | 'market' | 'mechanics'                         // 3M
  | 'customer-permission' | 'capability' | 'consciousness'         // 5C
  | 'category' | 'commercial';                                     // 5C

export interface Objection {
  id: string;
  text: string;                    // Short, voice-of-skeptic phrasing, 4–12 words
  framework: FrameworkType;
  component: ObjectionComponent;
  acceptedAnswers: string[];       // Lowercased canonical + shorthand forms
  explanation: string;             // 1-sentence "why this framework wins" — flashes on slice
}

export const OBJECTIONS: Objection[] = [
  // 3M Framework objections
  {
    id: 'obj-001',
    text: "Nobody's actually asking us for this",
    framework: '3m',
    component: 'motivations',
    acceptedAnswers: ['motivations'],
    explanation: 'Motivations: is this an evergreen need being underserved, or an emerging one driven by structural change?'
  },
  {
    id: 'obj-002',
    text: "The market is shrinking 8% a year",
    framework: '3m',
    component: 'market',
    acceptedAnswers: ['market'],
    explanation: 'Market: evaluate the market for change — direct, experiential, and perceptual competitive pressures.'
  },
  {
    id: 'obj-003',
    text: "This is just a feature, not a product",
    framework: '3m',
    component: 'mechanics',
    acceptedAnswers: ['mechanics'],
    explanation: 'Mechanics: rethink the offering — full product vs feature, standalone value, bundling.'
  },
  {
    id: 'obj-012',
    text: "Gen Z fundamentally interacts with brands differently now",
    framework: '3m',
    component: 'motivations',
    acceptedAnswers: ['motivations'],
    explanation: 'Motivations: a structural shift in customer behavior is a different kind of opportunity than a cyclical one.'
  },

  // Liquid Expectations objections
  {
    id: 'obj-004',
    text: "Apple has trained users to expect zero-friction onboarding",
    framework: 'liquid',
    component: 'perceptual',
    acceptedAnswers: ['perceptual'],
    explanation: 'Perceptual: companies outside your category are shaping what customers expect from any moment that matters.'
  },
  {
    id: 'obj-005',
    text: "Customers are using YouTube tutorials instead of buying our service",
    framework: 'liquid',
    component: 'experiential',
    acceptedAnswers: ['experiential'],
    explanation: 'Experiential: an alternative experience is replacing the need your offering used to fulfill.'
  },
  {
    id: 'obj-006',
    text: "Three competitors launched the same thing last quarter",
    framework: 'liquid',
    component: 'direct',
    acceptedAnswers: ['direct'],
    explanation: 'Direct: are we differentiated — valuable and visible — versus the competitors playing the same game?'
  },

  // 5C Framework objections
  {
    id: 'obj-007',
    text: "Our customers don't trust us with their health data",
    framework: '5c',
    component: 'customer-permission',
    acceptedAnswers: ['customer permission', 'permission'],
    explanation: 'Customer Permission: do they want us to do this? Do we have the right to play in this space with this audience?'
  },
  {
    id: 'obj-008',
    text: "Our field force has never sold a subscription product",
    framework: '5c',
    component: 'capability',
    acceptedAnswers: ['capability'],
    explanation: 'Capability: what do we uniquely have to win? Do existing assets accelerate or block us?'
  },
  {
    id: 'obj-009',
    text: "This profits off vulnerable users",
    framework: '5c',
    component: 'consciousness',
    acceptedAnswers: ['consciousness', 'conscious'],
    explanation: 'Consciousness: should we do this? Social, ethical, and brand-promise alignment matter.'
  },
  {
    id: 'obj-010',
    text: "Regulation in this space is changing every six months",
    framework: '5c',
    component: 'category',
    acceptedAnswers: ['category'],
    explanation: 'Category: why now? Are market and regulatory trends a tailwind or a headwind?'
  },
  {
    id: 'obj-011',
    text: "Even at full scale this is a $20M business",
    framework: '5c',
    component: 'commercial',
    acceptedAnswers: ['commercial'],
    explanation: 'Commercial: is the prize meaningful? Size, growth, and long-term value of the play.'
  },

  // TODO: Tyler to add ~13 more objections for fuller coverage and better distribution
  // Target: roughly even distribution across all 11 components
  // Guidelines:
  // - Voice of skeptical executive in a meeting
  // - Generic but recognizable (any MMM-internship-target company could face)
  // - Clean mapping: one framework is obviously right, one component is obviously right
];
