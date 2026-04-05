# LWS Job Portal - Professional Job Finding and Recruitment Platform

LWS Job Portal is a modern and dynamic web application built with React. This platform provides a complete solution for both Job Seekers and Companies. Job seekers can easily search and apply for new jobs, while companies get the advantage of posting jobs and managing applicants. Special emphasis has been placed on performance optimization and secure routing in this application.

## ✨ Project Features

Almost all advanced features of a modern recruitment platform have been implemented in this project. Keeping user convenience in mind, the entire system is divided into two main parts:

### Features for Job Seekers:

- **Advanced Job Search & Filtering:** Ability to filter jobs by category, job type (Full-time/Part-time), work mode (Remote/On-site), salary range, and skills. A custom `useDebounce` hook is used to optimize performance during searching.
- **Infinite Scrolling:** Instead of traditional pagination, smooth infinite loading is implemented using React Query's `useInfiniteQuery`, making the user experience much more seamless.
- **Job Application Management:** Fully dynamic ability to view job status in real-time, apply to new jobs via "Apply Now", and retract applications using "Withdraw".
- **Profile Management:** Job seekers can update their education, experience, skills, and contact info from their dashboard.
- **Similar & Recommended Jobs:** On a job's details page, other relevant jobs matching that specific job are suggested.

### Features for Companies (Employers):

- **Job Management Dashboard:** Companies can post new jobs (`CreateAndEditJob`) and edit or manage existing ones from their own dashboard.
- **Applicant Tracking:** The ability to see how many people applied for each job and review a specific applicant's full profile and cover letter (`CoverLetterModal`).
- **Company Profile:** A public company profile page to neatly present the company's description, culture, social media links, and open positions.

### Core & Technical Features:

- **Role-based Authentication & Routing:** Separate login/register systems for users and companies, along with protected navigation (`RoleBasedRoute`).
- **Smart State Management:** Use of `TanStack React Query` for server state and a custom store architecture (`useSyncExternalStore` and Pub-Sub pattern) for local/global state (e.g., Auth Data).
- **Advanced Error Handling & Layout Protection:** Highly secure routing using React Router's (V6/V7) `Loaders`, `ErrorElement`, and `Catch-all (*)` routes. If data fetching fails, the page doesn't crash; instead, it shows an error message only in the specific section.
- **Modern UI/UX:** Instead of annoying spinners during data loading, `Skeletons` (e.g., `JobCardSkeleton`, `ApplicantsCardSkeleton`) are displayed, giving the app a premium feel.
- **Toast Notifications:** Beautiful pop-up notifications (using `react-hot-toast`) for any actions (e.g., login, applying for a job).

## 🛠 Technology Stack

The following modern technologies were used to develop this project:

- **Frontend Library:** React.js (V19+)
- **Language:** JavaScript (ES6+)
- **Server State Management:** TanStack React Query
- **Local State Management:** Custom Store Architecture (`useSyncExternalStore`)
- **Form Management:** React Hook Form
- **Routing:** React Router (V7+)
- **Networking / API Calls:** Axios (with `axiosInstance`)
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Notifications:** React Hot Toast
- **Build Tool:** Vite

## 🔌 API Endpoints

The application uses the following endpoints to manage data (via Axios):

| Method | Endpoint                    | Description                                         |
| :----: | :-------------------------- | :-------------------------------------------------- |
| `GET`  | `/api/jobs`                 | Load all jobs (with pagination & filter parameters) |
| `GET`  | `/api/jobs/:slug`           | Get detailed information of a specific job          |
| `GET`  | `/api/jobs/:id/similar`     | Load similar or related jobs for a specific job     |
| `GET`  | `/api/jobs/recommendations` | Get the recommended job list for a user             |
| `POST` | `/api/auth/login`           | User or company login                               |
| `POST` | `/api/auth/register`        | Register a new client/company                       |

## 📊 Component Tree Diagram

This section shows all the components of the LWS Job Portal app through a visual diagram. This tree diagram is used to quickly understand which component is nested inside which and how the overall application structure is arranged.

