const SKILL_CATEGORIES = {
    "Core CS": ["DSA", "OOP", "DBMS", "OS", "Networks"],
    "Languages": ["Java", "Python", "JavaScript", "TypeScript", "C", "C++", "C#", "Go"],
    "Web": ["React", "Next.js", "Node.js", "Express", "REST", "GraphQL"],
    "Data": ["SQL", "MongoDB", "PostgreSQL", "MySQL", "Redis"],
    "Cloud/DevOps": ["AWS", "Azure", "GCP", "Docker", "Kubernetes", "CI/CD", "Linux"],
    "Testing": ["Selenium", "Cypress", "Playwright", "JUnit", "PyTest"]
};

const QUESTIONS_BANK = {
    "DSA": "How would you optimize search in sorted data?",
    "OOP": "Explain the difference between abstraction and encapsulation with an example.",
    "DBMS": "What is normalization and why do we use it in database design?",
    "OS": "Explain the concept of virtual memory and how it works.",
    "Java": "What is the difference between JVM, JRE, and JDK?",
    "Python": "Explain decorators in Python and their common use cases.",
    "JavaScript": "What is the difference between '==' and '===' in JavaScript?",
    "React": "Explain state management options in React and when to use Context vs Redux.",
    "SQL": "Explain indexing and when it helps vs when it hurts performance.",
    "Node.js": "How does the event loop work in Node.js?",
    "AWS": "What are the core differences between S3, EC2, and Lambda?",
    "Docker": "Explain the difference between an Image and a Container.",
    "Linux": "Explain the Linux file permissions system (chmod).",
    "REST": "What are the common HTTP methods used in REST APIs and their purposes?",
    "Next.js": "What is Server Side Rendering (SSR) vs Static Site Generation (SSG)?"
};

export const analyzeJD = (company, role, jdText) => {
    const text = jdText.toLowerCase();
    const extractedSkills = {};
    let totalCategories = 0;

    Object.entries(SKILL_CATEGORIES).forEach(([category, skills]) => {
        const matched = skills.filter(skill => {
            // Use regex to avoid partial matches (e.g., "C" matching "CSS")
            const regex = new RegExp(`\\b${skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
            return regex.test(text);
        });
        if (matched.length > 0) {
            extractedSkills[category] = matched;
            totalCategories++;
        }
    });

    const skillsList = Object.values(extractedSkills).flat();
    const displaySkills = skillsList.length > 0 ? extractedSkills : { "General": ["General fresher stack"] };

    // Calculate Readiness Score
    let score = 35;
    score += Math.min(totalCategories * 5, 30);
    if (company) score += 10;
    if (role) score += 10;
    if (jdText.length > 800) score += 10;
    score = Math.min(score, 100);

    // Generate Questions (Limit to 10)
    const questions = [];
    skillsList.forEach(skill => {
        if (QUESTIONS_BANK[skill]) questions.push(QUESTIONS_BANK[skill]);
    });

    // Fill remaining with generic high-quality questions
    const genericQuestions = [
        "Tell me about a challenging project you've worked on.",
        "Walk me through your resume and key technical decisions.",
        "How do you stay updated with latest technology trends?",
        "Describe a time you had to learn a new tool or language quickly.",
        "What is your approach to debugging complex issues?"
    ];

    while (questions.length < 10) {
        const nextQ = genericQuestions[questions.length % genericQuestions.length];
        if (!questions.includes(nextQ)) {
            questions.push(nextQ);
        } else {
            questions.push(`Advanced ${skillsList[0] || 'Software Engineering'} question placeholder #${questions.length}`);
        }
    }

    // Generate Checklist
    const checklist = {
        "Round 1: Aptitude / Basics": [
            "Quantitative Aptitude & Logical Reasoning practice",
            "Company-specific verbal ability round prep",
            "Core CS fundamentals (CS101 level)",
            "Time management practice for online tests"
        ],
        "Round 2: DSA + Core CS": [
            `Review ${extractedSkills["Core CS"]?.join(", ") || "Data Structures & Algorithms"}`,
            "Solve 10+ LeetCode medium problems this week",
            "Practice dry-running algorithms on paper",
            "Review Big O notation complexity analysis"
        ],
        "Round 3: Tech Interview (Projects + Stack)": [
            `Deep dive into ${skillsList.slice(0, 3).join(", ") || "Main Projects"}`,
            "Prepare STAR method responses for project challenges",
            "Draft architectural diagrams for your key projects",
            `Brush up on ${extractedSkills["Web"]?.join(", ") || "Full Stack"} fundamentals`
        ],
        "Round 4: Managerial / HR": [
            "Prepare 'Tell me about yourself' (60s pitch)",
            "Research company values and culture",
            "Prepare 3 questions to ask the interviewer",
            "Reflect on strengths and areas for improvement"
        ]
    };

    // Generate 7-Day Plan
    const plan = {
        "Day 1-2: Basics + Core CS": `Focus on ${extractedSkills["Core CS"]?.join(", ") || "the fundamentals"}. Review ${extractedSkills["Languages"]?.join(", ") || "primary language"} syntax.`,
        "Day 3-4: DSA + Coding Practice": `Practice ${skillsList.includes("DSA") ? "advanced " : ""}DSA patterns. Focus on Arrays, HashMaps, and ${skillsList.includes("React") ? "Frontend logic" : "Dynamic Programming"}.`,
        "Day 5: Project + Resume Alignment": `Re-align your projects to emphasize ${skillsList.slice(0, 5).join(", ") || "technical expertise"}. Update resume with keywords.`,
        "Day 6: Mock Interview Questions": `Practice explaining: ${questions.slice(0, 3).join(". ")}.`,
        "Day 7: Revision + Weak Areas": "Final review of detected focus areas and common HR questions."
    };

    return {
        id: Date.now(),
        createdAt: new Date().toISOString(),
        company,
        role,
        jdText,
        extractedSkills: displaySkills,
        plan,
        checklist,
        questions: questions.slice(0, 10),
        readinessScore: score,
        baseReadinessScore: score,
        skillConfidenceMap: {}
    };
};

export const saveToHistory = (analysis) => {
    const history = JSON.parse(localStorage.getItem('prep_history') || '[]');
    history.unshift(analysis);
    localStorage.setItem('prep_history', JSON.stringify(history.slice(0, 20))); // Keep last 20
};

export const updateHistoryEntry = (id, updates) => {
    const history = getHistory();
    const index = history.findIndex(item => item.id === id);
    if (index !== -1) {
        history[index] = { ...history[index], ...updates };
        localStorage.setItem('prep_history', JSON.stringify(history));
        // Also update last_result if it's the currently viewed one
        const lastResult = JSON.parse(localStorage.getItem('last_result') || 'null');
        if (lastResult && lastResult.id === id) {
            localStorage.setItem('last_result', JSON.stringify(history[index]));
        }
    }
};

export const getHistory = () => {
    return JSON.parse(localStorage.getItem('prep_history') || '[]');
};
