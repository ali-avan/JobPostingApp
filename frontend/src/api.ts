import axios from "axios";
export interface Filters {
  title: string;
  company: string;
  job_type: string;
  location: string;
  tag: string;
  sort: string;
  q: string;
  page: number;
  limit: number;
}

export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  job_type: string;
  posting_date: string;
  tags: string[];
}

const API_BASE_URL = "http://127.0.0.1:5000";

//  Get a single job by ID
export const getJobById = async (id: number): Promise<Job> => {
  const res = await axios.get<Job>(`${API_BASE_URL}/jobs/${id}`);
  return res.data;
};

//  Get all jobs with filters + pagination
export const fetchJobs = async (
  filters: Filters
): Promise<{ jobs: Job[]; total: number; page: number; limit: number }> => {
  const params = new URLSearchParams(
    filters as unknown as Record<string, string>
  ).toString();

  const res = await axios.get<{
    jobs: Job[];
    total: number;
    page: number;
    limit: number;
  }>(`${API_BASE_URL}/jobs?${params}`);

  return res.data;
};


//  Add a new job
export const addJob = async (
  job: Omit<Job, "id" | "posting_date">
): Promise<Job> => {
  const today = new Date().toISOString().split("T")[0]; // Format: YYYY-MM-DD

  const res = await axios.post<Job>(`${API_BASE_URL}/jobs`, {
    ...job,
    posting_date: today,
    tags: job.tags,
  });

  return res.data;
};

//  Update an existing job
export const updateJob = async (
  id: number,
  job: Partial<Job>
): Promise<Job> => {
  const res = await axios.put<Job>(`${API_BASE_URL}/jobs/${id}`, job);
  return res.data;
};

//  Delete a job by ID
export const deleteJob = async (id: number): Promise<void> => {
  await axios.delete(`${API_BASE_URL}/jobs/${id}`);
};