![LWS Job Portal components tree diagram](./public/Job%20Portal%20-%20LWS%20-%20Components%20Diagram.png)

## 📂 Component Structure Details

By strictly following the **Separation of Concerns (SoC)** principle, folders and files in this project are organized in a modular pattern:

### State Management & Hooks (`src/store/` & `src/hooks/`)

Global and local logic of the application is kept here.

- **`store/index.js`:** This is the app's custom global state manager (Pub-Sub pattern). It is an excellent example of how to build an efficient store using core React without third-party libraries (like Redux).
- **`useAuth.js`:** Reactively distributes authentication data (login status, user role) throughout the app from the custom store using `useSyncExternalStore`.
- **`useDebounce.js`:** Logic to delay the API call for a specific time after typing in the search field instead of calling it on every keystroke, saving server bandwidth.
- **`useQueryObject.js`:** Handles the synchronization of the app's filter state with the URL's query parameters.

### Services, Networking & Loaders (`src/services/`)

All responsibilities for communicating with the backend belong to this folder.

- **API Files (`jobApi.js`, `authApi.js`, `companyApi.js`):** API requests are organized into separate files by module using a custom Axios instance (`axiosInstance`).
- **`routerLoaders.js`:** React Router DOM `loader` functions reside here. They fetch necessary data from the server before rendering the page.
- **`queryClient.js` & `queryOptions.js`:** Global configuration for TanStack React Query and reusable query options (e.g., `getAllJobsQueryOption`) are defined here.

### Core Components (`src/components/`)

UI components are divided into sub-folders based on their functionality:

- **`layout/`:** `MainLayout`, `Header`, `Footer`. Dynamic navbars (like `LoggedinJobSeekerNavbar` or `LoggedinCompanyNavbar`) render in the header based on the user's login status and role.
- **`jobs/`:** All job-related components. Examples: `JobCard`, `JobSearchAndFilter`, `ManageJobsTable`, and `ApplyJobDialog` for applying to jobs.
- **`jobSeeker/` & `company/`:** Specific components based on user roles. Examples: `JobSeekerExperience`, `JobSeekerSkills` for job seekers, and `CompanyInfo`, `ApplicantsCard` for companies.
- **`common/`:** Generic components frequently used throughout the app. Examples: `ApplyNowButton`, `Pagination`, `SearchInput`, `CompanyAvatar`.
- **`skeletons/`:** Dummy shadow components like `JobCardSkeleton` and `RecentJobsCardSkeleton` to indicate loading states during data fetching.

### Pages & Routing (`src/pages/` & `src/routes/`)

- **Pages:** Page-level components (e.g., `Home`, `JobDetails`, `CompanyProfile`, `Login`, `Dashboard`) are kept here.
- **Routing (`AppRoutes.jsx`, `RoleBasedRoute.jsx`):** The routing tree is built using React Router's latest Data API. Security and role checking operations are handled from here.

### Data & Utils (`src/data/` & `src/utils/`)

Static data and helper functions are separated to keep the code clean.

- **Data Files:** Job types, skill lists, salary ranges, or filtering options are kept as objects/arrays inside `src/data/` instead of being hardcoded (e.g., `categoryOptionData.js`, `statusFiltersData.js`).
- **Utils:** Various helper functions like `slugify.js` (creating URL-friendly names), `getDateDifferenceFromNow.js` (calculating time differences), and `applicationJobChecking.js` (validation for whether a user has applied to a job).

## 🛠️ Getting Started

Follow the steps below to successfully run the project on your local machine. You will need the backend server API to run this project.

**Clone the project:**

```bash
git clone <this-repository-link>
```

**Enter the project directory:**

```bash
cd <repository-name>
```

**Install dependencies (npm packages):**

```bash
npm install
```

**Setup environment variables:**

Create a `.env` file in the root directory and add your API base URL:

```env
VITE_API_BASE_URL = http://localhost:your_backend_port
```

**Start the frontend development server:**

Start the server using the following command:

```bash
npm run dev
```

Now you can visit `http://localhost:5173` in your browser to view the project. Ensure that your backend API server is also running while you are working.
