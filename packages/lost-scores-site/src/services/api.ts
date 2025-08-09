import type { SubmissionDetail, SubmissionSummary } from "@/types/api";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export async function getSubmissionsList(): Promise<SubmissionSummary[]> {
  const response = await fetch(`${API_BASE_URL}/api/submissions/list`);
  if (!response.ok) {
    throw new Error("Failed to fetch submissions list");
  }
  return response.json();
}

export async function getSubmission(
  username: string,
  offset: number = 0,
  limit: number = 50
): Promise<SubmissionDetail | null> {
  const response = await fetch(
    `${API_BASE_URL}/api/submissions/${username}?offset=${offset}&limit=${limit}`
  );
  if (response.status === 404) {
    return null;
  }
  if (!response.ok) {
    throw new Error("Failed to fetch submission");
  }
  return response.json();
}

export function getSubmissionImageUrl(
  username: string,
  imageType: "lost_scores_result" | "potential_top_result" | "summary_badge"
): string {
  return `${API_BASE_URL}/api/submissions/${username}/image/${imageType}`;
}
