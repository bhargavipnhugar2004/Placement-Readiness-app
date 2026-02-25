const SKILL_CATEGORIES = {
    "coreCS": ["DSA", "OOP", "DBMS", "OS", "Networks"],
    "languages": ["Java", "Python", "JavaScript", "TypeScript", "C", "C++", "C#", "Go"],
    "web": ["React", "Next.js", "Node.js", "Express", "REST", "GraphQL"],
    "data": ["SQL", "MongoDB", "PostgreSQL", "MySQL", "Redis"],
    "cloud": ["AWS", "Azure", "GCP", "Docker", "Kubernetes", "CI/CD", "Linux"],
    "testing": ["Selenium", "Cypress", "Playwright", "JUnit", "PyTest"]
};

const ENTERPRISE_COMPANIES = [
    "amazon", "google", "microsoft", "meta", "apple", "netflix", "infosys",
    "tcs", "wipro", "accenture", "cognizant", "capgemini", "ibm", "oracle",
    "cisco", "sap", "nvidia", "adobe", "intel", "samsung"
];

const COMPANY_MAPPING = {
    enterprise: {
        size: "Enterprise (2000+)",
        focus: "Structured DSA + Core CS Fundamentals",
        typicalRounds: () => [
            { title: "Online Test", focus: ["DSA", "Aptitude"], why: "To filter base technical capability and speed." },
            { title: "Technical Round 1", focus: ["DSA", "Core CS"], why: "Deep dive into algorithms and problem solving." },
            { title: "Technical Round 2", focus: ["CS Fundamentals", "System Design"], why: "Verifying foundational knowledge." },
            { title: "HR / Managerial", focus: ["Culture", "Behavioral"], why: "Ensuring long-term team fit." }
        ]
    },
    startup: {
        size: "Startup (<200)",
        focus: "Practical Problem Solving + Stack Depth",
        typicalRounds: () => [
            { title: "Coding Challenge", focus: ["Practical Implementation"], why: "Testing real-world building skills." },
            { title: "Tech Discussion", focus: ["Frameworks", "Architecture"], why: "Discussing technical decisions." },
            { title: "Culture Fit", focus: ["Mission Alignment"], why: "Critical for small teams." }
        ]
    }
};

const QUESTIONS_BANK = {
    "DSA": "How would you optimize search in sorted data?",
    "OOP": "Explain the difference between abstraction and encapsulation.",
    "DBMS": "What is normalization and why do we use it?",
    "OS": "Explain virtual memory.",
    "Java": "What is the difference between JVM, JRE, and JDK?",
    "Python": "Explain decorators in Python.",
    "JavaScript": "What is the difference between '==' and '==='?",
    "React": "Explain state management options in React.",
    "SQL": "Explain indexing performance impact.",
    "Node.js": "How does the event loop work?",
    "AWS": "Difference between S3, EC2, and Lambda?",
    "Docker": "Image vs Container?",
    "Linux": "Explain chmod permissions.",
    "REST": "Common HTTP methods and purposes.",
    "Next.js": "SSR vs SSG?"
};

