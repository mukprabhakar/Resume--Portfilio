# Azure Static Web Apps Architecture

## Deployment Flow

```mermaid
graph TB
    A[Your Code] --> B[GitHub Repository]
    B --> C[Azure Static Web Apps]
    C --> D[Build Process]
    D --> E[Production CDN]
    E --> F[Users Worldwide]
    
    style A fill:#f9f,stroke:#333
    style B fill:#181717,stroke:#333,color:#fff
    style C fill:#0078D4,stroke:#333,color:#fff
    style D fill:#28a745,stroke:#333,color:#fff
    style E fill:#ffc107,stroke:#333
    style F fill:#6f42c1,stroke:#333,color:#fff
```

## Build & Deploy Process

```mermaid
graph LR
    A[npm install] --> B[npm run build]
    B --> C[dist/ folder]
    C --> D[Azure Upload]
    D --> E[Global CDN]
    
    style A fill:#cb3837,stroke:#333,color:#fff
    style B fill:#28a745,stroke:#333,color:#fff
    style C fill:#0078D4,stroke:#333,color:#fff
    style D fill:#ffc107,stroke:#333
    style E fill:#6f42c1,stroke:#333,color:#fff
```

## File Structure After Build

```
portfolio-react/
├── src/                    # Source code
│   ├── components/        # React components
│   ├── services/          # API services
│   └── utils/             # Utility functions
├── dist/                  # Production build (deploy this!)
│   ├── index.html        # Main HTML
│   ├── 404.html          # Custom 404 page
│   └── assets/           # CSS & JS bundles
│       ├── index-*.css
│       └── index-*.js
├── azure-static-web-apps-config.yaml
├── .github/
│   └── workflows/
│       └── azure-static-web-apps.yml
└── package.json
```

## Request Flow in Production

```mermaid
graph TD
    A[User visits URL] --> B[Azure CDN Edge]
    B --> C{Route?}
    C -->|Static Asset| D[Serve from CDN]
    C -->|HTML Route| E[Serve index.html]
    C -->|API Call| F[API Backend]
    D --> G[Browser Renders]
    E --> H[React Router]
    H --> G
    
    style A fill:#6f42c1,stroke:#333,color:#fff
    style B fill:#0078D4,stroke:#333,color:#fff
    style C fill:#ffc107,stroke:#333
    style D fill:#28a745,stroke:#333,color:#fff
    style E fill:#28a745,stroke:#333,color:#fff
    style F fill:#dc3545,stroke:#333,color:#fff
    style G fill:#17a2b8,stroke:#333,color:#fff
    style H fill:#fd7e14,stroke:#333,color:#fff
```

## SPA Routing Configuration

```mermaid
graph TB
    A[/about] --> B{File Exists?}
    B -->|No| C[Rewrite to/index.html]
    C --> D[React Router Handles]
    B -->|Yes - 404.html| E[Show 404 Page]
    B -->|Yes - Asset| F[Serve Asset]
    
    style A fill:#0078D4,stroke:#333,color:#fff
    style B fill:#ffc107,stroke:#333
    style C fill:#28a745,stroke:#333,color:#fff
    style D fill:#6f42c1,stroke:#333,color:#fff
    style E fill:#dc3545,stroke:#333,color:#fff
    style F fill:#17a2b8,stroke:#333,color:#fff
```

## CI/CD Pipeline

```mermaid
graph LR
    A[Git Push] --> B[GitHub Actions]
    B --> C[Install Dependencies]
    C --> D[Run Lint]
    D --> E[Run Tests]
    E --> F[Build App]
    F --> G[Deploy to Azure]
    G --> H[Live Site]
    
    style A fill:#181717,stroke:#333,color:#fff
    style B fill:#28a745,stroke:#333,color:#fff
    style C fill:#0078D4,stroke:#333,color:#fff
    style D fill:#ffc107,stroke:#333
    style E fill:#17a2b8,stroke:#333,color:#fff
    style F fill:#6f42c1,stroke:#333,color:#fff
    style G fill:#dc3545,stroke:#333,color:#fff
    style H fill:#28a745,stroke:#333,color:#fff
```

## Environment Variables Flow

```mermaid
graph LR
    A[.env file] --> V[VITE_* variables]
    V --> B[Build Process]
    B --> C[Bundled in JS]
    C --> D[Runtime Access]
    
    X[Azure Portal] --> Y[Environment Vars]
    Y --> B
    
    style A fill:#f9f,stroke:#333
    style V fill:#0078D4,stroke:#333,color:#fff
    style B fill:#28a745,stroke:#333,color:#fff
    style C fill:#ffc107,stroke:#333
    style D fill:#6f42c1,stroke:#333,color:#fff
    style X fill:#dc3545,stroke:#333,color:#fff
    style Y fill:#17a2b8,stroke:#333,color:#fff
```

## Security Layers

```mermaid
graph TB
    A[HTTPS/TLS] --> E[Secure Delivery]
    B[CORS Policy] --> E
    C[XSS Protection] --> E
    D[Content Security] --> E
    
    E --> F[User Browser]
    
    style A fill:#28a745,stroke:#333,color:#fff
    style B fill:#17a2b8,stroke:#333,color:#fff
    style C fill:#0078D4,stroke:#333,color:#fff
    style D fill:#ffc107,stroke:#333
    style E fill:#6f42c1,stroke:#333,color:#fff
    style F fill:#dc3545,stroke:#333,color:#fff
```

## Global Distribution

```
User Requests → Azure Edge Locations → Your Content
                     ↓
              Cached at edge
                     ↓
              Fast delivery worldwide
```

**Benefits:**
- 🌍 Low latency globally
- ⚡ Fast load times
- 🔄 Automatic caching
- 📈 Scales automatically

---

This architecture ensures your portfolio is:
- ✅ Fast and performant
- ✅ Highly available
- ✅ Secure by default
- ✅ Globally distributed
- ✅ Easy to maintain
