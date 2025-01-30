# ModeMakers - Collaborative Angular Project

## Project Structure

The project follows a modular and scalable architecture to facilitate collaborative development. Here's the detailed structure:

```
src/
├── app/
│   ├── core/                 # Singleton services, guards, interceptors
│   │   ├── guards/          # Authentication and route guards
│   │   ├── interceptors/    # HTTP interceptors
│   │   └── services/        # Singleton services
│   ├── shared/              # Shared components, pipes, directives
│   │   ├── components/      # Reusable components
│   │   ├── directives/      # Custom directives
│   │   ├── pipes/           # Custom pipes
│   │   └── models/          # Interfaces and types
│   ├── features/            # Feature modules (Each team member's pages)
│   │   └── [feature-name]/  # Each feature in its own folder
│   └── utils/               # Utility functions and constants
```

## Development Guidelines

### 1. Default Page and Routing
- The default page is the Home feature (`/`)
- Each new feature should be added to the routing system with an intuitive route name in the file `app.routes.ts`
- Example route naming:
  - Products page: `/products`
  - User profile: `/profile`
  - About page: `/about`

### 2. Adding a New Feature
1. Create your feature module in `features/[your-feature]`
2. Add your route to `app.routes.ts`:
   ```typescript
   {
     path: 'your-feature-name',  // Use kebab-case for multi-word routes
     loadChildren: () => import('./features/your-feature/your-feature.module')
       .then(m => m.YourFeatureModule)
   }
   ```
3. Make your component standalone:
   ```typescript
   @Component({
     standalone: true,
     imports: [CommonModule],
     // ... other component metadata
   })
   ```

### 3. Creating New Components
- All shared components should be placed in `shared/components/`
- Feature-specific components go in their respective feature module folder
- Use Angular CLI to generate components: `ng g c shared/components/[component-name]`

### 4. Services
- Global services go in `core/services/`
- Feature-specific services go in their respective feature module
- Use Angular CLI: `ng g s core/services/[service-name]`

### 5. Styling
- Global styles in `styles.css`
- Component-specific styles in their respective `.css` files
- Follow BEM naming convention for CSS classes
- Example:
  ```css
  .block {}
  .block__element {}
  .block--modifier {}
  ```

### 6. Best Practices
- Follow Angular style guide
- Use TypeScript strict mode
- Implement proper error handling
- Write meaningful comments
- Use lazy loading for feature modules
- Keep components small and focused
- Use shared components whenever possible

### 7. Git Workflow
- Create feature branches from develop
- Use conventional commits
- Submit PRs for review
- Resolve conflicts locally before pushing
- Branch naming convention: `feature/page-name`

## Creating a New Page (For Team Members)

1. Create your feature module:
   ```bash
   ng g module features/your-page --routing
   ```

2. Create your component:
   ```bash
   ng g component features/your-page
   ```

3. Update your feature routing module
4. Add your route to app.routes.ts
5. Implement your page using shared components when possible

## Getting Started

1. Clone the repository
2. Run `npm install`
3. Create a new branch for your feature: `git checkout -b feature/your-page`
4. Follow the structure guidelines
5. Submit PR when ready

## Available Scripts

- `npm start`: Start development server
- `npm run build`: Build production version
- `npm test`: Run unit tests
- `npm run lint`: Run linting

## Contributing

1. Create a branch from develop
2. Implement your feature
3. Follow the project structure
4. Submit a Pull Request
5. Wait for review and approval

## Need Help?

- Check the Angular documentation
- Consult with team lead
- Review existing implementations
- Check shared components before creating new ones
