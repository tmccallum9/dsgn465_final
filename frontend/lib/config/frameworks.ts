// RFC2 §4: The three frameworks — the answer space

export type FrameworkType = 'liquid' | '3m' | '5c';

export interface FrameworkComponent {
  id: string;
  name: string;
  acceptedAnswers: string[]; // All lowercased for matching
  description: string;
}

export interface Framework {
  id: FrameworkType;
  name: string;
  subtitle: string;
  components: FrameworkComponent[];
}

export const FRAMEWORKS: Framework[] = [
  {
    id: 'liquid',
    name: 'Liquid Expectations',
    subtitle: 'Understanding true competition',
    components: [
      {
        id: 'direct',
        name: 'DIRECT',
        acceptedAnswers: ['direct'],
        description: 'Products/services that directly compete with yours',
      },
      {
        id: 'experiential',
        name: 'EXPERIENTIAL',
        acceptedAnswers: ['experiential'],
        description: 'Experiences that replace the need for existing products/services',
      },
      {
        id: 'perceptual',
        name: 'PERCEPTUAL',
        acceptedAnswers: ['perceptual'],
        description: 'Companies that shape customer expectations across categories',
      },
    ],
  },
  {
    id: '3m',
    name: '3M Framework',
    subtitle: 'Evaluating desirability and the right unmet need',
    components: [
      {
        id: 'motivations',
        name: 'MOTIVATIONS',
        acceptedAnswers: ['motivations'],
        description: 'What drives the change? (evergreen vs emerging, structural vs cyclical)',
      },
      {
        id: 'market',
        name: 'MARKET',
        acceptedAnswers: ['market'],
        description: 'Who/what does this compete against? (direct, experiential, perceptual lenses)',
      },
      {
        id: 'mechanics',
        name: 'MECHANICS',
        acceptedAnswers: ['mechanics'],
        description: 'How does the offering work? (full product vs feature, bundling, standalone value)',
      },
    ],
  },
  {
    id: '5c',
    name: '5C Framework',
    subtitle: 'Understanding innovation advantage — permission, prize, advantage',
    components: [
      {
        id: 'customer-permission',
        name: 'CUSTOMER PERMISSION',
        acceptedAnswers: ['customer permission', 'permission'],
        description: 'Do customers want us to do this? Will they trust us?',
      },
      {
        id: 'capability',
        name: 'CAPABILITY',
        acceptedAnswers: ['capability'],
        description: 'What do we uniquely have to win? Existing assets, strategic fit',
      },
      {
        id: 'consciousness',
        name: 'CONSCIOUSNESS',
        acceptedAnswers: ['consciousness', 'conscious'],
        description: 'Should we do this? Social, ethical, brand alignment',
      },
      {
        id: 'category',
        name: 'CATEGORY',
        acceptedAnswers: ['category'],
        description: 'Why now? Market trends, behavior shifts, technology context',
      },
      {
        id: 'commercial',
        name: 'COMMERCIAL',
        acceptedAnswers: ['commercial'],
        description: 'Is the prize meaningful? Market size, growth, long-term value',
      },
    ],
  },
];

// Flatten all accepted answers for quick lookup during matching
export const ALL_ACCEPTED_ANSWERS = FRAMEWORKS.flatMap((framework) =>
  framework.components.flatMap((component) =>
    component.acceptedAnswers.map((answer) => ({
      answer,
      componentId: component.id,
      frameworkId: framework.id,
    }))
  )
);

// Get a component by ID across all frameworks
export function getComponentById(componentId: string): FrameworkComponent | undefined {
  for (const framework of FRAMEWORKS) {
    const component = framework.components.find((c) => c.id === componentId);
    if (component) return component;
  }
  return undefined;
}
