import { config } from 'dotenv';
import { z } from 'zod';

// Load environment variables from .env file
config();

// Configuration validation schema
const ConfigSchema = z.object({
  baseUrl: z.string().url().default('https://api.github.com'),
  token: z.string().optional(),
  userAgent: z.string().default('mcp-github-enterprise'),
  timeout: z.number().int().positive().default(30000),
  debug: z.boolean().default(false),
  language: z.string()
    .transform(val => {
      // Handle system locale format (e.g., 'en_US.UTF-8')
      if (val && typeof val === 'string') {
        if (val.startsWith('ko')) return 'ko';
        return 'en'; // Default to English for all other languages
      }
      return val;
    })
    .pipe(z.enum(['en', 'ko']))
    .default('en'),
});

export type Config = z.infer<typeof ConfigSchema>;

// Load configuration from environment variables or arguments
export function loadConfig(overrides?: Partial<Config>): Config {
  // Support various environment variable names
  const baseUrl = process.env.GITHUB_ENTERPRISE_URL || 
                  process.env.GITHUB_API_URL || 
                  process.env.GHE_API_URL ||
                  process.env.GITHUB_URL;
                  
  // Check command line arguments
  const args = process.argv;
  let argBaseUrl: string | undefined;
  
  // Support various argument names for baseUrl
  for (let i = 0; i < args.length; i++) {
    if ((args[i] === '--github-enterprise-url' || 
         args[i] === '--github-api-url' || 
         args[i] === '--baseUrl') && 
        i + 1 < args.length) {
      argBaseUrl = args[i + 1];
      break;
    }
  }
  
  // Check for language configuration
  let language: string | undefined;
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--language' && i + 1 < args.length) {
      language = args[i + 1];
      break;
    }
  }

  // Load configuration from environment variables
  const environmentConfig = {
    baseUrl: argBaseUrl || baseUrl, // Command line arguments take precedence
    token: process.env.GITHUB_TOKEN || process.env.GH_TOKEN,
    userAgent: process.env.GITHUB_USER_AGENT,
    timeout: process.env.GITHUB_TIMEOUT ? parseInt(process.env.GITHUB_TIMEOUT, 10) : undefined,
    debug: process.env.DEBUG === 'true',
    language: language || process.env.LANGUAGE || process.env.LANG,
  };

  // Filter out undefined values
  const filteredEnvConfig = Object.fromEntries(
    Object.entries(environmentConfig).filter(([_, v]) => v !== undefined)
  );

  // Merge all configuration sources (priority: args > env vars > defaults)
  return ConfigSchema.parse({
    ...filteredEnvConfig,
    ...overrides,
  });
}

// Default configuration object
export const defaultConfig = loadConfig();

// GitHub API URL generation utility
export function buildApiUrl(config: Config, path: string): string {
  // Return as-is if it's already a full URL
  if (path.startsWith('http')) {
    return path;
  }

  // Remove leading slash to prevent duplication
  const normalizedPath = path.startsWith('/') ? path.substring(1) : path;

  // Add trailing slash to base URL if it doesn't exist
  const baseUrl = config.baseUrl.endsWith('/') 
    ? config.baseUrl.slice(0, -1) 
    : config.baseUrl;

  return `${baseUrl}/${normalizedPath}`;
} 
