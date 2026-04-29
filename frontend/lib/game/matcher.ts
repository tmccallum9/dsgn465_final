// RFC2 §6: Input handling and matching logic
// Implements case-insensitive, typo-tolerant (Levenshtein ≤ 1) matching

import { ALL_ACCEPTED_ANSWERS } from '../config/frameworks';

/**
 * Calculate Levenshtein distance between two strings
 * Returns the minimum number of single-character edits (insertions, deletions, substitutions)
 */
export function levenshteinDistance(str1: string, str2: string): number {
  const len1 = str1.length;
  const len2 = str2.length;

  // Create a 2D array for dynamic programming
  const matrix: number[][] = Array(len1 + 1)
    .fill(null)
    .map(() => Array(len2 + 1).fill(0));

  // Initialize first column and row
  for (let i = 0; i <= len1; i++) matrix[i][0] = i;
  for (let j = 0; j <= len2; j++) matrix[0][j] = j;

  // Fill in the rest of the matrix
  for (let i = 1; i <= len1; i++) {
    for (let j = 1; j <= len2; j++) {
      const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,      // deletion
        matrix[i][j - 1] + 1,      // insertion
        matrix[i - 1][j - 1] + cost // substitution
      );
    }
  }

  return matrix[len1][len2];
}

/**
 * Normalize input string for matching:
 * - Trim whitespace
 * - Convert to lowercase
 */
export function normalizeInput(input: string): string {
  return input.trim().toLowerCase();
}

/**
 * Check if an input matches a canonical answer
 * Allows Levenshtein distance ≤ 1 for typo tolerance
 */
export function isMatch(input: string, canonicalAnswer: string): boolean {
  const normalizedInput = normalizeInput(input);
  const normalizedAnswer = normalizeInput(canonicalAnswer);

  // Exact match (most common case, fast path)
  if (normalizedInput === normalizedAnswer) {
    return true;
  }

  // Allow single-character typo (Levenshtein distance ≤ 1)
  return levenshteinDistance(normalizedInput, normalizedAnswer) <= 1;
}

/**
 * Find which framework component (if any) the input matches
 * Returns componentId or null
 */
export function findMatchingComponent(input: string): string | null {
  if (!input || input.trim() === '') return null;

  // Check against all accepted answers across all frameworks
  for (const { answer, componentId } of ALL_ACCEPTED_ANSWERS) {
    if (isMatch(input, answer)) {
      return componentId;
    }
  }

  return null;
}

/**
 * Check if input exactly matches any accepted answer (used for auto-submit)
 * This is stricter than findMatchingComponent - requires exact match, no typos
 */
export function isExactMatch(input: string): boolean {
  const normalizedInput = normalizeInput(input);

  for (const { answer } of ALL_ACCEPTED_ANSWERS) {
    if (normalizedInput === normalizeInput(answer)) {
      return true;
    }
  }

  return false;
}
