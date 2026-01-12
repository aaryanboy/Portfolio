import styles from './Skills.module.css';
import Image from 'next/image';

const skillCategories = [
  {
    title: "Frontend",
    icon: "⚔️",
    skills: [
      { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "Next.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
      { name: "TypeScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
      { name: "Tailwind", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
      { name: "Bootstrap", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg" }
    ]
  },
  {
    title: "Backend",
    icon: "🛡️",
    skills: [
      { name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
      { name: "MongoDB", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
      { name: "Express", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
      { name: "Supabase", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg" }
    ]
  },
  {
    title: "Tools",
    icon: "⚡",
    skills: [
      { name: "Git", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
      { name: "VS Code", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
      { name: "Figma", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
      { name: "Vercel", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg" }
    ]
  }
];

export default function Skills() {
  return (
    <section id="skills" className={styles.skills}>
      {/* Background decoration */}
      <div className={styles.bgPattern}></div>
      
      <div className="container">
        <h2 className={styles.sectionTitle}>
          <span className={styles.titleIcon}>◆</span>
          Skills
          <span className={styles.accent}>.</span>
        </h2>
        <p className={styles.subtitle}>Abilities & Proficiencies</p>
        
        <div className={styles.categories}>
          {skillCategories.map((category, idx) => (
            <div key={idx} className={styles.category}>
              <div className={styles.categoryHeader}>
                <div className={styles.categoryIcon}>{category.icon}</div>
                <h3>{category.title}</h3>
                <div className={styles.categoryLine}></div>
              </div>
              
              <div className={styles.skillGrid}>
                {category.skills.map((skill, sIdx) => (
                  <div key={sIdx} className={styles.skillCard}>
                    <div className={styles.skillLogo}>
                      <Image 
                        src={skill.logo} 
                        alt={skill.name}
                        width={40}
                        height={40}
                        unoptimized
                      />
                    </div>
                    <span className={styles.skillName}>{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
