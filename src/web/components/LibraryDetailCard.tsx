import semver from "semver";
import type { LibraryInfo } from "../../tools/ListLibrariesTool";
import VersionDetailsRow from "./VersionDetailsRow"; // Adjusted import path

/**
 * Props for the LibraryDetailCard component.
 */
interface LibraryDetailCardProps {
  library: LibraryInfo;
}

/**
 * Renders a card displaying library details and its versions.
 * Uses VersionDetailsRow without the delete button.
 * @param props - Component props including the library information.
 */
const LibraryDetailCard = ({ library }: LibraryDetailCardProps) => (
  // Use Flowbite Card structure with updated padding and border, and white background
  <div class="block p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-300 dark:border-gray-600 mb-4">
    <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-1">
      <span safe>{library.name}</span>
    </h3>
    {/* Container for version rows */}
    <div class="mt-1">
      {library.versions.length > 0 ? (
        library.versions
          // Sort versions: unversioned first, then newest semver first.
          .sort((a, b) => {
            // Explicitly place unversioned first
            if (!a.version) return -1;
            if (!b.version) return 1;
            // Then sort by semver, newest first
            return semver.compare(
              semver.coerce(b.version)?.version ?? "0.0.0",
              semver.coerce(a.version)?.version ?? "0.0.0"
            );
          })
          .map((version) => (
            <VersionDetailsRow
              libraryName={library.name}
              version={version}
              showDelete={false} // Explicitly hide delete button
            />
          ))
      ) : (
        // Display message if no versions are indexed
        <p class="text-sm text-gray-500 dark:text-gray-400 italic">
          No versions indexed.
        </p>
      )}
    </div>
  </div>
);

export default LibraryDetailCard;
