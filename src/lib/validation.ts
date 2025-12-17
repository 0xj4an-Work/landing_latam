/**
 * Email validation regex that matches the pattern used in frontend forms
 * Requires: username@domain.tld format with at least 2-letter TLD
 */
const EMAIL_REGEX = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;

/**
 * Validates if a string is a properly formatted email address
 * @param email - The email string to validate
 * @returns true if valid, false otherwise
 */
export function isValidEmail(email: string): boolean {
  if (!email || typeof email !== "string") {
    return false;
  }

  const trimmedEmail = email.trim();

  // Check length constraints
  if (trimmedEmail.length === 0 || trimmedEmail.length > 254) {
    return false;
  }

  // Check regex pattern
  return EMAIL_REGEX.test(trimmedEmail);
}

/**
 * Validates an array of email addresses
 * @param emails - Array of email strings to validate
 * @returns Object with isValid boolean and optional invalidEmails array
 */
export function validateEmails(emails: string[]): {
  isValid: boolean;
  invalidEmails?: string[];
} {
  const invalidEmails = emails.filter((email) => !isValidEmail(email));

  if (invalidEmails.length > 0) {
    return {
      isValid: false,
      invalidEmails,
    };
  }

  return { isValid: true };
}
