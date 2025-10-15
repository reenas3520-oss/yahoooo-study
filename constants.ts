import { VoiceOption, LanguageOption } from './types';

// A placeholder or a real URL for a default avatar.
export const DEFAULT_AVATAR_URL = 'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg';

// Data structure for NCERT curriculum.
export const NCERT_DATA = {
  '9': {
    'Science': {
      'NCERT': [
        'Matter in Our Surroundings',
        'Is Matter Around Us Pure',
        'Atoms and Molecules',
        'Structure of the Atom',
        'The Fundamental Unit of Life',
        'Tissues',
        'Motion',
        'Force and Laws of Motion',
        'Gravitation',
        'Work and Energy',
        'Sound',
        'Why Do We Fall Ill',
        'Improvement in Food Resources'
      ]
    },
    'Maths': {
      'NCERT': [
        'Number Systems',
        'Polynomials',
        'Coordinate Geometry',
        'Linear Equations in Two Variables',
        'Introduction to Euclid\'s Geometry',
        'Lines and Angles',
        'Triangles',
        'Quadrilaterals',
        'Circles',
        'Constructions',
        'Heron\'s Formula',
        'Surface Areas and Volumes',
        'Statistics',
        'Probability'
      ],
      'RD Sharma': [
        'Number Systems',
        'Exponents of Real Numbers',
        'Rationalisation',
        'Algebraic Identities',
        'Factorisation of Algebraic Expressions',
        'Factorisation of Polynomials',
        'Linear Equations in Two Variables',
        'Coordinate Geometry',
        'Introduction to Euclid\'s Geometry',
        'Lines and Angles',
        'Triangle and its Angles',
        'Congruent Triangles',
        'Quadrilaterals',
        'Areas of Parallelograms and Triangles',
        'Circles',
        'Geometrical Constructions',
        'Heron\'s Formula',
        'Surface Area and Volume of a Cuboid and Cube',
        'Surface Area and Volume of a Right Circular Cylinder',
        'Surface Area and Volume of a Right Circular Cone',
        'Surface Area and Volume of a Sphere',
        'Tabular Representation of Statistical Data',
        'Graphical Representation of Statistical Data',
        'Measures of Central Tendency',
        'Probability'
      ]
    },
    'Social Science': {
      'History: India and the Contemporary World – I': [
        'The French Revolution',
        'Socialism in Europe and the Russian Revolution',
        'Nazism and the Rise of Hitler',
        'Forest Society and Colonialism',
        'Pastoralists in the Modern World'
      ],
      'Geography: Contemporary India – I': [
        'India - Size and Location',
        'Physical Features of India',
        'Drainage',
        'Climate',
        'Natural Vegetation and Wildlife',
        'Population'
      ],
      'Political Science: Democratic Politics – I': [
        'What is Democracy? Why Democracy?',
        'Constitutional Design',
        'Electoral Politics',
        'Working of Institutions',
        'Democratic Rights'
      ],
      'Economics': [
        'The Story of Village Palampur',
        'People as Resource',
        'Poverty as a Challenge',
        'Food Security in India'
      ]
    },
    'English': {
      'Beehive': [
        'The Fun They Had',
        'The Sound of Music',
        'The Little Girl',
        'A Truly Beautiful Mind',
        'The Snake and the Mirror',
        'My Childhood',
        'Reach for the Top',
        'Kathmandu',
        'If I Were You'
      ],
      'Moments': [
        'The Lost Child',
        'The Adventures of Toto',
        'Iswaran the Storyteller',
        'In the Kingdom of Fools',
        'The Happy Prince',
        'The Last Leaf',
        'A House Is Not a Home'
      ]
    },
    'Computer Science': {
      'Information Technology (402)': [
        'Communication Skills-I',
        'Self-Management Skills-I',
        'ICT Skills-I',
        'Entrepreneurial Skills-I',
        'Green Skills-I',
        'Introduction to IT-ITeS industry',
        'Data Entry & Keyboarding Skills',
        'Digital Documentation',
        'Electronic Spreadsheet',
        'Digital Presentation'
      ]
    }
  },
  '10': {
    'Science': {
      'NCERT': [
        'Chemical Reactions and Equations',
        'Acids, Bases and Salts',
        'Metals and Non-metals',
        'Carbon and its Compounds',
        'Periodic Classification of Elements',
        'Life Processes',
        'Control and Coordination',
        'How do Organisms Reproduce?',
        'Heredity and Evolution',
        'Light – Reflection and Refraction',
        'Human Eye and Colourful World',
        'Electricity',
        'Magnetic Effects of Electric Current',
        'Sources of Energy',
        'Our Environment'
      ]
    },
    'Maths': {
      'NCERT': [
        'Real Numbers',
        'Polynomials',
        'Pair of Linear Equations in Two Variables',
        'Quadratic Equations',
        'Arithmetic Progressions',
        'Triangles',
        'Coordinate Geometry',
        'Introduction to Trigonometry',
        'Some Applications of Trigonometry',
        'Circles',
        'Constructions',
        'Areas Related to Circles',
        'Surface Areas and Volumes',
        'Statistics',
        'Probability'
      ],
       'RD Sharma': [
        'Real Numbers',
        'Polynomials',
        'Pair of Linear Equations in Two Variables',
        'Triangles',
        'Trigonometric Ratios',
        'Trigonometric Identities',
        'Statistics',
        'Quadratic Equations',
        'Arithmetic Progressions',
        'Circles',
        'Constructions',
        'Some Applications of Trigonometry',
        'Probability',
        'Coordinate Geometry',
        'Areas Related to Circles',
        'Surface Areas and Volumes'
      ]
    },
    'Social Science': {
      'History: India and the Contemporary World – II': [
        'The Rise of Nationalism in Europe',
        'Nationalism in India',
        'The Making of a Global World',
        'The Age of Industrialisation',
        'Print Culture and the Modern World'
      ],
      'Geography: Contemporary India – II': [
        'Resources and Development',
        'Forest and Wildlife Resources',
        'Water Resources',
        'Agriculture',
        'Minerals and Energy Resources',
        'Manufacturing Industries',
        'Lifelines of National Economy'
      ],
      'Political Science: Democratic Politics – II': [
        'Power-sharing',
        'Federalism',
        'Gender, Religion and Caste',
        'Political Parties',
        'Outcomes of Democracy',
        'Challenges to Democracy'
      ],
      'Economics: Understanding Economic Development': [
        'Development',
        'Sectors of the Indian Economy',
        'Money and Credit',
        'Globalisation and the Indian Economy',
        'Consumer Rights'
      ]
    },
    'English': {
      'First Flight': [
        'A Letter to God',
        'Nelson Mandela: Long Walk to Freedom',
        'Two Stories about Flying',
        'From the Diary of Anne Frank',
        'Glimpses of India',
        'Mijbil the Otter',
        'Madam Rides the Bus',
        'The Sermon at Benares',
        'The Proposal'
      ],
      'Footprints Without Feet': [
        'A Triumph of Surgery',
        'The Thief\'s Story',
        'The Midnight Visitor',
        'A Question of Trust',
        'Footprints without Feet',
        'The Making of a Scientist',
        'The Necklace',
        'The Hack Driver',
        'Bholi'
      ]
    },
    'Computer Science': {
      'Information Technology (402)': [
        'Communication Skills-II',
        'Self-Management Skills-II',
        'ICT Skills-II',
        'Entrepreneurial Skills-II',
        'Green Skills-II',
        'Digital Documentation (Advanced)',
        'Electronic Spreadsheet (Advanced)',
        'Database Management System',
        'Web Applications and Security'
      ]
    }
  },
  '11': {
    'Physics': {
      'NCERT': [
        'Units and Measurements',
        'Motion in a Straight Line',
        'Motion in a Plane',
        'Laws of Motion',
        'Work, Energy and Power',
        'System of Particles and Rotational Motion',
        'Gravitation',
        'Mechanical Properties of Solids',
        'Mechanical Properties of Fluids',
        'Thermal Properties of Matter',
        'Thermodynamics',
        'Kinetic Theory',
        'Oscillations',
        'Waves'
      ]
    },
    'Chemistry': {
      'NCERT': [
        'Some Basic Concepts of Chemistry',
        'Structure of Atom',
        'Classification of Elements and Periodicity in Properties',
        'Chemical Bonding and Molecular Structure',
        'States of Matter',
        'Thermodynamics',
        'Equilibrium',
        'Redox Reactions',
        'Hydrogen',
        'The s-Block Elements',
        'The p-Block Elements',
        'Organic Chemistry: Some Basic Principles and Techniques',
        'Hydrocarbons',
        'Environmental Chemistry'
      ]
    },
    'Biology': {
      'NCERT': [
        'The Living World',
        'Biological Classification',
        'Plant Kingdom',
        'Animal Kingdom',
        'Morphology of Flowering Plants',
        'Anatomy of Flowering Plants',
        'Structural Organisation in Animals',
        'Cell: The Unit of Life',
        'Biomolecules',
        'Cell Cycle and Cell Division',
        'Transport in Plants',
        'Mineral Nutrition',
        'Photosynthesis in Higher Plants',
        'Respiration in Plants',
        'Plant Growth and Development',
        'Digestion and Absorption',
        'Breathing and Exchange of Gases',
        'Body Fluids and Circulation',
        'Excretory Products and their Elimination',
        'Locomotion and Movement',
        'Neural Control and Coordination',
        'Chemical Coordination and Integration'
      ]
    },
    'Maths': {
      'NCERT': [
        'Sets',
        'Relations and Functions',
        'Trigonometric Functions',
        'Principle of Mathematical Induction',
        'Complex Numbers and Quadratic Equations',
        'Linear Inequalities',
        'Permutations and Combinations',
        'Binomial Theorem',
        'Sequences and Series',
        'Straight Lines',
        'Conic Sections',
        'Introduction to Three Dimensional Geometry',
        'Limits and Derivatives',
        'Mathematical Reasoning',
        'Statistics',
        'Probability'
      ],
       'RD Sharma': [
        'Sets',
        'Relations',
        'Functions',
        'Measurement of Angles',
        'Trigonometric Functions',
        'Graphs of Trigonometric Functions',
        'Trigonometric Ratios of Compound Angles',
        'Transformation Formulae',
        'Trigonometric Ratios of Multiple and Submultiple Angles',
        'Sine and Cosine Formulae and Their Applications',
        'Trigonometric Equations',
        'Mathematical Induction',
        'Complex Numbers',
        'Quadratic Equations',
        'Linear Inequations',
        'Permutations',
        'Combinations',
        'Binomial Theorem',
        'Arithmetic Progressions',
        'Geometric Progressions',
        'Some Special Series',
        'Brief review of Cartesian System of Rectangular Coordinates',
        'The Straight Lines',
        'The Circle',
        'Parabola',
        'Ellipse',
        'Hyperbola',
        'Introduction to 3D Coordinate Geometry',
        'Limits',
        'Derivatives',
        'Mathematical Reasoning',
        'Statistics',
        'Probability'
       ]
    },
    'English': {
      'Hornbill': [
        'The Portrait of a Lady',
        'We\'re Not Afraid to Die...',
        'Discovering Tut: the Saga Continues',
        'The Ailing Planet: the Green Movement\'s Role',
        'The Browning Version',
        'Childhood',
        'The Adventure'
      ],
      'Snapshots': [
        'The Summer of the Beautiful White Horse',
        'The Address',
        'Ranga\'s Marriage',
        'Albert Einstein at School',
        'Mother\'s Day',
        'Birth'
      ]
    },
    'Computer Science': {
      'NCERT': [
        'Computer Systems and Organisation',
        'Data Representation',
        'Boolean Logic',
        'Introduction to Problem Solving',
        'Python Fundamentals',
        'Data Handling',
        'Conditional and Iterative Statements',
        'Strings',
        'Lists, Dictionaries and Tuples',
        'Societal Impacts'
      ]
    },
    'Accountancy': {
      'NCERT': [
        'Introduction to Accounting',
        'Theory Base of Accounting',
        'Recording of Transactions - I',
        'Recording of Transactions - II',
        'Bank Reconciliation Statement',
        'Trial Balance and Rectification of Errors',
        'Depreciation, Provisions and Reserves',
        'Financial Statements - I',
        'Financial Statements - II',
        'Accounts from Incomplete Records',
        'Computers in Accounting'
      ]
    },
    'Business Studies': {
        'NCERT': [
            'Nature and Purpose of Business',
            'Forms of Business Organisation',
            'Private, Public and Global Enterprises',
            'Business Services',
            'Emerging Modes of Business',
            'Social Responsibilities of Business and Business Ethics',
            'Formation of a Company',
            'Sources of Business Finance',
            'Small Business',
            'Internal Trade',
            'International Business-I',
            'International Business-II'
        ]
    }
  },
  '12': {
    'Physics': {
      'NCERT': [
        'Electric Charges and Fields',
        'Electrostatic Potential and Capacitance',
        'Current Electricity',
        'Moving Charges and Magnetism',
        'Magnetism and Matter',
        'Electromagnetic Induction',
        'Alternating Current',
        'Electromagnetic Waves',
        'Ray Optics and Optical Instruments',
        'Wave Optics',
        'Dual Nature of Radiation and Matter',
        'Atoms',
        'Nuclei',
        'Semiconductor Electronics: Materials, Devices and Simple Circuits'
      ]
    },
    'Chemistry': {
      'NCERT': [
        'The Solid State',
        'Solutions',
        'Electrochemistry',
        'Chemical Kinetics',
        'Surface Chemistry',
        'General Principles and Processes of Isolation of Elements',
        'The p-Block Elements',
        'The d- and f-Block Elements',
        'Coordination Compounds',
        'Haloalkanes and Haloarenes',
        'Alcohols, Phenols and Ethers',
        'Aldehydes, Ketones and Carboxylic Acids',
        'Amines',
        'Biomolecules',
        'Polymers',
        'Chemistry in Everyday Life'
      ]
    },
    'Biology': {
      'NCERT': [
        'Reproduction in Organisms',
        'Sexual Reproduction in Flowering Plants',
        'Human Reproduction',
        'Reproductive Health',
        'Principles of Inheritance and Variation',
        'Molecular Basis of Inheritance',
        'Evolution',
        'Human Health and Disease',
        'Strategies for Enhancement in Food Production',
        'Microbes in Human Welfare',
        'Biotechnology: Principles and Processes',
        'Biotechnology and its Applications',
        'Organisms and Populations',
        'Ecosystem',
        'Biodiversity and Conservation',
        'Environmental Issues'
      ]
    },
    'Maths': {
      'NCERT': [
        'Relations and Functions',
        'Inverse Trigonometric Functions',
        'Matrices',
        'Determinants',
        'Continuity and Differentiability',
        'Application of Derivatives',
        'Integrals',
        'Application of Integrals',
        'Differential Equations',
        'Vector Algebra',
        'Three Dimensional Geometry',
        'Linear Programming',
        'Probability'
      ],
       'RD Sharma': [
        'Relations',
        'Functions',
        'Binary Operations',
        'Inverse Trigonometric Functions',
        'Algebra of Matrices',
        'Determinants',
        'Adjoint and Inverse of a Matrix',
        'Solution of Simultaneous Linear Equations',
        'Continuity',
        'Differentiability',
        'Differentiation',
        'Higher Order Derivatives',
        'Derivative as a Rate Measurer',
        'Differentials, Errors and Approximations',
        'Mean Value Theorems',
        'Tangents and Normals',
        'Increasing and Decreasing Functions',
        'Maxima and Minima',
        'Indefinite Integrals',
        'Definite Integrals',
        'Areas of Bounded Regions',
        'Differential Equations',
        'Algebra of Vectors',
        'Scalar Or Dot Product',
        'Vector Or Cross Product',
        'Scalar Triple Product',
        'Direction Cosines and Direction Ratios',
        'Straight Line in Space',
        'The Plane',
        'Linear Programming',
        'Probability',
        'Mean and Variance of a Random Variable',
        'Binomial Distribution'
       ]
    },
    'English': {
      'Flamingo': [
        'The Last Lesson',
        'Lost Spring',
        'Deep Water',
        'The Rattrap',
        'Indigo',
        'Poets and Pancakes',
        'The Interview',
        'Going Places'
      ],
      'Vistas': [
        'The Third Level',
        'The Tiger King',
        'Journey to the end of the Earth',
        'The Enemy',
        'Should Wizard hit Mommy',
        'On the face of It',
        'Memories of Childhood'
      ]
    },
    'Computer Science': {
      'NCERT': [
        'Exception Handling in Python',
        'File Handling in Python',
        'Stack',
        'Queue',
        'Searching and Sorting',
        'Database Concepts',
        'Structured Query Language (SQL)',
        'Computer Networks',
        'Data Communication',
        'Security Aspects'
      ]
    },
    'Accountancy': {
      'NCERT': [
        'Accounting for Not-for-Profit Organisation',
        'Accounting for Partnership: Basic Concepts',
        'Reconstitution of a Partnership Firm - Admission of a Partner',
        'Reconstitution of a Partnership Firm - Retirement/Death of a Partner',
        'Dissolution of Partnership Firm',
        'Accounting for Share Capital',
        'Issue and Redemption of Debentures',
        'Financial Statements of a Company',
        'Analysis of Financial Statements',
        'Accounting Ratios',
        'Cash Flow Statement'
      ]
    },
    'Business Studies': {
      'NCERT': [
        'Nature and Significance of Management',
        'Principles of Management',
        'Business Environment',
        'Planning',
        'Organising',
        'Staffing',
        'Directing',
        'Controlling',
        'Financial Management',
        'Financial Markets',
        'Marketing',
        'Consumer Protection'
      ]
    }
  }
};

export const LANGUAGES: LanguageOption[] = [
    { code: 'en', label: 'English' },
    { code: 'hi', label: 'Hindi (हिन्दी)' },
    { code: 'mix', label: 'Hinglish (Mix)' },
];

// Voice options for Text-to-Speech from Gemini API.
export const VOICE_OPTIONS: VoiceOption[] = [
    { name: 'Kore', label: 'Kore (Female)' },
    { name: 'Puck', label: 'Puck (Male)' },
    { name: 'Charon', label: 'Charon (Male)' },
    { name: 'Fenrir', label: 'Fenrir (Male)' },
    { name: 'Zephyr', label: 'Zephyr (Female)' },
];