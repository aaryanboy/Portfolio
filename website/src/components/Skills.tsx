import styles from './Skills.module.css';

const skillCategories = [
  {
    title: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Bootstrap"]
  },
  {
    title: "Backend",
    skills: ["Node.js", "MongoDB", "Express", "Supabase"]
  },
  {
    title: "Tools",
    skills: ["Git",  "VS Code",  "Figma", "Vercel"]
  }
];

export default function Skills() {
  return (
    <section id="skills" className={styles.skills}>
      <div className="container">
        <h2 className={styles.sectionTitle}>Skills<span>.</span></h2>
        <div className={styles.categories}>
          {skillCategories.map((category, idx) => (
            <div key={idx} className={styles.category}>
              <h3>{category.title}</h3>
              <div className={styles.skillList}>
                {category.skills.map((skill, sIdx) => (
                  <span key={sIdx} className={styles.skillBadge}>{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
