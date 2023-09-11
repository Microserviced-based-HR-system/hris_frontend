# React + TypeScript + Vite
Author: Thin Ei Khaing

**Start the Project**
```
yarn dev
```

**Test the Project**
```
yarn test
```

## Containerize React app
```
docker build . -t hris_app   
docker run -d -p 80:80 hris_app
```

**Installed packages**

ESLint, Prettier, Husky and Lint Staged
```
npm install eslint prettier eslint-config-prettier --save-dev
```
1. scan code and find problems with **ESLint**
2. format code with **Prettier** 
3. create git hooks with **Husk**
4. use **Lint Staged** to prevent commit if any error occurs


**Unit test with vitest**
```
yarn i -D vitest @testing-library/react @testing-library/jest-dom jsdom  
```