import { SectionsType } from "components/Editor/types";

export const sections: SectionsType[] = [
  {
    id: 1,
    title: "Project Title",
    markdown: `## Project Title
  
  A brief description of what this project does and who it's for
  `,
  },
  {
    id: 2,
    title: "Installation",
    markdown: `## Installation
  
  Install my-project with npm
  
  \`\`\`bash
    npm install my-project
    cd my-project
  \`\`\`
  `,
  },
  {
    id: 3,
    title: "Running Tests",
    markdown: `## Running Tests
    
  To run tests, run the following command
    
  \`\`\`bash
    npm run test
  \`\`\`
  `,
  },
  {
    id: 4,
    title: "Tech Stack",
    markdown: `## 🛠️ Tech Stack
  - [React](https://reactjs.org/)
  - [Next.js](https://nextjs.org/)
  - [TypeScript](https://www.typescriptlang.org/)
  - [Tailwind CSS](https://tailwindcss.com/)
  `,
  },
  {
    id: 5,
    title: "Add Table",
    markdown: `## Add Table
  
  | Column 1 | Column 2 | Column 3 |
  | -------- | -------- | -------- |
  | Row 1    | Row 1    | Row 1    |
  | Row 2    | Row 2    | Row 2    |
  | Row 3    | Row 3    | Row 3    |
  `,
  },
];