export const analyzeJD = (company, role, jdText) => {
    const text = jdText.toLowerCase();
    const extractedSkills = {
        coreCS: [],
        languages: [],
        web: [],
        data: [],
        cloud: [],
        testing: [],
        other: []
    };
    let totalCategories = 0;

    Object.entries(SKILL_CATEGORIES).forEach(([category, skills]) => {
        const matched = skills.filter(skill => {
            const regex = new RegExp(`\\b${skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
            return regex.test(text);
        });
        if (matched.length > 0) {
            extractedSkills[category] = matched;
            totalCategories++;
        }
    });

    // Default behavior if no skills detected
    const allExtracted = Object.values(extractedSkills).flat();
    if (allExtracted.length === 0) {
        extractedSkills.other = ["Communication", "Problem solving", "Basic coding", "Projects"];
    }

    const skillsList = Object.values(extractedSkills).flat();

    // Company Intel Logic
    const companyLower = (company || "").toLowerCase().trim();
    const isEnterprise = ENTERPRISE_COMPANIES.some(c => companyLower.includes(c));
    const companySize = isEnterprise ? "enterprise" : "startup";
    const intel = COMPANY_MAPPING[companySize];

    // Readiness Score computation (Base Score)
    let baseScore = 35;
    baseScore += Math.min(totalCategories * 5, 30);
    if (company) baseScore += 10;
    if (role) baseScore += 10;
    if (jdText.length > 800) baseScore += 10;
    baseScore = Math.min(baseScore, 100);

    // Dynamic Rounds
    const rounds = intel.typicalRounds();
    const roundMapping = rounds.map(r => ({
        roundTitle: r.title,
        focusAreas: r.focus,
        whyItMatters: r.why
    }));

    // Checklist (Round based)
    const checklist = rounds.map(r => ({
        roundTitle: r.title,
        items: [
            `Study ${r.focus.join(" & ")} fundamentals`,
            `Prepare for ${r.title} specific challenges`,
            `Review relevant projects for ${r.focus[0] || "this stage"}`
        ]
    }));

    // 7-Day Plan
    const plan7Days = [
        { day: "Day 1-2", focus: "Fundamentals", tasks: [`Review ${extractedSkills.coreCS[0] || "Computer Science"} concepts`, `Language basics of ${extractedSkills.languages[0] || "your stack"}`] },
        { day: "Day 3-4", focus: "Technical Depth", tasks: [`Deep dive into ${extractedSkills.web[0] || extractedSkills.data[0] || "Advanced topics"}`, "Solve 5 medium coding problems"] },
        { day: "Day 5", focus: "Architecture/Projects", tasks: ["Review your top project", "Prepare architecture diagrams"] },
        { day: "Day 6", focus: "Communication", tasks: ["STAR method practice", "Walkthrough of your resume"] },
        { day: "Day 7", focus: "Final Prep", tasks: ["Mock interview", "Weak area revision"] }
    ];

    // Questions
    const questions = [];
    skillsList.forEach(skill => {
        if (QUESTIONS_BANK[skill]) questions.push(QUESTIONS_BANK[skill]);
    });
    const genericQuestions = ["Explain your most challenging project.", "How do you debug hard issues?", "Walk me through your resume.", "Why do you want to join this company?"];
    while (questions.length < 10) {
        questions.push(genericQuestions[questions.length % genericQuestions.length]);
    }

    const now = new Date().toISOString();

    return {
        id: Date.now(),
        createdAt: now,
        updatedAt: now,
        company: company || "",
        role: role || "",
        jdText,
        extractedSkills,
        roundMapping,
        checklist,
        plan7Days,
        questions: questions.slice(0, 10),
        baseScore,
        skillConfidenceMap: {},
        finalScore: baseScore
    };
};

export const saveToHistory = (analysis) => {
    try {
        const history = JSON.parse(localStorage.getItem('prep_history') || '[]');
        history.unshift(analysis);
        localStorage.setItem('prep_history', JSON.stringify(history.slice(0, 20)));
    } catch {
        console.error("Corrupted history detected during save.");
        localStorage.setItem('prep_history', JSON.stringify([analysis]));
    }
};

export const updateHistoryEntry = (id, updates) => {
    const history = getHistory();
    const index = history.findIndex(item => item.id === id);
    if (index !== -1) {
        const item = history[index];
        const newUpdates = { ...updates, updatedAt: new Date().toISOString() };

        // Recalculate finalScore if skillConfidenceMap changes
        if (updates.skillConfidenceMap) {
            const skillsList = Object.values(item.extractedSkills).flat();
            let scoreAdjustment = 0;
            skillsList.forEach(s => {
                if (updates.skillConfidenceMap[s] === 'know') scoreAdjustment += 2;
                else scoreAdjustment -= 2;
            });
            newUpdates.finalScore = Math.min(100, Math.max(0, item.baseScore + scoreAdjustment));
        }

        history[index] = { ...item, ...newUpdates };
        localStorage.setItem('prep_history', JSON.stringify(history));

        const lastResult = JSON.parse(localStorage.getItem('last_result') || 'null');
        if (lastResult && lastResult.id === id) {
            localStorage.setItem('last_result', JSON.stringify(history[index]));
        }
    }
};

export const getHistory = () => {
    try {
        const raw = localStorage.getItem('prep_history');
        if (!raw) return [];
        const history = JSON.parse(raw);
        if (!Array.isArray(history)) {
            console.error("History is not an array, resetting.");
            return [];
        }
        // Basic validation of fields to filter out "corrupted" entries
        return history.filter(item => item && item.id && item.jdText);
    } catch {
        console.error("Failed to parse history.");
        return [];
    }
};
