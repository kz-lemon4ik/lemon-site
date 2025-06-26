# Contexts Architecture

## Structure

```
contexts/
├── ThemeContext.tsx      # Theme management (light/dark)
├── MotionContext.tsx     # Animation preferences
├── HeaderContext.tsx     # Header visibility
├── SettingsContext.tsx   # Original (legacy)
├── SettingsContextRefactored.tsx  # Unified wrapper
└── index.ts             # Exports
```

## Design Principles

### 1. Single Responsibility Principle (SRP)

Each context has one clear responsibility:

- **ThemeContext**: Theme state + document application
- **MotionContext**: Motion preferences + system detection
- **HeaderContext**: Header visibility state

### 2. Dependency Inversion Principle (DIP)

- Contexts depend on abstractions (hooks) not implementations
- Higher-level contexts compose lower-level ones
- Easy to swap implementations

### 3. Open/Closed Principle (OCP)

- Contexts are open for extension (new features)
- Closed for modification (existing behavior preserved)
- New contexts can be added without changing existing ones

## Usage Patterns

### Individual Contexts (Recommended for new code)

```tsx
// Specific context for specific needs
import { useTheme } from "./contexts";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  return <button onClick={toggleTheme}>{theme}</button>;
};
```

### Unified Context (Backward compatibility)

```tsx
// Drop-in replacement for existing code
import { useSettings } from "./contexts";

const Settings = () => {
  const { theme, toggleTheme, isMotionDisabled } = useSettings();
  // Works exactly like before
};
```

### Composition

```tsx
// For components needing multiple contexts
import { useMotion, useTheme } from "./contexts";

const ResponsiveCard = () => {
  const { theme } = useTheme();
  const { isMotionDisabled } = useMotion();

  return (
    <div
      className={clsx(
        theme === "dark" ? "bg-dark" : "bg-light",
        !isMotionDisabled && "hover:scale-105"
      )}
    >
      Content
    </div>
  );
};
```

## Benefits

### Before (Monolithic SettingsContext)

- ❌ 75 lines in one file
- ❌ Multiple responsibilities
- ❌ Unnecessary re-renders
- ❌ Hard to test individual features
- ❌ Tight coupling

### After (Separated Contexts)

- ✅ ~30 lines per context
- ✅ Single responsibility each
- ✅ Minimal re-renders
- ✅ Easy isolated testing
- ✅ Loose coupling
- ✅ Backward compatible
- ✅ Better performance
