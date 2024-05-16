import { SectionsType } from "components/Editor/types";

export const sections: SectionsType[] = [
  {
    id: 1,
    name: "이미지",
    title: "이미지",
    markdown: `## 이미지
  
![이미지](https://github.com/Readme-Monster/readme-monster/assets/88364280/96e680e5-613f-4818-8603-8afbb0c9acb1)

`,
  },
  {
    id: 2,
    name: "프로젝트 제목",
    title: "프로젝트 제목",
    markdown: `## 프로젝트 제목
  
프로젝트 설명을 입력해 주세요.

`,
  },
  {
    id: 3,
    name: "프로젝트 특징",
    title: "프로젝트 특징",
    markdown: `## 🧐 프로젝트 특징
  
- 특징 1
- 특징 2
- 특징 3

`,
  },
  {
    id: 4,
    name: "설치 방법",
    title: "설치 방법",
    markdown: `## 설치 방법
  
\`\`\`bash
  yarn install readme-monster
\`\`\`

`,
  },
  {
    id: 5,
    name: "기술 스택",
    title: "기술 스택",
    markdown: `## 🛠️ 기술 스택

![Badge](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![Badge](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=white)
![Badge](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat&logo=tailwind-css&logoColor=white)
  
`,
  },
  {
    id: 6,
    name: "테스트 실행",
    title: "테스트 실행",
    markdown: `## 테스트 실행
    
테스트를 실행하려면 다음 명령어를 실행하세요.
    
\`\`\`bash
 npm run test
\`\`\`

`,
  },
  {
    id: 7,
    name: "테이블",
    title: "테이블",
    markdown: `## 테이블
  
| Column 1 | Column 2 | Column 3 |
| -------- | -------- | -------- |
| Row 1    | Row 1    | Row 1    |
| Row 2    | Row 2    | Row 2    |
| Row 3    | Row 3    | Row 3    |

`,
  },
  {
    id: 8,
    name: "링크",
    title: "링크",
    markdown: `## 🔗 링크
  
- [서비스 바로가기](https://readme-monster.netlify.app/)
- [Wiki](https://github.com/Readme-Monster/readme-monster/wiki)

`,
  },

  {
    id: 9,
    name: "뱃지",
    title: "뱃지",
    markdown: `## 뱃지

https://shields.io/ 를 통해 뱃지를 추가해 보세요.
  
[![Commit Activity](https://img.shields.io/github/commit-activity/m/Readme-Monster/readme-monster)](https://github.com/Readme-Monster/readme-monster/pulse/)

`,
  },
  {
    id: 10,
    name: "코드 작성",
    title: "코드 작성",
    markdown: `## 코드 작성
  
\`\`\`javascript
function Code() {
  return console.log("readme-moster")
}
\`\`\`

`,
  },
];
