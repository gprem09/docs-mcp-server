import type { PropsWithChildren } from "@kitajs/html";

/**
 * Props for the Layout component.
 */
interface LayoutProps extends PropsWithChildren {
  title: string;
  /** Optional version string to display next to the title. */
  version?: string;
}

// Expose the build-time version constant for type safety
declare const __APP_VERSION__: string | undefined;

/**
 * Base HTML layout component for all pages.
 * Includes common head elements, header, and scripts.
 * @param props - Component props including title, version, and children.
 */
const Layout = ({
  title,
  version = __APP_VERSION__,
  children,
}: LayoutProps) => (
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title safe>{title}</title>
      {/* Bundled CSS (includes Tailwind and Flowbite) */}
      <link rel="stylesheet" href="/assets/main.css" />
      {/* Add style for htmx-indicator behavior (needed globally) */}
      <style>
        {`
          .htmx-indicator {
            display: none;
          }
          .htmx-request .htmx-indicator {
            display: block;
          }
          .htmx-request.htmx-indicator {
            display: block;
          }
          /* Default: Hide skeleton, show results container */
          #searchResultsContainer .search-skeleton { display: none; }
          #searchResultsContainer .search-results { display: block; } /* Or as needed */

          /* Request in progress: Show skeleton, hide results */
          #searchResultsContainer.htmx-request .search-skeleton { display: block; } /* Or flex etc. */
          #searchResultsContainer.htmx-request .search-results { display: none; }

          /* Keep button spinner logic */
          form .htmx-indicator .spinner { display: flex; }
          form .htmx-indicator .search-text { display: none; }
          form .spinner { display: none; }
        `}
      </style>
    </head>
    <body class="bg-gray-50 dark:bg-gray-900">
      <div class="container max-w-2xl mx-auto px-4 py-4">
        <header class="mb-4">
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
            <a href="/">MCP Docs</a>
            {version ? (
              <span
                safe
                class="ml-2 text-base font-normal text-gray-500 dark:text-gray-400 align-baseline"
                title={`Version ${version}`}
              >
                v{version}
              </span>
            ) : null}
          </h1>
        </header>

        <main>{children}</main>
      </div>

      {/* Bundled JS (includes Flowbite, HTMX, AlpineJS, and initialization) */}
      <script type="module" src="/assets/main.js"></script>
    </body>
  </html>
);

export default Layout;
